import { DragEvent, useEffect, useState } from "react"
import OverlayComponent from "./OverlayComponent"
import { BoxType } from "../utils/globalTypes"

const DragAndDrop = () => {
  const [boxes, setBoxes] = useState<BoxType[]>([])

  const saveArrayToBrowser = (key: string, array: BoxType[]) => {
    localStorage.setItem(key, JSON.stringify(array)) // Convert the array to a string
  }

  const getArrayFromBrowser = (key: string) => {
    const storedArray = localStorage.getItem(key)
    return storedArray ? JSON.parse(storedArray) : [] // Parse back to an array
  }

  const fetchPosts = () => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data) => {
        setBoxes(data)
        saveArrayToBrowser("cards", data)
      })
  }
  useEffect(() => {
    const retrievedArray = getArrayFromBrowser("cards")

    if (retrievedArray.length > 0) {
      setBoxes(retrievedArray)
    } else fetchPosts()
  }, [])

  const addPost = () => {
    fetch("/api/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: `new draft ${boxes.length + 1}`,
        title: `new draft ${boxes.length + 1}`,
        imgUrl: "../src/assets/camp.jpg",
        position: boxes.length + 1,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts()
      })
  }

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        setOpenOverlay(false)
        setActiveBox(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const [draggedItem, setDraggedItem] = useState<null | BoxType>(null)

  const [openOverlay, setOpenOverlay] = useState<boolean>(false)
  const [activeBox, setActiveBox] = useState<null | BoxType>(null)

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    item: { type: string; title: string; position: number; imgUrl: string }
  ) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: {
    preventDefault: () => void
    dataTransfer: { dropEffect: string }
  }) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropZoneIndex: number) => {
    e.preventDefault()
    if (!draggedItem) return

    const updatedBoxes = [...boxes]
    const draggedIndex = updatedBoxes.findIndex(
      (b) => b.position === draggedItem.position
    )

    const [removed] = updatedBoxes.splice(draggedIndex, 1)
    updatedBoxes.splice(dropZoneIndex, 0, removed)

    setBoxes(updatedBoxes)
    saveArrayToBrowser("cards", updatedBoxes)
    setDraggedItem(null)
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "4fr 4fr 4fr",
        columnGap: "15rem",
        rowGap: "1rem",
      }}
    >
      {boxes.map((box, index) => (
        <div
          key={box.position}
          id="card-container"
          draggable
          onDragStart={(e) => handleDragStart(e, box)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            border: "2px solid #333",
            textAlign: "center",
            cursor: "grab",
            color: "ActiveCaption",
            fontSize: "2rem",
            width: "100%",
            backgroundColor: "teal ",
            padding: "2rem",
            borderRadius: "1rem",
          }}
          onClick={() => {
            setOpenOverlay(!openOverlay)
            setActiveBox(box)
          }}
        >
          <div id="image">
            <img
              alt="img-broken"
              src={box.imgUrl}
              width={200}
              height={200}
              style={{
                borderRadius: "100%",
                backgroundColor: "black",
              }}
            />
          </div>

          <div id="title">{box.title}</div>
        </div>
      ))}
      <div
        style={{
          backgroundColor: "thistle",
          width: "100%",
          height: "2rem",
          padding: "1rem",
          cursor: "pointer",
          color: "black",
          fontWeight: "bold",
        }}
        onClick={() => {
          addPost()
        }}
      >
        ADD DEMO CARD
      </div>
      <OverlayComponent
        data={activeBox}
        open={openOverlay}
        key={activeBox?.position}
      />
    </div>
  )
}

export default DragAndDrop
