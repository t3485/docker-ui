<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { getContainerDataApi, createContainerDataApi, updateContainerDataApi, deleteContainerDataApi, updateContainerImageApi, startContainerDataApi, stopContainerDataApi, restartContainerDataApi } from "@/api/docker"
import { UpdateContainerImageData, type ContainerData, type CreateOrUpdateContainerData } from "@/api/docker/types/docker"
import { type FormInstance, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import Create from "./components/create.vue"
import UpdateFile from "./components/update-file.vue"
import Log from "./components/log.vue"

const loading = ref<boolean>(false)

const createVisible = ref<boolean>(false)
const createContainer = (data: CreateOrUpdateContainerData) => {
  createContainerDataApi(data).then(() => {
    ElMessage.success("操作成功")
    createVisible.value = false
    getTableData()
  })
  .finally(() => {
    loading.value = false
  })
}

const updateImageVisible = ref<boolean>(false)
const handleUpdateImage = (row: ContainerData) => {
  updateImageVisible.value = true
  operatorRow.value = row
}
const updateImage = (data: UpdateContainerImageData) => {
  updateContainerImageApi(data).then(() => {
    ElMessage.success("操作成功")
    updateImageVisible.value = false
    getTableData()
  })
  .finally(() => {
    loading.value = false
  })
}

const handleDelete = (row: ContainerData) => {
  ElMessageBox.confirm(`正在删除：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteContainerDataApi(row.name).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}

const handleStart = (row: ContainerData) => {
  startContainerDataApi(row.name).then(() => {
    ElMessage.success("启动成功")
    getTableData()
  })
}

const handleStop = (row: ContainerData) => {
  stopContainerDataApi(row.name).then(() => {
    ElMessage.success("停止成功")
    getTableData()
  })
}

const handleRestart = (row: ContainerData) => {
  restartContainerDataApi(row.name).then(() => {
    ElMessage.success("重启成功")
    getTableData()
  })
}

const logContainerVisible = ref<boolean>(false)
const handleLog = (row: ContainerData) => {
  logContainerVisible.value = true
  operatorRow.value = row
}

//#region 查
const tableData = ref<ContainerData[]>([])
const searchFormRef = ref<FormInstance | null>(null)

const getTableData = () => {
  loading.value = true
  getContainerDataApi()
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

onMounted(() => {
  getTableData()
})

const operatorRow = ref<ContainerData>({ id: '', name: 'afsd', image: '123', imageID: '', command: '', sstate: '', createdTime: '' })
//#endregion
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="createVisible = true">新增</el-button>
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
          <el-table-column prop="statusLabel" label="状态" align="center" />
          <el-table-column prop="createdTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="400" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleDelete(scope.row)">编辑</el-button>
              <el-button type="primary" text bg size="small" @click="handleLog(scope.row)">日志</el-button>
              <el-button type="primary" text bg size="small" @click="handleStart(scope.row)" v-show="scope.row.status!=='RUNNING'">启动</el-button>
              <el-button type="primary" text bg size="small" @click="handleStop(scope.row)" v-show="scope.row.status==='RUNNING'">停止</el-button>
              <el-button type="primary" text bg size="small" @click="handleRestart(scope.row)" v-show="scope.row.status==='RUNNING'">重启</el-button>
              <el-button type="warning" text bg size="small" @click="handleUpdateImage(scope.row)">更新镜像</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <Create :visible="createVisible" @cancel="createVisible=false" @ok="createContainer"></Create>
    <UpdateFile v-model="operatorRow" :visible="updateImageVisible" @cancel="updateImageVisible=false" @ok="updateImage"></UpdateFile>
    <Log v-model="operatorRow" :visible="logContainerVisible" @ok="logContainerVisible=false"></Log>
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
</style>
