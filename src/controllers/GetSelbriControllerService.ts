import type express from "express";
import { HTTP_OK } from "../Constants.js";
import { GetSelbriByIdService } from "../dataAccess/GetSelbriByIdService.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";
import { NormalizeSelbriService } from "../services/NormalizeSelbriService.js";

export class GetSelbriControllerService {
  constructor(
    readonly getSelbriById = GetSelbriByIdService.prototype.getSelbriById,
    readonly normalizeSelbri = NormalizeSelbriService.prototype.normalizeSelbri
  ) {}

  async getSelbriController(
    req: express.Request<{ selbriId: string }, SelbriDTO>,
    res: express.Response<SelbriDTO>
  ): Promise<void> {
    const selbri = await this.getSelbriById(req.params.selbriId);
    res
      .status(HTTP_OK)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .send(this.normalizeSelbri(selbri!));
  }
}
