import { Group, Grid, Container, Text } from '@mantine/core'
import React,{useState} from 'react'
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
      firbaseSub(data)
      reset()
    }
}

async function firbaseSub(e: string){
  var Task_Sub =e

  const res = await fetch('https://reactfirebasebackend-default-rtdb.firebaseio.com/userTaskRecord.json',
      {
          method:'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify({
             Task_Sub
          })
      })
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
    <Container size={'xl'} style={{padding:'10px '}}>
      <Grid align={'center'} >
        <Grid.Col span={12}>
          {j?<Text size='xl' align='center' style={{color:'white'}}>Todo List</Text>:<Text size='xl' align='center' style={{color:'white'}}>Edit List</Text>}
        </Grid.Col>
        <Grid.Col span={12}>
          <Input_Data Data={data} setData={setData} handleSubmit={handleSubmit} handleChange={handleChange} j={j}/>
        </Grid.Col>
        <Grid.Col span={12}>
          <List tasks={tasks} Data={data} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} j={j} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Main