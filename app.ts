import express from "express";
import * as http from "http";

import cors from "cors";
import { UsersRoutes } from "./src/routes/ModelRoutes.js";
import { type CommonRoutesConfig } from "./src/routes/CommonRoutesConfig.js";
import fs from "fs";
import { MongooseProvider } from "./src/DAO/MongooseProvider.js";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];

app.use(express.json());

app.use(cors());
const STATIC_PATH = "www";
app.use(express.static(STATIC_PATH));

routes.push(new UsersRoutes(app));

const runningMessage = `Server is running`;

await MongooseProvider.makeSureIsConnected();

const PIDFILE = "tmp/server.pid";

fs.writeFileSync(PIDFILE, String(process.pid));

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
