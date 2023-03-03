import * as React from 'react';
import {
  getBezierPath,
  getMarkerEnd,
  getEdgeCenter
} from 'react-flow-renderer';

export default function CustomEdge({
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
        style={{ strokeWidth: 2 }}
      />
      {data.text && (
        <text style={{ fill: 'white' }} onClick={() => console.log('clicked')}>
          <textPath
            href={`#${id}`}
            style={{ fill: 'white', fontSize: 12 }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {new Array(data.text.length + 1).fill('█')}
          </textPath>
          <textPath
            href={`#${id}`}
            style={{ fill: data.fill, fontSize: 12 }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {data.text}
          </textPath>
        </text>
      )}
    </React.Fragment>
  );
}
