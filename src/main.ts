import type { NS } from "@ns"

import { Capabilities, upgradeCapabilities } from "@/Capabilities"

import { mainBasic } from "@/mains/mainBasic"

export async function main(ns: NS): Promise<void> {
  // Prevents spam, forgive the magic word here.
  ns.disableLog("ALL")

  // Detect what capabilities the script was launched with.
  let capabilities = Capabilities.Basic
  if(ns.args.length > 0) {
    capabilities = ns.args[0] as Capabilities
  }

  // Upgrade those capabilities if it makes sense to. Exit if they're upgraded.
  if(upgradeCapabilities(ns, capabilities)) {
    return
  }

  // If capabilities are not upgraded, then get to the main bulk of the code.
  switch(capabilities) {
    case Capabilities.Basic: {
      await mainBasic(ns, capabilities)
      return
    }
  }
}
