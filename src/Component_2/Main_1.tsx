import React,{useState, useEffect} from 'react'
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
import { db1 } from '../FireBase';
import AddTodo from './AddTodo';
import Todo from './Todo';
import { Grid, Group, Text } from '@mantine/core';
import {useNavigate} from 'react-router-dom'

interface Log {
  loggedIn:boolean
}


function Main_1({loggedIn}:Log) {
    console.log(loggedIn)
    const [todoData, setTodoData]:any[] = useState([]);
    let nav = useNavigate()
    useEffect(() => {
        const q = query(collection(db1, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let todosArray:any[] = [];
          querySnapshot.forEach((doc) => {
            todosArray.push({ ...doc.data(), id: doc.id });
          });
          setTodoData(todosArray);
        });
        return () => unsub();
      }, []);

      useEffect(()=>{
        if(!loggedIn){
          return nav('/')
        }
      },[loggedIn])

      const handleEdit = async (todo:any, title:string) => {
        await updateDoc(doc(db1, "todos", todo.id), { title: title });
      };
      const toggleComplete = async (todo:any) => {
        await updateDoc(doc(db1, "todos", todo.id), { completed: !todo.completed });
      };
      const handleDelete = async (id:any) => {
        await deleteDoc(doc(db1, "todos", id));
      };

      // if(!loggedIn){
      //   return nav('/')
      // }
      // else {

      // }
      return (
        <Group align={'center'} direction='column' position='center' spacing={'xs'} style={{}} grow>
            <Text size='xl' weight={700}>Todo List</Text>
          <Group direction='row' position='center' spacing='xs' p='10px' grow>
            <AddTodo/>
          </Group>
          <Grid style={{}}>
            <Grid.Col span={12}>
                {todoData.map((todo:any) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    todoData={todoData}
                />
                ))}
            </Grid.Col>
          </Grid>
        </Group>
      );
}

export default Main_1