import { Contract, bound, serialize } from "cdd-ts";
import { ListSelbrisControllerService } from "../src/controllers/ListSelbrisControllerService.js";
import { ServiceArgsTestData } from "../testdata/ServiceArgsTestData.js";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { ListSelbrisServiceContract } from "../integrationcontracts/ListSelbrisServiceContract.js";
import { DATABASE_UP } from "./Constants.js";
import type Sinon from "sinon";
import type express from "express";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";
import { HTTP_OK } from "../src/Constants.js";

export const ListSelbriscontrollerServiceContractParties = [
  bound(ListSelbrisControllerService, ListSelbrisServiceContract.getStub()),
];

export const ListSelbriscontrollerServiceContract = new Contract<
  ListSelbrisControllerService["listSelbrisController"]
>()
  .setTitle("list selbris")
  .when(DATABASE_UP, {
    setUp() {
      Contract.states.push(DATABASE_UP);
    },
    tearDown() {},
  })

  .ifCalledWith(
    () => ServiceArgsTestData.emptyReq,
    ServiceArgsTestData.responseStub
  )
  .thenReturn("list of selbris", () => undefined)
  .meanwhile("the status code is 200 (OK), returns a list of selbris", {
    check: (ret, req, resp) => {
      const responseStub = resp as Sinon.SinonStubbedInstance<
        express.Response<Array<SelbriDTO>, Record<string, any>>
      >;

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!responseStub.status.calledOnceWith(HTTP_OK))
        throw new Error(serialize(responseStub.status.args));
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!responseStub.send.calledOnceWith([SelbriTestData.savedDTO]))
        throw new Error("body:" + serialize(responseStub.send.args));
    },
  });
