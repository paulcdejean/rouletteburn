import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { get_roulette_seeds } from "@rust"
import { WHRNG } from "@/roulette/badRNG";

export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("Roulette!")
  const startTime = performance.now()
  ns.tprint(`Start time = ${startTime}`)

  // It's hard to explain this one. But basically we want to get same sizish seeds but still go over all the seeds.
  const maxSeed = 30e6
  const timestamp = new Date().getTime()
  const zeroDate = timestamp - (timestamp % maxSeed)

  ns.tprint(`Seed = ${timestamp}`)

  const rollCount = 4;
  
  const rolls = new Float64Array(rollCount)

  const javascriptRNG = new WHRNG(timestamp)
  ns.tprint("Rolls from javascript:")
  let n = 0
  while (n < rollCount) {
    rolls[n] = Math.floor(javascriptRNG.random() * 37)
    ns.tprint(rolls[n])
    n = n + 1
  }

  const resultSet : Set<number> = get_roulette_seeds(rolls, zeroDate)
  ns.tprint("Possible seeds from rust:")
  for (const result of resultSet) {
    ns.tprint(result)
  }

  const endTime = performance.now()
  ns.tprint(`End time = ${endTime}`)
  ns.tprint(`Total time = ${endTime - startTime}`)
}
