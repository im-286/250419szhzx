// This file contains utility functions for working with charts

// Format large numbers for display
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Generate a color scale based on a min and max value
function generateColorScale(minValue, maxValue, colors = ['#f7fbff', '#08306b']) {
    return function(value) {
        const percentage = (value - minValue) / (maxValue - minValue);
        if (colors.length === 2) {
            return interpolateColor(colors[0], colors[1], percentage);
        } else {
            const segment = Math.min(Math.floor(percentage * (colors.length - 1)), colors.length - 2);
            const segmentPercentage = (percentage * (colors.length - 1)) - segment;
            return interpolateColor(colors[segment], colors[segment + 1], segmentPercentage);
        }
    };
}

// Interpolate between two colors
function interpolateColor(color1, color2, factor) {
    // Convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    // Convert RGB to hex
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    if (!c1 || !c2) return color1; // Fallback
    
    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));
    
    return rgbToHex(r, g, b);
}

// Create a responsive chart that resizes with its container
function createResponsiveChart(chart) {
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            chart.resize();
        }
    });
    
    resizeObserver.observe(chart.getDom());
    
    return {
        dispose: function() {
            resizeObserver.disconnect();
            chart.dispose();
        }
    };
}

// Format percentages for display
function formatPercentage(value) {
    return value.toFixed(1) + '%';
}

// Add thousand separators to numbers
function addThousandSeparators(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
