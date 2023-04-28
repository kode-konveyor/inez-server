import { Contract, bound } from "cdd-ts";
import { ListSelbrisService } from "../src/dataAccess/ListSelbrisService.js";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { DATABASE_UP } from "../contracts/Constants.js";
import { DatabaseUpperWithSelbriSaved } from "../testdata/helpers/DatabaseUpperWithSelbriSaved.js";
import { DatabaseDowner } from "../testdata/helpers/DatabaseDowner.js";

export const ListSelbrisServiceContractParties = [bound(ListSelbrisService)];

export const ListSelbrisServiceContract = new Contract<
  ListSelbrisService["listSelbris"]
>()
  .setTitle("list selbris")
  .when(DATABASE_UP, new DatabaseUpperWithSelbriSaved())
  .ifCalledWith()
  .thenReturn("returns a list of selbris", {
    default: () => [SelbriTestData.saved],
    check: (returnValue) => {
      if (
        returnValue.length !== 1 ||
        returnValue[0]?.representation !== SelbriTestData.saved.representation
      )
        throw new Error(String(returnValue));
    },
  })
  .when("the database is down", new DatabaseDowner())
  .ifCalledWith()
  .thenThrow(
    "Throws an exception",
    "Client must be connected before running operations"
  );
