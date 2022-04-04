import ItemImg from '../../assets/images/section5-item.png'

export const Section5 = () => {
  return (
    <section className="section5">
      <div className="container">
        <div className="row flex-justify">
          <div className="col-sm-12 col-md-7">
            <div className="info">
              <div className="title linear-text">用行動支持創作者</div>
              <span className="text-left">讓創意能夠盡情揮灑！一起為打造更好的社會及媒體環境努力</span>
              <div className="btn-list">
                <button className="btn btn-border">
                  贊助創作者
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-5">
            <img src={ItemImg} alt="DONATE" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  )
}