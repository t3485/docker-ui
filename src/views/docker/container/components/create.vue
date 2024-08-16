<script lang="ts" setup>
import { type CreateOrUpdateContainerData, type ImageData } from "@/api/docker/types/docker";
import { getImageDataApi } from "@/api/docker"
import { ref, watch } from "vue"
import { type FormRules } from "element-plus"

interface Props {
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: true
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'ok', value: CreateOrUpdateContainerData): void
}>()

const imageData = ref<ImageData[]>([])

const formData = ref<CreateOrUpdateContainerData>({
  name: "",
  image: "",
  network: "bridge"
})
const formRules: FormRules<CreateOrUpdateContainerData> = {
  name: [{ required: true, trigger: "blur", message: "请输入名称" }],
  image: [{ required: true, trigger: "blur", message: "请选择" }]
}

const handleClose = () => {
  clear()
  emit("cancel")
}

const handleOk = () => {
  emit('ok', formData.value)
  clear()
}

const clear = () => {
  formData.value = {
    name: "",
    image: "",
    network: "bridge"
  }
}

watch(() => props.visible, (value, oldValue) => {
  if (value) {
    getImageDataApi().then((data) => {
      imageData.value = data.data
    })
  }
})

</script>

<template>
  <el-dialog v-model="props.visible" title="创建容器" width="30%" @close="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="center">
      <el-form-item prop="name" label="名称：">
        <el-input v-model="formData.name" size="large"/>
      </el-form-item>
      <el-form-item prop="image" label="镜像：">
        <el-select v-model="formData.image" size="large">
          <el-option v-for="item in imageData" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="network" label="网络：">
        <el-select v-model="formData.network" size="large">
          <el-option label="Bridge" value="bridge"/>
          <el-option label="Host" value="host"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="port" label="端口绑定：" v-show="formData.network !== 'host'">
        <el-col :span="11">
          <el-input size="large" placeholder="主机" v-model="formData.hostExpose"/>
        </el-col>
        <el-col :span="2" class="text-center" >-</el-col>
        <el-col :span="11">
          <el-input size="large" placeholder="容器" v-model="formData.containerExpose"/>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleOk">确认</el-button>
    </template>
  </el-dialog>

</template>
