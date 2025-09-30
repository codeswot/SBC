import React from 'react';
import { Zap, Clock, Calculator, Info, Battery } from 'lucide-react';
import type { SystemConfig, BatteryStatus, ChargeStatus } from '../types';
import { loadPresets } from '../data/loadPresets';

interface BatteryDisplayProps {
  config: SystemConfig;
  batteryStatus: BatteryStatus;
  load: number;
  backupTime: string;
  loadPercentage: number;
  onLoadChange: (load: number) => void;
  isCharging: boolean;
  chargeETA: string;
  chargeStatus: ChargeStatus;
  nepaAvailable: boolean;
  solarAvailable: boolean;
}

export const BatteryDisplay: React.FC<BatteryDisplayProps> = ({
  config,
  batteryStatus,
  load,
  backupTime,
  loadPercentage,
  onLoadChange,
  isCharging,
  chargeETA,
  chargeStatus,
  nepaAvailable,
  solarAvailable
}) => {
  const getStatusMessage = () => {
    if (!nepaAvailable && !solarAvailable) {
      return "⚠️ No power input! Running on battery only.";
    }
    if (loadPercentage > 90) {
      return "⚠️ Load exceeds 90%! Reduce immediately.";
    }
    if (loadPercentage > 70) {
      return "⚡ High load detected.";
    }
    if (isCharging && batteryStatus.percentage > 80) {
      return "✅ Battery charging well!";
    }
    return "✓ System operating normally.";
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-64 border-4 border-gray-300 rounded-lg overflow-hidden">
            <div 
              className={`absolute bottom-0 w-full transition-all duration-700 ${
                batteryStatus.percentage > 60 ? 'bg-green-500' : 
                batteryStatus.percentage > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ height: `${Math.min(batteryStatus.percentage, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
              {isCharging && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-white animate-pulse" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <div className="text-5xl font-bold text-gray-800">{Math.round(batteryStatus.percentage)}%</div>
                <div className="text-sm text-gray-600 mt-1">{config.systemVoltage}V</div>
              </div>
            </div>
          </div>
          
          <div className={`mt-4 px-4 py-2 rounded-full ${batteryStatus.bgColor}`}>
            <span className={`font-semibold ${batteryStatus.color}`}>{batteryStatus.status}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-600" />
              <span className="font-semibold text-gray-700">Backup Time</span>
            </div>
            <div className="text-4xl font-bold text-blue-600">{backupTime}</div>
            <p className="text-xs text-gray-500 mt-1">At {load}W load</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="text-green-600" />
              <span className="font-semibold text-gray-700">Charge ETA</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{chargeETA}</div>
            <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${chargeStatus.bgColor} ${chargeStatus.color}`}>
              {chargeStatus.status}
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="text-purple-600" />
              <span className="font-semibold text-gray-700">Inverter Load</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">{loadPercentage.toFixed(1)}%</div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full transition-all duration-500 ${
                  loadPercentage > 90 ? 'bg-red-500' : 
                  loadPercentage > 70 ? 'bg-orange-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(loadPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Load Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {loadPresets.map((preset) => (
                <button 
                  key={preset.name}
                  onClick={() => onLoadChange(preset.watts)} 
                  className={`px-2 py-2 rounded text-xs font-medium transition-colors ${preset.color}`}
                >
                  {preset.name}<br/>{preset.watts}W
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
        <div className="flex items-start gap-3">
          <Info className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-gray-800">
            {getStatusMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};
