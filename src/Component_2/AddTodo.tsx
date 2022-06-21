import React from "react";
import { db1 } from "../FireBase";
import { collection, addDoc } from "firebase/firestore";
import { Grid, Group} from "@mantine/core";
import { Input,Button } from '@mantine/core';


export default function AddTodo() {
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db1, "todos"), {
        title,
        completed: false,
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
            onChange={(e:any) => setTitle(e.target.value)}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <Button radius={'xl'}>Add</Button>
        </form>
    </Group>
    </Grid>
  );
}