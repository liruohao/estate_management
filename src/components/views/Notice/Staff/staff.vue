<template xmlns="page">
  <div class="ownersty">
    <Breadcrumb class="bread">
      <BreadcrumbItem>主页</BreadcrumbItem>
      <BreadcrumbItem>小区公告管理</BreadcrumbItem>
      <BreadcrumbItem>物业在职员工公告</BreadcrumbItem>
    </Breadcrumb>
    <iframe class="lay" name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=2" width="770" height="70" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
    <div class="lay" style="margin-bottom: 1%">
      <Button @click="addData" type="primary">新增</Button>
      <Button type="error" @click="handleSelectAll" >删除</Button>
    </div>
    <div  class="tabowner">
      <Table stripe  border ref="selection" :columns="columns4" :data="historyData" @on-selection-change="dataChange"></Table>
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
<!--      <Page  :total="dataCount" :page-size="pageSize" show-sizer class="paging" @on-change="changepage" @on-page-size-change="pagesize"></Page>-->
    </div>
    <Modal v-model="editorshow"  width="60%"
           position="relative"
           @on-ok="modalAdd" @on-cancel="modalExit"
           margin-top="5px" :title="modalTtile"
           @on-visible-change="modalChange"
           :footer-hide="this.falg ===3">
      <Form :model="formItem" :label-width="80">
        <FormItem label="标题" class="titfloat">
          <Input id="rubric" value="${this.formItem.input}"  v-model="formItem.input" placeholder="请输入标题" :disabled="this.falg ===3"></Input>
        </FormItem>
        <FormItem label="日期" class="titfloat">
          <DatePicker  type="date"  id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3" style="width: 200px "></DatePicker>
        </FormItem>
        <FormItem label="内容" class="titfloat">
          <Input id="substance" type="textarea" :autosize="{minRows: 2}" v-model="formItem.desc" :disabled="this.falg ===3" title="" ></Input>
        </FormItem>
        <!--<FormItem label="日期" class="titfloat">-->
        <!--<Input id="daychange" value="${this.formItem.tinyData}"  v-model="formItem.tinyData" placeholder="请输入日期" :disabled="this.falg ===3"/>-->
        <!--</FormItem>-->
        <!--<editor   :autosize="{minRows: 2}"  :disabled="this.falg ===2"></editor>-->
      </Form>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      falg: '', // 判断现在的操作为是什么 1 为新增 2为编辑 3为查看
      // 当前行
      item: '',
      // 模态框数据
      formItem: {
        input: '',
        tinyData: '',
        desc: '',
        noticeType: '0',
        id: ''
      },
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      page: 1,
      // 表格头部信息
      historyColumns: [
        {
          title: '人员',
          key: 'username'
        }
      ],
      historyData: [],
      // 模态框的标题
      modalTtile: '',
      showdata: [],
      editorshow: false,
      modalAddContent: [],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '日期',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '内容',
          key: 'content',
          align: 'center',
          ellipsis: true
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
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
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
                    this.edit(params.row)
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      data1: [
        {
          tit: '小区物业服务处主要管理人员公示',
          date: '2016-11-03',
          content: '尊敬的XX小区业主（住户）：您好！ XX小区物业服务处的主要管理人员于近期进行了调整，现对小区全体业主进行公示，自愿接受广大业主的监督，希望能够更好的促进XX小区的物业管理服务工作。 力争为广大业主创造一个干净整洁、舒适温馨的居住环境。XX物业服务处',
          id: '1'
        },
        {
          tit: '关于小区实行封闭式管理的公告',
          date: '2016-10-07',
          content: '日出东方业主：\n' +
              '\n' +
              '为了小区能更好的有个安静舒适的居住环境，让儿童可以尽情奔跑、老人可以悠闲散步的同时不被车辆所打扰，也为了能更好的控制外来人员进入小区，万家物业投入更大的人力物力采用人车分流全封闭式管理。\n' +
              '\n' +
              '一、采用封闭式管理的必要性\n' +
              '\n' +
              '实施封闭式管理可以有效地控制外来闲杂人员和车辆进出入，从根本上改善小区治安管理工作，最大程度的降低治安隐患，能切实有效地为广大业主营造一个平安和谐的居住生活环境。\n' +
              '\n' +
              '二、人员和车辆的具体措施和方案\n' +
              '\n' +
              '（一）小区人员管理\n' +
              '\n' +
              '1、所有人员中庭进出使用刷卡进出（包括老人儿童），取消开出门开关按钮，为了安全此卡不得外借；\n' +
              '\n' +
              '2、装修师傅持本人出入证统一往1#门岗、7#门岗进出，未办理出入证的尽快到原售楼部办公室办理；\n' +
              '\n' +
              '（二）严格进行车辆管理：\n' +
              '\n' +
              '1、持卡的业主刷卡后进入小区将车辆统一停放在地下室，无卡及外来车辆无法进入小区；\n' +
              '\n' +
              '2、车辆信息未来登记的业主尽快到原售楼部办公室登记，避免进出困难给您带来不变；\n' +
              '\n' +
              '3、来访车辆禁止进入小区，可临时停放在小区外广场停车场；\n' +
              '\n' +
              '三、摩托车、电动车停放管理\n' +
              '\n' +
              '1、自行车、摩托车、电动车必须按规定的位置停放5#楼、6#楼7#楼停放在8#楼、9#楼的架空层，1#楼、3#楼停放在2#楼、15#楼的架空层，其它楼幢停放在各自楼幢的架空层，，严禁在消防通道及楼宇内随意停放；\n' +
              '\n' +
              '2、电动车需充电时有统一停放区域并配有充电桩现已投入使用，请大家自觉不要把没在充电的电动车、摩托车、自行车停放在充电区域内。',
          id: '2'
        },
        {
          tit: '关于大风降温预警的通知',
          date: '2016-10-03',
          content: 'zz小区与杭州XX物业服务公司（现物业公司）的服务合同将于20**年6月**日到期，XX物业于20--年4月正式向业委会提交了续聘申请；考虑到zz小区实际面积和物业服务费用的实际情况，经业主委员会20**年5月25日会议研究，决定开展是否续聘的相关工作，现将该工作流程公告如下：第一步：物业公司续聘申请，物业费维持不变（住户不包括商铺）（4月30日 已完成）第二步：业委会会议，决定开展是否续聘的相关工作（5月25日 已完成）第三步：决定是否续聘的公告，征集业主意见（5月28日——6月14日）第四步：收集和统计业主是否续聘物业服务公司意见（5月28日——6月14日），讨论和决定是否开展第五步工作；第五步：有全体业主书面表决是否续聘，并由楼道组长和居民代表上门投票，即日晚上8点在三楼多功能统计表决结果，希望大家积极参加。（6月16日）第六步：公示结果当前开展第三步的工作，请业主们于20**年6月**日前，用书面形式将意见或建议告知业主委员会办公室，联系人：张ZZ/1XXXX5、徐ZZ/1XXXXX7请广大业主关注小区事务，，为共建美好家园献计献策！\n' +
              '\n' +
              '特此公告zz小区业主委员会',
          id: '3'
        },
        {
          tit: '关于小区停车位收费的通知的通知',
          date: '2016-10-03',
          content: '为了小区规范管理，我物业公司根据发改委关于车位费收取的相关政策和标准，本小区临时停车收费为1小时内免费，超出时间以2元/小时（小型车）和4元/小时（大型车）计费。\n' +
              '\n' +
              '　　如您在20**年*月*日前租赁地下车位，，可享受560元/月，租一年赠送一个月的优惠。逾期优惠政策将取消。\n' +
              '\n' +
              '　　敬请相互告知。',
          id: '4'

        },
        {
          tit: '关于禁止电动摩托乱停乱放的通知',
          date: '2016-10-03',
          content: '为保障小区业主及住户生命财产安全；也为了使小区整齐有序，给您一个安全、洁净、舒适的居住环境，请大家勿在小区单元门口、消防通道以及路边停放电瓶车。目前小区部分业主和住户仍将电瓶车停放在小区消防通道、单元门口以及路边，影响了业主的进出通行和整体环境，同时也存在安全隐患。消防通道是我们生活在小区里每个家庭的生命通道！任何人都不能以任何理由占用！也请全体业主共同指责监督，这是关系到每个家庭大事！请您将停放在单元门口、消防通道以及路边的电瓶车停放在各楼栋负一层电瓶车库。电瓶车库已安装充电设施设备。望广大业主/住户积极配合！',
          id: '5'
        },
        {
          tit: '关于征收小区物业费的通知',
          date: '2016-10-03',
          content: '感谢您入住天成名著小区，也感谢您一直以来对物业公司的支持与理解！我们将根据您的合理意见和建议不断完善服务工作，为您及家人提供更加优质的服务。为实现物业经营和管理的良性运作,以保障物业服务工作的有效性和连续性,请您尽快到物业服务中心缴纳2018年度的物业费。\n' +
              '\n' +
              '物业费是提高服务的基础和各项开支的来源，是小区绿化、保洁、秩序、公共设施维护正常运转的根本保障。如您不能按时缴纳物业费，将会对小区物业管理服务工作造成严重影响',
          id: '6'
        },
        {
          tit: '关于台风预警的通知',
          date: '2016-10-03',
          content: '今起到本周末，我市天气逐渐转受“XX”外围环流影响,天气以逐渐由雷阵雨到暴雨同时伴有大风、雷电交加的极端恶劣天气局面，汛险等级处于高度危险状态。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　根据《国家防汛总指挥部办公室关于发布防汛橙色警报(XXX期)的通知》，自今天晚上21时，市政府将讯险等级提升为二级(橙色)，同时发文并通过电视台向社会发布橙色预警信息，提示市民做好灾害的预防准备，根据上级部门统一部署的文件精神，现紧急通知如下：\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　一、接受各级部门的统一指挥、密切注意灾情动态，全面掌握情况，发生紧急情况应立即报告。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、未接到解除警报通知，全市范围严禁各项室外、露天的施工、建设等工作；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、无条件配合物业部门的各项应急措施，严密监视小区各种情况，严格制止一切违章违规的破坏现象，同时做好避免高空坠物危及他人的人身安全以及车辆管理等安全防范和灾害预防工作。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将阳台和露台上悬挂的花盆和其它悬挂物扎牢或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将放置在阳台、露台栏杆外或窗外花池上的花盆及其他物品捆扎牢固或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出或大风来临之时，将放置在阳台或露台上的伞收起或放置于安全处，以免从高空坠下，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出时关好门窗，以防大雨飘进室内，造成不必要的损失；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请正在装修的住户提醒装修工人下班时关好门窗，尤其是高层住户，防止大风将窗扇吹下地，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请安装空调的住户提醒安装工人装好空调外机后锁好空调外机百叶窗，防止大风将百叶窗吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请住在小区的住户在吹大风前一定关好门窗，防止大风将窗扇吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　特别提请您做好安全防范工作，外出时一定要关好水、电、气阀门，关闭并锁好门窗，遇突发事件及时向物业服务中心联系，我们将一如既往的竭尽全力保障您和您家人的人身和财产安全。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　您的安全就是您的幸福。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　XX物业服务中心\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　X年X月X日',
          id: '7'
        },
        {
          tit: '关于大风降温预警的通知',
          date: '2016-10-03',
          content: '今起到本周末，我市天气逐渐转受“XX”外围环流影响,天气以逐渐由雷阵雨到暴雨同时伴有大风、雷电交加的极端恶劣天气局面，汛险等级处于高度危险状态。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　根据《国家防汛总指挥部办公室关于发布防汛橙色警报(XXX期)的通知》，自今天晚上21时，市政府将讯险等级提升为二级(橙色)，同时发文并通过电视台向社会发布橙色预警信息，提示市民做好灾害的预防准备，根据上级部门统一部署的文件精神，现紧急通知如下：\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　一、接受各级部门的统一指挥、密切注意灾情动态，全面掌握情况，发生紧急情况应立即报告。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、未接到解除警报通知，全市范围严禁各项室外、露天的施工、建设等工作；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、无条件配合物业部门的各项应急措施，严密监视小区各种情况，严格制止一切违章违规的破坏现象，同时做好避免高空坠物危及他人的人身安全以及车辆管理等安全防范和灾害预防工作。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将阳台和露台上悬挂的花盆和其它悬挂物扎牢或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将放置在阳台、露台栏杆外或窗外花池上的花盆及其他物品捆扎牢固或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出或大风来临之时，将放置在阳台或露台上的伞收起或放置于安全处，以免从高空坠下，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出时关好门窗，以防大雨飘进室内，造成不必要的损失；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请正在装修的住户提醒装修工人下班时关好门窗，尤其是高层住户，防止大风将窗扇吹下地，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请安装空调的住户提醒安装工人装好空调外机后锁好空调外机百叶窗，防止大风将百叶窗吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请住在小区的住户在吹大风前一定关好门窗，防止大风将窗扇吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　特别提请您做好安全防范工作，外出时一定要关好水、电、气阀门，关闭并锁好门窗，遇突发事件及时向物业服务中心联系，我们将一如既往的竭尽全力保障您和您家人的人身和财产安全。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　您的安全就是您的幸福。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　XX物业服务中心\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　X年X月X日',
          id: '8'
        },
        {
          tit: '关于大风降温预警的通知',
          date: '2016-10-03',
          content: '今起到本周末，我市天气逐渐转受“XX”外围环流影响,天气以逐渐由雷阵雨到暴雨同时伴有大风、雷电交加的极端恶劣天气局面，汛险等级处于高度危险状态。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　根据《国家防汛总指挥部办公室关于发布防汛橙色警报(XXX期)的通知》，自今天晚上21时，市政府将讯险等级提升为二级(橙色)，同时发文并通过电视台向社会发布橙色预警信息，提示市民做好灾害的预防准备，根据上级部门统一部署的文件精神，现紧急通知如下：\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　一、接受各级部门的统一指挥、密切注意灾情动态，全面掌握情况，发生紧急情况应立即报告。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、未接到解除警报通知，全市范围严禁各项室外、露天的施工、建设等工作；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、无条件配合物业部门的各项应急措施，严密监视小区各种情况，严格制止一切违章违规的破坏现象，同时做好避免高空坠物危及他人的人身安全以及车辆管理等安全防范和灾害预防工作。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将阳台和露台上悬挂的花盆和其它悬挂物扎牢或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将放置在阳台、露台栏杆外或窗外花池上的花盆及其他物品捆扎牢固或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出或大风来临之时，将放置在阳台或露台上的伞收起或放置于安全处，以免从高空坠下，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出时关好门窗，以防大雨飘进室内，造成不必要的损失；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请正在装修的住户提醒装修工人下班时关好门窗，尤其是高层住户，防止大风将窗扇吹下地，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请安装空调的住户提醒安装工人装好空调外机后锁好空调外机百叶窗，防止大风将百叶窗吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请住在小区的住户在吹大风前一定关好门窗，防止大风将窗扇吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　特别提请您做好安全防范工作，外出时一定要关好水、电、气阀门，关闭并锁好门窗，遇突发事件及时向物业服务中心联系，我们将一如既往的竭尽全力保障您和您家人的人身和财产安全。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　您的安全就是您的幸福。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　XX物业服务中心\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　X年X月X日',
          id: '9'
        },
        {
          tit: '关于小区业主投诉处理结果的通知',
          date: '2016-10-03',
          content: '在收到信息的第一时间，即安排工作人员与业主取得联系，对事件的详细情况进行了解并对问题的处理意见进行协商后达成一致。为表示我们对此事件的重视，现将相关情况作如下书面回复：\n' +
              '\n' +
              '业主所投诉的地下室漏水问题，工作人员已到达地下室进行修缮。已和业主约好周末查看修缮到位情况。\n' +
              '\n' +
              '针对此次投诉的发生，我们深知在工作中中存在的不足，也会在后期继续完善公司的服务人员服务水平，以争取为业主提供更体贴、周到的客户服务，也欢迎广大业主朋友朋友监督！',
          id: '10'
        },
        {
          tit: '关于大风降温预警的通知',
          date: '2016-10-03',
          content: '今起到本周末，我市天气逐渐转受“XX”外围环流影响,天气以逐渐由雷阵雨到暴雨同时伴有大风、雷电交加的极端恶劣天气局面，汛险等级处于高度危险状态。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　根据《国家防汛总指挥部办公室关于发布防汛橙色警报(XXX期)的通知》，自今天晚上21时，市政府将讯险等级提升为二级(橙色)，同时发文并通过电视台向社会发布橙色预警信息，提示市民做好灾害的预防准备，根据上级部门统一部署的文件精神，现紧急通知如下：\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　一、接受各级部门的统一指挥、密切注意灾情动态，全面掌握情况，发生紧急情况应立即报告。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、未接到解除警报通知，全市范围严禁各项室外、露天的施工、建设等工作；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、无条件配合物业部门的各项应急措施，严密监视小区各种情况，严格制止一切违章违规的破坏现象，同时做好避免高空坠物危及他人的人身安全以及车辆管理等安全防范和灾害预防工作。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将阳台和露台上悬挂的花盆和其它悬挂物扎牢或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将放置在阳台、露台栏杆外或窗外花池上的花盆及其他物品捆扎牢固或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出或大风来临之时，将放置在阳台或露台上的伞收起或放置于安全处，以免从高空坠下，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出时关好门窗，以防大雨飘进室内，造成不必要的损失；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请正在装修的住户提醒装修工人下班时关好门窗，尤其是高层住户，防止大风将窗扇吹下地，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请安装空调的住户提醒安装工人装好空调外机后锁好空调外机百叶窗，防止大风将百叶窗吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请住在小区的住户在吹大风前一定关好门窗，防止大风将窗扇吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　特别提请您做好安全防范工作，外出时一定要关好水、电、气阀门，关闭并锁好门窗，遇突发事件及时向物业服务中心联系，我们将一如既往的竭尽全力保障您和您家人的人身和财产安全。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　您的安全就是您的幸福。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　XX物业服务中心\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　X年X月X日',
          id: '11'
        },
        {
          tit: '关于小区停车位收费的通知的通知',
          date: '2016-10-03',
          content: '为了小区规范管理，我物业公司根据发改委关于车位费收取的相关政策和标准，本小区临时停车收费为1小时内免费，超出时间以2元/小时（小型车）和4元/小时（大型车）计费。\n' +
              '\n' +
              '　　如您在20**年*月*日前租赁地下车位，，可享受560元/月，租一年赠送一个月的优惠。逾期优惠政策将取消。\n' +
              '\n' +
              '　　敬请相互告知。',
          id: '12'
        },
        {
          tit: '关于禁止电动摩托乱停乱放的通知',
          date: '2016-10-03',
          content: '为保障小区业主及住户生命财产安全；也为了使小区整齐有序，给您一个安全、洁净、舒适的居住环境，请大家勿在小区单元门口、消防通道以及路边停放电瓶车。目前小区部分业主和住户仍将电瓶车停放在小区消防通道、单元门口以及路边，影响了业主的进出通行和整体环境，同时也存在安全隐患。消防通道是我们生活在小区里每个家庭的生命通道！任何人都不能以任何理由占用！也请全体业主共同指责监督，这是关系到每个家庭大事！请您将停放在单元门口、消防通道以及路边的电瓶车停放在各楼栋负一层电瓶车库。电瓶车库已安装充电设施设备。望广大业主/住户积极配合！',
          id: '13'
        },
        {
          tit: '关于征收小区物业费的通知',
          date: '2016-10-03',
          content: '感谢您入住天成名著小区，也感谢您一直以来对物业公司的支持与理解！我们将根据您的合理意见和建议不断完善服务工作，为您及家人提供更加优质的服务。为实现物业经营和管理的良性运作,以保障物业服务工作的有效性和连续性,请您尽快到物业服务中心缴纳2018年度的物业费。\n' +
              '\n' +
              '物业费是提高服务的基础和各项开支的来源，是小区绿化、保洁、秩序、公共设施维护正常运转的根本保障。如您不能按时缴纳物业费，将会对小区物业管理服务工作造成严重影响',
          id: '14'
        },
        {
          tit: '关于台风预警的通知',
          date: '2016-10-03',
          content: '今起到本周末，我市天气逐渐转受“XX”外围环流影响,天气以逐渐由雷阵雨到暴雨同时伴有大风、雷电交加的极端恶劣天气局面，汛险等级处于高度危险状态。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　根据《国家防汛总指挥部办公室关于发布防汛橙色警报(XXX期)的通知》，自今天晚上21时，市政府将讯险等级提升为二级(橙色)，同时发文并通过电视台向社会发布橙色预警信息，提示市民做好灾害的预防准备，根据上级部门统一部署的文件精神，现紧急通知如下：\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　一、接受各级部门的统一指挥、密切注意灾情动态，全面掌握情况，发生紧急情况应立即报告。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、未接到解除警报通知，全市范围严禁各项室外、露天的施工、建设等工作；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　二、无条件配合物业部门的各项应急措施，严密监视小区各种情况，严格制止一切违章违规的破坏现象，同时做好避免高空坠物危及他人的人身安全以及车辆管理等安全防范和灾害预防工作。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将阳台和露台上悬挂的花盆和其它悬挂物扎牢或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您将放置在阳台、露台栏杆外或窗外花池上的花盆及其他物品捆扎牢固或移至安全的地方；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出或大风来临之时，将放置在阳台或露台上的伞收起或放置于安全处，以免从高空坠下，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请您外出时关好门窗，以防大雨飘进室内，造成不必要的损失；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请正在装修的住户提醒装修工人下班时关好门窗，尤其是高层住户，防止大风将窗扇吹下地，发生安全事故；\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请安装空调的住户提醒安装工人装好空调外机后锁好空调外机百叶窗，防止大风将百叶窗吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'请住在小区的住户在吹大风前一定关好门窗，防止大风将窗扇吹下地，发生安全事故。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　特别提请您做好安全防范工作，外出时一定要关好水、电、气阀门，关闭并锁好门窗，遇突发事件及时向物业服务中心联系，我们将一如既往的竭尽全力保障您和您家人的人身和财产安全。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　您的安全就是您的幸福。\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　XX物业服务中心\\n\' +\n' +
              '            \'\\n\' +\n' +
              '            \'　　X年X月X日',
          id: '15'
        }
      ]
    }
  },
  // components: {Editor},
  methods: {
    modalChange (flag) {
      if (!flag) {
        for (let i in this.formItem) {
          this.formItem[i] = ''
        }
      }
    },
    // 分页管理, 获取历史记录信息
    handleListApproveHistory () {
      this.$http.post('notice/getNotice', {
        pageNum: this.page,
        pageSize: this.pageSize
      }, res => {
        this.historyData = res.data.notices
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
    // 查看
    show (row) {
      this.editorshow = true
      this.modalTtile = '查看'
      this.falg = 3
      this.formItem.desc = row.content
      this.formItem.input = row.title
      this.formItem.tinyData = row.createTime
      this.formItem.id = row.id
    },
    // 模态框确认按钮
    modalAdd () {
      let array = {}
      array.title = this.formItem.input
      array.content = this.formItem.desc
      array.noticeType = this.formItem.noticeType
      array.id = this.formItem.id
      // 获取时间
      let str = this.formItem.tinyData
      moment.locale('zh-cn')
      let dateEdit = moment(str).format('YYYY-MM-DD')
      array.date = dateEdit
      if (array.date === 'Invalid date') {
        array.date = ''
      }
      console.log(array.title + '，' + array.date + '，' + array.content + '，' + (array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0))
      if ((array.date.length !== 0) & (array.title.length !== 0) & (array.content.length !== 0)) {
        this.$http.post('notice/addOrUpdateNotice', array, res => {
          if (res.code === 1000) {
            if (this.flag === 1) {
              this.$Message.success('新增用户成功')
            } else {
              this.$Message.success('修改成功')
            }
            this.handleListApproveHistory()
          } else {
            this.$Message.warning('请补全以上信息')
          }
        })
      } else {
        alert('请补全以上信息')
      }
      this.handleListApproveHistory()
    },
    modalExit () {
      this.$Message.error('已取消操作')
    },
    edit (row) {
      this.editorshow = true
      this.modalTtile = '编辑'
      this.falg = 2
      this.formItem.input = row.title
      this.formItem.desc = row.content
      this.formItem.tinyData = row.createTime
      this.item = row._index
      this.formItem.id = row.id
    },
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
            this.$http.get('notice/deleteNotice', {
              id: userIdsStr
            }, res => {
              this.handleListApproveHistory()
              this.$Message.success('删除成功')
            })
          }})
      } else {
        this.$Message.error('请选择一条数据进行删除')
      }
    }
  },
  mounted () {
    this.handleListApproveHistory()
  }
}
</script>

<style scoped>
  .tabowner{
    width: 90%;
    margin: 0 auto;
  }
  .ownersty{
    background-color: #ecffea;
  }
  .lay{
    margin-left:5%;
  }
  .titfloat{
    margin-left: -5%;
  }
  /*.model-sty{*/
  /*width:60%;*/
  /*position: relative;*/
  /*margin-top: 5%;*/
  /*}*/
  .bread{
    border: 1px solid #C9C9CA;
    border-radius: 10px;
    padding: 8px;
    padding-left: 3%;
    /*background-color: aliceblue;*/
    background-color: #F8F8F9;
    margin: 10px;
  }
</style>
