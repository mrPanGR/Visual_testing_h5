<template>
	<view class="subheadingCard" :class="'size-'+ size" :style="{'--color': color}">
		<view class="round" :class="'round-'+ size" :style="[customStyle]">
			{{orderNum}}
		</view>
		<view class="value" :class="'value-'+ size" :style="[customStyle]">
			{{value}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			orderNum:{
				type:Number,
				default:0
			},
			value:{
				type:String,
				default:""
			},
			size:{
				type:String,
				default:"default"
			},
			color:{
				type:String,
				default:""
			}
		},
		computed:{
			customStyle(){
				let style = {}
				if(this.color){
					style.backgroundColor = this.color;
					// document.getElementsByTagName("body")[0].style.setProperty("--test", "yellow");
				}
				return style
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color:var(--color);
	.subheadingCard {
		position: relative;
		color:#fff;
	}
	.round{
		position: absolute;
		top: -3rpx;		
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 2px solid #fff;
		border-radius: 100%;
	}
	.round-default{		
		height: 70rpx;
		width: 70rpx;
	}
	.round-medium{
		height: 80rpx;
		width: 80rpx;
	}
	.round-mini{
		height: 60rpx;
		width: 60rpx;
	}
	.value{
		margin-bottom: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.value-default {
		margin-left: 35rpx;
		width: 45%;
		font-size: 24rpx;
		height: 64rpx;
		&::before{
			content: '';
			position: absolute;
			right: -63rpx;
			border: 32rpx solid $color;
			border-top-color: transparent;
			border-right-color: transparent;			
			border-bottom-color: transparent;
		}
	}
	.value-medium {
		margin-left: 40rpx;
		width: 60%;
		font-size: 26rpx;
		height: 74rpx;
		&::before{
			content: '';
			position: absolute;
			right: -74rpx;
			border: 37rpx solid $color;
			border-top-color: transparent;
			border-right-color: transparent;			
			border-bottom-color: transparent;
		}
	}
	
	.value-mini {
		margin-left: 30rpx;
		width: 30%;
		font-size: 22rpx;
		height: 54rpx;
		&::before{
			content: '';
			position: absolute;
			right: -54rpx;
			border: 27rpx solid $color;
			border-top-color: transparent;
			border-right-color: transparent;			
			border-bottom-color: transparent;
		}
	}
</style>