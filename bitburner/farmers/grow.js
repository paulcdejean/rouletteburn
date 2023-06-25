/** @param {NS} ns */
export async function main(ns) {
  ns.tprint("Grow started")
  await ns.grow(ns.args[0], {
    additionalMsec: ns.args[1],
    stock: ns.args[2],
    threads: ns.args[3],
  })
  ns.tprint("Grow finished")
}
