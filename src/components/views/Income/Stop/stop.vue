<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>收入管理</BreadcrumbItem>
        <BreadcrumbItem>停车管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <Form :model="select" :label-width="100" inline>
        <FormItem label="车位编号：">
          <Input v-model="select.carNum" clearable/>
        </FormItem>
        <FormItem label="位置：">
          <Input v-model="select.position" clearable/>
        </FormItem>
        <FormItem label="承租人：">
          <Input v-model="select.lessee" clearable/>
        </FormItem>
        <FormItem label="车牌号：">
          <Input v-model="select.licensePlate" clearable/>
        </FormItem>
        <FormItem label="停车证号：">
          <Input v-model="select.parkinPermit" clearable/>
        </FormItem>
        <Button type="primary" @click="handleListApproveHistory">查询</Button>
        <Button type="primary" @click="resetSearch">重置</Button>
      </Form>
      <div>
        <Button class="findTab" type="info" @click="addData">增加</Button>
        <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
      </div>
    </div>
    <div class="tabView">
      <Table border  :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="carPark">
          <Input  type="text" v-model="editcarPark" v-if="editIndex === index" title=""></Input>
          <span class="transfer" v-else>{{ row.carPark }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carNum">
          <Input type="text" v-model="editcarNum" v-if="editIndex === index" />
          <span v-else>{{ row.carNum }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="position">
          <Input type="text" v-model="editposition" v-if="editIndex === index" />
          <span v-else>{{ row.position }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="lessee">
          <Input type="text" v-model="editlessee" v-if="editIndex === index" />
          <span v-else>{{ row.lessee }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="licensePlate">
          <Input type="text" v-model="editlessee" v-if="editIndex === index" />
          <span v-else>{{ row.licensePlate }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="parkinPermit">
          <Input type="text" v-model="editparkinPermit" v-if="editIndex === index" />
          <span v-else>{{ row.parkinPermit }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="telephone">
          <Input type="text" v-model="edittelephone" v-if="editIndex === index" />
          <span v-else>{{ row.telephone }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="startTime">
          <DatePicker transfer type="datetime" format="yyyy-MM-dd HH:mm:ss"  v-model="editstartTime" v-if="editIndex === index"></DatePicker>
          <span v-else>{{ row.startTime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="endTime">
          <DatePicker  transfer type="datetime" format="yyyy-MM-dd HH:mm:ss"  v-model="editendTime" v-if="editIndex === index"></DatePicker>
          <span v-else>{{ row.endTime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="pay">
          <Input type="text" v-model="editpay" v-if="editIndex === index" />
          <span v-else>{{ row.pay }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index, row)">保存</Button>
            <Button @click="cancel">取消</Button>
          </div>
          <div v-else>
            <Button type="success" @click="handleEdit(row, index)">修改</Button>
          </div>
        </template>
      </Table>
      <Page :total="dataCount"
            style="margin-top: 10px;  width: 100%;
      height: 56px;
      line-height: 56px;
      padding: 0 15px;
      color: black;
      box-sizing: border-box;"
            show-elevator
            show-sizer
            show-total
            :current="page"
            :page-size-opts="[10, 20, 30, 50]"
            :page-size="pageSize"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"/>
<!--      <Page  :total="dataCount" :pclassification-size="pclassificationSize" show-sizer class="paging" @on-change="changepclassification" @on-pclassification-size-change="pclassificationsize"></Page>-->
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form ref="formInline"  :model="formItem" :label-width="80" inline>
        <FormItem label="停车场" class="titfloat">
          <Input id="rubric" value="${this.formItem.carPark}"  v-model="formItem.carPark" placeholder="请输入停车场" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="车位编号" class="titfloat">
          <Input id="rubric" value="${this.formItem.carNum}"  v-model="formItem.carNum" placeholder="请输入车位编号	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="位置" class="titfloat">
          <Input id="rubric" value="${this.formItem.position}"  v-model="formItem.position" placeholder="请输入位置" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="承租人" class="titfloat">
          <Input id="rubric" value="${this.formItem.lessee}"  v-model="formItem.lessee" placeholder="请输入承租人" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="车牌号" class="titfloat">
          <Input id="rubric" value="${this.formItem.licensePlate}"  v-model="formItem.licensePlate" placeholder="请输入车牌号" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="停车证号" class="titfloat">
          <Input id="rubric" value="${this.formItem.parkinPermit}"  v-model="formItem.parkinPermit" placeholder="请输入停车证号" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="电话" class="titfloat">
          <Input id="rubric" value="${this.formItem.telephone}"  v-model="formItem.telephone" placeholder="请输入电话" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="开始日期" class="titfloat">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"value="${this.formItem.startTime}" style="width: 150px"  v-model="formItem.startTime" placeholder="请输入开始日期" :disabled="this.falg ===3"></DatePicker>
        </FormItem>
        <FormItem label="结束日期" class="titfloat">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  value="${this.formItem.endTime}" style="width: 150px"  v-model="formItem.endTime" placeholder="请输入结束日期" :disabled="this.falg ===3"></DatePicker>
        </FormItem>
        <FormItem label="缴费" class="titfloat">
          <Input id="rubric" value="${this.formItem.pay}"  v-model="formItem.pay" placeholder="请输入缴费" :disabled="this.falg ===3"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--返回顶端-->
    <tooLbar></tooLbar>
  </div>
</template>

<script>
import moment from 'moment'
import tooLbar from './../../toolbar/toolbar.vue'

export default {
  carPark: 'customer',
  data () {
    return {
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '停车场',
          slot: 'carPark',
          align: 'center',
          width: 150,
          fixed: 'left'
        },
        {
          title: '车位编号',
          slot: 'carNum',
          align: 'center',
          width: 150
        },
        {
          title: '位置',
          slot: 'position',
          align: 'center',
          width: 150
        },
        {
          title: '承租人',
          slot: 'lessee',
          align: 'center',
          width: 150
        },
        {
          title: '车牌号',
          slot: 'licensePlate',
          align: 'center',
          width: 150
        },
        {
          title: '停车证号',
          slot: 'parkinPermit',
          align: 'center',
          width: 150
        },
        {
          title: '电话',
          slot: 'telephone',
          align: 'center',
          width: 150
        },
        {
          title: '开始日期',
          slot: 'startTime',
          align: 'center',
          width: 150
        },
        {
          title: '结束日期',
          slot: 'endTime',
          align: 'center',
          width: 150
        },
        {
          title: '缴费',
          slot: 'pay',
          align: 'center',
          width: 150
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200,
          fixed: 'right'
        }
      ],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      showdata: '',
      // 当前页码
      page: 1,
      // 分页传参条数
      ajaxHistoryData: [],
      historyData: [],
      modalTtile: '',
      falg: '',
      editorshow: false,
      // 模态框数据
      formItem: {
        carPark: '',
        carNum: '',
        position: '',
        lessee: '',
        licensePlate: '',
        parkinPermit: '',
        telephone: '',
        startTime: '',
        endTime: '',
        pay: '',
        id: ''
      },
      model1: '',
      carParkList: [],
      select: {
        carPark: '',
        carNum: '',
        position: '',
        lessee: '',
        licensePlate: '',
        parkinPermit: '',
        telephone: '',
        startTime: '',
        endTime: '',
        pay: ''
      },

      // 修改传参
      editIndex: -1,
      editcarPark: '',
      editcarNum: '',
      editposition: '',
      editlessee: '',
      editlicensePlate: '',
      editparkinPermit: '',
      edittelephone: '',
      editstartTime: '',
      editendTime: '',
      editpay: '',
      id: ''
    }
  },
  components: {tooLbar},
  methods: {
    modalChange (flag) {
      for (let i in this.formItem) {
        this.formItem[i] = ''
      }
    },
    resetSearch () {
      for (let i in this.select) {
        this.select[i] = ''
      }
      this.handleListApproveHistory()
    },
    pageChange (page) {
      this.pcontractname = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pcontractnameSize = pageSize
      this.handleListApproveHistory()
    },
    // 查询
    selectData () {
      let array = []
      array.carPark = this.select.carPark
      array.carNum = this.select.carNum
      array.position = this.select.position
      array.lessee = this.select.lessee
      array.licensePlate = this.select.licensePlate
      array.parkinPermit = this.select.parkinPermit
      array.telephone = this.select.telephone
      array.startTime = this.$dateFormat(new Date(this.select.startTime), 'yyyy-MM-dd')
      array.endTime = this.$dateFormat(new Date(this.select.endTime), 'yyyy-MM-dd')
      array.pay = this.select.pay

      this.historyData = this.historyData.filter(function (item) {
        return ((item.carPark == array.carPark && item.carNum == array.carNum && item.position == array.position && item.lessee == array.lessee && item.licensePlate == array.licensePlate && item.parkinPermit == array.parkinPermit && item.telephone == array.telephone && item.startTime == array.startTime && item.endTime == array.endTime && item.pay == array.pay) || (item.carPark == array.carPark || item.carNum == array.carNum || item.position == array.position || item.lessee == array.lessee || item.licensePlate == array.licensePlate || item.parkinPermit == array.parkinPermit || item.telephone == array.telephone || item.startTime == array.startTime || item.endTime == array.endTime || item.pay == array.pay))
      })
    },

    // 修改信息
    handleEdit (row, index) {
      this.editcarPark = row.carPark
      this.editcarNum = row.carNum
      this.editposition = row.position
      this.editlessee = row.lessee
      this.editlicensePlate = row.licensePlate
      this.editparkinPermit = row.parkinPermit
      this.edittelephone = row.telephone
      this.editstartTime = row.startTime
      this.editendTime = row.endTime
      this.editpay = row.pay
      this.id = row.id
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.carPark = this.editcarPark
      this.formItem.carNum = this.editcarNum
      this.formItem.position = this.editposition
      this.formItem.lessee = this.editlessee
      this.formItem.licensePlate = this.editlicensePlate
      this.formItem.parkinPermit = this.editparkinPermit
      this.formItem.telephone = this.edittelephone
      this.formItem.startTime = this.editstartTime
      this.formItem.endTime = this.editendTime
      this.formItem.pay = this.editpay
      this.formItem.id = row.id
      this.editIndex = -1
      this.falg = 2
      this.modalAdd()
    },
    cancel () {
      this.editIndex = -1,
      this.$Messclassification.error('取消修改')
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('parking/getParking', {
        pageNum: this.page,
        pageSize: this.pageSize,
        // carPark: this.select.carPark,
        carNum: this.select.carNum,
        position: this.select.position,
        lessee: this.select.lessee,
        licensePlate: this.select.licensePlate,
        parkinPermit: this.select.parkinPermit
        // telephone: this.select.telephone,
        // startTime: this.select.startTime,
        // endTime: this.select.endTime,
        // pay: this.select.pay
      }, res => {
        this.historyData = res.data.parkingList
        this.dataCount = res.data.count
      })
    },
    pageChange (page) {
      this.page = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.handleListApproveHistory()
    },
    // 当前页码
    changepclassification (index) {
      this.pclassification = index
      let _start = (index - 1) * this.pclassificationSize
      let _end = index * this.pclassificationSize
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
    },
    // 返回切换后的每页条数
    pclassificationsize (index) {
      let _start = (this.pclassification - 1) * index
      let _end = this.pclassification * index
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
      // 当前展示条数
      this.pclassificationSize = index
      console.log(this.historyData)
    },

    // 删除操作
    handleSelectAll () {
      if (this.showdata.length > 0) {
        let userIds = []
        for (let i = 0; i < this.showdata.length; i++) {
          let userId = this.showdata[i].id
          userIds.push(userId)
        }
        let userIdsStr = userIds.join(',')
        this.$Modal.confirm({
          title: '请选择',
          content: '确定删除这些数据?',
          onOk: () => {
            this.$http.get('parking/deleteParking', {
              id: userIdsStr
            }, res => {
              this.handleListApproveHistory()
              this.$Message.success('删除成功')
            })
          }})
      } else {
        this.$Message.error('请选择一条数据进行删除')
      }
    },
    // 复选框选择的数据
    dataChange (data) {
      this.showdata = data
    },
    // 新增
    addData () {
      this.modalTtile = '新增'
      this.falg = 1
      this.editorshow = true
    },
    modalAdd () {
      let array = {}
      array.carPark = this.formItem.carPark
      array.carNum = this.formItem.carNum
      array.position = this.formItem.position
      array.lessee = this.formItem.lessee
      array.licensePlate = this.formItem.licensePlate
      array.parkinPermit = this.formItem.parkinPermit
      array.telephone = this.formItem.telephone
      array.startTime = this.$dateFormat(new Date(this.formItem.startTime), 'yyyy-MM-dd hh:mm:ss')
      array.endTime = this.$dateFormat(new Date(this.formItem.endTime), 'yyyy-MM-dd hh:mm:ss')
      array.pay = this.formItem.pay
      array.id = this.formItem.id
      console.log(array)
      if ((array.carPark.length !== 0) & (array.carNum.length !== 0) & (array.position.length !== 0) & (array.lessee.length !== 0) & (array.licensePlate.length !== 0) & (array.parkinPermit.length !== 0) & (array.telephone.length !== 0) & (array.startTime.length !== 0) & (array.endTime.length !== 0) & (array.pay.length !== 0)) {
        this.$http.post('parking/addOrUpdateParking', array, res => {
          if (res.code === 1000) {
            if (this.falg === 1) {
              this.$Message.success('新增成功')
            } else {
              this.$Message.success('修改成功')
            }
            this.handleListApproveHistory()
          } else {
            this.$Message.warning('请补全以上信息')
          }
        })
      } else {
        alert('请补全以上信息')
      }
    },
    modalExit () {
      this.$Messclassification.error('已取消操作')
    }
    // ,
    // getname (name) {
    //   const date = new Date(parseInt(name));
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   return `${year}-${month}-${day}`;
    // }
  },
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>

<style scoped>
  .bgcolor{
    background-color: white;
  }
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 3%;
    background-color: #F8F8F9;
    margin: 10px;
  }
  .tabView{
    margin: 2%;
    padding: 1%;
    background-color: #e4e9e4;
  }
  .operation{
    margin:2% 5%;

  }
  .tabfloat{
    padding-left: 3%;
    height: 32px;
  }
  .tabbut{
    padding-left: 13%;
  }
  .fontFloat{
    font-size: 130%;
    float: left;
    color:#000000;
  }
  tr{
    display:block; /*将tr设置为块体元素*/
    margin:2% 0;  /*设置tr间距为2px*/
    width: 100%;
  }
  td{
    width:400px;
  }
  .fontspecifications{
    /*padding-left: 4px;*/
    font-size: 130%;
    color:#000000;
  }
  .findTab{
    width: 10%;
    margin: 0 0.3%;
  }
  .transfer{
    color: black;
    /*width: 20px;*/
    /*height: 10px;*/
    font-size: 130%;
    color:#000000;
  }
</style>
