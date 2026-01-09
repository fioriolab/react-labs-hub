import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import logoImg from '../public/tasklist.png'
import './App.css'

interface infoProps {
  enabled: boolean,
  item: string
}

function App() {
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState<string[]>([])
  const [edit, setEdit] = useState<infoProps>({
    enabled: false,
    item: ''
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    const listTask = localStorage.getItem("@guilhermedev")

    if(listTask) {
      setTaskList(JSON.parse(listTask))
    }
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    localStorage.setItem("@guilhermedev", JSON.stringify(taskList))
  },[taskList])

  function handleRegister(event: FormEvent) {
    event.preventDefault()

    if(!task) {
      alert('Digite uma Tarefa')
      return
    }

    if(edit.enabled) {
      handleSubmitEdit()
      return
    }

    setTaskList(tasks => [...tasks, task])
    setTask("")
  }

  function handleDelete(item: string) {
    const newArray = taskList.filter(task => task !== item)
    setTaskList(newArray)
  }

  function handleEdit(item: string) {
    inputRef.current?.focus()
    setTask(item)
    setEdit({
      enabled: true,
      item: item
    })
  }

  function handleSubmitEdit() {
    const findIndexItem = taskList.findIndex(task => task === edit.item)
    const allTasks = [...taskList]
    allTasks[findIndexItem] = task
    setTaskList(allTasks)

    setTask("")
    setEdit({
      enabled: false,
      item: ''
    })
  }

  return (
    <>
      <main>

          <img src={logoImg} />
          <h1>Lista de Tarefas</h1>

          <hr />

          <input type="text" placeholder='Digite uma Tarefa'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          ref={inputRef}/>

          <button onClick={handleRegister}>
            {edit.enabled ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          </button>

          <ul>
            {taskList.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <button className="botao-editar" onClick={() => handleEdit(item)}>Editar</button>
                <button className="botao-deletar" onClick={() => handleDelete(item)}>Excluir</button>
              </li>
            ))}
          </ul>

      </main>
    </>
  )
}

export default App
