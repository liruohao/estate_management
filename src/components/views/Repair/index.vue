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
    <Modal title="填写报销/投诉" width="400px" v-model="showMenuModal" :mask-closable="false">
      <Form ref="SarMenuEO" :model="SarMenuEO"  :label-width="60">
        <FormItem label="类型" prop="menuName" class="laws-info-item">
          <Select style="width: 250px">
            <Option v-for="opt in countryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="内容" prop="displaySeq" class="laws-info-item">
          <Input style="width: 250px">></Input>
        </FormItem>
        <FormItem label="联系电话" prop="remarks" class="standards-info-item">
          <Input  style="width: 250px"></Input>
        </FormItem>
        <FormItem label="地址" prop="remarks" class="standards-info-item">
          <Input  style="width: 250px"></Input>
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
      SarMenuEO: {},
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
          type: 'index',
          width: 80,
          title: '序号',
          align: 'center'
        },
        {
          title: '类型',
          key: 'schoolName'
        },
        {
          title: '内容',
          key: 'schoolProperty'
        },
        {
          title: '联系电话',
          key: 'schoolType'
        },
        {
          title: '状态',
          key: 'schoolType'
        },
        {
          title: '报修时间',
          key: 'city'
        },
        {
          title: '上门时间',
          key: 'schoolType'
        }

      ],
      data1: []
    }
  },
  methods: {
    closeMenuModal () {},
    saveMenu () {},
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
      this.getSchoolByPage()
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.getSchoolByPage()
    },
    getSchoolByPage () {
      // this.$http.get('sys-school/getSchoolByPage', {
      //   city: this.formItem.city,
      //   schoolName: this.formItem.schoolName,
      //   schoolProperty: this.formItem.schoolProperty,
      //   schoolType: this.formItem.schoolType,
      //   page: this.pageNo,
      //   pageSize: this.pageSize
      // }, res => {
      //   this.data1 = res.data.records
      //   this.total = res.data.total
      // })
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  mounted () {
    this.getSchoolByPage()
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
