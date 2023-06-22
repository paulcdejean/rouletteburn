import { Capabilities } from "@/capabilities/Capabilities"
import type { NS } from "@ns";
import { Network } from "@/network"
import { fastestResults } from "@/targettingAlgos/fastestResults"

type TargettingAlgo = (ns: NS, network: Network) => string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaTargetting(ns: NS, capabilities: Capabilities) : TargettingAlgo {
  return fastestResults
}
