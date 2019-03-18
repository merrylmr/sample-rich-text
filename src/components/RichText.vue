<template>
  <div>
    <h1>sample Rich Text</h1>
    <div class="rich-test-wrapper">
      <tool-bar @command="doCommand"></tool-bar>
      <div
        contenteditable="true"
        ref="sample-rich-text"
        class="sample-rich-text"
        v-html="content"
        @click="recordLastEditRange"
        @input="recordLastEditRange"></div>
    </div>
  </div>
</template>
<script>
  import ToolBar from './ToolBar.vue'

  export default {
    name: 'rich-text',
    data() {
      return {
        lastEditRange: null,
        lastEditSelection: null,
        content: 'lallalalla测试测试'
      }
    },
    components: {ToolBar},
    methods: {
      /**
       * 记录最后一次光标位置
       */
      recordLastEditRange() {
        let selection = window.getSelection()
        this.lastEditRange = selection.getRangeAt(0)
      },
      /**
       * 插入一个字符
       */
      insertSpecChar(char) {
        this.$refs['sample-rich-text'].focus()
        let selection = window.getSelection()
        if (this.lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges()
          selection.addRange(this.lastEditRange)
        }
        let range = selection.getRangeAt(0)
        range.deleteContents()

        let el = document.createElement('div')
        el.innerHTML = char || 'lmr'
        let frag = document.createDocumentFragment(), node, lastNode
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node)
        }
        range.insertNode(frag)
        if (lastNode) {
          range = range.cloneRange()
          // 移动光标到插入的元素之后
          range.setStartAfter(lastNode)
          range.collapse(true)
          selection.removeAllRanges()
          selection.addRange(range)
        }
        // 记录最后光标对象
        this.lastEditRange = selection.getRangeAt(0)
      },
      /**
       * 工具条操作
       * @param type
       */
      doCommand(type) {
        let selection = window.getSelection()
        if (this.lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          selection.removeAllRanges()
          selection.addRange(this.lastEditRange)
        }
        let txt = selection.toString()
        console.log('txt', txt)
        switch (type) {
          case 'sub':
            document.execCommand('Subscript', false)
            break
          case 'sup':
            console.log('sup')
            document.execCommand('Superscript', false)
            break
          case 'underline':
            document.execCommand('Underline', false, null)
            break
          case 'bold':
            document.execCommand('Bold', false, null)
            break
          case 'bgColor':
            document.execCommand('BackColor', false, 'red')
            break

          default:
            break
        }
      },
    },
  }
</script>

<style scoped>
  .rich-test-wrapper {
    width: 400px;
    height: 300px;
    margin: 0 auto;
  }

  .tool-bar ul {
    /*清除浮动*/
    overflow: hidden;
  }

  .tool-bar ul li {
    float: left;
    list-style: none;
    margin: 0;
    padding: 10px;
    cursor: pointer;
  }

  .sample-rich-text {
    width: 100%;
    height: 100%;
    border: 1px solid #666;
    text-align: left
  }
</style>
