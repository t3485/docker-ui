import { request } from "@/utils/service"
import type * as Table from "./types/docker"
import { ContainerLogData } from "./types/docker"

export function getContainerDataApi() {
  return request<Table.GetContainerResponseData>({
    url: "container/list",
    method: "get"
  })
}

/** 增 */
export function createContainerDataApi(data: Table.CreateOrUpdateContainerData) {
  return request({
    url: "container/create",
    method: "post",
    data
  })
}

/** 删 */
export function deleteContainerDataApi(id: string) {
  return request({
    url: `container/delete/${id}`,
    method: "post"
  })
}

export function startContainerDataApi(id: string) {
  return request({
    url: `container/${id}/start`,
    method: "post"
  })
}

export function stopContainerDataApi(id: string) {
  return request({
    url: `container/${id}/stop`,
    method: "post"
  })
}

export function restartContainerDataApi(id: string) {
  return request({
    url: `container/${id}/restart`,
    method: "post"
  })
}

export function logContainerDataApi(id: string, stdout: boolean, stderr: boolean) {
  return request<ApiResponseData<ContainerLogData[]>>({
    url: `container/${id}/log`,
    method: "get",
    params: { stdout, stderr }
  })
}

/** 改 */
export function updateContainerDataApi(data: Table.CreateOrUpdateContainerData) {
  return request({
    url: "container/update/" + data.id,
    method: "post",
    data
  })
}

export function updateContainerImageApi(data: Table.UpdateContainerImageData) {

  const formData = new FormData()
  if (data.file === undefined) {
    throw "文件为空"
  }
  formData.append("file", new Blob([data.file], { type: data.file.type }))

  return request({
    url: "container/updateImage/" + data.id,
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function getImageDataApi() {
  return request<Table.GetImageResponseData>({
    url: "image/list",
    method: "get"
  })
}

/** 增 */
export function createImageDataApi(data: Table.CreateImageDataByFile) {
  return request({
    url: "image/createByFile",
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/** 删 */
export function deleteImageDataApi(id: string) {
  return request({
    url: `image/delete/${id}`,
    method: "post"
  })
}

/** 改 */
export function updateImageDataApi(data: Table.CreateOrUpdateImageDataByFile) {
  return request({
    url: "image/updateByFile/" + data.id,
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}