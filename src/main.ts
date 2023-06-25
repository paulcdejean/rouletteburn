import type { NS } from "@ns"

import { Capabilities } from "@/Capabilities"

import { mainBasic } from "@/mains/mainBasic"
import * as basicFunctions from "@/staticRam"
import { mainHack } from "./mains/mainHack"
import { mainGrow } from "./mains/mainGrow"
import { mainWeaken } from "./mains/mainWeaken"

export async function main(ns: NS): Promise<void> {
  // Prevents spam, forgive the magic word here.
  ns.disableLog("ALL")

  // This bit of code prevents tree shaking, which allows for static RAM to be correctly set.
  if(Object.keys(basicFunctions).length < 0) {
    throw new Error("This code is unreachable and is designed to be a noop!")
  }

  // Detect what capabilities the script was launched with.
  let capabilities = Capabilities.Basic
  if(ns.args.length > 0) {
    capabilities = ns.args[0] as Capabilities
  }

  // If capabilities are not upgraded, then get to the main bulk of the code.
  switch(capabilities) {
    case Capabilities.Basic: {
      await mainBasic(ns)
      return
    }
    case Capabilities.Hack: {
      await mainHack(ns)
      return
    }
    case Capabilities.Grow: {
      await mainGrow(ns)
      return
    }
    case Capabilities.Weaken: {
      await mainWeaken(ns)
      return
    }
  }
}
