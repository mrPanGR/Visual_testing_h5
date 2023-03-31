import api from "@/api/api.js"
let list = (option)=>{
	return api({
		url:'user/visionCheck/list',
		method:'GET',
		data:option
	})
} 
export {
	list
}