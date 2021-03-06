<template>
  <div ref="rightPanel" class="rightPanel" :class="{ show: show }">
    <div class="rightPanel-background" @click='show=false'></div>
    <div class="rightPanel-content">
      <div class="rightPanel-button" @click="show = !show">
        <i :class="show ? 'el-icon-close' : 'el-icon-setting'"></i>
      </div>
      <div class="rightPanel-items">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {addClass,removeClass} from '@/utils'
export default {
  components: {},
  data() {
    return {
      show: false,
    };
  },
  computed:{
    rightPanel(){
      return this.$refs.rightPanel;
    }
  },
  watch: {
    show(value) {
      if(value){
        addClass(document.body,'showRightPanel');
      }else{
        removeClass(document.body,'showRightPanel');
      }
    },
  },
  mounted() {
    this.insertToBody();
  },
  beforeDestroy(){
    this.rightPanel.remove();
  },
  methods: {
    insertToBody(){
      const body=document.querySelector('body');
      body.insertBefore(this.rightPanel,body.firstChild);
    }
  },
};
</script>

