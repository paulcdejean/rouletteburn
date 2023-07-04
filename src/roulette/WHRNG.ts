export class WHRNG {
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
