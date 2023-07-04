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
  predictedResult: PossibleResult = {spins: [], skips: 0}
  seed = -1
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
      // if (this.seed < 0) {
      //   throw new Error("Failed to find seed")
      // }
      // this.rng = new WHRNG(this.seed)
      // this.rng.random()
    }
    // if (this.rounds.length >= this.seedCalculateRound) {
    //   this.predictedWinner = this.rng?.random() ?? -1
    // }
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

  public getRecentResults(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.result)
  }

  public getRecentGuesses(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.guess)
  }
}
