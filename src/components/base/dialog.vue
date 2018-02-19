<template>
	<div>
		<div class="dialog-wrap" v-if="isShow">
			<div class="dialog-cover" @click="closeBtn"></div>
			<transition name="donghua">
			<div class="dialog-content" :class="[classes]">
				<div class="content">
					<slot name="content">
						empty
					</slot>
				</div>
				<slot name="btn">
				    <div class="btn">
						<div @click="closeBtn">取消</div>
						<div @click="confirmBtn" class="confirmBtn">确定</div>
					</div>
				</slot>
			</div>
			</transition>
		</div>
	</div>
	
</template>

<script>
export default{
	props:{
		isShow:{
			type:Boolean,
			default:false
		},
		type:{
			type:String,
			default:"normal"
		}
	},
	computed:{
		classes(){
			return `dialog-${this.type}`
		}
	},
	methods:{
		closeBtn(){
			this.$emit("on-close")
		},
		confirmBtn(){
			this.$emit("on-confirm")
		}
	}
}
</script>

<style lang="less">
.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
	.dialog-cover {
	  background: #000;
	  opacity: .3;
	  position: fixed;
	  z-index: 5;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	}
	.dialog-content {
	  width: 80%;
	  position: fixed;
	  max-height: 50%;
	  overflow: auto;
	  background: #fff;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  z-index: 10;
	  padding: 2% 0 0 0;
	  line-height: 1.6;
	  font-size: 0.28rem;
	  border-radius: 0.08rem;
	  &.transHeight-enter-active,&.transHeight-leave-active {
		   transition: all 0.5s;
		}
		& .transHeight-enter, &.transHeight-leave-active{
		   transform: translate3d(0, 0, 0);
		}
	  &.dialog-fixed{
	  	width: 100%;
	  	top: auto;
	  	bottom: 0;
	  	left: 0;
	  	margin: 0;
	  }
	 .dialog-close {
		position: absolute;
		right: 5px;
		top: 5px;
		width: 20px;
		height: 20px;
		text-align: center;
		cursor: pointer;
		&:hover {
			color: #4fc08d;
		}
	 }
	 .content{
	 	padding: 3%;
	 	min-height: 0.8rem;
	 	display: flex;
	 	align-items: center;
	 }
	 .btn{
	 	display: flex;
	 	border-top:1px solid #e2e2e2 ;
	 	div{
	 		width: 100%;
	 		text-align: center;
	 		line-height: 0.75rem;
	 		font-size: 0.26rem;
	 		color: #4c4c4c;
	 		&:nth-child(2){
	 			border-left:1px solid #e2e2e2 ;
	 		}
	 		&.confirmBtn{
	 			color: #00b700;
	 		}
	 	}
	 	
	 }
	
	}
	
}

</style>