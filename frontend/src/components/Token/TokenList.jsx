/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
// Component
import { Header } from '../../components'
// Utils
import { useProvider, useAccount, useContractRead } from 'wagmi'
import React, { useEffect, useState } from "react";
import { handleError } from '../../config/handle-error'
// Contract
import { gt_token_contract, ut_token_contract } from '../../config/contract'

export const TokenList = () => {
  const provider = useProvider()
  const [gtBalance, setGtBalance] = useState(0)
  const [utBalance, setUtBalance] = useState(0)

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

  // 取得 UT Token 餘額
  const [{ }, getUtBalanceOf] = useContractRead(
    {
      addressOrName: ut_token_contract.address,
      contractInterface: ut_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

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

  useEffect(() => {
    if (accountData?.address) {
      getGtBalance()
      getUtBalance()
    }
  }, [accountData?.address])

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
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="box">
              <div className="box-content">

                <div className="title">UT</div>
                <div className="number">{utBalance} 顆</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}