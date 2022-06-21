import React,{useState} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Box , Loader, Container } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'


function SignUp() {
   
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

            setTimeout(() =>  nav('/') ,1500)
            
        }
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

export default SignUp