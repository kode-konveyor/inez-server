import { bound } from "@kodekonveyor/cdd-ts";
import { SelbriTestData } from "../SelbriTestData.js";
import { type EnvironmentManipulatorType } from "@kodekonveyor/cdd-ts/dist/src/types/EnvironmentManipulatorType.js";
import { SaveSelbriService } from "../../src/dataAccess/SaveSelbriService.js";
import { type SelbriDTO } from "../../src/DTO/SelbriDTO.js";
import { DatabaseUpper } from "./DatabaseUpper.js";

export class DatabaseUpperWithSelbriSaved
  extends DatabaseUpper
  implements EnvironmentManipulatorType
{
  static savedSelbri: SelbriDTO;
  override async setUp(): Promise<void> {
    await super.setUp();

    DatabaseUpperWithSelbriSaved.savedSelbri = await bound<
      SaveSelbriService["saveSelbri"]
    >(SaveSelbriService)(SelbriTestData.default);
  }

  static getSelbriId(): string {
    return DatabaseUpperWithSelbriSaved.savedSelbri?.id;
  }
}
