<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>成本综合管理</BreadcrumbItem>
        <BreadcrumbItem>物料管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <Form :model="select" :label-width="100" inline>
        <FormItem label="编码：">
          <Input v-model="select.code" clearable/>
        </FormItem>
        <FormItem label="类别：">
          <Input v-model="select.category"/>
        </FormItem>
        <FormItem label="分类：">
          <Input v-model="select.classification" clearable/>
        </FormItem>
        <FormItem label="名称：">
          <Input v-model="select.name" clearable/>
        </FormItem>
        <FormItem label="规格：">
          <Input v-model="select.specifications" clearable/>
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
        <template slot-scope="{ row, index }" slot="code">
          <Input  type="text" v-model="editcode" v-if="editIndex === index" title=""></Input>
          <span class="transfer" v-else>{{ row.code }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="category">
          <Input type="text" v-model="editcategory" v-if="editIndex === index" />
          <span v-else>{{ row.category }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="classification">
          <Input type="text" v-model="editclassification" v-if="editIndex === index" />
          <span v-else>{{ row.classification }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="name">
          <Input type="text" v-model="editname" v-if="editIndex === index" />
          <span v-else>{{ row.name }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="specifications">
          <Input type="text" v-model="editspecifications" v-if="editIndex === index" />
          <span v-else>{{ row.specifications }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="materialScience">
          <Input type="text" v-model="editmaterialScience" v-if="editIndex === index" />
          <span v-else>{{ row.materialScience }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="surface">
          <Input type="text" v-model="editsurface" v-if="editIndex === index" />
          <span v-else>{{ row.surface }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="logo">
          <Input type="text" v-model="editlogo" v-if="editIndex === index" />
          <span v-else>{{ row.logo }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="business">
          <Input type="text" v-model="editbusiness" v-if="editIndex === index" />
          <span v-else>{{ row.business }}</span>
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
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="编码" class="titfloat">
          <Input id="rubric" value="${this.formItem.code}"  v-model="formItem.code" placeholder="请输入编码" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="类别" class="titfloat">
          <Input id="rubric" value="${this.formItem.category}"  v-model="formItem.category" placeholder="请输入类别" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="分类" class="titfloat">
          <Input id="rubric" value="${this.formItem.classification}"  v-model="formItem.classification" placeholder="请输入分类" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="名称" class="titfloat">
          <Input id="rubric" value="${this.formItem.name}"  v-model="formItem.name" placeholder="请输入名称" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="规格" class="titfloat">
          <Input id="rubric" value="${this.formItem.specifications}"  v-model="formItem.specifications" placeholder="请输入规格" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="材料" class="titfloat">
          <Input id="rubric" value="${this.formItem.materialScience}"  v-model="formItem.materialScience" placeholder="请输入材料" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="表面处理" class="titfloat">
          <Input id="rubric" value="${this.formItem.surface}"  v-model="formItem.surface" placeholder="请输入表面处理" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="商标" class="titfloat">
          <Input id="rubric" value="${this.formItem.logo}"  v-model="formItem.logo" placeholder="请输入商标" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="供应商" class="titfloat">
          <Input id="rubric" value="${this.formItem.business}"  v-model="formItem.business" placeholder="请输入供应商" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="总用量" class="titfloat">
          <Input id="rubric" value="${this.formItem.consumption}"  v-model="formItem.consumption" placeholder="请输入总用量" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="仓库现有量" class="titfloat">
          <Input id="rubric" value="${this.formItem.quantityAvailable}"  v-model="formItem.quantityAvailable" placeholder="请输入仓库现有量" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="判断" class="titfloat">
          <Input id="rubric" value="${this.formItem.judge}"  v-model="formItem.judge" placeholder="请输入判断" :disabled="this.falg ===3"></Input>
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
  code: 'customer',
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
          title: '编码',
          slot: 'code',
          align: 'center',
          width: 150,
          fixed: 'left'
        },
        {
          title: '类别',
          slot: 'category',
          align: 'center',
          width: 150
        },
        {
          title: '分类',
          slot: 'classification',
          align: 'center',
          width: 150
        },
        {
          title: '名称',
          slot: 'name',
          align: 'center',
          width: 150
        },
        {
          title: '规格',
          slot: 'specifications',
          align: 'center',
          width: 150
        },
        {
          title: '材料',
          slot: 'materialScience',
          align: 'center',
          width: 150
        },
        {
          title: '表面处理',
          slot: 'surface',
          align: 'center',
          width: 150
        },
        {
          title: '商标',
          slot: 'logo',
          align: 'center',
          width: 150
        },
        {
          title: '供应商',
          slot: 'business',
          align: 'center',
          width: 150
        },
        {
          title: '总用量',
          slot: 'consumption',
          align: 'center',
          width: 150
        },
        {
          title: '仓库现有量',
          slot: 'quantityAvailable',
          align: 'center',
          width: 150
        },
        {
          title: '判断',
          slot: 'judge',
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
        code: '',
        category: '',
        classification: '',
        name: '',
        specifications: '',
        materialScience: '',
        surface: '',
        logo: '',
        business: '',
        consumption: '',
        quantityAvailable: '',
        judge: '',
        id: ''
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
      codeList: [],
      select: {
        category: '',
        code: '',
        classification: '',
        name: '',
        specifications: '',
        materialScience: '',
        surface: '',
        logo: '',
        business: '',
        consumption: '',
        quantityAvailable: '',
        judge: ''
      },

      // 修改传参
      editIndex: -1, // 当前聚焦的输入框的行数
      editcode: '', // 修改姓名属性，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editcategory: '', // 修改性别属性
      editclassification: '', // 修改年龄属性
      editname: '', // 修改生日属性
      editspecifications: '', // 修改地址属性
      editmaterialScience: '',
      editsurface: '',
      editlogo: '',
      editbusiness: '',
      editconsumption: '',
      editquantityAvailable: '',
      editjudge: '',
      showdata: ''
    }
  },
  components: {tooLbar},
  methods: {
    modalChange (flag) {
      if (!flag) {
        for (let i in this.formItem) {
          this.formItem[i] = ''
        }
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
      array.code = this.select.code
      array.category = this.select.category
      array.classification = this.select.classification
      array.specifications = this.select.specifications
      this.historyData = this.historyData.filter(function (item) {
        return ((item.code == array.code && item.category == array.category && item.classification == array.classification && item.specifications == array.specifications) || (item.code == array.code && item.category == array.category && item.classification == array.classification) || (item.code == array.code && item.category == array.category && item.specifications == array.specifications) || (item.code == array.code && item.classification == array.classification && item.specifications == array.specifications) || (item.category == array.category && item.classification == array.classification && item.specifications == array.specifications) || (item.code == array.code && item.category == array.category) || (item.code == array.code && item.classification == array.classification) || (item.code == array.code && item.specifications == array.specifications) || (item.category == array.category && item.classification == array.classification) || (item.category == array.category && item.specifications == array.specifications) || (item.classification == array.classification && item.specifications == array.specifications) || (item.code == array.code || item.category == array.category || item.classification == array.classification || item.specifications == array.specifications))
      })
    },

    // 修改信息
    handleEdit (row, index) {
      this.editcode = row.code
      this.editcategory = row.category
      this.editclassification = row.classification
      this.editspecifications = row.specifications
      this.editmaterialScience = row.materialScience
      this.editsurface = row.surface
      this.editlogo = row.logo
      this.editbusiness = row.business
      this.editconsumption = row.consumption
      this.editquantityAvailable = row.quantityAvailable
      this.editjudge = row.judge
      this.editname = row.name
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.code = this.editcode
      this.formItem.category = this.editcategory
      this.formItem.classification = this.editclassification
      this.formItem.name = this.editname
      this.formItem.specifications = this.editspecifications
      this.formItem.materialScience = this.editmaterialScience
      this.formItem.surface = this.editsurface
      this.formItem.logo = this.editlogo
      this.formItem.business = this.editbusiness
      this.formItem.consumption = this.editconsumption
      this.formItem.quantityAvailable = this.editquantityAvailable
      this.formItem.judge = this.editjudge
      this.formItem.id = row.id
      this.editIndex = -1
      this.falg = 2
      this.modalAdd()

      this.editIndex = -1
      this.$Messclassification.info('修改成功')
    },
    cancel () {
      this.editIndex = -1,
      this.$Messclassification.error('取消修改')
    },
    handleListApproveHistory () {
      this.$http.post('materiel/getMateriel', {
        pageNum: this.pclassification,
        pageSize: this.pclassificationSize,
        code: this.select.code,
        category: this.select.category,
        classification: this.select.classification,
        specifications: this.select.specifications
      }, res => {
        this.historyData = res.data.materiels
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
            this.$http.get('materiel/deleteMateriel', {
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
    pageChange (page) {
      this.pclassification = page
      this.handleListApproveHistory()
    },
    pageSizeChange (pageSize) {
      this.pclassificationSize = pageSize
      this.handleListApproveHistory()
    },
    modalAdd () {
      if (this.falg === 1 || this.falg === 2) {
        let array = {}
        array.code = this.formItem.code
        array.category = this.formItem.category
        array.classification = this.formItem.classification
        array.name = this.formItem.name
        array.specifications = this.formItem.specifications
        array.materialScience = this.formItem.materialScience
        array.surface = this.formItem.surface
        array.logo = this.formItem.logo
        array.business = this.formItem.business
        array.consumption = this.formItem.consumption
        array.quantityAvailable = this.formItem.quantityAvailable
        array.judge = this.formItem.judge
        array.id = this.formItem.id
        console.log(array)
        if ((array.code.length !== 0) & (array.category.length !== 0) & (array.classification.length !== 0) & (array.name.length !== 0) & (array.specifications.length !== 0) & (array.materialScience.length !== 0) & (array.surface.length !== 0) & (array.logo.length !== 0) & (array.business.length !== 0) & (array.consumption.length !== 0) & (array.quantityAvailable.length !== 0) & (array.judge.length !== 0)) {
          this.$http.post('/materiel/addOrUpdateMateriel', array, res => {
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
