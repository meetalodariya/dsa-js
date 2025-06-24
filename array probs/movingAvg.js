class MovingAverage {
  constructor(size) {
    this.sum = 0.0;
    this.count = 0.0;
    this.size = size;
    this.vals = new Array(size).fill(0);
    this.index = 0;
  }

  next(val) {
    if (this.index + 1 === this.size) {
      this.index = 0;
    } else {
      this.index++;
    }

    this.sum += val - this.vals[this.index];

    if (this.count < this.size) {
      this.count++;
    }

    return this.sum / this.count;
  }
}

const mvAvg = new MovingAverage(3);

console.log(mvAvg.next(5));
console.log(mvAvg.next(12));
console.log(mvAvg.next(43));
console.log(mvAvg.next(432));

// [5, 12, 43, 432]

// size = 3

// [0, 0, 0]
