<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>收入管理</BreadcrumbItem>
        <BreadcrumbItem>收费管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <div>
        <Form :model="select" :label-width="100" inline>
          <FormItem label="收费日期">
            <DatePicker type="date"   v-model="select.payTime" placeholder="请输入收费日期"  style="width: 150px;color: black" :disabled="this.falg ===3"></DatePicker>
          </FormItem>
          <FormItem label="收费单号：">
            <Input v-model="select.payNum" clearable/>
          </FormItem>
          <FormItem label="房产位置：">
            <Input v-model="select.housePosition" clearable/>
          </FormItem>
          <FormItem label="户主：">
            <Input v-model="select.houseHolder" clearable/>
          </FormItem>
          <FormItem>
          <Button type="primary" @click="handleListApproveHistory">查询</Button>
          <Button type="primary" @click="resetSearch">重置</Button>
          </FormItem>
        </Form>

    </div>
      <div>
        <Button class="findTab" type="info" @click="addData">增加</Button>
        <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
      </div>
    </div>
    <div class="tabView">
      <Table border :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="payTime">
          <span class="transfer">{{ row.payTime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="payNum">
          <Input type="text" v-model="editpayNum" v-if="editIndex === index" />
          <span v-else>{{ row.payNum }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="housePosition">
          <Input type="text" v-model="edithousePosition" v-if="editIndex === index" />
          <span v-else>{{ row.housePosition }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="houseHolder">
          <Input type="text" v-model="edithouseHolder" v-if="editIndex === index" />
          <span v-else>{{ row.houseHolder }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="hygiene">
          <Input type="text" v-model="edithygiene" v-if="editIndex === index" />
          <span v-else>{{ row.hygiene }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="power">
          <Input type="text" v-model="editpower" v-if="editIndex === index" />
          <span v-else>{{ row.power }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="heating">
          <Input type="text" v-model="editheating" v-if="editIndex === index" />
          <span v-else>{{ row.heating }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="gas">
          <Input type="text" v-model="editgas" v-if="editIndex === index" />
          <span v-else>{{ row.gas }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="water">
          <Input type="text" v-model="editwater" v-if="editIndex === index" />
          <span v-else>{{ row.water }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="property">
          <Input type="text" v-model="editproperty" v-if="editIndex === index" />
          <span v-else>{{ row.property }}</span>
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
            :current="pclassification"
            :page-size-opts="[10, 20, 30, 50]"
            :page-size="pclassificationSize"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"/>
    </div>
    <Modal v-model="editorshow"  width="60%"
           housePosition="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form ref="formInline"  :model="formItem" :label-width="80" inline>
        <FormItem label="收费日期" class="titfloat">
          <DatePicker type="date"  v-model="formItem.payTime" placeholder="请输入收费日期"  style="width: 150px" :disabled="this.falg ===3"></DatePicker>
        </FormItem>
        <FormItem label="收费单号" class="titfloat">
          <Input value="${this.formItem.payNum}"  v-model="formItem.payNum" style="width: 150px" placeholder="请输入收费单号	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="房产位置	" class="titfloat">
          <Input value="${this.formItem.housePosition}"  v-model="formItem.housePosition" style="width: 150px" placeholder="请输入房产位置	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="户主" class="titfloat">
          <Input  value="${this.formItem.houseHolder}"  v-model="formItem.houseHolder" placeholder="请输入户主" style="width: 150px" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="卫生费（¥）" class="titfloat">
          <InputNumber value="${this.formItem.hygiene}"  v-model="formItem.hygiene" placeholder="请输入卫生费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="电费（¥）" class="titfloat">
          <InputNumber value="${this.formItem.power}"  v-model="formItem.power" placeholder="请输入电费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="暖气费（¥）" class="titfloat">
          <InputNumber value="${this.formItem.heating}"  v-model="formItem.heating" placeholder="请输入暖气费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="燃气费（¥）" class="titfloat">
          <InputNumber value="${this.formItem.gas}"  v-model="formItem.gas" placeholder="请输入燃气费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="水费（¥）" class="titfloat">
          <InputNumber  value="${this.formItem.water}"  v-model="formItem.water" placeholder="请输入水费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="物业费（¥）" class="titfloat">
          <InputNumber  value="${this.formItem.property}"  v-model="formItem.property" placeholder="请输入物业费（¥）" style="width: 150px" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="缴费状态" class="titfloat">
          <Select v-model="formItem.pay" style="width: 150px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
  payTime: 'customer',
  data () {
    return {
      cityList: [
        {
          value: '未缴费',
          label: '未缴费'
        },
        {
          value: '已缴费',
          label: '已缴费'
        }
      ],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '收费日期',
          slot: 'payTime',
          align: 'center',
          width: 150,
          fixed: 'left'
        },
        {
          title: '收费单号',
          slot: 'payNum',
          align: 'center',
          width: 150
        },
        {
          title: '房产位置',
          slot: 'housePosition',
          align: 'center',
          width: 150
        },
        {
          title: '户主',
          slot: 'houseHolder',
          align: 'center',
          width: 150
        },
        {
          title: '卫生费（¥）',
          slot: 'hygiene',
          align: 'center',
          width: 150
        },
        {
          title: '电费（¥）',
          slot: 'power',
          align: 'center',
          width: 150
        },
        {
          title: '暖气费（¥）',
          slot: 'heating',
          align: 'center',
          width: 150
        },
        {
          title: '燃气费（¥）',
          slot: 'gas',
          align: 'center',
          width: 150
        },
        {
          title: '水费（¥）',
          slot: 'water',
          align: 'center',
          width: 150
        },
        {
          title: '物业费（¥）',
          slot: 'property',
          align: 'center',
          width: 150
        },
        {
          title: '缴费状态',
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
      // 分页传参条数
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pclassificationSize: 10,
      // 当前页码
      pclassification: 1,
      historyData: [],
      modalTtile: '',
      falg: '',
      editorshow: false,
      // 模态框数据
      formItem: {
        payTime: '',
        payNum: '',
        housePosition: '',
        houseHolder: '',
        hygiene: '',
        power: '',
        heating: '',
        gas: '',
        water: '',
        property: '',
        pay: '',
        id: ''
      },
      model1: '',
      payTimeList: [],
      select: {
        payTime: '',
        payNum: '',
        housePosition: '',
        houseHolder: '',
        hygiene: '',
        power: '',
        heating: '',
        gas: '',
        water: '',
        property: '',
        pay: ''
      },

      // 修改传参
      editIndex: -1,
      editpayTime: '',
      editpayNum: '',
      edithousePosition: '',
      edithouseHolder: '',
      edithygiene: '',
      editpower: '',
      editheating: '',
      editgas: '',
      editwater: '',
      editproperty: '',
      editpay: '',
      showdata: ''
    }
  },
  components: {tooLbar},
  methods: {
    pageChange (page) {
      this.pclassification = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pclassificationSize = pageSize
      this.handleListApproveHistory()
    },
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
    // 查询
    selectData () {
      let array = []
      array.payTime = this.select.payTime
      array.payNum = this.select.payNum
      array.housePosition = this.select.housePosition
      array.houseHolder = this.select.houseHolder
      array.hygiene = this.select.hygiene
      array.power = this.select.power
      array.heating = this.select.heating
      array.gas = this.select.gas
      array.water = this.select.water
      array.property = this.select.property
      array.pay = this.select.pay
      this.historyData = this.historyData.filter(function (item) {
        return ((item.payTime == array.payTime && item.payNum == array.payNum && item.housePosition == array.housePosition && item.houseHolder == array.houseHolder && item.hygiene == array.hygiene && item.power == array.power && item.heating == array.heating && item.gas == array.gas && item.water == array.water && item.pay == array.pay) || (item.payTime == array.payTime || item.payNum == array.payNum || item.housePosition == array.housePosition || item.houseHolder == array.houseHolder || item.hygiene == array.hygiene || item.power == array.power || item.heating == array.heating || item.gas == array.gas || item.water == array.water || item.pay == array.pay))
      })
    },

    // 修改信息
    handleEdit (row, index) {
      this.editpayTime = row.payTime
      this.editpayNum = row.payNum
      this.edithousePosition = row.housePosition
      this.edithouseHolder = row.houseHolder
      this.edithygiene = row.hygiene
      this.editpower = row.power
      this.editheating = row.heating
      this.editgas = row.gas
      this.editwater = row.water
      this.editproperty = row.property
      this.editpay = row.pay
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.payTime = this.editpayTime
      this.formItem.payNum = this.editpayNum
      this.formItem.housePosition = this.edithousePosition
      this.formItem.houseHolder = this.edithouseHolder
      this.formItem.hygiene = this.edithygiene
      this.formItem.power = this.editpower
      this.formItem.heating = this.editheating
      this.formItem.gas = this.editgas
      this.formItem.water = this.editwater
      this.formItem.property = this.editproperty
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
      this.$http.post('pay/getPay', {
        pageNum: this.pclassification,
        pageSize: this.pclassificationSize,
        payTime: this.select.payTime === '' ?  '' :this.$dateFormat(new Date(this.select.payTime),'yyyy-MM-dd hh:mm:ss'),
        payNum : this.select.payNum,
        housePosition : this.select.housePosition,
        houseHolder : this.select.houseHolder
      }, res => {
        this.historyData = res.data.payList
        this.dataCount = res.data.count
      })
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
            this.$http.get('pay/deletePay', {
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
      if (this.falg === 1 || this.falg === 2) {
        let array = {}
        array.payTime =this.$dateFormat(new Date(this.formItem.payTime), 'yyyy-MM-dd hh:mm:ss')
        array.payNum = this.formItem.payNum
        array.housePosition = this.formItem.housePosition
        array.houseHolder = this.formItem.houseHolder
        array.hygiene = this.formItem.hygiene
        array.power = this.formItem.power
        array.heating = this.formItem.heating
        array.gas = this.formItem.gas
        array.water = this.formItem.water
        array.pay = this.formItem.pay
        array.property = this.formItem.property
        array.id = this.formItem.id
        if ((array.payTime.length !== 0) & (array.payNum.length !== 0) & (array.housePosition.length !== 0) & (array.houseHolder.length !== 0) & (array.hygiene.length !== 0) & (array.power.length !== 0) & (array.heating.length !== 0) & (array.gas.length !== 0) & (array.water.length !== 0) & (array.pay.length !== 0)) {
          this.$http.post('pay/addOrUpdatePay', array, res => {
            if (res.code === 1000) {
              if (this.falg === 1) {
                this.$Message.success('新增成功')
              } else {
                this.$Message.success('修改成功')
              }
              this.handleListApproveHistory()
            }
          })
        } else {
          alert('请补全以上信息')
        }
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
