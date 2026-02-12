# Sandbox Landing Page

Landing page with automated build system using Gulp.

## Installation

Install dependencies:

```bash
npm install
```

## Available Commands

### Production Build
Minifies all files and compiles to the `dist` folder:

```bash
npm run build
```

or

```bash
gulp build
```

### Clean dist folder
Removes all files from the `dist` folder:

```bash
npm run clean
```

or

```bash
gulp clean
```

### Watch Mode (Development)
Monitors file changes and automatically recompiles:

```bash
npm run watch
```

or

```bash
gulp watch
```

## Project Structure

```
.
├── index.html      # Main HTML
├── styles.css      # Styles
├── script.js       # JavaScript
├── dist/           # Compiled and minified files (generated)
│   ├── index.html
│   ├── styles.min.css
│   └── script.min.js
├── gulpfile.js     # Gulp configuration
└── package.json    # Project dependencies
```

## What does the build do?

- **Minifies CSS**: Removes spaces, comments and optimizes the code
- **Minifies JavaScript**: Compresses and optimizes JS code
- **Minifies HTML**: Removes unnecessary spaces and comments
- **Updates references**: Automatically updates links in HTML to `.min` files

## Deploy

After running `npm run build`, the `dist` folder contains all optimized files ready for deployment.

