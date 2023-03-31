let baseURL = 'http://slcs.zhiyun199.net/api/'; //请求地址
// let token = ' ';  凭证
// process.env.NODE_ENV === 'development' ? '192.168.0.1' : 'http://***/api' ; //环境配置


/**
@param {string} url api接口
@param {string} method GET或者POST请求 必须大写
@param {object} data 可为空
@returns 返回 Promise 对象
*/
function api(options = {
	url,
	method,
	data
}) {
	
	return new Promise((resolve, reject) => {
		console.log(getToken())
		uni.request({
			url: baseURL + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			header: {
				'Authorization': getToken() || "" //自定义请求头信息
			},
			success: (res) => {
				// console.log(res)
				if (res.data.data.access_token) {
					// uni.locag
					
					setToken(res.data.data.access_token, res.data.data.token_type,res.data.data.expires_at)
				}
				
				resolve(res.data)
				// if (res.statusCode == 200) {
					// if (res.data.data.access_token) {
					// 	// uni.locag
					// 	setToken(res.data.data.access_token, res.data.data.token_type,res.data.data.expires_at)
					// }

				// 	resolve(res.data)
				// }else if(res.statusCode == 500){
				// 	reject(res.data.message);
				// }else {
				// 		reject(res.message);
				// 	}
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

function getToken(){
	let item = window.localStorage.getItem('token')
	// console.log(item)
	if(!item){
		return;
	}
	let param = JSON.parse(item);
	// console.log(+new Date())
	if(param.time <=  +new Date()){
		window.localStorage.removeItem('token')
		return "";
	}
	
	return param.token;
	
}
function setToken(token,token_type,time){
	let param = {
		token : token_type +" "+ token,
		time: new Date(time).getTime()
	}
	window.localStorage.removeItem('token')
	window.localStorage.setItem('token', JSON.stringify(param))
}

export default api;
