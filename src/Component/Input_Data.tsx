import React from 'react'
import { Group, Input } from '@mantine/core';

interface props  {
    Data:string
    j:boolean
    setData:React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
    handleChange: (e: React.FormEvent) => void
}
function Input_Data({Data, j, setData, handleChange ,handleSubmit}:props) {
  return (
    <>
    {j?
      <Group style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
        <form onSubmit={e => handleSubmit(e)}>
          <Input
            placeholder ="Enter the Task"
            radius="xl"
            value={Data}
            variant="filled"
            size='md'
            // style={{color:'rgba(0,0,0,1) !important'}}
            onChange={(e: React.FormEvent<Element>) => handleChange(e)}
          />
        </form>
      </Group>:
      <Group style={{display:'flex',alignItems:'center', justifyContent:'center', opacity:0, transition:'0.3s ease'}}>
      <form onSubmit={e => handleSubmit(e)}>
        <Input
          placeholder ="Enter the Task"
          radius="xl"
          value={Data}
          variant="filled"
          size='md'
          // style={{color:'rgba(0,0,0,1) !important'}}
          onChange={(e: React.FormEvent<Element>) => handleChange(e)}
        />
      </form>
    </Group> 
    }
    </>
  )
}

export default Input_Data