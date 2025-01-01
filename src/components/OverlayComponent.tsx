import { useState } from "react"
import { Props } from "../utils/globalTypes"

const OverlayComponent = ({ open, data }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)

  const loader = () => {
    return <div className="loader"></div>
  }

  setTimeout(() => {
    setLoading(false)
  }, 1000)
  return (
    <div>
      {open ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 1)",
            display: open ? "block" : "none",
            color: "white",
            width: "90vw",
            height: "90vh",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {loading ? (
            loader()
          ) : (
            <div id="image">
              <img
                alt="img-broken"
                src={data?.imgUrl}
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default OverlayComponent
