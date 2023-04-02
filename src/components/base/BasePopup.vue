<template>
  <div id="popup">
    <div class="popup">
      <div class="popup-body">
        <div class="icon-popup">
           <div class="icon icon-warning"></div>
        </div>
       
        <div class="content-popup">
          <span>   <strong v-if="closeStatus==3 ||closeStatus==4">{{ item }}</strong> </span>
          {{ msg }}
        </div>
      </div>
      <div class="popup-footer">
        <button v-if="closeStatus==1||closeStatus==3||closeStatus==4||closeStatus==6 " class="no btn-hover-outline" @click="onClickBtnNo">
      {{ btnLeft }}
        </button>
        <button v-if="closeStatus==6 " class="no-save" @click="onclickNoSave">
        Không Lưu
        </button>
        <button  class="cancel btn-hover-blue" @click="onClickCancel">
         {{ name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closeStatus: 0,
    };
  },
  watch: {
    close:function(value){
      this.closeStatus=value
  
    }
  },
  props:["msg","name","close","item","btnLeft"],
  methods: {
    // tắt popup
    onClickBtnNo() {
     
      this.$emit("hidePopup", false);
    },
    onclickNoSave(){
      this.$emit("hidePopupAndForm",false)
    },
    //tắt popup, form
    onClickCancel() {
      console.log(this.closeStatus);
     
      if(this.closeStatus == 2 || this.closeStatus==7){
       
        this.$emit("hidePopup",false)
     }
     else if(this.closeStatus == 3||this.closeStatus == 4){
       
       this.$emit("isDelete",false)}
       else if(this.closeStatus==6){
        this.$emit("saveAndHideForm",false)
       }
    // else if(this.closeStatus == 4){
      
    //    this.$emit("isDelete",false)
    //   } 
     
      else{
        this.$emit("hidePopupAndForm", false);
       
      }
    
      
    },
  },
  created() {
  },
};
</script>
<style>
.no-save{
  color:#1aa4c8;
  background-color: #fff;
  border: 1px solid #1aa4c8;
  margin-left: 12px;
}
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
  font-size: 13px;
  width: 450px;
  min-height: 200px;
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
 
  justify-content: flex-start;
  margin-left: 10px;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
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
  margin-left: 12px;
}
.popup .icon-warning {
  background-repeat: no-repeat;
  width: 50px;
}
.btn-hover-blue:focus,
.btn-hover-blue:hover {
  background-color: #0062cc;
}
.no-save:focus,
.no-save:hover,
.btn-hover-outline:focus,
.btn-hover-outline:hover {
  background-color: #1aa4c8;
  color: #fff;
  border: none;
}
</style>
