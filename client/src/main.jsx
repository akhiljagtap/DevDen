import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persiststore } from "./redux/store.js"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import Theme from "./components/Theme.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persiststore}>

    <Provider store={store}>

      <App  />
      <ToastContainer
        position="top-center"
        autoClose={3000}
      />


    </Provider>

  </PersistGate>

)


















