import { useState, useEffect } from 'react';
import { SetupWizard } from './components/SetupWizard';
import { SystemHeader } from './components/SystemHeader';
import { SystemStatusCard } from './components/SystemStatus';
import { BatteryDisplay } from './components/BatteryDisplay';
import { VoltageReferenceTable } from './components/VoltageReference';
import { useSystemConfig } from './hooks/useSystemConfig';
import { useSystemStatus } from './hooks/useSystemStatus';
import { 
  getBatteryStatus, 
  getPowerSourceStatus, 
  calculateBackupTime, 
  calculateLoadPercentage,
  calculateChargeETA,
  getChargeStatus,
  calculateSolarPower,
  calculateBatteryPercentage
} from './utils/calculations';

function App() {
  const [wizardStep, setWizardStep] = useState(1);
  const { config, updateConfig, setupComplete, setSetupComplete, resetConfig } = useSystemConfig();
  const { 
    status, 
    updateStatus, 
    setVoltage, 
    setLoad, 
    setNepaEnabled, 
    setIsCharging, 
    setSolarVoltage, 
    setGridVoltage, 
    setOutputVoltage, 
    setSolarEnabled 
  } = useSystemStatus();

  useEffect(() => {
    if (config.hasSolar && config.autoSolarToggle) {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const currentTimeInMinutes = hour * 60 + minutes;
      const sunriseInMinutes = config.sunriseHour * 60;
      const sunsetInMinutes = config.sunsetHour * 60;
      
      const isDaytime = currentTimeInMinutes >= sunriseInMinutes && currentTimeInMinutes < sunsetInMinutes;
      
      if (isDaytime && !status.solarEnabled) {
        setSolarEnabled(true);
        setSolarVoltage(58);
      } else if (!isDaytime && status.solarEnabled) {
        setSolarEnabled(false);
        setSolarVoltage(0);
      }
    }
  }, [config.hasSolar, config.autoSolarToggle, config.sunriseHour, config.sunsetHour, status.solarEnabled, setSolarEnabled, setSolarVoltage]);

  useEffect(() => {
    const nepaAvailable = status.nepaEnabled && status.gridVoltage > 100;
    const solarAvailable = status.solarEnabled && status.solarVoltage > 20;
    
    if (!nepaAvailable && !solarAvailable) {
      setIsCharging(false);
    }
  }, [status.nepaEnabled, status.gridVoltage, status.solarEnabled, status.solarVoltage, setIsCharging]);

  const handleCompleteSetup = () => {
    setSetupComplete(true);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      '⚠️ WARNING: This will delete ALL your system configuration and data!\n\n' +
      'This includes:\n' +
      '• System configuration\n' +
      '• Battery voltage readings\n' +
      '• Load settings\n' +
      '• NEPA/Solar states\n\n' +
      'Are you absolutely sure you want to continue?'
    );
    
    if (confirmed) {
      resetConfig();
      setWizardStep(1);
      updateStatus({
        voltage: 29.2,
        load: 180,
        isCharging: true,
        solarVoltage: 58,
        gridVoltage: 190,
        outputVoltage: 190,
        nepaEnabled: true,
        solarEnabled: true
      });
      alert('✅ System reset complete! Starting fresh setup...');
    }
  };

  const handleToggleNepa = () => {
    const newNepaEnabled = !status.nepaEnabled;
    setNepaEnabled(newNepaEnabled);
    if (newNepaEnabled) {
      setGridVoltage(190);
    } else {
      setGridVoltage(0);
    }
  };

  const handleToggleSolar = () => {
    if (!config.autoSolarToggle) {
      const newSolarEnabled = !status.solarEnabled;
      setSolarEnabled(newSolarEnabled);
      if (newSolarEnabled) {
        setSolarVoltage(58);
      } else {
        setSolarVoltage(0);
      }
    }
  };

  const batteryStatus = getBatteryStatus(status.voltage, status.isCharging, config.systemVoltage);
  const powerSourceStatus = getPowerSourceStatus(status.nepaEnabled, status.gridVoltage, status.solarEnabled, status.solarVoltage);
  const backupTime = calculateBackupTime(status.voltage, status.load, config);
  const loadPercentage = calculateLoadPercentage(status.load, config.inverterCapacity);
  
  const nepaAvailable = status.nepaEnabled && status.gridVoltage > 100;
  const solarAvailable = status.solarEnabled && status.solarVoltage > 20;
  const solarPower = calculateSolarPower(status.solarVoltage, config.solarCapacity);
  const chargeETA = calculateChargeETA(
    status.voltage,
    config.systemVoltage,
    config.batteryCapacity,
    config.numBatteries,
    nepaAvailable,
    solarAvailable,
    solarPower,
    config.inverterCapacity
  );
  const chargeStatus = getChargeStatus(
    status.voltage,
    config.systemVoltage,
    status.isCharging,
    nepaAvailable,
    solarAvailable
  );

  useEffect(() => {
    const batteryHealthy = status.voltage > (config.systemVoltage === 24 ? 22.0 : config.systemVoltage === 12 ? 11.0 : config.systemVoltage - 2);
    const shouldOutput = nepaAvailable || solarAvailable || batteryHealthy;

    if (!shouldOutput) {
      if (status.outputVoltage !== 0) setOutputVoltage(0);
      return;
    }

    const base = 216;

    const loadRatio = Math.max(0, Math.min(1, status.load / Math.max(1, config.inverterCapacity)));
    const loadDroop = -Math.min(12, loadRatio * 12);

    const batteryPct = calculateBatteryPercentage(status.voltage, status.isCharging, config.systemVoltage);
    const batteryDroop = batteryPct < 60 ? -Math.min(6, (60 - batteryPct) / 8) : 0;

    // Source stabilization: NEPA helps hold voltage a bit higher
    const sourceBoost = nepaAvailable ? 1 : 0;

    // Small mild jitter (+/- ~1.5 V)
    const jitter = Math.sin(Date.now() / 30000) * 1.0;

    let computed = base + loadDroop + batteryDroop + sourceBoost + jitter;
    // Clamp to a realistic window
    computed = Math.max(208, Math.min(228, computed));

    const rounded = Math.round(computed);
    if (status.outputVoltage !== rounded) {
      setOutputVoltage(rounded);
    }
    
  }, [nepaAvailable, solarAvailable, status.voltage, config.systemVoltage]);

  if (!setupComplete) {
    return (
      <SetupWizard
        wizardStep={wizardStep}
        setWizardStep={setWizardStep}
        config={config}
        updateConfig={updateConfig}
        onComplete={handleCompleteSetup}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <SystemHeader
          config={config}
          nepaEnabled={status.nepaEnabled}
          solarEnabled={status.solarEnabled}
          onReset={handleReset}
          onToggleNepa={handleToggleNepa}
          onToggleSolar={handleToggleSolar}
        />

        <SystemStatusCard
          config={config}
          status={status}
          onVoltageChange={setVoltage}
          onLoadChange={setLoad}
          onGridVoltageChange={setGridVoltage}
          onSolarVoltageChange={setSolarVoltage}
          onOutputVoltageChange={setOutputVoltage}
          onToggleCharging={() => setIsCharging(!status.isCharging)}
          powerSourceStatus={powerSourceStatus.mode}
        />

        <BatteryDisplay
          config={config}
          batteryStatus={batteryStatus}
          load={status.load}
          backupTime={backupTime}
          loadPercentage={loadPercentage}
          onLoadChange={setLoad}
          isCharging={status.isCharging}
          chargeETA={chargeETA}
          chargeStatus={chargeStatus}
          nepaAvailable={nepaAvailable}
          solarAvailable={solarAvailable}
        />

        <VoltageReferenceTable config={config} />

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">💡 System Tips</h2>
          <ul className="space-y-2 text-sm">
            <li>✓ {config.numBatteries}×{config.batteryVoltage}V = {config.systemVoltage}V system</li>
            <li>✓ Keep load under 70% for efficiency</li>
            <li>✓ Charge ETA shows time to reach 100% battery</li>
            {config.hasSolar && <li>✓ Solar auto-toggles at sunrise/sunset</li>}
            <li>✓ Check battery water levels monthly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;