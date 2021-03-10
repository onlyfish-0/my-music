<template>
  <div class="borderTitle">
      <h3><slot></slot></h3>
  </div>
</template>

<script>
export default {
    name: 'BorderTitle'
}
</script>

<style lang="less">
.borderTitle {
    h3 {
        margin: 20px 0 15px 0;
        padding-left: 5px;
        border-left: 3px solid #d33a31;
        line-height: 1em;
    }
}
</style>