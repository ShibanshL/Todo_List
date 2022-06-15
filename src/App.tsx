import { useState } from 'react'
import { AppShell, Container} from '@mantine/core';
import Main from './Component/Main';

function App() {

  return (
    <AppShell

      styles={(theme) => ({
        main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', padding:0, margin:0, boxSizing:'border-box',
              background:'url(./star.jpg)',backgroundSize:'cover' , overflow:'hidden',fontFamily: 'Poppins' },
      })}>
      <Container size="xl" px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'25px', padding:'20px'}}><Main /></Container>
    </AppShell>
  )
}

export default App
