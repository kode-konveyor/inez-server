import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class ListSelbrisService {
  async listSelbris(): Promise<Array<SelbriDTO>> {
    const selbris = await SelbriDAO.find<SelbriDTO>();
    return selbris;
  }
}
