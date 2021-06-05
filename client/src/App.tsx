import React, { useEffect, useState } from 'react';
import Form from './components/Form'



function App({ drizzle }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [drizzState, setDrizzState] = useState<any>([])
  const [tangible, setTangible] = useState<any>()
  const [marketplace, setMarketPlace] = useState<any>()
  const [account, setAccount] = useState<any>()

  const setValue = async (name: string, event: Event) => {
    event.preventDefault()
    if (tangible !== undefined) {
      await tangible.methods['createItem'].cacheSend(name, {
        from: drizzState?.accounts[0]
      })

      tangible.events.ItemCreated()
        .on("data", async (event) => {
          if (event.returnValues && account) {
            console.log(event.returnValues[1])
            tangible.methods.getApproved(event.returnValues[1]).call({ from: account[0] })
            await tangible.methods.approve(marketplace.address, tangible.address).send({ from: account[0] })
            await marketplace.methods.addItemToMarket(event.returnValues[1], tangible.address, 10000).send({ from: account[0] });
          }
          console.log(marketplace.events.itemAdded())
        })

    }
  }





  useEffect(() => {
    drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        setLoading(false)
        setDrizzState(drizzleState)
      }
      const { Tangible, TangibleMarketPlace } = drizzle.contracts
      setTangible(Tangible)
      setMarketPlace(TangibleMarketPlace)
      setAccount(drizzState?.accounts)

    })


  }, [drizzState?.accounts, drizzle.contracts, drizzle.store, tangible])



  return (
    <>
      <Form handleSubmit={setValue} />
      <input type="" />
    </>
  );
}

export default App;
// hello