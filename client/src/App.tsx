import React, { useEffect, useState } from 'react';
import Form from './components/Form'


interface AddToMarket {
  tokenIndex: string,
  tokenAddress: string,
  tokenPrice: number
}

function App({ drizzle }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [drizzState, setDrizzState] = useState<any>([])
  const [tangible, setTangible] = useState<any>()
  const [marketplace, setMarketPlace] = useState<any>()
  const [account, setAccount] = useState<any>()



  const setValue = async (name: string, event: Event, price: string) => {
    event.preventDefault()

    if (!name || !price) {
      alert(new Error("please speficy price and name"))
      return null
    }

    if (tangible !== undefined) {
      await tangible.methods['createItem'].cacheSend(name, {
        from: account[0]
      })




      tangible.events.ItemCreated()
        .on("data", async (event) => {

          if (event.returnValues && account) {
            await ensureMarketplaceIsApproved(event.returnValues[1])
            let nftAddress = event.returnValues[1]
            await addToMarketPlace({ tokenIndex: nftAddress, tokenAddress: tangible.address, tokenPrice: 10000 })
          }

        })
    }
  }

  const ensureMarketplaceIsApproved = async (tokenIndex) => {
    const approvedAddress = await tangible.methods.getApproved(tokenIndex).call({ from: account[0] })
    if (approvedAddress) {
      await tangible.methods.approve(marketplace.address, tokenIndex).send({ from: account[0] })
    }
  }

  const addToMarketPlace = async ({ tokenIndex, tokenAddress, tokenPrice }: AddToMarket) => {
    await marketplace.methods.addItemToMarket(tokenIndex, tokenAddress, tokenPrice).send({ from: account[0] });
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
      if (drizzState) {
        setAccount(drizzleState.accounts)
      }
    })


  }, [drizzState, drizzState.accounts, drizzle.contracts, drizzle.store, tangible])



  return (
    <>
      <Form handleSubmit={setValue} />
    </>
  );
}

export default App;
// hello