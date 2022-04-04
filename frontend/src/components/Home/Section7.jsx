import Hazel from '../../assets/images/hazel.png'
import Henry from '../../assets/images/Henry.jpg'
import Archer from '../../assets/images/Archer.jpg'
import Osmond from '../../assets/images/Osmond.jpg'
import David from '../../assets/images/David.jpg'
import Avery from '../../assets/images/Avery.jpg'

export const Section7 = () => {
  const teamList = [
    {
      name: 'Hazel | C0021601',
      avatar: Hazel,
      description: ['Team Leader', 'Front-End Developer']
    },
    {
      name: 'Henry | C0012205',
      avatar: Henry,
      description: ['Smart Contract Developer']
    },
    {
      name: 'Archer | C0021603',
      avatar: Archer,
      description: ['Smart Contract Developer', 'Tokenomic Research']
    },
    {
      name: 'Osmond | C0012204',
      avatar: Osmond,
      description: ['Whitepaper Writer']
    },
    {
      name: 'DavidW | C0021602',
      avatar: David,
      description: ['Project Manager', 'Tokenomic Research']
    },
    {
      name: 'Avery | C0021604',
      avatar: Avery,
      description: ['Smart Contract Developer']
    },
  ]

  const divStyle = (src) => ({
    backgroundImage: 'url(' + src + ')'
  })

  return (
    <section className="section7">
      <div className="container">
        <div className="info text-center">
          <div className="title linear-text">團隊成員</div>
          <span>Our Team</span>
        </div>

        <div className="row flex-justify">
          {teamList.map((item, index) => (
            <div className="col-sm-12 col-md-4 flex-justify" key={index}>
              <div className="box">
                <div
                  className="box-avatar"
                  style={divStyle(item.avatar)}
                />

                <div className="box-content">
                  <h2 className="name title linear-text">{item.name}</h2>

                  {item.description.map((desc, i) => (
                    <span key={i}>{desc}<br /></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}