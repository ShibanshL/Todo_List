import { Grid, Group } from '@mantine/core'
import React, { useEffect } from 'react'

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
        {tasks.map(e =>{return(<Group className='ll' key={e.id_N}>{e.task_N} <button onClick={() => console.log('Working')}>P</button><br/></Group>)})}
      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List