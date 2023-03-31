<template>
	<view class="newdata_contenr " :class="is_dashed?'newdata_contenr_dashed':''">
		<view class="newdata_contenr_one">{{title}}</view>
		<view class="item">
			<view class="">
				左眼
			</view>
			<view class="">
				{{left}}
			</view>
		</view>
		<view class="item">
			<view class="">
				右眼
			</view>
			<view class="">
				{{right}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"resultCard",
		data(){
			return{
				
			}
		},
		props:{
			title:{
				type:String,
				default:"",
			},
			left:{
				type:String,
				default:""
			},
			right:{
				type:String,
				default:""
			},
			is_dashed:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newdata_contenr{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
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
	.item{
		text-align: center;
	}
</style>