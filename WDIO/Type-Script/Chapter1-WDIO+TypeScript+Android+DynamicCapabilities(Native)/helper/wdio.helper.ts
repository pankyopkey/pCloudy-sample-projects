import { globSync } from "glob";
import { uploadApp as apiUploadApp } from "./pcloudy.api";
import configuration from "../config/config.json";

// Function to get test name from spec
export function getTestName(specPath: string): string {
  const fs = require("fs");
  try {
    const fileContent = fs.readFileSync(specPath, "utf-8");
    const match = /it\(['"](.*?)['"]/.exec(fileContent);
    return match ? match[1] : "default-test-name";
  } catch {
    return "default-test-name";
  }
}

// Upload app helper
export async function handleUploadApp(cap: Record<string, any>): Promise<string> {
  const uploadResult = await apiUploadApp(
    configuration.AppPath,
    "all",
    configuration.capabilities["pcloudy:options"].pCloudy_Username,
    configuration.capabilities["pcloudy:options"].pCloudy_ApiKey
  );

  const file = uploadResult.result?.file;

  if (!file) {
    throw new Error("Upload did not return a file name. Aborting WDIO run.");
  }

  const uploadedName =
    typeof file === "string"
      ? file
      : file && typeof file === "object" && "name" in file
        ? (file as any).name
        : (() => { throw new Error("Upload result has invalid format"); })();

  cap["pcloudy:options"].pCloudy_ApplicationName = uploadedName;

  return uploadedName;
}

// Dynamic test name helper
export function handleDynamicName(cap: Record<string, any>): string {
  const resolvedSpecs = globSync("./test/specs/**/*.ts");
  let testName = "default-test-name";
  if (resolvedSpecs.length > 0) {
    testName = getTestName(resolvedSpecs[0]);
  }
  cap["appium:name"] = testName;
  return testName;
}

// Dynamic build helper
export function handleDynamicBuild(cap: Record<string, any>): string {
  const id = Math.floor(Date.now() / 1000);
  const buildId = "build_test-" + (id || "default");
  cap["appium:build"] = buildId;
  return buildId;
}

