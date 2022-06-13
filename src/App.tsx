import { useState } from 'react'
import { AppShell, Container} from '@mantine/core';
import Main from './Component/Main';

function App() {

  return (
    <AppShell

      styles={(theme) => ({
        main: { height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center', padding:0, margin:0, boxSizing:'border-box',
              background:'url(https://th.bing.com/th/id/R.707326905109ea98f7da3f55566f7b82?rik=U0bOG66Df5L5zA&riu=http%3a%2f%2fpapers.co%2fwallpaper%2fpapers.co-ni76-space-star-night-galaxy-nature-dark-35-3840x2160-4k-wallpaper.jpg&ehk=UcMS50F5eyvSFBfdIo5MSDwLb7pGfu09eUJH2rLYObw%3d&risl=1&pid=ImgRaw&r=0)',backgroundSize:'cover' , overflow:'hidden',fontFamily: 'Poppins' },
      })}>
      <Container size="xl" px="xl" style={{background:'rgba(255,255,255,0.2)', borderRadius:'15px', padding:'20px'}}><Main /></Container>
    </AppShell>
  )
}

export default App
