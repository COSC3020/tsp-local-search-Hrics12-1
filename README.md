# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

So the tsp_ls function initializes the array and calls the shuffleArray function at the start. This take $O(n)$ time to shuffle. Then the countPathLength function is called and finds the intial route and calculates the distance. This also takes $O(n)$ time. The main loop is based off of the maxIterate and is $O(n!)$ because maxIterate = factorial(n). So, for each iteration the two indices $i$ and $k$ are picked randomly which is a constant time. The twoOptSwap function swaps the two parts of the route and this also takes $O(n)$ time because it might go over the route and reverse a section of it. Then the countPathLength finds the new path length and that take $O(n)$ time also. So you have each iteration in the main loop taking $O(n)$ time and in the worst case the loop will run $n!$ times. The worst case time complexity is $O(n*n!)$

Memory wise the distance matrix is a $n*n$ matrix where $n$ is the cities. This equals $O(n^2)$. The currentRoute array stores the routes and is just $n$ for its length. The newRoute array inside the twoOptSwap function is just a copy of the currentRoute array so it is also just $n$ The temporary values all take constant space. The factorial function only keeps one integer in memory each recursive call so this is also $n$ for the recursion stack. So the worst case memory complexity is going to be the distance matrix at $O(n^2)$.
 

I had a friend Dexter look over my tsp_ls function because it wasn't working correctly when I wass testing in vscode. I was being dumb and using $n$ instead of $n-1$ for $i$ and $k$ and I think it was causing some sort of index access issue. This is the function before he helped me

```javascript
function tsp_ls(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;

    let currentRoute = [...Array(n).keys()];
    shuffleArray(currentRoute);
    let pathVal = countPathLength(currentRoute, distance_matrix);

    const maxIterate = factorial(n); // or use a smaller number like n * n for practical purposes
    for (let iter = 0; iter < maxIterate; iter++) {
        let i = Math.floor(Math.random() * (n));
        let k;
        do {
            k = Math.floor(Math.random() * (n));
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
```
https://dm865.github.io/assets/dm865-tsp-ls-handout.pdf

https://youtu.be/Gfx9UV2tpLg?si=Jf2A6L4hsiipuWUb

https://www.geeksforgeeks.org/swap-nodes-in-a-linked-list-without-swapping-data/


I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
