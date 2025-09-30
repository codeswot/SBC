export interface SystemConfig {
  inverterBrand: string;
  inverterCapacity: number;
  batteryType: 'tubular' | 'flat' | 'gel' | 'agm' | 'lithium';
  batteryBrand: string;
  batteryVoltage: number;
  systemVoltage: number;
  numBatteries: number;
  batteryCapacity: number;
  hasNepa: boolean;
  hasSolar: boolean;
  solarCapacity: number;
  depthOfDischarge: number;
  systemName: string;
  timezone: string;
  autoSolarToggle: boolean;
  sunriseHour: number;
  sunsetHour: number;
}

export interface SystemStatus {
  voltage: number;
  load: number;
  isCharging: boolean;
  solarVoltage: number;
  gridVoltage: number;
  outputVoltage: number;
  nepaEnabled: boolean;
  solarEnabled: boolean;
}

export interface BatteryStatus {
  percentage: number;
  status: 'Bulk Charging' | 'Absorption' | 'Float Charging' | 'Good' | 'Fair' | 'Low' | 'Critical';
  color: string;
  bgColor: string;
}

export interface PowerSourceStatus {
  nepaAvailable: boolean;
  solarAvailable: boolean;
  mode: 'Hybrid Mode - Solar & NEPA' | 'Solar Only Mode' | 'NEPA Only Mode' | 'Battery Only - No Input!';
}

export interface VoltageReference {
  restingVoltage: string;
  chargingVoltage: string;
  percentage: number;
  status: 'Full' | 'Very Good' | 'Good' | 'Fair' | 'Low' | 'Critical';
}

export interface WizardStep {
  step: number;
  title: string;
  description: string;
}

export interface LoadPreset {
  name: string;
  watts: number;
  color: string;
  description: string;
}

export interface ChargeStatus {
  status: 'Charging' | 'Not Charging' | 'Fully Charged' | 'No Power';
  color: string;
  bgColor: string;
}
