/**
 * @file The concept of the "network" which is all the servers the player can connect to, and some functions concerning it.
 */

import type { Server } from "@ns"
import type { NS } from "@ns";
import { Capabilities } from "@/capabilities/Capabilities"
import { home, cave, SpawnScript } from "@/constants"

type Servers = Record<string, Server>

export class Network {
  public upToDate = false
  public cavePath : string[] | null = null
  public servers : Servers = {}
}

export function refreshNetwork(ns: NS, network: Network, capabilities: Capabilities): Network {
  network.servers = {}
  addToNetwork(ns, capabilities, network, home, [])
  network.upToDate = true
  return network
}

function addToNetwork(ns: NS, capabilities: Capabilities, network: Network, server: string, cavePath: string[]) {
  if (server in network.servers) {
    return
  } else {
    if (capabilities == Capabilities.Basic) {
      network.servers[server] = {
        hostname: server,
        ip: "9.9.9.9", // Make something up it doesn't matter
        sshPortOpen: false, // If we assume false worst that can happen is the server is recracked
        ftpPortOpen: false, // If we assume false worst that can happen is the server is recracked
        smtpPortOpen: false, // If we assume false worst that can happen is the server is recracked
        httpPortOpen: false, // If we assume false worst that can happen is the server is recracked
        sqlPortOpen: false, // If we assume false worst that can happen is the server is recracked
        hasAdminRights: ns.hasRootAccess(server),
        cpuCores: 1, // Safe assumption until later in the game
        isConnectedTo: false, // Probably an unused property
        ramUsed: 0, // Safe assumption because we're not using this property for the batcher
        maxRam: ns.getServerMaxRam(server),
        organizationName: "unknown", // Probably not important until later in the game
        purchasedByPlayer: false, // Safer assumption than the alternative
        minDifficulty: ns.getServerMinSecurityLevel(server),
        moneyMax: ns.getServerMaxMoney(server),
        numOpenPortsRequired: ns.getServerNumPortsRequired(server),
        requiredHackingSkill: ns.getServerRequiredHackingLevel(server)
      }
    } else {
      network.servers[server] = ns.getServer(server)
    }

    Object.values(SpawnScript).forEach(script => {
      ns.scp(script, server, home)
    })

    const nearbyServers = ns.scan(server)
    nearbyServers.forEach((nearbyServer) => {
      const updatedCavePath = Array.from(cavePath)
      updatedCavePath.push(server)
      if (server == cave) {
        network.cavePath = updatedCavePath
      }
      addToNetwork(ns, capabilities, network, nearbyServer, updatedCavePath)
    })
  }
}
