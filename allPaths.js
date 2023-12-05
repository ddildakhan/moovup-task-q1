function findAllPaths(graph, start, end, path) {
  path.push(start);

  if (start === end) {
    return [path];
  }

  if (!(start in graph)) {
    return [];
  }

  let paths = [];

  for (let node of graph[start]) {
    if (!path.includes(node)) {
      let newPaths = findAllPaths(graph, node, end, [...path]);
      paths.push(...newPaths);
    }
  }

  return paths;
}

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

const graphEdges = [
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

const startNode = "A";
const endNode = "H";

let graph = buildGraph(graphEdges);

let path = [];
const paths = findAllPaths(graph, startNode, endNode, path);

console.log(paths);

// Output
// [
//   ["A", "B", "C", "F", "G", "H"],
//   ["A", "B", "C", "F", "E", "H"],
//   ["A", "B", "C", "D", "E", "H"],
//   ["A", "B", "C", "D", "E", "F", "G", "H"],
//   ["A", "B", "D", "E", "H"],
//   ["A", "B", "D", "E", "F", "G", "H"],
//   ["A", "B", "D", "C", "F", "G", "H"],
//   ["A", "B", "D", "C", "F", "E", "H"],
//   ["A", "D", "E", "H"],
//   ["A", "D", "E", "F", "G", "H"],
//   ["A", "D", "C", "F", "G", "H"],
//   ["A", "D", "C", "F", "E", "H"],
//   ["A", "D", "B", "C", "F", "G", "H"],
//   ["A", "D", "B", "C", "F", "E", "H"],
//   ["A", "H"],
// ];
