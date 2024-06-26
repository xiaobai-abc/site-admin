<template>
  <div class="card">
    <!-- 卡片 -->
    <div class="cardHead">
      <h5>
        <slot name="title">{{ title || "标题" }}</slot>
      </h5>
      <slot name="handler"></slot>
    </div>
    <div
      :class="{
        cardContent: isStyle,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";

const props = defineProps({
  title: String,
  isStyle: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.card {
  padding: 16px 20px;
  border-radius: 4px;
  background-color: var(--color-bg-3);
  box-shadow: @boxShadow;
  margin-bottom: 20px;
  .cardHead {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    h5 {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .cardContent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(352px, 1fr));
    column-gap: 70px;
    row-gap: 24px;
    align-items: start;
    margin-bottom: 20px;
  }
  :deep(.input) {
    border: none;
    &.arco-input-focus {
      background-color: #f2f3f5;
    }
  }
}
</style>
