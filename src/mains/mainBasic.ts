import { Capabilities, upgradeCapabilities } from "@/Capabilities";
import { crackNetwork } from "@/crack";
import { Network, refreshNetwork } from "@/network";
import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { canFarm, getPrepCycles } from "@/targettingAlgos/utils";


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
      if(canFarm(ns, network.servers[server])) {
        const prepCycles = getPrepCycles(ns, network, server)
        ns.tprint(`Server ${server} can be prepared in ${prepCycles} cycles`)
      }
    }    

    return
  }
}
