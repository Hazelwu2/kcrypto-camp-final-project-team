import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { PostList, CreatePost, TokenList } from './components'
import { providers } from "ethers";
import { Provider } from "wagmi";

// API key for Ethereum node
// services are Infura (infura.io)
const infuraId = process.env.REACT_APP_INFURA_ID;

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId)

ReactDOM.render(
  <React.StrictMode>
    <>
      <Provider autoConnect provider={provider}>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/token" element={<TokenList />} />
          </Routes>
        </Router>
      </Provider>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
