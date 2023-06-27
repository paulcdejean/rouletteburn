import { noodles } from "@/constants"
import { Network } from "@/network"
import { NS } from "@ns"

export function fastestResults(ns: NS, network: Network): string {
  let fastestWeakenTime = Infinity
  let selectedServer = noodles

  for (const server in network.servers) {
    const weakenTime = ns.getWeakenTime(server)

    if (weakenTime < fastestWeakenTime &&
      (network.servers[server].moneyMax ?? 0) > 0 &&
      network.servers[server].hasAdminRights &&
      (network.servers[server].requiredHackingSkill ?? Infinity) < ns.getHackingLevel()) {
      fastestWeakenTime = weakenTime
      selectedServer = server
    }
  }
  return selectedServer
}
