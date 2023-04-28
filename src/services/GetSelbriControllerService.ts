import type express from "express";
import { HTTP_OK } from "../Constants.js";
import { GetSelbriByIdService } from "../dataAccess/GetSelbriByIdService.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class GetSelbriControllerService {
  constructor(
    readonly getSelbriById = GetSelbriByIdService.prototype.getSelbriById
  ) {}

  async getSelbriController(
    req: express.Request<{ selbriId: string }, SelbriDTO>,
    res: express.Response<SelbriDTO>
  ): Promise<void> {
    const selbri = await this.getSelbriById(req.params.selbriId);
    res
      .status(HTTP_OK)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .send({ id: selbri!.id, representation: selbri!.representation });
  }
}
