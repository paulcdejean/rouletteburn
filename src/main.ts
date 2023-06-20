import type { NS } from "@ns";

import { refreshNetwork } from '@/refreshNetwork.ts'
import { Capabilities } from "./Capabilities";

export async function main(ns: NS): Promise<void> {
  const network = refreshNetwork(ns, Capabilities.Basic)
  ns.write("network.txt", JSON.stringify(network, null, 2), "w")
}
