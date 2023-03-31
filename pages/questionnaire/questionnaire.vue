<template>
	<view style="padding: 40rpx;">
		<view class="">
			姓名：{{name}}
		</view>
		<view ref="list" class="list" v-for="item in list" :key="item.index">
			<template v-if="item.index != 4">
				<view class="" style="width: 60%;">
					{{item.index}} 、{{item.text}}
				</view>
				<view class="" style="flex: 1; display: flex; justify-content: end;">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio :value="'1,'+item.index" style="transform:scale(0.7)" />是
						</label>
						<label class="radio">
							<radio :value="'0,'+item.index" style="transform:scale(0.7)" />否
						</label>
					</radio-group>
				</view>
			</template>
			<template v-else>
				<view class="" style="width: 60%; display: flex; flex-direction: column;">
					{{item.index}} 、{{item.text}}
					<view v-if="item.value == 1 " class="" style="display: flex;align-items: flex-end;">
						<u-input v-model="eyeglass_month" :custom-style="customStyle" @blur="mouth_year_degree()" :clearable="false" placeholder=""  />个月 
						/ <u-input v-model="eyeglass_year" :custom-style="customStyle" @blur="mouth_year_degree()" :clearable="false" placeholder="" />年 
						度数: <u-input v-model="degree" :custom-style="customStyle" @blur="mouth_year_degree()" :clearable="false" placeholder=""  />
					</view>
				</view>
				<view class="" style="flex: 1; display: flex; justify-content: end;">
					<radio-group @change="radioChange">
						<label class="radio">
							<radio :value="'1,'+item.index" style="transform:scale(0.7)" />是
						</label>
						<label class="radio">
							<radio :value="'0,'+item.index" style="transform:scale(0.7)" />否
						</label>
					</radio-group>
				</view>
			</template>
		</view>

		<view class="">
			其他：
			<u-input type="text" v-model="other" />
		</view>
		<view class="">
			备注:请详尽告知,因原有习惯或疾病会影响视力恢复进度或效果!
		</view>
		<u-button @click="submit()">完成</u-button>
		<u-toast ref="uToast" />
		<view v-if="res_show" class="modal" @touchmove.stop.prevent="()=>false">
			<view class="popup">
				<view class="popupStyle">
					资料已提交
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import list from '@/common/questionnaire/config/config.js'
	import {add} from "@/api/questionnaire_api.js"
	export default {
		data() {
			return {
				name:'',
				list: list,
				other: '', //其他
				eyeglass_month: '',
				eyeglass_year: '',
				degree: '',
				customStyle: {
					width:"20px",
					minHeight: "20px !important",
					borderBottom: "1px solid #000",
					textAlign:"center"
				},
				res_show:false,
				
				
			};
		},
		methods: {

			radioChange(e) {
				let value = e.detail.value.split(",")[0];
				let index = e.detail.value.split(",")[1];
				this.$set(this.list[index - 1], "value", value);
				this.$refs.list[index - 1].$el.style.borderBottom = "none";
			},
			mouth_year_degree(){
				console.log(this.eyeglass_month !== '' || this.eyeglass_year !== '')
				console.log(this.degree !== '')
				if((this.eyeglass_month !== '' || this.eyeglass_year !== '') && this.degree !== '')
				{	this.$refs.list[3].$el.style.borderBottom = "none"; }
			},
			submit() {
				this.res_show = true;
				let nulllist = [];
				//收集没选
				this.list.forEach((item, index) => {
					item.value === "" ? nulllist.push(index) : ""
				})
				//判断是否有没选的
				if (nulllist.length > 0) {
					this.$refs.uToast.show({
						title: '请完整填写信息',
						type: 'error',
					})
					//设置没选的下边框为红色
					nulllist.forEach(item => {
						this.$refs.list[item].$el.style.borderBottom = "1px solid red";
					})

					//获取最开始没选的下标的offsetTop
					let scrollTop = this.$refs.list[nulllist[0]].$el.offsetTop
					//滚动
					uni.pageScrollTo({
						scrollTop: scrollTop,
						duration: 200
					});
					return;
				}
				if(this.list[3].value == 1 )  {
					if(this.eyeglass_month == '' && this.eyeglass_year == '' || this.degree == '' ){
						this.$refs.list[3].$el.style.borderBottom = "1px solid red";
						//获取最开始没选的下标的offsetTop
						let scrollTop = this.$refs.list[3].$el.offsetTop
						//滚动
						uni.pageScrollTo({
							scrollTop: scrollTop,
							duration: 200
						});
						return;
					}				
					
				}
				
				// 提交
				add(this.getoption).then(res=>{
					if(res.code == 200){
						this.res_show = true;
					}
					
				})
				
				
				
			}
		},
		computed:{
			getoption(){
				let newobj = {};
				for(let item in this.list){
					let {field_Name,value} = this.list[item]
					newobj[field_Name] = value
				}
				newobj.eyeglass_month = this.eyeglass_month == "" ? 0 : this.eyeglass_month
				newobj.eyeglass_year = this.eyeglass_year == "" ? 0 : this.eyeglass_year
 				newobj.degree = this.degree == "" ? 0 : this.degree
				newobj.remark = this.other
				return newobj;
				
			}
		},
		onReady() {},
		onLoad(option) {
			this.name = option.name
			console.log(option)
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		box-sizing: content-box;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}
	.modal{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: rgba(0,0,0,.25);
	}
	
	.popup{
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
		z-index: 10000;
		border-radius: 20rpx;
		overflow: hidden;
		.popupStyle{
			width:calc(100vw - 100rpx);
			height:180rpx;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size:22px;
			font-weight: bold;
			transform: translateZ(1000px);
		}
	}
	
</style>
