import { Capabilities, getCapabilityRam } from "@/Capabilities"
import { home, homeReservedRam, thisScript } from "@/constants"
import { Network } from "@/network"
import { BasicHGWOptions, NS, RunOptions } from "@ns"
import { sleep } from "./utils"

// For example a single HWGW
export type Batch = Operation[]

export interface Operation {
  capability : Capabilities
  threads : number
  allowSpread : boolean
  // TODO: stonks
}

export interface FarmStats {
  earningsPerCycle: number
  cycleTimeInMs: number
  earningsPerSecond: number
  growThreads: number
}

interface Spawn {
  capability : Capabilities
  threads : number
  host : string
  hgwOptions : BasicHGWOptions
  ram : number
}

export class Farm {
  private availableRam : Record<string, number>
  private plan : Spawn[] = []
  private cycleTime : number
  public target : string

  constructor(ns: NS, network: Network, target: string) {
    this.availableRam = {}
    this.target = target
    this.cycleTime = ns.getWeakenTime(this.target)
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
  finalWeaken(ns: NS) : number {
    const weakenRam = getCapabilityRam(ns, Capabilities.Weaken)
    let totalThreads = 0

    for (const server in this.availableRam) {
      if (this.availableRam[server] >= weakenRam) {
        const threads = Math.floor(this.availableRam[server] / weakenRam)

        const hgwOptions : BasicHGWOptions = {
          threads: threads,
          stock: false,
          additionalMsec: 0
        }

        this.plan.push({
          capability: Capabilities.Weaken,
          threads: threads,
          host: server,
          hgwOptions: hgwOptions,
          ram: weakenRam,
        })
        this.availableRam[server] = 0
        totalThreads = totalThreads + threads
      }
    }
    return totalThreads
  }

  /**
   * @function quickHack Fill all remaining available RAM with hack calls, which has some niche uses.
   */
  quickHack(ns: NS) : number {
    const hackRam = getCapabilityRam(ns, Capabilities.Hack)
    let totalThreads = 0

    // Override the cycle time
    this.cycleTime = ns.getHackTime(this.target)

    for (const server in this.availableRam) {
      if (this.availableRam[server] >= hackRam) {
        const threads = Math.floor(this.availableRam[server] / hackRam)

        const hgwOptions : BasicHGWOptions = {
          threads: threads,
          stock: false,
          additionalMsec: 0
        }

        this.plan.push({
          capability: Capabilities.Hack,
          threads: threads,
          host: server,
          hgwOptions: hgwOptions,
          ram: hackRam,
        })
        this.availableRam[server] = 0
        totalThreads = totalThreads + threads
      }
    }
    return totalThreads
  }

  schedule(ns: NS, batch: Batch) : boolean {
    const simulatedAvailableRam = Object.assign({}, this.availableRam)
    const simulatedPlan : Spawn[] = []

    const weakenTime = ns.getWeakenTime(this.target)
    const hackTime = ns.getHackTime(this.target)
    const growTime = ns.getGrowTime(this.target)

    for (const operation in batch) {
      const operationScriptRam = getCapabilityRam(ns, batch[operation].capability)
      let successfulPlan = false

      let currentThreads = batch[operation].threads

      let additionalMsec = 0
      if(batch[operation].capability === Capabilities.Hack) {
        additionalMsec = weakenTime - hackTime
      } else if(batch[operation].capability == Capabilities.Grow) {
        additionalMsec = weakenTime - growTime
      }
      
      for (const server in simulatedAvailableRam) {
        if (simulatedAvailableRam[server] >= operationScriptRam * currentThreads) {
          // Attempt to put the operation on a single server
          const hgwOptions : BasicHGWOptions = {
            threads: currentThreads,
            stock: false,
            additionalMsec: additionalMsec
          }

          simulatedPlan.push({
            capability: batch[operation].capability,
            threads: currentThreads,
            host: server,
            hgwOptions: hgwOptions,
            ram: operationScriptRam,
          })
          simulatedAvailableRam[server] = simulatedAvailableRam[server] - (operationScriptRam * currentThreads)
          successfulPlan = true
          break
        } else if (batch[operation].allowSpread) {
          // If spread is allowed just spread things wherever
          let attemptingThreads = currentThreads - 1
          while (attemptingThreads > 0) {
            if (simulatedAvailableRam[server] >= operationScriptRam * attemptingThreads) {
              const hgwOptions : BasicHGWOptions = {
                threads: attemptingThreads,
                stock: false,
                additionalMsec: additionalMsec
              }
  
              simulatedPlan.push({
                capability: batch[operation].capability,
                threads: attemptingThreads,
                host: server,
                hgwOptions: hgwOptions,
                ram: operationScriptRam,
              })
              simulatedAvailableRam[server] = simulatedAvailableRam[server] - (operationScriptRam * attemptingThreads)
              currentThreads = currentThreads - attemptingThreads
              break
            }
            attemptingThreads = attemptingThreads - 1
          }
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

  run(ns: NS) : Promise<void> {
    for(const spawn in this.plan) {
      const runOptions: RunOptions = {
        preventDuplicates: false,
        temporary: true,
        threads: this.plan[spawn].threads,
        ramOverride: this.plan[spawn].ram
      }

      ns.enableLog("exec")

      const pid = ns.exec(thisScript, this.plan[spawn].host, runOptions,
        this.plan[spawn].capability,
        this.target,
        this.plan[spawn].hgwOptions.additionalMsec ?? 0,
        this.plan[spawn].hgwOptions.stock ?? false,
        this.plan[spawn].hgwOptions.threads ?? 1
      )

      if (pid === 0) {
        ns.tprint(`ERROR: Exec in farm run failed on host ${this.plan[spawn].host}`)
        return sleep(0)
      }
    }

    return sleep(this.cycleTime + 500)
  }

  getStats(ns: NS) : FarmStats {
    const stats = {
      earningsPerCycle: 0,
      cycleTimeInMs: 0,
      earningsPerSecond: 0,
      growThreads: 0,
    }

    stats.cycleTimeInMs = ns.getWeakenTime(this.target)

    for (const spawn in this.plan) {
      if (this.plan[spawn].capability == Capabilities.Grow) {
        stats.growThreads = stats.growThreads + this.plan[spawn].threads
      }
    }

    return stats
  }
}
