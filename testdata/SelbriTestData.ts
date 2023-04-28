import { type TestDataDescriptor } from "cdd-ts/dist/src/types/TestDataDescriptor.js";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";

export const SelbriTestData = {
  default: {
    id: "thing",
    representation: "Thing",
  },
  saved: {
    id: "foo",
    representation: "Thing",
  },
} satisfies TestDataDescriptor<SelbriDTO>;
