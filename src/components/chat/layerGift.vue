<template>
	<div class="gif">
	<div class="layer-mask"  v-if="isShow"></div>
	<transition name="transHeight" >
	<div class="layerWrap"  v-if="isShow" @click="closeBtn">
			<div class="layer-cont" @click="stop">
				<h1>
					<span name="title">礼物</span>
					<i class="closeBtn" @click="closeBtn">x</i>
				</h1>
				  <swiper :options="swiperOption">
			        <swiper-slide v-for="(item,index) in giftList" @click.native="chooseGift(index)" :class="{active: index === nowIndex}"  :key="index">
			        	<img :src="item.imgSrc">
						<cite>{{item.name}}</cite>
						<cite>{{item.price}}</cite>
			        </swiper-slide>
			        <div class="swiper-pagination" slot="pagination"></div>
			      </swiper>
			     <input  placeholder="请输入打赏上墙语，30字以内" v-model="giftMsg" class="msgText"/>
				<button class="btn" @click="sendGift">购买打赏</button>
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
    		nowIndex: 0,
    		giftList: [
	          {
	              imgSrc:require('../../assets/images/gift01.png'),
	              name: '波板糖',
	              price:'￥1.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift02.png'),
	              name: '星星',
	              price:'￥5.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift03.png'),
	              name: '烟花',
	              price:'￥10.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift04.png'),
	              name: '气球',
	              price:'￥15.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift05.png'),
	              name: '鸡腿',
	              price:'￥20.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift06.png'),
	              name: '鲜花',
	              price:'￥25.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift07.png'),
	              name: '爱心',
	              price:'￥30.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift08.png'),
	              name: '戒指',
	              price:'￥50.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift09.png'),
	              name: '豪车',
	              price:'￥180.00'
	          },
	          {
	              imgSrc:require('../../assets/images/gift10.png'),
	              name: '游轮',
	              price:'￥250.00'
	          }
	      ],
	      swiperOption: {
	//        slidesPerView: 1,
	//        slidesPerColumn: 5,
	//        spaceBetween: 30,
				slidesPerView : 5,
				slidesPerGroup : 5,
	          pagination: {
	            el: '.swiper-pagination',
	            clickable: true
	          }
	       },
	       giftMsg:''
    	}
    },
	mounted(){
	  //在mounted里监听empty-msg事件的同时，执行回调函数
	  eventBus.$on('empty-msg',()=>{
		  	this.nowIndex=''
	        this.giftMsg=''
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
		chooseGift(index){
			this.nowIndex = index
		},
		sendGift(){
			this.$emit("on-change",{list:this.giftList[this.nowIndex],msg:this.giftMsg})
		}
	}
}
</script>

<style lang="less" scoped="" >
.gif{
	.layer-cont{
		.swiper-container{
			    display: flex;
			    justify-content: space-around;
			    align-items: center;
			    height: 100%;
			    padding: 20px 0 30px 0;
				.swiper-slide{
					width:100%;		
					display: block;
					text-align: center;
					&.active{
						background:#b77cff;
					}
					img{
						width: 1.2rem;
						height: 1.2rem;
					}
					cite{
	                  display: block;
	                  font-size: 0.24rem;
	                  line-height: 0.3rem;
					}
					
				}
			}	
	}

}


</style>