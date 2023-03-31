<template>
	<view>
		<!-- 图片 -->
		<view></view>
		<view class="container">
			<view class="" v-if="!is_null">
				<!-- 学生卡片 -->
				<view class="studentCard">
					<view class="studentCard_contenr">
						<view class="studentCard_top_img"></view>
						<view class="">学生档案：{{user.serial_num}}</view>
					</view>
					<view class="studentCard_contenr">
						<view class="">姓名：{{user.name}}</view>
						<view class="">学校：{{user.school_or_unit}}</view>
					</view>
					<view class="studentCard_contenr">
						<view class="">性别：{{user.sex == 1 ? "男":"女" }}</view>
						<view class="">班级：{{user.class_info ? user.class_info.grade : ""}}年{{user.class_info ? user.class_info.classes : ""}}班</view>
					</view>
				</view>
				<!-- 最新数据 -->
				<view class="newdata">
					<view class="newdata_contenr">
						<view class="">最新数据</view>
						<view class="">{{created_at}}</view>
						<view class="" style="border: 1px solid rgba(0, 0, 0, .50);padding: 10rpx 20rpx;" @click="historicalData()">
							历史数据
						</view>
					</view>
					<resultCard title="裸眼视力" :left="naked_vision.left_eye" :right="naked_vision.right_eye"></resultCard>
					<resultCard title="聚光镜" :left="condenser_vision.left_eye" :right="condenser_vision.right_eye"></resultCard>
				</view>
				<toastCard v-if="fdbk" title="初检结果"></toastCard>
				<toastCard title="近视标准" :value="myopia_criterion" ></toastCard>
				<toastCard title="防控建议" :value="propose" :sbmValuelist="sbmValuelist"  :sbm-open="true" ></toastCard>
			</view>
			<view class="" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);" v-else>
				{{is_null_text}}
			</view>
			
		</view>
		<u-toast ref="uToast"  />
	</view>
</template>

<script>
	import toastCard from "@/components/common/toastCard/toastCard.vue"
	import resultCard from "@/components/common/resultCard/resultCard.vue"
	import { info, list } from "@/api/result.js"
	export default {
		data() {
			return {
				record_id:"",
				user:{}, //用户信息
				naked_vision:{} ,//裸眼视力
				condenser_vision:{},//聚光镜视力
				created_at:"",
				toast_info:{}, 
				fdbk:[],//初检结果
				myopia_criterion:[],//近视标准
				propose:[],//防控建议
				sbmValuelist:[],
				is_null:true,
				is_null_text:''
			};
		},
		methods:{
			getinfo(){
				let obj = this.record_id == "" ? {} : {record_id:this.record_id};
				console.log(obj);
				info(obj).then(res=>{
					if(res.code == 200){
						this.is_null = false;
						this.naked_vision = res.data["naked_vision"]
						this.condenser_vision = res.data["condenser_vision"]
						this.created_at = res.data["created_at"]
						// this.info.push()
						this.user = res.data.user
						this.toast_info = res.data.propose
						this.fdbk = res.data.fdbk
						
						res.data.myopia_criterion.forEach(item=>{
							this.myopia_criterion.push(item.content)
						})
						res.data.propose.forEach(item=>{
							this.propose.push(item.content);
							this.sbmValuelist.push(item.title)
						})
					}else{
						let that = this;
						this.$refs.uToast.show({
							title: res.message,
							type: 'error',
							position:"center",
							callback(){
								that.is_null_text = '暂无数据'
							}
						})
					}
					
				})
			},
			historicalData(){
				uni.navigateTo({
					url:"/pages/result_list/result_list"
				})
			}
		},
		components:{
			toastCard,
			resultCard			
		},
		
		onLoad(option) {
			if(JSON.stringify(option) !== "{}"){
				
				this.record_id = option.record_id
				console.log(this.record_id)
			}
		},
		onReady() {
			this.getinfo()
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 20px;
		.studentCard,.newdata{
			padding: 20rpx;
			margin-bottom: 20rpx;
			border: 1px solid #dadada;
			
			.studentCard_contenr,.newdata_contenr{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				.studentCard_top_img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
					// box-shadow: 0 4px 4px rgba(0,0,0,.25);
					border: 1px solid #dadada;
				}
			}
			.newdata_contenr_dashed{
				border-bottom: 5px dashed #dadada;
			}
			.newdata_contenr{
				padding: 20rpx 0;
				
				.newdata_contenr_one{
					width: 70px;
				}
			}
			
			
		}
		
	}
</style>
