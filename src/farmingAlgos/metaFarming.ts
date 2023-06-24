import { Capabilities } from "@/capabilities/Capabilities"
import type { NS } from "@ns";
import { Network } from "@/network"
import { startingHWGW } from "@/farmingAlgos/startingHWGW"

type FarmingAlgo = (ns: NS, network: Network, target: string) => Promise<number>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaFarming(ns: NS, capabilities: Capabilities, target: string) : FarmingAlgo {
  return startingHWGW
}
