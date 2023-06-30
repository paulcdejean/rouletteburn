// 
import { NS } from "@ns";
import * as basicList from "@/staticRam"
import { get_roulette_seeds } from "@rust"
// import { WHRNG } from "@/roulette/badRNG";

// import { Capabilities, upgradeCapabilities } from "@/Capabilities";
// import { crackNetwork } from "@/crack";
// import { Network, refreshNetwork } from "@/network";
// import { canFarm, getPrepTime } from "@/targettingAlgos/utils";
// import { metaTargeting } from "@/targettingAlgos/metaTargeting";
// import { metaFarming } from "@/farmingAlgos/metaFarming";

//import { RoulettePlaythrough, RouletteRound } from "@/roulette/RoulettePlaythrough";
import { WHRNG } from "@/roulette/badRNG";


export const basicFunctions = Object.keys(basicList)

export async function mainBasic(ns: NS): Promise<void> {
  ns.tprint("Roulette!")

  // It's hard to explain this one. But basically we want to get same sizish seeds but still go over all the seeds.
  const maxSeed = 30e6
  const timestamp = new Date().getTime()
  const zeroDate = timestamp - (timestamp % maxSeed) + (timestamp % maxSeed) // TODO, comment out the bit after the + so the code works

  ns.tprint(`Seed = ${zeroDate}`)

  const resultSet : Set<number> = get_roulette_seeds(new Uint32Array([1, 2, 3]), zeroDate)
  ns.tprint("Rolls from rust:")
  for (const result of resultSet) {
    ns.tprint(result)
  }

  const javascriptRNG = new WHRNG(zeroDate)
  ns.tprint("Rolls from javascript:")
  let n = 0
  while (n < 5) {
    ns.tprint(javascriptRNG.random())
    n = n + 1
  }
  

  // ns.tprint(`Start time = ${performance.now()}`)

  // const maxSeed = 30e6
  // const timestamp = new Date().getTime()
  // const zeroDate = timestamp - (timestamp % maxSeed)

  // const realSeed = new Date().getTime()
  // const realRNG = new WHRNG(realSeed)

  // ns.tprint(`Real seed = ${realSeed}`)

  // const lastFiveSpins = []
  // let n = 0
  // while (n < 5) {
  //   lastFiveSpins.push(Math.floor(realRNG.random() * 37))
  //   n = n + 1
  // }

  // ns.tprint(`Last five spins = ${lastFiveSpins}`)

  // const possibleSeeds = []
  // n = 0
  // while (n < maxSeed) {
  //   const fakeRNG = new WHRNG(zeroDate + n)
  //   let match = true
  //   for (const spin of lastFiveSpins) {
  //     if (spin !== Math.floor(fakeRNG.random() * 37)) {
  //       match = false
  //     }
  //   }
  //   if (match) {
  //     possibleSeeds.push(n + zeroDate)
  //   }
  //   n = n + 1
  // }

  // ns.tprint(`Possible seeds =`)
  // ns.tprint(possibleSeeds)
  // ns.tprint(`End time = ${performance.now()}`)
}

// export async function mainBasic(ns: NS): Promise<void> {
//   const capabilities = Capabilities.Basic

//   // Upgrade those capabilities if it makes sense to. Exit if they're upgraded.
//   if(upgradeCapabilities(ns, capabilities)) {
//     return
//   }

//   const network = new Network
//   refreshNetwork(ns, network, capabilities)

//   // Runs in the background, terminates when all crackable servers are cracked
//   crackNetwork(ns, network, 1000)

//   // Foreground loop
//   while(!upgradeCapabilities(ns, capabilities)) {
//     if(!network.upToDate) {
//       ns.tprint("DEBUG: Network not up to date, refreshing network")
//       refreshNetwork(ns, network, capabilities)
//     }

//     for (const server in network.servers) {
//       if(canFarm(ns, network.servers[server])) {
//         const prepTime = getPrepTime(ns, network, server)
//         const formattedPrepTime = ns.tFormat(prepTime, true)
//         ns.tprint(`Server ${server} can be prepared in ${formattedPrepTime}`)
//       }
//     }

//     const target = metaTargeting(ns, capabilities)(ns, network)
//     const farm = metaFarming(ns, capabilities, target)(ns, network, target)

//     ns.tprint(`Farming ${target}`)
//     await farm.run(ns)
//     const timestamp = ns.tFormat(Date.now() - ns.getResetInfo().lastAugReset)
//     ns.tprint(`Farming ${target} complete at ${timestamp}`)
//   }
// }
