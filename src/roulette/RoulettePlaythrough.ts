import { get_roulette_seeds } from "@rust"

export interface RouletteRound {
  guess: number
  result: number
}

export class RoulettePlaythrough {
  rounds: RouletteRound[] = []
  predictedResults: number[] = []
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
    }
    if (this.rounds.length >= this.seedCalculateRound) {
      this.updatePredictedWinner()
    }
  }

  private getInitialSeed() {
    const possibleResults = Math.pow(2, this.rounds.length)
    for (let result = 0; result < possibleResults; result++) {
      const possibleResult : number[] = []
      let simulatedRound = 0
      let resultBits = result
      this.rounds.forEach(() => {
        if (resultBits & 1) {
          possibleResult.push(this.rounds[simulatedRound].guess)
        } else {
          possibleResult.push(this.rounds[simulatedRound].result)
          simulatedRound++
        }
        resultBits = resultBits >> 1
      })
      const possibleSeeds = get_roulette_seeds(
        new Float64Array(possibleResult),
        this.playthroughStartTime - this.maxLookbackMiliseconds,
        this.playthroughStartTime
      )

      // Run with the first possible seed to reduce lag
      for (const possibleSeed of possibleSeeds) {
        this.seed = possibleSeed
        this.predictedResults = possibleResult
        break
      }
      if (this.seed >= 0) {
        return
      }
    }
    return
  }

  private updatePredictedWinner() {
    return
  }

  public getRecentResults(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.result)
  }

  public getRecentGuesses(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.guess)
  }
}
