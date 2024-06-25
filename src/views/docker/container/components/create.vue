<script lang="ts" setup>
import { CreateOrUpdateContainerData, GetImageData } from "@/api/docker/types/docker";
import { ref } from "vue"
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

const imageData = ref<GetImageData[]>([])

const formData = ref<CreateOrUpdateContainerData>({
  name: "",
  image: ""
})
const formRules: FormRules<CreateOrUpdateContainerData> = {
  name: [{ required: true, trigger: "blur", message: "请输入名称" }],
  image: [{ required: true, trigger: "blur", message: "请选择" }]
}

</script>

<template>
  <el-dialog v-model="props.visible" title="创建容器" width="30%">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
      <el-form-item prop="name" label="名称">
        <el-input v-model="formData.name" size="large"/>
      </el-form-item>
      <el-form-item prop="image" label="镜像">
        <el-select v-model="formData.image" size="large">
          <el-option v-for="item in imageData" :key="item.name" :label="item.name" :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="image" label="端口绑定">
        <el-input />
        to
        <el-input />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('cancel')">取消</el-button>
      <el-button type="primary" @click="emit('ok', formData)">确认</el-button>
    </template>
  </el-dialog>

</template>
