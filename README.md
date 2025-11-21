# Ortho Cephalometry

A modern web application for computer-assisted cephalometric analysis for orthodontic diagnostic use.

> **Note**: This project is a modernized version of the original [cephalometric](https://github.com/alexcorvi/cephalometric) project by [alexcorvi](https://github.com/alexcorvi).

## 🎯 Overview

This application allows you to upload lateral cephalogram images and perform computer-assisted cephalometric analysis for orthodontic diagnostic purposes. The tool is designed for dental professionals to analyze cephalometric radiographs efficiently.

## 🙏 Acknowledgments

This project is based on and modernized from the original work by [alexcorvi](https://github.com/alexcorvi) available at [https://github.com/alexcorvi/cephalometric](https://github.com/alexcorvi/cephalometric). We gratefully acknowledge the original work and maintain compatibility with the original project file format and analysis methods.

## ✨ What's New in This Version

### 🚀 Modernized Technology Stack

This version has been completely modernized with the latest web technologies:

- **Vite 5** - Lightning-fast build tool (replaced Webpack 4)
- **React 18** - Latest React with functional components and hooks (upgraded from React 16 class components)
- **TypeScript 5** - Latest TypeScript with improved type safety (upgraded from TypeScript 2.9)
- **ESLint** - Modern linting tool (replaced TSLint)
- **Sass (Dart Sass)** - Latest Sass compiler (replaced node-sass)
- **MobX 6** - Latest MobX for state management (upgraded from MobX 5)

All class components have been converted to functional components using React hooks, and the codebase now follows modern React patterns and best practices.

### 🛠️ Enhanced Developer Experience

**New Makefile Support** - The biggest addition to this repository is a comprehensive `Makefile` that makes it incredibly easy to run and manage the application. This sets it apart from the original project:

- **Easy setup**: `make install` - Install all dependencies with one command
- **Background development server**: `make dev-bg` - Run dev server in background with process management
- **Background production preview**: `make preview-bg` - Run production build in background
- **Process management**: `make status`, `make stop` - Check and stop running servers easily
- **Log viewing**: `make logs` - View real-time logs from background processes
- **Production builds**: `make build` - Simple production build command
- **Cleanup**: `make clean` - Easy cleanup of build artifacts

See the [Usage](#usage) section below for all available Makefile commands.

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

## 📖 Available Makefile Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make install` | Install npm dependencies |
| `make dev` | Run development server (foreground) |
| `make dev-bg` | Run development server (background) |
| `make stop` | Stop background development server |
| `make build` | Build for production |
| `make preview` | Preview production build (foreground) |
| `make preview-bg` | Preview production build (background) |
| `make stop-preview` | Stop background preview server |
| `make lint` | Run ESLint |
| `make clean` | Clean build artifacts and log files |
| `make status` | Check if dev server is running |
| `make status-preview` | Check if preview server is running |
| `make logs` | Show dev server logs |
| `make logs-preview` | Show preview server logs |

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

If you're migrating from the original project, note these changes:

- Project file format remains **completely compatible** - you can use `.cephalometric` files from the original project
- Message protocol for iframe embedding remains the same (`cephalometric-open:`, `cephalometric-save:`)
- All analysis methods and measurements are identical
- The codebase has been refactored to use modern React patterns

## 🌐 Browser Support

- **Chrome** (recommended) - Best compatibility
- **Firefox** - Should work, but Chrome is recommended
- **Safari** - Should work with modern versions
- **Edge** - Should work with modern versions

## 📝 License

See LICENSE file for details. The original project by [alexcorvi](https://github.com/alexcorvi) is licensed under the MIT license.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Resources

- Original project: [https://github.com/alexcorvi/cephalometric](https://github.com/alexcorvi/cephalometric)
- Original demo: [http://cephalometric.apexo.app/](http://cephalometric.apexo.app/)

## ⚠️ Limitations

- Cross-browser compatibility issues may exist (works best on Google Chrome)
- Requires modern browser with JavaScript enabled

---

**Note**: This tool was originally part of a larger dental practice management application called Apexo. This version is a standalone, modernized implementation that maintains full compatibility with the original project format.

