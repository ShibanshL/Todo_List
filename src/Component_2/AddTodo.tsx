import React from "react";
import { db1 } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import { Grid, Group} from "@mantine/core";
import { Input,Button } from '@mantine/core';
import {MdAddCircleOutline} from 'react-icons/md'
import {useStore1} from '../Store'

interface props {
  vid:number
}

export default function AddTodo(vid:props) {
  const [title, setTitle] = React.useState("");
  const Znum = useStore1(state => state.num)
  const ZsetNums = useStore1(state => state.setNum)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db1, "todos"), {
        title,
        completed: false,
        Vid:vid
      });
      setTitle("");
    }
  };
  return (
    <Grid dir='row'>
    <Group direction="row"  align={'center'} position='center' grow>
        <form onSubmit={handleSubmit} style={{display:'flex',justifyContent:'space-between'}}>
            <Input
            type="text"
            placeholder="Enter todo..."
            value={title}
            variant="filled"
            radius='xl'
            size="md"
            onChange={(e:any) => setTitle(e.target.value)}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Button onClick={handleSubmit} radius={'xl'}>Add</Button> */}
            <Group ml='-0.5vw'> 
              <MdAddCircleOutline onClick={handleSubmit} cursor='pointer'/>
            </Group>
        </form>
    </Group>
    </Grid>
  );
}