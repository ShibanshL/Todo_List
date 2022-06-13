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
    {j.map(e => e)}<br/>
    {/* {j.map(ev =>)} */}
    </>
  )
}

export default List