<template>
     
      <div id="table">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th class="text-center width-fit">
                  <input type="checkbox" />
                </th>

                <th class="stt">STT <div class="tooltip-stt">Số thứ tự</div>
                </th>

                <th>Mã tài sản</th>
                <th>Tên tài sản</th>
                <th>Loại tài sản</th>
                <th>Tên bộ phận sử dụng</th>
                <th>Số lượng</th>
                <th class="text-right">Nguyên giá</th>
                <th class="text-right kh">KH/HM lũy kế <div class="tooltip-kh">Khấu hao/Hao mòn lũy kế</div>
                </th>
                <th class="text-right">Giá trị còn lại</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employee"  :key="emp.EmployeeCode" >
                <td class="text-center">
                  <input type="checkbox" />
                </td>
                <td class="text-center">1</td>
                <td>{{ emp.EmployeeCode }}</td>
                <td>{{ emp.FullName }}</td>
                <td>Máy vi tính xách tay</td>
                <td>phòng hành chính kế toán</td>
                <td class="text-center">1</td>
                <td class="text-right">10.000.000</td>
                <td class="text-right">1.225.000</td>
                <td class="text-right">8.775.000</td>
                <td>
                  <div class="function-table">
                    <div class="icon icon-edit"></div>
                    <div class="icon icon-duplicate"></div>
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
                
                
                  <input type="text" class="page" placeholder="20">
                  <div class="icon icon-down-bold"></div>
                
                <!-- <table class="page-cbb" id="combobox-category">
                  <tr  onclick="onClickItemCbb(this)" class="item-cbb-category">
                    <td>10</td>
                  </tr>
                  <tr onclick="onClickItemCbb(this)" class="item-cbb-category">
                    <td>20</td>
                  </tr>
                  <tr onclick="onClickItemCbb(this)" class="item-cbb-category">
                    <td>30</td>
                  </tr>
                </table> -->
  
                
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
              <div class="total-count"><strong>10</strong></div>
              <div class="total-price"><strong>100.000.000</strong></div>
              <div class="total-price"><strong>100.000.000</strong></div>
              <div class="total-price"><strong>100.000.000</strong></div>
            </div>
          </div>
        </div>
      </div>
   
</template>
<script>


import axios from "axios"
export default {
    data(){
        return{
            employee: [],

        }
    },
    created(){
      this.getData()
    },
    methods: {
        getData(){
            axios.get('https://apidemo.laptrinhweb.edu.vn/api/v1/Employees')
            .then(res=>{
                this.employee=res.data
                console.log(this.employee)
            })
            
        }
    }
}
</script>
