// Matrix Rain Controls - Complete Implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Controls.js loading...');
    
    // Get canvas element
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) {
        console.error('Matrix rain canvas not found!');
        return;
    }
    
    // Create MatrixRain instance
    const matrixRain = new MatrixRain(canvas);
    
    // Make available globally for debugging
    window.matrixRain = matrixRain;
    
    // Get control elements
    const themeSelect = document.getElementById('theme-select');
    const speedSlider = document.getElementById('speed-slider');
    const densitySlider = document.getElementById('density-slider');
    const sizeSlider = document.getElementById('size-slider');
    const trailSlider = document.getElementById('trail-slider');
    const glowSlider = document.getElementById('glow-slider');
    
    // Display elements
    const speedValue = document.getElementById('speed-value');
    const densityValue = document.getElementById('density-value');
    const sizeValue = document.getElementById('size-value');
    const trailValue = document.getElementById('trail-value');
    const glowValue = document.getElementById('glow-value');
    
    // Button elements
    const toggleBtn = document.getElementById('toggle-rain');
    const randomThemeBtn = document.getElementById('random-theme');
    const resetBtn = document.getElementById('reset-settings');
    const exportBtn = document.getElementById('export-config');
    const toggleControlsBtn = document.getElementById('toggle-controls');
    const controlsPanel = document.getElementById('controls');
    
    // Theme change handler
    function handleThemeChange(theme) {
        console.log('Theme changing to:', theme);
        matrixRain.updateConfig({ theme: theme });
        
        // Update theme select if this was called programmatically
        if (themeSelect.value !== theme) {
            themeSelect.value = theme;
        }
    }
    
    themeSelect.addEventListener('change', function() {
        handleThemeChange(this.value);
    });
    
    // Speed control
    function updateSpeed(speed) {
        speedValue.textContent = speed;
        matrixRain.updateConfig({ speed: parseInt(speed) });
    }
    
    speedSlider.addEventListener('input', function() {
        updateSpeed(this.value);
    });
    
    // Density control
    function updateDensity(density) {
        densityValue.textContent = density;
        matrixRain.updateConfig({ density: parseInt(density) });
    }
    
    densitySlider.addEventListener('input', function() {
        updateDensity(this.value);
    });
    
    // Size control
    function updateSize(size) {
        sizeValue.textContent = size;
        matrixRain.updateConfig({ fontSize: parseInt(size) });
    }
    
    sizeSlider.addEventListener('input', function() {
        updateSize(this.value);
    });
    
    // Trail control
    function updateTrail(trail) {
        trailValue.textContent = trail;
        matrixRain.updateConfig({ trailOpacity: parseInt(trail) });
    }
    
    trailSlider.addEventListener('input', function() {
        updateTrail(this.value);
    });
    
    // Glow control
    function updateGlow(glow) {
        glowValue.textContent = glow;
        matrixRain.updateConfig({ glowIntensity: parseInt(glow) });
    }
    
    glowSlider.addEventListener('input', function() {
        updateGlow(this.value);
    });
    
    // Toggle rain button
    toggleBtn.addEventListener('click', function() {
        matrixRain.toggle();
        
        // Update button text based on state
        if (matrixRain.isRunning) {
            this.textContent = 'Pause Rain';
        } else {
            this.textContent = 'Resume Rain';
        }
    });
    
    // Add toggle method to MatrixRain if it doesn't exist
    if (!matrixRain.toggle) {
        matrixRain.toggle = function() {
            if (this.isRunning) {
                this.pause();
            } else {
                this.resume();
            }
        };
    }
    
    // Random theme button
    randomThemeBtn.addEventListener('click', function() {
        const themes = Object.keys(THEMES);
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        handleThemeChange(randomTheme);
        console.log('Random theme selected:', randomTheme);
    });
    
    // Reset button
    resetBtn.addEventListener('click', function() {
        // Reset all controls to default values
        const defaults = {
            theme: 'matrix-lite',
            speed: 20,
            density: 33,
            fontSize: 14,
            trailOpacity: 8,
            glowIntensity: 0
        };
        
        // Update UI controls
        themeSelect.value = defaults.theme;
        speedSlider.value = defaults.speed;
        densitySlider.value = defaults.density;
        sizeSlider.value = defaults.fontSize;
        trailSlider.value = defaults.trailOpacity;
        glowSlider.value = defaults.glowIntensity;
        
        // Update display values
        speedValue.textContent = defaults.speed;
        densityValue.textContent = defaults.density;
        sizeValue.textContent = defaults.fontSize;
        trailValue.textContent = defaults.trailOpacity;
        glowValue.textContent = defaults.glowIntensity;
        
        // Update MatrixRain config
        matrixRain.updateConfig(defaults);
        
        // Reset toggle button text
        toggleBtn.textContent = 'Pause Rain';
        
        console.log('Settings reset to defaults');
    });
    
    // Export configuration
    exportBtn.addEventListener('click', function() {
        try {
            const config = matrixRain.exportConfig();
            const blob = new Blob([config], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matrix-rain-config.json';
            a.click();
            URL.revokeObjectURL(url);
            console.log('Configuration exported successfully');
        } catch (error) {
            console.error('Failed to export configuration:', error);
            alert('Failed to export configuration. Check console for details.');
        }
    });
    
    // Toggle controls panel visibility
    let controlsVisible = true;
    toggleControlsBtn.addEventListener('click', function() {
        controlsVisible = !controlsVisible;
        
        if (controlsVisible) {
            controlsPanel.classList.add('visible');
            this.style.transform = 'rotate(0deg)';
        } else {
            controlsPanel.classList.remove('visible');
            this.style.transform = 'rotate(180deg)';
        }
    });
    
    // Make controls visible by default
    controlsPanel.classList.add('visible');
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Space bar to toggle rain
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            toggleBtn.click();
        }
        
        // 'R' for random theme
        if (e.code === 'KeyR' && e.target.tagName !== 'INPUT') {
            randomThemeBtn.click();
        }
        
        // 'C' to toggle controls
        if (e.code === 'KeyC' && e.target.tagName !== 'INPUT') {
            toggleControlsBtn.click();
        }
    });
    
    // Initialize display values with current config
    const currentConfig = matrixRain.getConfig();
    speedValue.textContent = currentConfig.speed;
    densityValue.textContent = currentConfig.density;
    sizeValue.textContent = currentConfig.fontSize;
    trailValue.textContent = currentConfig.trailOpacity;
    glowValue.textContent = currentConfig.glowIntensity;
    
    // Set initial slider values to match config
    speedSlider.value = currentConfig.speed;
    densitySlider.value = currentConfig.density;
    sizeSlider.value = currentConfig.fontSize;
    trailSlider.value = currentConfig.trailOpacity;
    glowSlider.value = currentConfig.glowIntensity;
    themeSelect.value = currentConfig.theme;
    
    // Auto-start the animation
    matrixRain.start();
    
    console.log('Matrix Rain controls initialized successfully');
    
    // Add global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error in Matrix Rain:', e);
    });
});