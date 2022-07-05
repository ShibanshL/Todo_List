import {useState, useEffect} from 'react'
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
import { Grid, Group, Text, Button, Container } from '@mantine/core';
import {useNavigate} from 'react-router-dom'
import { showNotification } from '@mantine/notifications';
import {useStore,useStore1} from '../Store'
import CompletedTodo from './CompletedTodo';
import {useQuery} from 'react-query'



var j = 0

interface Authenticate {
  data:{
    Zlog:boolean
  }
  key: string | null
}

var Cmp = 0


function Main_1() {

   
    const [todoData, setTodoData]:any[] = useState([]);
    const [filterData,setFilterData]:any[] = useState([])
    const [completed, setCompletetd] = useState(0)
    const [completedLog,setCompletedLog] = useState<boolean>()

    const isLoggedIn = window.localStorage.getItem('Data')

    const token = window.localStorage.getItem('Id_Token')

    const Zlog = useStore(state => state.log)
    const ZsetLog_False = useStore(state => state.setLog_False)

    const Znum = useStore1(state => state.num)

    let nav = useNavigate()


    // const {} = useQuery()


    //Here we are pushing data to a collection in backend named 'todos'
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

      //This is to edit the todos
      const handleEdit = async (todo:any, title:string) => {
        console.log('t',todo)
        console.log('Id ',todo.id)
        await updateDoc(doc(db1, "todos", todo.id), { title: title });
      };

      //This is when todos have been completed
      const toggleComplete = async (todo:any) => {
        console.log('ANy :', todo)
        await updateDoc(doc(db1, "todos", todo.id), { completed: !todo.completed });
        setCompletedLog(todo.completed)
        Cmp++
      };

      //This does nothing
      const newToggleComplete = () => {
        setCompletetd(j+1)
          j++
      }

      //This is to delete the todos
      const handleDelete = async (id:any) => {
        await deleteDoc(doc(db1, "todos", id));
      };

      //Another useffect to keep us logged in or out
      useEffect(() => {
        if(isLoggedIn == null){
          return nav('/')
        }
        else {}
      },[isLoggedIn])
      
      //This does a very importanat thing, with every account i create or login i pass an unique id with it that i create
      //So when you have signed up or logged in the todos that will be rendered will be specific todos that were posted from the said account
      //Here based on the specific id those todos which are specicfic to the account are being filtered
      useEffect(()=>{
        if(todoData.filter((e: any) => e.Vid.vid  == token).length){
          var v = todoData.filter((e: any) => e.Vid.vid  == token)
          setFilterData(v)
          console.log('DD',v)
        }
        else{
          console.log('Not working')
        }
     
      },[todoData])

   
      //Logout function to return to the base login page
      const LogOut = () => {
       
        ZsetLog_False()
        window.localStorage.removeItem('Data')
        window.localStorage.removeItem('Id_Token')

        nav('/')
 
        showNotification(
          { 
           title: 'GoodBye User',
           message: 'Thankyou for Visiting!!',
           color:'red',
          }
         )
      }

      return (
        <>
          <Container sx={{maxWidth:600}} mt='15vh' pb='20vh' style={{height:'100%'}} fluid>
            <Group style={{ background:'#2FA4FF', borderRadius:'10px'}} align={'center'} position='center' grow>
              <Group align={'center'} direction='column' position='center' spacing={'xs'} style={{overflow:'hidden'}} grow>
                  <Text size='xl' p='5px' weight={700}>Todo List</Text>
                  <Group direction='row' position='center' spacing='xs' p='10px' style={{}} grow>
                    <AddTodo vid={parseFloat(token)}/> 
                  </Group>
                  {filterData.filter((e: { completed: boolean; }) => e.completed == true).length == 0?
                      <Grid p='0' style={{width:'100%'}} grow>
                        <Grid.Col span={12} style={{ }}>
                          <Container size={800} style={{ }} fluid>
                              {filterData.map((todo:any) => (
                              <Todo
                                  key={todo.id}
                                  todo={todo}
                                  toggleComplete={toggleComplete}
                                  handleDelete={handleDelete}
                                  handleEdit={handleEdit}
                                  newToggleComplete={newToggleComplete}
                                  completed={completed}
                                  todoData={todoData}
                                  complete={todo.complete}
                              />
                              ))}
                            </Container>
                        </Grid.Col>
                      </Grid>
                    :  
                    <Grid pb='20px' p='10px' style={{width:'100%' }} grow>
                        <Grid.Col span={12} style={{ }}>
                          <Container size={800} style={{}} fluid>
                              {filterData.map((todo:any) => (
                              <Todo
                                  key={todo.id}
                                  todo={todo}
                                  toggleComplete={toggleComplete}
                                  handleDelete={handleDelete}
                                  handleEdit={handleEdit}
                                  newToggleComplete={newToggleComplete}
                                  completed={completed}
                                  todoData={todoData}
                                  complete={todo.complete}
                              />
                              ))}
                            </Container>
                        </Grid.Col>

                        {/* This displays the completed section once the checkbox is checked*/}

                        <Text weight={600} p='0px 15px' align='center'>Completed</Text>
                        <Grid.Col span={12} style={{background:'#c1ffc5', borderRadius:'10px' }}>
                          <Container size={800} style={{}} fluid>
                                {filterData.map((todo:any) => (
                                <CompletedTodo
                                    key={todo.id}
                                    todo={todo}
                                    toggleComplete={toggleComplete}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    newToggleComplete={newToggleComplete}
                                    completed={completed}
                                    todoData={todoData}
                                    complete={todo.complete}
                                />
                                ))}
                          </Container>
                        </Grid.Col>
                      </Grid>
                    }
              </Group>
            </Group>
          </Container>
          <Group position='center' style={{position:'absolute', zIndex:'5', top:'5vh', right:'5vw' }}><Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} style={{}} onClick={() => {LogOut()}} radius="xl">Logout</Button></Group>
        </>
      );
}

export default Main_1