export type BoxType = {
  type: string
  title: string
  position: number
  imgUrl: string
}

export type Props = {
  open: boolean
  data: null | BoxType
}

export type AddCardParams = {
  type: string
  title: string
  imgUrl: string
  position: string
}

export type AddCardRequestBody = {
  type: string
  title: string
  imgUrl: string
  position: string
}

export type AddCardResponseBody = {
  type: string
  title: string
  imgUrl: string
  position: string
}
