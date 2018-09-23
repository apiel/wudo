import { Connection } from 'typeorm';

export interface Context {
  user?: any;
  db: Connection;
}
