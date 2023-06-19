import type { NS } from "@ns";

import { noodle } from '@/n00dles.ts'

export async function main(ns: NS): Promise<void> {
  noodle(ns)
  ns.tprint("Hello typescript!");
}
