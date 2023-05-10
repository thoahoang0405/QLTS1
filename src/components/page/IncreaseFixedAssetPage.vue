<template>
  <div class="body">
    <div class="body-header">
      <h2>{{info.title}}</h2>
      <div class="button-function">
        <div class="add">
          <button class="btn-add btn-hover-blue" @click="showForm">{{ info.btnAdd }}</button>
        </div>
        <div class="control-item" v-outside="closeControll">
          <div
            class="icon icon-left-header"
            :class="
              mode == 'hori' ? 'icon-mode-horizontal' : 'icon-mode-vertical'
            "
          >
            <div v-if="mode == 'hori'" class="tooltip-icon">{{ info.horizontalMode }}</div>
            <div v-if="mode == 'verti'" class="tooltip-icon">
             {{ info.verticalMode }}
            </div>
          </div>
          <div class="icon icon-down2" @click="showMode = !showMode"></div>
          <div class="menu-mode" v-show="showMode">
            <div
              :mode="horizontal"
              class="item-menu-mode"
              @click="chooseModeHorizontal"
            >
              <div class="icon icon-mode-horizontal"></div>
              <div class="content-mode">{{ info.horizontalMode }}</div>
            </div>
            <div class="item-menu-mode" @click="chooseModeVertical">
              <div class="icon icon-mode-vertical"></div>
              <div class="content-mode">  {{ info.verticalMode }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <splitpanes
      style="height: calc(100% - 30px)"
      horizontal
    
    >
      <pane :size="masterSize" min-size="0" max-size="100">
        <div class="body-item-top">
          <div class="item-header">
            <div class="input">
              <input
                type="text"
                class="search"
                v-model="text"
                @keypress.enter="onclickSearch"
                :placeholder="srcPlaceHolder.PlaceHolderIncreaseSearch"
              />
              <div class="icon-search icon"></div>
            </div>
            <div class="icon-function">
              <div v-if="listIncrement.length > 1" class="btn-deleted">
                <div  @click="onClickDeleteMultiple" class="icon icon-delete"></div>
                <div class="delete">Xóa</div>
              </div>
              <div class="icon icon-print"></div>
              <div class="icon icon-more"></div>
            </div>
          </div>
          <Table
            @deleteOne="deleteIncrementOne"
            @listIncrement="listSelectedIncrement"
            @modeEdit="formModeDetail"
            :txtSearch="search"
            @idSelected="IdVoucher"
            @load="loadInrement"
            @search="keySearchRequired"
          ></Table>
        </div>
      </pane>

      <pane :size="detailSize" min-size="0" max-size="100"> 
        <div class="body-item-bottom">
          <div class="item-header">
            <h3>{{ info.detail }}</h3>
            <div
              style="margin-top: 10px; margin-bottom: 10px;"
              class="icon"
              :class="!fullDetail ? 'icon-zoomout' : 'icon-zoomin'"
              @click="detailFullSize"
            ></div>
          </div>
          <TableBottom :listSelected="idSelected" :keySearch="key"></TableBottom>
        </div>
      </pane>
    </splitpanes>
  </div>
 
  <FormAdd
    v-if="isShowFormAdd"
    :idVoucherSelect="idSelected"
    :itemSelect="incrementSelect"
    :modeDetail="formMode"
    :title="formTitle"
    @loadData="loadInrement"
    @hideFormAdd="closeFormAdd"
  ></FormAdd>
  <Popup
    v-if="isShowPopup"
    @hidePopup="hidePopup"
    :msg="msgDelete"
    @loadData="loadData"
    :name="btnName"
    :btnLeft="btnNameLeft"
    :close="closeStatus"
    @isDelete="deleted"
    :item="itemDelete"
  ></Popup>
  
</template>
<script>
import Table from "../base/BaseTable.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import TableBottom from "../base/BaseTableBottom.vue";
import FormAdd from "../base/BaseIncrementAdd.vue";
import Popup from "../base/BasePopup.vue";
import {FormIncrement} from "../../js/common/form"
import {
  URL_FixedAssetDetail,
  URL_FixedAssetIncrements,
} from "@/js/common/urlAsset";
import {
  // ErrorMsg,
  btnPopup,
  // TitlePopup,
  NoticeMsg,
  Msg,
  PlaceHolder,
} from "../../js/common/resource";
import { CloseST, FormDetailMode } from "../../js/common/enumeration";
import axios from "axios";
import { useToast } from "vue-toastification";
export default {
  components: {
    Table,
    Splitpanes,
    Pane,
    TableBottom,
    FormAdd,
    Popup,
  },

  data() {
    return {
      itemDelete: "",
      btnNameLeft: "",
      closeStatus: 0,
      msgDelete: "",
      btnName: "",
      isShowPopup: false,
      isShowFormAdd: false,
      showMode: false,
      srcPlaceHolder: PlaceHolder,
      masterSize: 67,
      detailSize: 35,
      info:FormIncrement,
      mode: "hori",
      fullDetail: false,
      listIncrement: [],
      idSelected:"",
      text: "",
      search: "",
      formMode: FormDetailMode.Add,
      formTitle: "",
      incrementSelect: {},
      idSeletedDetele: {},
      listIdAsset: [],
      key:"",
      listDelete:{
        listIncrementDeleted:[],
        listFixedAssetUpdate:[],
      }
    };
  },
  watch: {
    text: function (data) {
      if (data == "") {
        this.search = data;
      }
    },
  },
  methods: {
     /**
     * click xóa 1
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    deleteIncrementOne(value) {
      this.idSeletedDetele = value;
      this.showPopup(true);
      this.msgDelete = NoticeMsg.ConfirmDelet;
      this.closeStatus = CloseST.DeleteOne;
      this.btnName = btnPopup.Delete;
      this.btnNameLeft = btnPopup.No;
      this.itemDelete = value.voucher_code;
      this.getByVoucher(value);
    },
    keySearchRequired(value){
      this.key=value
    },
     /**
     * mở popup xóa
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    showPopup(value) {
      this.isShowPopup = value;
    
    },
     /**
     * đóng  popup xóa
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    hidePopup(value){
      this.isShowPopup = value;
      this.listIncrement=[]
      this.listDelete.listFixedAssetUpdate=[]
      this.listDelete.listIncrementDeleted=[]
      this.emitter.emit("loadDataIncrement");

    },
     /**
     * ấn nút xóa ở popup gọi hàm xóa
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    deleted() {
      this.showPopup(false);
        if(this.listIncrement.length>1){
          this.deleteMulti()
        }else{
          if(this.idSeletedDetele){

            const toast = useToast();
            var me = this;
            axios({
              url: `${URL_FixedAssetIncrements}/Increment?id=${this.idSeletedDetele.voucher_id}`,
              method: "delete",
              data: this.listIdAsset,
            })
              .then(function (res) {
                console.log(res);
                toast.success(Msg.DeleteSucces, { timeout: 2000 });
                me.load();
           
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
    },
    /**
     *  xóa nhiều chứng từ
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    deleteMulti(){
      const toast = useToast();
      var me = this;
      axios({
        url: `${URL_FixedAssetIncrements}`,
        method: "delete",
        data: this.listDelete,
      })
        .then(function () {
          toast.success(Msg.DeleteSucces, { timeout: 2000 });
          me.load();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     /**
     * load lại dữ liệu ở bảng
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    load() {
      this.emitter.emit("loadDataIncrement");
    },
   /**
     * ấn nút xóa nhiều
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    onClickDeleteMultiple() {
      if(this.listIncrement.length  > 1 )
         {       
          this.showPopup(true);
          this.itemDelete = this.listIncrement.length + " tài sản";
          this.msgDelete = NoticeMsg.ConfirmDelet;
          this.closeStatus = CloseST.DeleteMulti;
          this.btnNameLeft = btnPopup.No;
          this.btnName = btnPopup.Delete;
          for(const item of this.listIncrement){
            this.listDelete.listIncrementDeleted.push(item.voucher_id)
            this.getByVoucher(item)
          }
        }
     
    },
     /**
     *  lấy danh sách tài sản của chứng từ được chọn
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    getByVoucher(value) {
      var me = this;
      axios
        .get(
          `${URL_FixedAssetDetail}/Detail?listId=${value.voucher_id}`
        )
        .then(function (res) {
          if (res.data.length > 0) {
            for (const item of res.data) {
              me.listIdAsset.push(item.fixed_asset_id);
              me.listDelete.listFixedAssetUpdate.push(item.fixed_asset_id)
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /** nhận đối tượng chọn sửa từ bảng sang 
     * khi ấn thêm
    */
    formModeDetail(data1, data2, increment) {
      this.formMode = data1;
      this.formTitle = data2;
      this.incrementSelect = increment;
      console.log(increment);
      this.isShowFormAdd = true;
    },
     /**
     *  ấn nút search
     * AUTHOR: HTTHOA(26/04/2023)
     *
     **/
    onclickSearch() {
      this.search = this.text;
    },

    /**
     * lấy id chứng từ
     * AUTHOR: HTTHOA(18/4/2023)
     */
    IdVoucher(value) {
      if(value ==""){
        this.idSelected=""
      }else{

        this.idSelected = value;
      }
      if (this.detailSize == 0) {
        this.detailSize = 35;
        this.masterSize = 67;
      }
    },
    /**
     * lấy danh sách các  chứng từ để xóa nhiều
     * AUTHOR: HTTHOA(18/4/2023)
     */
    listSelectedIncrement(value) {
      this.listIncrement = value;
    },
    /**
     * đóng form thêm mới
     * AUTHOR: HTTHOA(18/4/2023)
     */
    closeFormAdd(value) {
      this.isShowFormAdd = value;
    },
    /**
     * đóng control điều khiển màn hình ngang dọc
     * AUTHOR: HTTHOA(18/4/2023)
     */
    closeControll() {
      this.showMode = false;
    },
    /**
     * set giá trị khi cho màn hình chi tiết full màn
     * AUTHOR: HTTHOA(18/4/2023)
     */
    detailFullSize() {
      this.fullDetail = !this.fullDetail;
      if (this.fullDetail == true) {
        this.masterSize = 0;
        this.detailSize = 100;
        this.mode = "verti";
      } else {
        this.masterSize = 67;
        this.detailSize = 35;
        this.mode = "hori";
      }
    },
    /**
     * chọn giao diện dọc
     * AUTHOR: HTTHOA(18/4/2023)
     */
    chooseModeVertical() {
      this.masterSize = 100;
      this.detailSize = 0;
      this.mode = "verti";
      this.closeControll();
    },
    /**
     * chọn giao diện ngang
     * AUTHOR: HTTHOA(18/4/2023)
     */
    chooseModeHorizontal() {
      this.masterSize = 65;
      this.detailSize = 35;
      this.mode = "hori";
      this.closeControll();
      this.fullDetail = false;
    },
    showForm() {
      this.isShowFormAdd = !this.isShowFormAdd;
      this.formMode = FormDetailMode.Add;
      this.formTitle = FormIncrement.titleForm;
    },
  },
};
</script>
<style scope>
@import url(../../css/page/increase.css);
/* .body-item-bottom .item-header .ic{

} */

.item-header[data-v-45ea0361] {
    margin-top: 10px;
    margin-bottom: 16px;
}
.body-item-top #table{
  position: relative;
  height: calc(100% - 70px);
}
.body-item-bottom .table {
  position: relative;
  height: calc(100% - 25px);
}
.body-item-bottom .table {
  height: calc(100% - 74px);
  overflow-y: auto;
  width: 100%;
}
.body-header {
  margin-bottom: 0px !important;
}
.table {
  height: 100%;
}
</style>
