import { Contract, bound, serialize } from "cdd-ts";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { DatabaseDowner } from "../testdata/helpers/DatabaseDowner.js";
import { GetSelbriByIdService } from "../src/dataAccess/GetSelbriByIdService.js";
import { DatabaseUpperWithSelbriSaved } from "../testdata/helpers/DatabaseUpperWithSelbriSaved.js";
import { DATABASE_UP } from "../contracts/Constants.js";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";

export const GetSelbriByIdServiceContractParties = [
  bound(GetSelbriByIdService),
];

export const GetSelbriByIdServiceContract = new Contract<
  GetSelbriByIdService["getSelbriById"]
>()
  .setTitle("Gets a Selbri by id")
  .when(DATABASE_UP, new DatabaseUpperWithSelbriSaved())
  .ifCalledWith({
    default: [DatabaseUpperWithSelbriSaved.getSelbriId],
    checker: (param) => (typeof param === "string" ? undefined : param),
  })
  .thenReturn("the selbri is correct", {
    default: () => SelbriTestData.saved,
    check: (returned: SelbriDTO | undefined) => {
      if (
        serialize(returned) ===
        serialize(DatabaseUpperWithSelbriSaved.savedSelbri)
      )
        return undefined;
      return returned;
    },
  })
  .when("the database is down", new DatabaseDowner())
  .ifCalledWith(DatabaseUpperWithSelbriSaved.getSelbriId)
  .thenThrow(
    "error thrown",
    "Client must be connected before running operations"
  );
