import { Capabilities } from "@/Capabilities"
import type { NS } from "@ns";
import { Network } from "@/network"
import { prepSingle } from "@/farmingAlgos/prepSingle";
import { basicHWGW } from "@/farmingAlgos/basicHWGW";
import { Farm } from "@/Farm";
import { noodles } from "@/constants";
import { noodlesHGW } from "./noodlesHGW";

type FarmingAlgo = (ns: NS, network: Network, target: string) => Farm

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function metaFarming(ns: NS, capabilities: Capabilities, target: string) : FarmingAlgo {
  if(ns.getServerMinSecurityLevel(target) !== ns.getServerSecurityLevel(target) ||
  ns.getServerMoneyAvailable(target) !== ns.getServerMaxMoney(target)) {
    ns.tprint(`Farming target ${target} with algorithm "prepSingle"`)
    return prepSingle
  } else {
    if (target === noodles) {
      ns.tprint(`Farming target ${target} with algorithm "noodlesHGW"`)
      return noodlesHGW
    } else {
      ns.tprint(`Farming target ${target} with algorithm "basicHWGW"`)
      return basicHWGW
    }
  }
}
