import type { NS } from "@ns"

import { Network, refreshNetwork } from '@/network'
import { Capabilities, canUpgradeCapabilities } from "@/capabilities/Capabilities"
import { crackNetwork } from "./crack"
import { sleep } from "./utils"
import { metaTargetting } from "./targettingAlgos/metaTargeting"
import { metaFarming } from "./farmingAlgos/metaFarming"

export async function main(ns: NS): Promise<void> {
  ns.disableLog("ALL") // Prevents spam, forgive the magic word here

  // TODO: Get capabilities
  const capabilities = Capabilities.Basic
  // TODO: Attempt to upgrade capabilities

  const network = new Network

  refreshNetwork(ns, network, capabilities)

  // Runs in the background, terminates when all crackable servers are cracked
  crackNetwork(ns, network, 2000)

  // TODO: Backgrounded server purchasing and upgrading, requires standard functionality

  // TODO: Backgrounded coding contract work, requires standard functionality

  // TODO: Backgrounded quest system

  // Foreground loop
  while(!canUpgradeCapabilities(ns)) {
    if(!network.upToDate) {
      ns.tprint("DEBUG: Network not up to date, refreshing network")
      refreshNetwork(ns, network, capabilities)
    }
    const target = metaTargetting(ns, capabilities)(ns, network)

    await metaFarming(ns, capabilities, target)(ns, network, target)

    await sleep(1)
    return
  }

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
