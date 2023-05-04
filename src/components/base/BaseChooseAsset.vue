<template>
  <div id="form"
    tabindex="0">
    <div class="form increment-form">
      <div class="form-header">
        <h2 id="hd-form">Chọn tài sản ghi tăng</h2>
        <div class="icon icon-close" @click="closeFormChoose">
          <div class="toolipClose">{{ formInfo.btnClose }}</div>
        </div>
      </div>
      <div class="form-body">
        <div class="body-item-bottom">
          <div class="item-header"  style="margin-bottom: 16px">
            <div class="input">
              <input
                type="text"
                class="search"
                v-model="txtSearch"
                @keypress.enter="onclickSearch"

                :placeholder="formInfo.placeholderSearch"
              />
              <div class="icon-search icon"></div>
            </div>
          </div>
          <div id="table">
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <td class="text-center">
                      <input
                        type="checkbox"
                        :checked="listFixedAsset.length == fixedAssets.length"
                        @click="selectedAllItem"
                      />
                    </td>
                    <th class="stt">
                      {{ inforTable.numeric }}
                      <div class="tooltip-stt">Số thứ tự</div>
                    </th>

                    <th class="th-width-180">
                      {{ inforTable.fixed_asset_code }}
                    </th>
                    <th class="th-width-180">
                      {{ inforTable.fixed_asset_name }}
                    </th>
                    <th class="th-width-max">
                      {{ inforTable.department_name }}
                    </th>
                    <th class="th-width-180 text-right">
                      {{ inforTable.cost }}
                    </th>
                    <th class="th-width-180 text-right">
                      {{ inforTable.depreciation_value }}
                    </th>

                    <th class="th-width-180 text-right">
                      {{ inforTable.residualValue }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(asset, index) in fixedAssets"
                    :class="listFixedAsset.includes(asset) ? 'active' : ''"
                    :key="index"
                  >
                    <td class="text-center">
                      <input
                        type="checkbox"
                        :checked="listFixedAsset.includes(asset)"
                        @click="selectItemToList(asset)"
                      />
                    </td>
                    <td class="text-center">{{ index + 1 }}</td>

                    <td class="text-blue">{{ asset.fixed_asset_code }}</td>
                    <td>{{ asset.fixed_asset_name }}</td>
                    <td class="th-width-max">{{ asset.department_name }}</td>
                    <td class="text-right">{{ formatMoney(asset.cost) }}</td>
                    <td class="text-right">{{ formatMoney(asset.depreciation_value) }}</td>  
                    <td class="text-right">{{ formatMoney(asset.cost - asset.impoverishment) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table class="tb-footer">
              <thead>
                <tr
                  style="
                    background: #f5f5f5;
                    border-bottom: 1px solid #e2e2e2;
                    border-top: 1px solid #e2e2e2;
                    height: 45px;
                  "
                >
                  <td colspan="1" style="width: 242px; box-sizing: border-box">
                    <div>
                      <div class="total-record">
                        Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
                      </div>
                    </div>
                  </td>
                  <td colspan="1" style="width: 150px; box-sizing: border-box">
                    <div class="page">
                      <div
                        style="position: relative; cursor: pointer"
                        @click="btnDropUp"
                        v-outside="outsidePage"
                      >
                        <div class="content-page">
                          {{ pageDefault }}

                          <div
                            class="down"
                            :class="isShowPage == true ? 'show' : ''"
                            @click="btnDropUp"
                          >
                            <div class="icon-down-bold icon"></div>
                          </div>
                          <!-- </div> -->
                        </div>
                      </div>
                      <div class="dropup-page">
                        <div class="item-up" v-show="isShowPage">
                          <div
                            class="item-dropup"
                            :class="{ act: isActive == '10' }"
                            pageSize="10"
                            @click="getPageDefault"
                          >
                            10
                          </div>
                          <div
                            class="item-dropup"
                            :class="{ act: isActive == '20' }"
                            :value="pageDefault"
                            pageSize="20"
                            @click="getPageDefault"
                          >
                            20
                          </div>
                          <div
                            class="item-dropup"
                            :class="{ act: isActive == '30' }"
                            pageSize="30"
                            @click="getPageDefault"
                          >
                            30
                          </div>
                          <div
                            class="item-dropup"
                            :class="{ act: isActive == '50' }"
                            pageSize="50"
                            @click="getPageDefault"
                          >
                            50
                          </div>
                          <div
                            class="item-dropup"
                            :class="{ act: isActive == '100' }"
                            pageSize="100"
                            @click="getPageDefault"
                          >
                            100
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <!-- <td
                colspan="1"
                style="
                  width: 150px;
                  box-sizing: border-box;               "
              ></td> -->
                  <td colspan="1" style="width: 150px; box-sizing: border-box">
                    <div>
                      <Paginate
                        v-model="pageNumber"
                        :page-count="totalPage"
                        :page-range="3"
                        :margin-pages="1"
                        :click-handler="clickCallback"
                        :prev-link-class="'page-link'"
                        :prev-text="'<'"
                        :prev-class="'page-item'"
                        :next-link-class="'page-link'"
                        :next-text="'>'"
                        :next-class="'page-item'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                      >
                      </Paginate>
                    </div>
                  </td>

                  <td colspan="2" style="box-sizing: border-box"></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button class="save btn-hover-blue" @click="SaveAssetChose">
          {{ formInfo.btnAgree }}
          <div class="tooltipSave">Ctrl + S</div>
        </button>

        <button class="cancel btn-hover-outline" @click="closeFormChoose" >
          {{ formInfo.btnCancelClose }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { FormIncrement } from "../../js/common/form";
import { TableDetail } from "../../js/common/table";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import { URL_FixedAssets } from "@/js/common/urlAsset";
import MSFunction from "../../js/common/function";
//   import TableBottom from "../base/BaseTableBottom.vue";
export default {
  components: { Paginate },
  props:["removedList","listRemoveEdit","listSelected"],
  data() {
    return {
      formInfo: FormIncrement,
      inforTable: TableDetail,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 20,
      fixedAssets: [],
      department_id: "",
      fixed_asset_category_id: "",
      isShowPage: false,
      txtSearch: "",
      active: 0,
      currentFixedAsset: {},
      listFixedAsset: [],
     listFixedAssetID :[],
     voucherIdEdit:"",
     oldItem:[],
    };
  },
  created() {
    console.log(this.removedList);
    this.listFixedAssetID=this.removedList
 
    this.voucherIdEdit=this.listSelected
    console.log(this.voucherIdEdit);
    
    this.getPagingAsset();
  
  },
  watch: {
    // listSelected: function(data){
    //   console.log(data);
    //   this.voucherIdEdit=data.voucher_id
    // },
    txtSearch: function(data){
      if(data==""){
        this.getPagingAsset()
      }
    }
  },
  methods: {
    onclickSearch(){
      this.pageNumber=1
      this.getPagingAsset()
    },
    /**
     * ấn nút đồng ý
     * AUTHOR: HTTHOA(18/4/2023)
     */
    SaveAssetChose(){
   
      console.log(this.oldItem);
     this.$emit("listFixedAsset",this.listFixedAsset)
     console.log(this.listFixedAsset);
 
    
     this.closeFormChoose()
    },
    /**
     * 
     * format tiền 
     * AUTHOR: HTTHOA(18/4/2023)
     */
    formatMoney(data){
      return MSFunction.formatMoney(data)
    },
    /**
     * thêm phần tử xóa và bỏ khi đã được chọn
     * AUTHOR: HTTHOA (20/03/2023)
     */
    selectItemToList(asset) {
      console.log(this.listFixedAsset);
      try {
        this.currentFixedAsset = asset;

        // this.indexFocus = this.fixedAssets.indexOf(asset);
        if (!this.listFixedAsset.includes(asset)) {
          //thực hiện chọn
          this.listFixedAsset.push(asset);
        } else {
          //thực hiện bỏ chọn
          this.listFixedAsset = this.listFixedAsset.filter((a) => {
            return a !== asset;
          });

          this.currentFixedAsset =
            this.listFixedAsset[this.listFixedAsset.length - 1];
        }
      } catch (err) {
        console.log(err);
      }

      console.log("list", this.listFixedAsset);
    },
    /**
     * hàm chọn 1 item thêm vào mảng xóa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItem(asset) {
      this.listFixedAsset = [];
      this.listFixedAsset.push(asset);
      this.currentFixedAsset = asset;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
     
      try {
        if (this.listFixedAsset.length < this.fixedAssets.length) {
          this.listFixedAsset = this.fixedAssets;
        } else {
          this.listFixedAsset = [];
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * đóng form chọn tài sản
     * AUTHOR: HTTHOA(18/4/2023)
     */
    closeFormChoose() {
      this.$emit("closeChooseAsset", false);
    },
    /**
     * lấy danh sách các tài sản
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getPagingAsset() {
    
      // if(this.listFixedAsset.length > 0) {
      //   for (const asset of this.listFixedAsset) {
      //   this.listFixedAssetID.push(asset.fixed_asset_id);
      // }
      // }
       
      console.log(this.listFixedAssetID);
      var me = this;
      me.isShowLoad = true;
      // https://localhost:44371/api/FixedAlssets/FilterFixedAsetChoose?keyword=a&pageSize=10&voucherId=f6074325-ff9c-450b-8347-26950a21f524&pageNumber=1&active=0
      axios({
        url: `${URL_FixedAssets}/FilterFixedAsetChoose?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&voucherId=${this.voucherIdEdit}&pageNumber=${this.pageNumber}&active=${this.active}`,
        // url: `${URL_FixedAssets}/FilterFixedAsetChoose?keyword=a&pageSize=10&voucherId=f6074325-ff9c-450b-8347-26950a21f524&pageNumber=1&active=0`,
      
        method: "post",
        data: this.listFixedAssetID,
      })
        .then(function (res) {
          me.isShowLoad = false;
          me.totalPage = res.data.TotalPages;
          me.totalRecord = res.data.TotalRecords;
           me.fixedAssets = res.data.Data;
          console.log(me.fixedAssets);
        })
        .catch(function () {
          console.log(1);
        });
    },
    /**
     *
     * Hàm lấy ra số bản ghi trên 1 trang hiện lên input
     * AUTHOR: HTTHOA(05/08/2022)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.showPage(false);
      this.pageNumber = 1;
      this.getPagingAsset();
      if (this.pageDefault > this.totalRecord) {
        this.pageDefault = this.totalRecord;
      }
    },

    /**
     * hàm hiện dropup
     * AUTHOR: HTTHOA(06/08/2022)
     */
    btnDropUp() {
      if (!this.isShowPage) {
        this.showPage(true);
      } else {
        this.showPage(false);
      }
    },
    /**
     * click outside đóng page
     * AUTHOR: HTTHOA(06/08/2022)
     */
    outsidePage() {
      this.showPage(false);
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getPagingAsset();
    },
    /**
     *
     * hiển thị paging
     *  AUTHOR: HTTHOA(05/08/2022)
     */
    showPage(is) {
      this.isShowPage = is;
    },
  },
};
</script>
<style scoped>
.table-main {
  height: calc(100% - 49px);
}
tr {
  max-height: 40px !important;
  height: 40px;
}
.form-footer {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
.note {
  width: 100%;
}
.body-item-bottom #table {
  height: calc(100% - 65px) !important;
}
.table {
  position: relative;
  height: calc(100% - 10px);
}
.input-row {
  margin-top: 10px;
}

.form-body {
  background-color: #f4f7ff;
  padding: 10px;
}

.increment {
  width: 98%;
  background-color: #fff;
  padding: 8px;
}

.title {
  font-size: 15px;
  margin: 8px 0px;
  font-weight: 600;
}

.titleDetail {
  margin: 8px 0px;
  font-size: 15px;
  font-weight: 600;
}

.btn-choose:hover {
  background-color: #1aa4c8;
  color: #fff;
}

.btn-choose {
  min-width: 70px;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 3px 5px 8px 3px rgba(0, 0, 0, 0.2);
}

.item-header {
  margin-top: 10px;
}

.icon-filter,
.icon-search {
  top: 18px;
}

.increment-form {
  width: 900px;
  height: 639px;
  position: relative;
}
.form-body {
  height: calc(100% - 100px);
}
/* .table input[type="checkbox"]:after {
  margin-top: 10px;
} */

input[type="checkbox"] {
  color: #090f39;
  width: 14px;
  height: 14px;
  /* position: relative; */
}
.table input[type="checkbox"]:after {
  background: url("../../assets/icon/All-icon.svg") no-repeat -69px -201px;
  width: 14px;
  height: 18px;
  content: "";
  display: inline-block;
}
.table input[type="checkbox"]:checked::after {
  background: url("../../assets/icon/All-icon.svg") no-repeat -25px -201px;
  width: 14px;
  height: 18px;
  content: "";
  display: inline-block;
}
</style>
