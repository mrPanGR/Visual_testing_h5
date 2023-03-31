<template>
	<view class="toastCard">
		<view class="title">
			{{title}}
		</view>
		<view class="value" v-for="(item,index) in value" :key="index">			
			<subheadingCard v-if="sbmOpen" color="#5D36E4" :value="sbmValuelist[index]" :orderNum="(index + 1)"></subheadingCard>
			<view class="content">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	import subheadingCard from "@/components/common/subheadingCard/subheadingCard.vue"
	export default {
		props:{
			title:{
				type:String,
				default(){
					return "大标题"
				}
			},
			value:{
				type:Array,
				default(){
					return ["内容1","内容2","内容3"]
				},
			},
			sbmValuelist:{
				type:Array,
				default(){
					return ["小标题1","小标题2","小标题3"]
				},
			},
			sbmOpen:{
				type:Boolean,
				default:false,
			}
		},
		components:{
			subheadingCard
		}
	}
</script>

<style lang="less" scoped>
	.toastCard{
		display: flex;
		flex-direction: column;
		.title{
			border-left: 2px solid #715295;
			border-radius: 2px;
			margin:20rpx 0;
			padding-left: 20rpx;
			font-size: 18px;
			font-weight: bold;
		}
		.content{
			margin: 20rpx 0;
		}
	}
	
</style>