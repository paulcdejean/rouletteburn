import { Capabilities } from "@/Capabilities";
import { Farm } from "@/Farm";
import { Network } from "@/network";
import { growthAnalyzeSecurity, hackAnalyzeSecurity, sleep, weakenAnalyze } from "@/utils";
import { NS } from "@ns";

export function basicHWGW(ns: NS, network: Network, target: string) : Promise<void> {
  ns.tprint(`Running farming algorithm "prepSingle"`)
  const farm = new Farm(ns, network, target)

  const weakenTime = ns.getWeakenTime(farm.target)

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
    growThreads = Math.floor(growThreadsPerHack)
  }

  while(hackThreads > 0) {
    const hackSecurityGain = hackAnalyzeSecurity (ns, hackThreads, target)
    const growthSecurityGain = growthAnalyzeSecurity(ns, growThreads, target)
    const firstWeakenThreads = Math.ceil(hackSecurityGain / weakenAnalyze(ns, 1))
    const secondWeakenThreads =  Math.ceil(growthSecurityGain / weakenAnalyze(ns, 1))
    const batch = [
      {capability: Capabilities.Hack, threads: hackThreads},
      {capability: Capabilities.Weaken, threads: firstWeakenThreads},
      {capability: Capabilities.Grow, threads: growThreads},
      {capability: Capabilities.Weaken, threads: secondWeakenThreads},
    ]
    if(!farm.schedule(ns, batch)) {
      hackThreads = hackThreads - 1
    }
  }

  farm.finalWeaken(ns)
  farm.run(ns)

  return sleep(weakenTime + 3000)
}
