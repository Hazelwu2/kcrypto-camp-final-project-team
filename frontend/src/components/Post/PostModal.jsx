import Modal from "react-modal";

export const PostModal = (props) => {

  const customStyles = {
    content: {
      background: "transparent",
      position: "relative",
      transform: "translate(-50%, 50%)",
      top: "0%",
      left: "50%"
    },
  };


  return (
    <Modal
      isOpen={props.modalVisible}
      style={customStyles}
      ariaHideApp={false}
      className="modal"
    >
      <div className="modal-container">
        {
          props?.singlePost?.image.map((item, index) => (
            <>
              <div className="title" key={index}>
                <h2>
                  {props?.singlePost.name}
                </h2>
              </div>
              <div className="author-info">
                <div>
                  撰文者錢包：{props.singlePost.owner}
                  <button className="btn btn-border">Donate</button>
                </div>
                <div>
                  <span>{item.timeStamp}</span>
                  <span>撰文人：{item.authorName}</span>
                </div>

              </div>
              <div className="content">
                <span key={index}>{item.content}</span>
              </div>
              <div>
                <button
                  className="btn btn-border"
                  onClick={() => { props.giveGood(props.singlePost.threadId) }}
                >
                  按讚以鼓勵創作者
                </button>
                <button
                  className="btn btn-border"
                  onClick={props.closeModal}>
                  關閉
                </button>
              </div>
            </>
          ))}
      </div>
    </Modal>
  )
}