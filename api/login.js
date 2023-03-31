import api from "@/api/api.js"

import { login } from "@/api/index_api.js"
let canLoginUser = (option)=>{
	return api({
		url:'auth/canLoginUser',
		method:'GET',
		data:option
	})
} 
export {
	canLoginUser,
	login
}