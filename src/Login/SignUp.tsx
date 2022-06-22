import React,{useState} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Center, Loader, Notification } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'
import {AiFillCheckCircle} from 'react-icons/ai'

var i = 0
var j = 0

function SignUp() {

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
            var id = e.id+(new Date()).getTime()
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
            setTimeout(() => setNum(j+1),2000)
            i++
            setTimeout(() =>  nav('/NTodo') ,3000)
        }

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