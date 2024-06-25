import { request } from "@/utils/service"
import type * as Table from "./types/docker"

export function getContainerDataApi() {
  return request<Table.GetContainerResponseData>({
    url: "docker/container/list",
    method: "get"
  })
}

/** 增 */
export function createContainerDataApi(data: Table.CreateOrUpdateContainerData) {
  return request({
    url: "docker/container/create",
    method: "post",
    data
  })
}

/** 删 */
export function deleteContainerDataApi(id: string) {
  return request({
    url: `docker/container/delete/${id}`,
    method: "post"
  })
}

/** 改 */
export function updateContainerDataApi(data: Table.CreateOrUpdateContainerData) {
  return request({
    url: "docker/container/update/" + data.id,
    method: "post",
    data
  })
}

export function getImageDataApi() {
  return request<Table.GetImageResponseData>({
    url: "docker/image/list",
    method: "get"
  })
}

/** 增 */
export function createImageDataApi(data: Table.CreateOrUpdateImageData) {
  return request({
    url: "docker/image/create",
    method: "post",
    data
  })
}

/** 删 */
export function deleteImageDataApi(id: string) {
  return request({
    url: `docker/image/delete/${id}`,
    method: "post"
  })
}

/** 改 */
export function updateImageDataApi(data: Table.CreateOrUpdateImageData) {
  return request({
    url: "docker/image/update/" + data.id,
    method: "post",
    data
  })
}