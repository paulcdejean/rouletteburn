import { Capabilities } from "@/Capabilities";
import { Farm } from "@/Farm";
import { Network } from "@/network";
import { growthAnalyzeSecurity, weakenAnalyze } from "@/utils";
import { NS } from "@ns";

function weakenToMinSecurity(ns: NS, farm: Farm) : boolean {
  const currentSecurity = ns.getServerSecurityLevel(farm.target)
  const minSecurity = ns.getServerMinSecurityLevel(farm.target)

  if(currentSecurity > minSecurity) {
    const requiredWeakenAmount = currentSecurity - minSecurity
    const requiredWeakenThreads = Math.ceil(requiredWeakenAmount / weakenAnalyze(ns, 1))

    return farm.schedule(ns, [{
      capability: Capabilities.Weaken,
      threads: requiredWeakenThreads,
      allowSpread: true,
    }])
  } else {
    return true
  }
}

function growToMaxMoney(ns: NS, farm: Farm) : boolean {
  const currentMoney = ns.getServerMoneyAvailable(farm.target)
  const maxMoney = ns.getServerMaxMoney(farm.target)

  if (currentMoney < maxMoney) {
    const requiredGrowAmount = maxMoney / currentMoney
    let attemptedGrowThreads = Math.ceil(ns.growthAnalyze(farm.target, requiredGrowAmount))

    let growSecurityGain = growthAnalyzeSecurity(ns, attemptedGrowThreads, farm.target)
    let requiredWeakenThreads = Math.ceil(growSecurityGain / weakenAnalyze(ns, 1))

    const success = farm.schedule(ns, [
      {
        capability: Capabilities.Grow,
        threads: attemptedGrowThreads,
        allowSpread: false,
      },
      {
        capability: Capabilities.Weaken,
        threads: requiredWeakenThreads,
        allowSpread: true,
      }
    ])

    if (success) {
      farm.finalWeaken(ns)
      return true
    } else {
      attemptedGrowThreads = 25 // Early game heurestic...
      while (attemptedGrowThreads > 0) {
        growSecurityGain = growthAnalyzeSecurity(ns, attemptedGrowThreads, farm.target)
        requiredWeakenThreads = Math.ceil(growSecurityGain / weakenAnalyze(ns, 1))
    
        const success = farm.schedule(ns, [
          {
            capability: Capabilities.Grow,
            threads: attemptedGrowThreads,
            allowSpread: true,
          },
          {
            capability: Capabilities.Weaken,
            threads: requiredWeakenThreads,
            allowSpread: true,
          }
        ])
        if (success) {
          return true
        }
        attemptedGrowThreads = attemptedGrowThreads - 1
      }
      return false
    }
  } else {
    return false
  }
}

export function prepSingle(ns: NS, network: Network, target: string) : Farm {
  const farm = new Farm(ns, network, target)

  if(weakenToMinSecurity(ns, farm)) {
    while(growToMaxMoney(ns, farm));
  }

  farm.finalWeaken(ns)

  return farm
}

export function prepSingleGrowOnly(ns: NS, network: Network, target: string) : Farm {
  const farm = new Farm(ns, network, target)

  while(growToMaxMoney(ns, farm));

  farm.finalWeaken(ns)

  return farm
}
