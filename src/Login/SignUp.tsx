import React,{useState} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Box , Loader } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'


function SignUp() {
    const [signUp, setSignUp] = useState({
        email:'',
        password:''
    })
    let nav = useNavigate()
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
            setSignUp(e)
            console.log('Signup - ',signUp)
        //    console.log('load b = ',load)
            // load = true
            // setInterval(() =>  nav('/') ,1500)
            // console.log('load = ',load)
            
        }
  return (
    <>
    <Box sx={{ maxWidth: 500}} mx="auto" style={{width:'60vw', height:'30vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
    <form onSubmit={form.onSubmit(e => handleSubmit(e))} style={{width:'100%'}}>
        <TextInput
        required
        label="Email"
        // value={signUp.email}
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

        <Text align='center' >Do you have an account? <Link to={'/'}>Login</Link></Text>
    </form>
    </Box>
    </>
  )
}

export default SignUp