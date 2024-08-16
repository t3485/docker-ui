<script lang="ts" setup>
import { type ImageData, CreateOrUpdateImageDataByFile } from "@/api/docker/types/docker";
import { ref, onMounted } from "vue"
import { UploadFile, UploadRequestOptions, type FormRules } from "element-plus"

interface Props {
  visible?: boolean,
}

const model = defineModel<ImageData>({ required: true })
const props = withDefaults(defineProps<Props>(), {
  visible: true
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'ok', value: CreateOrUpdateImageDataByFile): void
}>()

const formData = ref<CreateOrUpdateImageDataByFile>({
  id: "",
  file: undefined
})
const formRules: FormRules<CreateOrUpdateImageDataByFile> = {
  // file: [{ required: true, trigger: "blur", message: "请输入名称" }]
}
const fileChange = (data: UploadRequestOptions ) => {
  formData.value.file = data.file
}
const filelist = ref<UploadFile[]>([])

const handleClose = () => {
  reset()
  emit("cancel")
}

const handleOk = () => {
  formData.value.id = model.value.id
  const val = Object.assign({}, formData.value)
  reset()
  emit('ok', val)
}

const reset = () => {
  formData.value = { id: "", file: undefined }
  filelist.value = []
}

</script>

<template>
  <el-dialog v-model="props.visible" title="更新镜像" width="30%" @closed="handleClose">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item prop="name" label="名称：">
        <el-input v-model="model.name" size="large" disabled />
      </el-form-item>
      <!-- <el-form-item prop="image" label="基础镜像：">
        <el-select v-model="model.image" size="large" disabled>
          <el-option :label="model.image" :value="model.image"/>
        </el-select>
      </el-form-item> -->
      <el-form-item prop="file" label="文件：">
        <el-upload drag :http-request="fileChange" :limit="1" v-model:file-list="filelist">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 300mb
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleOk">确认</el-button>
    </template>
  </el-dialog>

</template>
