import { useEffect, useState } from 'react';
import getBlockchain from './ethereum.js';
import Store from './Store.js';


function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);
  useEffect(() => {
    const init = async () => {
      const {paymentProcessor, dai} = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();

  }, []);

  if(typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-12'>
          <h1>Blockchain ERC Commmerce App</h1>
          <p>You need to install Metamask</p>
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
        <div className='col-sm-12'>
          <h1>Blockchain ERC Commmerce App</h1>
          <Store paymentProcessor={paymentProcessor} dai={dai} />
        </div>
      </div>
  );
}

export default App;
