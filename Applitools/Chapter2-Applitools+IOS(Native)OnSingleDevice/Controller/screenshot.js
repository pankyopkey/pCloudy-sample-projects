const fs = require('fs');
const path = require('path');

async function captureScreenshot(driver, screenName) {
        const screenshotsDir = path.join(__dirname, '..', 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
                fs.mkdirSync(screenshotsDir);
        }

        const screenshotName = `${screenName}-${new Date().getTime()}.png`;
        const screenshotPath = path.join(screenshotsDir, screenshotName);
        const screenshotData = await driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshotData, 'base64');

}

module.exports = {
        captureScreenshot
};