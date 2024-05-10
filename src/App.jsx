import { useState } from "react";
import NewProject from "./Components/NewProject";
import ProjectSideBar from "./Components/ProjectsSideBar";
import NoProjectSelected from "./Components/NoProjectSelected";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTasks(text) {
    setProjectState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  const handleSelectProject = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  const handleStartAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  const handleCancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTasks}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  )

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSideBar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
      {/* <NewProject/> */}

    </main>
  );
}

export default App;
