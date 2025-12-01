# Ortho Cephalometry

## Introduction

As a developer working in the healthcare technology space, I recently had the opportunity to modernize a legacy web application for **cephalometric analysis** - a crucial tool used by orthodontists for diagnostic purposes. The result is [**Ortho Cephalometry**](https://github.com/tjandrayana/ortho-cephalometry), a completely rebuilt, modern web application that maintains compatibility with the original while leveraging the latest web technologies.

## What is Cephalometric Analysis?

For those unfamiliar with orthodontics, **cephalometric analysis** is a diagnostic tool used to analyze the relationships between teeth, jaws, and facial structures. Orthodontists use lateral cephalogram X-rays (side-view head X-rays) to:

- Measure angles and distances between specific anatomical points
- Assess skeletal and dental relationships
- Plan orthodontic treatment
- Evaluate treatment progress

This analysis involves placing specific points on the X-ray image and calculating various measurements using established methods like Downs Analysis, Steiner Analysis, Tweed's Triangle, and more.


### ⭐ **Before you use it, please give a star to support this project!** ⭐


> **Note**: This project is a modernized version of the original [cephalometric](https://github.com/alexcorvi/cephalometric) project by [alexcorvi](https://github.com/alexcorvi).

## 🎯 Overview

This application allows you to upload lateral cephalogram images and perform computer-assisted cephalometric analysis for orthodontic diagnostic purposes. The tool is designed for dental professionals to analyze cephalometric radiographs efficiently.

## 🙏 Acknowledgments

This project is a modernized version of the original [cephalometric](https://github.com/alexcorvi/cephalometric) project by [alexcorvi](https://github.com/alexcorvi). We maintain full compatibility with the original project file format and analysis methods.

## ✨ What's New

This version has been completely modernized with:
- **Vite 5** - Lightning-fast build tool (replaced Webpack 4)
- **React 18** - Functional components with hooks (upgraded from React 16 class components)
- **TypeScript 5** - Improved type safety (upgraded from TypeScript 2.9)
- **MobX 6** - Latest state management (upgraded from MobX 5)
- **Comprehensive Makefile** - Easy project management with background process support

## 📋 Features

### Analysis Methods

- **Basic & Common Analysis** - Standard cephalometric measurements
- **Dental Analysis** - Dental relationship analysis
- **Vertical Relationships Analysis** - Vertical facial proportions
- **Mandibular Rotations** - Mandibular position analysis
- **Downs Analysis** - Comprehensive Downs cephalometric analysis
- **Steiner Analysis** - Steiner analysis method
- **Mills-Eastman Analysis** - Mills-Eastman correction analysis
- **Wits Appraisal** - Wits analysis for skeletal relationships
- **Tweed's Triangle** - Tweed analysis method

### Core Features

- 📤 Upload lateral cephalogram images
- 🎯 Interactive point placement and measurement
- 💾 Save and load project files (`.cephalometric` format)
- 📥 Export images (PNG format)
- 🔄 Compatible with original project file format
- 🪟 Can be embedded as an iframe in larger applications
- 📊 Multiple analysis methods with detailed measurements and interpretations

## 📦 Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)
- **Make** (for Makefile commands - usually pre-installed on Unix-like systems)

## 🚀 Getting Started

### Installation

```bash
# Using Makefile (recommended)
make install

# Or using npm directly
npm install
```

### Development

```bash
# Run development server in background (recommended)
make dev-bg

# Or run in foreground
make dev

# Check if server is running
make status

# View logs
make logs

# Stop the server
make stop
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
make build

# Preview production build in background
make preview-bg

# Or preview in foreground
make preview

# Check preview server status
make status-preview

# View preview server logs
make logs-preview

# Stop preview server
make stop-preview
```

The built files will be in the `dist` directory.

## 📖 Makefile Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make install` | Install npm dependencies |
| `make dev` / `make dev-bg` | Run development server (foreground/background) |
| `make stop` | Stop background development server |
| `make build` | Build for production |
| `make preview` / `make preview-bg` | Preview production build (foreground/background) |
| `make stop-preview` | Stop background preview server |
| `make status` / `make status-preview` | Check server status |
| `make logs` / `make logs-preview` | View server logs |
| `make lint` | Run ESLint |
| `make clean` | Clean build artifacts and log files |

## 🔧 Alternative Usage (without Makefile)

If you prefer not to use the Makefile, you can use npm scripts directly:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📁 Project Structure

```
ortho-cephalometry/
├── src/
│   ├── data/              # Data models and state management
│   ├── literature/        # Cephalometric points, angles, and analysis methods
│   │   ├── analysis/      # Analysis method implementations
│   │   ├── angles.ts      # Angle definitions
│   │   ├── distances.ts   # Distance measurements
│   │   └── points.ts      # Cephalometric point definitions
│   ├── view-components/   # React components
│   ├── utils.ts           # Utility functions
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── dist/                  # Production build output
├── Makefile               # Build automation and process management
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔄 Migration Notes

- Project file format remains **completely compatible** - you can use `.cephalometric` files from the original project
- Message protocol for iframe embedding remains the same (`cephalometric-open:`, `cephalometric-save:`)
- All analysis methods and measurements are identical

## 🌐 Browser Support

**Chrome** (recommended), **Firefox**, **Safari**, **Edge** - Modern versions supported

## 📝 License

See LICENSE file for details. The original project by [alexcorvi](https://github.com/alexcorvi) is licensed under the MIT license.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Resources

- **Blog Post**: [Modernizing Cephalometric Analysis: Building a Web App for Orthodontic Diagnostics](https://dev.to/tj1609/modernizing-cephalometric-analysis-building-a-web-app-for-orthodontic-diagnostics-3lp7) - Read about the modernization journey on dev.to
- Original project: [https://github.com/alexcorvi/cephalometric](https://github.com/alexcorvi/cephalometric)
- Original demo: [http://cephalometric.apexo.app/](http://cephalometric.apexo.app/)

**Note**: This tool was originally part of a larger dental practice management application called Apexo. This version is a standalone, modernized implementation that maintains full compatibility with the original project format.

---

