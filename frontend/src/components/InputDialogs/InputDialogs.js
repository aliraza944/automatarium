import { useEffect, useCallback, useState, useRef } from 'react'

import { Dropdown, TextInput } from '/src/components'

import { useProjectStore, useViewStore } from '/src/stores'
import { locateTransition } from '/src/util/states'
import { lerpPoints } from '/src/util/points'

const InputDialogs = () => {
  const [dialog, setDialog] = useState({ visible: false })
  const inputRef = useRef()

  const [editTransitionValue, setEditTransitionValue] = useState('')
  const editTransition = useProjectStore(s => s.editTransition)
  const removeTransitions = useProjectStore(s => s.removeTransitions)
  const commit = useProjectStore(s => s.commit)
  const viewToScreenSpace = useViewStore(s => s.viewToScreenSpace)

  const onEditTransition = useCallback(({ detail: { id } }) => {
    const { states, transitions } = useProjectStore.getState()?.project ?? {}
    const transition = transitions.find(t => t.id === id)
    setEditTransitionValue(transition?.read ?? '')

    // Find midpoint of transition in screen space
    const pos = locateTransition(transition, states)
    const midPoint = lerpPoints(pos.from, pos.to, .5)
    const screenMidPoint = viewToScreenSpace(midPoint.x, midPoint.y, document.querySelector('svg'))

    setDialog({
      visible: true,
      x: screenMidPoint[0],
      y: screenMidPoint[1],
      id,
      previousValue: transition?.read,
    })
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [inputRef.current])

  useEffect(() => {
    document.addEventListener('editTransition', onEditTransition)
    return () => document.removeEventListener('editTransition', onEditTransition)
  }, [])

  return (
    <Dropdown
      visible={dialog.visible}
      onClose={() => {
        setDialog({ ...dialog, visible: false })
        // Delete transitions if not new
        if (dialog.previousValue === undefined) {
          removeTransitions([dialog.id])
        }
      }}
      style={{
        top: `${dialog.y}px`,
        left: `${dialog.x}px`,
      }}
    >
      <TextInput
        ref={inputRef}
        value={editTransitionValue}
        onChange={e => setEditTransitionValue(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            // Edit transition
            editTransition(dialog.id, editTransitionValue)
            commit()
            setDialog({ ...dialog, visible: false })
          }
        }}
        style={{ width: '5em', textAlign: 'center', margin: '0 .4em' }}
      />
    </Dropdown>
  )
}

export default InputDialogs
