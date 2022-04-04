// Wagmi
import {
  useAccount,
  useBalance,
  useProvider,
  useContractRead,
  useContractWrite,
} from "wagmi";
// Contract
import { gt_token_contract } from '../config/contract'

/*
  測試合約
*/
export const GetToken = () => {
  const provider = useProvider()

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })
  // Fetching balance information
  const [] = useBalance({
    addressOrName: accountData?.address,
  });

  const [{ }, mint] = useContractWrite(
    {
      addressOrName: gt_token_contract.address,
      contractInterface: gt_token_contract.abi,
      signerOrProvider: provider,
    },
    'mint',
  )

  const [{ }, balanceOf] = useContractRead(
    {
      addressOrName: gt_token_contract.address,
      contractInterface: gt_token_contract.abi,
      signerOrProvider: provider,
    },
    'balanceOf',
  )

  const getGtBalance = async () => {
    const { data, error } = await balanceOf({
      args: [accountData.address]
    })

    const balance = parseInt(data._hex)


    console.log(data)
    console.log('GT餘額: ', balance)
    console.log(error)
  }


  const mintGtToken = async () => {
    const { data, error } = await mint({
      args: [accountData.address, 1000]
    })

    console.log(data)
    console.log(error)
  }

  return (
    <section className="section3">
      <div className="container">
        <div className="info flex-justify flex-column">
          <div className="title linear-text">合約測試</div>
        </div>

        <div className="btn-list">
          <button
            className="btn btn-border"
            onClick={getGtBalance}
          >
            getGtBalance
          </button>
          <button
            className="btn btn-border"
            onClick={mintGtToken}
          >
            mintGtToken
          </button>

        </div>
      </div>
    </section>
  )
}