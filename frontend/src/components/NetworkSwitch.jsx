import * as React from 'react'
import { useNetwork } from 'wagmi'

export const NetworkSwitch = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork()

  return (
    <div className="switcher" style={{ display: 'flex' }}>
      <div style={{ marginRight: '1rem' }}>
        當前 <span style={{ color: 'red' }}>
          {networkData.chain?.name ?? networkData.chain?.id}{' '}
          {networkData.chain?.unsupported && '(unsupported)'}
        </span>
      </div>

      {switchNetwork &&
        networkData.chains.filter(n => n.name === 'Rinkeby').map((x) =>
          x.id === networkData.chain?.id ? null : (
            <button class="btn btn-border" key={x.id} onClick={() => switchNetwork(x.id)}>
              Switch to {x.name}
            </button>
          ),
        )}

      {switchNetworkError && switchNetworkError?.message}
    </div>
  )
}
