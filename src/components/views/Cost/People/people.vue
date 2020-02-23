<!--suppress ALL -->
<template>
  <div class="bgcolor">
    <div>
      <Breadcrumb class="bread">
        <BreadcrumbItem>主页</BreadcrumbItem>
        <BreadcrumbItem>品质管理</BreadcrumbItem>
        <BreadcrumbItem>客户关系管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="operation">
      <Form :model="select" :label-width="100" inline>
        <FormItem label="姓名：">
          <Input v-model="select.name" clearable/>
        </FormItem>
        <FormItem label="性别：">
          <Select v-model="select.sex" style="width: 200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="年龄：">
          <Input v-model="select.age" clearable/>
        </FormItem>
        <FormItem label="电话：">
          <Input v-model="select.phone" clearable/>
        </FormItem>
        <FormItem label="地址：">
          <Input v-model="select.address" clearable/>
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
      <Table :columns="columns4" :data="historyData" @on-selection-change="dataChange">
        <template slot-scope="{ row, index }" slot="name">
          <Input type="text" v-model="editName" v-if="editIndex === index" title=""></Input>
          <span v-else>{{ row.name }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="sex">
          <Select v-model="editSex" v-if="editIndex === index" transfer>
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span v-else>{{ row.sex }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="age">
          <Input type="text" v-model="editAge" v-if="editIndex === index" />
          <span v-else>{{ row.age }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="phone">
          <Input type="text" v-model="editphone" v-if="editIndex === index" />
          <span v-else>{{ row.phone }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="address">
          <Input type="text" v-model="editAddress" v-if="editIndex === index" />
          <span v-else>{{ row.address }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index,row)">保存</Button>
            <Button @click="cancel">取消</Button>
            <Button type="primary" @click="resetPassword(row)">重置密码</Button>
          </div>
          <div v-else>
            <Button type="success" @click="handleEdit(row, index)">修改</Button>
            <Button type="primary" @click="resetPassword(row)">重置密码</Button>
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
      <!--<Page  :total="dataCount" :page-size="pageSize" show-sizer class="paging" @on-change="changepage" @on-page-size-change="pagesize"></Page>-->
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="姓名" class="titfloat">
          <Input id="rubric" value="${this.formItem.name}"  v-model="formItem.name" placeholder="请输入姓名" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="性别" class="titfloat">
          <Select v-model="formItem.sex">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="用户名" class="titfloat">
          <Input  style="width: 100%;" id="rubric" value="${this.formItem.account}"  v-model="formItem.account" placeholder="请输入用户名" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="密码" class="titfloat">
          <Input  style="width: 100%;" id="rubric" value="${this.formItem.password}" type="password" v-model="formItem.password" placeholder="请输入密码" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="年龄" class="titfloat">
          <InputNumber  style="width: 100%;" id="rubric" value="${this.formItem.age}"  v-model="formItem.age" placeholder="请输入年龄" :disabled="this.falg ===3"></InputNumber>
        </FormItem>
        <FormItem label="电话" class="titfloat">
          <Input id="rubric" value="${this.formItem.phone}"  v-model="formItem.phone" placeholder="请输入电话" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="地址" class="titfloat">
          <Input id="rubric" value="${this.formItem.address}"  v-model="formItem.address" placeholder="请输入地址" :disabled="this.falg ===3"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!--返回顶端-->
    <BackTop :height="100" :bottom="40">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
import axios from 'axios'
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
          title: '电话',
          slot: 'phone'
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
      // 分页传参条数
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      page: 1,
      historyData: [],
      modalTtile: '',
      falg: '',
      editorshow: false,
      // 模态框数据
      formItem: {
        name: '',
        sex: '',
        age: '',
        phone: '',
        address: '',
        id: '',
        password: '',
        account: ''
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
      nameList: [],
      select: {
        sex: '',
        name: '',
        age: '',
        phone: '',
        address: ''
      },

      // 修改传参
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '', // 修改姓名属性，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editSex: '', // 修改性别属性
      editAge: '', // 修改年龄属性
      editphone: '', // 修改生日属性
      editAddress: '', // 修改地址属性
      showdata: []
    }
  },
  methods: {
    // 重置密码
    resetPassword (row) {
      let obj = JSON.parse(JSON.stringify(row))
      obj.password = '123456a'
      obj.roleId = '6fc1e83718c14aa4b2cccb27b41e4558'
      this.$http.post('user/addOrUpdateUser', obj, res => {
        if (res.code === 1000) {
          this.$Message.success('密码重置为123456a!')
        } else {
          this.$Message.warning(res.msg)
        }
      })
    },
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
      array.name = this.select.name
      array.sex = this.select.sex
      array.age = Number(this.select.age)
      array.address = this.select.address
      array.phone = this.select.phone
      this.historyData = this.historyData.filter(function (item) {
        // return (item.name==array.name&&item.sex==array.sex)
        return ((item.name == array.name && item.sex == array.sex) || (item.name == array.name && item.sex == array.sex && item.age == array.age && item.address == array.address && item.phone == array.phone) || (item.name == array.name && item.sex == array.sex && item.age == array.age && item.address == array.address) || (item.name == array.name && item.sex == array.sex && item.age == array.age && item.phone == array.phone) || (item.name == array.name && item.sex == array.sex && item.address == array.address && item.phone == array.phone) || (item.name == array.name && item.age == array.age && item.address == array.address && item.phone == array.phone) || (item.sex == array.sex && item.age == array.age && item.address == array.address && item.phone == array.phone) || (item.name == array.name && item.sex == array.sex && item.phone == array.phone) || (item.name == array.name && item.age == array.age && item.phone == array.phone) || (item.name == array.name && item.address == array.address && item.phone == array.phone) || (item.sex == array.sex && item.age == array.age && item.phone == array.phone) || (item.sex == array.sex && item.address == array.address && item.phone == array.phone) || (item.age == array.age && item.address == array.address && item.phone == array.phone) || (item.sex == array.sex && item.age == array.age && item.address == array.addres) || (item.name == array.name && item.sex == array.sex && item.address == array.address && item.phone == array.phone) || (item.name == array.name && item.age == array.age) || (item.name == array.name && item.address == array.address) || (item.name == array.name && item.phone == array.phone) || (item.sex == array.sex && item.age == array.age) || (item.sex == array.sex && item.address == array.address) || (item.sex == array.sex && item.phone == array.phone) || (item.age == array.age && item.address == array.address) || (item.age == array.age && item.phone == array.phone) || (item.address == array.address && item.phone == array.phone) || (item.name == array.name || item.sex == array.sex || item.age == array.age || item.address == array.address || item.phone == array.phone))
      })
    },

    // 修改信息
    handleEdit (row, index) {
      this.editName = row.name
      this.editSex = row.sex
      this.editAge = row.age
      this.editAddress = row.address
      this.editphone = row.phone
      this.editIndex = index
    },
    handleSave (index, row) {
      this.formItem.name = this.editName
      this.formItem.sex = this.editSex
      this.formItem.age = this.editAge
      this.formItem.phone = this.editphone
      this.formItem.address = this.editAddress
      this.formItem.account = row.account
      this.formItem.password = row.password
      this.formItem.id = row.id
      this.editIndex = -1
      this.falg = 2
      this.modalAdd()
    },
    cancel () {
      this.editIndex = -1,
      this.$Message.error('取消修改')
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('user/getAllUserInfoPage', {
        pageNum: this.page,
        pageSize: this.pageSize,
        roleId: '6fc1e83718c14aa4b2cccb27b41e4558',
        name: this.select.name,
        sex: this.select.sex,
        age: this.select.age === '' ? null : Number(this.select.age),
        phone: this.select.phone,
        address: this.select.address
      }, res => {
        this.historyData = res.data.userList
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
            this.$http.get('user/deleteUser', {
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
      if (this.falg === 1 || this.falg === 2) {
        let array = {}
        array.name = this.formItem.name
        array.sex = this.formItem.sex
        array.age = this.formItem.age
        array.phone = this.formItem.phone
        array.address = this.formItem.address
        array.account = this.formItem.account
        array.password = this.formItem.password
        array.id = this.formItem.id
        array.roleId = '6fc1e83718c14aa4b2cccb27b41e4558'
        if ((array.account.length !== 0) & (array.password.length !== 0) & (array.name.length !== 0) & (array.sex.length !== 0) & (array.age.length !== 0) & (array.phone.length !== 0) & (array.address.length !== 0)) {
          this.$http.post('user/addOrUpdateUser', array, res => {
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
      }
    },
    modalExit () {
      this.$Message.error('已取消操作')
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
  .top{
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .titfloat{
    margin-left: -5%;
  }
</style>
