import { SpawnScript, home } from "@/constants"
import { Network } from "@/network"
import { NS } from "@ns"

// For example a single HWGW
export type Batch = Operation[]

export interface Operation {
  script : SpawnScript
  threads : number
}

interface Spawn {
  script : SpawnScript
  threads : number
  host : string
}

export class Farm {
  availableRam : Record<string, number>
  plan : Spawn[] = []

  constructor(ns: NS, network: Network) {
    this.availableRam = {}
    for (const server in network.servers) {
      if (network.servers[server].hasAdminRights) {
        this.availableRam[server] = network.servers[server].maxRam
      }
    }
  }

  /**
   * @function finalWeaken Fill all remaining available RAM with weaken calls, to maximize exp gains.
   */
  finalWeaken(ns: NS) : void {
    const operationScriptRam = ns.getScriptRam(SpawnScript.weakenFarmer, home)

    for (const server in this.availableRam) {
      if (this.availableRam[server] >= operationScriptRam) {
        this.availableRam[server] = 0
        this.plan.push({
          script: SpawnScript.weakenFarmer,
          threads: Math.floor(this.availableRam[server] / operationScriptRam),
          host: server,
        })
      }
    }
  }

  schedule(ns: NS, batch: Batch) : boolean {
    const simulatedAvailableRam = Object.assign({}, this.availableRam)
    const simulatedPlan : Spawn[] = []

    for (const operation in batch) {
      const operationScriptRam = ns.getScriptRam(batch[operation].script, home)
      let successfulPlan = false

      // TODO: For weaken, allow spreading across multiple servers

      for (const server in simulatedAvailableRam) {
        if (simulatedAvailableRam[server] >= operationScriptRam * batch[operation].threads) {
          simulatedAvailableRam[server] = simulatedAvailableRam[server] - (operationScriptRam * batch[operation].threads)
          simulatedPlan.push({
            script: batch[operation].script,
            threads: batch[operation].threads,
            host: server,
          })
          successfulPlan = true
          break
        }
      }
      if(!successfulPlan) {
        return false
      }
    }

    Object.assign(this.availableRam, simulatedAvailableRam)
    this.plan.push(...simulatedPlan)
    return true
  }
}
