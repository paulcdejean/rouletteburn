import { Capabilities, upgradeCapabilities } from "@/Capabilities";
import { crackNetwork } from "@/crack";
import { metaFarming } from "@/farmingAlgos/metaFarming";
import { Network, refreshNetwork } from "@/network";
import { metaTargetting } from "@/targettingAlgos/metaTargeting";
import { NS } from "@ns";

export async function mainBasic(ns: NS, capabilities: Capabilities): Promise<void> {
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

    const target = metaTargetting(ns, capabilities)(ns, network)

    await metaFarming(ns, capabilities, target)(ns, network, target)

    return
  }
}
