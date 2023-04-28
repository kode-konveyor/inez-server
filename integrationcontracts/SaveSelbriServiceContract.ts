import { Contract, bound } from "cdd-ts";
import { SaveSelbriService } from "../src/dataAccess/SaveSelbriService.js";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { DatabaseDowner } from "../testdata/helpers/DatabaseDowner.js";
import { DatabaseUpper } from "../testdata/helpers/DatabaseUpper.js";
import { DATABASE_UP } from "../contracts/Constants.js";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";

export const SaveSelbriServiceContractParties = [bound(SaveSelbriService)];

export const SaveSelbriServiceContract = new Contract<
  SaveSelbriService["saveSelbri"]
>()
  .setTitle("Saves a selbri")
  .when(DATABASE_UP, new DatabaseUpper())
  .ifCalledWith(() => SelbriTestData.default)
  .thenReturn("returns the saved data", {
    default: () => SelbriTestData.saved,
    check: (entity: SelbriDTO) => {
      if (typeof entity.id !== "string") return entity;
      if (entity.representation !== SelbriTestData.default.representation)
        return entity;
      return undefined;
    },
  })
  .when("the database is down", new DatabaseDowner())
  .ifCalledWith(() => SelbriTestData.default)
  .thenThrow(
    "Throws an exception",
    "Client must be connected before running operations"
  );
