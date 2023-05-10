export function calcByWeight(weights: [string, number][], max: number, arrFunc: (x: number) => number): [string, number][] {
    if (max <= 0) return weights;
    try {
        const weightsSum = weights.map(w => w[1]).reduce((p, c) => p + c);
        const factor = max / (weightsSum > 0 ? weightsSum : 1);
        const res = weights.map(obj => ([ obj[0], arrFunc(obj[1] * factor)]));
        return res as [string, number][];
    } catch(err) {
        console.log("Error occurred");
        return weights;
    }
}