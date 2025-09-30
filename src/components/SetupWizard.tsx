import React from 'react';
import { ArrowRight, CheckCircle, Plug, Sun } from 'lucide-react';
import type { SystemConfig } from '../types';

interface SetupWizardProps {
  wizardStep: number;
  setWizardStep: (step: number) => void;
  config: SystemConfig;
  updateConfig: (updates: Partial<SystemConfig>) => void;
  onComplete: () => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({
  wizardStep,
  setWizardStep,
  config,
  updateConfig,
  onComplete
}) => {
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" fill="#1E40AF"/>
            <circle cx="16" cy="16" r="8" fill="#F59E0B"/>
            <g stroke="#FBBF24" strokeWidth="2" strokeLinecap="round">
              <line x1="16" y1="4" x2="16" y2="8"/>
              <line x1="16" y1="24" x2="16" y2="28"/>
              <line x1="4" y1="16" x2="8" y2="16"/>
              <line x1="24" y1="16" x2="28" y2="16"/>
              <line x1="6.34" y1="6.34" x2="9.17" y2="9.17"/>
              <line x1="22.83" y1="22.83" x2="25.66" y2="25.66"/>
              <line x1="6.34" y1="25.66" x2="9.17" y2="22.83"/>
              <line x1="22.83" y1="9.17" x2="25.66" y2="6.34"/>
            </g>
            <path d="M14 10L18 14L16 14L18 22L14 14L16 14L14 10Z" fill="#FBBF24"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SBC</h1>
        <p className="text-gray-600">Solar Battery Calculator - Configure your power system in 4 simple steps</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">System Name</label>
        <input
          type="text"
          value={config.systemName}
          onChange={(e) => updateConfig({ systemName: e.target.value })}
          placeholder="e.g., Home Backup, Office UPS"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Inverter Brand/Model</label>
        <input
          type="text"
          value={config.inverterBrand}
          onChange={(e) => updateConfig({ inverterBrand: e.target.value })}
          placeholder="e.g., Luminous, Su-Kam"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Inverter Capacity (Watts)</label>
        <select
          value={config.inverterCapacity}
          onChange={(e) => updateConfig({ inverterCapacity: parseInt(e.target.value) })}
          className="input-field"
        >
          <option value="850">850W</option>
          <option value="1000">1kW</option>
          <option value="1500">1.5kW</option>
          <option value="2000">2kW</option>
          <option value="3000">3kW</option>
          <option value="3500">3.5kW</option>
          <option value="4200">4.2kW</option>
          <option value="5000">5kW</option>
          <option value="7500">7.5kW</option>
          <option value="10000">10kW</option>
        </select>
      </div>

      <button
        onClick={() => setWizardStep(2)}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        Next: Battery Configuration <ArrowRight />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Battery Configuration</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Battery Type</label>
          <select
            value={config.batteryType}
            onChange={(e) => updateConfig({ batteryType: e.target.value as any })}
            className="input-field"
          >
            <option value="tubular">Tubular</option>
            <option value="flat">Flat Plate</option>
            <option value="gel">Gel</option>
            <option value="agm">AGM</option>
            <option value="lithium">Lithium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Battery Brand</label>
          <input
            type="text"
            value={config.batteryBrand}
            onChange={(e) => updateConfig({ batteryBrand: e.target.value })}
            placeholder="e.g., Star Plus"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Battery Voltage</label>
          <select
            value={config.batteryVoltage}
            onChange={(e) => {
              const batteryVoltage = parseInt(e.target.value);
              const numBatteries = config.numBatteries;
              updateConfig({
                batteryVoltage,
                systemVoltage: batteryVoltage * numBatteries
              });
            }}
            className="input-field"
          >
            <option value="12">12V</option>
            <option value="6">6V</option>
            <option value="2">2V</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number</label>
          <select
            value={config.numBatteries}
            onChange={(e) => {
              const numBatteries = parseInt(e.target.value);
              const batteryVoltage = config.batteryVoltage;
              updateConfig({
                numBatteries,
                systemVoltage: batteryVoltage * numBatteries
              });
            }}
            className="input-field"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
          <select
            value={config.batteryCapacity}
            onChange={(e) => updateConfig({ batteryCapacity: parseInt(e.target.value) })}
            className="input-field"
          >
            <option value="100">100Ah</option>
            <option value="150">150Ah</option>
            <option value="200">200Ah</option>
            <option value="220">220Ah</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
        <p className="text-sm font-semibold text-blue-800 mb-2">Your Battery Configuration:</p>
        <div className="space-y-1 text-gray-700">
          <p className="font-bold text-lg text-blue-900">
            {config.numBatteries} × {config.batteryVoltage}V {config.batteryCapacity}Ah
          </p>
          <p className="text-lg">
            <span className="font-semibold">System Voltage:</span> <span className="text-blue-700 font-bold">{config.systemVoltage}V</span>
          </p>
          <p>
            <span className="font-semibold">Total Capacity:</span> {config.batteryCapacity}Ah ({(config.batteryCapacity * config.systemVoltage / 1000).toFixed(2)}kWh)
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setWizardStep(1)}
          className="flex-1 btn-secondary"
        >
          Back
        </button>
        <button
          onClick={() => setWizardStep(3)}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          Next: Power Sources <ArrowRight />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Power Sources</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-5 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-3">
            <Plug className="text-blue-600 w-8 h-8" />
            <div>
              <h3 className="font-bold text-gray-800">NEPA (Grid)</h3>
              <p className="text-sm text-gray-600">Grid electricity</p>
            </div>
          </div>
          <button
            onClick={() => updateConfig({ hasNepa: !config.hasNepa })}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              config.hasNepa ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {config.hasNepa ? 'YES' : 'NO'}
          </button>
        </div>

        <div className="flex items-center justify-between p-5 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center gap-3">
            <Sun className="text-yellow-600 w-8 h-8" />
            <div>
              <h3 className="font-bold text-gray-800">Solar Panels</h3>
              <p className="text-sm text-gray-600">Solar installation</p>
            </div>
          </div>
          <button
            onClick={() => updateConfig({ hasSolar: !config.hasSolar })}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              config.hasSolar ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {config.hasSolar ? 'YES' : 'NO'}
          </button>
        </div>

        {config.hasSolar && (
          <div className="space-y-4 p-4 bg-yellow-50 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Solar Capacity</label>
              <select
                value={config.solarCapacity}
                onChange={(e) => updateConfig({ solarCapacity: parseInt(e.target.value) })}
                className="input-field"
              >
                <option value="500">500W</option>
                <option value="1000">1kW</option>
                <option value="2000">2kW</option>
                <option value="3000">3kW</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sunrise</label>
                <select
                  value={config.sunriseHour}
                  onChange={(e) => updateConfig({ sunriseHour: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {[5, 6, 7, 8].map(hour => (
                    <option key={hour} value={hour}>{hour}:00 AM</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sunset</label>
                <select
                  value={config.sunsetHour}
                  onChange={(e) => updateConfig({ sunsetHour: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {[17, 18, 19, 20].map(hour => (
                    <option key={hour} value={hour}>{hour > 12 ? hour - 12 : hour}:00 PM</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm font-semibold">Auto Solar Toggle</p>
                <p className="text-xs text-gray-600">Auto on/off</p>
              </div>
              <button
                onClick={() => updateConfig({ autoSolarToggle: !config.autoSolarToggle })}
                className={`px-4 py-2 rounded-lg font-bold text-sm ${
                  config.autoSolarToggle ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {config.autoSolarToggle ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setWizardStep(2)}
          className="flex-1 btn-secondary"
        >
          Back
        </button>
        <button
          onClick={() => setWizardStep(4)}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          Next <ArrowRight />
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Final Preferences</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Depth of Discharge</label>
        <select
          value={config.depthOfDischarge}
          onChange={(e) => updateConfig({ depthOfDischarge: parseInt(e.target.value) })}
          className="input-field"
        >
          <option value="30">30% - Max life</option>
          <option value="50">50% - Recommended</option>
          <option value="80">80% - Max backup</option>
        </select>
      </div>

      <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <CheckCircle className="text-green-600" />
          Summary
        </h3>
        <div className="space-y-2 text-sm">
          <p><strong>System:</strong> {config.systemName}</p>
          <p><strong>Inverter:</strong> {(config.inverterCapacity/1000).toFixed(1)}kW</p>
          <p><strong>Battery:</strong> {config.numBatteries}×{config.batteryVoltage}V {config.batteryCapacity}Ah</p>
          <p><strong>System Voltage:</strong> {config.systemVoltage}V</p>
          <p><strong>Sources:</strong> {config.hasNepa ? '✓ NEPA' : ''} {config.hasSolar ? '✓ Solar' : ''}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setWizardStep(3)}
          className="flex-1 btn-secondary"
        >
          Back
        </button>
        <button
          onClick={onComplete}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2"
        >
          <CheckCircle /> Complete
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`w-1/4 h-2 rounded-full mx-1 ${step <= wizardStep ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {wizardStep} of 4</p>
        </div>

        {wizardStep === 1 && renderStep1()}
        {wizardStep === 2 && renderStep2()}
        {wizardStep === 3 && renderStep3()}
        {wizardStep === 4 && renderStep4()}
      </div>
    </div>
  );
};
