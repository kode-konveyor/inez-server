import { type TestDataDescriptor } from "cdd-ts/dist/src/types/TestDataDescriptor.js";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";

export const SelbriTestData = {
  default: {
    id: "thing",
    representation: "Thing",
  },
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  saved: {
    _v: 0,
    id: "foo",
    representation: "Thing",
  } as SelbriDTO,
  savedDTO: {
    id: "foo",
    representation: "Thing",
  },
} satisfies TestDataDescriptor<SelbriDTO>;
