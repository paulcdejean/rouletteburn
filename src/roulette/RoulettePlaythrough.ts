export interface RouletteRound {
  guess: number
  result: number
}

interface PotentialResult {
  result: number[]
  seeds: number[]
}

export class RoulettePlaythrough {
  rounds: RouletteRound[] = []
  potentialResults: PotentialResult[] = []
  potentialSeeds = new Set<number>()
  predictedWinner = -1
  playthroughStartTime = -1
  maxLookbackMiliseconds = 6e5 // 10 minutes, higher values are more lag
  seedCalculateRound = 5

  public addRound(round: RouletteRound) {
    this.rounds.push(round)

    if (this.playthroughStartTime < 0) {
      this.playthroughStartTime = new Date().getTime()
    }

    if (this.rounds.length === this.seedCalculateRound) {
      this.generatePossibleResults()
    } else if (this.rounds.length > this.seedCalculateRound) {
      this.updatePossibleResults()
    }
  }

  private generatePossibleResults() {
    return
  }

  private updatePossibleResults() {
    return
  }

  public getRecentResults(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.result)
  }

  public getRecentGuesses(count: number) : number[] {
    return this.rounds.slice(Math.max(0, this.rounds.length - count)).map(round => round.guess)
  }
}
