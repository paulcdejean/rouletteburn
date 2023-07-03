import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { sleep } from "@/utils";
import RouletteHelper from "@/ui/RouletteHelper/RouletteHelper";

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("React!!!")
  ns.printRaw(React.createElement(RouletteHelper))
  // const elementTest = React.createElement("h1", { style: { color: "black" } }, "Hello World")
  // ns.printRaw(elementTest)
  await sleep(30000)
}
