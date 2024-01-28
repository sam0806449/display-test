<template>
	<div id="betRule">
		<van-tabs v-model="activeTab" title-active-color="rgb(64, 128, 255)" title-inactive-color="rgb(153, 153, 153)"
			color="rgb(64, 128, 255)">
			<van-tab :title="$$t('title_1')" name="Lucky3"></van-tab>
			<van-tab :title="$$t('title_2')" name="Yxx"></van-tab>
			<van-tab :title="$$t('title_3')" name="Rps"></van-tab>
			<van-tab :title="$$t('title_4')" name="SeDie"></van-tab>
			<van-tab :title="$$t('title_5')" name="SicBo"></van-tab>
			<van-tab title="PK10" name="PK10"></van-tab>
			<van-tab :title="$$t('_67')" name="K3"></van-tab>
			<van-tab :title="$t('pk10.title2')" name="SSC"></van-tab>
			<van-tab :title="$$t('_90')" name="VNSouth"></van-tab>
			<van-tab :title="$$t('_106')" name="Mark6"></van-tab>
		</van-tabs>

		<div class="betRule_warps">
			<scroller>
				<div class="rules-text mt-2 text-left" v-if="AnotherTabs.indexOf(activeTab)<0">
					<div class="background-white px-4 py-5">
						<div class="flex mb-5">
							<template v-for="(item, index) in rulesTabs">
								<div class="type_btn radius-4 mr-2 px-3"
									:class="{type_btn_active: codeActive=== item.code}" :key="index"
									@click="changeColor(item.code)">{{item.text}}
								</div>
							</template>
						</div>

						<div v-show="codeActive==='single'" v-html="$$t('single_1')"></div>

						<div v-show="codeActive==='color'" v-html="$$t('color_1')"></div>

						<div v-show="codeActive==='three'" v-html="$$t('three_1')"></div>

						<div v-show="codeActive==='rps_mora'" v-html="$$t('rps_1')"></div>

						<div v-show="codeActive==='rps_banker'" v-html="$$t('rps_1')"></div>

						<div v-show="codeActive==='rps_player'" v-html="$$t('rps_1')"></div>

						<div v-show="codeActive==='rps_banker_player'" v-html="$$t('rps_1')"></div>

						<div v-show="codeActive==='sicBo'" v-html="$$t('sicBo_1')"></div>

					</div>

					<div v-show="codeActive==='color'">
						<div class="background-white pt-4 px-4 pb-6" v-html="$$t('blue')"></div>

						<div class="mt-3 background-white px-4 pt-4 pb-6" v-html="$$t('red')"></div>

						<div class="mt-3 background-white px-4 pt-4 pb-6" v-html="$$t('yellow')"></div>
					</div>

					<div v-show="codeActive==='rps_mora'">
						<div class="background-white pt-2 px-4 pb-6" v-html="$$t('rps_mora')"></div>
					</div>

					<div v-show="codeActive==='rps_banker'">
						<div class="background-white pt-2 px-4 pb-6" v-html="$$t('rps_banker')"></div>
					</div>

					<div v-show="codeActive==='rps_player'">
						<div class="background-white pt-2 px-4 pb-6" v-html="$$t('rps_player')"></div>
					</div>

					<div v-show="codeActive==='rps_banker_player'">
						<div class="background-white pt-2 px-4 pb-6" v-html="$$t('rps_banker_player')"></div>
					</div>

					<div v-show="codeActive==='doubleSide'">
						<div class="background-white px-4 pb-6" v-html="$$t('doubleSide_1')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('doubleSide_2')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('_75')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('_76')"></div>
					</div>


					<div v-show="codeActive==='guess'">
						<div class="background-white px-4 pb-6" v-html="$$t('guess_1')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('guess_2')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('guess_3')"></div>
						<div class="background-white px-4 pb-6 mt-2" v-html="$$t('guess_4')"></div>
					</div>

					<div v-show="codeActive==='sicBo'" class="px-4 background-white pb-6">
						<div class="background-white pt-1" v-html="$$t('sicBo_2')"></div>
						<div class="background-white pt-1" v-html="$$t('sicBo_2_1')"></div>
						<van-image src="/images/lottery/rules/sicBo_1.png" width="100%" height="100%">
						</van-image>

						<div class="background-white pt-1" v-html="$$t('sicBo_2_2')"></div>
						<van-image src="/images/lottery/rules/sicBo_2.png" width="100%" height="100%">
						</van-image>

						<div class="background-white pt-1" v-html="$$t('sicBo_2_3')"></div>
						<van-image src="/images/lottery/rules/sicBo_5.png" width="100%" height="100%"></van-image>

						<div class="background-white pt-1" v-html="$$t('sicBo_2_4')"></div>
						<van-image src="/images/lottery/rules/sicBo_6.png" width="100%" height="100%"></van-image>

						<div class="background-white pt-1" v-html="$$t('sicBo_2_5')"></div>
						<van-image src="/images/lottery/rules/sicBo_7.png" width="100%" height="100%"></van-image>


						<div class="background-white pt-2" v-html="$$t('sicBo_3')"></div>
						<table class="table caption pt-2">
							<tr class="caption">
								<th>{{$$t('th_1')}}</th>
								<th>{{$$t('th_2')}}</th>
								<th>{{$$t('th_3')}}</th>
							</tr>
							<tr>
								<td colspan="3">{{$$t('td_t')}}</td>
							</tr>

							<tr>
								<td>{{$$t('big')}}</td>
								<td>{{$$t('total')}}11{{$$t('to')}}17</td>
								<td>1{{$$t('pay')}}1</td>
							</tr>

							<tr>
								<td>{{$$t('small')}}</td>
								<td>{{$$t('total')}}4{{$$t('to')}}10</td>
								<td>1{{$$t('pay')}}1</td>
							</tr>

							<tr>
								<td>{{$$t('single')}}</td>
								<td>{{$$t('total')}}5,7,9,11,13,15,17</td>
								<td>1{{$$t('pay')}}1</td>
							</tr>

							<tr>
								<td>{{$$t('pair')}}</td>
								<td>{{$$t('total')}}4,6,8,10,12,14,16</td>
								<td>1{{$$t('pay')}}1</td>
							</tr>

							<tr>
								<td>4{{$$t('or')}}17</td>
								<td>{{$$t('sums')}}4{{$$t('or')}}17</td>
								<td>1{{$$t('pay')}}60</td>
							</tr>

							<tr>
								<td>5{{$$t('or')}}16</td>
								<td>{{$$t('sums')}}5{{$$t('or')}}16</td>
								<td>1{{$$t('pay')}}30</td>
							</tr>

							<tr>
								<td>6{{$$t('or')}}15</td>
								<td>{{$$t('sums')}}6{{$$t('or')}}15</td>
								<td>1{{$$t('pay')}}18</td>
							</tr>

							<tr>
								<td>7{{$$t('or')}}14</td>
								<td>{{$$t('sums')}}7{{$$t('or')}}14</td>
								<td>1{{$$t('pay')}}12</td>
							</tr>

							<tr>
								<td>8{{$$t('or')}}13</td>
								<td>{{$$t('sums')}}8{{$$t('or')}}13</td>
								<td>1{{$$t('pay')}}8</td>
							</tr>

							<tr>
								<td>9{{$$t('or')}}12</td>
								<td>{{$$t('sums')}}9,10,11,12</td>
								<td>1{{$$t('pay')}}6</td>
							</tr>

							<tr>
								<td colspan="3">{{$$t('c_t')}}</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_1_1')}}</td>
								<td>{{$$t('c_td_1_2')}}</td>
								<td>1{{$$t('pay')}}180</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_2_1')}}</td>
								<td>{{$$t('c_td_2_2')}}</td>
								<td>1{{$$t('pay')}}30</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_3_1')}}</td>
								<td>{{$$t('c_td_3_2')}}</td>
								<td>1{{$$t('pay')}}10</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_4_1')}}</td>
								<td>{{$$t('c_td_4_2')}}</td>
								<td>1{{$$t('pay')}}5</td>
							</tr>

							<tr>
								<td rowspan="3">{{$$t('c_td_5_1')}}</td>
								<td>{{$$t('c_td_5_2')}}</td>
								<td>1{{$$t('pay')}}1</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_5_3')}}</td>
								<td>1{{$$t('pay')}}2</td>
							</tr>

							<tr>
								<td>{{$$t('c_td_5_4')}}</td>
								<td>1{{$$t('pay')}}3</td>
							</tr>
						</table>
					</div>
				</div>

				<div v-if="activeTab=='PK10'" class="rules-text background-white text-left px-4 py-5">
					<h1 class="subtitle-1">{{ $$t('_45') }}</h1>
					<div class="pl-2">
						<p class="caption-bold mb-1">{{$$t('openTime')}}：</p>
						<p class="mb-1 pl-2">{{$$t('_42')}}</p>
						<p class="caption-bold mb-1 mt-2">{{$$t('_43')}}：</p>
						<p class="mb-1 pl-2">{{$$t('_44')}}</p>
					</div>

					<h1 class="subtitle-1 mt-5">{{ $$t('_46') }}</h1>
					<div class="pl-2">
						<p class="caption-bold mb-1">{{$$t('openTime')}}：</p>
						<p class="mb-1 pl-2">{{$$t('_47')}}</p>
						<p class="caption-bold mb-1">{{$$t('_43')}}：</p>
						<p class="mb-1 pl-2">{{$$t('_48')}}</p>
					</div>

					<div class="flex flex-wrap mt-8">
						<div v-for="(item, index) in pk10GameTypes" :key="index"
							class="type_btn radius-4 ma-1 px-3 pointer"
							:class="{type_btn_active: selectedPK10Index === index}" @click="selectedPk10(index)">
							{{ item }}
						</div>
					</div>

					<div v-show="selectedPK10Index === 0">
						<div v-for="(item,i) in 62" :key="i" class="mt-3">
							<p v-if="item > 49" class="mb-1"
								:class="[{'pl-2': item !== 50 && item !== 53,'caption-bold': item === 50 || item === 53}]">
								<span v-if="item === 50">1, </span>
								<span v-if="item === 53">2, </span>
								{{$$t(`_${item}`)}}
							</p>
						</div>
					</div>

					<div v-show="selectedPK10Index === 1">
						<p class="caption-bold mb-1 mt-3">{{$$t('_63')}}</p>
						<p class="mb-1 pl-2 mb-15">{{$$t('_64')}}</p>
					</div>

					<div v-show="selectedPK10Index === 2">
						<p class="caption-bold mb-1 mt-3">{{$$t('_65')}}</p>
						<p class="mb-1 pl-2 mb-15">{{$$t('_66')}}</p>
					</div>

					<div v-show="selectedPK10Index === 3">
						<p class="caption-bold mb-1 mt-3">{{$$t('_100')}}</p>
						<p class="mb-1 pl-2 mb-15">{{$$t('_101')}}</p>
					</div>

					<div v-show="selectedPK10Index === 4">
						<p class="caption-bold mb-1 mt-3">{{$$t('_102')}}</p>
						<p class="mb-1 pl-2 mb-15">{{$$t('_103')}}</p>
					</div>

					<div v-show="selectedPK10Index === 5">
						<p class="mb-1 pl-2 mb-15" v-html="$$t('_104')"></p>
					</div>

				</div>

				<div v-if="activeTab === 'K3'" class="rules-text background-white text-left px-4 py-5">
					<div v-for="(item,i) in k3_des" :key="i" class="mb-5 pt-0">
						<h1 class="subtitle-1 mb-2">{{ $$t('_68')[i] }}</h1>
						<div class="pl-2">
							<p class="mb-1 pl-2">{{ $$t(item)[0] }}</p>
							<p class="mb-1 pl-2">{{ $$t(item)[1] }}</p>
							<p class="mb-1 pl-2" v-if="$$t(item)[2]">{{ $$t(item)[2] }}</p>
						</div>
					</div>
				</div>

				<div v-if="activeTab === 'SSC'" class="rules-text background-white text-left px-4 py-5">
					<div v-for="(item,i) in $t('sscRule._76')" :key="i" class="mb-5 pt-0">
						<h1 class="subtitle-1 mb-2">{{ item }}</h1>
						<div class="pl-2">
							<template v-for="(p,pi) in $t(`sscRule._${i+77}`)">
								<p :key="pi" class="mb-1 pl-2">{{ p }}</p>	
							</template>
						</div>
					</div>
				</div>

				<div v-if="activeTab === 'VNSouth'" class="rules-text background-white text-left px-4 py-5">
					<div v-for="(item,i) in vnsouth_des" :key="i" class="mb-5 pt-0">
						<h1 class="subtitle-1 mb-2">{{ $$t('_91')[i] }}</h1>
						<div class="pl-2">
							<template  v-for="num in 12">
								<p class="mb-1 pl-2" :key="`rule${num - 1}`" v-if="$$t(item)[num - 1]">{{ $$t(item)[num - 1] }}</p>
							</template>
						</div>
					</div>
				</div>

				<div v-if="activeTab === 'Mark6'" class="rules-text background-white text-left px-4 py-5">
					<div v-for="(item,i) in mark6_des" :key="i" class="mb-5 pt-0">
						<h1 class="subtitle-1 mb-2">{{ $$t('_107')[i] }}</h1>
						<div class="pl-2">
							<template  v-for="num in 18">
								<p class="mb-1 pl-2" :key="`rule${num - 1}`" v-if="$$t(item)[num - 1]">{{ $$t(item)[num - 1] }}</p>
							</template>
						</div>
					</div>
				</div>

			</scroller>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BetRule',

		data() {
			return {
				selectedPK10Index: 0,
				codeActive: 'color',
				activeTab: 'Lucky3',
				AnotherTabs: ['PK10','K3', 'SSC', 'VNSouth', 'Mark6'],
				k3_des: [ '_69','_70','_71','_72','_73','_74'],
				vnsouth_des: [ '_92','_93','_94','_95','_96','_97','_98','_99'],
				mark6_des: [
					"_108",
					"_109",
					"_110",
					"_111",
					"_112",
					"_113",
					"_114",
					"_115",
					"_116",
					"_117",
					"_118",
					"_119",
					"_120",
					"_121",
					"_122",
					"_123",
				],
			}
		},

		watch: {
			activeTab() {
				this.codeActive = this.rulesTabs[0].code
			}
		},

		computed: {
			pk10GameTypes() {
				let pre = this.$$t('_49')
				return pre
			},

			rulesTabs() {
				if (this.activeTab === 'Lucky3') {
					return [{
							text: this.$$t('tab_1'),
							code: 'color'
						},
						{
							text: this.$$t('tab_2'),
							code: 'single'
						}
					]
				} else if (this.activeTab === 'Yxx') {
					return [{
						text: this.$$t('tab_3'),
						code: 'three'
					}]
				} else if (this.activeTab === 'SeDie') {
					return [{
							text: this.$$t('tab_8'),
							code: 'doubleSide'
						},
						{
							text: this.$$t('tab_9'),
							code: 'guess'
						}
					]
				} else if (this.activeTab === 'SicBo') {
					return [{
						text: this.$$t('title_5'),
						code: 'sicBo'
					}]
				} else {
					return [{
							text: this.$$t('tab_4'),
							code: 'rps_mora'
						},
						{
							text: this.$$t('tab_5'),
							code: 'rps_banker'
						},
						{
							text: this.$$t('tab_6'),
							code: 'rps_player'
						},
						{
							text: this.$$t('tab_7'),
							code: 'rps_banker_player'
						}
					]
				}
			}
		},

		activated() {
			this.activeTab = sessionStorage.getItem('rules_code') || 'Lucky3'
		},

		methods: {
			selectedPk10(index) {
				this.selectedPK10Index = index
			},

			changeColor(v) {
				this.codeActive = v
			},

			$$t(v, p) {
				return this.$t('betRule.' + v, p)
			}
		}
	}
</script>

<style lang="less" scoped>
	#betRule {
		height: 100%;
		color: rgb(102, 102, 102);

		.betRule_warps {
			position: absolute;
			top: 44px;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.type_btn {
			height: 34px;
			line-height: 34px;
			text-align: center;
			color: black;
			background-color: rgb(244, 244, 244);
			font-weight: bold;
		}

		.type_btn_active {
			background-color: rgb(100, 152, 255);
			color: white;
		}

		.table {
			color: rgb(153, 153, 153);
			background-color: white;
			table-layout: fixed !important;
			width: 100% !important;
			border-collapse: collapse;
			border: none;
			font-size: 12px;
			background-color: white;

			tr {
				th {
					width: 100px;
				}
			}

			th {
				padding-top: 4px;
				padding-bottom: 4px;
				height: 40px;
			}

			td {
				height: 40px;
				padding: 14px 12px;
			}

			td,
			th {
				white-space: nowrap;
				border: solid rgb(238, 238, 238) 1px;
				text-align: center;
				white-space: pre-line;
				word-break: break-all !important;
				word-wrap: break-word !important;
				display: table-cell;
				vertical-align: middle !important;
				white-space: normal !important;
				vertical-align: text-top;
				padding: 2px 2px 0 2px;
				display: table-cell;
			}
		}
	}
</style>
