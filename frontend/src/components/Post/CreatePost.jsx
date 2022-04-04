/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import {
  useProvider,
  useAccount,
  useContractWrite,
  useWaitForTransaction
} from "wagmi";
import Swal from 'sweetalert2'
import { ethers } from 'ethers'
import { handleError } from '../../config/handle-error'
// Contract
import { post_contract } from '../../config/contract'
// IPFS
import { ipfs } from '../../config/ipfs'
// Component
import { Header } from '../../components'
import PreloaderGif from '../../assets/images/preloader.gif'


const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const CreatePost = () => {
  const navigate = useNavigate();
  const provider = useProvider()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const onReset = () => {
    form.resetFields();
  };

  const [{ }, postThread] = useContractWrite(
    {
      addressOrName: post_contract.address,
      contractInterface: post_contract.abi,
      signerOrProvider: provider,
    },
    "postThread"
  );

  const [{ data, error, loading: txLoading }, waitForTransaction] = useWaitForTransaction({
    hash: txHash
  })

  const onFinish = async ({ title, description, nickName }) => {

    try {
      let today = new Date()
      today = today.toISOString().split('T')[0]

      const item = JSON.stringify({
        name: title,
        image: [
          {
            authorName: nickName,
            content: description,
            timeStamp: today,
            cover: "https://austingriffith.com/images/paintings/fish.jpg",
          },
        ]
      })
      setLoading(true)

      // 上傳至 IPFS
      const uploaded = await ipfs.add(item)

      console.error('已上傳IPFS: ', uploaded)
      console.error(`[IPFS網址] https://ipfs.io/ipfs/${uploaded.path}`)


      // 給 postThread 的參數
      let bytes32First = ethers.utils.formatBytes32String(uploaded.path.substring(0, 22));
      let bytes32Sec = ethers.utils.formatBytes32String(uploaded.path.substring(22));

      // 呼叫智能合約
      const { data, error } = await postThread({
        args: [bytes32First, bytes32Sec],
        overrides: {
          gasLimit: 203000,
          gasPrice: 60000000000,
        },
      })

      if (data) {
        console.log(data)
        const hash = data.hash
        setTxHash(hash)
      }


      if (error) {
        handleError(error)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  };

  if (loading || txLoading) return <>
    <Header />
    <div className="loading">
      <div>
        <img src={PreloaderGif} />
        <span>
          Loading Data...
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
    Swal.fire({
      icon: 'info',
      title: '交易成功',
      text: `導向回到文章列表，https://rinkeby.etherscan.io/tx/${txHash}`,
    })
    navigate('/posts')
  }

  return (
    <div className="create-post">
      <Header />
      <div className="container">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="nickName"
            label="暱稱"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="文章標題"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="文章內容"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <button className="btn btn-border" type="submit">
              送出
            </button>
            <button className="btn btn-border" onClick={onReset}>
              重置
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

}


export default CreatePost