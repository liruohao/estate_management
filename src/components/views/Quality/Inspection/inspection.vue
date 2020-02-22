<template>
  <div class="equip">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>品质管理</BreadcrumbItem>
        <BreadcrumbItem>巡检中心</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="binlog">
      <Button class="findTab" type="info" @click="addData">增加</Button>
      <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
    </div>
    <div class="tabView">
      <Table :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="nodeAddress">
          <Input type="text" v-model="editnodeAddress" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.nodeAddress}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="nodeName">
          <Input type="text" v-model="editnodeName" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.nodeName}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="fireControl">
          <Input type="text" v-model="editfireControl" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.fireControl}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="clean">
          <Input type="text" v-model="editclean" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.clean}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="ant">
          <Input type="text" v-model="editant" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.ant}}</span>
        </template>

        <template slot-scope="{ row, index }" slot="humidity">
          <Input type="text" v-model="edithumidity" v-if="editIndex === index" title=""></Input>
          <span v-else>{{row.humidity}}</span>
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
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="节点地址" class="titillate">
          <Input value="${this.formItem.nodeAddress}"  v-model="formItem.nodeAddress" placeholder="请输入节点地址" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="节点名称" class="titillate">
          <Input  value="${this.formItem.nodeName}"  v-model="formItem.nodeName" placeholder="请输入节点名称" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="消防安全" class="titillate">
          <Input value="${this.formItem.fireControl}"  v-model="formItem.fireControl" placeholder="请输入消防安全" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="清洁" class="titillate">
          <Input value="${this.formItem.clean}"  v-model="formItem.clean" placeholder="请输入清洁" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="蚁虫" class="titillate">
          <Input value="${this.formItem.ant}"  v-model="formItem.ant" placeholder="请输入蚁虫" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="湿度" class="titillate">
          <Input value="${this.formItem.humidity}"  v-model="formItem.humidity" placeholder="请输入湿度" :disabled="this.falg ===3"></Input>
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
  nodeAddress: 'customer',
  data () {
    return {
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '节点地址',
          slot: 'nodeAddress',
          align: 'center'
        },
        {
          title: '节点名称',
          slot: 'nodeName',
          align: 'center'
        },
        {
          title: '消防安全',
          slot: 'fireControl',
          align: 'center'
        },
        {
          title: '清洁',
          slot: 'clean',
          align: 'center'
        },
        {
          title: '蚁虫',
          slot: 'ant',
          align: 'center'
        },
        {
          title: '湿度（参考10-50）',
          slot: 'humidity',
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
        nodeAddress: '',
        nodeName: '',
        fireControl: '',
        clean: '',
        ant: '',
        humidity: '',
        id: ''
      },
      showdata: '',
      model1: '',
      nodeAddressList: [],
      select: {
        nodeName: '',
        nodeAddress: '',
        fireControl: '',
        clean: '',
        ant: '',
        humidity: ''
      },

      // 修改传参
      editIndex: -1, // 当前聚焦的输入框的行数
      editnodeAddress: '', // 修改节点地址，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editnodeName: '', // 修改节点名称
      editfireControl: '', // 修改消防安全
      editclean: '', // 修改清洁
      editant: '', // 修改蚁虫
      edithumidity: ''// 修改湿度
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
      this.editnodeAddress = row.nodeAddress
      this.editnodeName = row.nodeName
      this.editfireControl = row.fireControl
      this.editant = row.ant
      this.edithumidity = row.humidity

      this.editclean = row.clean
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.nodeAddress = this.editnodeAddress
      this.formItem.nodeName = this.editnodeName
      this.formItem.fireControl = this.editfireControl
      this.formItem.clean = this.editclean
      this.formItem.ant = this.editant
      this.formItem.humidity = this.edithumidity
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
      this.$http.post('inspectionCenter/getInspectionCenter', {
        pageNum: this.page,
        pageSize: this.pageSize
      }, res => {
        this.historyData = res.data.inspectionCenterList
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
            this.$http.get('inspectionCenter/deleteInspectionCenter', {
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
        array.nodeAddress = this.formItem.nodeAddress
        array.nodeName = this.formItem.nodeName
        array.fireControl = this.formItem.fireControl
        array.clean = this.formItem.clean
        array.ant = this.formItem.ant
        array.humidity = this.formItem.humidity
        array.id = this.formItem.id
        if ((array.nodeAddress.length !== 0) & (array.nodeName.length !== 0) & (array.fireControl.length !== 0) & (array.clean.length !== 0) & (array.ant.length !== 0) & (array.humidity.length !== 0)) {
          this.$http.post('inspectionCenter/addOrUpdateInspectionCenter', array, res => {
            if (res.code === 1000) {
              if (this.flag === 1) {
                this.$Message.success('新增用户成功')
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
    padding: 8px 8px 8px 3%;
    background-color: #F8F8F9;
    margin: 10px;
  }
  .tabView{
    margin: 2%;
    padding: 1%;
    background-color: #e4e9e4;
  }
  .binlog{
    margin: 0 2%;
  }
</style>
