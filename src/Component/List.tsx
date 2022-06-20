import { Grid, Group, Text, Input } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import {GrClose} from 'react-icons/gr'
import {AiTwotoneEdit} from 'react-icons/ai'
import FireBase from '../FireBase'
import {ref,onValue} from 'firebase/database'

const db = FireBase()

interface props{
  tasks:[
    {
      task_N:string
      id_N:number
    }
  ]
  j:boolean
  Data:string
  handleDeleteTask:(e: Number) => void
  handleFinishTask:(e: Number) => void
  handleEditTask:(e: number) => void
  handleChange: (e: React.FormEvent) => void
  handleSubmit: (e: React.FormEvent) => void
  setMainData:React.Dispatch<React.SetStateAction<Number>>

}

interface Fbase {
  data:{
    Task_Id: number
    Task_Sub: string
  },
  key:string
}


function List({tasks,j, Data,setMainData,  handleDeleteTask, handleSubmit, handleChange, handleEditTask}:props) {

  const [fireBaseData, setFireBaseData] = useState<Fbase[]>([])

  useEffect(() => {
    const dbref = ref(db,'userTaskRecord')
    onValue(dbref,(snapshot) => {
      let record:any[] = []
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key
        let data = childSnapshot.val()
        record.push({"key":keyName, "data":data})
      })
      setFireBaseData(record)
      console.log(fireBaseData)
    })
  },[tasks])
  // if(tasks.map(e => e.task_N) == Data[])
  return (
    <>
      <Grid>
        <Grid.Col span={12} style={{}}>
          {
            fireBaseData.map(e =>{
              
              return(
                <Group className='ll' position='apart' m='10px' p='10px' style={{ background:'white', borderRadius:'25px'}} key={e.data.Task_Id}>
                  {j?
                    <Text id={`id-${e.data.Task_Id}`}>{e.data.Task_Sub}</Text>: 
                    <form onSubmit={e => handleSubmit(e)}>
                        <Input
                        placeholder ="Enter the Task"
                        radius="xl"
                        value={Data}
                        variant="filled"
                        size='md'
                        onChange={(e: React.FormEvent<Element>) => handleChange(e)}
                        // onSubmit={(e:React.FormEvent<Element>) => handleSubmit(e)}
                        />
                      </form>
                    }
                  <Group> 
                    <GrClose onClick={() => {
                        setMainData(e.data.Task_Id)
                        handleDeleteTask(e.data.Task_Id)}} style={{cursor:'pointer'}}/> 
                      <AiTwotoneEdit onClick={()=>{
                        setMainData(e.data.Task_Id)
                        handleEditTask(e.data.Task_Id)}} style={{cursor:'pointer'}}/><br/>
                  </Group>
                </Group>
              )
            })
          }

          
        
        </Grid.Col>
      </Grid>
    </>
  )
        
}

export default List