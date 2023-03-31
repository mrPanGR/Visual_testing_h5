import api from "@/api/api.js"

let info = (option)=>{
	return api({
		url:'user/visionCheck/info',
		method:'GET',
		data:option
	})
} 
let list = (option)=>{
	return api({
		url:'user/visionCheck/list',
		method:'GET',
		data:option
	})
} 
export {
	info,
	list
}