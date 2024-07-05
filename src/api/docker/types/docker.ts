

export interface CreateOrUpdateContainerData {
  id?: string
  name: string
  image: string
  network?: string
}

export interface ContainerData {
  id: string
  name: string
  image: string
  imageID: string
  command: string
  createdTime: string
  sstate: string
}

export type GetContainerResponseData = ApiResponseData<ContainerData[]>

export interface CreateOrUpdateImageData {
  id?: string
  name: string
}

export interface ImageData {
  id: string
  name: string
  size: number
  createdTime: string
}

export type GetImageResponseData = ApiResponseData<ImageData[]>

export interface UpdateContainerImageData {
  name: string
  file?: File
}

export interface GetContainerLog {
  stderr: boolean
  stdout: boolean
}

export interface ContainerLogData {
  time: string
  text: string
}