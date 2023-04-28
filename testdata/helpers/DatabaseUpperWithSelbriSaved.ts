import { bound } from "cdd-ts";
import { SelbriTestData } from "../SelbriTestData.js";
import { type EnvironmentManipulatorType } from "cdd-ts/dist/src/types/EnvironmentManipulatorType.js";
import { RESTART_MONGO, UTF_8 } from "./Constants.js";
import { execSync } from "child_process";
import { SaveSelbriService } from "../../src/dataAccess/SaveSelbriService.js";
import { type SelbriDTO } from "../../src/DTO/SelbriDTO.js";

export class DatabaseUpperWithSelbriSaved
  implements EnvironmentManipulatorType
{
  static savedSelbri: SelbriDTO;
  async setUp(): Promise<void> {
    const output = execSync(RESTART_MONGO, { encoding: UTF_8 });
    console.log(output);
    DatabaseUpperWithSelbriSaved.savedSelbri = await bound<
      SaveSelbriService["saveSelbri"]
    >(SaveSelbriService)(SelbriTestData.default);
  }

  static getSelbriId(): string {
    return DatabaseUpperWithSelbriSaved.savedSelbri?.id;
  }

  tearDown(): void {}
}
