import { type EnvironmentManipulatorType } from "cdd-ts/dist/src/types/EnvironmentManipulatorType.js";
import { execSync } from "child_process";
import { UTF_8, STOP_MONGO } from "./Constants.js";
import { MongooseProvider } from "../../src/DAO/MongooseProvider.js";

export class DatabaseDowner implements EnvironmentManipulatorType {
  async setUp(): Promise<void> {
    const mongooseInstance = await MongooseProvider.makeSureIsConnected();
    await mongooseInstance.disconnect();
    const output = execSync(STOP_MONGO, { encoding: UTF_8 });
    console.log(output);
  }

  tearDown(): void {}
}
