<script lang="ts" setup>

interface Props {
  visible?: boolean,
  txt?: string
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  txt: ''
})

const emit = defineEmits<{
  (e: 'ok'): void
}>()

const handleClose = () => {
  emit("ok")
}
</script>

<template>
  <el-dialog v-model="props.visible" title="容器日志" width="30%" @close="handleClose">
    {{ txt }}
    <template #footer>
      <el-button type="primary" @click="handleClose">确认</el-button>
    </template>
  </el-dialog>

</template>
