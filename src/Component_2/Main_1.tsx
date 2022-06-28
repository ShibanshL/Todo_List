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
import { useHover } from '@mantine/hooks';
import {useStore,useStore1} from '../Store'
import {db0} from '../FireBase'
import {onValue,ref} from 'firebase/database'
import {update} from 'firebase/database'


var j = 0

interface Authenticate {
  data:{
    Zlog:boolean
  }
  key: string | null
}


function Main_1() {

   
    const [todoData, setTodoData]:any[] = useState([]);
    const [filterData,setFilterData]:any[] = useState([])
    const [logHistory, setLogHistory]:any[] = useState([])
    const [currentPageLog,setCurrentPageLog] = useState<boolean>()


    const Zlog = useStore(state => state.log)
    // const ZsetLog_True = useStore(state => state.setLog_True)
    const ZsetLog_False = useStore(state => state.setLog_False)

    const Znum = useStore1(state => state.num)
    // const ZsetNums = useStore1(state => state.setNum)

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

      useEffect(() => {
        const dbref1 = ref(db0,'userLogRecord')
        onValue(dbref1,(snapshot) => {
          let record:Authenticate[] = []
          snapshot.forEach(childSnapshot => {
            let keyName = childSnapshot.key
            let data = childSnapshot.val()
            record.push({"key":keyName, "data":data})
          })
          console.log('RRR',record)
          setLogHistory(record)
          setCurrentPageLog(record[0].data.Zlog)
          console.log('Got data ',logHistory)
        })
        j++

      },[])


      const handleEdit = async (todo:any, title:string) => {
        console.log('t',todo)
        console.log('Id ',todo.id)
        await updateDoc(doc(db1, "todos", todo.id), { title: title });
      };
      const toggleComplete = async (todo:any) => {
        await updateDoc(doc(db1, "todos", todo.id), { completed: !todo.completed });
      };
      const handleDelete = async (id:any) => {
        await deleteDoc(doc(db1, "todos", id));
      };
      
      useEffect(() => {
        console.log('LogHistory',currentPageLog)
        if(!currentPageLog && currentPageLog != undefined){
          return nav('/')
        }
        else {}
      },[j])
      
      useEffect(()=>{
        if(todoData.filter((e: any) => e.Vid.vid  == Znum).length){
          var v = todoData.filter((e: any) => e.Vid.vid  == Znum)
          setFilterData(v)
          console.log('DD',v)
        }
        else{
          console.log('Not working')
        }
     
      },[todoData])

      

      const LogOut = async ( data:string) => {
        await update(ref(db0, "userLogRecord"), { Zlog: false });
        // setLog(false)
        ZsetLog_False()
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
        <Container sx={{maxWidth:600}} mt='15vh' style={{height:'100%'}} fluid>
          <Group style={{ background:'white', borderRadius:'10px'}} align={'center'} position='center' grow>
            <Group align={'center'} direction='column' position='center' spacing={'xs'} style={{overflow:'hidden'}} grow>
                <Text size='xl' p='5px' weight={700}>Todo List</Text>
                <Group direction='row' position='center' spacing='xs' p='10px' style={{}} grow>
                  <AddTodo vid={Znum}/> 
                </Group>
              <Grid p='0' style={{width:'100%', maxHeight:'50vh', overflowY:'auto'}}>
                <Grid.Col span={12} style={{}} >
                  <Container size={600} style={{}}>
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
                    </Container>
                </Grid.Col>
              </Grid>
            </Group>
          </Group>
        </Container>
        <Group position='center' style={{position:'absolute', zIndex:'5', top:'5vh', right:'5vw' }}><Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} style={{position:'absolute',top:'5vh',right:'5vh'}} onClick={() => {LogOut(logHistory[0].key)}} radius="xl">Log0ut</Button></Group>

        </>
      );
}

export default Main_1