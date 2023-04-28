import type express from "express";
import { HTTP_OK } from "../Constants.js";
import { GetSelbriByIdService } from "../dataAccess/GetSelbriByIdService.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class GetSelbriControllerService {
  constructor(
    readonly getSelbriById = GetSelbriByIdService.prototype.getSelbriById
  ) {}

  async getSelbriController(
    req: express.Request<unknown, SelbriDTO, string>,
    res: express.Response<SelbriDTO>
  ): Promise<void> {
    const selbri = await this.getSelbriById(req.body);
    res.status(HTTP_OK).send(selbri);
  }
}
