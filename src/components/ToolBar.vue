<template>
  <div class="tool__list">
    <div class="tool__item"
         v-for="(item,index) in toolbar" :key="index"
         @click="toolOperate(item)">
      <i class="iconfont" :class="toolbarConfig[item].icon"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'toolbar',
    data() {
      return {
        toolbarConfig: {
          bold: {
            icon: 'iconjiacu',
          },
          bgColor: {
            icon: 'iconbeijingyanse'
          },
          sub: {
            icon: 'iconzitixiabiao'
          },
          sup: {
            icon: 'iconzitishangbiao'
          },
          underline: {
            icon: 'iconxiahuaxian'
          }
        }
      }
    },
    props: {
      toolbar: {
        type: Array,
        default: function () {
          return ['bold', 'bgColor', 'sub', 'sup', 'underline']
        }
      }
    },
    methods: {
      toolOperate(type) {
        this.$emit('command', type)
        switch (type) {
          case 'sub':
            break
          case 'sup':
            break
          case 'bgColor':
            break
          case 'underline':
            break
          default:
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .tool__list {
    display: flex;
    border: 1px solid #eee;
  }

  .tool__item {
    padding: 10px;
    &:hover {
      background-color: #eee;
    }
  }
</style>
