import { NS, BasicHGWOptions, RunOptions } from "@ns";

export function spawn(ns: NS, host: string, farmer: string, hgwOptions: BasicHGWOptions) {
  const runOptions: RunOptions  = {
    preventDuplicates: false,
    temporary: true,
    threads: hgwOptions.threads
  }
  setImmediate(ns.exec, "farmers/hack.js", host, runOptions, hgwOptions.additionalMsec ?? 0, hgwOptions.stock ?? false, hgwOptions.threads ?? 1)
}