<template>
	<view class="container">
		<view class="newdata" v-for="item in list" :key="item.id">
			<view class="newdata_contenr">
				<view class="">检测时间</view>
				<view class="">{{item.created_at}}</view>			
				<view class="" style="border: 1px solid rgba(0, 0, 0, .50);padding: 10rpx 20rpx;" @click="historicalData(item.id)">
					查看详情
				</view>
			</view>
			<resultCard title="裸眼视力" :left="item.naked_vision.left_eye" :right="item.naked_vision.right_eye"></resultCard>
			<resultCard title="聚光镜" :left="item.condenser_vision.left_eye" :right="item.condenser_vision.right_eye"></resultCard>
			<view class="">
				
			</view>
		</view>
		<u-toast ref="uToast"  />
	</view>
</template>

<script>
	import resultCard from "@/components/common/resultCard/resultCard.vue"
	import {list} from "@/api/result_list.js"
	export default {
		name:"result_llist",
		data(){
			return{
				list:[],
				created_at:"",
				naked_vision:"",
				condenser_vision:"",
				page:1,
			}
		},
		methods:{
			getlist(){
				list({page:this.page,page_size:10}).then(res=>{
					console.log(res);
					if(res.code == 200){
						this.list = res.data.data
					}else{
						this.$refs.uToast.show({
							title: res.message,
							type: 'error',
							position:"center"
						})
					}
				})
			},
			historicalData(val){
				uni.navigateTo({
					url:"/pages/result/result?record_id="+ val
				})
			}
		},
		onReady() {
			this.getlist()
		},
		components:{
			resultCard
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 20px;
	}
	.newdata{
		padding: 20rpx;
		margin-bottom: 20rpx;
		border: 1px solid #dadada;
		.newdata_contenr{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
		}
	}
</style>