/** * @description: 搜索组件 */
<template>
  <div class="search" :class="{ showSelect: show }">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    ></svg-icon>
    <el-select
      ref="searchSelect"
      class="select"
      v-model="search"
      remote
      filterable
      :remote-method="querySearch"
      default-first-option
      placeholder="请输入关键词"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :label="item.title.join(' > ')"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
export default {
  components: {},
  data() {
    return {
      show: false,
      search: "",
      options: [],
      searchPool:[],
      fuse:null,
    };
  },
  computed:{
    routes(){
      return this.$store.getters.permission_routes;
    },
    searchSelect(){
      return this.$refs.searchSelect;
    }
  },
  watch: {
    routes(){
      this.searchPool=this.generateRoutes(this.routes);
    },
    searchPool(newVal){
      this.initFuse(newVal);
    },
    show(value){
      if(value){
        document.body.addEventListener('click',this.close);
      }else{
        document.body.removeEventListener('click',this.close);
      }
    }
  },
  mounted() {
    this.searchPool=this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if(this.show){
        this.searchSelect&&this.searchSelect.focus();
      }
    },
    querySearch(query) {
      if(query!==''){
        this.options=this.fuse.search(query).map(item=>item.item);
      }else{
        this.options=[];
      }
    },
    change(val) {
      this.$router.push(val.path);
      this.search='';
      this.options=[];
      this.$nextTick(()=>{
        this.show=false;
      });
    },
    close(){
      this.searchSelect&&this.searchSelect.blur();
      this.options=[];
      this.show=false;
    },
    initFuse(list){
      this.fuse=new Fuse(list,{
        shouldSort:true,
        threshold:0.4,
        location:0,
        distance:100,
        maxPatternLength:32,
        minMatchCharLength:1,
        keys:[
          {
            name:'title',
            weight:0.7
          },{
            name:'path',
            weight:0.3
          }
        ]
      });
    },
    /**
     * @description: 构造路由数据结构
     * *数据结构：
     *  {
     *    path:'',
     *    title:[],
     *  }
     */
    generateRoutes(routes,basePath='/',prefixTitle=[]){
      let res=[];
      for(const router of routes){
        if(router.hidden){continue};
        const data={
          path:path.resolve(basePath,router.path),
          title:[...prefixTitle]
        };
        if(router.meta&&router.meta.title){
          data.title=[...data.title,router.meta.title];
          if(router.redirect!=='noRedirect'){
            res.push(data);
          }
        }
        if(router.children){
          const tempRoutes=this.generateRoutes(router.children,data.path,data.title);
          if(tempRoutes.length>=1){
            res=[...res,...tempRoutes];
          }
        }
      }
      return res;
    }
  },
};
</script>

<style lang="scss" scoped></style>
