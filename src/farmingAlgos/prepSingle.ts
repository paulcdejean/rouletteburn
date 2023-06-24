import { SpawnScript } from "@/constants";
import { Farm } from "@/farmingUtils/Farm";
import { Network } from "@/network";
import { weakenAnalyze } from "@/utils";
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
  const currentMoney = ns.getServerMoneyAvailable(farm.target)
  const maxMoney = ns.getServerMaxMoney(farm.target)

  if(currentMoney < maxMoney) {
    const requiredGrowAmount = maxMoney / currentMoney
    const requiredGrowThreads = Math.ceil(ns.growthAnalyze(farm.target, requiredGrowAmount))
    const growSecurityGain = ns.growthAnalyzeSecurity(requiredGrowThreads)
    const requiredWeakenThreads = Math.ceil(growSecurityGain / weakenAnalyze(ns, 1))

    return farm.schedule(ns, [
      {
        script: SpawnScript.growFarmer,
        threads: requiredGrowThreads,
      },
      {
        script: SpawnScript.weakenFarmer,
        threads: requiredWeakenThreads,
      }
    ])
  } else {
    return true
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function prepSingle(ns: NS, network: Network, target: string) : Promise<number> {
  const farm = new Farm(ns, network, target)

  if(weakenToMinSecurity(ns, farm)) {
    growToMaxMoney(ns, farm)
  }

  farm.finalWeaken(ns)

  ns.tprint(farm.plan)



  // Schedule a batch the weakens to min security, if that fails just go straight to finalWeaken
  // Schedule a batch that grows up to the max, keep reducing the grow threads if it fails
  // Final weaken

  return new Promise<number>(resolve => {
    resolve(0)
  })
}