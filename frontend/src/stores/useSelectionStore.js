import create from 'zustand'

import { useProjectStore } from '/src/stores'

const useSelectionStore = create(set => ({
  selectedStates: [],
  selectedTransitions: [],
  setStates: selectedStates => set({ selectedStates }),
  addState: state => set(s => ({ selectedStates: [...s.selectedStates, state]})),
  setTransitions: selectedTransitions => set({ selectedTransitions }),
  addTransition: transition => set(s => ({ selectedTransitions: [...s.selectedTransitions, transition]})),
  selectNone: () => set({ selectedStates: [], selectedTransitions: [] }),
  selectAll: () => set({
    selectedStates: useProjectStore
      .getState()
      .project
      ?.states
      ?.map(s => s.id) ?? [],
    selectedTransitions: useProjectStore
      .getState()
      .project
      ?.transitions
      ?.map(t => t.id) ?? []
  })
}))

export default useSelectionStore
