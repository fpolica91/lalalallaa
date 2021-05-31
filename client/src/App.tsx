import React, { useEffect } from 'react';

interface AppProps {
  drizzle: any
}


function App<AppProps>({ drizzle }) {
  useEffect(() => {
    drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      console.log(drizzleState, "state")
    })
  }, [drizzle.store])
  console.log(drizzle)
  return (
    <div >
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
// hello