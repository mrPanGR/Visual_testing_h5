(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-questionnaire-questionnaire"],{2275:function(e,t,i){"use strict";var a=i("71fe"),n=i.n(a);n.a},4305:function(e,t,i){"use strict";i.r(t);var a=i("886c"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"71fe":function(e,t,i){var a=i("e125");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("70c486cb",a,!0,{sourceMap:!1,shadowMode:!1})},"886c":function(e,t,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("d3b7"),i("159b"),i("14d9");var n=a(i("99d8")),s=i("a1ff"),l={data:function(){return{name:"",list:n.default,other:"",eyeglass_month:"",eyeglass_year:"",degree:"",customStyle:{width:"20px",minHeight:"20px !important",borderBottom:"1px solid #000",textAlign:"center"},res_show:!1}},methods:{radioChange:function(e){var t=e.detail.value.split(",")[0],i=e.detail.value.split(",")[1];this.$set(this.list[i-1],"value",t),this.$refs.list[i-1].$el.style.borderBottom="none"},mouth_year_degree:function(){console.log(""!==this.eyeglass_month||""!==this.eyeglass_year),console.log(""!==this.degree),""===this.eyeglass_month&&""===this.eyeglass_year||""===this.degree||(this.$refs.list[3].$el.style.borderBottom="none")},submit:function(){var e=this;this.res_show=!0;var t=[];if(this.list.forEach((function(e,i){""===e.value&&t.push(i)})),t.length>0){this.$refs.uToast.show({title:"请完整填写信息",type:"error"}),t.forEach((function(t){e.$refs.list[t].$el.style.borderBottom="1px solid red"}));var i=this.$refs.list[t[0]].$el.offsetTop;uni.pageScrollTo({scrollTop:i,duration:200})}else if(1!=this.list[3].value||(""!=this.eyeglass_month||""!=this.eyeglass_year)&&""!=this.degree)(0,s.add)(this.getoption).then((function(t){200==t.code&&(e.res_show=!0)}));else{this.$refs.list[3].$el.style.borderBottom="1px solid red";var a=this.$refs.list[3].$el.offsetTop;uni.pageScrollTo({scrollTop:a,duration:200})}}},computed:{getoption:function(){var e={};for(var t in this.list){var i=this.list[t],a=i.field_Name,n=i.value;e[a]=n}return e.eyeglass_month=""==this.eyeglass_month?0:this.eyeglass_month,e.eyeglass_year=""==this.eyeglass_year?0:this.eyeglass_year,e.degree=""==this.degree?0:this.degree,e.remark=this.other,e}},onReady:function(){},onLoad:function(e){this.name=e.name,console.log(e)}};t.default=l},"99d8":function(e,t,i){"use strict";i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=[{text:"是否使用台灯/放在左前方/台灯是否过亮或过暗",index:1,field_Name:"is_desk_lamp",value:""},{text:"是否看书写字习惯歪头/握笔太低？距离是否适合?",index:2,field_Name:"is_habit",value:""},{text:"是否长时间玩电子产品/看电视/练琴/看书？",index:3,field_Name:"is_long_time_play",value:""},{text:"是否有佩戴眼镜/ok镜?",index:4,field_Name:"is_eyeglass",value:""},{text:"是否有使用散瞳剂/阿托品眼药水/长期服用药物等?",index:5,field_Name:"is_use_eyedrop",value:""},{text:"是否有身体状况？（鼻炎/抵抗力差）",index:6,field_Name:"is_health",value:""},{text:"是否有眼部情况？（发炎/受伤/手术）",index:7,field_Name:"is_op",value:""},{text:"是否有开夜灯入睡？",index:8,field_Name:"is_open_light_sleep",value:""},{text:"是否经常睡眠不足/失眠？",index:9,field_Name:"is_lose_sleep",value:""},{text:"是否挑食？/爱吃甜食/碳酸？",index:10,field_Name:"is_picky_eaters",value:""},{text:"是否使用其他视力辅助仪器或尝试其他视力矫正？",index:11,field_Name:"is_correct",value:""},{text:"是否上过多辅导课程？",index:12,field_Name:"is_lesson",value:""},{text:"是否住校/家长无法监督辅导？",index:13,field_Name:"is_resdenc",value:""},{text:"是否比较情绪化/不容易配合？",index:14,field_Name:"is_emo",value:""},{text:"是否自愿来训练/有决心坚持每天来训练？",index:15,field_Name:"is_voluntart",value:""},{text:"是否能每天利用15-30分钟做眼球训练/固定时间何时？",index:16,field_Name:"is_keep",value:""},{text:"是否清楚同意恢复的是裸视，电脑度数是无法改变的？",index:17,field_Name:"is_know",value:""}];t.default=a},a1ff:function(e,t,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.add=void 0;var n=a(i("5b5d"));t.add=function(e){return(0,n.default)({url:"user/trainingBasics/add",method:"POST",data:e})}},cd3c:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return a}));var a={uInput:i("746d").default,uButton:i("11e8").default,uToast:i("b718").default},n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticStyle:{padding:"40rpx"}},[i("v-uni-view",{},[e._v("姓名："+e._s(e.name))]),e._l(e.list,(function(t){return i("v-uni-view",{key:t.index,ref:"list",refInFor:!0,staticClass:"list"},[4!=t.index?[i("v-uni-view",{staticStyle:{width:"60%"}},[e._v(e._s(t.index)+" 、"+e._s(t.text))]),i("v-uni-view",{staticStyle:{flex:"1",display:"flex","justify-content":"end"}},[i("v-uni-radio-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.radioChange.apply(void 0,arguments)}}},[i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"1,"+t.index}}),e._v("是")],1),i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"0,"+t.index}}),e._v("否")],1)],1)],1)]:[i("v-uni-view",{staticStyle:{width:"60%",display:"flex","flex-direction":"column"}},[e._v(e._s(t.index)+" 、"+e._s(t.text)),1==t.value?i("v-uni-view",{staticStyle:{display:"flex","align-items":"flex-end"}},[i("u-input",{attrs:{"custom-style":e.customStyle,clearable:!1,placeholder:""},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.mouth_year_degree()}},model:{value:e.eyeglass_month,callback:function(t){e.eyeglass_month=t},expression:"eyeglass_month"}}),e._v("个月 \n\t\t\t\t\t/"),i("u-input",{attrs:{"custom-style":e.customStyle,clearable:!1,placeholder:""},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.mouth_year_degree()}},model:{value:e.eyeglass_year,callback:function(t){e.eyeglass_year=t},expression:"eyeglass_year"}}),e._v("年 \n\t\t\t\t\t度数:"),i("u-input",{attrs:{"custom-style":e.customStyle,clearable:!1,placeholder:""},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.mouth_year_degree()}},model:{value:e.degree,callback:function(t){e.degree=t},expression:"degree"}})],1):e._e()],1),i("v-uni-view",{staticStyle:{flex:"1",display:"flex","justify-content":"end"}},[i("v-uni-radio-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.radioChange.apply(void 0,arguments)}}},[i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"1,"+t.index}}),e._v("是")],1),i("v-uni-label",{staticClass:"radio"},[i("v-uni-radio",{staticStyle:{transform:"scale(0.7)"},attrs:{value:"0,"+t.index}}),e._v("否")],1)],1)],1)]],2)})),i("v-uni-view",{},[e._v("其他："),i("u-input",{attrs:{type:"text"},model:{value:e.other,callback:function(t){e.other=t},expression:"other"}})],1),i("v-uni-view",{},[e._v("备注:请详尽告知,因原有习惯或疾病会影响视力恢复进度或效果!")]),i("u-button",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit()}}},[e._v("完成")]),i("u-toast",{ref:"uToast"}),e.res_show?i("v-uni-view",{staticClass:"modal",on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t),function(){return!1}.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"popupStyle"},[e._v("资料已提交")])],1)],1):e._e()],2)},s=[]},d894:function(e,t,i){"use strict";i.r(t);var a=i("cd3c"),n=i("4305");for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("2275");var l=i("f0c5"),o=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"e8619440",null,!1,a["a"],void 0);t["default"]=o.exports},e125:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list[data-v-e8619440]{display:flex;box-sizing:initial;justify-content:space-between;align-items:center;padding:%?20?% 0}.modal[data-v-e8619440]{width:100vw;height:100vh;position:fixed;top:0;left:0;z-index:9999;background-color:rgba(0,0,0,.25)}.popup[data-v-e8619440]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background:#fff;z-index:10000;border-radius:%?20?%;overflow:hidden}.popup .popupStyle[data-v-e8619440]{width:calc(100vw - %?100?%);height:%?180?%;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;-webkit-transform:translateZ(1000px);transform:translateZ(1000px)}',""]),e.exports=t}}]);