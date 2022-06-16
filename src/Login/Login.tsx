import React from 'react'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';


function Login() {
    const form = useForm({
        initialValues: {
          email: '',
          password:'',
          termsOfService: false,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password : (value) => (value.length < 4)? 'Please Enter a biggger [assword' : null
          },
        });

        function handleSubmit(e: { email: string; password: string; termsOfService: boolean; }){
            console.log(e)
            
        }

  return (
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

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          style={{color:'white'}}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}

export default Login