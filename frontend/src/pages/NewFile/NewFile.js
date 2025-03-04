import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { Main, Button, Header } from '/src/components'
import { NewProjectCard, ProjectCard, CardList } from './components'
import { useUserProjects } from './hooks'

import { NoResultSpan } from './newFileStyle'

const NewFile = () => {
  const navigate = useNavigate()
  const projects = useUserProjects()

  const handleNewFile = projectType => {
    // TODO: Handle different project types
    navigate('/editor')
  }

  return <Main wide>
    <Header />
    <section>
      <CardList title="New File" scroll>
        <NewProjectCard
          title={'Finite State Automaton'}
          description={'Create a deterministic or non-deterministic automaton with finite states. Capable of representing regular grammars.'}
          onClick={() => handleNewFile('FSA')} />
        <NewProjectCard
          disabled
          title={'Push Down Automaton'}
          description={'Create an automaton with a push-down stack capable of representing context-free grammars.'} />
        <NewProjectCard
          disabled
          title={'Turing Machine'}
          description={'Create a turing machine capable of representing recursively enumerable grammars.'} />
      </CardList>
    </section>
    <section>
      <CardList title="Recent" button={<Button>Open...</Button>}>
        {projects.map(p =>
          <ProjectCard
            key={p._id}
            name={p?.meta?.name ?? '<Untitled>'}
            type={p?.config?.type ?? '???'}
            date={dayjs(p?.meta?.dateEdited)} />
        )}
        {projects.length === 0 && <NoResultSpan>No projects yet :)</NoResultSpan>}
      </CardList>
    </section>
  </Main>
}

export default NewFile
