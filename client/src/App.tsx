import React, { useCallback, useEffect, useState } from 'react';
import Form from './components/Form'



function App({ drizzle }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [drizzState, setDrizzState] = useState<any>([])
  const [tangible, setTangible] = useState<any>()

  const setValue = (name) => {
    if(tangible !== undefined){
      tangible.methods['createItem'].cacheSend(name, {
        from : drizzState?.accounts[0]
      })
     }
  }

  // const stackId = contract.methods["set"].cacheSend(value, {
  //   from: drizzleState.accounts[0]
  // });



  useEffect(() => {
    drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        setLoading(false)
        setDrizzState(drizzleState)
      }
      const { Tangible } = drizzle.contracts
      setTangible(Tangible)
      console.log(Tangible && Tangible.methods['createItem'], "tang")
    })

    
  }, [drizzle.contracts, drizzle.store])



  return (
    <>
      <Form handleSubmit={setValue}/>
    </>
  );
}

export default App;
// hello