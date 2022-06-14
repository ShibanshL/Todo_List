import { Grid } from '@mantine/core'
import React, { useEffect } from 'react'

interface props{
  FData:string,
  ID:number
}

interface test extends props{
 
}
interface RData{
  FData:string
}

var j:string[] = []
var k:number[] = []
var i = 0
var a : string & number 
function List({FData}:props) {
  console.log(FData)

  // console.log('ID = '+ID)

  function ch(){
   j.push(FData)
   i++
   k.push(i)
  }
  useEffect(()=>{
  //  j.push(FData)

  ch()
   console.log(j)
   console.log(k)

  },[FData])
  return (
    <>
    <Grid>
      <Grid.Col span={12} style={{background:'cyan'}}>
        {/* {j.map(e =>{ return(<>{e}<br/></>)})} */}
        {j.map(e=> {return(<>{e} </>)})}{k.map(e => {return(<>{e}<br/></>)})}<br/>
      </Grid.Col>
    </Grid>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List