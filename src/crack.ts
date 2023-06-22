/**
 * @file Concerning getting root access to computers on the network.
 */

import { NS } from "@ns";
import { brutessh, ftpcrack, httpworm, nuke, relaysmtp, sqlinject } from "./constants";
import { Network } from "./network";

function crack(ns: NS, server: string): boolean {
  if (ns.fileExists(brutessh)) {
    ns.brutessh(server)
  }
  if (ns.fileExists(ftpcrack)) {
    ns.ftpcrack(server)
  }  
  if (ns.fileExists(relaysmtp)) {
    ns.relaysmtp(server)
  }
  if (ns.fileExists(httpworm)) {
    ns.httpworm(server)
  }
  if (ns.fileExists(sqlinject)) {
    ns.sqlinject(server)
  }
  if (ns.fileExists(nuke)) {
    ns.nuke(server)
  }
  return ns.hasRootAccess(server)
}

function everythingIsCracked(network: Network): boolean {
  let everythingCracked = true
  for (const server in network.servers) {
    if (!network.servers[server].hasAdminRights) {
      everythingCracked = false
    }
  }
  return everythingCracked
}

/**
 * @function crackNetwork tries to crack all crackable servers every interval ms, terminates once everything is cracked.
 */
export function crackNetwork(ns: NS, network: Network, interval: number): void {
  for (const server in network.servers) {
    if (!network.servers[server].hasAdminRights) {
      if(crack(ns, server)) {
        network.upToDate = false
      }
    }
  }

  ns.tprint("DEBUG: cracking loop")

  if (everythingIsCracked(network)) {
    return
  } else {
    setTimeout(crackNetwork, interval, ns, network, interval)
  }
}
