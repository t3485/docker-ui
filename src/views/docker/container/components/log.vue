<script lang="ts" setup>
import { ContainerData, ContainerLogData, GetContainerLog } from '@/api/docker/types/docker';
import { ref, watch } from 'vue';
import { logContainerDataApi } from "@/api/docker"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"

interface Props {
  visible?: boolean
}

const model = defineModel<ContainerData>({ required: true })
const props = withDefaults(defineProps<Props>(), {
  visible: true
})

const log = ref<ContainerLogData[]>([])
const loading = ref(false)
const searchForm = ref<GetContainerLog>({})

const emit = defineEmits<{
  (e: 'ok'): void
}>()

const handleClose = () => {
  emit("ok")
}

const handleLog = () => {
  loading.value = true
  logContainerDataApi(model.value.name, true, false).then(({ data }) => {
    log.value = data
    loading.value = false
  })
}

const resetSearch = () => {
  searchForm.value.stderr = undefined
  searchForm.value.stdout = undefined
}

watch([() => model, () => props.visible], () => {
  if (props.visible) {
    handleLog()
  }
})
</script>

<template>
  <el-dialog v-model="props.visible" title="容器日志" width="80%" @close="handleClose">

    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchForm">
        <el-form-item prop="stdout" label="标准输出">
          <el-switch v-model="searchForm.stdout" />
        </el-form-item>
        <el-form-item prop="stderr" label="错误输出">
          <el-switch v-model="searchForm.stderr" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleLog">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <p v-for="item in log">{{ item.text }}</p>
    </el-card>

    <template #footer>
      <el-button type="primary" @click="handleClose">确认</el-button>
    </template>
  </el-dialog>

</template>
