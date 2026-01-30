/* Matrix Rain Theme Definitions */
const THEMES = {
    matrix: {
        name: 'Classic Green',
        background: '#000000',
        foreground: '#00ff00',
        glow: '#00ff00',
        trail: 'rgba(0, 0, 0, 0.05)'
    },
    ocean: {
        name: 'Ocean Blue',
        background: '#000814',
        foreground: '#00b4d8',
        glow: '#90e0ef',
        trail: 'rgba(0, 8, 20, 0.05)'
    },
    sunset: {
        name: 'Sunset Red',
        background: '#0a0a0a',
        foreground: '#ff006e',
        glow: '#ff4081',
        trail: 'rgba(10, 10, 10, 0.05)'
    },
    cyber: {
        name: 'Cyber Purple',
        background: '#0d0221',
        foreground: '#c77dff',
        glow: '#e0aaff',
        trail: 'rgba(13, 2, 33, 0.05)'
    },
    amber: {
        name: 'Amber Glow',
        background: '#1a0033',
        foreground: '#ffb700',
        glow: '#ffea00',
        trail: 'rgba(26, 0, 51, 0.05)'
    },
    mono: {
        name: 'Monochrome',
        background: '#000000',
        foreground: '#ffffff',
        glow: '#cccccc',
        trail: 'rgba(0, 0, 0, 0.05)'
    },
    'matrix-lite': {
        name: 'Matrix Lite (Performance)',
        background: '#000000',
        foreground: '#00cc00',
        glow: '#00cc00',
        trail: 'rgba(0, 0, 0, 0.1)'
    }
};

// Character sets for different styles
const CHARACTER_SETS = {
    japanese: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
    matrix: '01',
    extended: 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'
};

// Combined character set for mixed mode
const MIXED_CHARACTERS = CHARACTER_SETS.japanese + 
                          CHARACTER_SETS.alphanumeric + 
                          CHARACTER_SETS.symbols;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { THEMES, CHARACTER_SETS, MIXED_CHARACTERS };
}