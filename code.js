function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;

    let currentRoute = [...Array(n).keys()];
    shuffleArray(currentRoute);
    let pathVal = countPathLength(currentRoute, distance_matrix);

    const maxIterate = factorial(n); // or use a smaller number like n * n for practical purposes
    for (let iter = 0; iter < maxIterate; iter++) {
        let i = Math.floor(Math.random() * (n - 1));
        let k;
        do {
            k = Math.floor(Math.random() * (n - 1));
        } while (k === i);

        const newRoute = twoOptSwap(currentRoute, i, k);
        const newVal = countPathLength(newRoute, distance_matrix);
        if (newVal < pathVal) {
            currentRoute = newRoute;
            pathVal = newVal;
        }
    }
    return pathVal;
}

function twoOptSwap(route, i, k) {
    const newRoute = route.slice();
    while (i < k) {
        [newRoute[i], newRoute[k]] = [newRoute[k], newRoute[i]];
        i += 1;
        k -= 1;
    }
    return newRoute;
}

function countPathLength(route, distance_matrix) {
    let totalLength = 0;
    for (let i = 0; i < route.length - 1; i++) {
        totalLength += distance_matrix[route[i]][route[i + 1]];
    }
    totalLength += distance_matrix[route[route.length - 1]][route[0]];
    return totalLength;
}
function factorial(n) { //This is the factorial part of the bottomUp function done in dynamic-euler
    if (n === 0) return 1;

    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }

    return fact;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
