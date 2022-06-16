import { useState } from 'react'
import { AppShell, Container} from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Component/Main';
import Login from './Login/Login';
import Error from './Login/Error'

function App() {

  return (
   <Router>
    <Routes>
      <Route path='/' element={
        <AppShell

        styles={(theme) => ({
          main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', padding:0, margin:0, boxSizing:'border-box',
                background:'url(./star.jpg)',backgroundSize:'cover' , overflow:'hidden',fontFamily: 'Poppins' },
        })}>
        <Container size="xl" px="xl" style={{background:'rgba(255,255,255,1)', borderRadius:'25px', padding:'20px'}}><Login /></Container>
      </AppShell>
      }/>
      <Route path='/Todo' element={
        <AppShell
          styles={(theme) => ({
          main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', padding:0, margin:0, boxSizing:'border-box',
          background:'url(./star.jpg)',backgroundSize:'cover' , overflow:'hidden',fontFamily: 'Poppins' },
          })}>
            <Container size="xl" px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'25px', padding:'20px'}}><Main /></Container>
        </AppShell>} />
        <Route path='*' element={
          <AppShell
          styles={(theme) => ({
          main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', padding:0, margin:0, boxSizing:'border-box',
          background:'url(./star.jpg)',backgroundSize:'cover' , overflow:'hidden',fontFamily: 'Poppins' },
          })}>
            <Container size="xl" px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'25px', padding:'20px'}}><Error /></Container>
        </AppShell>} />
    </Routes>
   </Router>
  )
}

export default App
