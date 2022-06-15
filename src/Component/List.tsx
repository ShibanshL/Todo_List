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
  handleDeleteTask:(e: Number) => void
  handleFinishTask:(e: Number) => void
  handleEditTask:(e: number) => void
}


function List({tasks,handleFinishTask, handleDeleteTask, handleEditTask}:props) {

  useEffect(()=>{
 
  },[tasks.map(e => e.id_N)])

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
        {/* {tasks.map(e =>{return(<Input className='ll' style={{margin:'10px', background:'white', padding:'10px', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'space-between'}} key={e.id_N}><Text id={`id-${e.id_N}`}>{e.task_N}</Text>  <Group> <GrClose onClick={() => handleDeleteTask(e.id_N)} style={{cursor:'pointer'}}/> <AiTwotoneEdit onClick={()=>handleEditTask(e.id_N)} style={{cursor:'pointer'}}/><br/></Group></Input>)})} */}
        
        {tasks.map(e =>{return(<Group className='ll' style={{margin:'10px', background:'white', padding:'10px', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'space-between'}} key={e.id_N}><Text id={`id-${e.id_N}`}>{e.task_N}</Text>  <Group> <GrClose onClick={() => handleDeleteTask(e.id_N)} style={{cursor:'pointer'}}/> <AiTwotoneEdit onClick={()=>handleEditTask(e.id_N)} style={{cursor:'pointer'}}/><br/></Group></Group>)})}
      </Grid.Col>
    </Grid>
    </>
  )
        }
}

export default List