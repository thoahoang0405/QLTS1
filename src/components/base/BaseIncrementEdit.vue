<template>
  <div id="form"  @keyup.esc="hideFormEdit"
    tabindex="0">
    <div class="form increment-form">
      <div class="form-header">
        <h2 id="hd-form">Sửa tài sản {{ fixedAssetName }}</h2>
        <div class="icon icon-close" @click="hideFormEdit">
          <div class="toolipClose">{{ formInfo.btnClose }}</div>
        </div>
      </div>
      <div class="form-body">
        <div class="group-input">
          <label for="">Bộ phận sử dụng</label>
          <br />
          <input
            class="form-input"
            v-model="departmentName"
            disabled
            type="text"
          />
        </div>
        <div class="edit-cost">
          <h4 class="title">Nguyên giá</h4>

          <div class="input-budget">
            <div class="row-input" style="margin-bottom: -11px">
              <div class="input-row-left">
                <label for="">Nguồn hình thành</label>
              </div>
              <div class="input-row-right">
                <label for="">Giá trị</label>
              </div>
            </div>
            <div
              class="row-input"
              v-for="(budget, index) in budgetsArray"
              :key="index"
            >
              <div class="input-row-left">
                <Combobox
                  class="item-input check-input"
                  style="margin-top: 14px"
                  :items="budgets"
                  :code="'budget_name'"
                  :fieldCode="'budget_name'"
                  :fieldName="'budget_name'"
                  :value="budget.budget_name"
                  v-model="budgetsArray.budget_name"
                  :border="
                    this.budgetErrorName.includes(index) ? 'border-red' : ''
                  "
                  @selectedItem="
                    (item) => (budget.budget_name = item.budget_name)
                  "
                />
                <p class="error" v-if="this.budgetErrorName.includes(index)">
                  <!-- <span>{{ formInfo.department_code }} </span -->

                  {{ msgError }}
                </p>
              </div>
              <div class="input-row-right">
                <input
                  class="input-right text-right"
                  @blur="changeTotal"
                  v-model="budget.mount"
                  v-number="number"
                  type="text"
                  :class="
                    this.budgetErrorMount.includes(index) ? 'border-red' : ''
                  "
                />
                <p class="error" v-if="this.budgetErrorMount.includes(index)">
                  Không được để trống
                </p>
              </div>
              <div class="function-controll">
                <div class="icon plus">
                  <div class="icon-plus" @click="addBudget"></div>

                  <div class="tooltip-plus">Thêm nguồn hình thành</div>
                </div>
                <div class="icon minus">
                  <div
                    class="icon-minus"
                    v-if="budgetsArray.length > 1"
                    @click="removeBudget(budget)"
                  ></div>

                  <div v-if="budgetsArray.length > 1" class="tooltip-minus">
                    Xóa nguồn hình thành
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="group-bottom">
          <div class="row-input">
            <div class="input-row-left">
              <input disabled class="input-left" type="text" value="Tổng" />
            </div>
            <div class="input-row-right">
              <input
                disabled
                class="input-right text-right"
                type="text"
                v-model="itemSelect.cost"
                v-number="number"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button class="save btn-hover-blue" @click="save">
          {{ formInfo.btnSave }}
          <div class="tooltipSave">Ctrl + S</div>
        </button>

        <button class="cancel btn-hover-outline">
          {{ formInfo.btnCancel }}
        </button>
      </div>
    </div>
  </div>
  <ChooseAsset
    v-if="showFormChooseAsset"
    @closeChooseAsset="closeFormChoose"
  ></ChooseAsset>
</template>
<script>
import { FormIncrement } from "../../js/common/form";
import Combobox from "./BaseCombobox.vue";
import ChooseAsset from "../base/BaseChooseAsset.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import MSFunction from "../../js/common/function";
import { Msg } from "../../js/common/resource";

import { directive as VNumber } from "@coders-tm/vue-number-format";
import { URL_Budget, URL_FixedAssetsPut,URL_FixedAssets } from "@/js/common/urlAsset";
export default {
  data() {
    return {
      formInfo: FormIncrement,
      showFormChooseAsset: false,
      budgetsArray: [],
      fixedAssetName: "",
      departmentName: "",
      itemSelect: {},
      idSelected: "",
      budgets: [],
      arrayCost: [],
      total_Price: 0,
      isValid: true,
      number: {
        decimal: ",",
        separator: ".",
        prefix: "",
        precision: 2,
      },
      error: {
        budget_name: "",
        mount: "",
      },
      rules: {
        budget_name: { Required: true },
        mount: { Required: true },
      },
      budgetErrorName: [],
      budgetErrorMount: [],
      msgError: "",
    };
  },
  directives: {
    number: VNumber,
  },
  props: ["fixedAssetSelected"],
  components: {
    ChooseAsset,
    Combobox,
  },
  created() {
    this.idSelected = this.fixedAssetSelected;
    console.log(this.idSelected);
    this.getFixedAsset();
    this.getBudget();

    // for (const item of this.budgetsArray) {
    //   item.mount=this.formatMoney(item.mount)
    // }
  },
  computed: {
    a: function () {
      return this.$store.state.transaction.budgetsArray;
    },
  },
  watch: {
    /**
     *
     * theo dõi giá của tài sản
     * AUTHOR: HTTHOA(25/04/2023)
     */
    total_Price: function (data) {
      this.itemSelect.cost = data;
    },
    /**
     *
     * theo dõi nguồn của tài sản
     * AUTHOR: HTTHOA(25/04/2023)
     */
    budgetsArray: function (data) {
      // handler() {
      this.total_Price = 0;
      for (const budget of data) {
        budget.mount = parseInt(budget.mount);
        this.total_Price += budget.mount;
      }
    },
  },

  methods: {
    // validateRequired(){
    //   // this.sValid=true
    //   for(var i=0; i< this.budgetsArray.length; i++){
    //    if(this.budgetsArray[i].budget_name ==""){
    //     if(this.budgetErrorName.includes(i)) return ;
    //       this.budgetErrorName.push(i)
    //       this.msgError="Không được để trống!"
    //       this.isValid=false
    //    }else{
    //     if(this.budgetErrorName.includes(i)){
    //       this.msgError=""
    //    this.budgetErrorName.splice(this.budgetErrorName.indexOf(i), 1);
    //    this.isValid=true
    //     }
    //    }
    //    if(this.budgetsArray[i].mount <=0){
    //     if(this.budgetErrorMount.includes(i)) return ;
    //       this.budgetErrorMount.push(i)
    //       this.isValid=false
    //    }else{
    //     if(this.budgetErrorMount.includes(i)){
    //    this.budgetErrorMount.splice(this.budgetErrorMount.indexOf(i), 1);
    //    this.isValid=true
    //     }
    //    }
    //   }
    //  },
    // validateDuplicate(){
    //  for(var i=0; i<this.budgetsArray.length; i++){
    //   for(var j=0; j< this.budgetsArray.length; i++){
    //     if(this.budgetsArray[i].budget_name!="" && this.budgetsArray[j].budget_name!=""){
    //       if(this.budgetsArray[i].budget_name==this.budgetsArray[j].budget_name){
    //         this.budgetErrorName.push(i)
    //         this.budgetErrorName.push(j)
    //         this.isValid=false
    //         this.msgError="Tên nguồn hình thành không được trùng!"
    //       }else{
    //         if(this.budgetErrorName.includes(i)){
    //         this.budgetErrorName.splice(this.budgetErrorName.indexOf(i), 1);
    //          this.isValid=true
    //          this.msgError=" "
    //     }
    //     if(this.budgetErrorName.includes(j)){
    //         this.budgetErrorName.splice(this.budgetErrorName.indexOf(j), 1);
    //          this.isValid=true
    //          this.msgError=" "
    //     }
    //       }
    //     }
    //   }
    //  }
    // },
    /**
     * lấy tài sản theo id
     * AUTHOR: HTTHOA(25/04/2023)
     */
    getFixedAsset() {
      var me = this;
      axios
        .get(`${URL_FixedAssets}/${this.idSelected}`)
        .then(function (res) {
          me.itemSelect = res.data;

          me.fixedAssetName = me.itemSelect.fixed_asset_name;
          me.departmentName = me.itemSelect.department_name;
          if (me.itemSelect.total_cost == null) {
            me.budgetsArray = [{ budget_name: "", mount: 0 }];
          } else {
            me.budgetsArray = JSON.parse(me.itemSelect.total_cost);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * thay đổi giá
     * AUTHOR: HTTHOA(25/04/2023)
     */
    changeTotal() {
      this.total_Price = 0;
      for (const budget of this.budgetsArray) {
        // budget.mount= this.convertMoneyToNum(budget.mount)
        this.total_Price += this.convertNumber(budget.mount);
      }
    },

    convertNumber(data) {
      return MSFunction.convertMoneyToNum(data);
    },
    formatMoney(data) {
      return MSFunction.formatMoney(data);
    },
    /**
     * click nút lưu
     * AUTHOR: HTTHOA(25/04/2023)
     */
    save() {
      for (const budget of this.budgetsArray) {
        budget.mount = this.convertNumber(budget.mount);
      }
      this.itemSelect.cost = this.convertNumber(this.itemSelect.cost);
      this.$emit("costEdit", this.itemSelect.cost);
      this.itemSelect.total_cost = JSON.stringify(this.budgetsArray);
      console.log(this.itemSelect);
      this.editData();
      // }
    },
    /**
     * sửa nguồn  tài sản
     * AUTHOR: HTTHOA(25/04/2023)
     */
    editData() {
      var me = this;
      const toast = useToast();
      axios
        .put(
          `${URL_FixedAssetsPut}${this.idSelected}`,
          this.itemSelect
        )
        .then(function () {
          me.hideFormEdit();
          me.getFixedAsset();
          toast.success(Msg.EditSucces, { timeout: 2000 });
          me.load();
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    load() {
      this.emitter.emit("loadFixedAsset");
    },
   
    /**
     * lấy danh sách nguồn ngân sách
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getBudget() {
      var me = this;
      axios
        .get(`${URL_Budget}`)
        .then(function (res) {
          me.budgets = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * đóng form sửa
     * AUTHOR: HTTHOA(18/4/2023)
     */
    hideFormEdit() {
      this.$emit("hideFormEdit", false);
    },
    /**
     * thêm hàng ngân sách
     * AUTHOR: HTTHOA(18/4/2023)
     */
    addBudget() {
      try {
        if (this.budgetsArray.length < 4) {
          this.budgetsArray.push({ budget_name: "", mount: 0 });
          this.getBudget();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * xóa 1 hàng ngân sách
     * AUTHOR: HTTHOA(18/4/2023)
     */
    removeBudget(item) {
      try {
        if (this.budgetsArray.length > 1) {
          this.budgetsArray.splice(this.budgetsArray.indexOf(item), 1);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.plus,
.minus {
  position: relative;
}
.tooltip-plus,
.tooltip-minus {
  padding: 4px 12px;
  background-color: #fff;
  color: #000;
  position: absolute;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 1;
  top: 22px;
  right: -10px;
  /* left: 0px; */
  min-width: 140px;
  display: none;
}
.minus:hover .tooltip-minus,
.plus:hover .tooltip-plus {
  display: block;
}
.border-red {
  border-color: red;
}
/* #form{
  margin-left: -318px;
    margin-top: -673px;
} */
.input-budget {
  height: 100%;
  overflow-y: auto;
}
.down {
  top: 61% !important;
}
input .input {
  margin-top: 0px !important;
}
.group-bottom {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
.m-combobox[data-v-231d0ffa] {
  margin-top: 4px !important;
}
.m-combobox .input {
  margin-top: 0px !important;
}
.input-row-right,
.input-row-left {
  position: relative;
}
.input-row-left .icon-down-bold {
  position: absolute;
  bottom: -7px;
  right: 16px;
}
.note {
  width: 100%;
}
.function-controll {
  width: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  position: relative;
}
.edit-cost {
  margin-top: 16px;
  height: calc(100% - 130px);
}
.input-row-left {
  width: 50%;
  margin-right: 16px;
}

.input-left {
  width: 100%;
}
.input-row-right {
  margin-right: 16px;
  width: 20%;
}
.input-row-right input {
  width: 100%;
}
.el-input__wrapper {
  width: 269px !important;
}
.input-row {
  margin-top: 10px;
}
.row-input-end input {
  width: 304px;
}

.form-body {
  background-color: #fff;
  padding: 16px;
  position: relative;
}
.form-input {
  width: 60%;
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
  width: 700px;
  height: 550px;
}
.increment-form .body-item-bottom {
  height: calc(100% - 200px) !important;
}
.form-body {
  height: calc(100% - 104px);
}
.input-budget::-webkit-scrollbar {
  width: 8px;
}

.input-budget::-webkit-scrollbar-thumb {
  background-color: #afafaf;
  border-radius: 2px;
}
</style>
