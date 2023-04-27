<template>
  <div id="table">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th class="text-center width-fit">
              <input
                type="checkbox"
                :checked="listIncrementSelected.length == incrementList.length"
                @click="selectedAllItem"
              />
            </th>

            <th class="stt">
              {{ inforTable.numeric }}
              <div class="tooltip-stt">Số thứ tự</div>
            </th>

            <th class="th-width-150">{{ inforTable.documentNumber }}</th>
            <th class="th-width-150 text-center">
              {{ inforTable.documentDate }}
            </th>
            <th class="th-width-150 text-center">
              {{ inforTable.increaseDate }}
            </th>
            <th class="th-width-150 text-right">{{ inforTable.totalCost }}</th>
            <th class="th-width-max">{{ inforTable.content }}</th>

            <th class="th-width-min"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(increment, index) of incrementList"
            :key="increment.voucher_id"
            :class="
              listIncrementSelected.includes(increment) ||
              selectIdItem == increment.voucher_id
                ? 'active'
                : ''
            "
            @click="selectItemID(increment)"
          >
            <td class="text-center">
              <input
                type="checkbox"
                :checked="listIncrementSelected.includes(increment)"
                @click="selectItemToList(increment)"
              />
            </td>
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-blue">{{ increment.voucher_code }}</td>
            <td class="text-center">
              {{ formatDate(increment.voucher_date) }}
            </td>
            <td class="text-center">
              {{ formatDate(increment.fixed_asset_increment_date) }}
            </td>
            <td class="text-right">{{ formatMoney(increment.total_price) }}</td>
            <td class="th-width-max">{{ increment.description }}</td>

            <td class="th-width-min">
              <div class="function-table">
                <div class="icon icon-edit" @click="showFormEdit(increment)">
                  <div class="tooltip">Nhân bản</div>
                </div>
                <div
                  class="icon icon-delete"
                  @click="deleteIncrement(increment)"
                >
                  <div class="tooltip">Xóa</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="main-table">
               </div> -->
    <table class="tb-footer">
      <thead>
        <tr
          style="
            background: #f5f5f5;
            border-bottom: 1px solid #e2e2e2;
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
                  <div class="up-down" @click="btnDropUp">
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

          <td
            colspan="1"
            class="text-right"
            style="width: 150px; box-sizing: border-box"
          >
            <div class="total-price">
              <strong>{{ formatMoney(totalCost) }}</strong>
            </div>
          </td>

          <td colspan="2" style="box-sizing: border-box"></td>
        </tr>
      </thead>
    </table>
  </div>
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
import { TableIncrease } from "../../js/common/table";
import axios from "axios";
import { URL_FixedAssetIncrements } from "@/js/common/urlAsset";
import MSFunction from "../../js/common/function";
import Paginate from "vuejs-paginate-next";
import { FormDetailMode } from "../../js/common/enumeration";
export default {
  components: { Paginate },
  props: ["loadData", "txtSearch"],
  data() {
    return {
      employee: [],
      inforTable: TableIncrease,
      totalPage: 0,
      totalRecord: 0,
      pageNumber: 1,
      isActive: "20",
      pageDefault: 10,
      isShowPage: false,
      totalCost: 0,
      isShowLoad: false,
      incrementList: [],
      listIncrementSelected: [],
      currentIncrement: {},
      selectIdItem: "",
      keyword: "",
      formModeEdit: FormDetailMode.Edit,
      titleFormEdit: TableIncrease.titleEdit,
      modeTable: FormDetailMode.Replication,
    };
  },
  watch: {
    listIncrementSelected: function (data) {
      this.$emit("listIncrement", data);
    },
    selectIdItem: function (data) {
      this.$emit("idSelected", data);
    },
    loadData: function () {
      this.getPagingAsset();
    },
    txtSearch: function (data) {
      this.keyword = data;
      this.getPagingAsset();
    },
  },
  created() {
    this.getPagingAsset();
  },
  mounted() {
    this.emitter.on("loadDataIncrement", () => {
      this.listIncrementSelected = [];
      this.getPagingAsset();
    });
  },
  methods: {
    showFormEdit(increment) {
      this.$emit(
        "modeEdit",
        FormDetailMode.Edit,
        this.titleFormEdit,
        increment
      );
    },
    deleteIncrement(increment) {
      this.$emit("deleteOne", increment);
    },
    /**
     *
     * @param {lấy id chứng từ} increment
     * AUTHOR: HTTHOA(18/4/2023)
     */
    selectItemID(increment) {
      this.selectIdItem = increment.voucher_id;
      this.$emit("idSelected", this.selectIdItem);
    },
    /**
     * thêm phần tử xóa và bỏ khi đã được chọn
     * AUTHOR: HTTHOA (20/03/2023)
     */
    selectItemToList(increment) {
      try {
        this.currentIncrement = increment;

        // this.indexFocus = this.fixedincrements.indexOf(increment);
        if (!this.listIncrementSelected.includes(increment)) {
          //thực hiện chọn
          this.listIncrementSelected.push(increment);
        } else {
          //thực hiện bỏ chọn
          this.listIncrementSelected = this.listIncrementSelected.filter(
            (a) => {
              return a !== increment;
            }
          );

          this.currentIncrement =
            this.listIncrementSelected[this.listIncrementSelected.length - 1];
        }
      } catch (err) {
        console.log(err);
      }
      this.$emit("listIncrement", this.listIncrementSelected);
    },
    /**
     * hàm chọn 1 item thêm vào mảng xóa
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectItem(increment) {
      this.listIncrementSelected = [];
      this.listIncrementSelected.push(increment);
      this.currentIncrement = increment;
    },
    /**
     * hàm chọn tất cả item
     * AUTHOR: HTTHOA(28/02/2023)
     */
    selectedAllItem() {
      if (this.listIncrementSelected.length < this.incrementList.length) {
        this.listIncrementSelected = this.incrementList;
      } else {
        this.listIncrementSelected = [];
      }
    },
    /**
     * gọi api xóa 1 bản ghi
     * AUTHOR: HTTHOA(20/03/2023)
     */
    formatMoney(data) {
      return MSFunction.formatMoney(data);
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
     * format ngày
     *  AUTHOR: HTTHOA(18/4/2023)
     */
    formatDate(data) {
      return MSFunction.formatDate(data);
    },
    /**
     * lấy danh sách chứng từ
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getPagingAsset() {
      var me = this;
      me.isShowLoad = true;

      axios
        .get(
          `${URL_FixedAssetIncrements}/Filter?keyword=${this.keyword}&pageSize=${this.pageDefault}&pageNumber=${this.pageNumber}`
        )
        .then(function (res) {
          me.isShowLoad = false;
          me.totalPage = res.data.TotalPages;
          me.totalRecord = res.data.TotalRecords;
          me.totalCost = res.data.TotalCost;
          me.incrementList = res.data.Data;
          me.selectItemID(res.data.Data[0]);
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    /**
     * lấy số trang hiện tại
     * AUTHOR: HTTHOA(18/4/2023)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getPagingAsset();
    },
    /**
     * lấy số bản ghi trên 1 trang
     * AUTHOR: HTTHOA(18/4/2023)
     */
    getPageDefault(e) {
      this.isActive = e.target.getAttribute("pageSize");
      this.pageDefault = e.target.getAttribute("pageSize");
      this.isShowPage = false;
      this.pageNumber = 1;
      this.getPagingAsset();
      if (this.pageDefault > this.totalRecord) {
        this.pageDefault = this.totalRecord;
      }
    },
    showPage(is) {
      this.isShowPage = is;
    },
  },
};
</script>
<style scoped>
.pagination {
  width: 130px !important;
}
.table {
  height: calc(100% - 95px);
}
.main-table {
  height: calc(100% - 90px);
}
.th-width-150 {
  min-width: 130px;
  max-width: 130px;
  width: 130px;
}
.th-width-min {
  width: 80px;
}
.th-width-max {
  width: calc(100% - 800px);
}
.text-blue {
  color: #1aa4c8;
}
</style>
