import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { SystemStatus } from '../types';

export function useSystemStatus() {
  const [voltage, setVoltage] = useLocalStorage<number>('batteryVoltage', 29.2);
  const [load, setLoad] = useLocalStorage<number>('currentLoad', 180);
  const [nepaEnabled, setNepaEnabled] = useLocalStorage<boolean>('nepaEnabled', true);
  const [isCharging, setIsCharging] = useState(true);
  const [solarVoltage, setSolarVoltage] = useLocalStorage<number>('solarVoltage', 58);
  const [gridVoltage, setGridVoltage] = useLocalStorage<number>('gridVoltage', 190);
  const [outputVoltage, setOutputVoltage] = useLocalStorage<number>('outputVoltage', 190);
  const [solarEnabled, setSolarEnabled] = useLocalStorage<boolean>('solarEnabled', true);

  const status: SystemStatus = {
    voltage,
    load,
    isCharging,
    solarVoltage,
    gridVoltage,
    outputVoltage,
    nepaEnabled,
    solarEnabled
  };

  const updateStatus = (updates: Partial<SystemStatus>) => {
    if (updates.voltage !== undefined) setVoltage(updates.voltage);
    if (updates.load !== undefined) setLoad(updates.load);
    if (updates.nepaEnabled !== undefined) setNepaEnabled(updates.nepaEnabled);
    if (updates.isCharging !== undefined) setIsCharging(updates.isCharging);
    if (updates.solarVoltage !== undefined) setSolarVoltage(updates.solarVoltage);
    if (updates.gridVoltage !== undefined) setGridVoltage(updates.gridVoltage);
    if (updates.outputVoltage !== undefined) setOutputVoltage(updates.outputVoltage);
    if (updates.solarEnabled !== undefined) setSolarEnabled(updates.solarEnabled);
  };

  return {
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
  };
}
