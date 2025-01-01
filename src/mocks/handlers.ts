// import { http, HttpResponse, HttpResponseResolver, PathParams } from "msw"
import { http, HttpResponse } from "msw"
import {
  AddCardParams,
  AddCardRequestBody,
  AddCardResponseBody,
} from "../utils/globalTypes"

const totalCards: AddCardParams[] = [
  {
    type: "bank draft",
    title: "Bank Draft",
    imgUrl: "../src/assets/camp.jpg",
    position: "1",
  },
  {
    type: "bill-of-lading",
    title: "Bill of Lading",
    imgUrl: "../src/assets/clouds.png",
    position: "2",
  },
  {
    type: "invoice",
    title: "Invoice",
    imgUrl: "../src/assets/diamond_1.jpg",
    position: "3",
  },
  {
    type: "bank-draft-2",
    title: "Bank Draft 2",
    imgUrl: "../src/assets/field.jpg",
    position: "4",
  },
  {
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    imgUrl: "../src/assets/winter.jpg",
    position: "5",
  },
]

export const handlers = [
  http.get("/api/cards", () => {
    return HttpResponse.json(totalCards)
  }),

  http.post<
    AddCardParams,
    AddCardRequestBody,
    AddCardResponseBody,
    "/api/cards"
  >("/api/cards", async ({ params, request }) => {
    const { imgUrl, position, title, type } = params

    const commentData = await request.json()
    totalCards.push(commentData)
    return HttpResponse.json({
      type,
      title,
      imgUrl,
      position,
    })
  }),
]
