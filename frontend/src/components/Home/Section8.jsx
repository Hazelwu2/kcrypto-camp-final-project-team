export const Section8 = () => {
  const phaseList = [
    {
      title: 'Phase 1',
      content: [
        '專案啟動',
        '發行代幣 TNC、TDC',
        '定期投票選出紀念性 NFT',
        '贊助廣告競標機制'
      ]
    },
    {
      title: 'Phase 2',
      content: [
        '串連 Web3 平台 Discord',
        '建立互動式平台',
        '開啟撰文者權限',
        '建立更完善的項目分類'
      ]
    },
    {
      title: 'Phase 3',
      content: [
        '建立聊天討論區',
        '降低項目方實際作用'
      ]
    },
    {
      title: 'Phase 4',
      content: [
        'TrustNews Dao 完全自治'
      ]
    },
  ]

  return (
    <section className="section8">
      <div className="container">
        <div className="info text-center">
          <div className="title linear-text">路線圖</div>
          <span>ROADMAP</span>
        </div>

        <div className="row custom-row text-center">
          {phaseList.map((phase, index) => (
            <div className="col-xs-12 col-sm-3" key={index}>
              <div className="box">
                <h2 className="name title linear-text">{phase.title}</h2>

                <ul>
                  {phase.content.map((item, i) => (
                    <li key={i}>{item}<br /></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}