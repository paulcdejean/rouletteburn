import { NS } from "@ns";

export const growFunctions = [
  "grow"
]

export async function mainGrow(ns: NS) : Promise<void> {
  ns.enableLog("grow")
  await ns.grow(ns.args[1] as string, {
    additionalMsec: ns.args[2] as number,
    stock: ns.args[3] as boolean,
    threads: (ns.args[4] as number)
  })
}
