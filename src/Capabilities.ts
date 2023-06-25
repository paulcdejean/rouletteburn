import { NS } from "@ns";
import * as basicFunctions from "@/staticRam"

export const enum Capabilities {
  Basic = "basic",
  Hack = "hack",
  Weaken = "weaken",
  Grow = "grow"
}

export const capabilityFunctions = {
  basic: Object.keys(basicFunctions), // 8GB of RAM
  hack: ["hack"], // Hack farmer
  grow: ["grow"], // Grow farmer
  weaken: ["weaken"], // Weaken farmer
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function upgradeCapabilities(ns: NS, capabilities: Capabilities) {
  return false

  // TODO: actually allow upgrading of capabilities
}
