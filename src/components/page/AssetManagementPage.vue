<template>
  <div class="body" @click.exact.shift="onClickDeleteMultiple">
    <div class="body-header">
      <div class="row-input">
        <div class="input">
          <input
            type="text"
            class="search"
            :placeholder="tableInfo.searchFixedAsset"
            v-model="txtSearch"
            @keypress.enter="onClickSearch"
            ref="search"
          />
          <div class="icon-search icon" @click="onClickSearch"></div>
        </div>

        <Combobox
          :items="departments"
          :code="'department_code'"
          :fieldName="'department_name'"
          :value="fixedAsset.department_name"
          @selectedItem="selectItemCbb"
          @keyword="selectItemCbb"
          :placeholder="place.PlaceHolderDepartment"
        ></Combobox>

        <Combobox
          :items="fixedAssetCategory"
          :fieldCode="'fixed_asset_category_code'"
          :fieldName="'fixed_asset_category_name'"
          @selectedItem="selectItemCategory"
          :value="fixedAsset.fixed_asset_category_name"
          refName="'fixed_asset_category_code'"
          @keyword="selectItemCategory"
          :placeholder="place.PlaceHolderCategory"
        ></Combobox>
      </div>
      <div class="button-function">
        <div class="add">
          <button @click="btnAddOnclick()" class="btn-add btn-hover-blue">
            + {{ tableInfo.btnAddFixedAsset }}
          </button>
        </div>

        <button class="btn-excel" download>
          <a
            :href="`https://localhost:44371/api/FixedAssets/ExportExcel?keyword=${this.txtSearch}&departmentID=${this.department_id}&fixedAssetCategoryID=${this.fixed_asset_category_id}`"
            download
          >
            <div class="icon icon-excel">
              <div class="tooltip-excel">{{ tableInfo.btnExcelTooltip }}</div>
            </div>
          </a>
        </button>
        <button class="btn-excel">
          <div class="icon icon-delete" @click="onClickDeleteMultiple">
            <div class="tooltip-delete">{{ tableInfo.btnDeleteTooltip }}</div>
          </div>
        </button>
      </div>
    </div>
    <div id="table ">
      <div class="table">
        <table keyup.up="onKeyUpTable">
          <thead>
            <tr>
              <th class="text-center width-fit">
                <input
                  type="checkbox"
                  @click="selectedAllItem"
                  :checked="listFixedAsset.length == fixedAssets.length"
                  ref="checkall"
                />
              </th>

              <th class="stt">
                {{ tableInfo.numeric }}
                <div class="tooltip-stt">{{ tableInfo.numericTooltip }}</div>
              </th>

              <th>{{ tableInfo.fixed_asset_code }}</th>
              <th>{{ tableInfo.fixed_asset_name }}</th>
              <th>{{ tableInfo.fixed_asset_category_name }}</th>
              <th>{{ tableInfo.department_name }}</th>
              <th class="text-right">{{ tableInfo.quantity }}</th>
              <th class="text-right">{{ tableInfo.cost }}</th>
              <th class="text-right kh">
                {{ tableInfo.depreciation }}
                <div class="tooltip-kh">
                  {{ tableInfo.depreciationTooltip }}
                </div>
              </th>
              <th class="text-right">{{ tableInfo.residualValue }}</th>
              <th>{{ tableInfo.function }}</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border: none" class="data" v-if="totalRecord == 0">
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="2" class="noData text-center">Không có dữ liệu</td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
              <td colspan="1" class="noData"></td>
            </tr>

            <tr
              ref="rowCheck"
              v-for="(asset, index) of fixedAssets"             
              :key="asset.fixed_asset_id"
              :class="listFixedAsset.includes(asset) ? 'active' : ''"
              @dblclick="showFormEdit(asset)"          
              @contextmenu="onClickContextMenu(asset, $event)"
              @mousedown.prevent.ctrl="mouseDown(asset)"
              @mouseup.prevent.ctrl="mouseUp(asset)"
              style="max-height: 38px; box-sizing: border-box"
            >

              <td
                style="min-width: 47px; max-width: 47px; box-sizing: border-box"
                class="text-center"
              >
                <input
                  type="checkbox"
                  ref="checkbox" 
                  :checked="listFixedAsset.includes(asset)"
                  @click="selectItemToList(asset)"
                />
          
              </td>
              <td
                style="min-width: 45px; max-width: 45px; box-sizing: border-box"
                class="text-center"
              >
              {{ index + 1 }}
              </td>
              <td
                style="min-width: 82px; max-width: 82px; box-sizing: border-box"
              >
                {{ asset.fixed_asset_code }}
              </td>
              <td
            
                style="
                  min-width: 130px;
                  max-width: 130px;
                  box-sizing: border-box;
                "
              >
                {{ asset.fixed_asset_name }}
              </td>
              <td
                style="
                  max-width: 148px !important;
                  min-width: 148px !important;
                  box-sizing: border-box;
                "
              >
            
                {{ asset.fixed_asset_category_name }}
              </td>
              <td
                style="
                  max-width: 148px !important;
                  min-width: 148px !important;
                  box-sizing: border-box;
                "
              >
                {{ asset.department_name }}
              </td>
              <td
                style="min-width: 79px; max-width: 79px; box-sizing: border-box"
                class="text-right"
              >
                {{ asset.quantity }}
              </td>
              <td
                style="
                  min-width: 105px;
                  max-width: 105px;
                  box-sizing: border-box;
                "
                class="text-right"
              >
                {{ formatMoney(asset.cost) }}
              </td>
              <td
                style="
                  min-width: 104px;
                  max-width: 104px;
                  box-sizing: border-box;
                "
                class="text-right"
              >
                {{ formatMoney(asset.impoverishment) }}
              </td>
              <td
                style="
                  min-width: 104px;
                  max-width: 104px;
                  box-sizing: border-box;
                "
                class="text-right"
              >
                {{ formatMoney(asset.cost - asset.impoverishment) }}
              </td>
              <td
                style="min-width: 90px; max-width: 90px; box-sizing: border-box"
              >
                <div class="function-table">
                  <div class="icon icon-edit" @click="showFormEdit(asset)">
                    <div class="tooltip">Sửa</div>
                  </div>
                  <div
                    class="icon icon-replicate"
                    @click="showReplication(asset)"
                  >
                    <div class="tooltip">Nhân bản</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="totalRecord != 0">
            <tr class="tb-footer" style="background: #ffff">
              <td
                colspan="3"
                style="
                  min-width: 176px;
                  max-width: 176px;
                  box-sizing: border-box;
                "
              >
                <div>
                  <div class="total-record">
                    Tổng số: <strong>{{ formatMoney(totalRecord) }}</strong> bản ghi
                  </div>
                </div>
              </td>
              <td
                colspan="1"
                style="
                  min-width: 130px;
                  max-width: 130px;
                  box-sizing: border-box;               "
              >

                <div class="page">
                  <div
                    style="position: relative; cursor: pointer"
                    @click="btnDropUp"
                    v-outside="outsidePage"
                  >
                    <div class="content-page">
                      {{ pageDefault }}
                      <!-- <div class="up-down" @click="btnDropUp"> -->
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
              <td
                colspan="2"
                style="
                  max-width: 280px !important;
                  min-width: 280px !important;
                  box-sizing: border-box;
                "
              >
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
              <td
                colspan="1"
                class="text-right"
                style="min-width: 79px; max-width: 79px; box-sizing: border-box"
              >
                <div class="total-count">
                  <strong>{{ formatMoney(totalQuantity) }}</strong>
                </div>
              </td>
              <td
                colspan="1"
                class="text-right"
                style="
                  min-width: 105px;
                  max-width: 105px;
                  box-sizing: border-box;
                "
              >
                <div class="total-price">
                  <strong>{{ formatMoney(totalCost) }}</strong>
                </div>
              </td>
              <td
                colspan="1"
                class="text-right"
                style="
                  min-width: 104px;
                  max-width: 104px;
                  box-sizing: border-box;
                "
              >
                <div class="total-price">
                  <strong>{{ formatMoney(totalImprover) }}</strong>
                </div>
              </td>
              <td
                colspan="1"
                class="text-right"
                style="
                  min-width: 104px;
                  max-width: 104px;
                  box-sizing: border-box;
                "
              >
                <div class="total-price">
                  <strong>{{ formatMoney(totalCost - totalImprover) }}</strong>
                </div>
              </td>
              <td
                colspan="1"
                style="min-width: 90px; max-width: 90px; box-sizing: border-box"
              ></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <Form
    :formName="name"
    v-if="isShow"
    @close="hideForm"
    :fixedAssetDetail="assetSelected"
    :fixedAssetIdSelected="fixed_asset_id"
    :newCodeForm="newCode"
    :FormMode="formMode"
    @loadData="loadData"
  ></Form>
  <ContextMenu
    :posTop="posTop"
    :posLeft="posLeft"
    v-show="isShowContextMenu"
    @clickAdd="onClickAddContextMenu"
    @clickEdit="onClickEditContextMenu"
    @clickDelete="onClickDeleteContextMenu"
    @clickReplication="onClickReplicationContextMenu"
    @mouseleave="closeContextMenu"
  />
  <Popup
    v-show="isShowPopup"
    @hidePopup="hidePopup"
    :msg="msgDelete"
    @loadData="loadData"
    :name="btnName"
    :btnLeft="btnNameLeft"
    :close="closeStatus"
    @isDelete="deleted"
    :item="itemDelete"
  ></Popup>

  <div id="load" v-show="isShowLoad">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { Table } from "../../js/common/table";
import Form from "../base/BaseForm.vue";
import Popup from "../base/BasePopup.vue";
import Paginate from "vuejs-paginate-next";
import axios from "axios";
import Combobox from "../base/BaseCombobox2.vue";
import ContextMenu from "../base/BaseContextMenu.vue";
import {
  ErrorMsg,
  btnPopup,
  TitlePopup,
  NoticeMsg,
  Msg,
  PlaceHolder,
} from "../../js/common/resource";

import MSFunction from "../../js/common/function";
import { useToast } from "vue-toastification";
import { FormDetailMode, CloseST } from "../../js/common/enumeration";
import {
  URL_FixedAssetPaging,
  URL_Category,
  URL_DELETE,
  URL_FixedAssetsPut,
  URL_Department,
  URL_GetNewCode,
} from "@/js/common/urlAsset";
export default {
  data() {
    return {
      isShowContextMenu: false,
      posTop: 10,
      posLeft: 10,
      itemDelete: "",
      isDeleted: 0,
      keywordDep: "",
      keywordCate: "",
      numeric: 0,
      employee: [],
      msgError: "",
      msgDelete: "",
      isShow: false,
      btnName: "",
      btnNameLeft: "",
      isShowLoad: false,
      closeStatus: 0,
      isShowPopup: false,
      isShowPage: false,
      assetSelected: [],
      fixed_asset_id: "",
      tableInfo: Table,
      name: "",
      selectedItems: [], // các item được chọn
      formMode: 0,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 20,
      fixedAssets: [],
      oldData:[],
      place: PlaceHolder,
      newCode: "",
      listFixedAsset: [],
      fixedAsset: {},
      fixedAssetCategory: [],
      fixed_asset_category_code: "",
      fixed_asset_category_id: "",
      fixed_asset_category_name: "",
      departments: [],
      department_code: "",
      department_name: "",
      department_id: "",
      currentFixedAsset: {},
      txtSearch: "",
      placeholderName: "",
      totalQuantity: 0,
      totalCost: 0,
      totalImprover: 0,
      listOnMouseDown: {},
      listOnMouseUp: {},
      oldKeyDepartment: "",
      active:null,
      array:[]

    };
  },
  components: {
    Form,
    Popup,
    Paginate,
    Combobox,
    ContextMenu,
  },
  watch: {
    /**
     * thep dõi biến search
     * AUTHOR: HTTHOA(20/03/2023)
     */
    txtSearch: function () {
      if (this.txtSearch == "") {
        this.pageNumber = 1;
        this.getPagingAsset();
      }
    },

    fixedAssets: function () {
      if (this.fixedAsset.department_id == "") {
        this.getPagingAsset();
      }
      if (this.fixedAsset.fixed_asset_category_id == "") {
        this.getPagingAsset();
      }
    },
   
  },
  created() {
    this.setFocus();
    this.getPagingAsset();
    this.getDepartments();
    this.getCategory();
  },
  methods: {
  /**
   * 
   * format tiền
   *  AUTHOR: HTTHOA(2/4/2023)
   */
    formatMoney(money) {
      return MSFunction.formatMoney(money);
    },
    /**
     *
     * click ctrl
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseDown(asset) {
      try {
        // lưu tài sản khi mousedown
        this.listOnMouseDown = asset;
      } catch (err) {
        console.log(err);
      }
    },
    /**
     *
     * chọn trong khoảng đã kéo
     * AUTHOR: HTTHOA(2/4/2023)
     */
    selectMultipleItem(item1, item2) {
      //đoạn này là lấy những tài sản khi kéo giữ chuột
      if (
        this.fixedAssets.includes(item1) &&
        this.fixedAssets.includes(item2)
      ) {
        // lấy vị trí của 2 item trong mảng fixedAsset
        //start là vị trí đầu khi down ctrl
        let startIndex = this.fixedAssets.indexOf(item2);
        //end là vị trí khi up ctrl
        let endIndex = this.fixedAssets.indexOf(item1);
        // kiểm tra vị trí bắt đầu và kết thúc nếu bắt đầu lớn hơn kết thúc thì đổi lại
        if (startIndex > endIndex) {
          let tmp = startIndex;
          startIndex = endIndex;
          endIndex = tmp;
        }

        // thêm các item chưa có trong mảng xóa từ vị trí bắt đầu đến kết thúc
        for (let i = startIndex; i <= endIndex; i++) {
          //nếu trong danh sách chưa gồm tài sản đó thì push vào danh sách
          if (!this.listFixedAsset.includes(this.fixedAssets[i])) {
            this.listFixedAsset.push(this.fixedAssets[i]);
          }
        }
      }
    },
    /**
     * up ctrl thả chuột để lấy vị trí cuối cùng chọn
     * AUTHOR: HTTHOA(2/4/2023)
     */
    mouseUp(asset) {
      try {
        // lưu tài sản khi mouseup
        this.listOnMouseUp = asset;
        this.selectMultipleItem(this.listOnMouseDown, this.listOnMouseUp);
        this.listOnMouseDown = {};
        this.listOnMouseUp = {};
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * click lấy vị trí context menu
     * AUTHOR: HTTHOA(2/04/2023)
     */

    onClickContextMenu(asset, e) {
      e.preventDefault();
      this.selectItem(asset);
    //  lấy vị trí chuột
      this.posTop = e.clientY;
      this.posLeft = e.clientX;
      this.isShowContextMenu = true;
    },
    /**
     * đóng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    closeContextMenu() {
      setTimeout(() => {
        this.isShowContextMenu = false;
        this.listFixedAsset = [];
      }, 1000);
    },
    /**
     * click vào nhân bản trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickReplicationContextMenu() {
      this.isShowContextMenu = false;
      this.showReplication(this.currentFixedAsset);
    },
    /**
     * click vào xóa trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickDeleteContextMenu() {
      this.isShowContextMenu = false;
      this.onClickDeleteMultiple();
    },
    /**
     * click vào sửa trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickEditContextMenu() {
      this.isShowContextMenu = false;
      this.showFormEdit(this.currentFixedAsset);
    
    },
    /**
     * click vào thêm trong  chức năng context menu
     * AUTHOR: HTTHOA(2/4/2023)
     */
    onClickAddContextMenu() {
      this.isShowContextMenu = false;
      this.btnAddOnclick();
    },

    /**focus vào ô search đầu tiên
     * AUTHOR: HTTHOA(27/03/2023)
     */
    setFocus() {
      this.$nextTick(function () {
        this.$refs["search"].focus();
      });
    },

    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getDepartments() {
      axios
        .get(`${URL_Department}`)
        .then((response) => {
          this.departments = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * lấy thông tin bộ phận
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getCategory() {
      axios
        .get(`${URL_Category}`)
        .then((response) => {
          this.fixedAssetCategory = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCbb(value) {
      if (value.department_id) {
        this.department_id = value.department_id;
      } else {
        this.department_id = "";
      }
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCategory(value) {
      if (value.fixed_asset_category_id) {
        this.fixed_asset_category_id = value.fixed_asset_category_id;       
      } else {
        this.fixed_asset_category_id = "";
        
      }
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * hiển thị popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showPopup() {
      this.isShowPopup = !this.isShowPopup;
    },
    /**
     * đóng popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopup(value) {
      this.isShowPopup = value;
      this.assetSelected = {};
      this.listFixedAsset = [];
      this.oldData=[]
    
    },
    /**
     * nhấn nút xóa
     * AUTHOR: HTTHOA(88/03/2023)
     */
    onClickDelete() {
      if (this.listFixedAsset.length < 1) {
        this.showPopup(true);
        this.msgError = ErrorMsg.NotChooseProperty;
        this.closeStatus = CloseST.DeleteCloseNotChoose;
        this.btnName = btnPopup.Agree;
      } else {
        this.showPopup(false);
      }
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
     * sự kiện search
     * AUTHOR: HTTHOA(11/03/2023)
     */
    onClickSearch() {
      this.pageNumber = 1;
      this.getPagingAsset();
    },
    /**
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/03/2023)
     */
    getPagingAsset() {
      var me = this;    
      me.isShowLoad = true;
      axios({
        url: `${URL_FixedAssetPaging}?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&departmentID=${this.department_id}&fixedAssetCategoryID=${this.fixed_asset_category_id}&pageNumber=${this.pageNumber}&active=${this.active}`,
        method: "post",
        data: [],
      })
      // axios
      //   .post(
      //     `${URL_FixedAssetPaging}?keyword=${this.txtSearch}&pageSize=${this.pageDefault}&departmentID=${this.department_id}&fixedAssetCategoryID=${this.fixed_asset_category_id}&pageNumber=${this.pageNumber}&active=${this.active}`
      //   )
        .then(function (res) {
          me.isShowLoad = false;
          me.totalPage = res.data.TotalPages;
          me.totalRecord = res.data.TotalRecords;
          me.totalImprover = res.data.TotalImprover;
          me.totalCost = res.data.TotalCost;
          me.totalQuantity = res.data.TotalQuantity;        
          me.fixedAssets = res.data.Data;        
        }) 
        .catch(function () {
          console.log(1);
        });
    },
    loadData() {
      this.pageNumber = 1;
      this.getPagingAsset();
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
     * lấy mã mới
     * AUTHOR: HTTHOA(9/03/2023)
     */
    getMaxCode() {
      try {
        axios.get(`${URL_GetNewCode}`).then((res) => {
          this.newCode = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *
     * hiển thị paging
     *  AUTHOR: HTTHOA(05/08/2022)
     */
    showPage(is) {
      this.isShowPage = is;
    },

   
    /**
     * hiển thị form thêm
     * AUTHOR: HTTHOA(28/02/2023)
     */
    btnAddOnclick() {
      this.formMode = FormDetailMode.Add;
      this.name = TitlePopup.Add;
      this.showForm();
    },
    /**
     * hiển thị form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showForm() {
      this.isShow = true;
    },
    /**
     * đóng form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.isShow = false;
      this.loadData();
    },
   
    /**
     * hiển thị form chỉnh sửa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showFormEdit(asset) {
      this.formMode = FormDetailMode.Edit;
      this.name = TitlePopup.Edit;
      this.isShow = true;
      this.assetSelected = asset;
      this.fixed_asset_id = asset.fixed_asset_id;
     
    },
    /**
     * hiển thị form nhân bản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showReplication(asset) {
      this.formMode = FormDetailMode.Replication;
      this.name = TitlePopup.Replication;
      this.isShow = true;
      this.assetSelected = asset;
      this.fixed_asset_id = asset.fixed_asset_id;
    },
    /**
     * đóng form
     * AUTHOR: HTTHOA (20/03/2023)
     */
    hideForm(value) {
      this.isShow = value;
      this.loadData();
    },
    /**
     * thêm phần tử xóa và bỏ khi đã được chọn 
     * AUTHOR: HTTHOA (20/03/2023)
     */
    selectItemToList(asset) {
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
     * gọi api xóa 1 bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleteOne(id) {
      const toast = useToast();
      console.log(id);
      var me = this;
      axios
        .delete(`${URL_FixedAssetsPut}${id}`)
        .then(function () {
          toast.success(Msg.DeleteSucces, { timeout: 2000 });
          me.pageNumber=1
          me.getPagingAsset();
          me.listFixedAsset=[]
        })
        .catch(function () {
          toast.error(Msg.DeleteError, { timeout: 2000 });
        });
    },
    /**
     * gọi api xóa nhiều bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleteMultiple() {
      const toast = useToast();
      let listFixedAssetID = [];
      var me = this;
      me.listFixedAsset.filter((asset) => {
        listFixedAssetID.push(asset.fixed_asset_id);
      });

      axios({
        url: `${URL_DELETE}`,
        method: "delete",
        data: listFixedAssetID,
      })
        .then(function (res) {
          console.log(res.data);
          toast.success(res.data + Msg.DeleteSucces, { timeout: 2000 });
          me.pageNumber=1
          me.getPagingAsset();
          me.listFixedAsset=[]
        })
        .catch(function () {
          toast.error(Msg.DeleteError, { timeout: 2000 });
        });
    },
    /**
     * kiểm tra xóa 1 hay xóa nhiều khi ấn xóa hiện popup confirm
     * AUTHOR: HTTHOA(20/03/2023)
     */
    onClickDeleteMultiple() {
      try {
        // kiểm tra danh sách được chọn có bao nhiêu bản ghi và hiển thị thông báo

        if (this.listFixedAsset.length == 0) {
          this.showPopup(true);
          this.msgDelete = ErrorMsg.NotChooseProperty;
          this.closeStatus = CloseST.DeleteCloseNotChoose;
          this.btnName = btnPopup.ClosePop;
        } else if (this.listFixedAsset.length == 1) {
          this.showPopup(true);
          if(this.listFixedAsset[0].active==0){       
          this.msgDelete = NoticeMsg.ConfirmDelet;
          this.closeStatus = CloseST.DeleteOne;
          this.btnName = btnPopup.Delete;
          this.btnNameLeft = btnPopup.No;
          this.itemDelete = this.listFixedAsset[0].fixed_asset_code;
          }else{
          this.msgDelete = "Tài sản có mã  <b>&lt&lt " + this.listFixedAsset[0].fixed_asset_code+ " &gt&gt</b> đã phát sinh chứng từ ghi tăng";
          this.closeStatus = CloseST.DeleteCloseNotChoose;
          this.btnName = btnPopup.ClosePop;
          }
         
        } else {
          this.showPopup(true);
          this.itemDelete = this.listFixedAsset.length + " tài sản";
          this.msgDelete = NoticeMsg.ConfirmDelet;
          this.closeStatus = CloseST.DeleteMulti;
          this.btnNameLeft = btnPopup.No;
          this.btnName = btnPopup.Delete;
        }
        console.log(this.listFixedAsset);
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * hàm ktra xem thực hiện xóa 1 hay xóa nhiều
     * AUTHOR: HTTHOA(20/03/2023)
     */
    deleted(value) {
      console.log(value);
      this.isShowPopup = value;
      console.log(this.listFixedAsset.length);

      if (this.listFixedAsset.length == 1) {
        var id = this.listFixedAsset[0].fixed_asset_id;
        console.log(id);
        this.deleteOne(id);
      } else {
        this.deleteMultiple();
      }
    },
  },
};
</script>
<style scope>
div#table\ {
    margin-top: 16px !important;
    
}
.data {
  width: 100%;
}
.noData {
  height: auto;
  margin: auto auto;
  align-items: center;
}
.pagination {
  display: flex;
  color: #000;
  margin-left: 0px;
  padding: 0 !important;
  box-sizing: border-box;
  width: 200px;
}
li.page-item.disabled {
  cursor: not-allowed;
}
.page-link {
  margin: 5px;
}

.act {
  background-color: green;
  color: #fff;
}

.BorderActive {
  border: 1px solid #0075c0 !important;
}

.page-item:first-child {
  font-size: 20px;
  color: #727272;
}

.page-item:last-child {
  font-size: 20px;
  color: #727272;
}

.page-item {
  margin: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 0;
  justify-content: center;
}

li.page-item.disabled {
  color: #bbb;
}

.page-item.active {
  font-weight: 700;
  text-align: center;
  background-color: #eeeaea;
  color: #000;
}

.page-item.active a {
  width: 20px;
  text-align: center;
}

.opacity-icon {
  opacity: 0.5;
}

.act {
  background-color: rgba(26, 164, 200, 0.2);
  color: #111;
}

.active {
  background-color: rgba(4, 137, 170, 0.2);
}

.item-dropup {
  padding: 10px;
}

.item-up {
  position: absolute;
  background-color: #fff;
  margin-left: -1px;
  margin-top: -208px;
  width: 60px;
  z-index: 10;
  border: 1px solid #bbb;
}

/* .item-up {
  position: absolute;
  background-color: #fff;
  margin-left: -2px;
  margin-top: -205px;
  width: 60px;
  z-index: 10;
  border: 1px solid #bbb;
} */
.item-dropup {
  display: flex;
  justify-content: center;
}

.item-dropup:hover {
  background-color: rgba(26, 164, 200, 0.2);
  color: #111;
}

/* .paging-left strong {
  color: #000;
} */
/* .paging-left {
  color: #111;
  margin-left: 0px;
} */
.paging-right {
  display: flex;
  margin-right: 24px;
}

.paging-right select {
  min-width: 170px;
  height: 35px;
}

.before-text {
  color: rgb(104, 102, 102);
  margin: 8px;
  margin-top: 10px;
}

.more-icon {
  /* background: url("../../icon/icons8-more-24.png"); */
  width: 24px;
  height: 24px;
  color: #727272;
  margin-top: 6px;
  margin-right: 4px;
}

.button-unclick {
  border: none;
  background-color: #fff;
}

.button-clicked {
  padding: 2px;
  background-color: #fff;
  border: 1px solid #bbb;
}

.page {
  position: relative;
  color: #111;
  align-items: center;
  text-align: center;
  margin-top: 5px;
}

/* .paging button {
  margin: 8px 4px 2px 0px;
  width: 20px;
  height: 20px;
} */
.after-text {
  color: #111;
  margin: 8px;
  margin-top: 10px;
}

.content-page {
  width: 60px;
  border: 1px solid;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

/* .page .icon.icon-down-bold {
  position: absolute;
  top: 13px;
  /* right: 60px; */
/* }  */
/* .down{
 
    position: absolute;
    right: 55%;
    top: 50%;
    transform: translateY(-50%);
    justify-content: center;
} */
.page .up-down {
  position: absolute;
  right: 56%;
  top: 32%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  justify-content: center;
}
</style>
