
<template>
  <div class="menu">
    <div class="menu-top">
      <router-link to="/" class="brand" @click="activeNumber = -1">
        <div class="icon-logo logo"></div>
        <h1 class="brand-text" v-if="isZoomOut">MISA QLTS</h1>
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
          >
            <div class="icon">
              <div :class="item.icon"></div>
            </div>
            <!-- <div class="toolTip" v-if="!isZoomOut"> {{ item.name }}</div> -->
            <div class="nav-item-text" v-if="isZoomOut">{{ item.name }}</div>
            <div class="icon-down" v-if="item.dropdown==true && isZoomOut"></div>
          </router-link>
          
        </div>
      </ul>
    </div>
    <div class="menu-bottom">
      <button class="btn zoom-in" id="zoom" @click="zoomNavbar">
        <div class="btn-icon center">
          <div :class="isZoomOut ? 'icon-left' : 'icon-right'"></div>
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
<style>
.toolTip{
  position: absolute;
  background-color: #fff;
  color: #000;
  min-width: 100px;
}
</style>
