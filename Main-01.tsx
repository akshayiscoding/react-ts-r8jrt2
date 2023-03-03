// 07/31/2021
import * as React from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  ArrowHeadType,
  Edge,
  Background
} from 'react-flow-renderer';
import {
  getBezierPath,
  getMarkerEnd,
  getEdgeCenter
} from 'react-flow-renderer';
import CustomEdge from './CustomEdge';

const BaseStyle = { fontSize: 14 };
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
const xMap = [0, 300, 600];
const yGap = 50;

const foreignObjectSize = 40;

const initialNodes = [
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
const getElements = nodesArr => {
  const eles = [];
  for (let col = 0; col <= 2; col = col + 1) {
    let count = 0;
    nodesArr
      .filter(item => item.type === col)
      .forEach((node, idx) => {
        eles.push({
          ...BaseNode,
          id: node.id,
          data: { label: node.label },
          position: { x: xMap[node.type], y: yGap * idx }
        });
        console.log('eles', eles);
        count++;
      });
    eles.push({
      ...BaseNode,
      id: '+' + col,
      data: { label: '+' },
      position: { x: xMap[col], y: yGap * count }
    });
  }

  return eles;
};
const initialElements = getElements(initialNodes);

const Main = () => {
  function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    arrowHeadType,
    markerEndId
  }) {
    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY
    });

    return (
      <React.Fragment>
        <path
          id={id}
          style={style}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
        />
        <text onClick={() => alert(1)}>
          <textPath
            href={`#${id}`}
            style={{ fill: data.fill, fontSize: 12 }}
            startOffset="70%"
            textAnchor="middle"
          >
            {data.text}
          </textPath>
        </text>
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={edgeCenterX - foreignObjectSize / 2}
          y={edgeCenterY - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <body>
            <button className="edgebutton" onClick={event => console.log('X')}>
              ×
            </button>
          </body>
        </foreignObject>
      </React.Fragment>
    );
  }
  const edgeTypes = {
    custom: CustomEdge
  };

  // const initialElements = [
  //   {
  //     ...WalletNode,
  //     id: '2a',
  //     data: { label: 'Ethereum' },
  //     position: { x: xMap[1], y: yGap * 0 }
  //   },
  //   {
  //     ...WalletNode,
  //     id: '2b',
  //     data: { label: 'Binance BSC' },
  //     position: { x: xMap[1], y: yGap * 1 }
  //   },
  //   {
  //     ...ServiceNode,
  //     id: '3a',
  //     data: {
  //       label: <div onClick={() => removeNode({ id: '1a' })}>Compound</div>
  //     },
  //     position: { x: xMap[2], y: yGap * 0 }
  //   },
  //   { ...BaseNode, id: 'e1-2', source: '1', target: '2', animated: true },
  //   {
  //     id: '1a2a',
  //     source: '1a',
  //     target: '2a',
  //     label: 'ETH',
  //     // type: 'custom',
  //     data: { text: 'ETH', fill: 'blue' },
  //     // arrowHeadType: ArrowHeadType.ArrowClosed,
  //     labelStyle: { fill: 'blue', fontWeight: 700 }
  //   }
  // ];

  const [nodes, setNodes] = React.useState(initialNodes);
  const [elements, setElements] = React.useState(initialElements);
  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements(els => updateEdge(oldEdge, newConnection, els));
  const onConnect = params =>
    setElements(els =>
      addEdge(
        {
          ...params,
          arrowHeadType: ArrowHeadType.ArrowClosed,
          // data: { text: 'ETH', fill: 'blue' },
          label: 'ETH',
          labelStyle: { fill: 'blue', fontWeight: 700 }
        },
        els
      )
    );
  const removeNode = nodeToRemove => {
    console.log('removeNode called', nodeToRemove);
    setElements(removeElements([nodeToRemove], elements));
  };
  const onEdgeDoubleClick = (ev, edge: Edge) => {
    setElements(removeElements([edge], elements));
  };
  const onElementClick = (ev, node) => {
    // console.log('node', node);
    const newNodes = [...nodes];
    if (node.id === '+0') {
      newNodes.push({
        id: '' + newNodes.length,
        label: <span contentEditable={true}>New</span>,
        type: 0
      });
    }
    if (node.id === '+1') {
      newNodes.push({
        id: '' + newNodes.length,
        label: <span contentEditable={true}>New</span>,
        type: 1
      });
    }
    if (node.id === '+2') {
      newNodes.push({
        id: '' + newNodes.length,
        label: <span contentEditable={true}>New</span>,
        type: 2
      });
    }
    const eles = getElements(newNodes);
    setElements(eles);
    setNodes(newNodes);
  };
  const onNodeDoubleClick = (_: MouseEvent, node: Node) => {
    const newNodes = [...nodes.filter(n => n.id !== node.id)];
    // removeNode(node);
    const eles = getElements(newNodes);
    setElements(eles);
    setNodes(newNodes);
  };
  // React.useEffect(() => {
  // removeNode(elements[0]);
  // }, []);

  return (
    <div>
      <ReactFlow
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
        snapGrid={[15, 15]}
        edgeTypes={edgeTypes}
        connectionMode="loose"
        deleteKeyCode="Backspace"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};
export default Main;
