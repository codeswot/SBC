import React from 'react';
import { Settings, Plug, Sun } from 'lucide-react';
import type { SystemConfig } from '../types';

interface SystemHeaderProps {
  config: SystemConfig;
  nepaEnabled: boolean;
  solarEnabled: boolean;
  onReset: () => void;
  onToggleNepa: () => void;
  onToggleSolar: () => void;
}

export const SystemHeader: React.FC<SystemHeaderProps> = ({
  config,
  nepaEnabled,
  solarEnabled,
  onReset,
  onToggleNepa,
  onToggleSolar
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{config.systemName}</h1>
          <p className="text-blue-200 text-sm mt-1">
            {config.systemVoltage}V System • {config.numBatteries}×{config.batteryVoltage}V {config.batteryCapacity}Ah
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
        >
          <Settings className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="flex gap-3">
        {config.hasNepa && (
          <button
            onClick={onToggleNepa}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
              nepaEnabled 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' 
                : 'bg-white/20 hover:bg-white/30 text-white/70'
            }`}
          >
            <Plug className="w-5 h-5" />
            <span>NEPA {nepaEnabled ? 'ON' : 'OFF'}</span>
          </button>
        )}
        
        {config.hasSolar && (
          <button
            onClick={onToggleSolar}
            disabled={config.autoSolarToggle}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
              config.autoSolarToggle 
                ? 'bg-white/10 text-white/70 cursor-not-allowed' 
                : solarEnabled 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg' 
                  : 'bg-white/20 hover:bg-white/30 text-white/70'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span>Solar {solarEnabled ? 'ON' : 'OFF'}</span>
            {config.autoSolarToggle && <span className="text-xs">(Auto)</span>}
          </button>
        )}
      </div>
    </div>
  );
};
