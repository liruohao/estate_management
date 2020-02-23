<template>
  <div>
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>成本综合管理</BreadcrumbItem>
        <BreadcrumbItem>能耗管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="padding-left: 30px">
      <Button type="info" @click="handleAdd">增加</Button>
      <Button type="error" @click="handleSelectAll">删除</Button>
    </div>
    <div class="adaption">
      <Table :columns="columns" :data="ajaxHistoryData" border  height="400" @on-selection-change="dataChange">

        <template slot-scope="{ row, index }" slot="Month">
          <DatePicker type="month" transfer  clearable v-model="historyData.EditMonth" style="width: 100%" @on-change="timeChange" v-if="editwork=== index"></DatePicker>
          <span v-else>{{ row.year + '- ' + row.month }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="landscapeElectricity">
          <InputNumber type="text" v-model="historyData.EditlandscapeElectricity" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.landscapeElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="landscapeMoney">
          <InputNumber type="text" v-model="historyData.EditlandscapeMoney" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.landscapeMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="publicElectricity">
          <InputNumber type="text" v-model="historyData.EditpublicElectricity" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.publicElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="publicMoney">
          <InputNumber type="text" v-model="historyData.EditpublicMoney" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.publicMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="outdoorElectricity">
          <InputNumber type="text" v-model="historyData.EditoutdoorElectricity" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.outdoorElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="outdoorMoney">
          <InputNumber type="text" v-model="historyData.EditoutdoorMoney" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.outdoorMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="corridorElectricity">
          <InputNumber type="text" v-model="historyData.EditcorridorElectricity" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.corridorElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="corridorMoney">
          <InputNumber type="text" v-model="historyData.EditcorridorMoney" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.corridorMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carElectricity">
          <InputNumber type="text" v-model="historyData.EditcarElectricity" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.carElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carMoney">
          <InputNumber type="text" v-model="historyData.EditcarMoney" v-if="editwork=== index"></InputNumber>
          <span v-else>{{ row.carMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="subtotalElectricity">
          <span>{{ row.subtotalElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="subtotalMoney">
          <span>{{ row.subtotalMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editwork === index">
            <Button @click="handleSave(index, row)">保存</Button>
            <Button @click="cancel">取消</Button>
          </div>
          <div v-else>
            <Button type="success" size="small" @click="handleEdit(row, index)">修改</Button>
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
    <div>
      <table>
        <tr>
          <td id="main" style="width: 60%;height: 400px;padding-right: 10px;padding-left: 20px"></td>
          <td id="cake" style="width:  450px;height:  400px;padding-left: 20px"></td>
        </tr>
      </table>
    </div>
    <Modal
      v-model="modalAdd"
      title="新增"
      @on-visible-change="modalChange"
      @on-ok="addCancel">
      <Form ref="addData"  :model="addData"  label-position="right" :label-width="120">
        <Row>
          <Col span="24">
            <Row>
              <Col>
                <FormItem label="报修时间" prop="time">
                  <DatePicker type="month" clearable v-model="addData.time" style="width: 100%" @on-change="timeChange"></DatePicker>
                </FormItem>
              </Col>
              <Col>
                <FormItem label="景观照明用电量" prop="landscapeElectricity">
                  <InputNumber  clearable v-model="addData.landscapeElectricity"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="景观照明电费" prop="landscapeMoney">
                  <InputNumber  clearable v-model="addData.landscapeMoney"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="公共区域照明用电量" prop="publicElectricity">
                  <InputNumber clearable v-model="addData.publicElectricity"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="公共区域照明电费" prop="publicMoney">
                  <InputNumber clearable v-model="addData.publicMoney"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="室外路灯用电量" prop="outdoorElectricity">
                  <InputNumber clearable v-model="addData.outdoorElectricity"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="室外路灯电费" prop="outdoorMoney">
                  <InputNumber clearable v-model="addData.outdoorMoney"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="楼道照明用电量" prop="corridorElectricity">
                  <InputNumber clearable v-model="addData.corridorElectricity"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="楼道照明电费" prop="corridorMoney">
                  <InputNumber clearable v-model="addData.corridorMoney"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="车库照明用电量" prop="carElectricity">
                  <InputNumber clearable v-model="addData.carElectricity"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <Col>
                <FormItem label="车库照明电费" prop="carMoney">
                  <InputNumber clearable v-model="addData.carMoney"  style="width: 100%"></InputNumber >
                </FormItem>
              </Col>
              <!--<Col>-->
                <!--<FormItem label="小计用电量" prop="subtotalElectricity">-->
                  <!--<InputNumber clearable v-model="addData.subtotalElectricity"  style="width: 100%"></InputNumber >-->
                <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col>-->
                <!--<FormItem label="小计电费" prop="subtotalMoney">-->
                  <!--<InputNumber clearable v-model="addData.subtotalMoney"  style="width: 100%"></InputNumber >-->
                <!--</FormItem>-->
              <!--</Col>-->
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
    <tooLbar></tooLbar>
  </div>

</template>
<script>
import tooLbar from './../../toolbar/toolbar.vue'
export default {
  data () {
    return {
      showdata: '',
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      page: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '月份',
          slot: 'Month',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '公共照明（kw.h）',
          align: 'center',
          children: [
            {
              title: '景观照明（kw.h）',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'landscapeElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'landscapeMoney',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '公共区域照明（kw.h）',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'publicElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'publicMoney',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '室外路灯（住宅）',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'outdoorElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'outdoorMoney',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '楼道照明（住宅）',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'corridorElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'corridorMoney',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '车库照明',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'carElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'carMoney',
                  align: 'center',
                  width: 100
                }
              ]
            },
            {
              title: '小计',
              align: 'center',
              children: [
                {
                  title: '用量（kw.h）',
                  slot: 'subtotalElectricity',
                  align: 'center',
                  width: 100
                },
                {
                  title: '电费',
                  slot: 'subtotalMoney',
                  align: 'center',
                  width: 100
                }
              ]
            }
          ]
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200,
          fixed: 'right'
        }
      ],
      modalAdd: false,
      ajaxHistoryData: [],
      editwork: -1,
      historyData: {
        EditMonth: 0,
        EditlandscapeElectricity: 0,
        EditlandscapeMoney: 0,
        EditpublicElectricity: 0,
        EditpublicMoney: 0,
        EditoutdoorElectricity: 0,
        EditoutdoorMoney: 0,
        EditcorridorElectricity: 0,
        EditcorridorMoney: 0,
        EditcarElectricity: 0,
        EditcarMoney: 0,
        EditSubtotalElectricity: 0,
        EditSubtotalMoney: 0
      },
      flag: '',
      addData: {
        id: '',
        time: '',
        year: '',
        month: '',
        landscapeElectricity: '',
        landscapeMoney: '',
        publicElectricity: '',
        publicMoney: '',
        outdoorElectricity: '',
        outdoorMoney: '',
        corridorElectricity: '',
        corridorMoney: '',
        carElectricity: '',
        carMoney: '',
        subtotalElectricity: '',
        subtotalMoney: ''
      }
    }
  },
  components: {tooLbar},
  methods: {
    modalChange (flag) {
      if (!flag) {
        for (let i in this.addData) {
          this.addData[i] = ''
        }
      }
    },
    dataChange (data) {
      this.showdata = data
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
            this.$http.get('energyConsumption/deleteEnergyConsumption', {
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
    timeChange (time) {
      this.addData.year = time.substring(0, 4)
      this.addData.month = time.substring(5, 7)
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
      this.historyData.time = row.year + '-' +row.month
      this.historyData.EditMonth = row.Month
      this.historyData.EditlandscapeElectricity = row.landscapeElectricity
      this.historyData.EditlandscapeMoney = row.landscapeMoney
      this.historyData.EditpublicElectricity = row.publicElectricity
      this.historyData.EditpublicMoney = row.publicMoney
      this.historyData.EditoutdoorElectricity = row.outdoorElectricity
      this.historyData.EditoutdoorMoney = row.outdoorMoney
      this.historyData.EditcorridorElectricity = row.corridorElectricity
      this.historyData.EditcorridorMoney = row.corridorMoney
      this.historyData.EditcarElectricity = row.carElectricity
      this.historyData.EditcarMoney = row.carMoney
      this.historyData.EditSubtotalElectricity = row.subtotalElectricity
      this.historyData.EditSubtotalMoney = row.subtotalMoney
      this.editwork = index
    },
    handleSave (index, row) {
      this.addData.Month = this.historyData.EditMonth
      this.addData.landscapeElectricity = this.historyData.EditlandscapeElectricity
      this.addData.landscapeMoney = this.historyData.EditlandscapeMoney
      this.addData.publicElectricity = this.historyData.EditMonth
      this.addData.publicElectricity = this.historyData.EditpublicElectricity
      this.addData.publicMoney = this.historyData.EditpublicMoney
      this.addData.outdoorElectricity = this.historyData.EditoutdoorElectricity
      this.addData.outdoorMoney = this.historyData.EditoutdoorMoney
      this.addData.corridorElectricity = this.historyData.EditcorridorElectricity
      this.addData.corridorMoney = this.historyData.EditcorridorMoney
      this.addData.carElectricity = this.historyData.EditcarElectricity
      this.addData.carMoney = this.historyData.EditcarMoney
      this.addData.subtotalElectricity = this.historyData.EditSubtotalElectricity
      this.addData.subtotalMoney = this.historyData.EditSubtotalMoney
      this.addData.id = row.id
      this.falg = 2
      this.addCancel()
      this.editwork = -1
    },
    cancel () {
      this.editwork = -1
      this.$Message.error('取消修改')
    },
    // 新增按钮
    handleAdd () {
      this.modalAdd = true
      this.flag = 1
    },
    // 模态框确定按钮
    addCancel () {
      let array = {}
      array.id = this.addData.id
      array.year = this.addData.year
      array.month = this.addData.month
      array.landscapeElectricity = this.addData.landscapeElectricity
      array.landscapeMoney = this.addData.landscapeMoney
      array.publicElectricity = this.addData.publicElectricity
      array.publicMoney = this.addData.publicMoney
      array.outdoorElectricity = this.addData.outdoorElectricity
      array.outdoorMoney = this.addData.outdoorMoney
      array.corridorElectricity = this.addData.corridorElectricity
      array.corridorMoney = this.addData.corridorMoney
      array.carElectricity = this.addData.carElectricity
      array.carMoney = this.addData.carMoney
      array.subtotalElectricity = this.addData.subtotalElectricity
      array.subtotalMoney = this.addData.subtotalMoney
      console.log(array)
      if ((array.landscapeElectricity.length !== 0) &&
        (array.landscapeMoney.length !== 0) &&
        (array.publicElectricity.length !== 0) &&
        (array.publicMoney.length !== 0) &&
        (array.outdoorElectricity.length !== 0) &&
        (array.outdoorMoney.length !== 0) &&
        (array.corridorElectricity.length !== 0) &&
        (array.corridorMoney.length !== 0) &&
        (array.carElectricity.length !== 0) &&
        (array.carMoney.length !== 0) &&
        (array.subtotalElectricity.length !== 0) &&
        (array.subtotalMoney.length !== 0)) {
        this.$http.post('energyConsumption/addOrUpdateEnergyConsumption', array, res => {
          if (res.code === 1000) {
            if (this.flag === 1) {
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
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('energyConsumption/getEnergyConsumption', {
        pageNum: this.page,
        pageSize: this.pageSize
      }, res => {
        this.ajaxHistoryData = res.data.energyConsumptionList
        this.dataCount = res.data.count
      })
    }
  },
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>

<style scoped>
  .adaption{
   padding: 1% 1%;
    margin: 1%;
    background-color: #e8eaec;
  }
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 3%;
    background-color: #F8F8F9;
    margin: 10px;
  }
  .findTab{
    margin: 0.2% 2%;
  }

</style>
