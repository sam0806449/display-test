<template>
	<div id="ucsRebate" class="pa-4">
		<scroller>
			<div class="rules-text pt-2 px-4 background-white text-left">
				<div class="main-text subtitle-1">
					{{$$t('title_1')}}
				</div>

				<table class="table caption mt-3">
					<tr class="caption">
						<th>{{$$t('effective')}} 100000</th>
						<th>2.5%</th>
					</tr>
					<tr>
						<td>{{$$t('self')}} 2.5%</td>
						<td>2500</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 1})}}50%（1.25）</td>
						<td>1250</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 2})}}50%（0.625）</td>
						<td>625</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 3})}}50%（0.03125）</td>
						<td>312.5</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 4})}}50%（0.01562）</td>
						<td>156.2</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 5})}}50%（0.00781）</td>
						<td>78.1</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 6})}}50%（0.00390）</td>
						<td>39</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 7})}}50%（0.00195）</td>
						<td>19.5</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 8})}}50%（0.00097）</td>
						<td>9.7</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 9})}}50%（0.00048）</td>
						<td>4.8</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 10})}}50%（0.00024）</td>
						<td>2.4</td>
					</tr>
					<tr>
						<td>{{$$t('level', {level: 11})}}50%（0.00012）</td>
						<td>1.2</td>
					</tr>
					<tr>
						<td>A {{$$t('total')}}</td>
						<td>4998.4</td>
					</tr>
					<tr>
						<td>{{$$t('dealing')}}%</td>
						<td>4.99%</td>
					</tr>
				</table>

			</div>
		</scroller>
	</div>
</template>

<script>
	export default {
		name: 'UcsRebate',

		methods: {
			$$t(v, P) {
				return this.$t('ucsRebate.' + v, P)
			}
		}
	}
</script>

<style lang="less" scoped>
	#ucsRebate {
		height: 100%;
		color: rgb(102, 102, 102);

		.table {
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
