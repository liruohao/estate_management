<template>
  <div class="ownersty">
    <Breadcrumb class="bread">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>小区公告管理</BreadcrumbItem>
      <BreadcrumbItem>物业在职员工公告</BreadcrumbItem>
    </Breadcrumb>
    <iframe class="lay" name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=2" width="770" height="70" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
    <div class="lay" style="margin-bottom: 1%">
      <Button @click="addData" type="primary">新增</Button>
      <Button type="error" @click="handleSelectAll" >删除</Button>
    </div>
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
<!--      <Page  :total="dataCount" :page-size="pageSize" show-sizer class="paging" @on-change="changepage" @on-page-size-change="pagesize"></Page>-->
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题" class="titfloat">
          <Input id="rubric" value="${this.formItem.input}"  v-model="formItem.input" placeholder="请输入标题" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="日期" class="titfloat">
          <DatePicker  type="date"  id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3" style="width: 200px "></DatePicker>
        </FormItem>
        <FormItem label="内容" class="titfloat">
          <Input id="substance" type="textarea" :autosize="{minRows: 2}" v-model="formItem.desc" :disabled="this.falg ===3" title="" ></Input>
        </FormItem>
        <!--<FormItem label="日期" class="titfloat">-->
        <!--<Input id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3"/>-->
        <!--</FormItem>-->
        <!--<editor   :autosize="{minRows: 2}"  :disabled="this.falg ===2"></editor>-->
      </Form>
    </Modal>
    <Modal v-model="importModalshowflag" title="上传附件" footer-hide :z-index="1000" width="80%" class="modal-bg">
        <div style="margin-bottom: 15px">上传文件</div>
        <Upload :action="importExcelUrl" ref="importfile" :show-upload-list="false" :max-size=10240 name="file" :data="fileData" style="margin-bottom: 15px" :on-success="fileSuccess">
          <Button icon="ios-cloud-upload-outline">选择文件</Button>
        </Upload>
        <div style="margin-bottom: 15px; line-height: 30px">已上传的资料</div>
      <Button type="error" @click="batchMenuDel" style="margin-bottom: 15px">批量删除</Button>
      <Table :columns="courseColumns" :data="courseList" height="400" border ref="selection" @on-selection-change="handleRowChange" ></Table>
    </Modal>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      clickMenuList: [],
      fileData: {
        noticeId: ''
      },
      courseColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '附件名称',
          align: 'center',
          key: 'fileOldName'
        },
        {
          title: '上传时间',
          align: 'center',
          key: 'updatedTime',
          render: (h, params) => {
            let typeShow = this.$dateFormat(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss')
            return h('div', {props: {}}, typeShow)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 400,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '请选择',
                      content: '确定删除这些数据?',
                      onOk: () => {
                        this.$http.get('noticeFile/deleteNoticeFile', {
                          id: params.row.id
                        }, res => {
                          if (res.code === 1000) {
                            this.getNoticeById()
                            this.$Message.success('删除成功')
                          }
                        })
                      }})
                  }
                }
              }, '删除'),
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
                    window.open('estate_management_war/noticeFile/downloadFile?noticeFileId=' + params.row.id)
                  }
                }
              }, params.row.fileName === '' || params.row.fileName === null ? '修改' : '下载')
            ])
          }
        }
      ],
      courseId: '',
      courseList: [],
      importExcelUrl: 'estate_management_war/noticeFile/uploadFile',
      importModalshowflag: false,
      falg: '', // 判断现在的操作为是什么 1 为新增 2为编辑 3为查看
      // 当前行
      item: '',
      // 模态框数据
      formItem: {
        input: '',
        tinyData: '',
        desc: '',
        noticeType: 0,
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
          type: 'selection',
          width: 60,
          align: 'center'
        },
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
          width: 250,
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
              }, '编辑'),
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
                    this.importModalshowflag = true
                    this.courseList = params.row.noticeFileList
                    this.fileData.noticeId = params.row.id
                  }
                }
              }, '上传附件')
            ])
          }
        }
      ],
      data1: []
    }
  },
  // components: {Editor},
  methods: {
    getNoticeById () {
      this.$http.get('notice/getNoticeById', {
        id: this.fileData.noticeId
      }, res => {
        this.courseList = res.data.noticeFileList
      })
    },
    handleRowChange (selection) {
      this.clickMenuList = selection
    },
    fileSuccess (response) {
      if (response.code === 1000) {
        this.$Message.success('上传成功！')
        this.getNoticeById()
      } else {
        this.$Message.warning(response.msg)
      }
    },
    // 批量删除
    batchMenuDel () {
      if (this.clickMenuList.length > 0) {
        let userIds = []
        for (let i = 0; i < this.clickMenuList.length; i++) {
          let userId = this.clickMenuList[i].id
          userIds.push(userId)
        }
        let userIdsStr = userIds.join(',')
        this.$Modal.confirm({
          title: '请选择',
          content: '确定删除这些数据?',
          onOk: () => {
            this.$http.get('noticeFile/deleteNoticeFile', {
              id: userIdsStr
            }, res => {
              if (res.code === 1000) {
                this.getNoticeById()
                this.$Message.success('删除成功')
              }
            })
          }})
      } else {
        this.$Message.error('请选择一条数据进行删除')
      }
    },
    modalChange (flag) {
      if (!flag) {
        for (let i in this.formItem) {
          this.formItem[i] = ''
        }
      }
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('notice/getNotice', {
        pageNum: this.page,
        pageSize: this.pageSize,
        noticeType: 0
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
      this.formItem.id = row.id
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
      array.noticeType = 0
      console.log(array.title + '，' + array.date + '，' + array.content + '，' + (array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0))
      if ((array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0)) {
        this.$http.post('notice/addOrUpdateNotice', array, res => {
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
      this.handleListApproveHistory()
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
  .ivu-modal-body{
    max-height: 500px;
    min-height: 300px;
    overflow-y: auto;
  }
</style>
