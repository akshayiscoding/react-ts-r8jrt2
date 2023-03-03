/*
TODO:
- icon/logo for each box
- input for Edge label after connecting
- save/load connectors
*/
import * as React from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  ArrowHeadType,
  Edge,
  Background,
  useStoreState
} from 'react-flow-renderer';
import CustomEdge from './CustomEdge';
import {
  initialEdges,
  initialNodes,
  saveEdges,
  saveNodes
} from './src/utils/dataUtil';
import CustomNode from './CustomNode';

import { Modal } from './base';

const nodeTypes = {
  customNode: CustomNode
};

const BaseStyle = { fontSize: 12, width: 200 };
const BaseNode = {
  sourcePosition: 'right',
  targetPosition: 'left',
  style: BaseStyle
};
const WalletNode = {
  ...BaseNode,
  style: { ...BaseStyle, color: 'darkorange' }
};
const ServiceNode = {
  ...BaseNode,
  style: { ...BaseStyle, color: 'darkgreen' }
};
const xMap = [20, 420, 820];
const yGap = 50;

const foreignObjectSize = 40;

const getElements = (
  nodesArr,
  edgesArr,
  { elements, onNodeLabelChanged, save } = {
    elements: undefined,
    onNodeLabelChanged: undefined,
    save: false
  }
) => {
  const eles = [];
  for (let col = 0; col <= 2; col = col + 1) {
    let count = 0;
    nodesArr
      .filter(item => item.type === col)
      .forEach((node, idx) => {
        let base = { ...BaseNode };
        if (node.type === 1) {
          base = { ...WalletNode };
        } else if (node.type === 2) {
          base = { ...ServiceNode };
        }
        eles.push({
          ...base,
          id: node.id,
          type: 'customNode',
          data: {
            labelText: node.label,
            label: (
              <span
                key={node.id}
                contentEditable={true}
                suppressContentEditableWarning={true}
                data-label={node.label}
                onBlur={ev => {
                  if (onNodeLabelChanged) {
                    if (node.label !== ev.target.innerText) {
                      onNodeLabelChanged(node.id, ev.target.innerText);
                    }
                  }
                }}
              >
                {node.label}
              </span>
            )
          },
          position: node.position || { x: xMap[node.type], y: 20 + yGap * idx }
          // position: { x: xMap[node.type], y: 20 + yGap * idx }
        });
        // console.log('eles', eles);
        count++;
      });
    eles.push({
      ...BaseNode,
      id: '+' + col,
      data: { label: '+' },
      position: { x: xMap[col], y: 20 + yGap * count }
    });
  }
  edgesArr.forEach((edge, idx) => {
    eles.push({
      id: 'id_' + idx,
      ...edge,
      type: 'custom',
      data: { text: edge.text || '', fill: 'darkblue' }
    });
  });

  // prepare for saving:
  // console.log('elements', elements);
  (elements || []).forEach(ele => {
    const node = nodesArr.find(n => n.id === ele.id);
    if (node && ele.__rf) {
      node.position = ele.__rf.position;
    }
  });
  // console.log('nodesArr', nodesArr);
  if (save) {
    saveNodes(nodesArr);
    saveEdges(edgesArr);
  }

  return eles;
};

const Main = () => {
  const onNodeLabelChanged = (id, newLabel) => {
    console.log('id', id, newLabel);
    const newNodes = [...nodes];
    const lastNode = newNodes.find(item => item.id === id);
    lastNode.label = newLabel;
    const eles = getElements(newNodes, edges, {
      elements,
      onNodeLabelChanged,
      save: true
    });
    setElements(eles);
    setNodes(newNodes);
  };
  const initialElements = getElements(initialNodes, initialEdges, {
    elements: [],
    onNodeLabelChanged,
    save: false
  });

  const [modalShowed, setModalShowed] = React.useState(false);

  const edgeTypes = {
    custom: CustomEdge
  };

  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const [elements, setElements] = React.useState(initialElements);
  const [liveElements, setLiveElements] = React.useState([]);
  const [lastId, setLastId] = React.useState('');
  const [labelInput, setLabelInput] = React.useState('');

  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) => {
    console.log('newConnection', newConnection);
    return setElements(els => updateEdge(oldEdge, newConnection, els));
  };

  const onConnect = params => {
    if (params.source === params.target) {
      return;
    }
    setModalShowed(true);

    console.log('params', params);
    const newEdges = [...edges];
    const id = `id_${+new Date()}`;
    setLastId(id);
    newEdges.push({
      source: params.source,
      target: params.target,
      id
    });
    // return setElements(els =>
    //   addEdge(
    //     {
    //       ...params,
    //       arrowHeadType: ArrowHeadType.ArrowClosed,
    //       label: 'ETH',
    //       labelStyle: { fill: 'blue', fontWeight: 700 },
    //       type: 'custom',
    //       data: { text: 'ETH', fill: 'blue' }
    //     },
    //     els
    //   )
    // );
    const eles = getElements(nodes, newEdges, {
      elements: liveElements,
      onNodeLabelChanged,
      save: true
    });
    setElements(eles);
    setEdges(newEdges);
  };
  const removeNode = nodeToRemove => {
    console.log('removeNode called', nodeToRemove);
    setElements(removeElements([nodeToRemove], elements));
  };
  const onEdgeDoubleClick = (ev, edge: Edge) => {
    console.log('edge', edges);
    let newEdges = [...edges];
    newEdges = newEdges.filter(
      e => e.source !== edge.source || e.target !== edge.target
    );
    console.log('newEdges', newEdges);
    // setElements(removeElements([edge], elements));
    const eles = getElements(nodes, newEdges, {
      elements: liveElements,
      onNodeLabelChanged,
      save: true
    });
    setElements(removeElements([edge], eles));
    setEdges(newEdges);
  };
  const onElementClick = (ev, node) => {
    // console.log('node', node);
    const newNodes = [...nodes];
    if (node.id === '+0') {
      newNodes.push({
        id: '' + +new Date(),
        label: 'New',
        type: 0
      });
    }
    if (node.id === '+1') {
      newNodes.push({
        id: '' + +new Date(),
        label: 'New',
        type: 1
      });
    }
    if (node.id === '+2') {
      newNodes.push({
        id: '' + +new Date(),
        label: 'New',
        type: 2
      });
    }
    const eles = getElements(newNodes, edges, {
      elements: liveElements,
      onNodeLabelChanged,
      save: false
    });
    setElements(eles);
    setNodes(newNodes);
  };
  const onNodeDoubleClick = (_: MouseEvent, node: Node) => {
    const newNodes = [...nodes.filter(n => n.id !== node.id)];
    // removeNode(node);
    const eles = getElements(newNodes, edges, {
      elements: liveElements,
      onNodeLabelChanged,
      save: true
    });
    setElements(eles);
    setNodes(newNodes);
  };
  // React.useEffect(() => {
  // removeNode(elements[0]);
  // }, []);

  const NodesDebugger = () => {
    const nodes = useStoreState(state => state.nodes);
    setLiveElements(nodes); // [ node has live node.__rf.position ]
    return null;
  };

  return (
    <div>
      {modalShowed && (
        <Modal
          title="Add Connection"
          content={
            <p>
              <h3>Label: (optional)</h3>
              <input onChange={ev => setLabelInput(ev.target.value)} />
            </p>
          }
          confirmLabel="Confirm"
          onCancel={() => setModalShowed(false)}
          onConfirm={() => {
            setModalShowed(false);

            const newEdges = [...edges];
            const lastEdge = newEdges.find(item => item.id === lastId);
            lastEdge.text = labelInput;
            console.log('newEdges', newEdges);
            const eles = getElements(nodes, newEdges, {
              elements: liveElements,
              onNodeLabelChanged,
              save: true
            });
            setElements(eles);
            setEdges(newEdges);
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 900,
          marginTop: 20,
          marginLeft: 80,
          marginRight: 80,
          fontSize: 18,
          fontWeight: 600
        }}
      >
        <span>Exchanges</span>
        <span>Wallets</span>
        <span>Services</span>
      </div>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={true}
        zoomOnDoubleClick={false}
        zoomOnScroll={false}
        elements={elements}
        onElementClick={onElementClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onConnect={onConnect}
        snapToGrid={true}
        snapGrid={[10, 10]}
        edgeTypes={edgeTypes}
        connectionMode="loose"
        deleteKeyCode="Backspace"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Background />
        <NodesDebugger />
      </ReactFlow>
    </div>
  );
};
export default Main;
