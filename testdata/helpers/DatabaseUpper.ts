import { type EnvironmentManipulatorType } from "cdd-ts/dist/src/types/EnvironmentManipulatorType.js";
import { execSync } from "child_process";
import { RESTART_MONGO, UTF_8 } from "./Constants.js";

export class DatabaseUpper implements EnvironmentManipulatorType {
  async setUp(): Promise<void> {
    const output = execSync(RESTART_MONGO, { encoding: UTF_8 });
    console.log(output);
  }

  tearDown(): void {}
}
