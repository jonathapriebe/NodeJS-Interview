import * as dotenv from 'dotenv';
import { SetupServer } from './server';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

(async (): Promise<void> => {
  const server = new SetupServer(PORT);
  await server.init();
  server.start();
})();
