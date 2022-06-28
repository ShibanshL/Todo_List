import { useState } from 'react'
import { AppShell, Center, Container,Group} from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Error from './Login/Error'
import SignUp from './Login/SignUp';
import Main_1 from './Component_2/Main_1';
import { UserContext } from './UserContext';
import { NotificationsProvider } from '@mantine/notifications';
// import { Log } from './Log';

var logg = false
function App() {

  return (
   <Router>
    <AppShell
      padding={0}
      styles={(theme) => ({
        main: { height:'100vh', width:'100vw', background:'url(./gb2.jpg)',backgroundSize:'cover' },
      })}>
        <NotificationsProvider> 
        <Container size={1280} style={{height:'80%'}}>
          {/* <Group position='center' align={'center'} style={{height:'100%'}}> */}
            <Routes>
                <Route path='/' element={ 
                    <Container mt='25vh' p='20px' style={{}} fluid><Login/></Container>
                }/>
                  <Route path='*' element={
                    <Container size="xl" p='20px' px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'25px'}}><Error /></Container>
                } />
                <Route path='/NTodo' element={
                    <Container p='20px'  style={{height:"100%"}} fluid><Main_1/></Container>
                }/>
                <Route path='/signUp' element={
                    <Container mt='25vh' p='20px' style={{}} fluid><SignUp/></Container>
                }/>
            </Routes>
            {/* </Group> */}
          </Container>
        </NotificationsProvider>
    </AppShell>
   </Router>
  )
}

export default App
