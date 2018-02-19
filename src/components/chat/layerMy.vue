<template>
	<div class="my">
	<div class="layer-mask"  v-if="isShow"></div>
	<transition name="transHeight" >
	<div class="layerWrap"  v-if="isShow" @click="closeBtn">
			<div class="layer-cont" @click="stop">
				<h1>
					<span name="title">我</span>
					<i class="closeBtn" @click="closeBtn">x</i>
				</h1>
				<div class="cont">
					<div class="my-infor">
						<div class="my-avatars"><img src="../../assets/images/icon01.png"></div>
						<div class="my-name">一只可爱的小柴犬</div>
					</div>
					<div class="skin">
						<h2><span class="icon-hipster"></span>皮肤</h2>
						<div class="list">
							<span v-for="(item,index) in skinList" @click="chooseSkin(index)" :class="{active: index === nowIndex}"  :key="index">
								<img :src="item.imgSrc">
								<label>{{item.name}}</label>
							</span>
						</div>
					</div>
					
				</div>
			</div>
	</div>
	</transition>
	</div>
</template>

<script>
import vSlider from "../base/slider"	
export default{
	props:{
		isShow:{
			type:Boolean,
			default:false
		}
	},
	 components:{
      vSlider
    },
    data(){
    	return{
    		nowIndex: 0,
    		skinList:[
	          {
	              imgSrc:require('../../assets/images/bg_01.jpg'),
	              name: '星空'
	          },
	          {
	              imgSrc:require('../../assets/images/bg_02.jpg'),
	              name: '雨夜'
	          },
	          {
	              imgSrc:require('../../assets/images/bg_03.jpg'),
	              name: '魔法'
	          }
	        ]
    	}
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
		chooseSkin(index){
			this.nowIndex = index
			this.$emit("on-changeSkin",this.nowIndex)
		}
	}
}
</script>

<style lang="less" scoped="" >
@import '../../assets/css/base.less'; 
.my{
	.layer-cont{
		.cont{
/*			margin: 0.1rem 2%;*/
		   .my-infor{
		   	    padding: 0.1rem 2% 0.2rem 2%;
		   	    .my-avatars {
				    display: inline-block;
				    width: 0.8rem;
				    height: 0.8rem;
				    border-radius: 50%;
				    background: #eee;
				    vertical-align: top;
				    overflow: hidden;
				    position: relative;
				    img {
					    width: 100%;
					    height: 100%;
					}
				}
				.my-name {
				    display: inline-block;
				    position: relative;
				    margin: 0 0 0 2%;
				    line-height: 0.8rem;
				}
		   }
		   .skin{
		   	    border-top:0.2rem solid #f7f7f7 ;
		   	    padding: 0.1rem 2% 0.2rem 2%;
		   	    h2{
		   	    	margin: 0.1rem 1% 0.2rem 1%;
		   	    	color:@grayColor;
		   	    	span{
		   	    		margin-right: 1%;
		   	    	}
		   	    }
			   	.list{
			   		display: flex;
			   		justify-content: flex-start;
			   	 	span{
			   	 		width: 1.15rem;
			   	 		margin:0 1.5%;
			   	 		text-align: center;
			   	 		img{
			   	 		  width:1.15rem;
			   	 		  height: 1.15rem;
			   	 		}
			   	 	}
			   	}
		   }
		}		
	}

}
</style>