<template>
	<view class="" style="display: flex; flex-direction: column;padding: 50rpx;">
		<view class="" style="height: 30vh;display: flex;justify-content: center;align-items: center;font-size: 28px;">
			视力检测信息
		</view>
		<view class="" style="flex: 1;margin-top: 50rpx;">
			
			<u-form :model="form" ref="uForm" :error-type="['message']">
				<u-form-item label="联系电话" prop="phone" required label-width="200">
					<u-input v-model="form.phone" :custom-style="customStyle" placeholder="请输入联系电话"/>
				</u-form-item>
				<u-form-item label="学生姓名" prop="user" required label-width="200">
					<u-input placeholder="" v-model="form.user" type="select" @click="rules_phone()"
						:custom-style="customStyle" />
					
				</u-form-item>
			</u-form>
			<view class="" style="margin-top: 50rpx;">
				<u-button @click="submit()">登录</u-button>	
			</view>
		</view>
			
		
		<u-picker v-model="userSelect_show" mode="selector" :range="userSelect_item"  range-key="name" @confirm="user_confirm" ></u-picker>
		<u-toast ref="uToast"  />
	</view>
	
</template>

<script>
	import { canLoginUser,login } from "@/api/login.js"
	export default {
		name:"login",
		data(){
			return {
				form:{
					phone:'',
					user:''
				},
				rules:{
					phone: [{
						required: true,
						message: '请输入联系电话',
						trigger: ['change', 'blur'],
					}, {
						required: true,
						type: "number",
						message: '必须为数字',
						trigger: ['change', 'blur'],
					}, {
						required: true,
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '请填写正确的联系电话',
						trigger: ['change', 'blur'],
					}],
				},
				userphone_val:false, //判断是否填写
				userSelect_show:false,
				userSelect_item:[],
				customStyle: {
					borderBottom: "1px solid #000"	
				},
			}
		},
		watch:{
			phone(n,o){
				 this.getUser();
			}
		},
		computed:{
			phone(){
				return this.form.phone
			}
		},
		methods:{
			getUser(){
				this.$refs.uForm.validate(valid => {
					if(valid){
						canLoginUser({
							mobile : this.form.phone
						}).then(res=>{
							if(res.code == 200){
								this.userphone_val = true;
								this.userSelect_item=res.data;
								console.log(this.userSelect_item);
							}else if(res.code == 500){
								this.$refs.uToast.show({
									title: res.message,
									type: 'error',
									position:"center"
								})
							}
							console.log(res)
							// 
						})
					}
				});
				// console.log("laile");
				
				
			},
			user_confirm(e){
				this.form.user = this.userSelect_item[e[0]].name
				// console.log(e)
			},
			rules_phone(){
				if(!this.userphone_val){
					this.$refs.uToast.show({
						title: '请先填写手机号码',
						type: 'error',
						position:"center"
					})
				}else{
					this.userSelect_show = true;
				}
			},
			submit(){
				if(this.form.phone !="" && this.form.user !==""){
					login({
						mobile:this.form.phone,
						name:this.form.user
					}).then(res=>{
						uni.redirectTo({
							url:"/pages/result/result"
						})
					})
					
				}else{
					this.$refs.uToast.show({
						title: '请先填写手机号码',
						type: 'error',
						position:"center"
					})
				}
			}
		},
		onReady() {
			//挂载验证规则
			this.$refs.uForm.setRules(this.rules);
		}
		
	}
</script>

<style>
</style>