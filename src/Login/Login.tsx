import React from 'react'
import { TextInput, Text, Button, Group, Box , Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link} from 'react-router-dom'


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
            password : (value) => (value.length < 4)? 'Please Enter a biggger Password' : null
          },
        });

        function handleSubmit(e: { email: string; password: string; }){
            console.log(e)
            console.log('load b = ',load)
            load = true
            setTimeout(() =>  nav('/Todo') ,1500)
            console.log('load = ',load)
            
        }

        if(load==false){
            return (
                <>
                <Box sx={{ maxWidth: 500}} mx="auto" style={{width:'60vw', height:'30vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
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