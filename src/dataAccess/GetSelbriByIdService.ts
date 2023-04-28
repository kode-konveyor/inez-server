import { SelbriDAO } from "../DAO/SelbriDAO.js";
import { MongooseProvider } from "../DAO/MongooseProvider.js";
import { type SelbriDTO } from "../DTO/SelbriDTO.js";

export class GetSelbriByIdService {
  constructor(
    readonly mongooseProvider = MongooseProvider,
    readonly selbriDAO = SelbriDAO
  ) {}

  async getSelbriById(id: string): Promise<SelbriDTO | undefined> {
    await this.mongooseProvider.makeSureIsConnected();
    const selbri = await this.selbriDAO.findById(id);
    if (selbri == null) return undefined;
    return selbri;
  }
}
