

export interface CreateOrUpdateContainerData {
  id?: string
  name: string
  image: string
  network?: string
}

export interface GetContainerData {
  id: string
  name: string
  image: string
  imageID: string
  command: string
  createdTime: string
  sstate: string
}

export type GetContainerResponseData = ApiResponseData<GetContainerData[]>

export interface CreateOrUpdateImageData {
  id?: string
  name: string
}

export interface GetImageData {
  id: string
  name: string
  size: number
  createdTime: string
}

export type GetImageResponseData = ApiResponseData<GetImageData[]>

export interface UpdateContainerImageData {
  name: string
  file?: File
}