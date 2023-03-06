<template>
  <div id="popup">
    <div class="popup">
      <div class="popup-body">
        <div class="icon icon-warning"></div>
        <div class="content-popup">
         {{ msg }}
        </div>
      </div>
      <div class="popup-footer">
        <!-- <button class="no btn-hover-outline" @click="onClickBtnNo">
          Không
        </button> -->
        <button class="cancel btn-hover-blue" @click="onClickCancel">
          Đồng ý
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:["msg"],
  methods: {
    // tắt popup
    onClickBtnNo() {
      console.log(1);
      this.$emit("hidePopup", false);
    },
    //tắt popup, form
    onClickCancel() {
      this.$emit("hidePopup", false);
    },
  },
};
</script>
<style>
#popup {
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 4;
  width: 100%;
  height: 100%;
  margin: auto;
  position: fixed;
  display: flex;

  flex-direction: column;
}
.popup {
  width: 400px;
  height: fit-content;
  background-color: #fff;
  margin: auto;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  /* display: none; */
}
.popup-body {
  display: flex;
  text-align: center;
  margin-top: 24px;
}
#content {
  margin-left: 20px;
  margin-top: 4px;
  text-align: start;
  width: calc(100% - 80px);
}
.content-popup {
  margin-top: 10px;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
.popup-footer button {
  min-width: 110px;
  height: 36px;
  outline: none;
  border-radius: 3px;
}
.popup .no {
  background-color: #fff;
  border: 1px solid #aca8a8;
}
.popup .cancel {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
  margin-left: 24px;
}
.popup .icon-warning {
  background-repeat: no-repeat;
  width: 50px;
}
.btn-hover-blue:focus,
.btn-hover-blue:hover {
  background-color: #0062cc;
}
.btn-hover-outline:focus,
.btn-hover-outline:hover {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
}
</style>
