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


function Main_1() {
    const [todoData, setTodoData]:any[] = useState([]);

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

      const handleEdit = async (todo:any, title:string) => {
        await updateDoc(doc(db1, "todos", todo.id), { title: title });
      };
      const toggleComplete = async (todo:any) => {
        await updateDoc(doc(db1, "todos", todo.id), { completed: !todo.completed });
      };
      const handleDelete = async (id:any) => {
        await deleteDoc(doc(db1, "todos", id));
      };
      return (
        <Group align={'center'} direction='column' position='center' spacing={'xs'} style={{/*width:'30vw', height:'40vh'*/backdropFilter:'blur(10px)'}} grow>
            <Text size='xl'>Todo List</Text>
          <Group direction='row' position='center' spacing='xs' p='10px' grow>
            <AddTodo/>
          </Group>
          <Grid>
            <Grid.Col span={12}>
                {todoData.map((todo:any) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
                ))}
            </Grid.Col>
          </Grid>
        </Group>
      );
}

export default Main_1