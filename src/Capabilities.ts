import { NS } from "@ns";

export const enum Capabilities {
  Basic = "basic", // 8GB of RAM
  Standard = "standard", // 32GB of RAM, no BN modifiers
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function upgradeCapabilities(ns: NS, capabilities: Capabilities) {
  return false

  // TODO: actually allow upgrading of capabilities
}
