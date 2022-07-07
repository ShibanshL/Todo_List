import create from 'zustand'


//This is being used to pass aglobal state to be used within the project
interface LOG {
    log:boolean
    setLog_True: () => void
    setLog_False: () => void
}

const useStore = create<LOG>((set) => ({
    log:false,
    setLog_False:() => set(() => ({log:false})),
    setLog_True:() => set(() => ({log:true})),
}))

interface NUMBER {
    num:number
    setNum:(e:number) => void
}

const useStore1 = create<NUMBER>((set) => ({
    num:0,
    setNum:(e:number) => set(() => ({num:e}))
})) 



export {useStore, useStore1}