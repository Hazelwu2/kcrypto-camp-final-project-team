import ItemImg from '../../assets/images/section2-item.png'

export const Section2 = () => {
  return (
    <section className="section2">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 flex-justify">
            <img className="img-fluid" src={ItemImg} alt="Item" />
          </div>
          <div className="col-sm-12 col-md-6 flex-justify m-auto">
            <div className="title linear-text">
              可信任的資訊提供平台 <br />
              代幣政策<br />
              紀念NFT<br />
              每月票選最佳文章
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}