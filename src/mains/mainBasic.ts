import { Capabilities, upgradeCapabilities } from "@/Capabilities";
import { crackNetwork } from "@/crack";
import { metaFarming } from "@/farmingAlgos/metaFarming";
import { Network, refreshNetwork } from "@/network";
import { metaTargetting } from "@/targettingAlgos/metaTargeting";
import { NS } from "@ns";

import * as basicList from "@/staticRam"

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  const capabilities = Capabilities.Basic

  // Upgrade those capabilities if it makes sense to. Exit if they're upgraded.
  if(upgradeCapabilities(ns, capabilities)) {
    return
  }

  const network = new Network
  refreshNetwork(ns, network, capabilities)

  // Runs in the background, terminates when all crackable servers are cracked
  crackNetwork(ns, network, 2000)

  // Foreground loop
  while(!upgradeCapabilities(ns, capabilities)) {
    if(!network.upToDate) {
      ns.tprint("DEBUG: Network not up to date, refreshing network")
      refreshNetwork(ns, network, capabilities)
    }

    for (const server in network.servers) {
      if ((network.servers[server].moneyMax ?? 0) > 0) {
        const currentMoney = ns.getServerMoneyAvailable(server)
        const maxMoney = ns.getServerMaxMoney(server)
        const requiredGrowAmount = maxMoney / currentMoney
        const requiredGrowThreads = Math.ceil(ns.growthAnalyze(server, requiredGrowAmount))
        ns.tprint(`Required grow threads for ${server } is ${requiredGrowThreads}`)
      }
    }

    return


    const target = metaTargetting(ns, capabilities)(ns, network)

    await metaFarming(ns, capabilities, target)(ns, network, target)
  }
}
