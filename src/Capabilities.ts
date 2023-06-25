import { NS } from "@ns";
import * as basicFunctions from "@/staticRam"
import { baseRamCost } from "./constants";

export const enum Capabilities {
  Basic = "basic",
  Hack = "hack",
  Weaken = "weaken",
  Grow = "grow"
}

const capabilityFunctions = {
  [Capabilities.Basic]: Object.keys(basicFunctions), // 8GB of RAM
  [Capabilities.Hack]: ["hack"], // Hack farmer
  [Capabilities.Grow]: ["grow"], // Grow farmer
  [Capabilities.Weaken]: ["weaken"], // Weaken farmer
}

export function getCapabilityRam(ns: NS, capability: Capabilities) : number {
  let capabilityRam = baseRamCost
  capabilityFunctions[capability].forEach(functionName => {
   capabilityRam = capabilityRam + ns.getFunctionRamCost(functionName)
  })
  return capabilityRam
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function upgradeCapabilities(ns: NS, capabilities: Capabilities) {
  return false

  // TODO: actually allow upgrading of capabilities
}
