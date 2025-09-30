import type { SystemConfig, BatteryStatus, PowerSourceStatus } from '../types';

export function calculateBatteryPercentage(voltage: number, isCharging: boolean, systemVoltage: number): number {
  let restingVoltage = voltage;
  
  if (isCharging && voltage > 28.5) {
    restingVoltage = voltage - 2.6;
  } else if (isCharging && voltage > 27.5) {
    restingVoltage = voltage - 1.5;
  } else if (isCharging && voltage > 26.8) {
    restingVoltage = voltage - 0.6;
  }
  
  const voltageMultiplier = systemVoltage / 24;
  const adjustedVoltage = restingVoltage / voltageMultiplier;
  
  if (adjustedVoltage >= 27.2) return 100;
  if (adjustedVoltage >= 26.4) return 90 + ((adjustedVoltage - 26.4) / 0.8) * 10;
  if (adjustedVoltage >= 25.8) return 80 + ((adjustedVoltage - 25.8) / 0.6) * 10;
  if (adjustedVoltage >= 25.2) return 70 + ((adjustedVoltage - 25.2) / 0.6) * 10;
  if (adjustedVoltage >= 24.8) return 60 + ((adjustedVoltage - 24.8) / 0.4) * 10;
  if (adjustedVoltage >= 24.4) return 50 + ((adjustedVoltage - 24.4) / 0.4) * 10;
  if (adjustedVoltage >= 24.0) return 40 + ((adjustedVoltage - 24.0) / 0.4) * 10;
  if (adjustedVoltage >= 23.6) return 30 + ((adjustedVoltage - 23.6) / 0.4) * 10;
  if (adjustedVoltage >= 23.2) return 20 + ((adjustedVoltage - 23.2) / 0.4) * 10;
  if (adjustedVoltage >= 22.8) return 10 + ((adjustedVoltage - 22.8) / 0.4) * 10;
  return 0;
}

export function getBatteryStatus(voltage: number, isCharging: boolean, systemVoltage: number): BatteryStatus {
  const percentage = calculateBatteryPercentage(voltage, isCharging, systemVoltage);
  
  if (isCharging && voltage > 28.5) {
    return { 
      percentage, 
      status: "Bulk Charging", 
      color: "text-blue-600", 
      bgColor: "bg-blue-100" 
    };
  }
  if (isCharging && voltage > 27.5) {
    return { 
      percentage, 
      status: "Absorption", 
      color: "text-blue-500", 
      bgColor: "bg-blue-50" 
    };
  }
  if (isCharging && voltage > 26.8) {
    return { 
      percentage, 
      status: "Float Charging", 
      color: "text-green-600", 
      bgColor: "bg-green-100" 
    };
  }
  
  if (percentage >= 80) {
    return { 
      percentage, 
      status: "Good", 
      color: "text-green-600", 
      bgColor: "bg-green-100" 
    };
  }
  if (percentage >= 50) {
    return { 
      percentage, 
      status: "Fair", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-100" 
    };
  }
  if (percentage >= 30) {
    return { 
      percentage, 
      status: "Low", 
      color: "text-orange-600", 
      bgColor: "bg-orange-100" 
    };
  }
  
  return { 
    percentage, 
    status: "Critical", 
    color: "text-red-600", 
    bgColor: "bg-red-100" 
  };
}

export function getPowerSourceStatus(
  nepaEnabled: boolean, 
  gridVoltage: number, 
  solarEnabled: boolean, 
  solarVoltage: number
): PowerSourceStatus {
  const nepaAvailable = nepaEnabled && gridVoltage > 100;
  const solarAvailable = solarEnabled && solarVoltage > 20;

  let mode: PowerSourceStatus['mode'];
  if (nepaAvailable && solarAvailable) {
    mode = "Hybrid Mode - Solar & NEPA";
  } else if (solarAvailable && !nepaAvailable) {
    mode = "Solar Only Mode";
  } else if (!solarAvailable && nepaAvailable) {
    mode = "NEPA Only Mode";
  } else {
    mode = "Battery Only - No Input!";
  }

  return {
    nepaAvailable,
    solarAvailable,
    mode
  };
}

export function calculateBackupTime(
  voltage: number, 
  loadWatts: number, 
  config: SystemConfig
): string {
  const percentage = calculateBatteryPercentage(voltage, false, config.systemVoltage);
  const totalCapacity = config.batteryCapacity;
  const totalWh = (totalCapacity * config.systemVoltage * percentage) / 100;
  const usableWh = totalWh * (config.depthOfDischarge / 100);
  
  if (loadWatts === 0) return "∞";
  const hours = usableWh / loadWatts;
  
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 24) return `${hours.toFixed(1)} hrs`;
  return `${Math.floor(hours / 24)}d ${Math.round(hours % 24)}h`;
}

export function calculateLoadPercentage(load: number, inverterCapacity: number): number {
  return (load / inverterCapacity) * 100;
}

export function calculateSolarPower(solarVoltage: number, solarCapacity: number): number {
  return Math.round((solarVoltage / 60) * solarCapacity);
}

export function calculateChargeETA(
  currentVoltage: number,
  systemVoltage: number,
  batteryCapacity: number,
  numBatteries: number,
  nepaAvailable: boolean,
  solarAvailable: boolean,
  solarPower: number,
  inverterCapacity: number
): string {

  const currentPercentage = calculateBatteryPercentage(currentVoltage, true, systemVoltage);
  

  if (currentPercentage >= 100) {
    return "Fully Charged";
  }
  

  const totalCapacityWh = (batteryCapacity * systemVoltage * numBatteries);
  const remainingCapacityWh = totalCapacityWh * (100 - currentPercentage) / 100;
  

  let chargingPower = 0;
  
  if (nepaAvailable) {

    chargingPower += inverterCapacity * 0.8;
  }
  
  if (solarAvailable) {

    chargingPower += solarPower;
  }
  

  if (chargingPower === 0) {
    return "No Charging";
  }
  

  const hoursToCharge = remainingCapacityWh / chargingPower;
  

  if (hoursToCharge < 0.1) {
    return "< 6 min";
  }
  
  if (hoursToCharge < 1) {
    return `${Math.round(hoursToCharge * 60)} min`;
  }
  
  if (hoursToCharge < 24) {
    return `${hoursToCharge.toFixed(1)} hrs`;
  }
  

  const days = Math.floor(hoursToCharge / 24);
  const remainingHours = Math.round(hoursToCharge % 24);
  
  if (days === 0) {
    return `${remainingHours} hrs`;
  }
  
  return `${days}d ${remainingHours}h`;
}

export function getChargeStatus(
  currentVoltage: number,
  systemVoltage: number,
  isCharging: boolean,
  nepaAvailable: boolean,
  solarAvailable: boolean
): {
  status: 'Charging' | 'Not Charging' | 'Fully Charged' | 'No Power';
  color: string;
  bgColor: string;
} {
  const currentPercentage = calculateBatteryPercentage(currentVoltage, true, systemVoltage);
  
  if (currentPercentage >= 100) {
    return {
      status: 'Fully Charged',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  }
  
  if (!isCharging || (!nepaAvailable && !solarAvailable)) {
    return {
      status: 'No Power',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    };
  }
  
  if (isCharging && (nepaAvailable || solarAvailable)) {
    return {
      status: 'Charging',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    };
  }
  
  return {
    status: 'Not Charging',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  };
}
