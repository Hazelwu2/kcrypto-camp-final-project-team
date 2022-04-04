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
        <Router basename={process.env.REACT_APP_BASENAME}>
          <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/posts" exact element={<PostList />} />
            <Route path="/post/create" exact element={<CreatePost />} />
            <Route path="/token" exact element={<TokenList />} />
          </Routes>
        </Router>
      </Provider>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
