import { NS } from "@ns";
import { sleep } from "@/utils";
import RouletteHelper from "@/ui/RouletteHelper/RouletteHelper";

export async function main(ns: NS): Promise<void> {
  // Prevents spam, forgive the magic word here.
  ns.disableLog("ALL")

  ns.tprint("React!!!")
  ns.printRaw(React.createElement(RouletteHelper))
  await sleep(30000)
}
