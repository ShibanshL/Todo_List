import { useState } from 'react'
import { AppShell, Center, Container,Group} from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Error from './Login/Error'
import SignUp from './Login/SignUp';
import Main_1 from './Component_2/Main_1';
import { NotificationsProvider } from '@mantine/notifications';
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// import { Log } from './Log';

var logg = false

const reactQuery = new QueryClient()

function App() {

  return (

    //Iam gonna be using react query that's why this boilerplate is needed
    <QueryClientProvider client={reactQuery}>
      <Router>
        <AppShell
          padding={0}
          styles={(theme) => ({
            main: {height:'100vh', maxHeight:'100vh', width:'100vw', background:'url(./gb2.jpg)',backgroundSize:'cover', overflowY:'auto' },
          })}>
            <NotificationsProvider> {/* This is another boiler plate needed for another dependancy that provide notifivcations on command */}
            <Container size={1280} style={{height:'80%'}}>
                <Routes>
                    <Route path='/' element={ 
                        <Container mt='25vh' p='20px' style={{}} fluid><Login/></Container> /* This is the function for the Login page */
                    }/>
                      <Route path='*' element={
                        <Container size="xl" p='20px' px="xl" style={{}}><Error /></Container> /* This is the function for the page that will appear if we input any other url */
                    } />
                    <Route path='/NTodo' element={
                        <Container p='20px' style={{}} fluid><Main_1/></Container> /* This is the function for the Main Todo page */
                    }/>
                    <Route path='/signUp' element={
                        <Container mt='25vh' p='20px' style={{}} fluid><SignUp/></Container> /* This is the function for the Signup page */
                    }/>
                </Routes>
              </Container>
            </NotificationsProvider>
        </AppShell>
      </Router>
   </QueryClientProvider>
  )
}

export default App
