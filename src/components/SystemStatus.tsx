import React from 'react';
import { Plug, Power, Home, Sun, Battery } from 'lucide-react';
import type { SystemConfig, SystemStatus } from '../types';

interface SystemStatusProps {
  config: SystemConfig;
  status: SystemStatus;
  onVoltageChange: (voltage: number) => void;
  onLoadChange: (load: number) => void;
  onGridVoltageChange: (voltage: number) => void;
  onSolarVoltageChange: (voltage: number) => void;
  onOutputVoltageChange: (voltage: number) => void;
  onToggleCharging: () => void;
  powerSourceStatus: string;
}

export const SystemStatusCard: React.FC<SystemStatusProps> = ({
  config,
  status,
  onVoltageChange,
  onLoadChange,
  onGridVoltageChange,
  onSolarVoltageChange,
  onOutputVoltageChange,
  onToggleCharging,
  powerSourceStatus
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Live System Status</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {config.hasNepa && (
          <div className={`p-4 rounded-lg text-center ${status.nepaEnabled && status.gridVoltage > 100 ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-100 border-2 border-gray-300'}`}>
            <Plug className={`mx-auto mb-2 ${status.nepaEnabled && status.gridVoltage > 100 ? 'text-blue-600' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600">NEPA</p>
            <input
              type="number"
              value={status.gridVoltage}
              onChange={(e) => onGridVoltageChange(parseInt(e.target.value) || 0)}
              className={`w-full text-2xl font-bold bg-transparent text-center mt-1 border-b focus:outline-none ${
                status.nepaEnabled && status.gridVoltage > 100 ? 'text-blue-600 border-blue-300' : 'text-gray-400 border-gray-300'
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">V</p>
          </div>
        )}

        <div className="bg-purple-50 p-4 rounded-lg text-center border-2 border-purple-400">
          <Power className="mx-auto mb-2 text-purple-600" />
          <p className="text-xs text-gray-600">Output</p>
          <input
            type="number"
            value={status.outputVoltage}
            onChange={(e) => onOutputVoltageChange(parseInt(e.target.value) || 0)}
            className="w-full text-2xl font-bold text-purple-600 bg-transparent text-center mt-1 border-b border-purple-300 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">V</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center border-2 border-orange-400">
          <Home className="mx-auto mb-2 text-orange-600" />
          <p className="text-xs text-gray-600">Load</p>
          <input
            type="number"
            value={status.load}
            onChange={(e) => onLoadChange(parseInt(e.target.value) || 0)}
            className="w-full text-2xl font-bold text-orange-600 bg-transparent text-center mt-1 border-b border-orange-300 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">W</p>
        </div>

        {config.hasSolar && (
          <div className={`p-4 rounded-lg text-center ${status.solarEnabled && status.solarVoltage > 20 ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-100 border-2 border-gray-300'}`}>
            <Sun className={`mx-auto mb-2 ${status.solarEnabled && status.solarVoltage > 20 ? 'text-yellow-600' : 'text-gray-400'}`} />
            <p className="text-xs text-gray-600">Solar</p>
            <input
              type="number"
              value={status.solarVoltage}
              onChange={(e) => onSolarVoltageChange(parseInt(e.target.value) || 0)}
              className={`w-full text-2xl font-bold bg-transparent text-center mt-1 border-b focus:outline-none ${
                status.solarEnabled && status.solarVoltage > 20 ? 'text-yellow-600 border-yellow-300' : 'text-gray-400 border-gray-300'
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">V</p>
          </div>
        )}

        <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-400">
          <Battery className="mx-auto mb-2 text-green-600" />
          <p className="text-xs text-gray-600">Battery</p>
          <input
            type="number"
            step="0.1"
            value={status.voltage}
            onChange={(e) => onVoltageChange(parseFloat(e.target.value) || 0)}
            className="w-full text-2xl font-bold text-green-600 bg-transparent text-center mt-1 border-b border-green-300 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">V</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="font-medium text-sm">{powerSourceStatus}</span>
        <button
          onClick={onToggleCharging}
          className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
            status.isCharging ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {status.isCharging ? '⚡ Charging' : 'Battery'}
        </button>
      </div>
    </div>
  );
};
