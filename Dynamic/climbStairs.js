const climbStairs = (n) => {
    let temp;
    let one = 1;
    let two = 1;

    for (let i = n - 1; i > 0; i--) {
        temp = one;
        one = one + two;
        two = temp;
    }

    return one;
}

console.log(climbStairs(4));
