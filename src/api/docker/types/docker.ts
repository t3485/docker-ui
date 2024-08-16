

export interface CreateOrUpdateContainerData {
  id?: string
  name: string
  image: string
  network?: string
  hostExpose?: number
  containerExpose?: number
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

export interface CreateImageDataByFile {
  name: string
  file?: File
  dockerfile?: File
}

export interface CreateOrUpdateImageDataByFile {
  id: string
  file?: File
}

export interface ImageData {
  id: string
  name: string
  size: number
  createdTime: string
}

export type GetImageResponseData = ApiResponseData<ImageData[]>

export interface UpdateContainerImageData {
  id: string
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