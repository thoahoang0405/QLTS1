<template>
  <div class="body">
    <div class="body-header">
      <div class="row-input">
        <div class="input">
          <input
            type="text"
            class="search"
            :placeholder="tableInfo.searchFixedAsset"
          />
          <div class="icon-search icon"></div>
        </div>
        <div class="input">
          <input
            type="text"
            id="filter"
            class="filter"
            :placeholder="tableInfo.fixedAssetCategoryName"
          />
          <div class="icon-filter icon"></div>
          <div class="icon-cbb" onclick="comboboxShow()">
            <div class="icon icon-down-bold hiddenCbb"></div>
          </div>
        </div>
        <div class="input">
          <input
            type="text"
            class="filter"
            :placeholder="tableInfo.departmentName"
          />
          <div class="icon-filter icon"></div>
          <div class="icon icon-down-bold"></div>
        </div>
      </div>
      <div class="button-function">
        <div class="add">
          <button @click="btnAddOnclick()" class="btn-add btn-hover-blue">
            + {{ tableInfo.btnAddFixedAsset }}
          </button>
        </div>

        <button class="btn-excel">
          <div
            class="icon icon-excel"
          
          >
            <div class="tooltip-excel">{{ tableInfo.btnExcelTooltip }}</div>
          </div>
        </button>
        <button class="btn-excel">
          <div
            class="icon icon-delete"
          
          >
            <div class="tooltip-delete">{{ tableInfo.btnDeleteTooltip }}</div>
          </div>
        </button>
      </div>
    </div>
    <div id="table">
      <div class="table">
        <table>
          <thead>
            <tr>
              <th class="text-center width-fit">
                <input type="checkbox" @click="checkAll" ref="checkall" />
              </th>

              <th class="stt">
                {{ tableInfo.numeric }}
                <div class="tooltip-stt">{{ tableInfo.numericTooltip }}</div>
              </th>

              <th>{{ tableInfo.fixedAssetCode }}</th>
              <th>{{ tableInfo.fixedAssetName }}</th>
              <th>{{ tableInfo.fixedAssetCategoryName }}</th>
              <th>{{ tableInfo.departmentName }}</th>
              <th>{{ tableInfo.quantity }}</th>
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
            <tr
              class="rowCheck"
              ref="rowCheck"
              @click="check"
              v-for="asset in fixedAssets"
              :key="asset.FixedAssetId"
              @dblclick="showFormEdit(emp)"
            >
              <td class="text-center">
                <input type="checkbox" ref="checkbox" @click="check" />
              </td>
              <td class="text-center">1</td>
              <td>{{ asset.FixedAssetCode }}</td>
              <td>{{ asset.FixedAssetName }}</td>
              <td>{{ asset.FixedAssetCategoryName }}</td>
              <td>{{asset.DepartmentName}}</td>
              <td class="text-right">{{asset.Quantity}}</td>
              <td class="text-right">{{formatMoney(asset.Cost) }}</td>
              <td class="text-right">{{formatMoney(asset.DepreciationValue)}}</td>
              <td class="text-right">{{ asset.Cost }}</td>
              <td>
                <div class="function-table">
                  <div class="icon icon-edit" @click="showFormEdit(asset)"></div>
                  <div class="icon icon-duplicate" @click="showDuplicate"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <div class="tb-footer-left">
            <div class="total-record">
              Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
            </div>
          
            <div class="page">
              <div class="content-page">
               {{pageDefault}}
              </div>
              <div class="dropup-page">
                <div class="icon icon-down-bold" @click="btnDropUp"></div>
                <div class="item-up" v-show="isShowPage">
                  <div class="item-dropup" :class="{act: isActive == '10'}" pageSize="10" 
                    @click="getPageDefault">
                    10 
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='20'}" :value="pageDefault" pageSize="20" @click="getPageDefault">
                    20 
                  </div>
                  <div class="item-dropup" :class="{act: isActive =='30'}" pageSize="30" @click="getPageDefault">
                    30 
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='50'}" pageSize="50" @click="getPageDefault">
                    50 
                  </div>
                  <div class="item-dropup" :class="{act: isActive=='100'}" pageSize="100" @click="getPageDefault">
                    100 
                  </div>
                </div>
              </div>
            </div>
            <div>
             
              <Paginate v-model="page" :page-count="totalPage" :page-range="3" :margin-pages="1"
                :click-handler="clickCallback" :prev-link-class="'page-link'" :prev-text="'<'" :prev-class="'page-item'"   :next-link-class="'page-link'" :next-text="'>'" :next-class="'page-item'" :container-class="'pagination'"
                :page-class="'page-item'">
              </Paginate>
            </div>
          
            <!-- <div class="paging-combobox">
              <input type="text" class="page" placeholder="20" />
              <div class="icon icon-down-bold"></div>
            </div>

            <div class="paging">
              <div class="icon icon-prev"></div>
              <p>1</p>
              <strong>2</strong>
              <p>...</p>
              <p>100</p>
              <div class="icon icon-next"></div>
            </div> -->
          </div>
          <div class="tb-footer-right">
            <div class="total-count"  style="padding-right: 20px; width:50px;">
              <strong>{{formatMoney(total(fixedAssets, "Quantity"))}}</strong>
            </div>
            <div class="total-price" style=" min-width: 120px; padding-right: 33px;"><strong>{{formatMoney(total(fixedAssets, "Cost"))}}</strong></div>
            <div class="total-price" style="padding-right: 0px; padding-left: 20px; width: 100px;" >
              <strong>{{formatMoney(total(fixedAssets, "DepreciationValue"))}}</strong>
            </div>
            <div class="total-price" style=" min-width: 100px;padding-right: 30px"> <strong>100.000.000</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Form
    :formName="name"
    v-show="isShow"
    @close="hideForm"
    :fixedAssetDetail="assetSelected"
    :fixedAssetIdSelected="fixedAssetId"
    :newCodeForm="newCode"
  ></Form>
  <Combobox></Combobox>
</template>
<script>
import { Table } from "../../js/common/table";
import Form from "../base/BaseForm.vue";
import Combobox from "../base/BaseCombobox.vue";
import Paginate from "vuejs-paginate-next";
import axios from "axios";
export default {
  data() {
    return {
      employee: [],
      isShow: false,
      isShowPage:false,
      assetSelected: [],
      fixedAssetId: "",
      tableInfo: Table,
      items: [], // các item hiển thị trên grid
      properties: [], // Danh sách tài sản được hiển thị
      selectedProperties: [], // các Tài sản đã chọn được chọn
      currentProperty: {}, // tài sản vừa được chọn
      name: "",
      selectedItems: [], // các item được chọn
      formode: 0,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "10",
      pageDefault: 20,
      fixedAssets:[],
      page: 1,
      newCode: "",
    };
  },
  components: {
    Form,
    Combobox,
    Paginate
  },
  created() {
    this.filterEmployee();
  },
  methods: {
    /**
     * tính tổng cột tiền
     */
     total(array, propName) {
      let total = array.reduce((acc, cur) => {
        if (cur[propName]) {
          return acc + cur[propName];
        } else {
          return acc;
        }
      }, 0);
      return total;
    },
    /**
     * hàm click vào số trang
     * AUTHOR: HTTHOA(15/08/2022)
     */
     clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.filterEmployee();
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

      this.filterEmployee();
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
     * lấy số bản ghi trên 1 trang số trang và tìm kiếm trên api
     * AUTHOR: HTTHOA(11/08/2022)
     */
     filterEmployee() {
      try {
        // const toast = useToast();
         var me = this;
        // this.showLoading(true);
        axios
          .get(`https://localhost:44371/api/FixedAsset/Filter?keyword= &pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`)
          .then(function (res) {
            me.totalPage = res.data.TotalPages;
            me.totalRecord = res.data.TotalRecords;
            me.fixedAssets = res.data.Data;
            console.log(me.fixedAssets);
            for (const item of res.data.Data) {
              console.log(item.Cost);
              item.Cost = this.formatMoney(item.Cost);
            }
           
          })
          
          .catch(function () {
            console.log(1);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    lấy mã mới 
    */
    getMaxCode(){
      try {
        axios
          .get("https://localhost:44371/api/FixedAsset/NewCode")
          .then((res) => {
            this.newCode=res.data
          console.log(res.data);
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
     * xử lý check box
     * AUTHOR: HTTHOA(28/02/2023)
     */
    check() {
      var listCheck = this.$refs.checkbox;

      var rowCheck = this.$refs.rowCheck;

      for (var i = 0; i < listCheck.length; i++) {
        if (listCheck[i].checked == true) {
          rowCheck[i].classList.add("rowActive");
        } else {
          rowCheck[i].classList.remove("rowActive");
          this.$refs.checkall.checked = false;
        }
      }
      console.log(listCheck.length);
    },
    /**
     * xử lý checkall
     * AUTHOR: HTTHOA(28/02/2023)
     */
    checkAll() {
      var listCheck = this.$refs.checkbox;

      var rowCheck = this.$refs.rowCheck;
      if (this.$refs.checkall.checked) {
        for (let i = 0; i < listCheck.length; i++) {
          listCheck[i].checked = true;
          rowCheck[i].classList.add("rowActive");
        }
      } else {
        for (let i = 0; i < listCheck.length; i++) {
          listCheck[i].checked = false;
          rowCheck[i].classList.remove("rowActive");
        }
      }
    },
    /**
     * lấy thông tin tài sản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getData() {
      try {
        axios
          .get("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
          .then((res) => {
            this.employee = res.data;
            console.log(this.employee);
            for (const item of res.data) {
              item.Salary = this.formatMoney(item.Salary);
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * hiển thị form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    btnAddOnclick() {
      this.formode = 0;
      this.name = "Thêm tài sản";
      this.showForm()
      this.getMaxCode();
    },
    showForm(){
      this.isShow = true;
    },
    /**
     * đóng form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.isShow = false;
    },
    hideForm(value) {
      this.isShow = value;
    },
    /**
     * hiển thị form chỉnh sửa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showFormEdit(asset) {
      this.formode = 1;
      this.name = "Sửa tài sản";
      this.isShow = true;
      this.assetSelected = asset;
      this.fixedAssetId = asset.FixedAssetId;
      console.log(asset);
    },
    /**
     * hiển thị form nhân bản
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showDuplicate() {
      this.formode = 2;
      this.name = "Nhân bản tài sản";
      this.isShow = true;
    },
    /**
     * format tiền
     * AUTHOR: HTTHOA(28/02/2023)
     */
     formatMoney(money) {
      if (!isNaN(money)) {
        var moneyInt = parseInt(money);
        return moneyInt
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
      } else {
        return parseInt(money);
      }
    },
    selectItemToList(property) {
      try {
        this.currentProperty = property;

        if (!this.selectedProperties.includes(property)) {
          //thực hiện chọn
          this.selectedProperties.push(property);
        } else {
          //thực hiện bỏ chọn
          this.selectedProperties = this.selectedProperties.filter((a) => {
            return a !== property;
          });

          this.currentProperty =
            this.selectedProperties[this.selectedProperties.length - 1];
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * hàm chọn 1 item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItem(property) {
      this.selectedProperties = [];
      this.selectedProperties.push(property);
      this.currentProperty = property;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
      try {
        if (this.selectedProperties.length < this.properties.length) {
          this.selectedProperties = this.properties;
        } else {
          this.selectedProperties = [];
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.pagination {
  display: flex;
  color: #000;
  margin-left: 100px;
}


.act {
  background-color: green;
  color: #fff;
}

.BorderActive {
  border: 1px solid #0075c0 !important;
}

.page-item:first-child {
  margin-right: 15px;
  font-size: 20px;
  color: #727272
}
.page-item:last-child{
  font-size: 20px;
  color: #727272
}

.page-item {
  margin-left: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 0;
}

li.page-item.disabled {
    color: #bbb;
}
.page-item.active {

  font-weight: 900;
  text-align: center;
  background-color: #eeeaea;
  color: #000;

}

.page-item.active a {
  width: 24px;
  text-align: center;
}

.opacity-icon {
  opacity: 0.5;
}

.act {
  background-color: rgba(26, 164, 200, 0.2) ;
  color: #111;
}
.rowActive {
  background-color: rgba(4, 137, 170, 0.2);
}
.item-dropup {
  padding: 10px;
}
.item-up {
    position: absolute;
    background-color: #fff;
    margin-left: -2px;
    margin-top: -205px;
    width: 60px;
    border: 1px solid #bbb;
    /* display: none; */
}
.item-dropup{
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
.page{
  position: relative;
  color: #111;
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
    justify-content:flex-start;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
       
}
.page .icon.icon-down-bold {
    position: absolute;
    top: 14px;
    right: 10px;
}
</style>
