/* Matrix Rain - Density Fixed Implementation */
// Restored fixes for precise density control with random column movement

class MatrixRain {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
        this.animationId = null;
        
        if (!this.ctx) {
            console.error('Failed to get 2D context!');
            return;
        }
        
        // Default configuration
        this.config = {
            theme: 'matrix-lite',
            speed: 20,
            density: 20,
            fontSize: 14,
            trailOpacity: 8,
            glowIntensity: 0,
            characterSet: 'mixed',
            ...options
        };
        
        // Initialize properties
        this.drops = [];
        this.characters = [];
        this.columnCount = 0;
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        this.targetActiveDrops = 0;
        
        // Set up canvas and start
        this.init();
    }
    
    init() {
        console.log('MatrixRain initializing...');
        
        // Set solid black background
        document.body.style.backgroundColor = '#000000';
        this.canvas.style.backgroundColor = '#000000';
        
        this.resizeCanvas();
        this.applyTheme(this.config.theme);
        
        // Clear canvas to solid black
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set up resize listener
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.startDropsAtTarget();
        console.log('MatrixRain init complete');
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Clear to solid black on resize
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.startDropsAtTarget();
    }
    
    applyTheme(themeName) {
        if (THEMES[themeName]) {
            this.themeColors = { ...THEMES[themeName] };
        }
        
        if (themeName === 'matrix-lite' || themeName === 'mono') {
            this.performanceMode = 'ultra-light';
        } else {
            this.performanceMode = 'normal';
        }
    }
    
    startDropsAtTarget() {
        const columnWidth = this.config.fontSize;
        this.columnCount = Math.floor(this.canvas.width / columnWidth);
        
        // Calculate target number of active drops
        this.targetActiveDrops = Math.floor(this.columnCount * (this.config.density / 100));
        
        console.log(`Density ${this.config.density}%: ${this.columnCount} columns, target ${this.targetActiveDrops} drops`);
        
        // Initialize drops array - ALL start as empty (0)
        this.drops = [];
        this.characters = [];
        
        for (let i = 0; i < this.columnCount; i++) {
            this.drops[i] = 0;
            this.characters[i] = [];
        }
        
        // Select random columns for target drops
        const availableColumns = [];
        for (let i = 0; i < this.columnCount; i++) {
            availableColumns.push(i);
        }
        
        // Shuffle available columns
        for (let i = availableColumns.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = availableColumns[i];
            availableColumns[i] = availableColumns[j];
            availableColumns[j] = temp;
        }
        
        // Start drops in first N random columns
        for (let i = 0; i < this.targetActiveDrops; i++) {
            const column = availableColumns[i];
            this.drops[column] = 1 + Math.random() * 40; // Maximum stagger (0-40 range)
            console.log(`Started drop in column ${column} at height ${this.drops[column]}`);
        }
        
        // All other columns remain empty (0)
        for (let i = this.targetActiveDrops; i < this.columnCount; i++) {
            if (!availableColumns.includes(i)) {
                this.drops[i] = 0;
                this.characters[i] = [];
            }
        }
    }
    
    getRandomCharacter() {
        return MIXED_CHARACTERS.charAt(Math.floor(Math.random() * MIXED_CHARACTERS.length));
    }
    
    hexToRgba(hex, alpha) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    update() {
        if (!this.isRunning) return;
        
        // Clear trail effect - NO glow on background
        this.ctx.save(); // Save context state
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.fillStyle = `rgba(0, 0, 0, ${0.02 + (this.config.trailOpacity * 0.0115)})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore(); // Restore context state
        
        // Set text properties
        this.ctx.font = `${this.config.fontSize}px monospace`;
        
        // Calculate glow effect - enable for all themes except matrix-lite
        const glowIntensity = parseFloat(this.config.glowIntensity) / 100;
        const isGlowTheme = this.config.theme !== 'matrix-lite';
        // Auto-enable low-level glow for regular themes, user glow on top for all
        const effectiveGlowIntensity = isGlowTheme ? Math.max(0.15, glowIntensity) : glowIntensity;
        const shouldGlow = effectiveGlowIntensity > 0;
        
        if (shouldGlow) {
            this.ctx.shadowColor = this.themeColors.glow || this.themeColors.foreground;
            this.ctx.shadowBlur = Math.max(1, effectiveGlowIntensity * 12); // Reduced for performance
            this.ctx.shadowOffsetX = 0; // Remove offset for cleaner glow
            this.ctx.shadowOffsetY = 0; // Remove offset for cleaner glow
        } else {
            this.ctx.shadowBlur = 0;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
        }
        
        const columnWidth = this.config.fontSize;
        const dropSpeed = (this.config.speed / 30) * 0.8;
        const maxCharsPerColumn = Math.floor(this.canvas.height / this.config.fontSize);
        
        for (let i = 0; i < this.drops.length; i++) {
            // Skip if this column is empty
            if (this.drops[i] <= 0) {
                continue;
            }
            
            // Update drop position
            this.drops[i] += dropSpeed;
            
            // Calculate character count to draw
            const currentDropPosition = this.drops[i];
            const charCount = Math.min(
                Math.floor(currentDropPosition),
                maxCharsPerColumn
            );
            
            // Draw characters
            for (let j = 0; j < charCount; j++) {
                const y = (j + 1) * this.config.fontSize;
                const x = i * columnWidth;
                
                // Update character randomly
                if (Math.random() > 0.98) {
                    this.characters[i][j] = this.getRandomCharacter();
                }
                
                if (!this.characters[i][j]) {
                    this.characters[i][j] = this.getRandomCharacter();
                }
                
                // Set character color with fade
                const fadePosition = 1 - (j / charCount);
                const brightness = Math.max(0.05, 1.0 - (fadePosition * 1.5));
                
                if (j === charCount - 1) {
                    // Leading character - make it brightest with enhanced glow
                    this.ctx.fillStyle = this.themeColors.glow || this.themeColors.foreground;
                    if (shouldGlow) {
                        // Boost glow for leading character
                        this.ctx.shadowBlur = Math.max(2, effectiveGlowIntensity * 18);
                    }
                } else {
                    const color = this.hexToRgba(this.themeColors.foreground, brightness * 0.8);
                    this.ctx.fillStyle = color;
                    if (shouldGlow) {
                        // Reset to normal glow for trailing characters
                        this.ctx.shadowBlur = Math.max(1, effectiveGlowIntensity * 12);
                    }
                }
                
                this.ctx.fillText(this.characters[i][j], x, y);
                
                // Only reset shadow if we're not supposed to be glowing (performance optimization)
                if (!shouldGlow) {
                    this.ctx.shadowBlur = 0;
                    this.ctx.shadowOffsetX = 0;
                    this.ctx.shadowOffsetY = 0;
                }
            }
            
            // Reset drop when it goes completely off screen
            const resetThreshold = maxCharsPerColumn + 10;
            if (this.drops[i] > resetThreshold) {
                // Choose new random empty column
                const emptyColumns = [];
                for (let j = 0; j < this.columnCount; j++) {
                    if (this.drops[j] <= 0) {
                        emptyColumns.push(j);
                    }
                }
                
                if (emptyColumns.length > 0) {
                    const randomIndex = Math.floor(Math.random() * emptyColumns.length);
                    const newColumn = emptyColumns[randomIndex];
                    
                    // Start new drop
                    this.drops[newColumn] = 1;
                    this.characters[newColumn] = [];
                    console.log(`Drop finished column ${i}, moved to new column ${newColumn}`);
                }
                
                // Clear current column
                this.drops[i] = 0;
                this.characters[i] = [];
            }
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        
        this.lastFrameTime = currentTime;
        this.frameCount++;
        
        this.update();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        console.log('MatrixRain starting...');
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }
    
    stop() {
        console.log('MatrixRain stopping');
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    pause() {
        this.isRunning = false;
    }
    
    resume() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    toggle() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.resume();
        }
    }
    
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (newConfig.theme) {
            this.applyTheme(newConfig.theme);
        }
        
        if (newConfig.density !== undefined) {
            this.startDropsAtTarget();
        }
        
        if (newConfig.fontSize) {
            this.resizeCanvas();
        }
    }
    
    getConfig() {
        return { ...this.config };
    }
    
    exportConfig() {
        return JSON.stringify(this.getConfig(), null, 2);
    }
    
    importConfig(configString) {
        try {
            const config = JSON.parse(configString);
            this.updateConfig(config);
            return true;
        } catch (error) {
            console.error('Invalid config:', error);
            return false;
        }
    }
    
    getRandomTheme() {
        const themes = Object.keys(THEMES);
        return themes[Math.floor(Math.random() * themes.length)];
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.MatrixRain = MatrixRain;
}