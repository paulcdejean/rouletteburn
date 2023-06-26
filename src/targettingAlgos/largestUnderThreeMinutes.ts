import { noodles } from "@/constants"
import { Network } from "@/network"
import { NS } from "@ns"

export function largestUnderThreeMinutes(ns: NS, network: Network): string {
  let largestMoney = 0
  const threeMinutes = 180000
  let selectedServer = noodles

  for (const server in network.servers) {
    const weakenTime = ns.getWeakenTime(server)
    const serverMoneyMax = network.servers[server].moneyMax ?? 0

    if (weakenTime < threeMinutes &&
      serverMoneyMax > largestMoney &&
      network.servers[server].hasAdminRights &&
      (network.servers[server].requiredHackingSkill ?? Infinity) < ns.getHackingLevel()) {
        largestMoney = serverMoneyMax
      selectedServer = server
    }
  }
  ns.tprint(`Selected target ${selectedServer} with targetting algorithm "largestUnderThreeMinutes"`)
  return selectedServer
}
