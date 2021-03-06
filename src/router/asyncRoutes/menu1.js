export default{
  '/menu1':{
    config:{
      name:'menu1'
    },
    meta:{
      title: "菜单一",
      icon: "drag",
    },
  },
  '/menu1Manage':{
    component: () => import("views/menu1/manage.vue"),
    config:{
      name:'manage',
      
    },
    meta:{
      title: "管理",
      icon: "drag",
    }
  },
  '/menu1Add':{
    component: () => import("views/menu1/add.vue"),
    config:{
      name:'add',
    },
    meta:{
      title: "添加",
      icon: "drag",
    }
  },
  '/menu1ManageSon':{
    component: () => import("views/menu1/manage/son.vue"),
    config:{
      name:'menu1ManageSon',
    },
    meta:{
      title: "管理子级",
      icon: "drag",
    }
  }
}