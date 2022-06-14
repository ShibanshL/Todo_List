import { Grid, Group, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { FaBeer } from 'react-icons/fa';
import {TiTick} from "react-icons/ti";
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
  handleEditTask:(e: Number) => void
}

interface taskGot {
  task_N:string
  id_N:number
}

function List({tasks,handleFinishTask, handleDeleteTask, handleEditTask}:props) {
  // console.log(FData)
  console.log('Inside List',tasks)
  useEffect(()=>{
 
  },[tasks.map(e => e.id_N)])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{}}>
        {/* {j.map(e=> {return(<>{e} </>)})}{k.map(e => {return(<>{e}</>)})}<br/><br/> */}
        {/* {tasks.map(e =>{return(<Group className='ll' key={e.id_N}>{e.task_N} <button onClick={() => console.log('Working')}>P</button><br/></Group>)})}
         */}
        {tasks.map(e =>{return(<Group className='ll' style={{margin:'10px', background:'white', padding:'10px', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'space-between'}} key={e.id_N}><Text id={`id-${e.id_N}`}>{e.task_N}</Text>  <Group><TiTick onClick={() => handleFinishTask(e.id_N)}/> <GrClose onClick={() => handleDeleteTask(e.id_N)}/> <AiTwotoneEdit onClick={()=>handleEditTask} /><br/></Group></Group>)})}

      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List