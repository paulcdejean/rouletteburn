import { growFarmer, hackFarmer, home } from "@/constants";
import { Network } from "@/network";
import { growthAnalyzeSecurity, hackAnalyzeSecurity, weakenAnalyze } from "@/utils";
import { NS } from "@ns";

class Batch {
  public hack = 0
  public firstWeaken = 0
  public grow = 0
  public secondWeaken = 0
}


export function startingHWGW(ns: NS, network: Network, target: string) : Promise<number> {
  let largestUsableServer = 0
  for (const server in network.servers) {
    if (network.servers[server].hasAdminRights && network.servers[server].maxRam > largestUsableServer) {
      largestUsableServer = network.servers[server].maxRam
    }
  }

  const maxFitHackThreads = Math.floor(largestUsableServer / ns.getScriptRam(hackFarmer, home))
  const maxFitGrowThreads = Math.floor(largestUsableServer / ns.getScriptRam(growFarmer, home))
  
  ns.tprint(calculateBatchSize(ns, target, maxFitHackThreads, maxFitGrowThreads))

  // An example of how to return a correct value, maybe useful later
  return new Promise<number>(resolve => {
    resolve(5)
  })
}

function calculateBatchSize(ns: NS, target: string, maxFitHackThreads: number, maxFitGrowThreads: number) : Batch {
  const batch = new Batch()

  const hackRate = ns.hackAnalyze(target)
  // The amount of growing required to get back to max money after a single successful hack.
  const requiredGrowthRate = 1 / (1 - hackRate)
  // The number of threads required to get back to max money after a single successful hack.
  const growThreadsPerHack = ns.growthAnalyze("n00dles", requiredGrowthRate)

  if (growThreadsPerHack < 1) {
    // One grow, multiple hacks
    batch.grow = 1
    batch.hack = Math.min(Math.floor(1 / growThreadsPerHack), maxFitHackThreads)
  } else {
    // One hack, multiple grows
    batch.hack = 1
    batch.grow = Math.min(Math.floor(growThreadsPerHack), maxFitGrowThreads)
  }

  const hackSecurityGain = hackAnalyzeSecurity(ns, batch.hack, target)
  const growthSecurityGain = growthAnalyzeSecurity(ns, batch.grow, target)

  ns.tprint("hackSecurityGain = ", hackSecurityGain)
  ns.tprint("growthSecurityGain = ", growthSecurityGain)
  ns.tprint("Single weaken = ", weakenAnalyze(ns, 1))

  batch.firstWeaken = Math.ceil(hackSecurityGain / weakenAnalyze(ns, 1))
  batch.secondWeaken = Math.ceil(growthSecurityGain / weakenAnalyze(ns, 1))

  return batch
}
