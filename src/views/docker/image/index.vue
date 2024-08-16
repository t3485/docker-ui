<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getImageDataApi, createImageDataApi, updateImageDataApi, deleteImageDataApi } from "@/api/docker"
import { type ImageData, type CreateOrUpdateImageDataByFile, CreateImageDataByFile } from "@/api/docker/types/docker"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { cloneDeep } from "lodash-es"
import UpdateFile from "./components/update-file.vue"
import Create from "./components/create.vue"

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const operatorRow = ref<ImageData>({
  id: '',
  name: 'afsd',
  size: 0,
  createdTime: ""
})

//#region 删
const handleDelete = (row: ImageData) => {
  ElMessageBox.confirm(`正在删除镜像：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteImageDataApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
//#endregion

//#region 增
const createImageVisible = ref<boolean>(false)
const handleCreate = () => {
  createImageVisible.value = true
}
const createImage = (data: CreateImageDataByFile) => {
  createImageDataApi(data).then(() => {
    ElMessage.success("操作成功")
    createImageVisible.value = false
    getTableData()
  })
}
//#endregion

//#region 改
const updateImageVisible = ref<boolean>(false)
const handleUpdate = (row: ImageData) => {
  operatorRow.value = row
  updateImageVisible.value = true
}
const updateImage = (data: CreateOrUpdateImageDataByFile) => {
  updateImageDataApi(data).then(() => {
    ElMessage.success("操作成功")
    updateImageVisible.value = false
    getTableData()
  })
}
//#endregion

//#region 查
const tableData = ref<ImageData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: ""
})
const getTableData = () => {
  loading.value = true
  getImageDataApi()
    .then(({ data }) => {
      tableData.value = data
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="name" label="名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="handleCreate">创建</el-button>
          <el-button type="primary" :icon="Delete">清理</el-button>
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="ver" label="版本" align="center" />
          <el-table-column prop="createdTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">更新</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <UpdateFile v-model="operatorRow" :visible="updateImageVisible" @cancel="updateImageVisible=false" @ok="updateImage" />
    <Create :visible="createImageVisible" @cancel="createImageVisible=false" @ok="createImage" />
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
