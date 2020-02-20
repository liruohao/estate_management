<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>收入管理</BreadcrumbItem>
        <BreadcrumbItem>租赁管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <div>
        <table width="100%">
          <tr>
            <td>
              <span class="fontFloat">收费日期:</span>
              <Input v-model="select.payNum" style="width: 70%" />
            </td>
            <td class="tabfloat">
              <span class="fontFloat">收费单号	:</span>
              <Input v-model="select.housePosition" style="width: 75%" />
            </td>
            <td  class="tabfloat">
              <span class="fontFloat">房产位置:</span>
              <Input v-model="select.householder" style="width: 80%" />
            </td>
          </tr>
          <tr>
            <td>
              <span class="fontFloat">租户:</span>
              <Input v-model="select.hygiene"  style="width: 75%"></Input>
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
      <Table border :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="paytime">
          <Input  type="text" v-model="editpaytime" v-if="editIndex === index" title=""></Input>
          <span class="transfer" v-else>{{ row.paytime }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="payNum">
          <Input type="text" v-model="editpayNum" v-if="editIndex === index" />
          <span v-else>{{ row.payNum }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="housePosition">
          <Input type="text" v-model="edithousePosition" v-if="editIndex === index" />
          <span v-else>{{ row.housePosition }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="householder">
          <Input type="text" v-model="edithouseholder" v-if="editIndex === index" />
          <span v-else>{{ row.householder }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="rent">
          <Input type="text" v-model="editrent" v-if="editIndex === index" />
          <span v-else>{{ row.rent }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="rent">
          <Input type="text" v-model="editrent" v-if="editIndex === index" />
          <span v-else>{{ row.rent }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="hygiene">
          <Input type="text" v-model="edithygiene" v-if="editIndex === index" />
          <span v-else>{{ row.hygiene }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="power">
          <Input type="text" v-model="editpower" v-if="editIndex === index" />
          <span v-else>{{ row.power }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="Heating">
          <Input type="text" v-model="editHeating" v-if="editIndex === index" />
          <span v-else>{{ row.Heating }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="gas">
          <Input type="text" v-model="editgas" v-if="editIndex === index" />
          <span v-else>{{ row.gas }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="water">
          <Input type="text" v-model="editwater" v-if="editIndex === index" />
          <span v-else>{{ row.water }}</span>
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
           housePosition="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           :footer-hide="this.falg ===3">
      <Form ref="formInline"  :model="formItem" :label-width="80" inline>
        <FormItem label="收费日期" class="titfloat">
          <Input id="rubric" value="${this.formItem.paytime}"  v-model="formItem.paytime" placeholder="请输入收费日期" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="收费单号" class="titfloat">
          <Input id="rubric" value="${this.formItem.payNum}"  v-model="formItem.payNum" placeholder="请输入收费单号	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="房产位置	" class="titfloat">
          <Input id="rubric" value="${this.formItem.housePosition}"  v-model="formItem.housePosition" placeholder="请输入房产位置	" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="户主" class="titfloat">
          <Input id="rubric" value="${this.formItem.householder}"  v-model="formItem.householder" placeholder="请输入户主" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="房租" class="titfloat">
          <Input id="rubric" value="${this.formItem.rent}"  v-model="formItem.rent" placeholder="请输入房租" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="卫生费（¥）" class="titfloat">
          <Input id="rubric" value="${this.formItem.hygiene}"  v-model="formItem.hygiene" placeholder="请输入卫生费（¥）" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="电费（¥）" class="titfloat">
          <Input id="rubric" value="${this.formItem.power}"  v-model="formItem.power" placeholder="请输入电费（¥）" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="暖气费（¥）" class="titfloat">
          <Input id="rubric" value="${this.formItem.Heating}"  v-model="formItem.Heating" placeholder="请输入暖气费（¥）" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="燃气费（¥）" class="titfloat">
          <Input id="rubric" value="${this.formItem.gas}"  v-model="formItem.gas" placeholder="请输入燃气费（¥）" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="水费（¥）" class="titfloat">
          <Input id="rubric" value="${this.formItem.water}"  v-model="formItem.water" placeholder="请输入水费（¥）" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="缴费状态" class="titfloat">
          <Input id="rubric" value="${this.formItem.pay}"  v-model="formItem.pay" placeholder="请输入缴费状态" :disabled="this.falg ===3"></Input>
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
    paytime: 'customer',
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
            title: '收费日期',
            slot: 'paytime',
            align:'center',
            width: 150,
            fixed:'left'
          },
          {
            title: '收费单号',
            slot: 'payNum',
            align:'center',
            width: 150,
          },
          {
            title: '房产位置',
            slot: 'housePosition',
            align:'center',
            width: 150,
          },
          {
            title: '户主',
            slot: 'householder',
            align:'center',
            width: 150,
          },
          {
            title: '房租',
            slot: 'rent',
            align:'center',
            width: 150,
          },
          {
            title: '卫生费（¥）',
            slot: 'hygiene',
            align:'center',
            width: 150,
          },
          {
            title: '电费（¥）',
            slot: 'power',
            align:'center',
            width: 150,
          },
          {
            title: '暖气费（¥）',
            slot: 'Heating',
            align:'center',
            width: 150,
          },
          {
            title: '燃气费（¥）',
            slot: 'gas',
            align:'center',
            width: 150,
          },
          {
            title: '水费（¥）',
            slot: 'water',
            align:'center',
            width: 150,
          },
          {
            title: '缴费状态',
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
          paytime: '',
          payNum:'',
          housePosition: '',
          householder:'',
          rent:'',
          hygiene:'',
          power:'',
          Heating:'',
          gas:'',
          water:'',
          pay:''
        },
        model1: '',
        paytimeList: [],
        select: {
          paytime: '',
          payNum:'',
          housePosition: '',
          householder:'',
          rent:'',
          hygiene:'',
          power:'',
          Heating:'',
          gas:'',
          water:'',
          pay:''
        },

        //修改传参
        editIndex: -1,
        editpaytime: '',
        editpayNum: '',
        edithousePosition: '',
        edithouseholder: '',
        editrent: '',
        edithygiene: '',
        editpower: '',
        editHeating: '',
        editgas: '',
        editwater: '',
        editpay: ''
      }
    },
    components:{tooLbar},
    methods:{
      // 查询
      selectData () {
        let array=[];
        array.paytime=this.select.paytime;
        array.payNum=this.select.payNum;
        array.housePosition=this.select.housePosition;
        array.householder=this.select.householder;
        array.rent=this.select.rent;
        array.hygiene=this.select.hygiene;
        array.power=this.select.power;
        array.Heating=this.select.Heating;
        array.gas=this.select.gas;
        array.water=this.select.water;
        array.pay=this.select.pay;

        this.historyData=this.historyData.filter(function (item){
          return ((item.paytime==array.paytime&&item.payNum==array.payNum&&item.housePosition==array.housePosition&&item.householder==array.householder&&item.hygiene==array.hygiene&&item.power==array.power&&item.Heating==array.Heating&&item.gas==array.gas&&item.water==array.water&&item.pay==array.pay)||(item.paytime==array.paytime||item.payNum==array.payNum||item.housePosition==array.housePosition||item.householder==array.householder||item.hygiene==array.hygiene||item.power==array.power||item.Heating==array.Heating||item.gas==array.gas||item.water==array.water||item.pay==array.pay))
        })
      },

      //修改信息
      handleEdit (row, index) {
        this.editpaytime = row.paytime;
        this.editpayNum = row.payNum;
        this.edithousePosition = row.housePosition;
        this.edithouseholder = row.householder;
        this.editrent = row.rent;
        this.edithygiene = row.hygiene;
        this.editpower = row.power;
        this.editHeating = row.Heating;
        this.editgas = row.gas;
        this.editwater = row.water;
        this.editpay = row.pay;
        this.editIndex = index;
      },
      handleSave (index) {
        this.historyData[index].paytime = this.editpaytime;
        this.historyData[index].payNum = this.editpayNum;
        this.historyData[index].housePosition = this.edithousePosition;
        this.historyData[index].householder = this.edithouseholder;
        this.historyData[index].rent = this.editrent;
        this.historyData[index].hygiene = this.edithygiene;
        this.historyData[index].power = this.editpower;
        this.historyData[index].Heating = this.editHeating;
        this.historyData[index].gas = this.editgas;
        this.historyData[index].water = this.editwater;
        this.historyData[index].pay = this.editpay;
        this.editIndex = -1;
        this.$Message.info('修改成功');
      },
      cancel(){
        this.editIndex = -1,
          this.$Message.error('取消修改');
      },
      //分页管理, 获取历史记录信息
      handleListApproveHistory(){
        //通过JSON引入数据
        this.$http.get('/api/lease').then((response)=>{
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
          array.paytime = this.formItem.paytime;
          array.payNum = this.formItem.payNum;
          array.housePosition = this.formItem.housePosition;
          array.householder = this.formItem.householder;
          array.rent = this.formItem.rent;
          array.hygiene = this.formItem.hygiene;
          array.power = this.formItem.power;
          array.Heating = this.formItem.Heating;
          array.gas = this.formItem.gas;
          array.water = this.formItem.water;
          array.pay = this.formItem.pay;

          if((array.paytime.length!==0)&(array.payNum.length!==0)&(array.housePosition.length!==0)&(array.householder.length!==0)&(array.hygiene.length!==0)&(array.power.length!==0)&(array.Heating.length!==0)&(array.gas.length!==0)&(array.water.length!==0)&(array.pay.length!==0)){
            this.historyData.push(array);
            this.$Message.success('新增成功');
          }else {
            alert('请补全以上信息')
          }
        }
      },
      modalExit(){
        this.$Message.error('已取消操作');
      },
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
