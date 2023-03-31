<template>
	<view style="padding: 0 20px;">
		<u-form :model="form" ref="uForm" :error-type="['message']">
			<u-form-item label="姓名" prop="name" required label-width="200">
				<u-input v-model="form.name" :custom-style="customStyle" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item label="联系电话" prop="phone" required label-width="200">
				<u-input v-model="form.phone" :custom-style="customStyle" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item label="性别" required label-width="200">
				<slot name="right">
					<u-radio-group v-model="value">
						<u-radio @change="radioChange" v-for="(item, index) in sex" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</slot>
			</u-form-item>
			<u-form-item label="身高" prop="height" required label-width="200">
				<u-input v-model="form.height" :custom-style="customStyle" placeholder="请输入身高" /> cm
			</u-form-item>
			<u-form-item label="出生年月日" prop="dateBirth" required label-width="200">
				<u-input placeholder="请选择出生年月日" v-model="form.dateBirth" type="select" @click="dateBirth_show = !dateBirth_show"
					:custom-style="customStyle" />
				<u-picker v-model="dateBirth_show" :end-year="endyear" :default-time="form.dateBirth || defaultTime" mode="time" :params="dateBirth_params" @confirm="dateBirthSelection_confirm" ></u-picker>
			</u-form-item>
			<u-form-item label="联系地址" prop="address" required label-width="200">
				<slot name="right">
					<view class="" style="flex:1; display: flex;flex-direction: column;">
						<u-input type="select"  v-model="areaAddress" placeholder="请选择所在地区" :custom-style="customStyle" @click="address_show = !address_show" />
						<u-input v-if="detailedAddress_show" type="textarea" v-model="form.address" :custom-style="customStyle" placeholder="请输入联系地址" />
					</view>
					<u-picker v-model="address_show" mode="region" @confirm="areaAddress_confirm"></u-picker>
				</slot>				
			</u-form-item>
			<u-form-item label="" prop="user_unit" required label-width="200">
				<slot>
					<view class="" style="width: 180rpx; margin-right: 20rpx;">
						<u-input type="select" v-model="unitSelect_val" :custom-style="rulesStyle"  @click="unitSelection_show = !unitSelection_show" />
					</view>
					<u-select v-model="unitSelection_show" :list="unitSelect_item" mode="single-column"
						@confirm="unitSelect_confirm"></u-select>
					<u-input v-model="form.user_unit" :custom-style="customStyle" :disabled="is_school_select" @click="rulesSelect()" placeholder="请输入学校名称或者单位名称" />
				</slot>
			</u-form-item>
			<u-form-item v-if="is_school" label="" prop="user_unitinfo" required label-width="200">
				<u-input placeholder="" :custom-style="studentStyle" v-model="form.user_unitinfo.grade" :clearable="false" />年
				<u-input placeholder="" :custom-style="studentStyle" v-model="form.user_unitinfo.classes" :clearable="false"  />班
				<u-input placeholder="" :custom-style="studentStyle" v-model="form.user_unitinfo.arrange" :clearable="false"  />排
				<u-input placeholder="" :custom-style="studentStyle" v-model="form.user_unitinfo.seat" :clearable="false"  />座
			</u-form-item>
		</u-form>
		<view class="" style="display: flex;align-items: center;justify-content: space-between; padding: 20px 0;">
			<view class="">
				检测店铺
			</view>
			<view class="">
				{{shops_unit}}
			</view>
		</view>
		<u-button @click="submit()">提交资料</u-button>
		<u-toast ref="uToast"  />
	</view>
</template>

<script>
	import rules from "@/common/index/config/rules.js"
	import {register,login,getshopname} from "@/api/index_api.js"
	export default {
		data() {
			return {
				shop_id:'',				
				shops_unit: '',
				form: {
					name: '',
					phone: '',
					height: '',
					dateBirth: '',
					address: '',
					user_unit: '',
					user_unitinfo: {
						grade: '',
						classes: '',
						arrange: '',
						seat: ''
					},
				},
				sex: [{
						name: "女",
						tag:0,
						disabled: false
					},
					{
						name: "男",
						tag:1,
						disabled: false
					}
				],
				value: "女",
				sex_select:1,
				unitSelect_val: "学校/单位",
				is_school_select:true,
				unitSelection_show: false,
				is_school:'',
				unitSelect_item: [{
					value: 1,
					label: "学校"
				}, {
					value: 0,
					label: "单位"
				}],
				dateBirth_params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
				},
				dateBirth_show: false,
				customStyle: {
					borderBottom: "1px solid #000"	
				},
				studentStyle:{
					borderBottom: "1px solid #000",
					textAlign:"center"
				},
				rulesStyle:{
					
				},
				address_show:false,
				detailedAddress_show:false,
				areaAddress:""
				// rules: rules
			}
		},
		onLoad() {

		},
		methods: {
			//提交
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						
						//发送数据给后台
						register(this.latestData).then(res=>{
							console.log(res,"then")
							login({mobile:this.latestData.mobile,name:this.latestData.name}).then(res=>{
								uni.redirectTo({
									url:"/pages/questionnaire/questionnaire?name="+ this.latestData.name
								})
							})
						}).catch(e=>{
							console.log(e,"catch")
						})
						//获取登录接口 跳转链接
						// uni.redirectTo({
						// 	url:"/pages/questionnaire/questionnaire"
						// })
					} 
				});
			},
			
			//性别选择
			radioChange(e) {
				let that = this;
				this.sex.forEach( function (item){
					item.name == e ? that.sex_select = item.tag : ""
				})
			},
			//单位选择确定			
			unitSelect_confirm(e) {
				this.unitSelect_val = e[0].label
				this.is_school = e[0].value
				this.rulesSelect();
			},
			//判断是否选择了学校或者单位
			rulesSelect(){
				if(this.is_school !== ''){
					this.is_school_select = false;
					this.rulesStyle = {
						border:"none"
					}
				}else{
					this.is_school_select = true;
					this.rulesStyle = {
						border:"2px solid red"
					}
					this.$refs.uToast.show({
						title: '请先选择左边单位',
						type: 'error',
						position:"top"
					})
				}
			},
			//生日选择确定
			dateBirthSelection_confirm(e){
				this.form.dateBirth = e.year + "-" + e.month + "-" + e.day;
			},
			//地址选择确定
			areaAddress_confirm(e){
				//将选择的地址放在 areaAddress 中
				this.areaAddress = e.province.label+e.city.label+e.area.label;
				//并显示 详细地址的输入框
				this.detailedAddress_show = true;
			},
			getshops(){
				getshopname({shop_id:this.shop_id}).then(res=>{
					console.log(res)
					if(res.code == 200){						
						this.shops_unit = res.data.shop_name;
					}
				})
			},
			
		},
		computed:{
			//计算最大的年
			endyear(){
				let endyear = new Date().getFullYear() - 1;
				return endyear;
			},
			//默认时间
			defaultTime(){
				// let Date = new Date();
				let year = new Date().getFullYear() - 1;
				let mouth = new Date().getMonth() + 1;
				let day = new Date().getDate();
				return year + "-" + mouth + "-" + day;
			},
			latestData(){
				let form = {
					shop_id:'',
					name:'',
					mobile: '',
					sex:'',
					age:'',
					height: '',
					birthday: '',
					address:'',
					school_or_unit:'',
					is_school:'',
					grade: '',
					classes: '',
					row: '',
					seat: '',
					shop_id:''
				}
				form.name = this.form.name;
				form.mobile = this.form.phone;
				form.sex = this.sex_select;
				form.age = this.getAge(this.form.dateBirth)
				form.height = this.form.height;
				form.birthday = this.form.dateBirth;
				form.address = this.areaAddress + this.form.address;
				form.school_or_unit = this.form.user_unit;
				form.is_school = this.is_school;
				form.grade = this.form.user_unitinfo.grade;
				form.classes = this.form.user_unitinfo.classes;
				form.row = this.form.user_unitinfo.arrange;
				form.seat = this.form.user_unitinfo.seat;
				form.shop_id = this.shop_id;
				return form
			},
			getAge(){
				return (val)=>{
					let strdate = new Date().getTime() - new Date(val).getTime();
					return Math.floor(strdate/31536000000);
				}
				
					
			}
		},
		onReady() {
			//挂载验证规则
			this.$refs.uForm.setRules(rules);
			this.getshops();
		},
		onLoad(option){
			this.shop_id = option.id;
			console.log(option)
		}
	}
</script>

<style lang="scss">
</style>
