<template>
  <!--<div>-->
    <!--111-->
  <!--</div>-->
	<div class="glyphicon">
		<div class="initialism">
			<Row>
		        <siderbar style="padding: 0.1%"></siderbar>
		    </Row>
		    <Row>
            <navbar style="margin-top: -0.5%"></navbar>
		    </Row>
		</div>
	</div>
</template>

<script>
import navbar from '../components/views/layout/navbar.vue'
import siderbar from '../components/views/layout/sidebar'
import appmin from '../components/views/layout/appmin'

export default{
  name: 'index',
  components: {
    navbar,
    siderbar
  }
}
</script>

<style>
  /*.initialism {*/
    /*width: 1336px;*/
    /*margin: 0 auto 0;*/
  /*}*/
  .glyphicon {
    height: 60px;
    /*overflow: hidden;*/
    width: 100%;
    /*background-color: #46B8DA;*/
  }
</style>
