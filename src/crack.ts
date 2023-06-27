/**
 * @file Concerning getting root access to computers on the network.
 */

import { NS } from "@ns";
import { Network } from "./network";

export const enum Cracks {
  BruteSSH = "BruteSSH.exe",
  FTPCrack = "FTPCrack.exe",
  RelaySMTP = "RelaySMTP.exe",
  HTTPWorm = "HTTPWorm.exe",
  SQLInject = "SQLInject.exe",
  NUKE = "NUKE.exe",
}

function canCrack(ns: NS, server: string): boolean {
  if (!ns.fileExists(Cracks.NUKE)) {
    return false
  }

  let cracksOwned = 0
  if (ns.fileExists(Cracks.BruteSSH)) {
    cracksOwned = cracksOwned + 1
  }
  if (ns.fileExists(Cracks.FTPCrack)) {
    cracksOwned = cracksOwned + 1
  }
  if (ns.fileExists(Cracks.RelaySMTP)) {
    cracksOwned = cracksOwned + 1
  }
  if (ns.fileExists(Cracks.HTTPWorm)) {
    cracksOwned = cracksOwned + 1
  }
  if (ns.fileExists(Cracks.SQLInject)) {
    cracksOwned = cracksOwned + 1
  }

  if (cracksOwned >= ns.getServerNumPortsRequired(server)) {
    return true
  } else {
    return false
  }
}

function crack(ns: NS, network: Network, server: string): boolean {
  if (canCrack(ns, server)) {
    if (network.cracks[Cracks.BruteSSH]) {
      ns.brutessh(server)
    }
    if (network.cracks[Cracks.FTPCrack]) {
      ns.ftpcrack(server)
    }  
    if (network.cracks[Cracks.RelaySMTP]) {
      ns.relaysmtp(server)
    }
    if (network.cracks[Cracks.HTTPWorm]) {
      ns.httpworm(server)
    }
    if (network.cracks[Cracks.SQLInject]) {
      ns.sqlinject(server)
    }
    if (network.cracks[Cracks.NUKE]) {
      ns.nuke(server)
    }
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

function updateCracks(ns: NS, network: Network) : boolean {
  const timestamp = ns.tFormat(Date.now() - ns.getResetInfo().lastAugReset)
  let cracksUpdated = false

  if (!network.cracks[Cracks.NUKE] && ns.fileExists(Cracks.NUKE)) {
    ns.tprint(`${Cracks.NUKE} aquired at ${timestamp}`)
    network.cracks[Cracks.NUKE] = true
    cracksUpdated = true
  }
  if (!network.cracks[Cracks.BruteSSH] && ns.fileExists(Cracks.BruteSSH)) {
    ns.tprint(`${Cracks.BruteSSH} aquired at ${timestamp}`)
    network.cracks[Cracks.BruteSSH] = true
    cracksUpdated = true
  }
  if (!network.cracks[Cracks.FTPCrack] && ns.fileExists(Cracks.FTPCrack)) {
    ns.tprint(`${Cracks.FTPCrack} aquired at ${timestamp}`)
    network.cracks[Cracks.FTPCrack] = true
    cracksUpdated = true
  }
  if (!network.cracks[Cracks.RelaySMTP] && ns.fileExists(Cracks.RelaySMTP)) {
    ns.tprint(`${Cracks.RelaySMTP} aquired at ${timestamp}`)
    network.cracks[Cracks.RelaySMTP] = true
    cracksUpdated = true
  }
  if (!network.cracks[Cracks.HTTPWorm] && ns.fileExists(Cracks.HTTPWorm)) {
    ns.tprint(`${Cracks.HTTPWorm} aquired at ${timestamp}`)
    network.cracks[Cracks.HTTPWorm] = true
    cracksUpdated = true
  }
  if (!network.cracks[Cracks.SQLInject] && ns.fileExists(Cracks.SQLInject)) {
    ns.tprint(`${Cracks.SQLInject} aquired at ${timestamp}`)
    network.cracks[Cracks.SQLInject] = true
    cracksUpdated = true
  }
  return cracksUpdated
}

/**
 * @function crackNetwork tries to crack all crackable servers every interval ms, terminates once everything is cracked.
 */
export function crackNetwork(ns: NS, network: Network, interval: number): void {
  const cracksUpdated = updateCracks(ns, network)

  if (cracksUpdated) {
    for (const server in network.servers) {
      if (!network.servers[server].hasAdminRights) {
        if(crack(ns, network, server)) {
          network.upToDate = false
        }
      }
    }
  }


  if (everythingIsCracked(network)) {
    return
  } else {
    setTimeout(crackNetwork, interval, ns, network, interval)
  }
}
