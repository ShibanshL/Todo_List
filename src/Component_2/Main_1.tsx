import React,{useState, useEffect, useContext} from 'react'
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
import { Grid, Group, Text, Button } from '@mantine/core';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../UserContext';
import { showNotification } from '@mantine/notifications';



interface props{
  log:boolean
  setLog:React.Dispatch<React.SetStateAction<boolean>>
  vid:number
  setVid:React.Dispatch<React.SetStateAction<number>>
}

function Main_1({log,setLog,vid,setVid}:props) {

    // const Vid = useContext(UserContext)
    // const [log,setLog] = useState()
    const [todoData, setTodoData]:any[] = useState([]);
    const [filterData,setFilterData]:any[] = useState([])

    let nav = useNavigate()
    useEffect(() => {
        const q = query(collection(db1, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let todosArray:any[] = [];
          querySnapshot.forEach((doc) => {
            todosArray.push({ ...doc.data(), id: doc.id });
          });
          setTodoData(todosArray);
          console.log("SetData =",todoData)
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
      
      useEffect(() => {
        if(!log){
          return nav('/')
        }
        else return nav('/NTodo')
      },[log])
      
      useEffect(()=>{
        if(todoData.filter((e: any) => e.Vid.vid  == vid).length){
          var v = todoData.filter((e: any) => e.Vid.vid  == vid)
          setFilterData(v)
          console.log('DD',v)
        }
        else{
          console.log('Not working')
        }
     
      },[todoData])

      const LogOut = () => {
        setLog(false)
        showNotification(
          { 
           title: 'GoodBye User',
           message: 'Thankyou for Visiting!!',
           color:'red',
          }
         )
      }

      return (
        <Group align={'center'} direction='column' position='center' spacing={'xs'} style={{}} grow>
            <Text size='xl' weight={700}>Todo List</Text>
          <Group direction='row' position='center' spacing='xs' p='10px' grow>
            <AddTodo vid={vid}/>
          </Group>
          <Grid style={{}}>
            <Grid.Col span={12}>
                {filterData.map((todo:any) => (
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
          <Group position='center' mt='50vh' style={{position:'absolute', zIndex:'1'}}><Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onClick={() => {LogOut()}} radius="xl">Log0ut</Button></Group>
        </Group>
      );
}

export default Main_1