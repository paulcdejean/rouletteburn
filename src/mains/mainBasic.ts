import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { sleep } from "@/utils";
import { React } from "@react";

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("React!!!")
  const elementTest = React.createElement('div', null, `Hello World!`)
  ns.printRaw(elementTest)
  await sleep(30000)
}
