<template>
  <div class="ownersty">
    <Breadcrumb class="bread">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>小区公告管理</BreadcrumbItem>
      <BreadcrumbItem>小区业主公告</BreadcrumbItem>
    </Breadcrumb>
    <iframe class="lay" name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=2" width="770" height="70" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
    <div  class="tabowner">
      <Table stripe  border ref="selection" :columns="columns4" :data="historyData" @on-selection-change="dataChange"></Table>
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
      <!--        <Page  :total="dataCount" :page-size="pageSize" show-sizer class="paging" @on-change="changepage" @on-page-size-change="pagesize"></Page>-->
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题" class="titfloat">
          <Input id="rubric" value="${this.formItem.input}"  v-model="formItem.input" placeholder="请输入标题" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="日期" class="titfloat">
          <DatePicker  type="date"  id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3" style="width: 200px;"></DatePicker>
        </FormItem>
        <!--<FormItem label="日期" class="titfloat">-->
        <!--<Input id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3"/>-->
        <!--</FormItem>-->
        <FormItem label="内容" class="titfloat">
          <Input id="substance" type="textarea" :autosize="{minRows: 2}" v-model="formItem.desc" :disabled="this.falg ===3" title="" ></Input>
        </FormItem>
        <!--<editor   :autosize="{minRows: 2}"  :disabled="this.falg ===2"></editor>-->
      </Form>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      falg: '', // 判断现在的操作为是什么 1 为新增 2为编辑 3为查看
      // 当前行
      item: '',
      // 模态框数据
      formItem: {
        input: '',
        tinyData: '',
        desc: '',
        noticeType: '0',
        id: ''
      },
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      page: 1,
      // 表格头部信息
      historyColumns: [
        {
          title: '人员',
          key: 'username'
        }
      ],
      historyData: [],
      // 模态框的标题
      modalTtile: '',
      showdata: [],
      editorshow: false,
      modalAddContent: [],
      columns4: [
        {
          title: '日期',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '内容',
          key: 'content',
          align: 'center',
          ellipsis: true
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '下载')
            ])
          }
        }
      ],
      data1: []
    }
  },
  // components: {Editor},
  methods: {
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('notice/getNotice', {
        pageNum: this.page,
        pageSize: this.pageSize
      }, res => {
        this.historyData = res.data.notices
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
    // 查看
    show (row) {
      this.editorshow = true
      this.modalTtile = '查看'
      this.falg = 3
      this.formItem.desc = row.content
      this.formItem.input = row.title
      this.formItem.tinyData = row.createTime
    },
    // 模态框确认按钮
    modalAdd () {
      let array = {}
      array.title = this.formItem.input
      array.content = this.formItem.desc
      array.noticeType = this.formItem.noticeType
      array.id = this.formItem.id
      // 获取时间
      let str = this.formItem.tinyData
      moment.locale('zh-cn')
      let dateEdit = moment(str).format('YYYY-MM-DD')
      array.date = dateEdit
      if (array.date === 'Invalid date') {
        array.date = ''
      }
      console.log(array.title + '，' + array.date + '，' + array.content + '，' + (array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0))
      if ((array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0)) {
        this.$http.post('notice/addOrUpdateNotice', array, res => {
          if (res.code === 1000) {
            if (this.flag === 1) {
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
      this.$Message.error('已取消操作')
    },
    edit (row) {
      this.editorshow = true
      this.modalTtile = '编辑'
      this.falg = 2
      this.formItem.input = row.title
      this.formItem.desc = row.content
      this.formItem.tinyData = row.createTime
      this.item = row._index
      this.formItem.id = row.id
    },
    // 删除
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
            this.$http.get('notice/deleteNotice', {
              id: userIdsStr
            }, res => {
              this.handleListApproveHistory()
              this.$Message.success('删除成功')
            })
          }})
      } else {
        this.$Message.error('请选择一条数据进行删除')
      }
    }
  },
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>

<style scoped>
  .tabowner{
    width: 90%;
    margin: 0 auto;
  }
  .ownersty{
    background-color: #ecffea;
  }
  .lay{
    margin-left:5%;
  }
  .titfloat{
    margin-left: -5%;
  }
  /*.model-sty{*/
  /*width:60%;*/
  /*position: relative;*/
  /*margin-top: 5%;*/
  /*}*/
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 3%;
    /*background-color: aliceblue;*/
    background-color: #F8F8F9;
    margin: 10px;
  }
</style>
