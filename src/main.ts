import type { NS } from "@ns"

import { Network, refreshNetwork } from '@/network.ts'
import { Capabilities } from "@/Capabilities"
import { crackNetwork } from "./crack"
import { sleep } from "./utils"

export async function main(ns: NS): Promise<void> {
  ns.disableLog("ALL") // Prevents spam, forgive the magic word here

  // TODO: Get capabilities
  // TODO: Attempt to upgrade capabilities

  const network = new Network

  refreshNetwork(ns, network, Capabilities.Basic)

  crackNetwork(ns, network, 2000)

  await sleep(30000)

  // TODO
  // crack(ns, network)

  // async farm loop
  /*
  pick a targetting algo
    this will be heurestic nonsense
  pick a farming algo
    just hwgw until later
  prep server if not already prepped
    loop here
  farm server if its prepped
    then loop
  */

  // async cracking loop

  // async quest loop (react time lol)
}
