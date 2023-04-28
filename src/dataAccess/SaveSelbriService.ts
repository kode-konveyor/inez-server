import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class SaveSelbriService {
  async saveSelbri(element: SelbriDTO): Promise<SelbriDTO> {
    const saved = new SelbriDAO(element);
    await saved.save();
    return saved;
  }
}
