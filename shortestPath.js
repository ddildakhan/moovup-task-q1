const buildGraph = (edges) => {
  const graph = {};

  for (let edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
};

function shortestPath(graph, start, end) {
  const distances = { [start]: 0 };
  const visited = {};
  const parent = {};
  const queue = [{ node: start, distance: 0 }];

  for (let node in graph) {
    distances[node] = Infinity;
  }

  while (queue.length > 0) {
    const { node, distance } = queue.shift();

    if (visited[node]) continue;
    visited[node] = true;

    for (let neighbor of graph[node]) {
      const totalDistance = distance + 1;
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        parent[neighbor] = node;
        queue.push({ node: neighbor, distance: totalDistance });
      }
    }
  }

  let path = [end];
  let current = end;
  while (current !== start) {
    current = parent[current];
    path.unshift(current);
  }

  return path;
}

const edges = [
  ["A", "B"],
  ["B", "C"],
  ["C", "F"],
  ["F", "G"],
  ["G", "H"],
  ["H", "E"],
  ["E", "F"],
  ["E", "D"],
  ["D", "A"],
  ["A", "H"],
  ["C", "D"],
  ["D", "B"],
];

const graph = buildGraph(edges);

const startNode = "A";
const endNode = "H";

const result = shortestPath(graph, startNode, endNode);

console.log(`Shortest path from ${startNode} to ${endNode} is: `, result);

// Output
// Shortest path from A to H is:  [ 'A', 'H' ]
