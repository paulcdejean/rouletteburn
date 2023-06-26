import { NS } from "@ns";

export const hackFunctions = [
  "hack"
]

export async function mainHack(ns: NS) : Promise<void> {
  ns.enableLog("hack")
  ns.tprint("hack started")
  await ns.hack(ns.args[1] as string, {
    additionalMsec: ns.args[2] as number,
    stock: ns.args[3] as boolean,
    threads: (ns.args[4] as number)
  })
  ns.tprint("hack finished")
}
