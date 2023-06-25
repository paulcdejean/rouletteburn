import { NS } from "@ns";

export const weakenFunctions = [
  "weaken"
]

export async function mainWeaken(ns: NS) : Promise<void> {
  ns.tprint("weaken started")
  await ns.weaken(ns.args[1] as string, {
    additionalMsec: ns.args[2] as number,
    stock: ns.args[3] as boolean,
    threads: (ns.args[4] as number)
  })
  ns.tprint("weaken finished")
}
