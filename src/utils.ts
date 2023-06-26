import { NS } from "@ns"
import { defaultServerFortifyAmount, defaultServerWeakenAmount, home } from "./constants"

/**
 * @function sleep Using ns.sleep will cause complaints about concurrent ns function calls.
 */
export async function sleep(ms : number) : Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/**
 * @function growthAnalyzeSecurity Real growthAnalyzeSecurity costs too much RAM for early game.
 */
export function growthAnalyzeSecurity(ns: NS, threads: number, hostname: string, cores?: number) {
  if(ns.getServerMaxRam(home) >= 256) {
    return ns.growthAnalyzeSecurity(threads, hostname, cores)
  } else {
    return 2 * defaultServerFortifyAmount * threads
  }
}

/**
 * @function hackAnalyzeSecurity Real growthAnalyzeSecurity costs too much RAM for early game.
 */
export function hackAnalyzeSecurity(ns: NS, threads: number, hostname: string) {
  if(ns.getServerMaxRam(home) >= 256) {
    return ns.hackAnalyzeSecurity(threads, hostname)
  } else {
    return defaultServerFortifyAmount * threads
  }
}

/**
 * @function weakenAnalyze Real weakenAnalyze costs too much RAM for early game.
 */
export function weakenAnalyze(ns: NS, threads: number, cores?: number) {
  if(ns.getServerMaxRam(home) >= 256) {
    return ns.weakenAnalyze(threads, cores)
  } else {
    return defaultServerWeakenAmount * threads
  }
}
