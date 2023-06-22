/**
 * @file Concerning getting root access to computers on the network.
 */

import { NS } from "@ns";
import { brutessh, ftpcrack, httpworm, nuke, relaysmtp, sqlinject } from "./constants";
import { Network } from "./network";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

/**
 * @function crackNetwork tries to crack all crackable servers every interval ms, terminates once everything is cracked
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function crackNetwork(ns: NS, network: Network, interval: number): void {
  ns.tprint("Crackin at it!")
  setTimeout(crackNetwork, interval, ns, network, interval)
}
