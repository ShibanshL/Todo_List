import { Group, Grid } from '@mantine/core'
import React,{useState} from 'react'
import Edit_Input from './Edit_Input'
import Input_Data from './Input_Data'
import List from './List'

interface TaskInput{
  task_N:string
  id_N:number
}

function Main() {
  const [data, setData] = useState('')
  const [finaldata, setFinalData] = useState('')
  const [tasks, setTasks] = useState<TaskInput[]>([{
    task_N:'',
    id_N:0
  }])
  const [id,setId] = useState(0)

  const handleChange = (e: React.FormEvent) => {
    setData((e.target as HTMLTextAreaElement).value)
    // console.log(data)
  }

  const reset = () => {
     setData('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(data)
    {
       setTasks([...tasks,{task_N:data, id_N:id+1}])
       setId(id+1)
      //  console.log(tasks)
       reset()
    }
    else{
        console.log('no')
    }
}

const handleDeleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id_N !== id))
  }

  const handleFinishTask = (id:number) => {
    
  }

  const handleEditTask = (id:number) => {
    return(
      <>
        <Edit_Input />
      </>
    )
  }

  return (
    <Grid align={'center'} >
      <Grid.Col span={12}>
        <Input_Data Data={data} setData={setData} handleSubmit={handleSubmit} handleChange={handleChange}/>
      </Grid.Col>
      <Grid.Col span={12}>
        <List tasks={tasks} handleDeleteTask={handleDeleteTask} handleFinishTask={handleFinishTask}  handleEditTask={handleEditTask}/>
        {/* <List FData={finaldata} ID={id} /> */}
      </Grid.Col>
    </Grid>
  )
}

export default Main