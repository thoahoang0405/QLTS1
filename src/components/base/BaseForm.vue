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
              v-model="fixedAsset.FixedAssetCode"
              type="text"
              id="txtAssetCode"
              placeholder="Nhập mã tài sản"
              class="item-input check-input"
              ref="FixedAssetCode"
              :class="error.FixedAssetCode != '' ? 'border-red' : ''"
              @blur="validate('FixedAssetCode')"
            
            />
            <p class="error" v-if="error.FixedAssetCode != ''">
              <span>{{ formInfo.fixedAssetCode }} </span
              >{{ error.FixedAssetCode }}
            </p>
          </div>
          <div class="row-input-right">
            <div class="lb">
              <label for="item-input">{{ formInfo.fixedAssetName }} </label>
              <span>*</span>
            </div>
            <br />
            <input
              v-model="fixedAsset.FixedAssetName"
              id="assetName"
              placeholder="Nhập tên tài sản"
              type="text"
              class="item-input check-input"
              ref="FixedAssetName"
              :class="error.FixedAssetName != '' ? 'border-red' : ''"
              @blur="validate('FixedAssetName')"
            />
            <p class="error" v-if="error.FixedAssetName != ''">
              <span>{{ formInfo.fixedAssetName }} </span
              >{{ error.FixedAssetName }}
            </p>
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{ formInfo.departmentCode }}</label
              ><span>*</span>
            </div>

            <Combobox
              class="item-input check-input"
              style="margin-top: 14px"
              :items="departments"
              :code="'DepartmentCode'"
              :fieldCode="'DepartmentCode'"
              :fieldName="'DepartmentName'"
              @selectedItem="selectItemCbb"
              refName="'DepartmentCode'"
              :border="error.DepartmentCode != '' ? 'border-red' : ''"
              @onBlur="validate('DepartmentCode')"
            />

            <p class="error" v-if="error.DepartmentCode != ''">
              <span>{{ formInfo.departmentCode }} </span
              >{{ error.DepartmentCode }}
            </p>
          </div>
          <div style="margin-left: 9px" class="row-input-right">
            <label for="item-input">{{ formInfo.departmentName }}</label>
            <br />
            <input readonly type="text" class="item-input"  v-model="fixedAsset.DepartmentName"/>
          </div>
        </div>
        <div class="row-input">
          <div class="row-input-left">
            <div class="lb">
              <label for="item-input">{{
                formInfo.fixedAssetCategoryCode
              }}</label>
              <span>*</span>
            </div>

            <br />
            <Combobox
              class="combobox item-input check-input"
              :items="fixedAssetCategory"
              :code="'FixedAssetCategoryCode'"
              :fieldCode="'FixedAssetCategoryCode'"
              :fieldName="'FixedAssetCategoryName'"
             
              @selectedItem="selectItemCategory"
              :value="fixedAsset.FixedAssetCategoryCode"
              refName="'FixedAssetCategoryCode'"
              :border="error.FixedAssetCategoryCode != '' ? 'border-red' : ''"
              @onBlur="validate('FixedAssetCategoryCode')"
            />
            <p class="error" v-if="error.FixedAssetCategoryCode != ''">
              <span>{{ formInfo.fixedAssetCategoryCode }} </span>{{ error.FixedAssetCategoryCode }}
            </p>

            <!-- <div class="icon icon-down-bold"></div> -->
          </div>
          <div style="margin-left: 9px" class="row-input-right">
            <label for="item-input">{{
              formInfo.fixedAssetCategoryName
            }}</label>
            <br />
            <input
              v-model="fixedAsset.FixedAssetCategoryName"
              readonly
              type="text"
              class="item-input"
            />
          </div>
        </div>
        <div class="row-input-cl3 input-number">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.quantity }} </label
              ><span>*</span>
            </div>
            <br />
            <el-input-number
              v-model="fixedAsset.Quantity"
              :min="1"
              :max="100000"
              :step="1"
              controls-position="right"
              size="large"
              @change="handleChange"
        
              :class="error.Quantity != '' ? 'border-red' : ''"
              @blur="validate('Quantity')"
            />

            <p class="error" v-if="error.Quantity != ''">
              <span>{{ formInfo.quantity }} </span>{{ error.Quantity }}
            </p>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.cost }}</label> <span>*</span>
            </div>
            <br />
            <input
            v-model="fixedAsset.Cost"
              type="text"
              id="price"
              class="check-input item-input text-right"
              ref="Cost"
              :class="error.Cost != '' ? 'border-red' : ''"
              @blur="validate('Cost')"
            />
            <p class="error" v-if="error.Cost != ''">
              <span>{{ formInfo.cost }} </span>{{ error.Cost }}
            </p>
          </div>

          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.usingYear }}</label
              ><span>*</span>
            </div>
            <br />
            <input
              v-model="fixedAsset.LifeTime"
              id="yearNumber"
              type="text"
              class="check-input item-input text-right"
              ref="LifeTime"
              :class="error.LifeTime != '' ? 'border-red' : ''"
              @blur="validate('LifeTime')"
            />
            <p class="error" v-if="error.LifeTime != ''">
              <span>{{ formInfo.usingYear }} </span>{{ error.LifeTime }}
            </p>
            <div class="text-error"></div>
          </div>
        </div>
        <div class="row-input-cl3 input-number">
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciationRate }}</label>
              <span>*</span>
            </div>
            <br />

            <el-input-number
              v-model="fixedAsset.DepreciationRate"
              :min="0"
              controls-position="right"
              size="large"
              @change="handleChange"
              :class="error.DepreciationRate != '' ? 'border-red' : ''"
              @blur="validate('DepreciationRate')"
            />

            <p class="error" v-if="error.DepreciationRate != ''">
              <span>{{ formInfo.depreciationRate }} </span>{{ error.DepreciationRate }}
            </p>
          </div>
          <div class="item-input-cl3">
            <div class="lb">
              <label for="item-input">{{ formInfo.depreciationYear }}</label>
              <span>*</span>
            </div>
            <br />
            <input
            v-model="fixedAsset.DepreciationValue"
              id="amorYear"
              type="text"
              class="check-input item-input text-right"
              ref="DepreciationValue"
              :class="error.DepreciationValue != '' ? 'border-red' : ''"
              @blur="validate('DepreciationValue')"
            />
            <p class="error" v-if="error.DepreciationValue != ''">
              <span>{{ formInfo.depreciationYear }} </span>{{ error.DepreciationValue }}
            </p>
          </div>

          <div class="item-input-cl3">
            <label for="item-input">{{ formInfo.followYear }}</label>
            <br />
            <input v-model="fixedAsset.ProductionYear" readonly type="text"  class="item-input text-right" />
          </div>
        </div>
        <div class="row-input-end">
          <div class="item-input-cl3" style="margin-right: 16px">
            <label for="item-input" style="margin-bottom: 8px">{{
              formInfo.purchaseDate
            }}</label>
            <br />
            <!-- <input type="date" class="item-input" /> -->
            <div class="form-input">
              <el-date-picker
                v-model="fixedAsset.PurchaseDate"
                type="date"
                :placeholder="dateConfig.Format"
                :format="dateConfig.Format"
                value-format="DD/MM/YYYY"
              />
            </div>
          </div>
          <div class="item-input-cl3">
            <label for="item-input" style="margin-bottom: 8px">{{
              formInfo.startUsingDate
            }}</label>
            <br />
            <div class="form-input">
              <el-date-picker
                v-model="fixedAsset.StartUsingDate"
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
        <button class="save btn-hover-blue" @click="onClickSave">
          {{ formInfo.btnSave }}
        </button>
        <button class="cancel btn-hover-outline" @click="showPopup">
          {{ formInfo.btnCancel }}
        </button>
      </div>
    </div>
    <Popup
      v-show="isShowPopup"
      @hidePopup="hidePopup"
      @hidePopAndForm="hidePopupAndForm"
      :msg="msgError"
    ></Popup>
  </div>
</template>
<script>
// import {
//  URL_Department

// } from "../../js/common/urlAsset";

import Combobox from "./BaseCombobox.vue";
import axios from "axios";
import { ElDatePicker } from "element-plus";
import { ElInputNumber } from "element-plus";
import vi from "element-plus/lib/locale/lang/vi";
import { DateConfig } from "../../js/common/config";
import { Form } from "../../js/common/form";
import Popup from "../base/BasePopup.vue";
import { ErrorMsg } from "../../js/common/resource";

// import { ErrorCode } from "../../js/common/enumeration";
export default {
 
  data() {
    return {
       fixedAssetCategory: [],
       fixedAssetCategoryCode:"",
       fixedAssetCategoryId: "",
       fixedAssetCategoryName: "",
      departments: [],
      departmentCode: "",
      departmentID: "",
      departmentName: "",
      ElDatePickerLocale: vi,
      purchaseDate: "",
      startUsingDate: "",
      dateConfig: DateConfig,
      formInfo: Form,
      itemSelectCbb: {},
      isShowPopup: false,
      attritionRate: "",
      usingYear: 10,
      EmployeeCode: "",
      quantity: 1,
      keyWord:"",
      cost: 0,
      depreciationRate: 0,
      depreciationYear: 1,
     
      listErrorRequired:  [],
      fixedAsset: {
        FixedAssetCode: "",
        FixedAssetName: "",
        FixedAssetCategoryCode: "",
        DepreciationRate: 0,
        DepreciationValue: 0,
        CreatedBy: "Thỏa",
        CreatedDate: "1000-01-01",
        DepartmentCode: "",
        DepartmentID: "",
       DepartmentName: "",
        Cost: 0,
        ModifiedBy: "Thỏa",
        ModifiedDate: "1000-01-01",
        FixedAssetID: "",
        FixedAssetCategoryID: "",
        FixedAssetCategoryName: "",
        PurchaseDate: "",
        Quantity: 0,
        StartUsingDate: "",
        ProductionYear: "",
        usedYear: 0,
        msgError:"",
      }, // tài sản
      error: {
        FixedAssetCode: "",
        FixedAssetName: "",
        DepartmentCode: "",
        FixedAssetCategoryCode: "",
        Quantity: "",
        Cost: "",
        LifeTime: "",
        DepreciationRate: "",
        DepreciationValue: "",
        PurchaseDate: "",
     
      }, //  các thông báo lỗi
      rules: {
       FixedAssetCode: {Required: true},
        FixedAssetName: {Required: true},
        FixedAssetCategoryCode: {Required: true},
        DepreciationRate: {Required: true, Major: 1},
        DepreciationValue:{Required: true ,Price: true},
      
        DepartmentCode: {Required: true},
     
        DepartmentName: "",
        Cost: {Required: true, Price: true},
        LifeTime: {Required: true, Major: 1},
        FixedAssetID: {Required: true},
        FixedAssetCategoryID: {Required: true},
        FixedAssetCategoryName: "",
        PurchaseDate: {Required: true},
        Quantity: {Required: true},
        
      }
    
    };
  },
  
  components: {
    Combobox,
    ElDatePicker,
    Popup,
    ElInputNumber,
  },

  watch: {
    /**
     * lấy thông tin nhân viên từ component cha
     * AUTHOR: HTTHOA(28/02/2023)
     */
     fixedAsset: function(value){
      if(this.fixedAsset[value]){
        this.error[value]=""
      }
      
    },
    fixedAssetDetail: function (value) {
      this.fixedAsset = value;
      this.departmentCode = value.DepartmentCode;
      this.departmentName = value.DepartmentName;
      value.PurchaseDate = this.fomartDate(value.PurchaseDate);
      value.StartUsingDate = this.fomartDate(value.StartUsingDate);
      this.fixedAsset.PurchaseDate = value.PurchaseDate;
      this.fixedAsset.StartUsingDate = value.StartUsingDate;
      this.oldData = { ...value };
      console.log(value);
    },
    newCodeForm:function(value){
      this.fixedAsset.FixedAssetCode=value
    }
    
    
  },
  props: ["fixedAssetDetail", "fixedAssetIdSelected", "item", "formName","newCodeForm"],
  mounted(){
    this.setFocus()
  },
  methods: {
    onClickSave() {
      try {
       
        if (this.validateAll()) {
        console.log(4)
        }
      } catch (err) {
        console.log(err);
      }
    },
    
    setFocus(){
      this.$nextTick(function(){
      this.$refs["FixedAssetCode"].focus()
    })
    },
   
    validateAll() {
      let isValidAll = true; // biến check lỗi tổng
      for (const propName in this.rules) {
        let isValid = true; // biến check lỗi khi duyệt qua 1 trường dữ liệu

        for (const key in this.rules[propName]) {
          if (isValid) {
            let functionName = `validate${key}`;

            // kiểm tra nếu còn đúng thì validate tiếp
            if (isValid == true) {
              isValid = this[functionName](this.rules[propName][key], propName);
            }
          }
        }
        if (isValidAll) {
          isValidAll = isValid;
        }
      }

      // thực hiện focus vào lỗi
      // if (!isValidAll) {
      //   this.focusToError();
      // }

      return isValidAll;
    },
    validate(propName) {
      // sau 0.2s thì validate để cập nhật dữ liệu trước khi validate
      setTimeout(() => {
        let isValid = true; //  biến lưu giá trị validate sau mỗi vòng for
        for (const key in this.rules[propName]) {
          let functionName = `validate${key}`;
          if (isValid == true) {
            isValid = this[functionName](this.rules[propName][key], propName);
          }
        }
      }, 200);
    },
    validateRequired(value, propName) {
      // kiểm tra rỗng thì lưu lại lỗi và trả về false
      if (!this.fixedAsset[propName] ) {
        this.error[propName] = ErrorMsg.Required;
        return false;
      }
      this.error[propName] = "";
      return true;
    },
    validateMajor(value, propName) {
      // số năm sử dụng thay đổi thì kiểm tra lại tỷ lệ hao mòn
      if (propName == "LifeTime") {
        this.fixedAsset.DepreciationRate = parseFloat(
            (value / this.fixedAsset.LifeTime).toFixed(2)
          );
        
      }

      // tỷ lệ hao mòn thay đổi thì kiểm tra lại số năm sử dụng
      if (propName == "DepreciationRate") {
        if (
          this.fixedAsset.DepreciationRate !=
          (value / this.fixedAsset.LifeTime).toFixed(2)
        ) {
          this.msgError="tỉ lệ hao mòn phải bằng 1/ số năm sử dụng"
          this.showPopup()
          this.fixedAsset.DepreciationRate = parseFloat(
            (value / this.fixedAsset.LifeTime).toFixed(2)
          );
         
          return false;
        }
        return true;
      }
    },
    validatePrice(value,propName){
      var cost= parseInt(this.fixedAsset.Cost)
      var rate=parseFloat(this.fixedAsset.DepreciationRate)
      if (propName == "Cost") {
        
        this.fixedAsset.DepreciationValue = parseInt(cost*rate)
       
      }
      if (propName == "DepreciationValue") {
        if (
          this.fixedAsset.DepreciationValue > cost
        ) {
          // this.contentFormConfirm = ErrorMsg.AttritionRate;
          // this.commandNameForm = CommandNameFormDetail.Notice;
          // this.isShowFormConfirm = true;
          this.msgError="Giá trị hao mòn phải nhỏ hơn nguyên giá"
          this.showPopup()
          this.fixedAsset.DepreciationValue = parseInt(cost*rate)
         
          return false;
        }
        this.fixedAsset.DepreciationRate = parseFloat(this.fixedAsset.DepreciationValue/cost)
        this.fixedAsset.LifeTime=1/  this.fixedAsset.DepreciationRate

        return true;
      }
    },
    // validateAll() {
    //   let isValidAll = true; // biến check lỗi tổng
    //   for (const propName in this.rules) {
    //     let isValid = true; // biến check lỗi khi duyệt qua 1 trường dữ liệu

    //     for (const key in this.rules[propName]) {
    //       if (isValid) {
    //         let functionName = `validate${key}`;

    //         // kiểm tra nếu còn đúng thì validate tiếp
    //         if (isValid == true) {
    //           isValid = this[functionName](this.rules[propName][key], propName);
    //         }
    //       }
    //     }
    //     if (isValidAll) {
    //       isValidAll = isValid;
    //     }
    //   }

    //   // thực hiện focus vào lỗi
    //   if (!isValidAll) {
    //     this.focusToError();
    //   }

    //   return isValidAll;
    // },
    // validateRequired(name) {

    //   console.log(this.keyWord);
    //   if(!this.keyWord ){
    //     this.error[name] = ErrorMsg.Required;
        
      
    //   }else{
    //     this.error[name] = "";
        
        
    //   }
    
    //   if(this[name]== 0){
    //     this.error[name] = ErrorMsg.Required;
        
       
     
    //   }else{
    //     this.error[name] = "";
       
    //   }
    //   if (!this.$refs[name].value) {
    //     this.error[name] = ErrorMsg.Required;
    //   } else {
    //     this.error[name] = "";
    //   }
    // },
    // validate(name){
     
    //   if(!this.fixedAsset[name]){
    //     this.error[name] = ErrorMsg.Required;
       
    //   }else{
    //     this.error[name]=""
        
    //   }
    // },
    fomartDate(date) {
      try {
        if (date) {
          date = new Date(date);
          let newDate = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          newDate = newDate < 10 ? `0${newDate}` : newDate;
          month = month < 10 ? `0${month}` : month;
          return `${newDate}-${month}-${year}`;
        }
      } catch (error) {
        return "";
      }
    },
    /**
     * lấy thông tin phòng ban từ combobox
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItemCbb(value) {
    
      this.departmentName = value.DepartmentName;
      this.fixedAsset.DepartmentCode=value.DepartmentCode
      this.fixedAsset.DepartmentName=value.DepartmentName
      console.log(this.fixedAsset.DepartmentCode);
    },
    selectItemCategory(value){
      this.fixedAsset.FixedAssetCategoryName=value.FixedAssetCategoryName
      this.fixedAsset.FixedAssetCategoryCode=value.FixedAssetCategoryCode
    },
    /**
     * đóng form chi tiết
     * AUTHOR: HTTHOA(28/02/2023)
     */
    closeForm() {
      this.$emit("close", false);
      this.fixedAsset={}
    },
    /**
     * lấy thông tin phòng ban
     * AUTHOR: HTTHOA(28/02/2023)
     */
    getDepartments() {
      try {
        axios
          .get("https://localhost:44371/api/Departments")
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
    getCategory(){
      try {
        axios
          .get("https://localhost:44371/api/FixedAssetCategory")
          .then((response) => {
            this.fixedAssetCategory = response.data;
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
    setCategory(fixedAssetCategory){
      if(this.disabled) return;
      for(const item of fixedAssetCategory){
        this.fixedAssetCategoryCode=item.FixedAssetCategoryCode
        this.fixedAssetCategoryName=item.FixedAssetCategoryName
        this.fixedAssetCategoryId=item.FixedAssetCategoryId

      }

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
    },
    /**
     * đóng popup, form
     * AUTHOR: HTTHOA(28/02/2023)
     */
    hidePopupAndForm(value) {
      this.isShowPopup = value;
      this.closeForm();
    },
  },

  created() {
    this.getDepartments();
    this.getCategory();
    
  },
};
</script>
<style>
.border-red {
  border: 1px solid red;
}
.el-input-number .el-input-number__decrease .el-icon svg {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -72px -338px !important;
  width: 10px !important;
  height: 8px !important;
}
.el-input-number .el-input-number__increase .el-icon svg {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -28px -338px !important;
  width: 10px !important;
  height: 8px !important;
}
.el-input-number .el-icon {
  font-size: 18px !important;
  width: 10px !important;
  height: 8px !important;
}
.el-input-number.is-controls-right
  .el-input-number__decrease
  [class*="el-icon"],
.el-input-number.is-controls-right
  .el-input-number__increase
  [class*="el-icon"] {
  transform: none !important;
}
.el-input-number--large {
  width: 260px !important;
  line-height: 38px;
  box-sizing: border-box;
}
.el-input-number path {
  display: none;
}
.el-input-number__decrease,
.el-input-number__increase {
  background: #ffff !important;
  border: none !important;
}
.el-input-number--large .el-input-number__decrease,
.el-input-number--large .el-input-number__increase {
  width: 35px !important;
}
.el-input-number.is-controls-right[class*="large"] [class*="decrease"] {
  --el-input-number-controls-height: 10px !important;
  height: 8px !important;
  margin-bottom: 8px;
}
.el-input-number.is-controls-right[class*="large"] [class*="increase"] {
  --el-input-number-controls-height: 10px !important;
  margin-top: 18px;
  height: 8px !important;
}
.el-input-number .el-input__inner {
  margin-right: -155px;
  padding: 0px 0px 0px 0px;
}
.input-number .el-input__wrapper {
  margin-top: 8px;
  padding: 1px 20px 0 14px !important;
}
.el-input-number.el-input-number--large.is-controls-right {
  border: none !important;
}
</style>
