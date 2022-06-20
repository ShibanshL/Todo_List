{/* {j?tasks.map(e =>{
            return(
                <Group className='ll' position='apart' m='10px' p='10px' style={{ background:'white', borderRadius:'25px'}} key={e.id_N}>
                  <Text id={`id-${e.id_N}`}>{e.task_N}</Text>  
                  <Group> 
                    <GrClose onClick={() => handleDeleteTask(e.id_N)} style={{cursor:'pointer'}}/> <AiTwotoneEdit onClick={()=>handleEditTask(e.id_N)} style={{cursor:'pointer'}}/><br/>
                  </Group>
                </Group>
                )
              }
            ):
            <Group position='center' style={{}}>
              <form onSubmit={e => handleSubmit(e)}>
                <Input
                  placeholder ="Enter the Task"
                  radius="xl"
                  value={Data}
                  variant="filled"
                  size='md'
                  onChange={(e: React.FormEvent<Element>) => handleChange(e)}
                  />
                </form>
            </Group>
          } */}

          {/* {tasks.map(e =>
          { 
            return(
                <Group className='ll' position='apart' m='10px' p='10px' style={{ background:'white', borderRadius:'25px'}} key={e.id_N}>
                  {j?
                    <Text id={`id-${e.id_N}`}>{e.task_N}</Text>: 
                    <form onSubmit={e => handleSubmit(e)}>
                        <Input
                        placeholder ="Enter the Task"
                        radius="xl"
                        value={Data}
                        variant="filled"
                        size='md'
                        onChange={(e: React.FormEvent<Element>) => handleChange(e)}
                        // onSubmit={(e:React.FormEvent<Element>) => handleSubmit(e)}
                        />
                      </form>
                    }
                  <Group> 
                    <GrClose onClick={() => handleDeleteTask(e.id_N)} style={{cursor:'pointer'}}/> <AiTwotoneEdit onClick={()=>handleEditTask(e.id_N)} style={{cursor:'pointer'}}/><br/>
                  </Group>
                </Group>
                )
              }
          )
          } */}

          import React from 'react'
          
          function Cm() {
            return (
              <div>Cm</div>
            )
          }
          
          export default Cm