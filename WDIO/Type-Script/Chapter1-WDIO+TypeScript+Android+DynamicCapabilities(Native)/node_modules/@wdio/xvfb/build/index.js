// src/XvfbManager.ts
import { promisify } from "node:util";
import { exec } from "node:child_process";
import os from "node:os";
import logger from "@wdio/logger";
var execAsync = promisify(exec);
var XvfbManager = class {
  #force;
  #packageManagerOverride;
  #forceInstall;
  #autoInstallSetting;
  #autoInstallMode;
  #autoInstallCommand;
  #enabled;
  #maxRetries;
  #retryDelay;
  #log;
  constructor(options = {}) {
    this.#force = options.force ?? false;
    this.#packageManagerOverride = options.packageManager;
    this.#forceInstall = options.forceInstall ?? false;
    this.#autoInstallSetting = options.autoInstall ?? false;
    this.#autoInstallMode = options.autoInstallMode ?? "sudo";
    this.#autoInstallCommand = options.autoInstallCommand;
    this.#enabled = options.enabled ?? true;
    this.#maxRetries = options.xvfbMaxRetries ?? 3;
    this.#retryDelay = options.xvfbRetryDelay ?? 1e3;
    this.#log = logger("@wdio/xvfb");
  }
  /**
   * Check if Xvfb should run on this system
   */
  shouldRun(capabilities) {
    if (!this.#enabled) {
      return false;
    }
    if (this.#force) {
      return true;
    }
    if (os.platform() !== "linux") {
      return false;
    }
    const hasDisplay = process.env.DISPLAY;
    const inHeadlessEnvironment = !hasDisplay;
    const hasHeadlessFlag = this.#detectHeadlessMode(capabilities);
    return inHeadlessEnvironment || hasHeadlessFlag;
  }
  /**
   * Initialize xvfb-run for use
   * @returns Promise<boolean> - true if xvfb-run is ready, false if not needed
   */
  async init(capabilities) {
    this.#log.info("XvfbManager.init() called");
    if (!this.shouldRun(capabilities)) {
      this.#log.info("Xvfb not needed on current platform");
      return false;
    }
    this.#log.info("Xvfb should run, checking if setup is needed");
    try {
      const isReady = await this.#ensureXvfbRunAvailable();
      if (isReady) {
        this.#log.info("xvfb-run is ready for use");
        return true;
      }
      this.#log.warn("xvfb-run not available; continuing without virtual display");
      return false;
    } catch (error) {
      this.#log.error("Failed to setup xvfb-run:", error);
      throw error;
    }
  }
  /**
   * Ensure xvfb-run is available, installing if necessary
   */
  async #ensureXvfbRunAvailable() {
    this.#log.info("Checking if xvfb-run is available...");
    if (!this.#forceInstall) {
      try {
        await execAsync("which xvfb-run");
        this.#log.info("xvfb-run found in PATH");
        return true;
      } catch {
        if (!this.#autoInstallSetting) {
          this.#log.warn(
            "xvfb-run not found. Skipping automatic installation. To enable auto-install, set 'xvfbAutoInstall: true' in your WDIO config."
          );
          this.#log.warn(
            "Hint: you can also install it manually via your distro's package manager (e.g., 'sudo apt-get install xvfb', 'sudo dnf install xorg-x11-server-Xvfb')."
          );
          return false;
        }
        this.#log.info("xvfb-run not found, installing xvfb packages (xvfbAutoInstall enabled)...");
      }
    } else {
      this.#log.info("Force install enabled, skipping availability check");
    }
    this.#log.info("Starting xvfb package installation...");
    const attempted = await this.#installXvfbPackages();
    if (!attempted) {
      this.#log.warn("Insufficient privileges to install xvfb packages automatically. Please install manually.");
      return false;
    }
    this.#log.info("Package installation completed");
    if (!this.#forceInstall) {
      this.#log.info("Verifying xvfb-run installation...");
      try {
        const { stdout } = await execAsync("which xvfb-run");
        this.#log.info(
          `Successfully installed xvfb-run at: ${stdout.trim()}`
        );
        return true;
      } catch (error) {
        this.#log.error("Failed to install xvfb-run:", error);
        throw new Error(
          "xvfb-run is not available after installation. Please install it manually using your distribution's package manager."
        );
      }
    }
    return true;
  }
  /**
   * Detect if headless mode is enabled in Chrome/Chromium capabilities
   */
  #detectHeadlessMode(capabilities) {
    if (!capabilities) {
      return false;
    }
    const caps = capabilities;
    if (this.isSingleCapability(caps)) {
      return this.checkCapabilityForHeadless(caps);
    }
    if (this.isMultiRemoteCapability(caps)) {
      for (const [, browserConfig] of Object.entries(caps)) {
        const browserCaps = this.extractCapabilitiesFromBrowserConfig(browserConfig);
        if (this.checkCapabilityForHeadless(browserCaps)) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Check if the capabilities object is a single capability (not multiremote)
   */
  isSingleCapability(caps) {
    return Boolean(
      caps["goog:chromeOptions"] || caps["ms:edgeOptions"] || caps["moz:firefoxOptions"]
    );
  }
  /**
   * Check if the capabilities object is multiremote
   */
  isMultiRemoteCapability(caps) {
    return !this.isSingleCapability(caps) && typeof caps === "object" && caps !== null;
  }
  /**
   * Extract capabilities from browser config (handles both nested and direct formats)
   */
  extractCapabilitiesFromBrowserConfig(browserConfig) {
    if (browserConfig && typeof browserConfig === "object" && "capabilities" in browserConfig && browserConfig.capabilities) {
      return browserConfig.capabilities;
    }
    return browserConfig;
  }
  /**
   * Check a single capability object for headless flags
   */
  checkCapabilityForHeadless(caps) {
    if (!caps || typeof caps !== "object") {
      return false;
    }
    if (this.hasHeadlessFlag(caps["goog:chromeOptions"], ["--headless"])) {
      this.#log.info("Detected headless Chrome flag, forcing XVFB usage");
      return true;
    }
    if (this.hasHeadlessFlag(caps["ms:edgeOptions"], ["--headless"])) {
      this.#log.info("Detected headless Edge flag, forcing XVFB usage");
      return true;
    }
    if (this.hasHeadlessFlag(caps["moz:firefoxOptions"], ["--headless", "-headless"])) {
      this.#log.info("Detected headless Firefox flag, forcing XVFB usage");
      return true;
    }
    return false;
  }
  /**
   * Check if browser options contain headless flags
   */
  hasHeadlessFlag(options, headlessFlags) {
    if (!options?.args || !Array.isArray(options.args)) {
      return false;
    }
    return options.args.some((arg) => {
      if (typeof arg !== "string") {
        return false;
      }
      return headlessFlags.some(
        (flag) => arg === flag || flag === "--headless" && arg.startsWith("--headless=")
      );
    });
  }
  async detectPackageManager() {
    if (this.#packageManagerOverride) {
      return this.#packageManagerOverride;
    }
    const packageManagers = [
      { command: "apt-get", name: "apt" },
      { command: "dnf", name: "dnf" },
      { command: "yum", name: "yum" },
      { command: "zypper", name: "zypper" },
      { command: "pacman", name: "pacman" },
      { command: "apk", name: "apk" },
      { command: "xbps-install", name: "xbps" }
    ];
    for (const { command, name } of packageManagers) {
      try {
        await execAsync(`which ${command}`);
        return name;
      } catch {
      }
    }
    return "unknown";
  }
  #prefixSudoNonInteractive(cmd) {
    return cmd.split("&&").map((part) => {
      const p = part.trim();
      if (p.length === 0) {
        return p;
      }
      return `sudo -n ${p}`;
    }).join(" && ");
  }
  #shellEscapeArray(args) {
    return args.map((arg) => {
      if (/[\\$`"'\s]/.test(arg)) {
        return `"${arg.replace(/["\\$`]/g, "\\$&")}"`;
      }
      return arg;
    }).join(" ");
  }
  #getInstallMode() {
    const mode = this.#autoInstallMode;
    return mode;
  }
  #shouldSkipAutoInstall(isRoot, mode, hasSudo, hasCustomCommand) {
    if (hasCustomCommand) {
      return false;
    }
    if (!isRoot && mode !== "sudo") {
      this.#log.warn("Not running as root and sudo mode disabled; skipping auto-install");
      return true;
    }
    if (!isRoot && mode === "sudo" && !hasSudo) {
      this.#log.warn("Not running as root and sudo is not available; skipping auto-install");
      return true;
    }
    return false;
  }
  async #installXvfbPackages() {
    const isRoot = typeof process.getuid === "function" ? process.getuid() === 0 : false;
    const mode = this.#getInstallMode();
    const hasCustomCommand = Boolean(this.#autoInstallCommand);
    let hasSudo = false;
    if (!isRoot && mode === "sudo") {
      try {
        await execAsync("which sudo");
        hasSudo = true;
      } catch {
        hasSudo = false;
      }
    }
    if (this.#shouldSkipAutoInstall(isRoot, mode, hasSudo, hasCustomCommand)) {
      return false;
    }
    const command = await this.#getInstallCommand(isRoot, hasSudo);
    this.#log.info(`Installing xvfb packages using command: ${command}`);
    try {
      this.#log.info("Starting package installation command execution...");
      await execAsync(command, { timeout: 24e4 });
      this.#log.info(
        "Package installation command completed successfully"
      );
      return true;
    } catch (error) {
      this.#log.error("Package installation command failed:", error);
      throw error;
    }
  }
  async #getInstallCommand(isRoot, hasSudo) {
    const customInstallCommand = this.#autoInstallCommand ? Array.isArray(this.#autoInstallCommand) ? this.#shellEscapeArray(this.#autoInstallCommand) : this.#autoInstallCommand : void 0;
    if (customInstallCommand) {
      return customInstallCommand;
    }
    this.#log.info("Detecting package manager...");
    const packageManager = await this.detectPackageManager();
    this.#log.info(`Detected package manager: ${packageManager}`);
    const installCommands = {
      apt: "DEBIAN_FRONTEND=noninteractive apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb",
      dnf: "dnf -y makecache && dnf -y install xorg-x11-server-Xvfb",
      yum: "yum -y makecache && yum -y install xorg-x11-server-Xvfb",
      zypper: "zypper --non-interactive refresh && zypper --non-interactive install -y xvfb-run",
      pacman: "pacman -Sy --noconfirm xorg-server-xvfb",
      apk: "apk update && apk add --no-cache xvfb-run",
      xbps: "xbps-install -Sy xvfb-run"
    };
    if (!installCommands[packageManager]) {
      throw new Error(
        `Unsupported package manager: ${packageManager}. Please install Xvfb manually.`
      );
    }
    return !isRoot && hasSudo ? this.#prefixSudoNonInteractive(installCommands[packageManager]) : installCommands[packageManager];
  }
  /**
   * Execute a command with retry logic for xvfb failures
   */
  async executeWithRetry(commandFn, context = "xvfb operation") {
    let lastError = null;
    for (let attempt = 1; attempt <= this.#maxRetries; attempt++) {
      try {
        if (attempt === 1) {
          this.#log.info(`\u{1F680} Executing ${context}`);
        } else {
          this.#log.info(`\u{1F504} Retry attempt ${attempt}/${this.#maxRetries}: ${context}`);
        }
        const result = await commandFn();
        if (attempt > 1) {
          this.#log.info(`\u2705 Success on attempt ${attempt}/${this.#maxRetries}`);
        }
        return result;
      } catch (error) {
        this.#log.info(`\u274C Attempt ${attempt}/${this.#maxRetries} failed: ${error}`);
        lastError = error;
        const errorMessage = error instanceof Error ? error.message : String(error);
        const isXvfbError = this.isXvfbError(errorMessage);
        if (!isXvfbError) {
          this.#log.info("Non-xvfb error detected, not retrying");
          throw error;
        }
        if (attempt < this.#maxRetries) {
          const delay = this.#retryDelay * attempt;
          this.#log.info(`\u23F3 Waiting ${delay}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          this.#log.info(`\u274C All ${this.#maxRetries} attempts failed`);
        }
      }
    }
    throw lastError;
  }
  /**
   * Check if an error is related to xvfb failures
   */
  isXvfbError(errorMessage) {
    const xvfbErrorPatterns = [
      "xvfb-run: error: Xvfb failed to start",
      "Xvfb failed to start",
      "xvfb-run: error:",
      "X server died"
    ];
    return xvfbErrorPatterns.some(
      (pattern) => errorMessage.toLowerCase().includes(pattern.toLowerCase())
    );
  }
};

// src/ProcessFactory.ts
import { spawn, fork, execSync } from "node:child_process";
import logger2 from "@wdio/logger";
var ProcessFactory = class {
  #xvfbManager;
  #log = logger2("@wdio/xvfb:ProcessFactory");
  constructor(xvfbManager) {
    this.#xvfbManager = xvfbManager || new XvfbManager();
  }
  async createWorkerProcess(scriptPath, args, options) {
    const shouldRun = this.#xvfbManager.shouldRun();
    const isAvailable = this.#isXvfbRunAvailable();
    this.#log.info(`ProcessFactory: shouldRun=${shouldRun}, isAvailable=${isAvailable}`);
    if (shouldRun && isAvailable) {
      this.#log.info("Creating worker process with xvfb-run wrapper and retry logic");
      return await this.#xvfbManager.executeWithRetry(
        () => this.#createXvfbProcess(scriptPath, args, options),
        "xvfb worker process creation"
      );
    }
    this.#log.info("Creating worker process with regular fork");
    return this.#createRegularProcess(scriptPath, args, options);
  }
  /**
   * Create process with xvfb-run wrapper
   */
  #createXvfbProcess(scriptPath, args, options) {
    return new Promise((resolve, reject) => {
      const { cwd, env, execArgv = [], stdio } = options;
      const nodeArgs = [...execArgv, scriptPath, ...args];
      const childProcess = spawn(
        "xvfb-run",
        ["--auto-servernum", "--", "node", ...nodeArgs],
        {
          cwd,
          env,
          stdio
        }
      );
      let resolved = false;
      const startupTimeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(childProcess);
        }
      }, 100);
      childProcess.on("error", (error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(startupTimeout);
          reject(error);
        }
      });
      childProcess.on("exit", (code, signal) => {
        if (!resolved && code !== 0) {
          resolved = true;
          clearTimeout(startupTimeout);
          reject(new Error(`xvfb-run process exited with code ${code} and signal ${signal}`));
        }
      });
    });
  }
  /**
   * Create regular process without xvfb
   */
  #createRegularProcess(scriptPath, args, options) {
    const { cwd, env, execArgv = [], stdio } = options;
    return fork(scriptPath, args, {
      cwd,
      env,
      execArgv,
      stdio
    });
  }
  /**
   * Check if xvfb-run is actually available on the system
   */
  #isXvfbRunAvailable() {
    try {
      execSync("which xvfb-run", { stdio: "ignore" });
      this.#log.info("xvfb-run found in PATH");
      return true;
    } catch {
      this.#log.info("xvfb-run not found, falling back to regular fork");
      return false;
    }
  }
};

// src/index.ts
var xvfb = new XvfbManager();
export {
  ProcessFactory,
  XvfbManager,
  xvfb
};
