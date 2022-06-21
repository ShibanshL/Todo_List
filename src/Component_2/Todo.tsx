import React,{useState} from "react";
import {GrClose} from 'react-icons/gr'
import {AiTwotoneEdit} from 'react-icons/ai'
import { Grid, Group, Text } from "@mantine/core";
import {TiTick} from 'react-icons/ti'
import { Input } from '@mantine/core';

interface props {
    key:any
    todo:any,
    toggleComplete: (todo: any) => Promise<void>,
    handleDelete: (todo: any) => Promise<void>,
    handleEdit:(todo: any, title: string) => Promise<void>,
    i:boolean
}


export default function Todo({ todo, toggleComplete, handleDelete, i, handleEdit}:props) {
    const [newTitle, setNewTitle] = useState(todo.title);
  
    const handleChange = (e:any) => {
      e.preventDefault();
      if (todo.complete === true) {
        setNewTitle(todo.title);
      } else {
        todo.title = "";
        setNewTitle(e.target.value);
      }
    };
    return (
        <Grid>
            <Grid.Col className="todo" span={12}>
                <Group direction="column" p='5px'>
                    <Group direction="row">
                        <Input
                             variant="filled"
                             radius='xl'
                             type="text"
                             value={todo.title === "" ? newTitle : todo.title}
                             className="list"
                             onChange={handleChange}
                        />
                        <Group>
                        
                            {/* <TiTick id="i"  style={{cursor:'pointer'}} onClick={() => toggleComplete(todo)} /> */}
                            <AiTwotoneEdit id="i" style={{cursor:'pointer'}} onClick={() => handleEdit(todo, newTitle)} />
                            <GrClose id="i" style={{cursor:'pointer'}} onClick={() => handleDelete(todo.id)}/>
                        </Group>
                    </Group>
                </Group>
        </Grid.Col>
      </Grid>
    );
  }