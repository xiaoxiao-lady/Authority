/**
 * @description: 
 */
<template>
  <component :is='type' v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import {isExternal} from 'utils/validate'
export default {
  name:'AppLink',
  components: {},
  props:{
    to:{
      type:String,
      required:true,
    }
  },
  computed:{
    isExternal(){
      return isExternal(this.to);
    },
    type(){
      if(this.isExternal){
        return 'a'
      }
      return 'router-link'
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
  },
  methods: {
    linkProps(to){
      if(this.isExternal){
        return {
          href:to,
          target:'_blank',
          rel:'noopener'
        }
      }
      return {
        to,
      }

    }
  },
};
</script>

<style lang="scss" scoped></style>
