import { NS } from "@ns";
import RouletteHelper from "@/ui/RouletteHelper/RouletteHelper";
import { sleep } from "./utils";

export async function main(ns: NS): Promise<void> {
  roulette(ns)

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
  while(true) {
    await sleep(2000)
  }
}

export function roulette(ns: NS): void {
  ns.disableLog("ALL")
  ns.clearLog()
  // Cleans up react element after exit
  ns.atExit(() => {
    ns.clearLog()
    ns.closeTail()
  })

  ns.printRaw(React.createElement(RouletteHelper))
  
  ns.tail()
  ns.resizeTail(750, 400)
  ns.moveTail(350, 550)
}
