import { Grid, Group } from '@mantine/core'
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
}

interface taskGot {
  task_N:string
  id_N:number
}

function List({tasks}:props) {
  // console.log(FData)
  console.log('Inside List',tasks)
  useEffect(()=>{
 
  },[tasks.map(e => e.id_N)])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{background:'cyan'}}>
        {/* {j.map(e=> {return(<>{e} </>)})}{k.map(e => {return(<>{e}</>)})}<br/><br/> */}
        {/* {tasks.map(e =>{return(<Group className='ll' key={e.id_N}>{e.task_N} <button onClick={() => console.log('Working')}>P</button><br/></Group>)})}
         */}
        {tasks.map(e =>{return(<Group className='ll' key={e.id_N}>{e.task_N}  <TiTick /> <GrClose/> <AiTwotoneEdit /><br/></Group>)})}

      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List