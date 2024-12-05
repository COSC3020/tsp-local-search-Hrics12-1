function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;

    let currentRoute = [...Array(n).keys()];
    shuffleArray(currentRoute);
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
