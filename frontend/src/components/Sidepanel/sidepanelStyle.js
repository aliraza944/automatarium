import { styled } from 'goober'

export const Wrapper = styled('div')`
  display: flex;
  position: relative;
`

export const Panel = styled('div')`
  width: 350px;
  height: 100%;
  overflow-y: auto;
  background: var(--surface);
  position: absolute;
  right: 100%;
  z-index: 10;
`

export const Heading = styled('h2')`
  font-size: 1.2em;
  font-weight: 600;
  margin: .8em 1em .8em 2em;
`

export const CloseButton = styled('button')`
  position: absolute;
  top: .6em;
  z-index: 15;
  left: calc(-350px - 1em);
  height: 2em;
  width: 2em;
  font: inherit;
  color: inherit;
  background: var(--toolbar);
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border-radius: .3em;
  cursor: pointer;
`
