<template>
   <div class="chatBox-kuang" :class="addclass(skin)">
	  <div class="chatBox-content" ref="chatcontheight" @click="resetComponent">
	  	<ul class="chatBox-content-demo"  ref="chatBoxUl">
	  		<li v-for="item in list">
	            <div class="chat-main">
	            	<div class="chat-avatars">
	            	    <img  src="../assets/images/icon01.png">
	                </div>
	                <div class="chat-cont">
	                	<p class="time">{{ item.time }}</p>
	                	<div class="chat-message">
	                		<p  v-if="item.title">{{ item.title }}</p>
		                	<span class="emoji-picker-image" v-bind:style="'background-position:'+item.emoji" v-if="item.hasEmoji"></span>
		                	<div class="giftBox" v-if="item.imageSrc"><img :src="item.imageSrc" alt="" /></div>	
		                	<div class="redpBox" v-if="item.total">
		                		<span>￥{{item.total}}</span>
		                	    <span>{{item.num}}个</span>
		                	</div>
	                	</div>
	                	<div class="delet-btn" @click="showDialog(item)">删除</div>
	                </div>
	                
	            </div>
	  		</li>
	  	</ul>
	  	<v-sidebar @on-gift="showGift"  @on-redpacket="showRedpacket" @on-my="showMy" ></v-sidebar>
	  </div>
   	  
      
      <v-dialog :is-show="isShowlog" @on-close="closeDialog('isShowlog')" @on-confirm="deletMsg" >
    	    <span slot="content">
    		      确定删除此上墙内容
    	    </span>	
      </v-dialog>
    
    <v-chatsend @on-sendMsg="onSendmsg($event)" @on-pinker="onPinker($event)"  @on-imgupload="onImgupload($event)" ref="chatsend"></v-chatsend>
    
    <!--礼物-->
    <v-layergift :is-show="isShowGif" @on-close="closeDialog('isShowGif')" @on-change="onchooseGift"></v-layergift>
    
    <!--红包-->
    <v-layerRedp :is-show="isShowredP" @on-close="closeDialog('isShowredP')" @on-change="onsendRedp"></v-layerRedp>
    
    <!--我的-->
    <v-layermy :is-show="isShowMy" @on-close="closeDialog('isShowMy')" @on-changeSkin="onchooseSkin"></v-layermy>
    
    
    <!--确定支付礼物-->
    <v-dialog  :is-show="isBuy" @on-close="closeDialog('isBuy')" @on-confirm="sendGift">
    	    <span slot="content">
    		      确定支付{{giftPrice}}?
    	    </span>	
      </v-dialog>
    
    <!--确定支付红包-->
    <v-dialog  :is-show="isRedp" @on-close="closeDialog('isRedp')" @on-confirm="sendRedp">
    	    <span slot="content">
    		      确定支付￥{{redpPrice}}?
    	    </span>	
    </v-dialog>
    
   </div>
</template>

<script>
import vDialog from "./base/dialog"
import vSidebar from "./chat/sidebar"
import vChatsend from "./chat/chatSend"
import vLayergift from "./chat/layerGift"
import vLayermy from "./chat/layerMy"
import vLayerRedp from "./chat/layerRedpacket"
import {eventBus} from '../assets/js/eventBus'
import BScroll from 'better-scroll';
//存取localStorage中的数据
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}
//取出所有的值  chat-list名字是随便定的
var list = store.fetch("chat-list");
//var list = [
//	{
//		title:"aaaaaaaa",
//		time:"2018-1-15   19:38",
//		hasEmoji:false 
//	},
//	{
//		title:"bbbbbbbbb",
//		time:"2018-1-15   19:38",
//		hasEmoji:false  
//	}
//];
export default {
  components:{
     vDialog,
     vSidebar,
     vLayergift,
     vLayermy,
     vLayerRedp,
     vChatsend
  },
  data() {
    return {
       list:list,
       msg:"",
       time:"",
       emoji:'',
       imageSrc:'',
       isShowlog:false,
       isShowGif:false,
       isShowredP:false,
       isShowMy:false,
       thisItem:'',
       invTime: 2000,
       isBuy:false,
       skin:'',
       giftPrice:'',
       isRedp:false,
       redpPrice:''
    }
 },
  watch: {
   
   msg(){
   	 this.biaoqing=false
   },
   list:{
			handler:function(){
				store.save("chat-list",this.list);
			},
			deep:true
		}
  },
  mounted () {
   	this.$nextTick(() => {
   		 this._initScroll();
   		 let allLi=this.$refs.chatBoxUl.querySelectorAll("li");
		 this.chartScroll.scrollToElement(allLi[allLi.length-1],0);
    });
    
   
  },
  //每次页面渲染完之后滚动条在最底部
   updated:function(){
   //   this.scrollToBottom();
   this.$nextTick(() => {
   		 this._initScroll();
   		 let allLi=this.$refs.chatBoxUl.querySelectorAll("li");
		 this.chartScroll.scrollToElement(allLi[allLi.length-1],0);
    });
   },
   methods:{
  	scrollToBottom: function () {
  	   this.$nextTick(() => {
		   var container = this.$el.querySelector(".chatBox-content-demo");
	       container.scrollTop = container.scrollHeight;
       })
	},
	_initScroll(){
		this.chartScroll=new BScroll(this.$refs.chatcontheight,{
				click:true
		})
		this.chartScroll.on('beforeScrollStart', (pos) => {
			     //监听滚动事件
                 console.log(pos)
                 eventBus.$emit('reset-scroll') 
             })
	},
	showDialog(item){
		this.isShowlog=true
		this.thisItem=item
	},
	deletMsg(){
		var index = this.list.indexOf(this.thisItem);
        this.list.splice(index,1);
        this.isShowlog=false
	},
	closeDialog(attr){
  		this[attr]=false
    },
    showGift(){
    	this.isShowGif=true
    },
    showRedpacket(){
    	this.isShowredP=true
    },
    showMy(){
    	this.isShowMy=true
    },
    onSendmsg(target){
    	this.list.push({
			title:target.title,
			time:target.timer
	        //time:new Date()
		});
    },
    onPinker(target){
      	this.list.push({
			title:target.title,
			time:target.timer,
			emoji:target.emoji,
			hasEmoji:target.hasEmoji
		});
    },
    onImgupload(target){
        this.list.push({
			title:target.title,
			time:target.timer,
			emoji:target.emoji,
			hasEmoji:target.hasEmoji,
			imageSrc:target.imageSrc
		});
    },
     resetComponent(){
	    //通知所有组件，如果有点击表情以外的区域，通知组件
	    eventBus.$emit('reset-component') //触发一个事件
	  },
	onchooseGift(target){
		this.giftPrice=target.list.price
        this.isBuy=true
        return this.giftList=target
    },
	sendGift(){
        let now = new Date(); 
		let timer=now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '   ' + now.getHours() + ':' + now.getMinutes();
		this.list.push({
			title:this.giftList.msg,
			time:timer,
			emoji:'',
			hasEmoji:false,
			imageSrc:this.giftList.list.imgSrc
		});
		this.isBuy=false
		this.isShowGif=false
		eventBus.$emit('empty-msg') //触发一个事件
	},
	onsendRedp(target){
	this.redpPrice=target.total
       console.log(target)
		this.isRedp=true
		return this.redList=target
	},
	sendRedp(){
		let now = new Date(); 
		let timer=now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '   ' + now.getHours() + ':' + now.getMinutes();
		this.list.push({
			title:this.redList.msg,
			time:timer,
			emoji:'',
			hasEmoji:false,
			imageSrc:'',
			num:this.redList.num,
			total:this.redList.total	
		});
		this.isRedp=false
		this.isShowredP=false
		eventBus.$emit('empty-redp') //触发一个事件
	},
	onchooseSkin(attr){
      this.skin=attr
    },
    addclass(i){
        switch (i) {
	        case 0:
	            return 'skinA';
	        case 1:
	            return 'skinB';
	        case 2:
	            return 'skinC';
	    }
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/base.less'; 
	.chatBox-kuang{
		width: 100%;
		height: 100%;
		display: block;
		background: url(../assets/images/bg_01.jpg) no-repeat;
		background-size:cover ;
		&.skinB{
		  background: url(../assets/images/bg_02.jpg) no-repeat;
		  .chat-message {
		  	background: @colorB !important;
		  	&:before {
		  	   border-right: 7px solid @colorB !important;
		  	}
		  }
		}
		&.skinC{
		  background: url(../assets/images/bg_03.jpg) no-repeat;	
		  .chat-message {
		  	background: @colorC !important;
		  	&:before {
		  	   border-right: 7px solid @colorC !important;
		  	}
		  }
		}
	    .chatBox-content {
	        width: 100%;
	        position: absolute;
	        top: 0;
	        bottom: 0.76rem;
	        z-index: 3;
	        font-size: 0.3rem;
	        overflow: hidden;
	        .chatBox-content-demo {
	            li {
	                zoom: 1;
	                margin:0 3%;
	                box-sizing: border-box;
	                &:after {
	                    display: block;
	                    clear: both;
	                    content: "";
	                    visibility: hidden;
	                    height: 0;
	                }
	                .author-name {
	                    text-align: center;
	                    margin: 15px 0 5px 0;
	                    color: #888;
	                }
	                .chat-main{
	                	margin: 0 0 0.25rem 0;
		                .chat-cont{
		                	display: inline-block;
		                    position: relative; 
		                    margin: 0 0 0 2%;
			                .chat-message {
			                    max-width: 252px;
			                    min-height: 0.4rem;
			                    text-align: left;
			                    padding: 0.1rem 0.12rem 0.15rem 0.15rem;
			                    border-radius: 0.06rem;
			                    word-wrap: break-word;
			                    position: relative;
			                    font-size: 0.28rem;
			                    background: @colorA;
			                    color: #fff;
			                    /*display: flex;
			                    flex-direction: column;
			                    justify-content: center;*/
			                    margin: 0.05rem 0 0.1rem 0;
			                    &:before {
		                            position: absolute;
		                            content: "";
		                            top: 8px;
		                            left: -7px;
		                            border-top: 7px solid transparent;
		                            border-bottom: 7px solid transparent;
		                            border-right: 7px solid @colorA;
			                        }
			                    img{
			                        width: 100%;
			                        height: 100%;
			                    }
			                    p{
			                    	width: 100%;
			                    	height: 100%;
			                    	text-align: left;
			                    	padding: 0.15rem 0;
			                    }
			                    .redpBox{
			                    	width: 2.33rem;
			                    	height: 2.82rem;
			                    	background: url(../assets/images/redp.png) no-repeat;
			                    	background-size: 100%;
			                    	display: flex;
			                    	justify-content: center;
			                    	align-items: center;
			                    	flex-direction: column;
			                    	font-size: 0.32rem;
			                    	color: #ffed00;
			                    	span{
			                    		margin: 0.1rem 0 0 0;
			                    		&:nth-child(1){
			                    			margin: 0.25rem 0 0 0;
			                    		}
			                    	}
			                    }
			                }
			                .time{
			                	color: rgba(0, 0, 0, 0.6);
			                	font-size: 0.24rem;
			                }
			                .delet-btn{
			                	color: rgba(0, 0, 0, 0.6);
			                	font-size: 0.24rem;
			                	margin-bottom: 0.15rem;
			                }
		                 }
		                .chat-avatars {
		                        display: inline-block;
		                        width: 0.8rem;
		                        height: 0.8rem;
		                        border-radius: 50%;
		                        background: #eee;
		                        vertical-align: top;
		                        overflow: hidden;
		                        position: relative;
		                        top: 0.2rem;
		                        img{
		                            width: 100%;
		                            height: 100%;
		                        }
		                    }
	                }
	            }
	        }
    }
}
.emoji-picker-image{
    width: 40px;
    height: 40px;
    display: block;
    background:url(../assets/images/bqxtb01.png) no-repeat;
    background-size: 770%;
}
</style>