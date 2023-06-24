import { Capabilities } from "@/capabilities/Capabilities"
import type { NS } from "@ns";
import { Network } from "@/network"
import { shotgunHWGW } from "@/farmingAlgos/shotgunHWGW"

type FarmingAlgo = (ns: NS, network: Network, target: string) => Promise<number>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaFarming(ns: NS, capabilities: Capabilities, target: string) : FarmingAlgo {
  return shotgunHWGW
}
