import { Network } from "@/network";
import { NS } from "@ns";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function prepSingle(ns: NS, network: Network, target: string) : Promise<number> {

  // Schedule a batch the weakens to min security, if that fails just go straight to finalWeaken
  // Schedule a batch that grows up to the max, keep reducing the grow threads if it fails
  // Final weaken

  return new Promise<number>(resolve => {
    resolve(0)
  })
}