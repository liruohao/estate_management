<template>
  <div>
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>成本综合管理</BreadcrumbItem>
        <BreadcrumbItem>能耗管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div>
      <Button class="findTab" type="info" @click="handleAdd">增加</Button>
    </div>
    <div class="adaption">
      <Table :columns="columns" :data="ajaxHistoryData" border  height="400">

        <template slot-scope="{ row, index }" slot="Month">
          <Input type="text" v-model="historyData.EditMonth" v-if="editwork=== index"></Input>
          <span v-else>{{ row.Month }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="landscapeElectricity">
          <Input type="text" v-model="historyData.EditlandscapeElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.landscapeElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="landscapeMoney">
          <Input type="text" v-model="historyData.EditlandscapeMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.landscapeMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="publicElectricity">
          <Input type="text" v-model="historyData.EditpublicElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.publicElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="publicMoney">
          <Input type="text" v-model="historyData.EditpublicMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.publicMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="outdoorElectricity">
          <Input type="text" v-model="historyData.EditoutdoorElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.outdoorElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="outdoorMoney">
          <Input type="text" v-model="historyData.EditoutdoorMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.outdoorMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="corridorElectricity">
          <Input type="text" v-model="historyData.EditcorridorElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.corridorElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="corridorMoney">
          <Input type="text" v-model="historyData.EditcorridorMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.corridorMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carElectricity">
          <Input type="text" v-model="historyData.EditcarElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.carElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carMoney">
          <Input type="text" v-model="historyData.EditcarMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.carMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="SubtotalElectricity">
          <Input type="text" v-model="historyData.EditSubtotalElectricity" v-if="editwork=== index"></Input>
          <span v-else>{{ row.SubtotalElectricity }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="SubtotalMoney">
          <Input type="text" v-model="historyData.EditSubtotalMoney" v-if="editwork=== index"></Input>
          <span v-else>{{ row.SubtotalMoney }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editwork === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="cancel">取消</Button>
          </div>
          <div v-else>
            <Button type="success" size="small" @click="handleEdit(row, index)">修改</Button>
          </div>
        </template>

      </Table>
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
      @on-ok="addCancel">
      <table class="tabalign">
        <tr class="modelTab">
          <td style="padding-left: 10px">
            报修时间：<Input value="${this.addData.addMonth}" v-model="addData.addMonth" style="width: auto" />
          </td>
          <td>
            报修编号：<Input value="${this.addData.addlandscapeElectricity}" v-model="addData.addlandscapeElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            报修位置：<Input value="${this.addData.addlandscapeMoney}" v-model="addData.addlandscapeMoney" style="width: auto" />
          </td>
          <td>
            报修类别：<Input value="${this.addData.addpublicElectricity}" v-model="addData.addpublicElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 20px">
            接报人：<Input value="${this.addData.addpublicMoney}" v-model="addData.addpublicMoney" style="width: auto" />
          </td>
          <td style="padding-left: 12px">
            报修人：<Input value="${this.addData.addoutdoorElectricity}" v-model="addData.addoutdoorElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            客户类型：<Input value="${this.addData.addoutdoorMoney}" v-model="addData.addoutdoorMoney" style="width: auto" />
          </td>
          <td>
            联系电话：<Input value="${this.addData.addcorridorElectricity}" v-model="addData.addcorridorElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            紧急程度：<Input value="${this.addData.addcorridorMoney}" v-model="addData.addcorridorMoney" style="width: auto"></Input>
          </td>
          <td>
            维修项目： <Input value="${this.addData.addcarElectricity}" v-model="addData.addcarElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            维修内容：<Input value="${this.addData.addcarMoney}"  v-model="addData.addcarMoney" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            维修内容：<Input value="${this.addData.addSubtotalElectricity}"  v-model="addData.addSubtotalElectricity" style="width: auto" />
          </td>
        </tr>
        <tr class="modelTab">
          <td style="padding-left: 10px">
            维修内容：<Input value="${this.addData.addSubtotalMoney}"  v-model="addData.addSubtotalMoney" style="width: auto" />
          </td>
        </tr>
      </table>
    </Modal>
    <tooLbar></tooLbar>
  </div>

</template>
<script>
  import tooLbar from './../../toolbar/toolbar.vue'
  export default {
    data () {
      return {
        columns: [
          {
            title: '月份',
            slot: 'Month',
            align: 'center',
            width: 100,
            fixed: 'left',
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
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'landscapeMoney',
                    align: 'center',
                    width: 100,
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
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'publicMoney',
                    align: 'center',
                    width: 100,
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
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'outdoorMoney',
                    align: 'center',
                    width: 100,
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
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'corridorMoney',
                    align: 'center',
                    width: 100,
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
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'carMoney',
                    align: 'center',
                    width: 100,
                  }
                ]
              },
              {
                title: '小计',
                align: 'center',
                children: [
                  {
                    title: '用量（kw.h）',
                    slot: 'SubtotalElectricity',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '电费',
                    slot: 'SubtotalMoney',
                    align: 'center',
                    width: 100,
                  }
                ]
              }
            ]
          },
          {
            title: '操作',
            slot: 'action',
            align:'center',
            width: 200,
            fixed:'right',
          }
        ],
        modalAdd:false,
        ajaxHistoryData:[],
        dataCount:[],
        editwork: -1,
        historyData:{
          EditMonth:0,
          EditlandscapeElectricity:0,
          EditlandscapeMoney:0,
          EditpublicElectricity:0,
          EditpublicMoney:0,
          EditoutdoorElectricity:0,
          EditoutdoorMoney:0,
          EditcorridorElectricity:0,
          EditcorridorMoney:0,
          EditcarElectricity:0,
          EditcarMoney:0,
          EditSubtotalElectricity:0,
          EditSubtotalMoney:0
        },
        addData:{
          addMonth:'',
          addlandscapeElectricity:'',
          addlandscapeMoney:'',
          addpublicElectricity:'',
          addpublicMoney:'',
          addoutdoorElectricity:'',
          addoutdoorMoney:'',
          addcorridorElectricity:'',
          addcorridorMoney:'',
          addcarElectricity:'',
          addcarMoney:'',
          addSubtotalElectricity:'',
          addSubtotalMoney:''
        }
      }
    },
    components:{tooLbar},
    methods:{
      //修改信息
      handleEdit (row, index) {
        this.historyData.EditMonth= row.Month;
        this.historyData.EditlandscapeElectricity= row.landscapeElectricity;
        this.historyData.EditlandscapeMoney= row.landscapeMoney;
        this.historyData.EditpublicElectricity= row.publicElectricity;
        this.historyData.EditpublicMoney= row.publicMoney;
        this.historyData.EditoutdoorElectricity= row.outdoorElectricity;
        this.historyData.EditoutdoorMoney= row.outdoorMoney;
        this.historyData.EditcorridorElectricity= row.corridorElectricity;
        this.historyData.EditcorridorMoney= row.corridorMoney;
        this.historyData.EditcarElectricity= row.carElectricity;
        this.historyData.EditcarMoney= row.carMoney;
        this.historyData.EditSubtotalElectricity= row.SubtotalElectricity;
        this.historyData.EditSubtotalMoney= row.SubtotalMoney;
        this.editwork = index;
      },
      handleSave (index) {
        this.ajaxHistoryData[index].Month = this.historyData.EditMonth;
        this.ajaxHistoryData[index].landscapeElectricity = this.historyData.EditlandscapeElectricity;
        this.ajaxHistoryData[index].landscapeMoney = this.historyData.EditlandscapeMoney;
        this.ajaxHistoryData[index].publicElectricity = this.historyData.EditMonth;
        this.ajaxHistoryData[index].publicElectricity = this.historyData.EditpublicElectricity;
        this.ajaxHistoryData[index].publicMoney = this.historyData.EditpublicMoney;
        this.ajaxHistoryData[index].outdoorElectricity = this.historyData.EditoutdoorElectricity;
        this.ajaxHistoryData[index].outdoorMoney = this.historyData.EditoutdoorMoney;
        this.ajaxHistoryData[index].corridorElectricity = this.historyData.EditcorridorElectricity;
        this.ajaxHistoryData[index].corridorMoney = this.historyData.EditcorridorMoney;
        this.ajaxHistoryData[index].carElectricity = this.historyData.EditcarElectricity;
        this.ajaxHistoryData[index].carMoney = this.historyData.EditcarMoney;
        this.ajaxHistoryData[index].SubtotalElectricity = this.historyData.EditSubtotalElectricity;
        this.ajaxHistoryData[index].SubtotalMoney = this.historyData.EditSubtotalMoney;
        this.editwork = -1;
        this.$Message.info('修改成功');
      },
      cancel(){
        this.editwork = -1,
          this.$Message.error('取消修改');
      },
      //新增按钮
      handleAdd(){
        this.modalAdd=true
      },
      //模态框确定按钮
      addCancel () {
        let array={};
        array.Month=this.addData.addMonth;
        array.landscapeElectricity=this.addData.addlandscapeElectricity;
        array.landscapeMoney=this.addData.addlandscapeMoney;
        array.publicElectricity=this.addData.addpublicElectricity;
        array.publicMoney=this.addData.addpublicMoney;
        array.outdoorElectricity=this.addData.addoutdoorElectricity;
        array.outdoorMoney=this.addData.addoutdoorMoney;
        array.corridorElectricity=this.addData.addcorridorElectricity;
        array.corridorMoney=this.addData.addcorridorMoney;
        array.carElectricity=this.addData.addcarElectricity;
        array.carMoney=this.addData.addcarMoney;
        array.SubtotalElectricity=this.addData.addSubtotalElectricity;
        array.SubtotalMoney=this.addData.addSubtotalMoney;
        if((array.Month.length!=0)&(array.landscapeElectricity.length!=0)&(array.landscapeMoney.length!=0)&(array.publicElectricity.length!=0)&(array.publicMoney.length!=0)&(array.outdoorElectricity.length!=0)&(array.outdoorMoney.length!=0)&(array.corridorElectricity.length!=0)&(array.corridorMoney.length!=0)&(array.carElectricity.length!=0)&(array.carMoney.length!=0)&(array.SubtotalElectricity.length!=0)&(array.SubtotalMoney.length!=0)){
          this.ajaxHistoryData.push(array);
          this.$Message.success('新增成功');
        }else {
          alert('请补全以上信息')
        }
      },
      handleListApproveHistory(){
        //通过JSON引入数据
        this.$http.get('/api/power').then((response)=>{
          response=response.body;
          // // 保存取到的所有数据
          this.ajaxHistoryData = response.data;
          this.dataCount = response.data.length;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          // if(response.data.length < this.pclassificationSize){
          //   this.historyData = this.ajaxHistoryData;
          // }else{
          //   this.historyData = this.ajaxHistoryData.slice(0,this.pclassificationSize);
          // }
          var echarts = require('echarts');

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
          let variablelandscape=0;
          let variableoutdoor=0;
          let variablecorridor=0;
          let variablecar=0;
          let variablepublic=0;

          for(let j=0;j<this.ajaxHistoryData.length;j++){
            variablelandscape+=parseInt(this.ajaxHistoryData[j].landscapeElectricity);
            variableoutdoor+=parseInt(this.ajaxHistoryData[j].publicElectricity);
            variablecorridor+=parseInt(this.ajaxHistoryData[j].outdoorElectricity);
            variablecar+=parseInt(this.ajaxHistoryData[j].corridorElectricity);
            variablepublic+=parseInt(this.ajaxHistoryData[j].carElectricity);
          }
          // 绘制图表
          myChart.setOption({
            title: {
              text: '2018年每月用电量折线图',
              x:'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} '
              }
            },
            series: [
              {
                name:'用电量',
                type:'line',
                data:[this.ajaxHistoryData[0].SubtotalElectricity,this.ajaxHistoryData[1].SubtotalElectricity,this.ajaxHistoryData[2].SubtotalElectricity,this.ajaxHistoryData[3].SubtotalElectricity,this.ajaxHistoryData[4].SubtotalElectricity,this.ajaxHistoryData[5].SubtotalElectricity,this.ajaxHistoryData[6].SubtotalElectricity,this.ajaxHistoryData[7].SubtotalElectricity,this.ajaxHistoryData[8].SubtotalElectricity,this.ajaxHistoryData[9].SubtotalElectricity,this.ajaxHistoryData[10].SubtotalElectricity,this.ajaxHistoryData[11].SubtotalElectricity],
                markPoint: {
                  data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                  ]
                },
                markLine: {
                  data: [
                    {type: 'average', name: '平均值'}
                  ]
                }
              }
            ]
          });
          var cake = echarts.init(document.getElementById('cake'));
          cake.setOption({
            title : {
              text: '各类用电比例图',
              subtext: '各类用电比例图',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['景观照明','公共区域照明','室外路灯','楼道照明','车库照明']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:variablelandscape, name:'景观照明'},
                  {value:variableoutdoor, name:'公共区域照明'},
                  {value:variablecorridor, name:'室外路灯'},
                  {value:variablecar, name:'楼道照明'},
                  {value:variablepublic, name:'车库照明'}
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
        });
      },
    },
    mounted () {
      this.handleListApproveHistory();
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
