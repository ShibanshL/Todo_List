import React, { useEffect } from 'react'

interface props{
  FData:string
}
interface RData{
  rdata:string
}

var List_Data:RData[] = []

function List(FData:props) {
  console.log(FData)
  useEffect(()=>{
    var i = 0
    List_Data.push(i)
    console.log(List_Data)
  },[FData])
  return (
    <div>List</div>
  )
}

export default List