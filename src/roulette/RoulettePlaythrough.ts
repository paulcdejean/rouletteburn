import { WHRNG } from "./badRNG"

export interface RouletteRound {
  guess: number
  result: number
}

interface PotentialResult {
  result: number[]
  seeds: number[]
}

export class RoulettePlaythrough {
  rounds: RouletteRound[]
  potentialResults: PotentialResult[]
  maxSeed = 30000
  potentialSeeds = new Set<number>()

  constructor(startingThreeRounds: RouletteRound[]) {
    if (startingThreeRounds.length !== 3) {
      throw new Error("RoulettePlaythrough must be constructed with exactly 3 rounds")
    }
    this.rounds = startingThreeRounds

    this.potentialResults = this.getPotentialResults(startingThreeRounds)
    this.fillPotentialSeeds()
    this.potentialResults = this.potentialResults.filter(result => result.seeds.length > 0)
  }

  private getPotentialResults(rounds: RouletteRound[]) : PotentialResult[] {
    const potentialRolls : number[][] = []
    const potentialResults : PotentialResult[] = []

    function highestBinaryNumberOfXDigits(digitCount : number) : number {
       return (Math.pow(2, digitCount) - 1)
    }

    function nthDigitIsOne(nthDigit: number, input: number) : boolean {
      return ((input & Math.pow(2, nthDigit)) > 0)
    }

    const numberOfPotentialRolls = highestBinaryNumberOfXDigits(rounds.length)

    let possibility = 0
    while (possibility <= numberOfPotentialRolls) {
      let simulatedRound = 0
      const potentialRoll : number[] = []
      while (potentialRoll.length < rounds.length) {
        if (nthDigitIsOne(potentialRoll.length, possibility) || (rounds[simulatedRound].result === rounds[simulatedRound].guess)) {
          potentialRoll.push(rounds[simulatedRound].result)
          simulatedRound = simulatedRound + 1
        } else {
          potentialRoll.push(rounds[simulatedRound].guess)
        }
      }
      potentialRolls.push(potentialRoll)
      possibility = possibility + 1
    }

    potentialRolls.forEach(roll => {
      potentialResults.push({
        result: roll,
        seeds: []
      })
    })

    return potentialResults
  }

  private fillPotentialSeeds() {
    this.potentialResults.forEach(potentialResult => {
      let seed = 0
      while (seed < this.maxSeed) {
        const rng = new WHRNG(seed)

        let match = true
        for (const spin of potentialResult.result) {
          if(Math.floor(rng.random() * 37) !== spin) {
            match = false
          }
        }
        if (match) {
          potentialResult.seeds.push(seed)
          this.potentialSeeds.add(seed)
        }
        seed = seed + 1
      }
    })
  }
}
