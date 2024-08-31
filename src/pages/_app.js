import '../../styles/globals.css'
import '../../styles/input-button.css'
import '../../styles/icofont/icofont.min.css'
import '../../styles/animate.min.css'
 import '../../styles/mtree.css'
 import '../../styles/modal.css'
//import '../../styles/products.css'

import MainLayout from 'layout'

import { Provider } from 'react-redux';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react'
 import { MetaMaskProvider } from "metamask-react"

function MyApp({ Component, pageProps, router }) {

  return (
     <MetaMaskProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </PersistGate>
      </Provider>
    </MetaMaskProvider>
  )


}

export default MyApp