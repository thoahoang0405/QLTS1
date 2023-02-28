<template>
  <div class="body">
    <div class="body-header">
      <div class="row-input">
        <div class="input">
          <input type="text" class="search" :placeholder="tableInfo.searchFixedAsset" />
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
          <input type="text" class="filter" :placeholder="tableInfo.departmentName" />
          <div class="icon-filter icon"></div>
          <div class="icon icon-down-bold"></div>
        </div>
      </div>
      <div class="button-function">
        <div class="add">
          <button @click="showForm()" class="btn-add btn-hover-blue">
            + {{ tableInfo.btnAddFixedAsset }}
          </button>
        </div>

        <button class="btn-excel">
          <div
            class="icon icon-excel"
            onclick="document.getElementById('toast').style.visibility='visible'"
          >
            <div class="tooltip-excel">{{ tableInfo.btnExcelTooltip }}</div>
          </div>
        </button>
        <button class="btn-excel">
          <div
            class="icon icon-delete"
            onclick="document.getElementById('popup').style.visibility='visible'"
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
                <input type="checkbox"  @click="checkAll" ref="checkall" />
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
                <div class="tooltip-kh">{{ tableInfo.depreciationTooltip }}</div>
              </th>
              <th class="text-right">{{ tableInfo.residualValue}}</th>
              <th>{{ tableInfo.function }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="rowCheck"  ref="rowCheck" @click="check" 
              v-for="emp in employee"
              :key="emp.EmployeeID"
              @dblclick="showFormEdit(emp)"
            >
              <td class="text-center">
                <input type="checkbox" ref="checkbox" @click="check"  
                  />
              </td>
              <td class="text-center">1</td>
              <td>{{ emp.EmployeeCode }}</td>
              <td>{{ emp.FullName }}</td>
              <td>Máy vi tính xách tay</td>
              <td>phòng hành chính kế toán</td>
              <td class="text-right">1</td>
              <td class="text-right">{{  emp.Salary }}</td>
              <td class="text-right">{{  emp.Salary }}</td>
              <td class="text-right">{{  emp.Salary }}</td>
              <td>
                <div class="function-table">
                  <div class="icon icon-edit" @click="showFormEdit(emp)"></div>
                  <div class="icon icon-duplicate" @click="showDuplicate"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer">
          <div class="tb-footer-left">
            <div class="total-record">
              Tổng số: <strong>200 </strong>bản ghi
            </div>

            <div class="paging-combobox">
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
            </div>
          </div>
          <div class="tb-footer-right">
            <div class="total-count" style="margin-right:22px"><strong>10</strong></div>
            <div class="total-price"><strong>100.000.000</strong></div>
            <div class="total-price" style="margin: 0px 22px"><strong>100.000.000</strong></div>
            <div class="total-price"><strong>100.000.000</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Form
  :formName="name"
    v-show="isShow"
    @close="hideForm"
    :employeeDetail="employeeSelected"
    :employeeSlId="employeeId"
  ></Form>
  <Combobox></Combobox>

</template>
<script>
import { Table } from "../../js/common/table"
import Form from "../base/BaseForm.vue";
import Combobox from "../base/BaseCombobox.vue";

import axios from "axios";
export default {
  data() {
    return {
      employee: [],
      isShow: false,
      employeeSelected: [],
      employeeId: "",
      tableInfo: Table,
      items: [], // các item hiển thị trên grid
      properties: [], // Danh sách tài sản được hiển thị
      selectedProperties: [], // các Tài sản đã chọn được chọn
      currentProperty: {}, // tài sản vừa được chọn
      name:"",
      selectedItems: [], // các item được chọn
      formode:0,
     
    };
  },
  components: {
    Form,
    Combobox
  },
  created() {
    this.getData();

  },
  methods: {
    check(){
      var listCheck = this.$refs.checkbox;
      
      var rowCheck = this.$refs.rowCheck;
   
      for (var i = 0; i < listCheck.length; i++) {
       
        if (listCheck[i].checked == true) {
       
          rowCheck[i].classList.add("rowActive")
         
        } else {
         
          rowCheck[i].classList.remove("rowActive")
          this.$refs.checkall.checked=false
          
        }
      }
      console.log(listCheck.length);
    
    
    },
    checkAll() {
      var listCheck = this.$refs.checkbox;
      
      var rowCheck = this.$refs.rowCheck;
      if (this.$refs.checkall.checked) {
        
          for (let i = 0; i < listCheck.length; i++) {
            listCheck[i].checked = true
            rowCheck[i].classList.add("rowActive")
           
          }
          
      }
      
       else {
        for (let i = 0; i < listCheck.length; i++) {
          listCheck[i].checked = false
          rowCheck[i].classList.remove("rowActive")
         
        }
      }
      
      
    },
    getData() {
      axios
        .get("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => {
          this.employee = res.data;
          console.log(this.employee);
          for (const item of res.data) {
            item.Salary= this.formatMoney(item.Salary)
            
          }
        });
    },
    showForm() {
      
      this.formode=0
      this.name="Thêm tài sản"
      this.isShow = true;
    },
    closeForm() {
      this.isShow = false;
    },
    hideForm(value) {
      this.isShow = value;
    },
    showFormEdit(emp) {
      this.formode=1
      this.name="Sửa tài sản"
      this.isShow = true;
      this.employeeSelected = emp;
      this.employeeId = emp.EmployeeId;
      console.log(emp);
    },
    showDuplicate() {
      this.formode=2
      this.name="Nhân bản tài sản"
      this.isShow = true;
      
    },
    formatMoney(money) {
    //  return money.toLocaleString('vi', { style: "currency", currency: "VND" });
     return new Intl.NumberFormat(["ban", "id"]).format(money)
     
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
     * Author: TTDuc ( 04/10/2022)
     */
    selectItem(property) {
      this.selectedProperties = [];
      this.selectedProperties.push(property);
      this.currentProperty = property;
    },
    /**
     * hàm chọn tất cả item
     * Author: TTDuc (06/08/2022)
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
.rowActive{
  background-color: rgba(4, 137, 170, 0.2);
}
</style>