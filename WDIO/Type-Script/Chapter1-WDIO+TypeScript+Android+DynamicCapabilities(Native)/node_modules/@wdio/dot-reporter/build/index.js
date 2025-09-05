// src/index.ts
import chalk from "chalk";
import WDIOReporter from "@wdio/reporter";
var DotReporter = class extends WDIOReporter {
  constructor(options) {
    super(Object.assign({ stdout: true }, options));
  }
  /**
   * pending tests
   */
  onTestSkip() {
    this.write(chalk.cyanBright("."));
  }
  /**
   * passing tests
   */
  onTestPass() {
    this.write(chalk.greenBright("."));
  }
  /**
   * failing tests
   */
  onTestFail() {
    this.write(chalk.redBright("F"));
  }
};
export {
  DotReporter as default
};
