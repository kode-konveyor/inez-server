import { type EnvironmentManipulatorType } from "@kodekonveyor/cdd-ts/dist/src/types/EnvironmentManipulatorType.js";
import { execSync } from "child_process";
import { RESTART_MONGO, UTF_8 } from "./Constants.js";
import { MongooseProvider } from "../../src/DAO/MongooseProvider.js";

export class DatabaseUpper implements EnvironmentManipulatorType {
  async setUp(): Promise<void> {
    const output = execSync(RESTART_MONGO, { encoding: UTF_8 });
    console.log(output);
    await MongooseProvider.makeSureIsConnected();
  }

  tearDown(): void {}
}
