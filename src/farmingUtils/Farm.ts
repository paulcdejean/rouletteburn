import { SpawnScript, home, homeReservedRam } from "@/constants"
import { Network } from "@/network"
import { BasicHGWOptions, NS, RunOptions } from "@ns"

// For example a single HWGW
export type Batch = Operation[]

export interface Operation {
  script : SpawnScript
  threads : number
  // TODO: stonks
}

interface Spawn {
  script : SpawnScript
  threads : number
  host : string
  hgwOptions : BasicHGWOptions
}

export class Farm {
  private availableRam : Record<string, number>
  public plan : Spawn[] = []
  public target : string

  constructor(ns: NS, network: Network, target: string) {
    this.availableRam = {}
    this.target = target
    for (const server in network.servers) {
      if (network.servers[server].hasAdminRights) {
        if (server == home) {
          this.availableRam[server] = Math.max(network.servers[server].maxRam - homeReservedRam, 0)
        } else {
          this.availableRam[server] = network.servers[server].maxRam
        }
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
        const threads = Math.floor(this.availableRam[server] / operationScriptRam)

        const hgwOptions : BasicHGWOptions = {
          threads: threads,
          stock: false,
          additionalMsec: 0
        }

        this.plan.push({
          script: SpawnScript.weakenFarmer,
          threads: threads,
          host: server,
          hgwOptions: hgwOptions,
        })
        this.availableRam[server] = 0
      }
    }
  }

  schedule(ns: NS, batch: Batch) : boolean {
    const simulatedAvailableRam = Object.assign({}, this.availableRam)
    const simulatedPlan : Spawn[] = []

    // Round this to the nearest ms, to prevent rounding errors???
    const weakenTime = Math.ceil(ns.getWeakenTime(this.target))
    const weakenExtra = weakenTime - ns.getWeakenTime(this.target)
    const growTime = ns.getGrowTime(this.target)
    const hackTime = ns.getHackTime(this.target)

    for (const operation in batch) {
      const operationScriptRam = ns.getScriptRam(batch[operation].script, home)
      let successfulPlan = false

      // TODO: For weaken, allow spreading across multiple servers

      for (const server in simulatedAvailableRam) {
        if (simulatedAvailableRam[server] >= operationScriptRam * batch[operation].threads) {
          let additionalMsec = 0
          if(batch[operation].script == SpawnScript.hackFarmer) {
            additionalMsec = weakenTime - hackTime
          } else if(batch[operation].script == SpawnScript.growFarmer) {
            additionalMsec = weakenTime - growTime
          } else if(batch[operation].script == SpawnScript.weakenFarmer) {
            additionalMsec = weakenExtra
          }
          const hgwOptions : BasicHGWOptions = {
            threads: batch[operation].threads,
            stock: false,
            additionalMsec: additionalMsec
          }

          simulatedPlan.push({
            script: batch[operation].script,
            threads: batch[operation].threads,
            host: server,
            hgwOptions: hgwOptions,
          })
          simulatedAvailableRam[server] = simulatedAvailableRam[server] - (operationScriptRam * batch[operation].threads)
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

  run(ns: NS) : void {
    for(const spawn in this.plan) {
      const runOptions: RunOptions = {
        preventDuplicates: false,
        temporary: true,
        threads: this.plan[spawn].threads
      }

      ns.enableLog("exec")

      const pid = ns.exec(this.plan[spawn].script, this.plan[spawn].host, runOptions,
        this.target,
        this.plan[spawn].hgwOptions.additionalMsec ?? 0,
        this.plan[spawn].hgwOptions.stock ?? false,
        this.plan[spawn].hgwOptions.threads ?? 1
      )

      if (pid === 0) {
        ns.tprint(`ERROR: Exec in farm run failed on host ${this.plan[spawn].host}`)
        return
        throw new Error(`Exec in farm run failed on host ${this.plan[spawn].host}`)
      }
    }
  }
}
