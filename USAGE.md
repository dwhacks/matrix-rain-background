# Matrix Rain Background - Usage Guide

## 🎯 Quick Start

### 1. As Full Page Background

Simply include the required files and the Matrix Rain will fill the entire viewport:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website - Matrix Background</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <canvas id="matrix-rain"></canvas>
    
    <!-- Your content goes here -->
    <div class="content">
        <h1>Welcome to My Website</h1>
        <p>This has a Matrix rain background effect.</p>
    </div>
    
    <!-- Matrix Rain Scripts -->
    <script src="src/themes.js"></script>
    <script src="src/matrix-rain.js"></script>
    <script>
        // Initialize Matrix Rain with default settings
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('matrix-rain');
            const matrixRain = new MatrixRain(canvas, {
                theme: 'matrix-lite',    // Performance optimized theme
                speed: 20,             // Comfortable speed
                density: 25,           // Light density for background use
                fontSize: 16           // Readable character size
            });
            matrixRain.start();
        });
    </script>
</body>
</html>
```

### 2. As Section Background

Use it in a specific section (like hero section):

```html
<section class="hero-section">
    <canvas id="hero-matrix"></canvas>
    <div class="hero-content">
        <h1>Amazing Product</h1>
        <p>Experience the future of web design</p>
        <button>Get Started</button>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('hero-matrix');
        const matrixRain = new MatrixRain(canvas, {
            theme: 'cyber',          // Cyber purple theme
            speed: 15,              // Slower for section background
            density: 30,             // Medium density
            fontSize: 14,           // Smaller for section
            glowIntensity: 20        // Some glow for visual appeal
        });
        
        // Important: Set canvas to fill parent container, not whole window
        matrixRain.canvas.width = canvas.parentElement.offsetWidth;
        matrixRain.canvas.height = canvas.parentElement.offsetHeight;
        matrixRain.start();
    });
</script>
```

## 🎨 Styling

### Full Page Background CSS

```css
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
    font-family: Arial, sans-serif;
}

#matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1; /* Behind content */
}

.content {
    position: relative;
    z-index: 1; /* Above background */
    color: white;
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent overlay */
    padding: 2rem;
    max-width: 800px;
    margin: 2rem auto;
    border-radius: 10px;
}
```

### Section Background CSS

```css
.hero-section {
    position: relative;
    height: 500px;
    overflow: hidden;
    background: #000;
}

#hero-matrix {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    color: white;
    text-align: center;
    padding-top: 150px;
    background: rgba(0, 0, 0, 0.6);
    height: 100%;
    box-sizing: border-box;
}
```

## ⚙️ Configuration Options

### Recommended Settings for Different Use Cases

#### **Full Page Background** (Performance Optimized)
```javascript
{
    theme: 'matrix-lite',    // No glow for performance
    speed: 20,             // Comfortable speed
    density: 25,           // Light density
    fontSize: 16,           // Readable size
    glowIntensity: 0        // No glow for performance
}
```

#### **Hero Section** (Visually Appealing)
```javascript
{
    theme: 'cyber',          // Nice purple theme
    speed: 15,              // Slower for section
    density: 30,             // Medium density
    fontSize: 14,           // Smaller for section
    glowIntensity: 20        // Some glow for appeal
}
```

#### **Minimal Background** (Subtle Effect)
```javascript
{
    theme: 'mono',           // Monochrome for subtlety
    speed: 10,              // Very slow
    density: 15,             // Low density
    fontSize: 12,           // Small characters
    glowIntensity: 0        // No glow for minimal
}
```

## 📁 Required Files

You only need these files:

```
src/
├── themes.js       # Theme definitions
└── matrix-rain.js # Core animation

css/
└── styles.css     # Basic styles (optional)
```

## 🎯 Performance Tips

1. **Use 'matrix-lite' theme** for best performance
2. **Keep density below 30%** for background use
3. **Set glow to 0** for performance-critical pages
4. **Use smaller font sizes** (12-16px) for sections

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Design

The Matrix Rain automatically adapts to container/window resizing. For custom containers:

```javascript
// Handle container resizing
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        const canvas = document.getElementById('matrix-rain');
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
        matrixRain.startDropsAtTarget(); // Recalculate columns
    }
});

resizeObserver.observe(container);
```

That's it! You now have an awesome Matrix rain background for your website. 🚀