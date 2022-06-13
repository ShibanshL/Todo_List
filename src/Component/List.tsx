import { Grid } from '@mantine/core'
import React, { useEffect } from 'react'

interface props{
  FData:string,
  // ID:number
}

interface test extends props{
 
}
interface RData{
  FData:string
}

var j:any[] = []
var i = 0
var a : string & number 
function List({FData}:props) {
  console.log(FData)

  // console.log('ID = '+ID)

  function ch(){
    // var num = 0
   j.push(FData)

  }
  useEffect(()=>{
  //  j.push(FData)
  //  j.push(ID)
  ch()
   console.log(j)
  },[FData])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{background:'cyan'}}>
        {/* {j.map(e =>{ return(<>{e}<br/></>)})} */}
        {j.map(e=> {return(<>{e}<br/></>)})}
      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List