import { SpawnScript } from "@/constants";
import { Farm } from "@/farmingUtils/Farm";
import { Network } from "@/network";
import { sleep, weakenAnalyze } from "@/utils";
import { NS } from "@ns";


function weakenToMinSecurity(ns: NS, farm: Farm) : boolean {
  const currentSecurity = ns.getServerSecurityLevel(farm.target)
  const minSecurity = ns.getServerMinSecurityLevel(farm.target)

  if(currentSecurity > minSecurity) {
    const requiredWeakenAmount = currentSecurity - minSecurity
    const requiredWeakenThreads = Math.ceil(requiredWeakenAmount / weakenAnalyze(ns, 1))

    return farm.schedule(ns, [{
      script: SpawnScript.weakenFarmer,
      threads: requiredWeakenThreads,
    }])
  } else {
    return true
  }
}

function growToMaxMoney(ns: NS, farm: Farm) : boolean {
  ns.tprint("DEBUG A")
  const currentMoney = ns.getServerMoneyAvailable(farm.target)
  const maxMoney = ns.getServerMaxMoney(farm.target)

  ns.tprint(currentMoney)
  ns.tprint(maxMoney)

  if (currentMoney < maxMoney) {
    const requiredGrowAmount = maxMoney / currentMoney
    const requiredGrowThreads = Math.ceil(ns.growthAnalyze(farm.target, requiredGrowAmount))

    let attemptedGrowThreads = requiredGrowThreads
    while (attemptedGrowThreads > 0) {
      const growSecurityGain = ns.growthAnalyzeSecurity(attemptedGrowThreads)
      const requiredWeakenThreads = Math.ceil(growSecurityGain / weakenAnalyze(ns, 1))

      const success = farm.schedule(ns, [
        {
          script: SpawnScript.growFarmer,
          threads: attemptedGrowThreads,
        },
        {
          script: SpawnScript.weakenFarmer,
          threads: requiredWeakenThreads,
        }
      ])
      if (success) {
        return true
      }
      attemptedGrowThreads = attemptedGrowThreads - 1
    }
    return false
  } else {
    return true
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function prepSingle(ns: NS, network: Network, target: string) : Promise<void> {
  const farm = new Farm(ns, network, target)

  const weakenTime = ns.getWeakenTime(farm.target)

  if(weakenToMinSecurity(ns, farm)) {
    while(growToMaxMoney(ns, farm));
  }

  farm.finalWeaken(ns)

  ns.tprint(farm.plan)

  farm.run(ns)

  return sleep(weakenTime + 3000)
}
