// Copyright 2022 Daniel Y Xie

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

// Ripped from https://github.com/bitburner-official/bitburner-src/blob/dev/src/Casino/RNG.ts#L40
// As per the terms of the apache lisence

/*
 * Wichmann–Hill PRNG
 * The period is 6e12.
 * There's only 30k seeds though lol...
 */

interface RNG {
  random(): number;
}

export class WHRNG implements RNG {
  s1 = 0;
  s2 = 0;
  s3 = 0;

  constructor(totalPlaytime: number) {
    // This one is seeded by the players total play time.
    const v: number = (totalPlaytime / 1000) % 30000;
    this.s1 = v;
    this.s2 = v;
    this.s3 = v;
  }

  step(): void {
    this.s1 = (171 * this.s1) % 30269;
    this.s2 = (172 * this.s2) % 30307;
    this.s3 = (170 * this.s3) % 30323;
  }

  random(): number {
    this.step();
    return (this.s1 / 30269.0 + this.s2 / 30307.0 + this.s3 / 30323.0) % 1.0;
  }
}
