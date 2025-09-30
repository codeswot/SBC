import type { VoltageReference } from '../types';

export const voltageReference24V: VoltageReference[] = [
  { restingVoltage: "27.2V+", chargingVoltage: "29.7V+", percentage: 100, status: "Full" },
  { restingVoltage: "26.4V", chargingVoltage: "29.0V", percentage: 90, status: "Very Good" },
  { restingVoltage: "25.8V", chargingVoltage: "28.4V", percentage: 80, status: "Good" },
  { restingVoltage: "25.2V", chargingVoltage: "27.8V", percentage: 70, status: "Good" },
  { restingVoltage: "24.8V", chargingVoltage: "27.4V", percentage: 60, status: "Fair" },
  { restingVoltage: "24.4V", chargingVoltage: "27.0V", percentage: 50, status: "Fair" },
  { restingVoltage: "24.0V", chargingVoltage: "26.6V", percentage: 40, status: "Low" },
  { restingVoltage: "23.6V", chargingVoltage: "26.2V", percentage: 30, status: "Low" },
  { restingVoltage: "23.2V", chargingVoltage: "25.8V", percentage: 20, status: "Critical" },
];

export const voltageReference12V: VoltageReference[] = [
  { restingVoltage: "13.6V+", chargingVoltage: "14.8V+", percentage: 100, status: "Full" },
  { restingVoltage: "13.2V", chargingVoltage: "14.5V", percentage: 90, status: "Very Good" },
  { restingVoltage: "12.9V", chargingVoltage: "14.2V", percentage: 80, status: "Good" },
  { restingVoltage: "12.6V", chargingVoltage: "13.9V", percentage: 70, status: "Good" },
  { restingVoltage: "12.4V", chargingVoltage: "13.7V", percentage: 60, status: "Fair" },
  { restingVoltage: "12.2V", chargingVoltage: "13.5V", percentage: 50, status: "Fair" },
  { restingVoltage: "12.0V", chargingVoltage: "13.3V", percentage: 40, status: "Low" },
  { restingVoltage: "11.8V", chargingVoltage: "13.1V", percentage: 30, status: "Low" },
];

export const voltageReference48V: VoltageReference[] = [
  { restingVoltage: "54.4V+", chargingVoltage: "59.4V+", percentage: 100, status: "Full" },
  { restingVoltage: "52.8V", chargingVoltage: "58.0V", percentage: 90, status: "Very Good" },
  { restingVoltage: "51.6V", chargingVoltage: "56.8V", percentage: 80, status: "Good" },
  { restingVoltage: "50.4V", chargingVoltage: "55.6V", percentage: 70, status: "Good" },
  { restingVoltage: "49.6V", chargingVoltage: "54.8V", percentage: 60, status: "Fair" },
  { restingVoltage: "48.8V", chargingVoltage: "54.0V", percentage: 50, status: "Fair" },
  { restingVoltage: "48.0V", chargingVoltage: "53.2V", percentage: 40, status: "Low" },
];

export function getVoltageReference(systemVoltage: number): VoltageReference[] {
  switch (systemVoltage) {
    case 12:
      return voltageReference12V;
    case 24:
      return voltageReference24V;
    case 48:
      return voltageReference48V;
    default:
      return voltageReference24V;
  }
}
