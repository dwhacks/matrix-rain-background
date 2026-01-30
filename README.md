# Matrix Rain Background

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

A customizable Matrix-style digital rain effect built with vanilla JavaScript and HTML5 Canvas. Perfect for creating cyberpunk-themed websites, backgrounds, or visual effects.

## 🌟 Live Demos

- **[Full Interactive Demo](https://yourusername.github.io/matrix-rain-background/)** - Complete demo with controls
- **[Background Demo](https://yourusername.github.io/matrix-rain-background/background-demo.html)** - Simple full-page background effect  
- **[Section Demo](https://yourusername.github.io/matrix-rain-background/section-demo.html)** - Matrix rain in a hero section

## 🚀 Quick Start

## ✨ Features

- **Multiple Themes**: Classic green, ocean blue, sunset red, cyber purple, amber glow, monochrome, and performance-optimized matrix-lite
- **Advanced Controls**: Real-time adjustment of speed, density, character size, and trail effects
- **Mixed Character Set**: Combines Japanese katakana, English alphanumeric, and symbols
- **Responsive Design**: Automatically adapts to window resizing
- **Performance Optimized**: Uses requestAnimationFrame for smooth 60fps animation
- **Easy Integration**: Simple API for embedding in any website
- **Export/Import**: Save and load configuration settings

## 🎯 Quick Usage

### As Background (Simple)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <canvas id="matrix-rain"></canvas>
    <script src="src/themes.js"></script>
    <script src="src/matrix-rain.js"></script>
    <script>
        const canvas = document.getElementById('matrix-rain');
        const matrixRain = new MatrixRain(canvas, {
            theme: 'matrix-lite',
            speed: 20,
            density: 25
        });
        matrixRain.start();
    </script>
</body>
</html>
```

## 📋 Options

| Option | Type | Default | Range | Description |
|--------|------|---------|-------|-------------|
| `theme` | string | 'matrix-lite' | - | Color theme name |
| `speed` | number | 20 | 1-30 | Animation speed |
| `density` | number | 25 | 10-100 | Drop density (%) |
| `fontSize` | number | 14 | 10-30 | Character size in pixels |
| `trailOpacity` | number | 8 | 1-20 | Trail fade effect |
| `glowIntensity` | number | 0 | 0-100 | Glow effect intensity |
| `characterSet` | string | 'mixed' | - | Character set to use |

## 🎨 Available Themes

- `matrix` - Classic green Matrix effect
- `ocean` - Ocean blue theme
- `sunset` - Sunset red theme
- `cyber` - Cyber purple theme
- `amber` - Amber glow theme
- `mono` - Monochrome theme
- `matrix-lite` - **Performance optimized** theme (no glow)

## 🎮 API Methods

```javascript
// Animation control
matrixRain.start()
matrixRain.stop()
matrixRain.pause()
matrixRain.resume()
matrixRain.toggle()

// Configuration
matrixRain.updateConfig({ speed: 25, theme: 'ocean' })
matrixRain.getConfig()
matrixRain.exportConfig()
matrixRain.importConfig(configString)
```

## 📱 Responsive Design

The canvas automatically resizes to fit its container. For custom containers:

```javascript
const container = document.getElementById('my-container');
const canvas = document.getElementById('matrix-rain');

// Set custom size
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

// Handle resizing
new ResizeObserver(() => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    matrixRain.startDropsAtTarget();
}).observe(container);
```

## 🎛️ Interactive Controls

The full demo includes an interactive control panel with:

- Theme selection dropdown
- Speed control (1-30)
- Density adjustment (10-100%)
- Character size (10-30px)
- Trail length (1-20)
- Glow effect toggle (0-100%)

### Keyboard Shortcuts

- `Space` - Toggle rain pause/resume
- `R` - Random theme
- `C` - Toggle controls panel

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📁 Project Structure

```
matrix-rain-background/
├── index.html              # Main demo with controls
├── background-demo.html     # Simple background demo
├── section-demo.html       # Section/hero demo
├── USAGE.md               # Detailed usage guide
├── src/
│   ├── matrix-rain.js      # Core animation class
│   └── themes.js           # Color theme definitions
├── css/
│   ├── styles.css          # Main styles
│   └── controls.css        # Control panel styles
└── assets/                # Example content
```

## ⚡ Performance Tips

1. **Use 'matrix-lite' theme** for best performance
2. **Keep density below 30%** for background use
3. **Set glow to 0** for performance-critical pages
4. **Use smaller font sizes** (12-16px) for sections

## 🎯 Integration Examples

### As Page Background

```css
body {
    margin: 0;
    overflow: hidden;
}

#matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

.content {
    position: relative;
    z-index: 1;
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 2rem;
}
```

### In Hero Section

```html
<section class="hero">
    <canvas id="hero-matrix"></canvas>
    <div class="hero-content">
        <h1>Your Title Here</h1>
        <p>Content over Matrix background</p>
    </div>
</section>
```

## 🚀 Getting Started

1. **Clone or download** the files
2. **Start the demo**: `python3 -m http.server 8000`
3. **Open**: http://localhost:8000
4. **Copy the code** from the demos for your project

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Ready to add some cyberpunk flair to your website? 🚀**