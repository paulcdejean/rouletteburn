pub struct WHRNG {
  s1: f64,
  s2: f64,
  s3: f64,
}

impl WHRNG {
  pub fn seed(&mut self, seed: f64) {
    let n = (seed / 1000.0) % 30000.0;
    self.s1 = n;
    self.s2 = n;
    self.s3 = n;
  }

  pub fn random(&mut self) -> f64 {
    self.s1 = (171.0 * self.s1) % 30269.0;
    self.s2 = (172.0 * self.s2) % 30307.0;
    self.s3 = (170.0 * self.s3) % 30323.0;
    return (self.s1 / 30269.0 + self.s2 / 30307.0 + self.s3 / 30323.0) % 1.0;
  }

  pub fn new(seed: f64) -> WHRNG {
    let n = (seed / 1000.0) % 30000.0;
    return WHRNG {
      s1: n,
      s2: n,
      s3: n,
    }
  }
}
