import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { SystemConfig } from '../types';
import { getVoltageReference } from '../data/voltageReference';

interface VoltageReferenceProps {
  config: SystemConfig;
}

export const VoltageReferenceTable: React.FC<VoltageReferenceProps> = ({ config }) => {
  const voltageData = getVoltageReference(config.systemVoltage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Full':
      case 'Very Good':
        return 'bg-green-100 text-green-700';
      case 'Good':
        return 'bg-blue-100 text-blue-700';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-orange-100 text-orange-700';
      case 'Critical':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="text-blue-600" />
        {config.systemVoltage}V Battery Voltage Reference
      </h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
        <p className="font-semibold text-blue-800 mb-1">📌 Important Note:</p>
        <p className="text-gray-700">
          Charging voltage is 2-3V higher than resting voltage. For accurate percentage, turn off charging and wait 10-15 minutes.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 px-3">Resting Voltage</th>
              <th className="text-left py-2 px-3">Charging Voltage</th>
              <th className="text-left py-2 px-3">Percentage</th>
              <th className="text-left py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {voltageData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-3 font-semibold">{row.restingVoltage}</td>
                <td className="py-2 px-3 text-blue-600">{row.chargingVoltage}</td>
                <td className="py-2 px-3 font-medium">{row.percentage}%</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
