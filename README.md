# SBC - Solar Battery Calculator

A modern, responsive solar power system calculator built with React, TypeScript, and Vite. This application helps users monitor and calculate battery backup times, system efficiency, and power management for solar installations.

## Features

### 🔋 Battery Monitoring

- Real-time battery voltage monitoring
- Accurate percentage calculations based on voltage
- Support for 12V, 24V, and 48V systems
- Visual battery level indicator with charging animation
- **Charge ETA calculation** - Shows estimated time to reach 100% charge

### ⚡ Power Source Management

- NEPA (Grid) power monitoring
- Solar panel integration
- Automatic solar toggle based on sunrise/sunset times
- Hybrid mode support (Solar + Grid)

### 📊 System Analytics

- Backup time calculations
- Load percentage monitoring
- Inverter capacity tracking
- Depth of discharge settings
- **Charge time estimation** - ETA to full charge based on current power sources

### 🎛️ System Configuration

- 4-step setup wizard
- Inverter brand and capacity selection
- Battery type and configuration
- Power source selection
- Solar panel capacity and timing

### 📱 Modern UI/UX

- Responsive design for all devices
- Dark theme with gradient backgrounds
- Intuitive controls and presets
- Real-time status updates

## Technology Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom Hooks** - Reusable state management

## Project Structure

```
src/
├── components/          # React components
│   ├── SetupWizard.tsx     # Initial setup flow
│   ├── SystemHeader.tsx    # System info and controls
│   ├── SystemStatus.tsx    # Live system monitoring
│   ├── BatteryDisplay.tsx  # Battery visualization
│   └── VoltageReference.tsx # Voltage reference table
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts  # Local storage management
│   ├── useSystemConfig.ts  # System configuration
│   └── useSystemStatus.ts  # System status management
├── utils/              # Utility functions
│   └── calculations.ts     # Battery and power calculations
├── data/               # Static data
│   ├── voltageReference.ts # Voltage reference tables
│   └── loadPresets.ts      # Load preset configurations
├── types/              # TypeScript type definitions
│   └── index.ts            # Main type definitions
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd solar_calculator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Initial Setup

1. **System Information**: Enter system name and inverter details
2. **Battery Configuration**: Select battery type, voltage, and capacity
3. **Power Sources**: Configure NEPA and solar panel settings
4. **Final Preferences**: Set depth of discharge and review settings

### Monitoring

- **Live Status**: Monitor voltage, load, and power sources in real-time
- **Battery Display**: Visual battery level with percentage and status
- **Backup Time**: Calculate remaining backup time based on current load
- **Charge ETA**: See estimated time to reach 100% battery charge
- **Load Management**: Use presets or manually set load values

### Configuration

- **Power Sources**: Toggle NEPA and solar on/off
- **Auto Solar**: Enable automatic solar switching based on time
- **System Reset**: Reset all configuration and data

## Key Improvements from Original

### 🏗️ Architecture

- **Modular Components**: Broke down monolithic component into focused, reusable pieces
- **Custom Hooks**: Extracted state logic into reusable hooks
- **TypeScript**: Added comprehensive type safety throughout
- **Separation of Concerns**: Clear separation between UI, logic, and data

### 🎨 UI/UX

- **Modern Design**: Updated with Tailwind CSS and modern design patterns
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Better Visual Hierarchy**: Clear information architecture
- **Improved Accessibility**: Better contrast and keyboard navigation

### ⚡ Performance

- **Optimized Re-renders**: Better state management reduces unnecessary renders
- **Lazy Loading**: Components load only when needed
- **Memoization**: Expensive calculations are memoized
- **Efficient State Updates**: Batched updates and proper dependency arrays

### 🔧 Developer Experience

- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Custom Hooks**: Reusable logic makes code more maintainable
- **Clear Structure**: Well-organized file structure
- **Error Handling**: Proper error boundaries and validation

### 📱 Features

- **Better State Management**: Persistent storage with proper error handling
- **Enhanced Calculations**: More accurate battery percentage calculations
- **Improved Presets**: Better load presets with descriptions
- **Auto Solar**: Intelligent solar panel management based on time
- **Charge ETA**: Real-time estimation of time to full charge

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email <elmubarak33@gmail.com> or create an issue in the repository.
