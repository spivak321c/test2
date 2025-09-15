// Logging utility for audit and errors
export const log = (message, level = 'info') => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};
//# sourceMappingURL=logger.js.map