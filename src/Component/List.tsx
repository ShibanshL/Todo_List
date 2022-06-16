import { Grid, Group, Text, Input } from '@mantine/core'
import React, { useEffect } from 'react'
import {GrClose} from 'react-icons/gr'
import {AiTwotoneEdit} from 'react-icons/ai'

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


}


function List({tasks,j, Data,  handleDeleteTask, handleSubmit, handleChange, handleEditTask}:props) {

  if(tasks.map(e => e.id_N)==null){
    return(
      <>
      <Group style={{display:'none'}}>Nothing yet</Group>
      </>
    )
  }

  else{

  return (
    <>
      <Grid>
        <Grid.Col span={12} style={{}}>
          {j?tasks.map(e =>{
            return(
                <Group className='ll' style={{margin:'10px', background:'white', padding:'10px', borderRadius:'25px', display:'flex', alignItems:'center', justifyContent:'space-between'}} key={e.id_N}>
                  <Text id={`id-${e.id_N}`}>{e.task_N}</Text>  
                  <Group> 
                    <GrClose onClick={() => handleDeleteTask(e.id_N)} style={{cursor:'pointer'}}/> <AiTwotoneEdit onClick={()=>handleEditTask(e.id_N)} style={{cursor:'pointer'}}/><br/>
                  </Group>
                </Group>
                )
              }
            ):
            <Group style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
              <form onSubmit={e => handleSubmit(e)}>
                <Input
                  placeholder ="Enter the Task"
                  radius="xl"
                  value={Data}
                  variant="filled"
                  size='md'
                  // style={{color:'rgba(0,0,0,1) !important'}}
                  onChange={(e: React.FormEvent<Element>) => handleChange(e)}
                  />
                </form>
            </Group>
          }
        
        </Grid.Col>
      </Grid>
    </>
  )
        }
}

export default List