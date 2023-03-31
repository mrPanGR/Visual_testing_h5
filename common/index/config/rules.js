let rules = {
	name: [{
		required: true,
		message: '请输入姓名',
		trigger: ['change', 'blur'],
	}],
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
	height:[{
		required: true,
		message: '请输入身高',
		trigger: ['change', 'blur'],
	},{
		required: true,
		type: "number",
		message: '必须为数字',
		trigger: ['change', 'blur'],
	}],
	dateBirth:[{
		required: true,
		message: '请选择出生年月日',
		trigger: ['change', 'blur'],
	}],
	address:[{
		required: true,
		message: '请输入联系地址',
		trigger: ['change', 'blur'],
	}],
	user_unit:[{
		required: true,
		message: '请输入学校名称或者单位名称',
		trigger: ['change', 'blur'],
	}],
	user_unitinfo:[{
		validator: (rule, value, callback) => {
			if(value.grade == ""){				
					callback("年级不能为空");
					return false;
			}
			
			if(value.classes ==  ""){				
					callback("班级不能为空"); 
					return false;
			}			
			if(value.arrange ==  ""){
					callback("排位不能为空"); 
					return false;
			}
			if(value.seat == ""){				
					callback("座位不能为空"); 
					return false;
			}			
			return true;
			
		},
		// message: '手机号码不正确',
		// 触发器可以同时用blur和change
		trigger: ['change','blur'],
	}]
}

export default rules
