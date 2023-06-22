import { NS } from "@ns";

export enum Capabilities {
  Basic, // 8GB of RAM pain
  Standard // 32GB of RAM
}

export function canUpgradeCapabilities(ns: NS) {
  return false
}
