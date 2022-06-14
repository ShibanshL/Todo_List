import { Grid } from '@mantine/core'
import React, { useEffect } from 'react'

interface props{
  tasks:[
    {
      task_N:string
      id_N:number
    }
  ]
}

function List({tasks}:props) {
  // console.log(FData)

  useEffect(()=>{
 
  },[tasks.map(e => e.id_N)])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{background:'cyan'}}>
        {/* {j.map(e=> {return(<>{e} </>)})}{k.map(e => {return(<>{e}</>)})}<br/><br/> */}
        {tasks.map(e => e.task_N)}
      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List