/* eslint-disable no-empty-pattern */
import Swal from 'sweetalert2'
import { Header, PostModal } from '../../components'

import {
  useProvider,
  useAccount,
  useContractRead,
  useContractWrite, useWaitForTransaction
} from "wagmi";
import React, { useEffect, useState } from "react";
import { handleError } from '../../config/handle-error'
// Img
import PreloaderGif from '../../assets/images/preloader.gif'
// Contract
import { post_contract } from '../../config/contract'
// IPFS
import { getFromIPFS } from '../../config/ipfs'
import { NoData } from './NoData'

export const PostList = () => {
  const [loadedAssets, setLoadedAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [txHash, setTxHash] = useState('')

  const provider = useProvider()
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const contractConfig = {
    addressOrName: post_contract.address,
    contractInterface: post_contract.abi,
    signerOrProvider: provider,
  }

  const [{ }, getTotalThreadCount] = useContractRead(
    {
      ...contractConfig
    },
    'getTotalThreadCount',
  )

  const [{ }, getThreadById] = useContractRead(
    {
      ...contractConfig
    },
    'getThreadById',
  )

  const [{ }, getThreadOwner] = useContractRead(
    {
      ...contractConfig
    },
    "getThreadOwner"
  );

  const [{ }, getThreadGoodCount] = useContractRead(
    {
      ...contractConfig
    },
    "getThreadGoodCount"
  );

  const [{ }, giveThreadOneGood] = useContractWrite(
    {
      ...contractConfig
    },
    "giveThreadOneGood"
  );

  // eslint-disable-next-line no-unused-vars
  let [{ data, error, loading: txLoading }, waitForTransaction] = useWaitForTransaction({
    hash: txHash
  })

  const getPostList = async () => {
    if (!accountData) {
      console.error('[getPostList] 沒有accountData', accountData)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await getTotalThreadCount()
      const countNumber = parseInt(data._hex) // 5

      const assets = [];

      if (error) handleError(error)

      for (let i = 1; i < countNumber + 1; i++) {
        // 鏈上資料 byte32 不滿 32 個字元會自動補 0
        // 從鏈上抓下來轉成數字會有奇怪的資料，因此要用 replace 取代 0
        const { data: threadRaw } = await getThreadById({ args: [i] });
        console.error('[threadRaw]', threadRaw)

        // eslint-disable-next-line no-useless-escape
        const ipfsHash = threadRaw.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");

        const jsonManifestBuffer = await getFromIPFS(ipfsHash);
        const jsonManifest = JSON.parse(jsonManifestBuffer);

        // 取得文章作者
        let { data: owner } = await getThreadOwner({ args: [i] })
        // 取得文章按讚次數
        let { data } = await getThreadGoodCount({ args: [i] })

        // 組合資料
        assets[ipfsHash] = {
          ...jsonManifest,
          owner,
          threadId: i,
          good: parseInt(data._hex)
        };
      }

      const topicList = [];
      for (const a in assets) {
        try {
          topicList.push({ id: a, ...assets[a] });
        } catch (e) {
          console.log(e);
        }
      }

      setLoadedAssets(topicList);
      setLoading(false)

      console.log('[loadedAssets]', loadedAssets)
    } catch (error) {
      handleError({ reason: error })
      Swal.fire({
        icon: 'error',
        title: '發生錯誤',
        text: `${error}`,
      })
    }
  }

  // 給予讚
  const giveGood = async (threadId) => {
    const { data, error } = await giveThreadOneGood({
      args: [threadId]
    })
    setTxHash(data.hash)
    console.log(data, error)
  }

  const closeModal = () => {
    setModalVisible(false)
  }


  useEffect(() => {
    getPostList()
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

  if (data) {
    data = {}
    Swal.fire({
      title: '按讚成功',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK'
    })
  }

  return (
    <>
      <Header />
      <div className="post-list">
        <div className="container">
          {
            accountData?.address
              ?
              loadedAssets?.map((post, index) => (
                post.image.map((img, i) => (
                  <div className="box post" key={index}>
                    <div className="post-info">
                      <h2>
                        {post.name}
                      </h2>
                    </div>
                    <div className="post-btn">
                      <span className="author">
                        作者 {img.authorName}
                      </span>
                      <span className="wallet">
                        錢包 {(post.owner).substring(0, 7)}
                      </span>
                      <span className="datetime">
                        {img.timeStamp}
                      </span>
                      <span className="good">
                        按讚次數 {isNaN(post.good) ? 0 : post?.good}
                      </span>
                    </div>
                    <div className="post-btn">
                      <button className="good-btn btn btn-border" onClick={() => {
                        giveGood(post.threadId)
                      }}>
                        按讚
                      </button>
                      <button className="good-btn btn btn-border" onClick={() => {
                        setSinglePost(post)
                        setModalVisible(true)
                      }}>
                        閱讀
                      </button>
                    </div>
                  </div>
                ))
              ))
              :
              <NoData />
          }

          {
            modalVisible && (
              <PostModal
                modalVisible={modalVisible}
                singlePost={singlePost}
                closeModal={closeModal}
                giveGood={giveGood}
              />
            )
          }
        </div>
      </div>
    </>
  )
}