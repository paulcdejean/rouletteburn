import type { Server } from "@ns";

type Servers = {
  [key: string]: Server;
};

export class Network {
  public upToDate = false;

  public cavePath : string[] | null = null;
 
  public servers : Servers = {}
}
