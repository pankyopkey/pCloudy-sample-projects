import configuration from "./config/config.json";
import * as wdioHelper from "./helper/wdio.helper";


export const config: WebdriverIO.Config = {
	protocol: "https",
	hostname: configuration.hostname,
	port: 443,
	path: "/appiumcloud/wd/hub",
	specs: ["./test/specs/**/*.ts"],

	capabilities: [
		configuration.capabilities as WebdriverIO.Capabilities,
	],

	// logLevel: "info",
	framework: "mocha",
	reporters: [["allure", { outputDir: "allure-results" }]],
	mochaOpts: {
		ui: "bdd",
		timeout: 60000,
	},

	onPrepare: async (config: WebdriverIO.Config, capabilities: WebdriverIO.Capabilities[]) => {
		console.log("Preparing WDIO run…");

		const cap = capabilities[0] as Record<string, any>;

		if (configuration.uploadApp) {
			await wdioHelper.handleUploadApp(cap);
		}

		if (configuration.dynamicName) {
			wdioHelper.handleDynamicName(cap);
		}

		if (configuration.dynamicBuild) {
			wdioHelper.handleDynamicBuild(cap);
		}

		console.log(cap);
	},
	
};
