<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>收入管理</BreadcrumbItem>
        <BreadcrumbItem>合同管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <Form :model="select" :label-width="100" inline>
        <FormItem label="单据号">
          <Input v-model="select.bill" clearable/>
        </FormItem>
        <FormItem label="单位：">
          <Input v-model="select.company" clearable/>
        </FormItem>
        <FormItem label="合同名称：">
          <Input v-model="select.contractname" clearable/>
        </FormItem>
        <FormItem label="我方负责人：">
          <Input v-model="select.owncharge" clearable/>
        </FormItem>
        <FormItem label="合作方负责人：">
          <Input v-model="select.othercharge" clearable/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleListApproveHistory">查询</Button>
          <Button type="primary" @click="resetSearch">重置</Button>
        </FormItem>
      </Form>
      <div>
        <Button class="findTab" type="info" @click="addData">增加</Button>
        <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
      </div>
    </div>
    <div class="tabView">
      <Table border  :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="bill">
          <Input  type="text" v-model="editbill" v-if="editIndex === index" title=""></Input>
          <span class="transfer" v-else>{{ row.bill }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="company">
          <Input type="text" v-model="editcompany" v-if="editIndex === index" />
          <span v-else>{{ row.company }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="contractname">
          <Input type="text" v-model="editcontractname" v-if="editIndex === index" />
          <span v-else>{{ row.contractname }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="owncharge">
          <Input type="text" v-model="editowncharge" v-if="editIndex === index" />
          <span v-else>{{ row.owncharge }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="othercharge">
          <Input type="text" v-model="editothercharge" v-if="editIndex === index" />
          <span v-else>{{ row.othercharge }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="materialScience">
          <Input type="text" v-model="editmaterialScience" v-if="editIndex === index" />
          <span v-else>{{ row.materialScience }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="surface">
          <Input type="text" v-model="editsurface" v-if="editIndex === index" />
          <span v-else>{{ row.surface }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="pay">
          <Input type="text" v-model="editpay" v-if="editIndex === index" />
          <span v-else>{{ row.pay }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="contractcontent">
          <Input type="text" v-model="editcontractcontent" v-if="editIndex === index" />
          <span v-else>{{ row.contractcontent }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="consumption">
          <Input type="text" v-model="editconsumption" v-if="editIndex === index" />
          <span v-else>{{ row.consumption }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="quantityAvailable">
          <Input type="text" v-model="editquantityAvailable" v-if="editIndex === index" />
          <span v-else>{{ row.quantityAvailable }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="judge">
          <Input type="text" v-model="editjudge" v-if="editIndex === index" />
          <span v-else>{{ row.judge }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="cancel">取消</Button>
          </div>
          <div v-else>
            <Button type="success" @click="handleEdit(row, index)">修改</Button>
          </div>
        </template>
      </Table>
      <Page  :total="dataCount" :pcontractname-size="pcontractnameSize" show-sizer class="paging" @on-change="changepcontractname" @on-pcontractname-size-change="pcontractnamesize"></Page>
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="单据号" class="titfloat">
          <InputNumber id="rubric"  style="width: 100%" value="${this.formItem.bill}"  v-model="formItem.bill" placeholder="请输入单据号" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="单位" class="titfloat">
          <Input id="rubric" value="${this.formItem.company}"  v-model="formItem.company" placeholder="请输入单位" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="我方负责人" class="titfloat">
          <Input id="rubric" value="${this.formItem.owncharge}"  v-model="formItem.owncharge" placeholder="请输入我方负责人" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="合作方负责人" class="titfloat">
          <Input id="rubric" value="${this.formItem.othercharge}"  v-model="formItem.othercharge" placeholder="请输入合作方负责人" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="付款详情" class="titfloat">
          <Input id="rubric" value="${this.formItem.pay}"  v-model="formItem.pay" placeholder="请输入付款详情" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="合同名称" class="titfloat">
          <Input id="rubric" value="${this.formItem.contractname}"  v-model="formItem.contractname" placeholder="请输入合同名称" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="合同内容" class="titfloat">
          <Input id="rubric" value="${this.formItem.contractcontent}"  v-model="formItem.contractcontent" placeholder="请输入合同内容" :disabled="this.falg ===3"></Input>
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
  bill: 'customer',
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
          title: '单据号',
          slot: 'bill',
          align: 'center',
          width: 150,
          fixed: 'left'
        },
        {
          title: '单位',
          slot: 'company',
          align: 'center',
          width: 150
        },
        {
          title: '我方负责人',
          slot: 'owncharge',
          align: 'center',
          width: 150
        },
        {
          title: '合作方负责人',
          slot: 'othercharge',
          align: 'center',
          width: 150
        },
        {
          title: '付款详情',
          slot: 'pay',
          align: 'center',
          width: 150
        },
        {
          title: '合同名称',
          slot: 'contractname',
          align: 'center',
          width: 150
        },
        {
          title: '合同内容',
          slot: 'contractcontent',
          align: 'center',
          ellipsis: true,
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
      pcontractnameSize: 10,
      // 当前页码
      pcontractname: 1,
      historyData: [],
      modalTtile: '',
      falg: '',
      editorshow: false,
      // 模态框数据
      formItem: {
        bill: '',
        company: '',
        contractname: '',
        owncharge: '',
        othercharge: ''
      },

      cityList: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      model1: '',
      billList: [],
      select: {
        company: '',
        bill: '',
        contractname: '',
        owncharge: '',
        othercharge: '',
        materialScience: '',
        surface: '',
        pay: '',
        contractcontent: '',
        consumption: '',
        quantityAvailable: '',
        judge: ''
      },

      // 修改传参
      editIndex: -1, // 当前聚焦的输入框的行数
      editbill: '', // 修改姓名属性，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editcompany: '', // 修改性别属性
      editcontractname: '', // 修改年龄属性
      editowncharge: '', // 修改生日属性
      editothercharge: '', // 修改地址属性
      editmaterialScience: '',
      editsurface: '',
      editpay: '',
      editcontractcontent: '',
      editconsumption: '',
      editquantityAvailable: '',
      editjudge: ''
    }
  },
  components: {tooLbar},
  methods: {
    // 查询
    selectData () {
      let array = []
      array.bill = this.select.bill
      array.company = this.select.company
      array.contractname = this.select.contractname
      array.owncharge = this.select.owncharge
      array.othercharge = this.select.othercharge
      this.historyData = this.historyData.filter(function (item) {
        return ((item.bill == array.bill && item.owncharge == array.owncharge && item.company == array.company && item.contractname == array.contractname && item.othercharge == array.othercharge) || (item.bill == array.bill && item.company == array.company && item.contractname == array.contractname) || (item.bill == array.bill && item.company == array.company && item.othercharge == array.othercharge) || (item.bill == array.bill && item.contractname == array.contractname && item.othercharge == array.othercharge) || (item.company == array.company && item.contractname == array.contractname && item.othercharge == array.othercharge) || (item.bill == array.bill && item.company == array.company) || (item.bill == array.bill && item.contractname == array.contractname) || (item.bill == array.bill && item.othercharge == array.othercharge) || (item.company == array.company && item.contractname == array.contractname) || (item.company == array.company && item.othercharge == array.othercharge) || (item.contractname == array.contractname && item.othercharge == array.othercharge) || (item.bill == array.bill || item.company == array.company || item.contractname == array.contractname || item.othercharge == array.othercharge || item.owncharge == array.owncharge))
      })
    },

    // 修改信息
    handleEdit (row, index) {
      this.editbill = row.bill
      this.editcompany = row.company
      this.editcontractname = row.contractname
      this.editothercharge = row.othercharge
      this.editmaterialScience = row.materialScience
      this.editsurface = row.surface
      this.editpay = row.pay
      this.editcontractcontent = row.contractcontent
      this.editconsumption = row.consumption
      this.editquantityAvailable = row.quantityAvailable
      this.editjudge = row.judge
      this.editowncharge = row.owncharge
      this.editIndex = index
    },
    handleSave (index) {
      this.historyData[index].bill = this.editbill
      this.historyData[index].company = this.editcompany
      this.historyData[index].contractname = this.editcontractname
      this.historyData[index].owncharge = this.editowncharge
      this.historyData[index].othercharge = this.editothercharge
      this.historyData[index].materialScience = this.editmaterialScience
      this.historyData[index].surface = this.editsurface
      this.historyData[index].pay = this.editpay
      this.historyData[index].contractcontent = this.editcontractcontent
      this.historyData[index].consumption = this.editconsumption
      this.historyData[index].quantityAvailable = this.editquantityAvailable
      this.historyData[index].judge = this.editjudge

      this.editIndex = -1
      this.$Messcontractname.info('修改成功')
    },
    cancel () {
      this.editIndex = -1,
      this.$Messcontractname.error('取消修改')
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('user/getAllUserInfoPage', {
        pageNum: this.page,
        pageSize: this.pageSize,
        roleId: 'b30ae35f8de64cb59125dc9e714f3779',
        name: this.select.name,
        sex: this.select.sex,
        age: this.select.age === '' ? null : Number(this.select.age),
        phone: this.select.phone,
        address: this.select.address
      }, res => {
        this.historyData = res.data.userList
        this.dataCount = res.data.count
      })
    },
    // 当前页码
    changepcontractname (index) {
      this.pcontractname = index
      let _start = (index - 1) * this.pcontractnameSize
      let _end = index * this.pcontractnameSize
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
    },
    // 返回切换后的每页条数
    pcontractnamesize (index) {
      let _start = (this.pcontractname - 1) * index
      let _end = this.pcontractname * index
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
      // 当前展示条数
      this.pcontractnameSize = index
      console.log(this.historyData)
    },

    // 删除操作
    handleSelectAll (status) {
      for (let i = 0; i < this.historyData.length; i++) {
        for (let j = 0; j < this.showdata.length; j++) {
          if (this.historyData[i].id === this.showdata[j].id) {
            this.historyData.splice(i, 1)
          }
        }
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
      if (this.falg === 1) {
        let array = {}
        array.bill = this.formItem.bill
        array.company = this.formItem.company
        array.contractname = this.formItem.contractname
        array.owncharge = this.formItem.owncharge
        array.othercharge = this.formItem.othercharge
        array.pay = this.formItem.pay
        array.contractcontent = this.formItem.contractcontent

        if ((array.bill.length !== 0) & (array.company.length !== 0) & (array.contractname.length !== 0) & (array.owncharge.length !== 0) & (array.othercharge.length !== 0) & (array.pay.length !== 0)) {
          this.historyData.push(array)
          this.$Message.info('新增成功')
        } else {
          alert('请补全以上信息')
        }
      }
    },
    modalExit () {
      this.$Messcontractname.error('已取消操作')
    }
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
  .fontowncharge{
    font-size: 130%;
    float: left;
    padding-left: 4%;
    color:#000000;
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
  .fontothercharge{
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
