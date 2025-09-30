import { useLocalStorage } from './useLocalStorage';
import type { SystemConfig } from '../types';

const defaultConfig: SystemConfig = {
  inverterBrand: '',
  inverterCapacity: 4200,
  batteryType: 'tubular',
  batteryBrand: 'Star Plus',
  batteryVoltage: 12,
  systemVoltage: 24,
  numBatteries: 2,
  batteryCapacity: 220,
  hasNepa: true,
  hasSolar: true,
  solarCapacity: 1000,
  depthOfDischarge: 50,
  systemName: 'SBC',
  timezone: 'Africa/Lagos',
  autoSolarToggle: true,
  sunriseHour: 6,
  sunsetHour: 18
};

export function useSystemConfig() {
  const [config, setConfig] = useLocalStorage<SystemConfig>('systemConfig', defaultConfig);
  const [setupComplete, setSetupComplete] = useLocalStorage<boolean>('setupComplete', false);

  const updateConfig = (updates: Partial<SystemConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    setSetupComplete(false);
  };

  return {
    config,
    setConfig,
    updateConfig,
    setupComplete,
    setSetupComplete,
    resetConfig
  };
}
