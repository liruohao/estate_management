<!--suppress ALL -->
<template>
    <div class="bgcolor">
      <div>
        <Breadcrumb class="bread">
          <BreadcrumbItem>主页</BreadcrumbItem>
          <BreadcrumbItem>成本综合管理</BreadcrumbItem>
          <BreadcrumbItem>人力资源管理</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="operation">
        <div>
          <table width="100%">
            <tr>
              <td>
                <span class="fontFloat">姓名:</span>
                <Input v-model="select.name" style="width: 80%" />
              </td>
              <td class="tabfloat">
                <span class="fontFloat">性别:</span>
                <Select v-model="select.sex" style="width:75%;float: left">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </td>
              <td  class="tabfloat">
                <span class="fontFloat">年龄:</span>
                  <Input v-model="select.age" style="width: 80%" />
              </td>
            </tr>
            <tr>
              <td>
                <span class="fontFloat">生日:</span>
                  <DatePicker type="date" v-model="select.birthday"  style="width: 80%"></DatePicker>
              </td>
              <td class="tabfloat">
                <span class="fontAddress">地址:</span>
                  <Input v-model="select.address  " style="width: 80%" />
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
        <Table :columns="columns4" :data="historyData" @on-selection-change="dataChange">
          <template slot-scope="{ row, index }" slot="name">
            <Input type="text" v-model="editName" v-if="editIndex === index" title=""></Input>
            <span v-else>{{ row.name }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="sex">
            <Input type="text" v-model="editSex" v-if="editIndex === index" />
            <span v-else>{{ row.sex }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="age">
            <Input type="text" v-model="editAge" v-if="editIndex === index" />
            <span v-else>{{ row.age }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="birthday">
            <Input type="text" v-model="editBirthday" v-if="editIndex === index" />
            <span v-else>{{ row.birthday }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="address">
            <Input type="text" v-model="editAddress" v-if="editIndex === index" />
            <span v-else>{{ row.address }}</span>
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
        <Page  :total="dataCount" :page-size="pageSize" show-sizer class="paging" @on-change="changepage" @on-page-size-change="pagesize"></Page>
      </div>
      <Modal v-model="editorshow"  width="60%"
             position="relative"
             @on-ok="modalAdd" @on-cancel="modalExit"
             margin-top="5px" :title="modalTtile"
             :footer-hide="this.falg ===3">
        <Form :model="formItem" :label-width="80">
          <FormItem label="姓名" class="titfloat">
            <Input id="rubric" value="${this.formItem.name}"  v-model="formItem.name" placeholder="请输入姓名" :disabled="this.falg ===3"></Input>
          </FormItem>
          <FormItem label="性别" class="titfloat">
            <Input id="rubric" value="${this.formItem.sex}"  v-model="formItem.sex" placeholder="请输入性别" :disabled="this.falg ===3"></Input>
          </FormItem>
          <FormItem label="年龄" class="titfloat">
            <Input id="rubric" value="${this.formItem.age}"  v-model="formItem.age" placeholder="请输入年龄" :disabled="this.falg ===3"></Input>
          </FormItem>
          <FormItem label="生日" class="titfloat">
            <Input id="rubric" value="${this.formItem.birthday}"  v-model="formItem.birthday" placeholder="请输入生日" :disabled="this.falg ===3"></Input>
          </FormItem>
          <FormItem label="地址" class="titfloat">
            <Input id="rubric" value="${this.formItem.address}"  v-model="formItem.address" placeholder="请输入地址" :disabled="this.falg ===3"></Input>
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
    name: 'customer',
    data () {
      return {
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            slot: 'name'
          },
          {
            title: '性别',
            slot: 'sex'
          },
          {
            title: '年龄',
            slot: 'age'
          },
          {
            title: '生日',
            slot: 'birthday'
          },
          {
            title: '地址',
            slot: 'address'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        //分页传参条数
        ajaxHistoryData:[],
        // 初始化信息总条数
        dataCount:0,
        // 每页显示多少条
        pageSize:10,
        // 当前页码
        page:1,
        historyData: [],
        modalTtile:'',
        falg: '',
        editorshow: false,
        // 模态框数据
        formItem: {
          name: '',
          sex:'',
          age: '',
          birthday:'',
          address:''
        },

        cityList: [
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          },
        ],
        model1: '',
        nameList: [],
        select: {
          sex: '',
          name:'',
          age:'',
          birthday:'',
          address:'',
        },

        //修改传参
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 修改姓名属性，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editSex: '',//修改性别属性
        editAge: '',  // 修改年龄属性
        editBirthday: '',  // 修改生日属性
        editAddress: '',// 修改地址属性
      }
    },
    components:{tooLbar},
    methods:{
      // 查询
      selectData () {
        let array=[];
          array.name=this.select.name;
        array.sex=this.select.sex;
        array.age=this.select.age;
        array.address=this.select.address;
        this.historyData=this.historyData.filter(function (item){
           return ((item.name==array.name&&item.sex==array.sex&&item.age==array.age&&item.address==array.address)||(item.name==array.name&&item.sex==array.sex&&item.age==array.age)||(item.name==array.name&&item.sex==array.sex&&item.address==array.address)||(item.name==array.name&&item.age==array.age&&item.address==array.address)||(item.sex==array.sex&&item.age==array.age&&item.address==array.address)||(item.name==array.name&&item.sex==array.sex)||(item.name==array.name&&item.age==array.age)||(item.name==array.name&&item.address==array.address)||(item.sex==array.sex&&item.age==array.age)||(item.sex==array.sex&&item.address==array.address)||(item.age==array.age&&item.address==array.address)||(item.name==array.name||item.sex==array.sex||item.age==array.age||item.address==array.address))
        })
      },

      //修改信息
      handleEdit (row, index) {
        this.editName = row.name;
        this.editSex = row.sex;
        this.editAge = row.age;
        this.editAddress = row.address;
        this.editBirthday = row.birthday;
        this.editIndex = index;
      },
      handleSave (index) {
        this.historyData[index].name = this.editName;
        this.historyData[index].sex = this.editSex;
        this.historyData[index].age = this.editAge;
        this.historyData[index].birthday = this.editBirthday;
        this.historyData[index].address = this.editAddress;
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
        this.$http.get('/api/people').then((response)=>{
          response=response.body;
          // // 保存取到的所有数据
          this.ajaxHistoryData = response.data.RECORDS;
          this.dataCount = response.data.RECORDS.length;
          // console.log(this.nameList)
          // console.log(response.data.RECORDS[1].name);
          // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
          if(response.data.RECORDS.length < this.pageSize){
            this.historyData = this.ajaxHistoryData;
          }else{
            this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
          }
        });

      },
      // 当前页码
      changepage(index){
        this.page = index;
        let _start = ( index - 1 ) * this.pageSize;
        let _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
      },
      //返回切换后的每页条数
      pagesize(index){
        let _start = ( this.page - 1 )   * index;
        let _end =  this.page   * index;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
        // 当前展示条数
        this.pageSize = index;
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
          array.name = this.formItem.name;
          array.sex = this.formItem.sex;
          array.age = this.formItem.age;
          array.address = this.formItem.address;
          //获取时间
          let str=this.formItem.birthday
          moment.locale("zh-cn");
          let dateEdit=moment(str).format('YYYY-MM-DD');
          array.birthday = dateEdit;
          if(array.birthday==='Invalid date'){
            array.birthday='';
          }
          if((array.name.length!==0)&(array.sex.length!==0)&(array.age.length!==0)&(array.birthday.length!==0)&(array.address.length!==0)){
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
      // ,
      // getBirthday (birthday) {
      //   const date = new Date(parseInt(birthday));
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
  .fontAddress{
    /*padding-left: 4px;*/
    font-size: 130%;
    color:#000000;
  }
  .findTab{
    width: 10%;
    margin: 0 0.3%;
  }
</style>
