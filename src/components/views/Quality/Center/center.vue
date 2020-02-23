<template>
    <div class="bgcolor">
      <div>
        <Breadcrumb class="bread">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>品质管理管理</BreadcrumbItem>
          <BreadcrumbItem>投诉管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="tabView">
        <Col span="23" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;margin-left:2.2%">
          <Tabs type="card">
            <TabPane label="投诉登记">
              <div>
                <Button class="findTab" type="info" @click="handleAdd">增加</Button>
                <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
              </div>
              <Table width="90%" border :columns="columns2" :data="dataAdd" @on-selection-change="dataChange">
                <template slot-scope="{ row, index }" slot="Time">
                  <Input type="text" v-model="editTime" v-if="editIndex === index" />
                  <span v-else>{{ row.Time }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Number">
                  <Input type="text" v-model="editNumber" v-if="editIndex === index" />
                  <span v-else>{{ row.Number }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Address">
                  <Input type="text" v-model="editAddress" v-if="editIndex === index" />
                  <span v-else>{{ row.Address }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="RepairCategory">
                  <Input type="text" v-model="editRepairCategory" v-if="editIndex === index" />
                  <span v-else>{{ row.RepairCategory }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Receiver">
                  <Input type="text" v-model="editReceiver" v-if="editIndex === index" />
                  <span v-else>{{ row.Receiver }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="People">
                  <Input type="text" v-model="editPeople" v-if="editIndex === index" />
                  <span v-else>{{ row.People }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Type">
                  <Input type="text" v-model="editType" v-if="editIndex === index" />
                  <span v-else>{{ row.Type }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Telephone">
                  <Input type="text" v-model="editTelephone" v-if="editIndex === index" />
                  <span v-else>{{ row.Telephone }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Degree">
                  <Input type="text" v-model="editDegree" v-if="editIndex === index" />
                  <span v-else>{{ row.Degree }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Project">
                  <Input type="text" v-model="editProject" v-if="editIndex === index" />
                  <span v-else>{{ row.Project }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Content">
                  <Input type="text" v-model="editContent" v-if="editIndex === index" />
                  <span v-else>{{ row.Content }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="action">
                  <div v-if="editIndex === index">
                    <Button @click="handleSave(index)">保存</Button>
                    <Button @click="cancel">取消</Button>
                  </div>
                  <div v-else>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                    <Button type="success" size="small" @click="handleEdit(row, index)">修改</Button>
                  </div>
                </template>
              </Table>
              <Modal
                v-model="modalAdd"
                title="新增"
                @on-ok="addCancel">
                <table class="tabalign">
                  <tr class="modelTab">
                    <td style="padding-left: 10px">
                      报修时间：<Input value="${this.Addindex.editTime}" v-model="Addindex.editTime" style="width: auto" />
                    </td>
                    <td>
                      报修编号：<Input value="${this.Addindex.Number}" v-model="Addindex.editNumber" style="width: auto" />
                    </td>
                  </tr>
                  <tr class="modelTab">
                    <td style="padding-left: 10px">
                      报修位置：<Input value="${this.Addindex.editAddress}" v-model="Addindex.editAddress" style="width: auto" />
                    </td>
                    <td>
                      报修类别：<Input value="${this.Addindex.editRepairCategory}" v-model="Addindex.editRepairCategory" style="width: auto" />
                    </td>
                  </tr>
                  <tr class="modelTab">
                    <td style="padding-left: 20px">
                      接报人：<Input value="${this.Addindex.editReceiver}" v-model="Addindex.editReceiver" style="width: auto" />
                    </td>
                    <td style="padding-left: 12px">
                      报修人：<Input value="${this.Addindex.editPeople}" v-model="Addindex.editPeople" style="width: auto" />
                    </td>
                  </tr>
                  <tr class="modelTab">
                    <td style="padding-left: 10px">
                      客户类型：<Input value="${this.Addindex.editType}" v-model="Addindex.editType" style="width: auto" />
                    </td>
                    <td>
                      联系电话：<Input value="${this.Addindex.editTelephone}" v-model="Addindex.editTelephone" style="width: auto" />
                    </td>
                  </tr>
                  <tr class="modelTab">
                    <td style="padding-left: 10px">
                      紧急程度：<Input value="${this.Addindex.editDegree}" v-model="Addindex.editDegree" style="width: auto"></Input>
                    </td>
                    <td>
                      维修项目： <Input value="${this.Addindex.editProject}" v-model="Addindex.editProject" style="width: auto" />
                    </td>
                  </tr>
                  <tr class="modelTab">
                    <td style="padding-left: 10px">
                      维修内容：<Input value="${this.Addindex.editContent}"  v-model="Addindex.editContent" style="width: auto" />
                    </td>
                  </tr>
                </table>
              </Modal>
            </TabPane>
            <TabPane label="投诉派工">
              <Table width="90%" border :columns="worker" :data="workerData">

                <template slot-scope="{ row, index }" slot="workEndTime">
                  <Input type="text" v-model="workAddData.workEditEndTime" v-if="editwork=== index"></Input>
                  <span v-else>{{ row.workEndTime }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="workattendant">
                  <Input type="text" v-model="workAddData.workEditattendant" v-if="editwork === index"></Input>
                  <span v-else>{{ row.workattendant }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="workState">
                  <Input type="text" v-model="workAddData.workEditState" v-if="editwork === index"></Input>
                  <span v-else>{{ row.workState }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="workAction">
                  <div v-if="editwork === index">
                    <Button @click="handleWorkSave(index)">保存</Button>
                    <Button @click="cancelWork">取消</Button>
                  </div>
                  <div v-else>
                    <Button type="success" size="small" @click="handleEditwork(row, index)">修改</Button>
                    <Button type="primary" size="small" @click="handleReturnVisit">完工>回访<Icon type="ios-fastforward" /></Button>
                  </div>
                </template>
              </Table>
            </TabPane>
            <TabPane label="投诉回访">
              <Table width="90%" border :columns="visit" :data="visitData">

                <template slot-scope="{ row, index }" slot="Satisfied">
                  <Input type="text" v-model="visiter" v-if="editvisit=== index"></Input>
                  <span v-else>{{ row.Satisfied }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="Editfried">
                  <div v-if="editvisit === index">
                    <Button @click="handlevisitSave(index)">保存</Button>
                    <Button @click="cancelvisit">取消</Button>
                  </div>
                  <div v-else>
                    <Button type="success" size="small" @click="handleEditvisit(row, index)">修改</Button>
                    <!--<Button type="success" size="small" @click="handleReturnVisit">回访就绪</Button>-->
                  </div>
                </template>
              </Table>
            </TabPane>
            <TabPane label="投诉统计报表">
              <table>
                <tr>
                  <td id="main" style="width: 500px;height: 400px"></td>
                  <td id="cake" style="width: 500px;height: 400px"></td>
                </tr>
              </table>
            </TabPane>
          </Tabs>
        </Col>
      </div>
    </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      columns2: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '报修时间',
          slot: 'Time',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '报修编号',
          slot: 'Number',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '报修位置',
          slot: 'Address',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '报修类别',
          align: 'center',
          slot: 'RepairCategory',
          width: 100
        },
        {
          title: '接报人',
          align: 'center',
          slot: 'Receiver',
          width: 100
        },
        {
          title: '报修人',
          align: 'center',
          slot: 'People',
          width: 100
        },
        {
          title: '客户类型',
          align: 'center',
          slot: 'Type',
          width: 100
        },
        {
          title: '联系电话',
          align: 'center',
          slot: 'Telephone',
          width: 100
        },
        {
          title: '紧急程度',
          align: 'center',
          slot: 'Degree',
          width: 100
        },
        {
          title: '维修项目',
          slot: 'Project',
          align: 'center',
          width: 100
        },
        {
          title: '维修内容',
          slot: 'Content',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          fixed: 'right',
          width: 150
        }
      ],
      dataAdd: [],
      editvisit: -1,
      editwork: -1,
      editIndex: -1,
      editTime: [],
      editNumber: [],
      editAddress: [],
      editRepairCategory: [],
      editReceiver: [],
      editPeople: [],
      editType: [],
      editTelephone: [],
      editDegree: [],
      editProject: [],
      editContent: [],

      // 新增
      Addindex: {
        editTime: '',
        editNumber: '',
        editAddress: '',
        editRepairCategory: '',
        editReceiver: '',
        editPeople: '',
        editType: '',
        editTelephone: '',
        editDegree: '',
        editProject: '',
        editContent: ''
      },
      // 模态框默认值
      modalAdd: false,

      // 派工表头
      worker: [
        {
          title: '报修时间',
          key: 'workTime',
          align: 'center'
        },
        {
          title: '完工时间',
          slot: 'workEndTime',
          align: 'center'
        },
        {
          title: '报修编号',
          key: 'workNum',
          align: 'center'
        },
        {
          title: '报修地点',
          key: 'workAddress',
          align: 'center'
        },
        {
          title: '报修人',
          key: 'worker',
          align: 'center'
        },
        {
          title: '报修项目',
          key: 'workProject',
          align: 'center'
        },
        {
          title: '维修人员',
          slot: 'workattendant',
          align: 'center'
        },
        {
          title: '报修状态',
          slot: 'workState',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'workAction',
          align: 'center',
          width: 200
        }
      ],
      workerData: [],

      // 回访表头
      visit: [
        {
          title: '报修编号',
          key: 'visitNum',
          align: 'center'
        },
        {
          title: '报修地点',
          key: 'visitAddress',
          align: 'center'
        },
        {
          title: '报修人',
          key: 'visitpeople',
          align: 'center'
        },
        {
          title: '报修项目',
          key: 'visitProject',
          align: 'center'
        },
        {
          title: '维修人员',
          key: 'visitattendant',
          align: 'center'
        },
        {
          title: '报修状态',
          key: 'visitState',
          align: 'center'
        },
        {
          title: '回访满意度',
          slot: 'Satisfied',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'Editfried',
          align: 'center'
        }
      ],
      visiter: '',
      visitData: [],
      visitTransmit: {
        'visitNum': '',
        'visitAddress': '',
        'visitpeople': '',
        'visitProject': '',
        'visitattendant': '',
        'visitState': '',
        'Satisfied': ''
      },
      temporaryNumb: '',
      temporaryAddresss: '',
      temporaryPeople: '',
      temporaryProject: '',
      visititem: {
        'visitNum': '',
        'visitAddress': '',
        'visitpeople': '',
        'visitProject': '',
        'visitattendant': '',
        'visitState': ''
      },
      workAddData: {
        workEditTime: '',
        workEditNum: '',
        workEditAddress: '',
        workerEdit: '',
        workEditProject: '',
        workEditEndTime: '',
        workEditattendant: '',
        workEditState: ''
      },
      itemArray: {
        workTime: '',
        workEndTime: '',
        workNum: '',
        workAddress: '',
        worker: '',
        workProject: '',
        workattendant: '',
        workState: ''
      },
      addhot: 0, // 暖通
      addpower: 0, // 强电
      adddownpower: 0, // 弱电
      addfix: 0, // 保修
      watter: 0, // 给排水
      comprehensive: 0, // 综合
      iframeSatisfied: 0, // 满意
      UniframeSatisfied: 0// 不满意
    }
  },
  methods: {
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      // 通过JSON引入数据
      this.$http.get('/api/dataAdd').then((response) => {
        response = response.body
        // // 保存取到的所有数据
        this.dataAdd = response.data
      })
      this.$http.get('/api/workerData').then((response) => {
        response = response.body
        // // 保存取到的所有数据
        this.workerData = response.data
      })
      this.$http.get('/api/visiter').then((response) => {
        response = response.body
        // // 保存取到的所有数据
        this.visitData = response.data
        for (let j = 0; j < this.visitData.length; j++) {
          console.log(this.visitData[j].visitProject)
          if (this.visitData[j].visitProject === '暖通') {
            this.addhot += 1
          }
          if (this.visitData[j].visitProject === '强电') {
            this.addpower += 1
          }
          if (this.visitData[j].visitProject === '弱电') {
            this.adddownpower += 1
          }
          if (this.visitData[j].visitProject === '保修服务') {
            this.addfix += 1
          }
          if (this.visitData[j].visitProject === '给排水') {
            this.watter += 1
          }
          if (this.visitData[j].visitProject === '综合维修') {
            this.comprehensive += 1
          }
          if (this.visitData[j].Satisfied === '满意') {
            this.iframeSatisfied += 1
          } if (this.visitData[j].visitProject === '综合维修') {
            this.UniframeSatisfied += 1
          }
        }
        var echarts = require('echarts')

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '报修项目统计'
          },
          tooltip: {},
          xAxis: {
            data: ['暖通', '强电', '弱电', '保修服务', '给排水', '综合维修']
          },
          yAxis: {},
          series: [{
            name: '投诉统计',
            type: 'bar',
            data: [this.addhot, this.addpower, this.adddownpower, this.addfix, this.watter, this.comprehensive]
          }]
        })
        var cake = echarts.init(document.getElementById('cake'))
        cake.setOption({
          title: {
            text: '满意度统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['满意', '不满意']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [

                {value: this.iframeSatisfied, name: '满意'},
                {value: this.UniframeSatisfied, name: '不满意'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })
    },
    // 修改信息
    handleEdit (row, index) {
      this.editTime = row.Time
      this.editNumber = row.Number
      this.editAddress = row.Address
      this.editRepairCategory = row.RepairCategory
      this.editReceiver = row.Receiver
      this.editPeople = row.People
      this.editType = row.Type
      this.editTelephone = row.Telephone
      this.editDegree = row.Degree
      this.editProject = row.Project
      this.editContent = row.Content
      this.editIndex = index
    },
    handleSave (index) {
      this.dataAdd[index].Time = this.editTime
      this.temporaryNumb = this.dataAdd[index].Number = this.editNumber
      this.temporaryAddresss = this.dataAdd[index].Address = this.editAddress
      this.dataAdd[index].RepairCategory = this.editRepairCategory
      this.dataAdd[index].Receiver = this.editReceiver
      this.temporaryPeople = this.dataAdd[index].People = this.editPeople
      this.dataAdd[index].Type = this.editType
      this.dataAdd[index].Telephone = this.editTelephone
      this.dataAdd[index].Degree = this.editDegree
      this.temporaryProject = this.dataAdd[index].Project = this.editProject
      this.dataAdd[index].Content = this.editContent
      this.editIndex = -1
      this.$Message.info('修改成功')
    },
    cancel () {
      this.editIndex = -1,
      this.$Message.error('取消修改')
    },
    // 修改完工信息
    handleEditwork (row, index) {
      this.workAddData.workEndTime = row.workEndTime
      this.workAddData.workattendant = row.workattendant
      this.workAddData.workState = row.workState
      this.editwork = index
    },
    // 保存
    handleWorkSave (index) {
      this.workerData[index].workEndTime = this.workAddData.workEditEndTime
      this.visititem.visitattendant = this.workerData[index].workattendant = this.workAddData.workEditattendant
      this.visititem.visitState = this.workerData[index].workState = this.workAddData.workEditState

      this.editwork = -1
      console.log(this.workerData[index].workEndTime + '+' + this.workerData[index].workattendant + '+' + this.workerData[index].workState)
      this.$Message.info('修改成功')
    },
    cancelWork () {
      this.editwork = -1
      this.$Message.error('取消修改')
    },
    // 回访传值
    handleReturnVisit () {
      this.visititem.visitNum = this.temporaryNumb
      this.visititem.visitAddress = this.temporaryAddresss
      this.visititem.visitpeople = this.temporaryPeople
      this.visititem.visitProject = this.temporaryProject
      this.visitData.push(this.visititem)
      console.log(this.temporaryNumb)
    },
    // 回访修改
    handleEditvisit (row, index) {
      this.editvisit = index
    },
    // 回访确认
    handlevisitSave (index) {
      this.visitData[index].Satisfied = this.visiter
      this.editvisit = -1
      this.$Message.info('修改成功')
    },
    // 取消
    cancelvisit () {
      this.editvisit = -1
      this.$Message.error('取消修改')
    },
    // 查看
    show (index) {
      this.$Modal.info({
        title: '查看',
        content: `报修时间：${this.dataAdd[index].Time}<br>报修编号：${this.dataAdd[index].Number}<br>报修位置：${this.dataAdd[index].Address}<br>报修类别：${this.dataAdd[index].RepairCategory}<br>接报人：${this.dataAdd[index].Receiver}<br>报修人：${this.dataAdd[index].People}<br>客户类型：${this.dataAdd[index].Type}<br>联系电话：${this.dataAdd[index].editTelephone}<br>紧急程度：${this.dataAdd[index].Degree}<br>维修项目：${this.dataAdd[index].Project}<br>维修内容：${this.dataAdd[index].Content}`
      })
    },
    // 删除操作
    handleSelectAll (status) {
      for (let i = 0; i < this.dataAdd.length; i++) {
        for (let j = 0; j < this.showdata.length; j++) {
          if (this.dataAdd[i].id === this.showdata[j].id) {
            this.dataAdd.splice(i, 1)
          }
        }
      }
    },
    // 复选框选择的数据
    dataChange (data) {
      this.showdata = data
    },
    // 新增
    handleAdd () {
      this.modalAdd = true
    },
    addCancel () {
      let array = {}
      array.Time = this.Addindex.editTime
      this.temporaryNumb = array.Number = this.Addindex.editNumber
      this.temporaryAddresss = array.Address = this.Addindex.editAddress
      array.RepairCategory = this.Addindex.editRepairCategory
      array.Receiver = this.Addindex.editReceiver
      this.temporaryPeople = array.People = this.Addindex.editPeople
      array.Type = this.Addindex.editType
      array.Telephone = this.Addindex.editTelephone
      array.Degree = this.Addindex.editDegree
      this.temporaryProject = array.Project = this.Addindex.editProject
      array.Content = this.Addindex.editContent

      if ((array.Time.length != 0) & (array.Number.length != 0) & (array.Address.length != 0) & (array.RepairCategory.length != 0) & (array.Receiver.length != 0) & (array.People.length != 0) & (array.Type.length != 0) & (array.Telephone.length != 0) & (array.Degree.length != 0) & (array.Project.length != 0) & (array.Content.length != 0)) {
        this.dataAdd.push(array)
        this.itemArray.workTime = array.Time
        this.itemArray.workNum = array.Number
        this.itemArray.workAddress = array.Address
        this.itemArray.worker = array.People
        this.itemArray.workProject = array.Project

        console.log(this.itemArray)
        this.workerData.push(this.itemArray)
        this.$Message.success('新增成功')
      } else {
        alert('请补全以上信息')
      }
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
  .tabView{
    height: 100%;
  }
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 2%;
    background-color: #F8F8F9;
    margin: 10px;
  }
  .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
    height: 120px;
    margin-top: -16px;
  }

  .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }

  .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-color: transparent;
  }

  .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    border-color: #fff;
  }
  .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 0;
    background: #fff;
  }
  .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    border-top: 1px solid #3399ff;
  }
  .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
  }
  .findTab{
    margin: 1% 0.3%;
  }
  .modelTab,.modelTab>td{
    padding: 5px 0;
  }
  .tabalign{
    margin: 0 auto;
  }

</style>
