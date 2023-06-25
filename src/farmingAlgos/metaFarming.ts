import { Capabilities } from "@/Capabilities"
import type { NS } from "@ns";
import { Network } from "@/network"
import { prepSingle } from "@/farmingAlgos/prepSingle";

type FarmingAlgo = (ns: NS, network: Network, target: string) => Promise<void>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaFarming(ns: NS, capabilities: Capabilities, target: string) : FarmingAlgo {
  return prepSingle
}
