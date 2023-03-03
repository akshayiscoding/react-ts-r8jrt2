export const initialNodes = JSON.parse(localStorage.getItem('nodes')) || [
  {
    id: 'Coinbase',
    label: 'Coinbase',
    type: 0
  },
  {
    id: 'Coinbase Pro',
    label: 'Coinbase Pro',
    type: 0
  },
  {
    id: 'Ethereum',
    label: 'Ethereum',
    type: 1
  },
  {
    id: 'Compound',
    label: 'Compound',
    type: 2
  }
];

export const initialEdges = JSON.parse(localStorage.getItem('edges')) || [
  {
    source: 'Coinbase',
    target: 'Ethereum'
  }
];

let savingNodes = false;
let savingEdges = false;

export function saveNodes(nodes) {
  if (savingNodes) {
    return;
  }
  savingNodes = true;
  console.log('--- saving nodes', nodes);
  localStorage.setItem('nodes', JSON.stringify(nodes));
  setTimeout(() => (savingNodes = false), 100);
}

export function saveEdges(edges) {
  if (savingEdges) {
    return;
  }
  savingEdges = true;
  console.log('--- saving edges', edges);
  localStorage.setItem('edges', JSON.stringify(edges));
  setTimeout(() => (savingEdges = false), 100);
}
