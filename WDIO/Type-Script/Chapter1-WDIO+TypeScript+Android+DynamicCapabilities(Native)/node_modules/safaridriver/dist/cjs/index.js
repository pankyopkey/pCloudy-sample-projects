const start = exports.start = async function (options) {
    const driver = await import('../index.js');
    return driver.start(options);
};
const stop = exports.stop = async function () {
    const driver = await import('../index.js');
    return driver.stop();
};
module.exports = { start, stop };
//# sourceMappingURL=index.js.map