<template>
  <div class="school">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>业主维修</BreadcrumbItem>
        <BreadcrumbItem>填写报修/投诉</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="lay" style="margin-bottom: 1%">
      <Button @click="addData" type="primary">新增</Button>
    </div>
    <Table border ref="currentRowTable" :columns="columns3" :data="data1"></Table>
    <Page :total="total"
          style="margin-top: 10px;  width: 100%;
      height: 56px;
      color: black;
      line-height: 56px;
      padding: 0 15px;
      box-sizing: border-box;"
          show-elevator
          show-sizer
          show-total
          :current="pageNo"
          :page-size-opts="[10, 20, 30, 50]"
          :page-size="pageSize"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"/>
    <Modal  @on-ok="modalAdd" @on-cancel="modalExit"  title="填写报销/投诉" width="400px" v-model="showMenuModal" :mask-closable="false">
      <Form ref="SarMenuEO" :model="SarMenuEO"  :label-width="60">
        <FormItem label="类型" prop="type" class="laws-info-item">
          <Select v-model="SarMenuEO.type" style="width: 250px">
            <Option v-for="opt in countryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="业主姓名" prop="ownerPeople" class="laws-info-item">
          <Input v-model="SarMenuEO.ownerPeople" style="width: 250px"></Input>
        </FormItem>
        <FormItem label="业主电话" prop="ownerPhone" class="laws-info-item">
          <Input v-model="SarMenuEO.ownerPhone" style="width: 250px"></Input>
        </FormItem>
        <FormItem label="内容" prop="content" class="laws-info-item">
          <Input v-model="SarMenuEO.content" style="width: 250px"></Input>
        </FormItem>
        <FormItem label="地址" prop="position" class="standards-info-item">
          <Input  v-model="SarMenuEO.position" style="width: 250px"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'school',
  data () {
    return {
      countryOptions: [
        {
          label: '投诉',
          value: '投诉'
        },
        {
          label: '报修',
          value: '报修'
        }
      ],
      SarMenuEO: {
        type: '',
        ownerPhone: '',
        content: '',
        position: '',
        ownerPeople: ''
      },
      showMenuModal: false,
      formItem: {
        city: '',
        schoolName: '',
        schoolProperty: '',
        schoolType: ''
      },
      // 总数
      total: 0,
      // 当前页数
      pageNo: 1,
      // 单页数量
      pageSize: 10,
      columns3: [
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '业主姓名',
          key: 'ownerPeople'
        },
        {
          title: '业主电话',
          key: 'ownerPhone'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '地址',
          key: 'position'
        },
        {
          title: '报修时间',
          key: 'updateTime'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '上门时间',
          key: 'doorTime',
          render: (h, params) => {
            let text = ''
            text = params.row.doorTime.substring(0, 10)
            return h('div', {props: {}}, text)
          }

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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$http.get('complaintReporting/deleteComplaintReporting', {
                      id: params.row.id
                    }, res => {
                      this.$Message.success('取消成功')
                      this.handleListApproveHistory()
                    })
                  }
                }
              }, '取消操作')
            ])
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    modalExit () {},
    modalAdd () {
      let array = {}
      array.type = this.SarMenuEO.type
      array.ownerPeople = this.SarMenuEO.ownerPeople
      array.ownerPhone = this.SarMenuEO.ownerPhone
      array.content = this.SarMenuEO.content
      array.position = this.SarMenuEO.position
      array.state = '等待受理'
      if ((array.type.length !== 0) && (array.ownerPeople !== 0) && (array.ownerPhone.length !== 0) & (array.content.length !== 0) & (array.position.length !== 0)) {
        this.$http.post('/complaintReporting/addOrUpdateComplaintReporting', array, res => {
          if (res.code === 1000) {
            this.$Message.success('新增成功')
            this.handleListApproveHistory()
          }
        })
      } else {
        alert('请补全以上信息')
      }
    },
    addData () {
      this.showMenuModal = true
    },
    // 重置
    resetSearch () {
      for (let i in this.formItem) {
        this.formItem[i] = ''
      }
    },
    pageChange (page) {
      this.pageNo = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.handleListApproveHistory()
    },
    handleListApproveHistory () {
      this.$http.post('complaintReporting/getComplaintReporting', {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }, res => {
        this.data1 = res.data.complaintReportingList
        this.total = res.data.count
      })
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>
<style scoped>
  .school {
    background: #FFFFFF;
    padding: 12px;
  }
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 2%;
    background-color: #F8F8F9;
    margin: 10px;
  }
</style>
