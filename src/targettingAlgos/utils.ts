import { Farm } from "@/Farm";
import { prepSingleGrowOnly } from "@/farmingAlgos/prepSingle";
import { Network } from "@/network";
import { weakenAnalyze } from "@/utils";
import { NS } from "@ns";

export function getWeakenCycles(ns: NS, network: Network, target: string) : number {
  const requiredWeakenAmount = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)
  const requiredWeakenThreads = Math.ceil(requiredWeakenAmount / weakenAnalyze(ns, 1))
  ns.tprint(`Required weaken threads for ${target} = ${requiredWeakenThreads}`)
  const farm = new Farm(ns, network, target)
  const weakenThreads = farm.finalWeaken(ns)
  ns.tprint(`Actual weaken threads are ${weakenThreads}`)
  const weakenCycles = Math.ceil(requiredWeakenThreads / weakenThreads)
  ns.tprint(`Weaken cycles are ${weakenCycles}`)
  return weakenCycles
}

export function getGrowCycles(ns: NS, network: Network, target: string) : number {
  const currentMoney = ns.getServerMoneyAvailable(target)
  const maxMoney = ns.getServerMaxMoney(target)
  const requiredGrowAmount = maxMoney / currentMoney
  const requiredGrowThreads = Math.ceil(ns.growthAnalyze(target, requiredGrowAmount))

  const farm = prepSingleGrowOnly(ns, network, target)
  const growThreads = farm.getStats(ns).growThreads


  return Math.ceil(requiredGrowThreads / growThreads)
}

export function getPrepCycles(ns: NS, network: Network, target: string) : number {
  return getWeakenCycles(ns, network, target) + getGrowCycles(ns, network, target)
}
