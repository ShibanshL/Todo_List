import React, { useEffect, useState, useContext } from 'react'
import { TextInput, Text, Button, Group, Notification, Loader, Center, Container, Card } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link} from 'react-router-dom'
import {db} from '../FireBase'
import {ref,onValue} from 'firebase/database'
import { showNotification } from '@mantine/notifications';
import {useStore,useStore1} from '../Store'
import {useQuery} from 'react-query'

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

var isLoggedIn;

function Login() {
    const Zlog = useStore(state => state.log)
    const ZsetLog_True = useStore(state => state.setLog_True)
    // const ZsetLog_False = useStore(state => state.setLog_False)
    const Znum = useStore1(state => state.num)
    const ZsetNums = useStore1(state => state.setNum)
    const [authData, setAuthData] = useState<Authenticate[]>([])
    const [num,setNum] = useState(0)
    let nav = useNavigate()
    let load = false
    const form = useForm({
        initialValues: {
          email: '',
          password:'',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password : (value) => (value.length < 4)? 'Please Enter a biggger Password' : null
          },
        });

        function handleSubmit(e: { email: string; password: string }){
            var Mail = e.email
            var Password = e.password
            var check = authData.filter( e => e.data.Email == Mail )
            console.log('check', check)


            //Here authentication process takes place, rather than using the firebase auth feature i do authentication manually
            //by fetching the data and filtering them according to the userinput


            if(authData.filter( e => e.data.Email == Mail ).length && authData.filter( e => e.data.Password == Password ).length){
                setTimeout(() =>{setNum(j+1)},2000)
                i++
                // setLog(true)
                ZsetLog_True()
                console.log('lojj in = ',Zlog)
                ZsetNums(check[0].data.id)
                // setVid(check[0].data.id)
                window.localStorage.setItem('Data',true)
                window.localStorage.setItem('Id_Token',String(check[0].data.id))

                showNotification(
                  { 
                   title: 'Welcome User',
                   message: 'Welcom back to your TodoList',
                   color:'teal',
                  }
                 )
               
            }
            else{
                showNotification(
                 { 
                  title: 'Wrong Email or Password',
                  message: 'Please Check you login data and retry!',
                  color:'red'
                }
                )
            }

           
        }

        //Here the fetching of data is taking place from firebase backend

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

          // const {data, error, isLoading} = useQuery('randomFacts', a);
          // console.log("react Query Data = ",data)

          useEffect(() => {
            console.log('lojj = ',Zlog)
            if(Zlog){
              return nav('/NTodo')
            }
            else{
                // return nav('/')
            }
          },[Zlog])

            return (
                <>
                <Container style={{}} fluid>
                    <Group sx={{maxWidth:500 }} mx="auto" p='20px' style={{background:'white',borderRadius:'10px'}} direction='column' position='center' grow>
                          <Text size='xl'align='center'  weight={700}>Login</Text>
                          <form onSubmit={form.onSubmit(e => {handleSubmit(e)
                                                              })} style={{width:'100%'}}>
                              <TextInput
                              required
                              label="Email"
                              placeholder="your@email.com"
                              radius="xl"
                              p='5px'
                              {...form.getInputProps('email')}
                              
                              />
                              <TextInput
                              required
                              type='password'
                              label="Password"
                              placeholder="Password"
                              radius="xl"
                              p='5px'
                              {...form.getInputProps('password')}
                              
                              />

                              <Group position="right" mt="md">
                              <Button radius={'xl'} type="submit">Submit</Button>
                              </Group>

                              <Text align='center' p='10px' color={'black'}>Do not have an account? <Link to={'/SignUp'}>Sign Up</Link></Text>
                          </form>
                      </Group>
                </Container>
                </>
            )
}

export default Login