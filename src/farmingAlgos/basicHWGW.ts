import { Capabilities } from "@/Capabilities";
import { Farm } from "@/Farm";
import { Network } from "@/network";
import { growthAnalyzeSecurity, hackAnalyzeSecurity, weakenAnalyze } from "@/utils";
import { NS } from "@ns";

export function basicHWGW(ns: NS, network: Network, target: string) : Farm {
  ns.tprint(`Running farming algorithm "basicHWGW" on target ${target}`)
  const farm = new Farm(ns, network, target)

  const hackRate = ns.hackAnalyze(target)
  const requiredGrowthRate = 1 / (1 - hackRate)
  const growThreadsPerHack = ns.growthAnalyze(target, requiredGrowthRate)

  let hackThreads = 1
  let growThreads = 1

  if (growThreadsPerHack < 1) {
    // One grow, multiple hacks
    hackThreads = Math.floor(1 / growThreadsPerHack)
  } else {
    // One hack, multiple grows
    growThreads = Math.ceil(growThreadsPerHack)
  }

  while(hackThreads > 0) {
    const hackSecurityGain = hackAnalyzeSecurity (ns, hackThreads, target)
    const growthSecurityGain = growthAnalyzeSecurity(ns, growThreads, target)
    const firstWeakenThreads = Math.ceil(hackSecurityGain / weakenAnalyze(ns, 1))
    const secondWeakenThreads =  Math.ceil(growthSecurityGain / weakenAnalyze(ns, 1))
    const batch = [
      {capability: Capabilities.Hack, threads: hackThreads, allowSpread: false},
      {capability: Capabilities.Weaken, threads: firstWeakenThreads, allowSpread: true},
      {capability: Capabilities.Grow, threads: growThreads, allowSpread: true},
      {capability: Capabilities.Weaken, threads: secondWeakenThreads, allowSpread: true},
    ]

    if(!farm.schedule(ns, batch)) {
      hackThreads = hackThreads - 1
    }
  }

  farm.finalWeaken(ns)
  return farm
}
