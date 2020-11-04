<template>
	<view class="sizes">
		<u-navbar back-icon-color='#ffffff' title="选择尺码" :background="background" title-color="#ffffff">
			<template slot="right">
				<text class="font" @click="showPopup">添加尺码组</text>
			</template>
		</u-navbar>
		<!-- 新增尺码组 -->
		<u-popup v-model="show" mode="center">
			<view class="pop">
				<text class="titl">新增尺码组</text>
				<u-input class='inputs' placeholder="请输入尺码组名称" v-model="value" :type="type" :border="border" />
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="qx" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='qd' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<!-- 编辑尺码组 -->
		<u-popup v-model="showedit" mode="center">
			<view class="pop">
				<text class="titl">修改尺码组</text>
				<u-input class='inputs' placeholder="请输入尺码组名称" v-model="valuename" :type="type" :border="border" />
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="qx1" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='qd1' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<!-- 删除尺码组 -->
		<u-popup v-model="showdel" mode="center">
			<view class="pop">
				<text class="del">是否删除改尺码组？</text>
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="qx2" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='qd2' class="btnChild">确定</u-button>
			</view>
		</u-popup>

		<!-- 新增尺码 -->
		<u-popup v-model="showsize" mode="center">
			<view class="pop">
				<text class="titl">新增尺码</text>
				<u-input class='inputs' placeholder="请输入尺码名称" v-model="valuesize" :type="type" :border="border" />
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="qxSize" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='qdSize' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<!-- 编辑尺码 -->
		<u-popup v-model="editsize" mode="center">
			<view class="pop">
				<text class="titl">编辑尺码</text>
				<u-input class='inputs' placeholder="请输入尺码名称" v-model="valuesize" :type="type" :border="border" />
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="abrogate" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='ensure' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<!-- 删除尺码组 -->
		<u-popup v-model="editDel" mode="center">
			<view class="pop">
				<text class="del">是否删除改{{this.valuesize}}尺码？</text>
			</view>
			<view class="btn">
				<u-button :hair-line="false" @click="abolish" class="btnChild">取消</u-button>
				<u-button :hair-line="false" @click='ascertain' class="btnChild">确定</u-button>
			</view>
		</u-popup>
		<u-action-sheet :list="titList" @click="titListClick" v-model="titListShow"></u-action-sheet>

		<view class="nav">
			*只可选择同一尺码组内的尺码；长按可修改尺码
		</view>
		<view class="list">
			<view class="box" v-for="(item,index) in list " :key="index">
				<view class="radios">
					<u-checkbox-group @change="radioGroupChange(index)">
						<u-checkbox v-model="item.checked" :name="item.name">
							{{item.name}}
						</u-checkbox>
						<template>
							<view class="edit-icon">
								<u-icon name="edit-pen" @click="sizeEdit(item)" class="icon" color="#7c7c7c" size="38"></u-icon>
								<u-icon name="trash" @click="sizeDel(item)" class="icon" color="#7c7c7c" size="38"></u-icon>
							</view>
						</template>
					</u-checkbox-group>
					<template>
						<view class="check-box">
							<view class="check-list" :class="val.choice==true? 'active':'' " v-for="(val,vi) in item.size" :key='vi' @click="check(val,index,vi)"
							 @longtap='longtap(val)'>
								{{val.name}}
							</view>
							<view class="check-add">
								<u-icon name="plus" @click="addsize(item.id)" class="icon" color="#00aaff" size="38"></u-icon>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="primary" class="btn1" @tap="save">确定</u-button>
		</view>
	</view>
</template>

<script>
	import {
		sizeGroupAdd,
		sizeGroupList,
		sizeGroupEdit,
		sizeGroupDel,
		sizeAdd,
		sizeEdit,
		sizeDel
	} from '../../api/sizes.js'
	export default {
		data() {
			return {
				titListShow: false,
				titList: [{
					text: '编辑',
					color: '#2979ff',
					fontSize: 28
				}, {
					text: '删除',
					color: '#2979ff',
					fontSize: 28
				}],
				style_input: {
					'background-color': '#ffffff'
				},
				background: {
					backgroundColor: '#2979ff'
				},
				editDel: false,
				editsize: false,
				show: false,
				showedit: false,
				showdel: false,
				showsize: false,
				type: 'text',
				border: true,
				value: '',
				valuename: '',
				list: [],
				id: 0,
				valuesize: '',
				size_group_id: 0,
				active: 0,
				group:{},
			}
		},
		methods: {
			// 取消编辑尺码
			abolish() {
				this.editDel = false;
			},
			// 确定编辑尺码
			async ascertain() {
				this.editDel = false;
				let res = await sizeDel(this.group.id)
				// console.log(res);
				if(!res.code){
					this.init();
				}
			},
			// 取消编辑尺码
			abrogate() {
				this.editsize = false;
			},
			// 确定编辑尺码
			async ensure() {
				this.editsize = false;
				let res = await sizeEdit(this.group.id,{
					name:this.valuesize
				})
				// console.log(res);
				if(!res.code){
					this.init();
				}
			},
			// 点击编辑或者删除尺码
			titListClick(index) {
				// console.log(this.titList[index]);
				this.valuesize = this.group.name;
				if (this.titList[index].text == '编辑') {
					this.editsize = true;
				} else {
					this.editDel = true;
				}
			},
			// 长按尺码事件
			longtap(item) {
				console.log(item);
				this.titListShow = true;
				this.group =item;
			},
			// 点击单个尺码
			check(item, index, ind) {
				this.$set(this.list, index, this.list[index]);
				this.list.map((v, i) => {
					if (i == index) {
						v.size[ind].choice = !v.size[ind].choice;
						let num = v.size.length;
						let num1 = 0;
						v.size.map((v1, i1) => {
							if (v1.choice) {
								++num1;
								if (num == num1) {
									v.checked = true;
								} else {
									v.checked = false;
								}
							}
						})
					} else {
						v.checked = false;
						v.size.map((v1, i1) => {
							v1.choice = false;
						})
					}
				});
				// console.log(this.list);
			},
			// 点击添加对应尺码组的尺码
			addsize(v) {
				this.size_group_id = v;
				this.showsize = true;
			},
			// 确定新增尺码
			async qdSize() {
				let res = await sizeAdd({
					name: this.valuesize,
					size_group_id: this.size_group_id
				})
				if (!res.code) {
					this.init();
					this.valuesize = ''
				}
				this.showsize = false;
			},
			// 取消新增尺码
			qxSize() {
				this.showsize = false;
			},
			// 点击尺码组编辑
			sizeEdit(v) {
				console.log(v);
				this.valuename = v.name;
				this.id = v.id;
				this.showedit = true;
			},
			// 点击尺码组删除
			sizeDel(v) {
				this.showdel = true;
				this.id = v.id;
			},
			// 任一个radio状态发生变化时触发
			radioGroupChange(index) {
				// console.log(name);
				this.$set(this.list, index, this.list[index]);
				this.list.map((v, i) => {
					if (i == index) {
						if (v.checked) {
							v.size.map((v1, i1) => {
								v1.choice = true;
							})
						} else {
							v.size.map((v1, i1) => {
								v1.choice = false;
							})
						}
					} else {
						v.checked = false;
						v.size.map((v1, i1) => {
							v1.choice = false;
						})
					}
				});
			},
			showPopup() {
				this.show = true;
			},
			// 取消新增尺码组
			qx() {
				this.show = false;
				this.value = '';
			},
			// 确定新增尺码组
			async qd() {
				this.show = false;
				let res = await sizeGroupAdd({
					name: this.value
				})
				this.value = '';
				if (!res.code) {
					this.init()
				}
			},
			// 取消编辑尺码组
			qx1() {
				this.showedit = false;
				this.valuename = '';
			},
			// 确定编辑尺码组
			async qd1() {
				this.showedit = false;
				let res = await sizeGroupEdit(this.id, {
					name: this.valuename
				})
				this.valuename = '';
				if (!res.code) {
					this.init()
				}
			},
			// 取消删除尺码组
			qx2() {
				this.showdel = false;
			},
			// 确定删除尺码组
			async qd2() {
				this.showdel = false;
				let res = await sizeGroupDel(this.id)
				if (!res.code) {
					this.init()
				}
			},
			async init() {
				let res = await sizeGroupList();
				this.list = res.size_group;
				this.list.map((v, i) => {
					v['checked'] = false;
					v.size.map((v1, i1) => {
						v1['choice'] = false;
					})
				})
				// console.log(this.list);
			},
			save(){
				let ids = [];
				this.list.map((v,i)=>{
					v.size.map((v1,i1)=>{
						if(v1.choice){
							ids.push(v1)
						}
					})
				})
				uni.$emit('sizeDatum', ids)
				uni.navigateBack();
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.sizes {
		.active {
			background-color: #8fbff9 !important;
		}

		.btn1 {
			width: 100%;
			position: fixed;
			bottom: 0;
			z-index: 99;
			border-radius: 0 !important;

		}

		.check-box {
			width: 100%;
			// line-height: 80rpx;
			display: flex;
			// justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			padding: 10rpx 30rpx;

			.check-add {
				width: 80rpx;
				height: 50rpx;
				border: 1rpx dashed #00aaff;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 10rpx 0;
			}

			.check-list {
				width: 80rpx;
				margin: 10rpx 0;
				height: 50rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #e8eefc;
				margin-right: 20rpx;
			}
		}

		.pop {
			width: 70vw;
			height: 15vh;

			// display: flex;
			// justify-content: center;
			// align-items: center;
			.titl {
				display: block;
				width: 100%;
				font-size: 28rpx;
				padding: 20rpx;
				text-align: center;
			}

			.del {
				display: block;
				width: 100%;
				padding-top: 100rpx;
				text-align: center;
			}

			.inputs {
				width: 80%;
				margin: 20rpx auto;
			}


		}

		.btnChild {
			flex: 1;
			border-radius: 0 !important;
		}

		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.nav {
			text-align: center;
			padding: 10rpx 0;
			color: #C0C0C0;
		}

		.font {
			padding-right: 20rpx;
			font-size: 24rpx;
			color: #FFFFFF;
		}

		.u-checkbox-group {
			width: 100%;
			height: 80rpx;
			padding: 0 20rpx;
			background-color: #e3e3e3;
			display: block !important;

			.u-checkbox {
				float: left;
				line-height: 80rpx;
			}

			.edit-icon {
				float: right;
				line-height: 80rpx;

				.icon {
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
