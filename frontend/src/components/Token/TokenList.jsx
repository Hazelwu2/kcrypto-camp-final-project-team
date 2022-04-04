/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
// Component
import { Header } from '../../components'
// Utils
import { useProvider, useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import React, { useEffect, useState } from "react";
import { handleError } from '../../config/handle-error'
import Swal from 'sweetalert2'
// Contract
import { gt_token_contract, ut_token_contract } from '../../config/contract'
import PreloaderGif from '../../assets/images/preloader.gif'

export const TokenList = () => {
  const provider = useProvider()
  const [gtBalance, setGtBalance] = useState(0)
  const [utBalance, setUtBalance] = useState(0)
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)

  // Connected account details
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  // 取得 GT Token 餘額
  const [{ }, getGtBalanceOf] = useContractRead(
    {
      addressOrName: gt_token_contract.address,
      contractInterface: gt_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

  const [{ }, mintGt] = useContractWrite(
    {
      addressOrName: gt_token_contract.address,
      contractInterface: gt_token_contract.abi,
      signerOrProvider: provider,
    },
    'mint',
  )

  const [{ }, mintUt] = useContractWrite(
    {
      addressOrName: ut_token_contract.address,
      contractInterface: ut_token_contract.abi,
      signerOrProvider: provider,
    },
    'mint',
  )

  // 取得 UT Token 餘額
  const [{ }, getUtBalanceOf] = useContractRead(
    {
      addressOrName: ut_token_contract.address,
      contractInterface: ut_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

  let [{ data, error, loading: txLoading }, waitForTransaction] = useWaitForTransaction({
    hash: txHash
  })


  const getGtBalance = async () => {
    try {
      const { data, error } = await getGtBalanceOf({
        args: [accountData?.address]
      })

      if (error) {
        console.error('[getGtBalance]', error)
        handleError(error)
        return
      }

      const balance = parseInt(data._hex)
      setGtBalance(balance)
    } catch (error) {
      console.error(error)
    }
  }

  const getUtBalance = async () => {
    try {
      const { data, error } = await getUtBalanceOf({
        args: [accountData?.address]
      })

      if (error) {
        console.error('[getUtBalance]', error)
        handleError(error)
        return
      }

      const balance = parseInt(data._hex)
      setUtBalance(balance)
    } catch (error) {
      console.error(error)
    }
  }

  const mintGtToken = async () => {
    try {
      const { data, error } = await mintGt({
        args: [accountData.address, 1],
        overrides: {
          gasLimit: 203000,
          gasPrice: 60000000000,
        },
      })


      if (data) {
        console.log(`[
          ℹ️交易Detail] https://rinkeby.etherscan.io/tx/${data.hash}`)
        setTxHash(data.hash)
      }

      if (error) {
        console.error('[🐛mintGtToken] Error Happend')
        handleError(error)
        setLoading(false)
      }

    } catch (error) {
      console.error(error)
      handleError(error)
      setLoading(false)
    }
  }

  const mintUtToken = async () => {
    try {
      const { data, error } = await mintUt({
        args: [accountData.address, 1],
        overrides: {
          gasLimit: 203000,
          gasPrice: 60000000000,
        },
      })


      if (data) {
        console.log(`[
          ℹ️交易Detail] https://rinkeby.etherscan.io/tx/${data.hash}`)
        setTxHash(data.hash)
      }

      if (error) {
        console.error('[🐛mintGtToken] Error Happend')
        handleError(error)
        setLoading(false)
      }

    } catch (error) {
      console.error(error)
      handleError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (accountData?.address) {
      getGtBalance()
      getUtBalance()
    }
  }, [accountData?.address, data])


  if (loading || txLoading) return <>
    <Header />
    <div className="loading">
      <div>
        <img src={PreloaderGif} />
        <span>
          {
            loading && 'Loading Data...'
          }
          {
            txLoading && 'Waiting For Transaction...'
          }

        </span>
      </div>
    </div>
  </>

  if (data) {
    data = {}
    Swal.fire({
      icon: 'info',
      title: 'Mint成功',
    })
  }

  if (error) return <>
    <Header />
    <div className="loading">
      <div>
        <span>
          {error} Transaction Error
        </span>
      </div>
    </div>
  </>


  return (
    <div className='token-list'>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 mb-2">
            <div className="box">
              <div className="box-content">
                <div className="title">GT</div>
                <div className="number">{gtBalance} 顆</div>
                <button
                  className="btn btn-border"
                  onClick={mintGtToken}>
                  Mint GT
                </button>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="box">
              <div className="box-content">

                <div className="title">UT</div>
                <div className="number">{utBalance} 顆</div>
                <button
                  className="btn btn-border"
                  onClick={mintUtToken}
                >
                  Mint UT
                </button>
              </div>
            </div>
          </div>

          <div className="col-xs-12 flex-justify">
            <div className="box-content">
              <button
                className="btn btn-border"
              >
                Stake UT
              </button>
              <button
                className="btn btn-border"
              >
                Unstake UT
              </button>
            </div>
          </div>


        </div>
      </div>
    </div >
  )
}