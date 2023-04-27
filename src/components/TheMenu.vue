
<template>
  <div class="menu">
    <div class="menu-top">
      <router-link to="/" class="brand" @click="activeNumber = -1">
        <div class="icon-logo logo"></div>
        <P class="brand-text" v-if="isZoomOut">MISA QLTS</P>
      </router-link>
      <ul class="navbar">
        <div v-for="item in items" :key="item" class="nav-item">
          <router-link
            class="nav-item-parent"
            @click="
              item.openChild = !item.openChild;
              activeTo = item.to;
            "
            :to="item.to"
            :class="activeTo === item.to ? 'active' : ''"
           :title="!isZoomOut ?item.name:''"
          >
            <div class="icon">
              <div :class="item.icon"></div>
            </div>
            
            <!-- <div class="toolTip" v-if="!isZoomOut"> {{ item.name }}</div> -->
            <div class="nav-item-text" v-if="isZoomOut">{{ item.name }}</div>
            <div class="icon-down" v-if="item.menuItem && isZoomOut"></div>
          </router-link>
          <div class="nav-item-childs" >
             <router-link
              class="nav-item-child"
              v-for="(child, index) in item.menuItem"
              :key="index"
              v-show="item.openChild && isZoomOut"
              :to="child.toItem"
              >
              <div class="text">{{ child.nameItem }}</div>
            </router-link>
          </div>
        </div>
      </ul>
    </div>
    <div class="menu-bottom">
      <button class="btn zoom-in" id="zoom" @click="zoomNavbar">
        <div class="btn-icon center" >
         
          <div  :class="isZoomOut ? 'icon-left' : 'icon-right'"> </div>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isZoomOut: true,
      activeTo: "",
      items: [
        {
          icon: "icon-tivi",
          name: "Tổng quan",    
          dropdown: false,
          to: "/tongquan",
        },
        {
          icon: "icon-oto",
          name: "Tài sản",
          openChild: false,
          dropdown: true,
          to: "/taisan",
            menuItem:[
              {               
                nameItem: "Ghi tăng",
                toItem: "/ghitang",
              },
              {               
                nameItem: "Thay đổi thông tin",
                toItem:"/congcu",
              },
              {              
                nameItem: "Đánh giá lại",
                toItem: "/congcu",
              },
              {
                
                nameItem: "Tính hao mòn",
                toItem: "/congcu",
              },
              {
                
                nameItem: "Điều chuyển tài sản",
                toItem: "/congcu",
              },
              {
                
                nameItem: "Ghi giảm",
                toItem: "/congcu",
              },
              {
                
                nameItem: "Kiểm kê",
                toItem: "/congcu",
              },
              {
                
                nameItem: "Khác",
                toItem: "/congcu",
              },
            ]
        
        },
        {
          icon: "icon-street",
          name: "Tài sản HT-DB",
          dropdown: true,
          to: "/taisanhbdt",
        },
        {
          icon: "icon-tool",
          name: "Công cụ công dụng",
          dropdown: true,
          to: "/congcu",
        },
        {
          icon: "icon-category",
          name: "Danh mục",
          dropdown: false,
          to: "/danhmuc",
        },
        {
          icon: "icon-search-menu",
          name: "Tra cứu",
          dropdown: true,
          to: "/timkiem",
        },
        {
          icon: "icon-report",
          name: "Báo cáo",
          dropdown: true,
          to: "/baocao",
        },
      ],
    };
  },
  methods: {
    /*
    mở rộng thanh menu
    AUTHOR: HTTHOA(23/02/2023)
    */
    zoomNavbar() {
      this.isZoomOut = !this.isZoomOut;
      this.$emit("zoomNavbar");
    },
  },
};
</script>
<style scoped>

.brand-text{
  font-size: 24px;
  font-weight: 700;
}
.menu{
  position: relative;
  
  
}

</style>
