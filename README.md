<h1 align="center">
  🦄 TrustNews Dao
</h1>
<p align="center">The Best Socialfi News Platform</p>
<p align="center">便捷、去中心化，為值得信任的資訊提供平台</p>

<p align="center">
  <img src="./cover.png" width="700px">
  <img src="./PostListCover.png" width="700px">
</p>

<p align="center">
    <a href="https://hazelwu2.github.io/kcrypto-camp-final-project-team/" target="blank">Online Demo</a>
    ·
     <a href="https://hiippo.gitbook.io/trustnews-dao/" target="blank">白皮書</a>
    ·
    <a href="https://www.figma.com/file/dmekLLaoDZx0mD3BkL4Uoz/KcryptoCamp-TrustNews-Dao?node-id=17%3A3">Figma</a>
    ·
    <a href="https://whimsical.com/team-6-Y2HMTy6LPtn1fpnQtt3XWu">Whimsical</a>
</p>

為了解決傳統媒體的信任機制，以及Web3資訊過量，難以取得正確且即時的重要訊息。<br>
TrustNews Dao 是基於web3社群機制的鏈上媒體平台，希望同時解決傳統媒體平台資訊難以朔源，而提供正確有效的媒體人、KOL難以將資訊的分享直接變現，同時用戶可以藉由此平台輕鬆追蹤web3每天發生的大小事，畢竟幣圈一天人間一年，希望靠著系統性的整理資訊，提供資訊傳遞者適當的報酬，創造一個用戶可以信任，資訊傳遞者可以獲得回報的一個web3資訊交流平台。
<br>
嘗試利用代幣經濟製造一個用用戶與社群間的正向互動模式，並且藉由去中心化自治的途徑，逐步發展成為值得信任的自治性組織TrustNews Dao。

## 🚤 Purpose
### 👩‍👩‍👧‍👧 成為可信任的資訊提供平台
建立具有媒體認證機制的撰文平台，提供媒體人，KOL建立個人風格的撰文平台，且容易分類，追蹤系列撰文。例如可建立：BAYC系列、CloneX系列、以太幣交易系列、網格交易系列...等等，使得資訊方容易管理，閱讀方容易跟隨系列文章。
### ✍️ Phase1
- 代幣政策
- 紀念NFT用途
### ✍️ Phase 2
- 串連web3平台
- 建立互動式平台
- 開啟撰文者權限
- 建立更完善的項目分類
### ✍️ Phase 3
- 建立聊天討論區
- 降低項目方實際作用
### ✍️ Phase 4
TrustNews Dao 完全自治

[🧐 更多說明](https://hiippo.gitbook.io/trustnews-dao/)


## 🛠️ 開發
本專案分為 Solidity 智能合約、前端開發。
- 智能合約：scaffold-eth/packages/hardhat
- 前端Dapp：frontend

### 📱 Dapp
Install
```
$ cd frontend
$ yarn install && yarn start
```
📱 開啟 `http://localhost:3000/kcrypto-camp-final-project-team` ，便可看到 Dapp 開發環境<br>
👨🏼‍💻 開啟 .env 設定 REACT_APP_INFURA_ID，可到 [Infura](https://infura.io/) 申請 Project 取得 ID

Build
```
$ yarn deploy
```
👨🏼‍💻 部署設定 `package.json` 設定 `homepage` 成 GithubPage 網址<br>
👨🏼‍💻 根據專案編譯後的 `build` 資料夾，部署到 remote hazel，開啟 `frontend/package.json` 找到 `scripts.deploy` 將 `--repo hazel` 改成你要 deploy 的 repo

### 👨‍💻 Solidity
Install
```
$ cd scaffold-eth
$ yarn install
$ yarn upload
$ yarn chain
```


Deploy Contract
```
$ yarn compile
$ yarn deploy
```
### 👨‍💻 Develop Contract & Test Connect Contract in Dapp
開發合約及部署，最後在 Dapp 調試步驟

```
1. 在 `scaffold-eth/packages/hardhat/contracts` 新增合約 xxx.sol
2. 在 `scaffold-eth/packages/hardhat/deploy` 新增部署
3. $ yarn deploy
4. `frontend/config/contract.js` 引入合約 Address 及 abi json
5. 在 Dapp `frontend/src/components/GetToken.tsx` 進行串接調試合約
```

## ☕ Reference
本專案使用到以下工具
- [Hardhat](https://hardhat.org/getting-started/)
- [React Hook Wagmi](https://wagmi.sh/)
- [Scaffold-Eth](https://github.com/scaffold-eth/scaffold-eth)
- [IPFS](https://ipfs.io/)

## ☝ 編輯歷程

|版本|編輯時間|編輯人|說明|
|:---|:---|:---|:---|
|v1|2022/04/04|Hazel|Readme加上環境安裝指令|
|v0|2022/03/13|Osmond|白皮書初版|


###### tags: `期末報告` `2期第6組`
