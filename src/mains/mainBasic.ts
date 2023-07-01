import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { sleep } from "@/utils";

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("React!!!")
  const elementTest = React.createElement("h1", { style: { color: "black" } }, "Hello World")
  ns.printRaw(elementTest)
  await sleep(30000)
}
