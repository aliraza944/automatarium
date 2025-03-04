import { forwardRef } from 'react'
import { styled } from 'goober'

export const Svg = styled('svg', forwardRef)`

  background: var(--white);

  /* Grid */
  ${p => p.$showGrid && `
    --dot-fraction: 12.5%;
    background: radial-gradient(
      var(--grid-dot),
      var(--grid-dot) var(--dot-fraction),
      var(--white) var(--dot-fraction));
  `};

  /* Paths */
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 2px;

  /* Text */
  text {
    user-select: none;
  }
`
