import { execSync } from "child_process";

export function bundlePicusProject(bundleDir: string): void {
  try {
    execSync(`node_modules/.bin/picus bundle --out-dir ./${bundleDir}`, {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  } catch (e) {
    const stderr = (e as { stderr?: Buffer }).stderr?.toString() ?? "";
    throw new Error(`Picus bundle failed: ${stderr}`);
  }
}

export type RenderProgress =
  | { type: "phase"; phase: string; progress: number; subtitle?: string }
  | { type: "done"; url: string; size: number }
  | { type: "error"; message: string };

export type OnProgressFn = (message: RenderProgress) => Promise<void>;

export function formatSSE(message: RenderProgress): string {
  return `data: ${JSON.stringify(message)}\n\n`;
}
