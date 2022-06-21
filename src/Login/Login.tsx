import React, { useEffect, useState } from 'react'
import { TextInput, Text, Button, Group, Box , Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link} from 'react-router-dom'
import {db} from '../FireBase'
import {ref,onValue} from 'firebase/database'

// const db = FireBase()
var i = 0

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
    // var c = auth()
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
                console.log(e)
                console.log('load b = ',load)
                console.log('Mail =',e.email)
                load = true
                setTimeout(() =>  nav('/NTodo') ,1500)
                console.log('load = ',load)
                i++
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

        if(load==false){
            return (
                <>
               <Group sx={{ maxWidth: 500}} mx="auto" style={{}} direction='column' position='center'>
                    <Text size='xl'>Login Here!!</Text>
                    <form onSubmit={form.onSubmit(e => handleSubmit(e))} style={{width:'100%'}}>
                        <TextInput
                        required
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                        
                        />
                        <TextInput
                        required
                        type='password'
                        label="password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                        
                        />

                        <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                        </Group>

                        <Text align='center' >Do not have an account? <Link to={'/SignUp'}>Sign Up</Link></Text>
                    </form>
                </Group>
                </>
            )
        }
        else{
            return( 
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <Loader style={{position:'absolute'}}/>
            </Box>
            )
        }

}

export default Login