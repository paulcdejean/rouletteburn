import { Capabilities } from "@/Capabilities.ts"
import type { NS } from "@ns";
import { Network } from "@/network.ts"
import { fastestResults } from "@/targettingAlgos/fastestResults.ts"

type TargettingAlgo = (ns: NS, network: Network) => string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaTargetting(ns: NS, capabilities: Capabilities) : TargettingAlgo {
  return fastestResults
}
