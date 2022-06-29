import React,{useState, useEffect, useContext} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Center, Container, Loader, Notification } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import {db,db0} from '../FireBase'
import {ref,onValue} from 'firebase/database'
import { showNotification } from '@mantine/notifications';
import {useStore,useStore1} from '../Store'


var i = 0
var j = 0


interface Authenticate {
  data:
  {
      Email: string,
      Password: string,
      id: number
  },
  key: string | null
}

interface Authenticate1 {
  data:{
    Zlog:boolean
  }
  key: string | null
}



function SignUp() {

    const Zlog = useStore(state => state.log)
    const ZsetLog_True = useStore(state => state.setLog_True)
    const [logHistory, setLogHistory]:any[] = useState([])
    const [currentPageLog,setCurrentPageLog] = useState<boolean>()
    const ZsetNums = useStore1(state => state.setNum)
    const isLoggedIn = window.localStorage.getItem('Data');
    const [authData, setAuthData] = useState<Authenticate[]>([])
    const [num,setNum] = useState(0)
    let nav = useNavigate()
    const form = useForm({
        initialValues: {
          email: '',
          password:'',
          id:0
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password : (value) => (value.length < 4)? 'Please Enter a biggger [assword' : null
          },
        });

         async function handleSubmit(e: { email: string; password: string; id:number }){
            var Email = e.email
            var Password = e.password
            var id= e.id+(new Date()).getTime()
            // setVid(id)
            ZsetNums(id)
            // console.log('Vid =' ,vid)
            // Vid = id
            if(!authData.filter(e => e.data.Email == Email).length){

            const res = await fetch('https://reactfirebasebackend-default-rtdb.firebaseio.com/userDataRecord.json',
            {
                method:'POST',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Email,Password,id
                })
            })

           

            form.setFieldValue('email', '')
            form.setFieldValue('password', '')
            i++
            // setLog(true)
            // ZsetLog_True()
            
            window.localStorage.setItem('Data',true)
            window.localStorage.setItem('Id_Token',String(id))


            showNotification(
              { 
               title: 'Welcome New User',
               message: 'Welcom back to your TodoList',
               color:'teal',
              }
             )
          }
          else{
            showNotification(
              { 
               title: 'An account with this email alerady exist!!',
               message: 'This email already exist on the Database.',
               color:'red',
              }
             )
          }
          // nav('/NTodo')
        }

        // useEffect(() => {
        //   const dbref1 = ref(db0,'userLogRecord')
        //   onValue(dbref1,(snapshot) => {
        //     let record:Authenticate1[] = []
        //     snapshot.forEach(childSnapshot => {
        //       let keyName = childSnapshot.key
        //       let data = childSnapshot.val()
        //       record.push({"key":keyName, "data":data})
        //     })
        //     console.log('RRR',record)
        //     setLogHistory(record)
        //     setCurrentPageLog(record[0].data.Zlog)
        //     console.log('Got data ',logHistory)
        //   })
        //   j++
  
        // },[])

        useEffect(() => {
          const dbref = ref(db,'userDataRecord')
          onValue(dbref,(snapshot) => {
            let record:Authenticate[] = []
            snapshot.forEach(childSnapshot => {
              let keyName = childSnapshot.key
              let data = childSnapshot.val()
              record.push({"key":keyName, "data":data})
            })
            setAuthData(record)
            console.log('Get ',authData)
          })
        },[i])

        async function LogHistory(){
          console.log('Zlog = ',Zlog)
          const res1 = await fetch('https://reactfirebasebackend-default-rtdb.firebaseio.com/userLogRecord.json',
          {
            method:'POST',
              headers:{
                 'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  Zlog
              })
          })
        }

        useEffect(() => {
          if(isLoggedIn){
            // LogHistory()
            // j++/
            return nav('/NTodo')
          }
          else {
            null
          }
        },[isLoggedIn])
     

        // if(i%2==0){
            return (
              <>
              <Container style={{}} fluid>
                <Group sx={{ maxWidth: 500}} mx="auto" p='20px' style={{background:'white',borderRadius:'10px'}} direction='column' position='center' grow>
                  <Text size='xl' align='center' weight={700}>Sign Up Here!!</Text>
                  <form onSubmit={form.onSubmit(e => handleSubmit(e))} style={{color:'white'}}>
                      <TextInput
                      required
                      label="Email"
                      // color="white"
                      // value={signUp.email}
                      placeholder="your@email.com"
                      radius="xl"
                      p="5px"
                      {...form.getInputProps('email')}
                      
                      />
                      <TextInput
                      required
                      type='password'
                      label="Password"
                      placeholder="Password"
                      radius="xl"
                      p="5px"
                      {...form.getInputProps('password')}
                      
                      />

                      <Group position="right" mt="md">
                      <Button radius={'xl'} type="submit">Submit</Button>
                      </Group>

                      <Text p='10px' align='center' color={'black'}>Do you have an account? <Link to={'/'}>Login</Link></Text>
                  </form>
                </Group>
              </Container>
              </>
            )
        // }
        // else{
        //   return(
        //     <Center style={{width:'30vw'}}>
        //           {num%2==0?<Loader color={'cyan'}/>:<Notification disallowClose icon={<AiFillCheckCircle />} radius='md' color="teal" title="SignUp was succesfull!!">
        //               Your Details have been submitted, you are being redirected.
        //             </Notification>}
        //     </Center>
        //   )
        // }
}

export default SignUp