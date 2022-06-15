import { Group, Grid, Container, Text } from '@mantine/core'
import React,{useState} from 'react'
import Edit_Input from './Edit_Input'
import Input_Data from './Input_Data'
import List from './List'

interface TaskInput{
  task_N:string | null
  id_N:number | null
}
  var i:number = 0
  var j:boolean = true
function Main() {
  const [data, setData] = useState('')
  const [tasks, setTasks] = useState<TaskInput[]>([{
    task_N:'Dummy task',
    id_N: 0
  }])
  const [id,setId] = useState(0)

  const handleChange = (e: React.FormEvent) => {
    setData((e.target as HTMLTextAreaElement).value)
  }

  const reset = () => {
     setData('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!data)
    {
      alert('please enter some data')
    }
    else if(data && !j){
      setTasks(
        tasks.map( e => {
          if(e.id_N == i){
            return{...e, task_N:data}
          }
         return e
        })
      )
      i = 0
      j=true
      reset()
    }
    else{
      setTasks([...tasks,{task_N:data, id_N:id+1}])
      setId(id+1)
      reset()
    }
}

const handleDeleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id_N !== id))
  }

  const handleFinishTask = (id:number) => {
    
  }

  const handleEditTask = (id:number) => {
    let findData = tasks.find( e => e.id_N == id)
    setData(findData?.task_N)
    i = id
    j=false
  }

  return (
    <Container size={'xl'} style={{padding:'10px'}}>
      <Grid align={'center'} >
        <Grid.Col span={12}>
          <Text size='xl' align='center' style={{color:'white'}}>Todo List</Text>
        </Grid.Col>
        <Grid.Col span={12}>
          <Input_Data Data={data} setData={setData} handleSubmit={handleSubmit} handleChange={handleChange}/>
        </Grid.Col>
        <Grid.Col span={12}>
          <List tasks={tasks} handleDeleteTask={handleDeleteTask} handleFinishTask={handleFinishTask}  handleEditTask={handleEditTask}/>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Main