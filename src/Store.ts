import create from 'zustand'

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



export {useStore}