import { noodles } from "@/constants"
import { Network } from "@/network"
import { NS } from "@ns"

export function largestMaxMoneyPerSecondUnderThreeMinutes(ns: NS, network: Network): string {
  let score = 0
  const threeMinutes = 180000
  let selectedServer = noodles

  for (const server in network.servers) {
    const weakenTime = ns.getWeakenTime(server)
    const serverMoneyMax = network.servers[server].moneyMax ?? 0

    if (weakenTime < threeMinutes &&
      serverMoneyMax > score &&
      network.servers[server].hasAdminRights &&
      (network.servers[server].requiredHackingSkill ?? Infinity) < ns.getHackingLevel()) {
        score = serverMoneyMax / weakenTime
      selectedServer = server
    }
  }
  ns.tprint(`Selected target ${selectedServer} with targetting algorithm "largestMaxMoneyPerSecondUnderThreeMinutes"`)
  return selectedServer
}

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
  ns.tprint(`Selected target ${selectedServer} with targetting algorithm "fastestResults"`)
  return selectedServer
}
