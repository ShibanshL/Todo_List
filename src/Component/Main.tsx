import { Group, Grid } from '@mantine/core'
import React,{useState} from 'react'
import Input_Data from './Input_Data'
import List from './List'

function Main() {
  const [data, setData] = useState('')
  const [finaldata, setFinalData] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(data)
    {
        setFinalData(data)
        setData('')
    }
    else{
        console.log('no')
    }
}

  return (
    <Grid align={'center'} >
      <Grid.Col span={12}>
        <Input_Data Data={data} setData={setData} handleSubmit={handleSubmit}/>
      </Grid.Col>
      <Grid.Col span={12}>
        <List FData={finaldata}/>
      </Grid.Col>
    </Grid>
  )
}

export default Main