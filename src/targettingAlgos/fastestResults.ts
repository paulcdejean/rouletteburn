import type { NS } from "@ns";
import { Network } from "@/Network.ts"
import { noodles } from "@/constants.ts"

export function fastestResults(ns: NS, network: Network): string {
  let fastestWeakenTime = Infinity
  let selectedServer = noodles

  for (const server in network.servers) {
    const weakenTime = ns.getWeakenTime(server)
    // TODO: && has root && hacking level high enough
    if (weakenTime < fastestWeakenTime && ns.getServerMaxMoney(server) > 0) {
      fastestWeakenTime = weakenTime
      selectedServer = server
    }
  }
  return selectedServer
}
