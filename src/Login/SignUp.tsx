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
    const ZsetNums = useStore1(state => state.setNum)
    const isLoggedIn = window.localStorage.getItem('Data');
    const [authData, setAuthData] = useState<Authenticate[]>([])
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

        //Here the submition of data takes place after validation. i use a POST request to send data to backend.
        //Also i use Localstorage to keep me logged in

         async function handleSubmit(e: { email: string; password: string; id:number }){
            var Email = e.email
            var Password = e.password
            var id= e.id+(new Date()).getTime()
            ZsetNums(id)
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
        }

        //Fetching data from the accounts database to authenticate if any user using the same email has already made an account
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


        //To check on which page
        useEffect(() => {
          if(isLoggedIn){
            return nav('/NTodo')
          }
          else {
            null
          }
        },[isLoggedIn])
     

            return (
              <>
              <Container style={{}} fluid>
                <Group sx={{ maxWidth: 500}} mx="auto" p='20px' style={{background:'white',borderRadius:'10px'}} direction='column' position='center' grow>
                  <Text size='xl' align='center' weight={700}>Sign Up Here!!</Text>
                  <form onSubmit={form.onSubmit(e => handleSubmit(e))} style={{color:'white'}}>
                      <TextInput
                      required
                      label="Email"
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
}

export default SignUp