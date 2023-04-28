import { Contract, bound } from "cdd-ts";
import { GetSelbriControllerService } from "../src/services/GetSelbriControllerService.js";
import { GetSelbriByIdServiceContract } from "../integrationcontracts/GetSelbriByIdServiceContract.js";
import { SelbriTestData } from "../testdata/SelbriTestData.js";
import { HTTP_OK } from "../src/Constants.js";
import { DATABASE_UP } from "./Constants.js";
import { ServiceArgsTestData } from "../testdata/ServiceArgsTestData.js";
import type express from "express";
import type Sinon from "sinon";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";

export const GetSelbriControllerServiceContractParties = [
  bound(GetSelbriControllerService, GetSelbriByIdServiceContract.getStub()),
];

export const GetSelbriControllerServiceContract = new Contract<
  GetSelbriControllerService["getSelbriController"]
>()
  .setTitle("interface to get selbri by id")
  .when(DATABASE_UP, {
    setUp() {
      Contract.states.push(DATABASE_UP);
    },
    tearDown() {},
  })
  .ifCalledWith(() => ServiceArgsTestData.req, ServiceArgsTestData.responseStub)
  .thenReturn("An existing selbri can be retrieved by id", () => undefined)
  .meanwhile("the HTTP status is 200 (OK), and the payload is the data", {
    check: (ret, req, res) => {
      const responseStub = res as Sinon.SinonStubbedInstance<
        express.Response<SelbriDTO, Record<string, any>>
      >;
      if (
        !responseStub.status.calledOnceWith(HTTP_OK) ||
        !responseStub.send.calledOnceWith(SelbriTestData.saved)
      )
        throw new Error("not called");
    },
  });
