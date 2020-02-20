<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>收入管理</BreadcrumbItem>
        <BreadcrumbItem>停车管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <div>
        <table width="100%">
          <tr>
            <td>
              <span class="fontFloat">车位编号:</span>
              <Input v-model="select.carNum" style="width: 80%" />
            </td>
            <td class="tabfloat">
              <span class="fontFloat">位置:</span>
              <Input v-model="select.position" style="width: 80%" />
            </td>
            <td  class="tabfloat">
              <span class="fontFloat">承租人:</span>
              <Input v-model="select.Lessee" style="width: 80%" />
            </td>
          </tr>
          <tr>
            <td>
              <span class="fontFloat">车牌号:</span>
              <Input v-model="select.licensePlate"  style="width: 85%"></Input>
            </td>
            <td class="tabfloat" style="padding-left: 3.2%">
              <span class="fontspecifications">停车证号:</span>
              <Input v-model="select.parkinPermit  " style="width: 72%" />
            </td>
            <td class="tabbut">
              <Button type="primary" style="width: 80%" @click="selectData">查询</Button>
            </td>
          </tr>
        </table>


      </div>
      <div>
        <Button class="findTab" type="info" @click="addData">增加</Button>
        <Button class="findTab" type="error" @click="handleSelectAll">删除</Button>
      </div>
    </div>
    <div class="tabView">
      <Table border  :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="carPark">
          <Input  type="text" v-model="editcarPark" v-if="editIndex === index" title=""></Input>
          <span class="transfer" v-else>{{ row.carPark }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="carNum">
          <Input type="text" v-model="editcarNum" v-if="editIndex === index" />
          <span v-else>{{ row.carNum }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="position">
          <Input type="text" v-model="editposition" v-if="editIndex === index" />
          <span v-else>{{ row.position }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="Lessee">
          <Input type="text" v-model="editLessee" v-if="editIndex === index" />
          <span v-else>{{ row.Lessee }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="licensePlate">
          <Input type="text" v-model="editLessee" v-if="editIndex === index" />
          <span v-else>{{ row.licensePlate }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="parkinPermit">
          <Input type="text" v-model="editparkinPermit" v-if="editIndex === index" />
          <span v-else>{{ row.parkinPermit }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="telephone">
          <Input type="text" v-model="edittelephone" v-if="editIndex === index" />
          <span v-else>{{ row.telephone }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="startTime">
          <Input type="text" v-model="editstartTime" v-if="editIndex === index" />
          <span v-else>{{ row.startTime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="endTime">
          <Input type="text" v-model="editendTime" v-if="editIndex === index" />
          <span v-else>{{ row.endTime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="pay">
          <Input type="text" v-model="editpay" v-if="editIndex === index" />
          <span v-else>{{ row.pay }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="cancel">取消</Button>
          </div>
          <div v-else>
            <Button type="success" @click="handleEdit(row, index)">修改</Button>
          </div>
        </template>
      </Table>
      <Page  :total="dataCount" :pclassification-size="pclassificationSize" show-sizer class="paging" @on-change="changepclassification" @on-pclassification-size-change="pclassificationsize"></Page>
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           :footer-hide="this.falg ===3">
      <Form ref="formInline"  :model="formItem" :label-width="80" inline>
        <FormItem label="停车场" class="titfloat">
          <Input id="rubric" value="${this.formItem.carPark}"  v-model="formItem.carPark" placeholder="请输入停车场" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="车位编号" class="titfloat">
          <Input id="rubric" value="${this.formItem.carNum}"  v-model="formItem.carNum" placeholder="请输入车位编号	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="位置" class="titfloat">
          <Input id="rubric" value="${this.formItem.position}"  v-model="formItem.position" placeholder="请输入位置" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="承租人" class="titfloat">
          <Input id="rubric" value="${this.formItem.Lessee}"  v-model="formItem.Lessee" placeholder="请输入承租人" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="车牌号" class="titfloat">
          <Input id="rubric" value="${this.formItem.licensePlate}"  v-model="formItem.licensePlate" placeholder="请输入车牌号" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="停车证号" class="titfloat">
          <Input id="rubric" value="${this.formItem.parkinPermit}"  v-model="formItem.parkinPermit" placeholder="请输入停车证号" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="电话" class="titfloat">
          <Input id="rubric" value="${this.formItem.telephone}"  v-model="formItem.telephone" placeholder="请输入电话" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="开始日期" class="titfloat">
          <Input id="rubric" value="${this.formItem.startTime}"  v-model="formItem.startTime" placeholder="请输入开始日期" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="结束日期" class="titfloat">
          <Input id="rubric" value="${this.formItem.endTime}"  v-model="formItem.endTime" placeholder="请输入结束日期" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="缴费" class="titfloat">
          <Input id="rubric" value="${this.formItem.pay}"  v-model="formItem.pay" placeholder="请输入缴费" :disabled="this.falg ===3"></Input>
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
    carPark: 'customer',
    data () {
      return {
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed:'left'
          },
          {
            title: '停车场',
            slot: 'carPark',
            align:'center',
            width: 150,
            fixed:'left'
          },
          {
            title: '车位编号',
            slot: 'carNum',
            align:'center',
            width: 150,
          },
          {
            title: '位置',
            slot: 'position',
            align:'center',
            width: 150,
          },
          {
            title: '承租人',
            slot: 'Lessee',
            align:'center',
            width: 150,
          },
          {
            title: '车牌号',
            slot: 'licensePlate',
            align:'center',
            width: 150,
          },
          {
            title: '停车证号',
            slot: 'parkinPermit',
            align:'center',
            width: 150,
          },
          {
            title: '电话',
            slot: 'telephone',
            align:'center',
            width: 150,
          },
          {
            title: '开始日期',
            slot: 'startTime',
            align:'center',
            width: 150,
          },
          {
            title: '结束日期',
            slot: 'endTime',
            align:'center',
            width: 150,
          },
          {
            title: '缴费',
            slot: 'pay',
            align:'center',
            width: 150,
          },
          {
            title: '操作',
            slot: 'action',
            align:'center',
            width: 200,
            fixed:'right',
          }
        ],
        //分页传参条数
        ajaxHistoryData:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pclassificationSize:10,
        // 当前页码
        pclassification:1,
        historyData: [],
        modalTtile:'',
        falg: '',
        editorshow: false,
        // 模态框数据
        formItem: {
          carPark: '',
          carNum:'',
          position: '',
          Lessee:'',
          licensePlate:'',
          parkinPermit:'',
          telephone:'',
          startTime:'',
          endTime:'',
          pay:''
        },
        model1: '',
        carParkList: [],
        select: {
          carPark: '',
          carNum:'',
          position: '',
          Lessee:'',
          licensePlate:'',
          parkinPermit:'',
          telephone:'',
          startTime:'',
          endTime:'',
          pay:''
        },

        //修改传参
        editIndex: -1,
        editcarPark: '',
        editcarNum: '',
        editposition: '',
        editLessee: '',
        editlicensePlate: '',
        editparkinPermit: '',
        edittelephone: '',
        editstartTime: '',
        editendTime: '',
        editpay: ''
      }
    },
    components:{tooLbar},
    methods:{
      // 查询
      selectData () {
        let array=[];
        array.carPark=this.select.carPark;
        array.carNum=this.select.carNum;
        array.position=this.select.position;
        array.Lessee=this.select.Lessee;
        array.licensePlate=this.select.licensePlate;
        array.parkinPermit=this.select.parkinPermit;
        array.telephone=this.select.telephone;
        array.startTime=this.select.startTime;
        array.endTime=this.select.endTime;
        array.pay=this.select.pay;

        this.historyData=this.historyData.filter(function (item){
          return ((item.carPark==array.carPark&&item.carNum==array.carNum&&item.position==array.position&&item.Lessee==array.Lessee&&item.licensePlate==array.licensePlate&&item.parkinPermit==array.parkinPermit&&item.telephone==array.telephone&&item.startTime==array.startTime&&item.endTime==array.endTime&&item.pay==array.pay)||(item.carPark==array.carPark||item.carNum==array.carNum||item.position==array.position||item.Lessee==array.Lessee||item.licensePlate==array.licensePlate||item.parkinPermit==array.parkinPermit||item.telephone==array.telephone||item.startTime==array.startTime||item.endTime==array.endTime||item.pay==array.pay))
        })
      },

      //修改信息
      handleEdit (row, index) {
        this.editcarPark = row.carPark;
        this.editcarNum = row.carNum;
        this.editposition = row.position;
        this.editLessee = row.Lessee;
        this.editlicensePlate = row.licensePlate;
        this.editparkinPermit = row.parkinPermit;
        this.edittelephone = row.telephone;
        this.editstartTime = row.startTime;
        this.editendTime = row.endTime;
        this.editpay = row.pay;
        this.editIndex = index;
      },
      handleSave (index) {
        this.historyData[index].carPark = this.editcarPark;
        this.historyData[index].carNum = this.editcarNum;
        this.historyData[index].position = this.editposition;
        this.historyData[index].Lessee = this.editLessee;
        this.historyData[index].licensePlate = this.editlicensePlate;
        this.historyData[index].parkinPermit = this.editparkinPermit;
        this.historyData[index].telephone = this.edittelephone;
        this.historyData[index].startTime = this.editstartTime;
        this.historyData[index].endTime = this.editendTime;
        this.historyData[index].pay = this.editpay;
        this.editIndex = -1;
        this.$Messclassification.info('修改成功');
      },
      cancel(){
        this.editIndex = -1,
          this.$Messclassification.error('取消修改');
      },
      //分页管理, 获取历史记录信息
      handleListApproveHistory(){
        //通过JSON引入数据
        this.$http.get('/api/stopCar').then((response)=>{
          response=response.body;
          // // 保存取到的所有数据
          this.ajaxHistoryData = response.data;
          this.dataCount = response.data.length;
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          if(response.data.length < this.pclassificationSize){
            this.historyData = this.ajaxHistoryData;
          }else{
            this.historyData = this.ajaxHistoryData.slice(0,this.pclassificationSize);
          }
        });

      },
      // 当前页码
      changepclassification(index){
        this.pclassification = index;
        let _start = ( index - 1 ) * this.pclassificationSize;
        let _end = index * this.pclassificationSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
      },
      //返回切换后的每页条数
      pclassificationsize(index){
        let _start = ( this.pclassification - 1 )   * index;
        let _end =  this.pclassification   * index;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
        // 当前展示条数
        this.pclassificationSize = index;
        console.log(this.historyData)
      },

      //删除操作
      handleSelectAll (status) {
        for (let i = 0; i < this.historyData.length; i++) {
          for (let j = 0; j < this.showdata.length; j++) {
            if (this.historyData[i].id === this.showdata[j].id) {
              this.historyData.splice(i, 1)
            }
          }
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
        if(this.falg===1){
          let array = {};
          array.carPark = this.formItem.carPark;
          array.carNum = this.formItem.carNum;
          array.position = this.formItem.position;
          array.Lessee = this.formItem.Lessee;
          array.licensePlate = this.formItem.licensePlate;
          array.parkinPermit = this.formItem.parkinPermit;
          array.telephone = this.formItem.telephone;
          array.startTime = this.formItem.startTime;
          array.endTime = this.formItem.endTime;
          array.pay = this.formItem.pay;

          if((array.carPark.length!==0)&(array.carNum.length!==0)&(array.position.length!==0)&(array.Lessee.length!==0)&(array.licensePlate.length!==0)&(array.parkinPermit.length!==0)&(array.telephone.length!==0)&(array.startTime.length!==0)&(array.endTime.length!==0)&(array.pay.length!==0)){
            this.historyData.push(array);
            this.$Message.info('新增成功');
          }else {
            alert('请补全以上信息')
          }
        }
      },
      modalExit(){
        this.$Messclassification.error('已取消操作');
      },
      // ,
      // getname (name) {
      //   const date = new Date(parseInt(name));
      //   const year = date.getFullYear();
      //   const month = date.getMonth() + 1;
      //   const day = date.getDate();
      //   return `${year}-${month}-${day}`;
      // }
    },
    mounted(){
      this.handleListApproveHistory();
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
