import React, { useEffect, useState } from 'react'
import { TextInput, Text, Button, Group, Box , Loader, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link} from 'react-router-dom'
import {db} from '../FireBase'
import {ref,onValue} from 'firebase/database'

// const db = FireBase()
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

function Login() {
    
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

        function handleSubmit(e: { email: string; password: string; }){

          
            var Mail = e.email
            var Password = e.password
            var check = authData.filter( e => e.data.Email == Mail )
            console.log('check', check)
            if(authData.filter( e => e.data.Email == Mail ).length && authData.filter( e => e.data.Password == Password ).length){
                load = true
                setTimeout(() =>{setNum(j+1)},2000)
                
                i++
                setTimeout(() =>  nav('/NTodo') ,3000)
               
            }
            else{
                alert('Wrong Email Id or Password')
            }
            // form.setFieldValue('email', '')
            // form.setFieldValue('password', '')

           
            
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

        if(i%2==0){
            return (
                <>
               <Group sx={{ maxWidth: 500}} mx="auto" style={{width:'60vw'}} direction='column' position='center'>
                    <Text size='xl' weight={700}>Login</Text>
                    <form onSubmit={form.onSubmit(e => handleSubmit(e))} style={{width:'100%'}}>
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

                        <Text align='center' p='10px' color={'white'}>Do not have an account? <Link to={'/SignUp'}>Sign Up</Link></Text>
                    </form>
                </Group>
                </>
            )
        }
        else{
            return( 
            <Center style={{width:'30vw',height:'10vw'}}>
                {/* {num} */}
                {num%2==0?<Loader style={{position:'absolute'}}/>:<Text size='xl' weight={700}>Login Success!!</Text>}
            </Center>
            )
        }

}

export default Login