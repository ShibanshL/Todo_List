import React from 'react'
import { TextInput, Checkbox, Button, Group, Box , Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom'


function Login() {
    let nav = useNavigate()
    let load = false
    const form = useForm({
        initialValues: {
          email: '',
          password:'',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password : (value) => (value.length < 4)? 'Please Enter a biggger [assword' : null
          },
        });

        function handleSubmit(e: { email: string; password: string; }){
            console.log(e)
            console.log('load b = ',load)
            load = true
            setInterval(() =>  nav('/Todo') ,3000)
            console.log('load = ',load)
            
        }

        if(load==false){
            return (
                <>
                <Box sx={{ maxWidth: 300 }} mx="auto">
                <form onSubmit={form.onSubmit(e => handleSubmit(e))}>
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
                </form>
                </Box>
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