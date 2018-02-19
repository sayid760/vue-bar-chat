<template>
	<div>
	<div class="layer-mask"  v-if="isShow"></div>
	<transition name="transHeight" >
	<div class="layerWrap"  v-if="isShow" @click="closeBtn">
			<div class="layer-cont" @click="stop">
				<h1>
					<slot name="title">标题</slot>
					<i class="closeBtn" @click="closeBtn">x</i>
				</h1>
				<slot name="cont">
					 empty
				</slot>
				<slot name="btn">
						<button class="btn">确定</button>
				</slot>
			</div>
	</div>
	</transition>
	</div>
</template>

<script>
	
export default{
	props:{
		isShow:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		closeBtn(){
			this.$emit("on-close")
			console.log('ffff')
		},
		confirmBtn(){
			this.$emit("on-confirm")
		},
		stop(event){
			event.cancelBubble = true
		}
	}
}
</script>

<style lang="less" scoped="" >
.layer-mask{
		  background: #000;
		  opacity: .3;
		  position: fixed;
		  z-index: 5;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
	}
 .layerWrap{
 	position: fixed;
 	left: 0;
 	bottom: 0;
 	width: 100%;
 	height: 100%;
	z-index: 6;
 	.layer-cont{
 		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
/*	 	height: 346px;*/
		background: #fff;
		display: block;
		transform: translate3d(0, 0, 0);
		z-index: 7;
		font-size:0.28rem;
		padding:0.2rem 0 0.35rem 0;
		.btn{
			width: 90%;
			height: 0.8rem;
			line-height: 0.8rem;
			border-radius:0.1rem ;
			padding: 0;
			border: none;
			background: #ff4b87;
			color: #fff;
			font-size: 0.3rem;
			margin: 0.15rem 5% 0 5%;
		}
		h1{
			display: flex;
			justify-content: space-between;
			font-size: 0.32rem;
			height: 0.6rem;
			line-height: 0.6rem;
			padding: 0 2%;
		}
 	}
 	&.transHeight-enter-active,&.transHeight-leave-active {
		   transition: all 1s;
		}
		/*& .transHeight-enter, &.transHeight-leave-active{
		   transform: translate3d(0, 200%, 0);
		}*/
		&.transHeight-enter{
			transform: translate3d(0, 200%, 0);
		}
		&.transHeight-leave-active, & .transHeight-leave{
		   transform: translate3d(0, 200%, 0);
		}
}
</style>
