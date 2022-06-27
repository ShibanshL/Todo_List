import { useState } from 'react'
import { AppShell, Container} from '@mantine/core';
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
        main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', margin:0, boxSizing:'border-box',
              background:'url(./gb2.jpg)',backgroundSize:'cover' ,fontFamily: 'Poppins' },
      })}>
        <NotificationsProvider>  
          <Routes>
            <Route path='/' element={
                <Container size="xl" p='20px' px="xl" style={{background:'rgba(255,255,255,0.3)', backdropFilter:'blur(30px)', borderRadius:'25px', }}><Login/></Container>
            }/>
              <Route path='*' element={
                <Container size="xl" p='20px' px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'25px'}}><Error /></Container>
            } />
            <Route path='/NTodo' element={
                <Container size="xl" p='20px' px="xl" style={{background:'rgba(255,255,255,0.3)', backdropFilter:'blur(30px)', borderRadius:'25px'}}><Main_1/></Container>
            }/>
            <Route path='/signUp' element={
                <Container size="xl" p='20px' px="xl" style={{background:'rgba(255,255,255,0.3)', backdropFilter:'blur(30px)', borderRadius:'25px'}}><SignUp/></Container>
            }/>

          </Routes>
        </NotificationsProvider>
    </AppShell>
   </Router>
  )
}

export default App
