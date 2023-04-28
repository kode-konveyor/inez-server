/* eslint-disable @typescript-eslint/consistent-type-assertions */
import express from "express";
import { type SelbriDTO } from "../src/DTO/SelbriDTO.js";
import Sinon from "sinon";
import { SelbriTestData } from "./SelbriTestData.js";

const responseStub = Sinon.stub<express.Response<SelbriDTO>>(express.response);
responseStub.status.returns(responseStub);

export const ServiceArgsTestData = {
  req: {
    body: "foo",
  } as express.Request,
  saveReq: {
    body: SelbriTestData.default,
  } as express.Request,
  responseStub: () => {
    Sinon.resetHistory();
    return responseStub;
  },
};
