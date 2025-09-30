import type { LoadPreset } from '../types';

export const loadPresets: LoadPreset[] = [
  {
    name: "Lights",
    watts: 100,
    color: "bg-green-100 hover:bg-green-200",
    description: "LED lights"
  },
  {
    name: "TV",
    watts: 500,
    color: "bg-yellow-100 hover:bg-yellow-200",
    description: "Television"
  },
  {
    name: "Fridge",
    watts: 1500,
    color: "bg-orange-100 hover:bg-orange-200",
    description: "Refrigerator"
  },
  {
    name: "AC",
    watts: 2000,
    color: "bg-red-100 hover:bg-red-200",
    description: "Air conditioning"
  },
  {
    name: "Heavy",
    watts: 3000,
    color: "bg-purple-100 hover:bg-purple-200",
    description: "Heavy appliances"
  },
  {
    name: "Off",
    watts: 0,
    color: "bg-gray-100 hover:bg-gray-200",
    description: "No load"
  }
];
