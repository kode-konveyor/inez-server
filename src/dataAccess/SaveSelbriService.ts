import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { MongooseProvider } from "../DAO/MongooseProvider.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class SaveSelbriService {
  constructor(
    readonly mongooseProvider = MongooseProvider,
    readonly SelbriConstructor = SelbriDAO
  ) {}

  async saveSelbri(element: SelbriDTO): Promise<SelbriDTO> {
    await this.mongooseProvider.makeSureIsConnected();
    const saved = new this.SelbriConstructor(element);
    await saved.save();
    return saved;
  }
}
