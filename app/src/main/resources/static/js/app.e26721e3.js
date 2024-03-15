(function(){"use strict";var e={9992:function(e,t,r){var a=r(3751),n=r(641);const o={id:"app"};function l(e,t,r,a,l,c){const s=(0,n.g2)("appHeader"),i=(0,n.g2)("TemperatureBoard");return(0,n.uX)(),(0,n.CE)("div",o,[(0,n.bF)(s),(0,n.bF)(i),(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>c.getData&&c.getData(...e))},"호출")])}var c=r(33);const s={class:"container"},i={class:"temperature-table"},u=(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",{scope:"col"},"일"),(0,n.Lk)("th",{scope:"col"},"09시"),(0,n.Lk)("th",{scope:"col"},"13시"),(0,n.Lk)("th",{scope:"col"},"17시"),(0,n.Lk)("th",{scope:"col"},"점검자 이름"),(0,n.Lk)("th",{scope:"col"},"점검 결과")])],-1),d=["onClick"],h=["onClick"],p=["onClick"],m=["onClick"],g={class:"pagination"},v=["disabled"],k=["onClick"],f=["disabled"],b={key:0,class:"modal"},C={class:"modal-content"},T=(0,n.Lk)("label",{for:"value"},"온도:",-1),L=(0,n.Lk)("label",{for:"checker"},"점검자:",-1),P={class:"modal-buttons"};function x(e,t,r,o,l,x){return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.Lk)("h1",null,(0,c.v_)(x.getCurrentMonth(l.currentPage))+"월 "+(0,c.v_)(x.getCurrentYear(l.currentPage))+"년",1),(0,n.Lk)("div",i,[(0,n.Lk)("table",null,[u,(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(x.visibleTemperatures,((e,t)=>((0,n.uX)(),(0,n.CE)("tr",{key:t},[(0,n.Lk)("td",null,(0,c.v_)(x.getCurrentDate(t)),1),(0,n.Lk)("td",{onClick:e=>x.showModal(t,"09:00")},(0,c.v_)(x.convertToNumber(e["09:00"].value)||"-"),9,d),(0,n.Lk)("td",{onClick:e=>x.showModal(t,"13:00")},(0,c.v_)(x.convertToNumber(e["13:00"].value)||"-"),9,h),(0,n.Lk)("td",{onClick:e=>x.showModal(t,"17:00")},(0,c.v_)(x.convertToNumber(e["17:00"].value)||"-"),9,p),(0,n.Lk)("td",null,(0,c.v_)(e["09:00"].checker||"-"),1),(0,n.Lk)("td",{onClick:e=>x.togglecolor(t)},(0,c.v_)(l.ballcolor[t]?"⚫":"⚪"),9,m)])))),128))])])]),(0,n.Lk)("div",g,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>x.prevPage&&x.prevPage(...e)),disabled:1===l.currentPage},"이전",8,v),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(x.totalPages,(e=>((0,n.uX)(),(0,n.CE)("button",{key:e,onClick:t=>x.changePage(e),class:(0,c.C4)({active:e===l.currentPage})},(0,c.v_)(e),11,k)))),128)),(0,n.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>x.nextPage&&x.nextPage(...e)),disabled:l.currentPage===x.totalPages},"다음",8,f)]),l.modalVisible?((0,n.uX)(),(0,n.CE)("div",b,[(0,n.Lk)("div",C,[(0,n.Lk)("h2",null,(0,c.v_)(l.selectedTemperature.date)+"일 "+(0,c.v_)(l.selectedTemperature.time)+" 시 온도 수정하기",1),T,(0,n.bo)((0,n.Lk)("input",{type:"number",step:"0.1",id:"value","onUpdate:modelValue":t[2]||(t[2]=e=>l.selectedTemperature.temperature=e)},null,512),[[a.Jo,l.selectedTemperature.temperature]]),L,(0,n.bo)((0,n.Lk)("input",{type:"text",id:"checker","onUpdate:modelValue":t[3]||(t[3]=e=>l.selectedTemperature.checker=e)},null,512),[[a.Jo,l.selectedTemperature.checker]]),(0,n.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>x.updateTemperature&&x.updateTemperature(...e))},"수정"),(0,n.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>x.closeModal&&x.closeModal(...e))},"닫기"),(0,n.Lk)("div",P,[(0,n.Lk)("input",{type:"file",onChange:t[6]||(t[6]=(...e)=>x.handleFileUpload&&x.handleFileUpload(...e))},null,32),(0,n.Lk)("button",{onClick:t[7]||(t[7]=(...e)=>x.captureFromCamera&&x.captureFromCamera(...e))},"카메라로 캡쳐")])])])):(0,n.Q3)("",!0)])}r(4114),r(4603),r(7566),r(8721);var y=r(1250),w=r(4995),F=r.n(w),S={data(){return{temperatures:[],selectedTemperature:null,ballcolor:Array(360).fill(!1),imageSrc:null,selectedTime:null,selectedRowIndex:null,currentPage:1,pageSize:30,baseYear:2024,modalVisible:!1}},computed:{visibleTemperatures(){const e=(this.currentPage-1)*this.pageSize;return this.temperatures.slice(e,e+this.pageSize)},totalPages(){return Math.ceil(this.temperatures.length/this.pageSize)}},methods:{handleFileUpload(e){const t=e.target.files[0];t?(this.imageSrc=URL.createObjectURL(t),this.extractTextFromImage(t)):(console.log("파일 선택이 취소되었습니다."),this.resetImageData())},async captureFromCamera(){const e=document.createElement("video");navigator.mediaDevices.getUserMedia({video:!0}).then((t=>{e.srcObject=t,e.play(),e.onloadedmetadata=()=>{const t=document.createElement("canvas");t.width=e.videoWidth,t.height=e.videoHeight;const r=t.getContext("2d");r.drawImage(e,0,0,t.width,t.height);const a=t.toDataURL("image/png");this.imageSrc=a,this.extractTextFromImage(a),e.srcObject.getTracks().forEach((e=>e.stop()))}})).catch((e=>{console.error("카메라 접근 중 오류 발생:",e)}))},extractTextFromImage(e){F().recognize(e,"kor",{logger:e=>console.log(e)}).then((({data:{text:e}})=>{this.updateTemperatureFromText(e),this.sendTemperatureData(e)})).catch((e=>{console.error("OCR 중 오류 발생:",e)}))},updateTemperature(){const{date:e,time:t,temperature:r,checker:a}=this.selectedTemperature;this.temperatures[e-1][t].value=r,this.temperatures[e-1][t].checker=a,this.closeModal()},showModal(e,t){this.selectedRowIndex=e,this.selectedTime=t,this.selectedTemperature={date:this.getCurrentDate(e),time:t,temperature:this.temperatures[(this.currentPage-1)*this.pageSize+e][t].value||"",checker:this.temperatures[(this.currentPage-1)*this.pageSize+e][t].checker||""},this.modalVisible=!0},closeModal(){this.selectedTemperature=null,this.modalVisible=!1},togglecolor(e){this.ballcolor[(this.currentPage-1)*this.pageSize+e]=!this.ballcolor[(this.currentPage-1)*this.pageSize+e]},convertToNumber(e){return e?Number(e).toFixed(1):null},updateTemperatureFromText(e){const t=e.match(/(\d+(\.\d+)?)/g);if(t){const e=parseFloat(t[0]);e>=2&&e<=6&&null!==this.selectedRowIndex&&null!==this.selectedTime&&(this.temperatures[(this.currentPage-1)*this.pageSize+this.selectedRowIndex][this.selectedTime].value=e)}},resetImageData(){this.imageSrc=null,this.selectedTemperature=null,this.selectedTime=null,this.selectedRowIndex=null},changePage(e){this.currentPage=e},prevPage(){this.currentPage>1&&this.currentPage--},nextPage(){this.currentPage<this.totalPages&&this.currentPage++},getCurrentMonth(e){const t=["1","2","3","4","5","6","7","8","9","10","11","12"];return t[(e-1)%12]},getCurrentYear(e){return this.baseYear+Math.floor((e-1)/12)},getCurrentDate(e){const t=this.baseYear+Math.floor((this.currentPage-1)/12),r=(this.currentPage-1)%12+1,a=new Date(t,r-1,1),n=new Date(t,r,0).getDate(),o=a.getDate()+e;return o<=n?o:""},sendTemperatureData(e){y.A.post("/api/saveTemperature",{text:e}).then((e=>{console.log("Temperature data sent successfully:",e.data)})).catch((e=>{console.error("Error while sending temperature data:",e)}))}},created(){for(let e=0;e<360;e++)this.temperatures.push({id:e,"09:00":{value:"",checker:""},"13:00":{value:"",checker:""},"17:00":{value:"",checker:""}})}},M=r(6262);const O=(0,M.A)(S,[["render",x]]);var D=O;const _={class:"header-component"},E=(0,n.Fv)('<h2 class="textt0">온도 관리</h2><div class="header-info"><p class="textt1">장비명: 검체냉장고</p><p class="textt2">설치장소: 병리과</p><p class="textt3">허용온도: 2~6(°C)</p><p class="textt1">점검 온도 (°C)</p><p class="textt1">(적합:⚫ / 부적합:⚪)</p></div>',2),I=[E];function j(e,t,r,a,o,l){return(0,n.uX)(),(0,n.CE)("div",_,I)}var z={name:"HeaderComponent"};const R=(0,M.A)(z,[["render",j]]);var U=R,A={name:"App",methods:{getData(){y.A.get("http://localhost:8084/api/all").then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}},components:{AppHeader:U,TemperatureBoard:D}};const X=(0,M.A)(A,[["render",l]]);var V=X;(0,a.Ef)(V).mount("#app")}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,r),o.exports}r.m=e,function(){var e=[];r.O=function(t,a,n,o){if(!a){var l=1/0;for(u=0;u<e.length;u++){a=e[u][0],n=e[u][1],o=e[u][2];for(var c=!0,s=0;s<a.length;s++)(!1&o||l>=o)&&Object.keys(r.O).every((function(e){return r.O[e](a[s])}))?a.splice(s--,1):(c=!1,o<l&&(l=o));if(c){e.splice(u--,1);var i=n();void 0!==i&&(t=i)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[a,n,o]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};r.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,o,l=a[0],c=a[1],s=a[2],i=0;if(l.some((function(t){return 0!==e[t]}))){for(n in c)r.o(c,n)&&(r.m[n]=c[n]);if(s)var u=s(r)}for(t&&t(a);i<l.length;i++)o=l[i],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},a=self["webpackChunktemondo"]=self["webpackChunktemondo"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=r.O(void 0,[504],(function(){return r(9992)}));a=r.O(a)})();
//# sourceMappingURL=app.e26721e3.js.map