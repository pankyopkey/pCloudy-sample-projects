async function start(params) {
    const esmPkg = await import('../index.js');
    return esmPkg.start(params);
}
async function download(edgeVersion, cacheDir) {
    const esmPkg = await import('../index.js');
    return esmPkg.download(edgeVersion, cacheDir);
}
exports.start = start;
exports.download = download;
module.exports = { start, download };
//# sourceMappingURL=index.js.map