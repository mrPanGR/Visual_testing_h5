import api from '@/api/api.js'
let add = (option)=>{
	return api({
		url:"user/trainingBasics/add",
		method:"POST",
		data:option
	})
} 

export {
	add
}