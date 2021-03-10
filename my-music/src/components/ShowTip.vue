<template>
  <div class="show-tip">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'ShowTip'
}
</script>

<style lang="less">
.show-tip {
    width: 100%;
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    background-color: #eeeff0;
    color: #666;
    font-size: 12px;
}
</style>