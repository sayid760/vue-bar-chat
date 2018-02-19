<template>
	 <div class="chatBox-send">
   	  	<div class="input-panel">
   	  	
   	  		<!--<div 
            placeholder="例如：吃饭睡觉打豆豆;" 
            class="div-textarea" 
            type="text"
            v-model="newMsg" contenteditable="true"
            @input="changeText" ref="textarea" tabindex="0"  
        ></div>-->
        <textarea type="text" value="" placeholder="上墙内容"   ref="textarea"  v-model="newMsg"  v-on:focus="myFocus" v-on:blur="blurIpt"  class="div-textarea" rows="1" />
        
        <button @click="sendMsg" class="chat-fasong"  :class="{'primary':!!newMsg}">发送</button>
            <div class="chat-biaoqing" @click="showbq"><span class="icon-smile"></span></div>
        	<div class="chat-tuxiang">
	          <div class="fun-li" @click="imgupload"><span class="icon-image"></span></div>
	        </div>
	        <input id="inputFile" name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera"
	                style="display: none" @change="fileup">
   	  	</div>
   	  	<!-- 操作区(表情-选择)-->  
		<div class="biaoqing-photo" v-if="biaoqing">
				<ul>
                    <li v-for="(item,index) in allEmoji" @click="pinker(item)">
                    	<span class="emoji-picker-image" v-bind:style="'background-position:'+item">
                    	</span>
                    </li>
                </ul>
			</div>
   	 </div>
</template>

<script>
import {eventBus} from '../../assets/js/eventBus'
export default {
	data(){
		return{
			allEmoji:[
	          "-15px -29px","-63px -29px","-110px -29px","-158px -29px","-205px -29px","-253px -29px","-15px -81px","-63px -81px","-110px -81px","-158px -81px","-205px -81px","-253px -81px"
		    ],
		    hasEmoji:false,
		    biaoqing:false,
		    newMsg:'',
		    Timer: null
		}
	},
	methods:{
		changeText(){
		  this.newMsg = this.$refs.textarea.innerHTML;
		  console.log()
		},
	  	sendMsg(){  //发送
		    let now = new Date(); 
		    let timer=now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '   ' + now.getHours() + ':' + now.getMinutes();
		    var textContent =this.newMsg.replace(/[\n\r]/g, '<br>')
		    if (textContent != "") {
              //把信息传给父级
              this.$emit("on-sendMsg", {title: this.newMsg, timer: timer});
		    }	
		    this.newMsg = '';	
		    this.$refs.textarea.innerHTML = '';	
		    this.$refs.textarea.style.height=""
			this.biaoqing = false;
	},
	pinker(target){ //发送表情
		this.newMsg = '';	
		this.$refs.textarea.innerHTML  = '';	
		let now = new Date(); 
        let timer=now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '   ' + now.getHours() + ':' + now.getMinutes();
		this.$emit("on-pinker", {title:'', timer:timer, emoji:target, hasEmoji:true});
		this.biaoqing=!this.biaoqing
	},
/*	onUpload(e){
//        var files = e.target.files
//        console.log(files)
	//检验是否为图像文件  
    var file = document.getElementById("file").files[0];  
    if(!/image\/\w+/.test(file.type)){  
        alert("看清楚，这个需要图片！");  
        return false;  
    }  
    var reader = new FileReader();  
    //将文件以Data URL形式读入页面  
    reader.readAsDataURL(file);  
    reader.onload=function(e){  
        var result=document.getElementById("result");  
        //显示文件  
        result.innerHTML='<img src="' + this.result +'" alt="" />';  
    }  
			
		} */
	fileup() {
		let now = new Date(); 
        let timer=now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '   ' + now.getHours() + ':' + now.getMinutes();
        const that = this
        const file = document.getElementById('inputFile').files[0]
		    if(!/image\/\w+/.test(file.type)){  
		        alert("看清楚，这个需要图片！");  
		        return false;  
		    }  
		    const reader = new FileReader();  
		    //将文件以Data URL形式读入页面  
		    reader.readAsDataURL(file);  
		    reader.onload=function(e){  
		     const result=document.getElementById("result")
		     const _that=this
        //把图片信息传给父级
	    that.$emit("on-imgupload", {title:'', timer:timer, emoji:'', hasEmoji:false ,imageSrc: _that.result});	
	   }  
		    
		    
    },
    imgupload() {
        const file = document.getElementById('inputFile')
        file.click()
    },
	showbq(){
		this.biaoqing=!this.biaoqing
	},
	myFocus(){
       // 解决输入框被激活时被键盘遮住问题
       this.Timer = setInterval(function() {
            document.body.scrollTop = document.body.scrollHeight
         }, 100)
	},
   blurIpt() {
       clearInterval(this.Timer)
   }
	},
	mounted(){
	  //在mounted里监听reset-component事件的同时，执行回调函数
	  eventBus.$on('reset-component',()=>{
        this.biaoqing=false
	  })
	  //在mounted里监听reset-scroll事件的同时，执行回调函数
	  eventBus.$on('reset-scroll',()=>{
        clearInterval(this.Timer)
        console.log('滚动啦')
	  })
	  
	},
	updated(){
		let pannel = this.$refs.textarea;
		//监听输入框，动态增加输入框高度
       pannel.style.height='auto';  
       pannel.style.height = pannel.scrollHeight + 'px';  
	}
}
</script>

<style lang="less" scoped="">
.chatBox-send{
    width: 96%;
    padding: 0.15rem 2%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
    font-size: 0.28rem;
    .input-panel{
        display: flex;
        align-items: flex-end;
        .div-textarea{
            width: 100%;
            min-height: 0.5rem;
            max-height: 1rem;
            /*padding: 0.1rem 1% 0 1%;*/
            outline: 0;
            background: none;
            color: #fff;
            font-size: 0.26rem;
            line-height: 0.47rem;
            word-wrap: break-word;
            overflow-x: hidden;
            overflow-y: auto;
            user-modify: read-write-plaintext-only;
            -webkit-user-modify: read-write-plaintext-only;
            -moz-user-modify: read-write-plaintext-only;
            border-bottom: 1px solid #7E8C8D;
            box-shadow:0px 2px 0px #a09fa0;
            border-radius: 0.08rem;
            flex: 5;
        }
        .chat-biaoqing{
            flex: 1;
            text-align: center;
            padding: 0.05rem 0;
            .icon-smile:before{
            	font-size: 0.46rem;
            	color: #fff;
            }
        }
        .chat-tuxiang{
            flex: 1;
            text-align: center;
            padding: 0.05rem 0;
            .icon-image:before{
            	font-size: 0.46rem;
            	color: #fff;
            }
        }
        .chat-fasong{
            flex: 1;
            height: 0.53rem;
            line-height: 0.53rem;
            background: #f44869;
            border-radius: 0.05rem;
            color: #fff;
            margin: 0 0 0 1%;
        }
    }
    .biaoqing-photo{
    	padding: 0.2rem 2% 0.1rem 2%;
        ul{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 6px;
            li{
                margin: 5px;   
            }
        }
    }
}


</style>