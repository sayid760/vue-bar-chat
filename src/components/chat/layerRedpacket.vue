<template>
	<div class="redpacket">
	<div class="layer-mask"  v-if="isShow"></div>
	<transition name="transHeight" >
	<div class="layerWrap"  v-if="isShow" @click="closeBtn">
			<div class="layer-cont" @click="stop">
				<h1>
					<span name="title">红包</span>
					<i class="closeBtn" @click="closeBtn">x</i>
				</h1>
				<div class="cont">
					<span>红包金额大于10元将大屏幕显示</span>
					<p><input  placeholder="总金额，1-2000元" v-model="total" class="msgText"  type="tel"/><label>元</label></p>
					<span>每人抽到的金额随机</span>
					<p><input  placeholder="红包个数，1-500个" v-model="num" class="msgText"  type="tel"/><label>个</label></p>
					<p><input  placeholder="留言，20字以内" v-model="msg" class="msgText"/></p>
				</div>
				<button class="btn" @click="sendRedp">塞进红包</button>
			</div>
	</div>
	</transition>
	</div>
</template>

<script>
import {eventBus} from '../../assets/js/eventBus'
export default{
	props:{
		isShow:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return{
			total:'',
			num:'',
			msg:''
		}
	},
	mounted(){
	  //在mounted里监听empty-msg事件的同时，执行回调函数
	  eventBus.$on('empty-redp',()=>{
		  	this.total=''
	        this.num=''
	        this.msg=''
	   })
	},
	methods:{
		closeBtn(){
			this.$emit("on-close")
		},
		confirmBtn(){
			this.$emit("on-confirm")
		},
		stop(event){
			event.cancelBubble = true
		},
		sendRedp(){
			this.$emit("on-change",{total:this.total,num:this.num,msg:this.msg})
		}
	},
	watch:{
		total:function(){
                this.total=this.total.replace(/[^\d]/g,'');
        },
        num:function(){
                this.num=this.num.replace(/[^\d]/g,'');
        }
	}
}
</script>

<style lang="less" scoped="" >
@import '../../assets/css/base.less'; 
.redpacket{
	.layer-cont{
		.cont{
			span{
			 margin: 0.1rem 2%;
			 font-size:0.24rem;	
			 color: @grayColor;
			}
			p{
				position: relative;
			   label{
			   	 position:absolute;
			   	 right: 3%;
			   	 top: 50%;
			   	 transform: translateY(-50%); 
			   }
			}
		}
	}		
}
</style>