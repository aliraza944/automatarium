import { STATE_CIRCLE_RADIUS, STATE_TRIANGLE_WIDTH, STATE_TRIANGLE_HEIGHT } from '/src/config/rendering'

import { StyledPolygon } from './initialStateArrowStyle'

const InitialStateArrow = ({ states, initialStateID }) => {
  const initialState = states.find(s => s.id === initialStateID)
  if (!initialState) 
    return null

  const { x, y } = initialState
  const triangleStart = `${x-STATE_CIRCLE_RADIUS}, ${y}`
  const triangleTopLeft = `${x-STATE_TRIANGLE_WIDTH-STATE_CIRCLE_RADIUS}, ${y-STATE_TRIANGLE_HEIGHT}`
  const triangleBottomLeft = `${x-STATE_TRIANGLE_WIDTH-STATE_CIRCLE_RADIUS}, ${y+STATE_TRIANGLE_HEIGHT}`
  return <g>
    <StyledPolygon points={`${triangleStart} ${triangleTopLeft} ${triangleBottomLeft}`} />
  </g>
}

export default InitialStateArrow

