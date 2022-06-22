import React,{useState} from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Text, Button, Group, Center, Loader, Container } from '@mantine/core';
import { useNavigate, Link} from 'react-router-dom'


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
            <Center style={{width:'30vw',height:'10vw'}}>
                  {num%2==0?<Loader color={'cyan'}/>:<Text size='xl' variant="gradient" gradient={{ from: '#14FF36', to: '#27D6FF', deg: 45 }} weight={700}>SignUp Success!!</Text>}
            </Center>
          )
        }
}

export default SignUp