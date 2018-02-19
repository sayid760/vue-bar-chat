<template>
	<div class="sidebar">
   	  	<ul>
   	  		<li @click="gift">
   	  			<span class="icon-gift"></span>
   	  			礼物
   	  		</li>
   	  		<li @click="redPacket">
   	  			<span class="icon-magic-wand"></span>
   	  			红包
   	  		</li>
   	  		<li @click="my">
   	  			<span class="icon-smile"></span>
   	  			我的
   	  		</li>
   	  	</ul>
   	</div>
</template>

<script>
export default{
	props:{
//		selections:{
//			type:Array,
//			default:[
//			    {
//		          label: 'test',
//		          value: 0
//		        }
//			]
//		}	     
	},
	methods:{
		gift(){
			this.$emit('on-gift')
		},
		redPacket(){
			this.$emit('on-redpacket')
		},
		my(){
			this.$emit('on-my')
		}
	}
}
</script>

<style lang="less" scoped="">
.sidebar{
	position: fixed;
	right: 2%;
	top: 0.3rem;
	z-index: 4;
	ul{
	  li{
	  	width: 0.8rem;
	  	height: 0.8rem;
	  	border-radius: 50px;
	  	background: rgba(0,0,0,0.6);
	  	margin: 0.15rem 0;
	  	font-size: 0.2rem;
	  	color: #fff;
	  	display: flex;
	  	align-items: center;
	  	justify-content: center;
	  	flex-direction: column;
	  	span{
	  		font-size: 0.3rem;
	  		margin-bottom: 0.05rem;
	  	}
	  }
	}
}
</style>