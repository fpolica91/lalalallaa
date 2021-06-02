import React, { useEffect, useState } from 'react';
import Form from './components/Form'



function App({ drizzle }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [drizzState, setDrizzState] = useState<any>([])
  const [tangible, setTangible] = useState<any>()

  const setValue = async (name, event) => {
    event.preventDefault()
    if (tangible !== undefined) {
      const result = await tangible.methods['createItem'].cacheSend(name, {
        from: drizzState?.accounts[0]
      })
      console.log(result)
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
    })


  }, [drizzle.contracts, drizzle.store])



  return (
    <>
      <Form handleSubmit={setValue} />
    </>
  );
}

export default App;
// hello