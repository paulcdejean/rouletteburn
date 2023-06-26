import { Farm } from "@/Farm";
import { Network } from "@/network";
import { weakenAnalyze } from "@/utils";
import { NS } from "@ns";

export function canSingleCycleWeaken(ns: NS, network: Network, target: string) : boolean {
  const requiredWeakenAmount = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)
  const requiredWeakenThreads = Math.ceil(requiredWeakenAmount / weakenAnalyze(ns, 1))
  ns.tprint(`Required weaken threads for ${target} = ${requiredWeakenThreads}`)
  const farm = new Farm(ns, network, target)
  const weakenThreads = farm.finalWeaken(ns)
  ns.tprint(`Actual weaken threads are ${weakenThreads}`)
  if (weakenThreads >= requiredWeakenThreads) {
    return true
  } else {
    return false
  }
}
