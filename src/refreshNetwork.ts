import type { NS } from "@ns";
import { Network } from "@/Network.ts"
import { Capabilities } from "@/Capabilities.ts"
import { home } from "@/constants.ts"



export function refreshNetwork(ns: NS, capabilities: Capabilities): Network {
  const network = new Network()

  const homeConnected = ns.scan(home)

  homeConnected.forEach((nearbyServer) => {
    addToNetwork(ns, capabilities, network, nearbyServer)
  })

  network.upToDate = true

  return network
}

function addToNetwork(ns: NS, capabilities: Capabilities, network: Network, server: string) {
  ns.tprint(server)

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

    const nearbyServers = ns.scan(server)
    nearbyServers.forEach((nearbyServer) => {
      addToNetwork(ns, capabilities, network, nearbyServer)
    })
  }
}
