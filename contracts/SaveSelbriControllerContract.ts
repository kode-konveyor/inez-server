import { Contract, bound, serialize } from "cdd-ts";
import { SaveSelbriControllerService } from "../src/services/SaveSelbriControllerService.js";
import { DATABASE_UP } from "./Constants.js";
import { ServiceArgsTestData } from "../testdata/ServiceArgsTestData.js";
import { HTTP_CREATED } from "../src/Constants.js";
import { SaveSelbriServiceContract } from "../integrationcontracts/SaveSelbriServiceContract.js";
import type express from "express";
import type Sinon from "sinon";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";
import { SelbriTestData } from "../testdata/SelbriTestData.js";

const saveSelbri = SaveSelbriServiceContract.getStub();
export const SaveSelbriControllerContractParties = [
  bound(SaveSelbriControllerService, saveSelbri),
];

export const SaveSelbriControllerContract = new Contract<
  SaveSelbriControllerService["saveSelbriController"]
>()
  .setTitle("interface to save selbri")
  .when(DATABASE_UP, {
    setUp() {
      Contract.states.push(DATABASE_UP);
    },
    tearDown() {},
  })
  .ifCalledWith(
    () => ServiceArgsTestData.saveReq,
    ServiceArgsTestData.responseStub
  )
  .thenReturn("the selbri is saved", () => undefined)
  .meanwhile(
    "the HTTP status is 201 (Created), and saveSelbri is called with the selbri",
    {
      check: (ret, req, res) => {
        const responseStub = res as Sinon.SinonStubbedInstance<
          express.Response<SelbriDTO, Record<string, any>>
        >;
        if (!responseStub.status.calledOnceWith(HTTP_CREATED))
          throw new Error(serialize(responseStub.status.args));
        if (!responseStub.send.calledOnceWith(SelbriTestData.saved))
          throw new Error(serialize(responseStub.send.args));
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!saveSelbri.calledOnceWith(SelbriTestData.default))
          throw new Error(serialize(saveSelbri.args));
      },
    }
  );
