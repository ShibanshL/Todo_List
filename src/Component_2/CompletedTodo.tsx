import React,{useState} from "react";
import {GrClose} from 'react-icons/gr'
import {AiTwotoneEdit} from 'react-icons/ai'
// import {IoAddCircle} from 'react-icons/io5'
// import {IoIosAddCircleOutline} from 'react-icons/io'
import {MdAddCircleOutline} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { Grid, Group, Text,  Checkbox  } from "@mantine/core";
// import {TiTick} from 'react-icons/ti'
import { Input } from '@mantine/core';

interface props {
    key:any
    todo:any,
    todoData:any[],
    toggleComplete: (todo: any) => Promise<void>,
    handleDelete: (todo: any) => Promise<void>,
    handleEdit:(todo: any, title: string) => Promise<void>,
    newToggleComplete:() => void
    completed:number
    complete:boolean
}

// var i:boolean = true
var k:number = 0

function CompletedTodo({ todo, toggleComplete, handleDelete, newToggleComplete,complete,  completed, handleEdit}:props) {
    let nav = useNavigate()
    const [newTitle, setNewTitle] = useState(todo.title);
    const [num,setNum] = useState<number>(0)
    const handleChange = (e:any) => {
      e.preventDefault();
      if (todo.complete === true) {
        setNewTitle(todo.title);
      } else {
        todo.title = "";
        setNewTitle(e.target.value);
      }
    };

    const Input_Tag = () => {
      k++
      setNum(k)
    }
    
   return (
    <>
        <Grid style={{background:'lightblue', borderRadius:'10px'}} grow>
            <Grid.Col className="todo" span={12}>
            {todo.completed?
                <Group direction="column" p='10px' align='apart' m='10px' style={{background:'rgba(255,255,255,0.5)',borderRadius:'60px', justifyContent:'space-between'}} grow>
                    <Group direction="row" p='5px'  style={{}} grow>
                        <Group direction="row" style={{}} position='left'>
                          <Checkbox checked={true} onChange={() => {toggleComplete(todo)}}/>{num%2==0?<Text weight={600} color={'red'} style={{textDecoration:'line-through'}} size="md">{todo.title}</Text>:<Input
                              variant="filled"
                              radius='xl'
                              type="text"
                              value={todo.title === "" ? newTitle : todo.title}
                              className="list"
                              onChange={handleChange}
                          />}
                        </Group>
                        <Group style={{}} position="right" direction="row">
                            {num%2==0?<AiTwotoneEdit id="i" style={{cursor:'pointer'}} onClick={() =>{ 
                              handleEdit(todo, newTitle) 
                              Input_Tag()
                              }}/>:<MdAddCircleOutline id="i" style={{cursor:'pointer'}} onClick={() =>{ 
                                handleEdit(todo, newTitle) 
                                Input_Tag()
                                }}/>}
                            <GrClose id="i" style={{cursor:'pointer'}} onClick={() => handleDelete(todo.id)}/>
                        </Group>
                    </Group>
                </Group>
              :  
              <Group direction="column" p='10px' align='apart' m='10px' style={{display:'none',background:'rgba(255,255,255,0.5)',borderRadius:'60px', justifyContent:'space-between'}} grow>
                    <Group direction="row" p='5px'  style={{}} grow>
                        <Group direction="row" style={{}} position='left'>
                          <Checkbox onChange={() => {toggleComplete(todo)}}/>{num%2==0?<Text weight={600} color={'green'} style={{}} size="md">{todo.title}</Text>:<Input
                              variant="filled"
                              radius='xl'
                              type="text"
                              value={todo.title === "" ? newTitle : todo.title}
                              className="list"
                              onChange={handleChange}
                          />}
                        </Group>
                        <Group style={{}} position="right" direction="row">
                            {num%2==0?<AiTwotoneEdit id="i" style={{cursor:'pointer'}} onClick={() =>{ 
                              handleEdit(todo, newTitle) 
                              Input_Tag()
                              }}/>:<MdAddCircleOutline id="i" style={{cursor:'pointer'}} onClick={() =>{ 
                                handleEdit(todo, newTitle) 
                                Input_Tag()
                                }}/>}
                            <GrClose id="i" style={{cursor:'pointer'}} onClick={() => handleDelete(todo.id)}/>
                        </Group>
                    </Group>
                </Group>
              }
        </Grid.Col>
      </Grid>
      </>
    );
}

export default CompletedTodo