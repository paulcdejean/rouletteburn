import type { NS } from "@ns"

import { refreshNetwork } from '@/network.ts'
import { Capabilities } from "@/Capabilities"
import { crackNetwork } from "./crack"

export async function main(ns: NS): Promise<void> {
  const network = refreshNetwork(ns, Capabilities.Basic)

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
  
  crackNetwork(ns, network, 1000)
}
