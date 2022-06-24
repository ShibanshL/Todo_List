import React,{useState, useEffect, useContext} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Center, Loader, Notification } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'
import { UserContext } from '../UserContext';
import {db} from '../FireBase'
import {ref,onValue} from 'firebase/database'
import { showNotification } from '@mantine/notifications';


var i = 0
var j = 0

interface props{
  log:boolean
  setLog:React.Dispatch<React.SetStateAction<boolean>>
  vid:number
  setVid:React.Dispatch<React.SetStateAction<number>>
}

interface Authenticate {
  data:
  {
      Email: string,
      Password: string,
      id: number
  },
  key: string | null
}


function SignUp({log,setLog,vid,setVid}:props) {

    // const {log,setLog} = useContext(UserContext)
    // var Vid = useContext(UserContext)
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
            setVid(id)

            console.log('Vid =' ,vid)
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
            setLog(true)
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


        useEffect(() => {
          if(log){
            return nav('/NTodo')
          }
          // else return nav('/')
        },[log])
     

        if(i%2==0){
            return (
              <>
              <Group sx={{ maxWidth: 500}} mx="auto" style={{width:'60vw'}} direction='column' position='center' grow>
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

                    <Text p='10px' align='center' >Do you have an account? <Link to={'/'}>Login</Link></Text>
                </form>
              </Group>
              </>
            )
        }
        else{
          return(
            <Center style={{width:'30vw'}}>
                  {num%2==0?<Loader color={'cyan'}/>:<Notification disallowClose icon={<AiFillCheckCircle />} radius='md' color="teal" title="SignUp was succesfull!!">
                      Your Details have been submitted, you are being redirected.
                    </Notification>}
            </Center>
          )
        }
}

export default SignUp