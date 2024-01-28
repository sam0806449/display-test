<template>
	<div id="inviteRules">
		<scroller>
			<div class="text pa-5" v-if="skgCode === skgGameCode">
				{{$$t('title_t')}}
				<br /><br />{{$$t('title_1')}}

				<div class="flex mt-3" style="color: black">
					<div class="subtitle-3 mr-6">
						<div class="mt-4">{{$t('invite.proxy_0')}}</div>
						<div class="mt-8">{{$t('invite.proxy_1')}}</div>
						<div class="mt-8">{{$t('invite.proxy_2')}}</div>
						<div class="mt-8">{{$t('invite.proxy_3')}}</div>
					</div>
					<div>
						<van-image src="/images/invite/proxy.png" width="6.667rem" height="5.173rem" />
					</div>
				</div>

				<div class="mt-8">
					{{$$t('title_1_1')}}
				</div>

				<br />
				<div class="subtitle-3">{{$$t('title_2')}}</div>
				<br />{{$$t('title_2_1')}}

				<table class="table caption mt-3">
					<tr class="caption">
						<th colspan="4">{{$$t('table_t')}}</th>
					</tr>
					<tr class="caption">
						<th>{{$$t('table_1')}}</th>
						<th>{{$$t('table_2')}}</th>
						<th>{{$$t('table_3')}}</th>
						<th>{{$$t('table_4')}}</th>
					</tr>
					<tr>
						<td>{{$t('invite.proxy_1')}}</td>
						<td>10000+</td>
						<td>10%</td>
						<td>{{$$t('nix')}}</td>
					</tr>
					<tr>
						<td>{{$t('invite.proxy_2')}}</td>
						<td>100000+</td>
						<td>20%</td>
						<td>{{$$t('nix')}}</td>
					</tr>
					<tr>
						<td>{{$t('invite.proxy_3')}}</td>
						<td>100000+</td>
						<td>30%</td>
						<td>{{$$t('nix')}}</td>
					</tr>
				</table>

				<br />
				<div class="subtitle-3">
					<td>{{$$t('title_3')}}</td>
				</div>
				<br />{{$$t('title_3_1')}}
				{{$$t('title_3_2')}}
			</div>


			<div class="text pa-5" v-else>
				<div>{{$$t('ucs_title_t')}}</div>
				
				<div class="flex mt-3" style="color: black">
					<div class="subtitle-3 mr-6">
						<div class="mt-4">{{$t('invite.proxy_0')}}</div>
						<div class="mt-8">{{$t('invite.proxy_1')}}</div>
						<div class="mt-8">{{$t('invite.proxy_2')}}</div>
						<div class="mt-8">{{$t('invite.proxy_3')}}</div>
					</div>
					<div>
						<van-image src="/images/invite/proxy.png" width="6.667rem" height="5.173rem" />
					</div>
				</div>

				<div class="subtitle-3 mt-4" v-html="$$t('ucs_title_1')"></div> 
				<div class="caption pl-7" v-html="$$t('ucs_title_1_1')"></div>
				
				<div class="subtitle-3 mt-2" v-html="$$t('ucs_title_2')"></div> 
				<div class="caption pl-7" v-html="$$t('ucs_title_2_1')"></div>
				
				<div class="subtitle-3 mt-2" v-html="$$t('ucs_title_3')"></div>
				<div class="caption pl-7" v-html="$$t('ucs_title_3_1')"></div>
				
				<div class="subtitle-3 mt-2" v-html="$$t('ucs_title_4')"></div>
				<div class="caption pl-7" v-html="$$t('ucs_title_4_1')"></div>
				
				<div class="subtitle-3 mt-2" v-html="$$t('ucs_title_5')"></div>
				<div class="caption pl-7"  v-html="$$t('ucs_title_5_1')"></div>
			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'InviteRules',

		data() {
			return {
				text: null
			}
		},

		methods: {

			$$t(v) {
				return this.$t('inviteRules.' + v)
			}
		}
	}
</script>

<style lang="less" scoped>
	#inviteRules {
		height: 100%;
		text-align: left;
		margin-top: 10px;
		padding: 16px 16px 50px 16px;
		font-size: 14px;
		background-color: white;
		color: rgb(102, 102, 102);

		.text {
			white-space: pre-wrap;
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

			th {
				padding-top: 4px;
				padding-bottom: 4px;
				height: 40px;
			}

			td {
				height: 30px;
				padding: 14px 12px;
			}

			td,
			th {
				width: 1px;
				white-space: nowrap;
				border: solid rgb(70, 132, 255) 1px;
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
