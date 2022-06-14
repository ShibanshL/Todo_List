import { Grid } from '@mantine/core'
import React, { useEffect } from 'react'

interface props{
  FData:string,
  ID:number
}

function List({FData}:props) {
  console.log(FData)

  useEffect(()=>{
 
  },[FData])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{background:'cyan'}}>
        {/* {j.map(e=> {return(<>{e} </>)})}{k.map(e => {return(<>{e}</>)})}<br/><br/> */}
      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List