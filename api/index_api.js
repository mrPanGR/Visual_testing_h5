import api from '@/api/api.js'

let register = (option)=>{
	return api({
		url:'auth/register',
		method:'POST',
		data:option
	})
} 
let login = (option)=>{
	return api({
			url:'auth/login',
			method:'POST',
			data:option
		});
}

let getshopname = (option)=>{
	return api({
			url:'config/shop/getName',
			method:'GET',
			data:option
		});
} 

export {
	register,
	login,
	getshopname
}
