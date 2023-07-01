import { NS } from "@ns";
import * as basicList from "@/staticRam"
import Example from "@/ui/Example"
import { sleep } from "@/utils";

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("React!!!")
  ns.printRaw(Example())
  await sleep(30000)
}
