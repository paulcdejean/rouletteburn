import type { NS } from "@ns"

import { Network, refreshNetwork } from '@/network'
import { Capabilities } from "@/capabilities/Capabilities"
import { crackNetwork } from "./crack"
import { sleep } from "./utils"

export async function main(ns: NS): Promise<void> {
  ns.disableLog("ALL") // Prevents spam, forgive the magic word here

  // TODO: Get capabilities
  // TODO: Attempt to upgrade capabilities

  const network = new Network

  refreshNetwork(ns, network, Capabilities.Basic)

  // Runs in the background, terminates when all crackable servers are cracked
  crackNetwork(ns, network, 2000)

  // TODO: Backgrounded server purchasing and upgrading, requires standard functionality

  // TODO: Backgrounded coding contract work, requires standard functionality

  // TODO: Backgrounded quest system

  // Foreground loop
  //while()

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
}
