import { Capabilities, upgradeCapabilities } from "@/Capabilities";
import { crackNetwork } from "@/crack";
import { Network, refreshNetwork } from "@/network";
import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { canFarm, getPrepTime } from "@/targettingAlgos/utils";
import { metaTargeting } from "@/targettingAlgos/metaTargeting";
import { metaFarming } from "@/farmingAlgos/metaFarming";


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
  crackNetwork(ns, network, 1000)

  // Foreground loop
  while(!upgradeCapabilities(ns, capabilities)) {
    if(!network.upToDate) {
      ns.tprint("DEBUG: Network not up to date, refreshing network")
      refreshNetwork(ns, network, capabilities)
    }

    for (const server in network.servers) {
      if(canFarm(ns, network.servers[server])) {
        const prepTime = getPrepTime(ns, network, server)
        const formattedPrepTime = ns.tFormat(prepTime, true)
        ns.tprint(`Server ${server} can be prepared in ${formattedPrepTime}`)
      }
    }

    const target = metaTargeting(ns, capabilities)(ns, network)
    const farm = metaFarming(ns, capabilities, target)(ns, network, target)

    ns.tprint(`Farming ${target}`)
    await farm.run(ns)
    const timestamp = ns.tFormat(Date.now() - ns.getResetInfo().lastAugReset)
    ns.tprint(`Farming ${target} complete at ${timestamp}`)
  }
}
