import * as React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

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

  return (
    <React.Fragment>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fill: data.fill, fontSize: 12 }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data.text}
        </textPath>
      </text>
      {/* <text>
        <textPath
          href={`#${id}`}
          style={{ fill: data.fill, fontSize: 12 }}
          startOffset="5%"
          textAnchor="middle"
          onClick={onClick}
        >
          X
        </textPath>
      </text> */}
    </React.Fragment>
  );
}
