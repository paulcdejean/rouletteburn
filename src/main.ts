import { NS } from "@ns";
import RouletteHelper from "@/ui/RouletteHelper/RouletteHelper";
import { sleep } from "./utils";

export async function main(ns: NS): Promise<void> {
  ns.clearLog()
  ns.disableLog("ALL")
  // Cleans up react element after exit
  ns.atExit(() => ns.clearLog())

  ns.printRaw(React.createElement(RouletteHelper))
  
  ns.tail()
  ns.resizeTail(750, 400)
  ns.moveTail(350, 550)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
  while(true) {
    await sleep(2000)
  }
}
