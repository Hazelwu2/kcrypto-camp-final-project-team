import Icon1 from '../../assets/images/section3-icon1.svg'
import Icon2 from '../../assets/images/section3-icon2.svg'
import Icon3 from '../../assets/images/section3-icon3.svg'

export const Section3 = () => {
  return (
    <section className="section3">
      <div className="container">
        <div className="info">
          <div className="title linear-text">探索更多文章</div>
          <span>Explore the features!</span>
        </div>
        <div className="row flex-justify">
          <div className="col-sm-12 col-md-4 mb-2">
            <div className="box">
              <div className="box-content">
                <img src={Icon1} alt="icon1" />
                <span>最新文章</span>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 mb-2">
            <div className="box">
              <div className="box-content">
                <img src={Icon2} alt="icon2" />
                <span>熱門 Top10</span>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 mb-2">
            <div className="box">
              <div className="box-content">
                <img src={Icon3} alt="icon3" />
                <span>紀念 NFT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}