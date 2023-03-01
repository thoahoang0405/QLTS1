<template>
 
     <div id="form">
    <div class="form">
      <div class="form-header">
        <h2 id="hd-form">{{ formName }}</h2>
        <div class="icon icon-close" @click="closeForm">
          <div class="toolipClose">{{ formInfo.btnClose }}</div>
        </div>
       
      </div>
      <div class="form-body">
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixedAssetCode }} </label>
              <span>*</span>
            </div>

            <br />
            <input
              v-model="employee.EmployeeCode"
              type="text"
              id="txtAssetCode"
              placeholder="Nhập mã tài sản"
              class="item-input check-input"
            />
            <div class="text-error"></div>
          </div>
          <div class="row-input-right">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixedAssetName }} </label>
              <span>*</span>
            </div>
            <br />
            <input
              v-model="employee.FullName"
              id="assetName"
              placeholder="Nhập tên tài sản"
              type="text"
              class="item-input check-input"
            />
            <div class="text-error"></div>
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{ formInfo.departmentCode }}</label><span>*</span>
            </div>

            <Combobox class="item-input check-input" style="margin-top: 14px" />
            <!-- <input type="text" placeholder="Chọn mã bộ phận sử dụng" class="item-input check-input" /> -->
            <div class="text-error"></div>
            <!-- <div class="icon icon-down-bold"></div> -->
          </div>
          <div style="margin-left: 9px" class="row-input-right">
            <label for="item-input">{{ formInfo.departmentName }}</label>
            <br />
            <input readonly type="text" class="item-input" />
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixedAssetCategoryCode }}</label> <span>*</span>
            </div>

            <br />
            <Combobox
              class="combobox item-input check-input"
              :items="departments"
              :code="'DepartmentCode'"
              :fieldCode="'DepartmentCode'"
              :fieldName="'DepartmentName'"
              :refName="'DepartmentCode'"
              @selectedItem="selectItemCbb"
            />

      
            <div class="text-error"></div>
            <!-- <div class="icon icon-down-bold"></div> -->
          </div>
          <div style="margin-left: 9px" class="row-input-right">
            <label for="item-input">{{ formInfo.fixedAssetCategoryName}}</label>
            <br />
            <input v-model="departmentName" readonly type="text" class="item-input" />
          </div>
        </div>
        <div class="row-input-cl3">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.quantity }} </label><span>*</span>
            </div>
            <br />
            <input type="number" class="check-input item-input text-right" />
            <div class="text-error"></div>
            <div class="up-down">
              <div class="icon-up-bold"></div>
              <div class="icon-down-bold"></div>
            </div>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.cost }}</label> <span>*</span>
            </div>
            <br />
            <input
              type="text"
              id="price"
              class="check-input item-input text-right"
            />
            <div class="text-error"></div>
          </div>

          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.usingYear }}</label><span>*</span>
            </div>
            <br />
            <input
              id="yearNumber"
              type="text"
              class="check-input item-input text-right"
            />
            <div class="text-error"></div>
          </div>
        </div>
        <div class="row-input-cl3">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciationRate }}</label> <span>*</span>
            </div>
            <br />
            <input
              id="wearRate"
              type="number"
              class="check-input item-input text-right"
            />
            <div class="text-error"></div>
            <div class="up-down">
              <div class="icon-up-bold"></div>
              <div class="icon-down-bold"></div>
            </div>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciationYear }}</label>
              <span>*</span>
            </div>
            <br />
            <input
              id="amorYear"
              type="text"
              class="check-input item-input text-right"
            />
            <div class="text-error"></div>
          </div>

          <div class="item-input-cl3">
            <label for="item-input">{{ formInfo.followYear }}</label>
            <br />
            <input readonly type="text" class="item-input text-right" />
          </div>
        </div>
        <div class="row-input-end">
          <div class="item-input-cl3" style="margin-right: 16px">
            <label for="item-input" style="margin-bottom: 8px">{{ formInfo.purchaseDate }}</label>
            <br />
            <!-- <input type="date" class="item-input" /> -->
            <div class="form-input">
              <el-date-picker
              v-model="purchaseDate"
                type="date"
                :placeholder="dateConfig.Format"
                :format="dateConfig.Format"
                value-format="DD/MM/YYYY"
              /> 
            </div>
          </div>
          <div class="item-input-cl3">
            <label for="item-input" style="margin-bottom: 8px"
              >{{ formInfo.startUsingDate}}</label
            >
            <br />
            <div class="form-input">
              <el-date-picker
                v-model="startUsingDate"
                type="date"
                :placeholder="dateConfig.Format"
                :format="dateConfig.Format"
                value-format="DD/MM/YYYY"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button class="save btn-hover-blue" onclick="onClickSave()">{{ formInfo.btnSave }}</button>
        <button class="cancel  btn-hover-outline" @click="showPopup">{{ formInfo.btnCancel }}</button>
      </div>
    </div>
<Popup v-show="isShowPopup" @hidePopup="hidePopup" @hidePopAndForm="hidePopupAndForm"></Popup>
  </div>
  

 

</template>
<script>
// import {
//  URL_Department

// } from "../../js/common/urlAsset";



import Combobox from "./BaseCombobox.vue";
import axios from "axios";
import { ElDatePicker} from "element-plus";
import vi from "element-plus/lib/locale/lang/vi";
import { DateConfig } from "../../js/common/config";
import { Form } from "../../js/common/form"
import Popup from '../base/BasePopup.vue'
export default {
  data() {
    return {
      employee: {},
      departments: [],
      departmentCode: "",
      departmentID: "",
      departmentName: "",
      ElDatePickerLocale: vi,
      purchaseDate: "",
      startUsingDate:"",
      dateConfig: DateConfig,
      formInfo: Form,
      itemSelectCbb:{},
      isShowPopup:false,
      
      
    };
  },
  components: {
    Combobox,
    ElDatePicker,Popup
  },

  watch: {
    /**
     * lấy thông tin nhân viên từ component cha
     * AUTHOR: HTTHOA(28/02/2023)
     */
    employeeDetail: function (value) {
      this.employee = value;
      this.oldEmp = { ...value };
      console.log(value);
    },
  },
  props: ["employeeDetail", "employeeSlId", "item","formName"],

  methods: {
    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCbb(value){
      this.departmentName=value.DepartmentName
      console.log(value);
    },
    /**
     * đóng form chi tiết
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.$emit("close", false);
    },
    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getDepartments() {
      try {
        axios
        .get("https://apidemo.laptrinhweb.edu.vn/api/v1/Departments")
        .then((response) => {
          this.departments = response.data;
          console.log(this.departments);
        })
        .catch((err) => {
          console.log(err);
        });
        
      } catch (error) {
        console.log(error);
      }
      
    },
    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    setDepartment(department) {
      if (this.disabled) return;
      for (const item of department) {
        this.departmentName = item.DepartmentName;
        this.departmentCode = item.DepartmentCode;
        this.departmentID = item.DepartmentID;
        console.log(this.departmentCode);
      }
    },
    /**
     * hiển thị popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    showPopup(){
      this.isShowPopup=!this.Popup
    },
    /**
     * đóng popup
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopup(value){
      this.isShowPopup=value
    },
    /**
     * đóng popup, form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopupAndForm(value){
      this.isShowPopup=value;
      this.closeForm()

    }
  },

  created() {
    this.getDepartments();
    //   this.purchasingDate = this.formatDate(
    //   this.purchasingDate
    // );
  },
};
</script>
<style>

</style>
