import { Farm } from "@/Farm";
import { Network } from "@/network";
import { NS } from "@ns";

export function quickHack(ns: NS, network: Network, target: string) : Farm {
  ns.tprint(`Running farming algorithm "quickHack" on target ${target}`)
  const farm = new Farm(ns, network, target)

  farm.quickHack(ns)
  return farm
}
