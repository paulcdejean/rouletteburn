import { get_roulette_seeds } from "@rust"
import { WHRNG } from "./WHRNG"

export interface RouletteRound {
  guess: number
  result: number
}

interface PossibleResult {
  spins: number[],
  skips: number,
}

export class RoulettePlaythrough {
  rounds: RouletteRound[] = []
  rng ?: WHRNG
  rngResults: number[] = []
  predictedResult: PossibleResult = {spins: [], skips: 0}
  seed : number = -1
  predictedWinner = -1
  playthroughStartTime = -1
  maxLookbackMiliseconds = 300000 // 5 minutes, higher values are more lag
  seedCalculateRound = 5

  public addRound(round: RouletteRound) {
    this.rounds.push(round)

    if (this.playthroughStartTime < 0) {
      this.playthroughStartTime = new Date().getTime()
    }

    if (this.rounds.length === this.seedCalculateRound) {
      this.getInitialSeed()
      // If this doesn't hit it's permanently dead :(
      if (this.seed >= 0) {
        this.rng = new WHRNG(this.seed)
        for(let spin = 0; spin < this.predictedResult.spins.length + this.predictedResult.skips; spin++) {
          this.rngResults.push(Math.floor(this.rng.random() * 37))
        }
        this.predictedWinner = Math.floor(this.rng.random() * 37)
        this.rngResults.push(this.predictedWinner)
      }
    }

    if (this.rounds.length > this.seedCalculateRound) {
      // Sanity check
      if (this.seed >= 0 && this.predictedWinner >= 0 && this.rng !== undefined) {
        if (round.guess === round.result) {
          this.predictedWinner = Math.floor(this.rng.random() * 37)
          this.rngResults.push(this.predictedWinner)
        } else {
          // Pull until we get what the actual result was
          let rngResult
          do {
            rngResult = Math.floor(this.rng.random() * 37)
            this.rngResults.push(rngResult)
          } while (rngResult !== round.result)
          this.predictedWinner = Math.floor(this.rng.random() * 37)
          this.rngResults.push(this.predictedWinner)
        }
      }
    }
  }

  private getInitialSeed() {
    const possibleResults = Math.pow(2, this.rounds.length)
    for (let result = 0; result < possibleResults; result++) {
      const possibleSpins : number[] = []
      let skips = 0
      let simulatedRound = 0
      let resultBits = result
      this.rounds.forEach(() => {
        if (resultBits & 1) {
          possibleSpins.push(this.rounds[simulatedRound].guess)
          skips++
        } else {
          possibleSpins.push(this.rounds[simulatedRound].result)
          simulatedRound++
        }
        resultBits = resultBits >> 1
      })
      const possibleSeeds = get_roulette_seeds(
        new Float64Array(possibleSpins),
        this.playthroughStartTime - this.maxLookbackMiliseconds,
        this.playthroughStartTime
      )

      // Run with the first possible seed to reduce lag
      for (const possibleSeed of possibleSeeds) {
        this.seed = possibleSeed
        this.predictedResult.spins = possibleSpins
        this.predictedResult.skips = skips
        break
      }
      if (this.seed >= 0) {
        return
      }
    }
    return
  }

  public getRecentResults(count: number) : string[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.result.toString().padStart(2, "0"))
  }

  public getRecentGuesses(count: number) : string[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.guess.toString().padStart(2, "0"))
  }
}
