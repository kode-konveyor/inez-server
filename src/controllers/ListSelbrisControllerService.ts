import { HTTP_OK } from "../Constants.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";
import { ListSelbrisService } from "../dataAccess/ListSelbrisService.js";
import type express from "express";
import { NormalizeSelbriService } from "../services/NormalizeSelbriService.js";

export class ListSelbrisControllerService {
  constructor(
    readonly listSelbris = ListSelbrisService.prototype.listSelbris,
    readonly normalizeSelbri = NormalizeSelbriService.prototype.normalizeSelbri
  ) {}

  async listSelbrisController(
    req: express.Request<unknown, Array<SelbriDTO>>,
    res: express.Response<Array<SelbriDTO>>
  ): Promise<void> {
    const selbris = await this.listSelbris();
    const selbriDTOs = selbris.map(this.normalizeSelbri);
    res.status(HTTP_OK).send(selbriDTOs);
  }
}
