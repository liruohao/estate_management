<template>
  <div class="equip">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>品质管理</BreadcrumbItem>
        <BreadcrumbItem>设备管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="btnlogin">
      <Button class="findTab" type="info" @click="addData">增加</Button>
      <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
    </div>
    <div class="tabView">
      <Table :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="planNumber">
          <Input type="text" v-model="editplanNumber" v-if="editIndex === index" title=""></Input>
          <span v-else>{{ row.planNumber }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="maintain">
          <Input type="text" v-model="editmaintain" v-if="editIndex === index" />
          <span v-else>{{ row.maintain }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="implatment">
          <Input type="text" v-model="editimplement" v-if="editIndex === index" />
          <span v-else>{{ row.implatment }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="equipment">
          <Input type="text" v-model="editequipment" v-if="editIndex === index" />
          <span v-else>{{ row.equipment }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="maintainCenter">
          <Input type="text" v-model="editmaintainCenter" v-if="editIndex === index" />
          <span v-else>{{ row.maintainCenter }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index,row)">保存</Button>
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
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="计划号" class="titfloat">
          <Input value="${this.formItem.planNumber}"  v-model="formItem.planNumber" placeholder="请输入计划号" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="保养类别" class="titfloat">
          <Input value="${this.formItem.maintain}"  v-model="formItem.maintain" placeholder="请输入保养类别" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="执行计划" class="titfloat">
          <Input value="${this.formItem.implatment}"  v-model="formItem.implatment" placeholder="请输入执行计划" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="设备" class="titfloat">
          <Input value="${this.formItem.equipment}"  v-model="formItem.equipment" placeholder="请输入设备" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="保养内容" class="titfloat">
          <Input value="${this.formItem.maintainCenter}"  v-model="formItem.maintainCenter" placeholder="请输入保养内容" :disabled="this.falg ===3"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--返回顶端-->
    <BackTop :height="100" :bottom="40">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>
<script>
export default {
  planNumber: 'customer',
  data () {
    return {
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '计划号',
          slot: 'planNumber',
          align: 'center'
        },
        {
          title: '保养类别',
          slot: 'maintain',
          align: 'center'
        },
        {
          title: '执行计划',
          slot: 'implatment',
          align: 'center'
        },
        {
          title: '设备',
          slot: 'equipment',
          align: 'center'
        },
        {
          title: '保养内容',
          slot: 'maintainCenter',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 分页传参条数
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      page: 1,
      historyData: [],
      modalTtile: '',
      falg: '',
      editorshow: false,
      // 模态框数据
      formItem: {
        planNumber: '',
        maintain: '',
        implatment: '',
        equipment: '',
        maintainCenter: '',
        id: ''
      },

      model1: '',
      planNumberList: [],
      select: {
        maintain: '',
        planNumber: '',
        implatment: '',
        equipment: '',
        maintainCenter: ''
      },

      // 修改传参
      editIndex: -1, // 当前聚焦的输入框的行数
      editplanNumber: '', // 修改姓名属性，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editmaintain: '', // 修改性别属性
      editimplement: '', // 修改年龄属性
      editequipment: '', // 修改生日属性
      editmaintainCenter: '', // 修改地址属性
      showdata: []
    }
  },
  methods: {
    modalChange (flag) {
      if (!flag) {
        for (let i in this.formItem) {
          this.formItem[i] = ''
        }
      }
    },
    pageChange (page) {
      this.page = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.handleListApproveHistory()
    },

    // 修改信息
    handleEdit (row, index) {
      this.editplanNumber = row.planNumber
      this.editmaintain = row.maintain
      this.editimplement = row.implatment
      this.editmaintainCenter = row.maintainCenter
      this.editequipment = row.equipment
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.planNumber = this.editplanNumber
      this.formItem.maintain = this.editmaintain
      this.formItem.implatment = this.editimplement
      this.formItem.equipment = this.editequipment
      this.formItem.maintainCenter = this.editmaintainCenter
      this.formItem.id = row.id
      this.editIndex = -1
      this.falg = 2
      this.modalAdd()
    },
    cancel () {
      this.editIndex = -1
      this.$Message.error('取消修改')
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('equipment/getEquipment', {
        pageNum: this.page,
        pageSize: this.pageSize
      }, res => {
        this.historyData = res.data.equipmentList
        this.dataCount = res.data.count
      })
    },
    // 当前页码
    changepage (index) {
      this.page = index
      let _start = (index - 1) * this.pageSize
      let _end = index * this.pageSize
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
    },
    // 返回切换后的每页条数
    pagesize (index) {
      let _start = (this.page - 1) * index
      let _end = this.page * index
      this.historyData = this.ajaxHistoryData.slice(_start, _end)
      // 当前展示条数
      this.pageSize = index
      console.log(this.historyData)
    },

    // 删除操作
    handleSelectAll (status) {
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
            this.$http.get('equipment/deleteEquipment', {
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
        array.planNumber = this.formItem.planNumber
        array.maintain = this.formItem.maintain
        array.implatment = this.formItem.implatment
        array.equipment = this.formItem.equipment
        array.maintainCenter = this.formItem.maintainCenter
        array.id = this.formItem.id
        if ((array.planNumber.length !== 0) & (array.maintain.length !== 0) & (array.implatment.length !== 0) & (array.equipment.length !== 0) & (array.maintainCenter.length !== 0)) {
          this.$http.post('equipment/addOrUpdateEquipment', array, res => {
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
      this.$Message.error('已取消操作')
    }
  },
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>
<style scoped>
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .tabView{
    width: 97.2%;
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
  .btnlogin{
    margin: 0 2%;
  }
</style>
