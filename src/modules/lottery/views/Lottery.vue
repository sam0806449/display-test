<template>
	<div id="lottery" :class="{ 'isSicBoLandscape' : isSicBoLandscape}">
		<div v-if="!isSicBo">
			<van-nav-bar :border="false">
				<template #left>
					<van-icon name="arrow-left" class="mr-1" @click="goLotteryLobby" />
					<div v-if="isShowDates" class="py-2">
						<van-count-down :time="time" @finish="onFinish">
							<template #default="timeData">
								<div class="flex align-items-center">
									<div v-if="Number(timeData.hours)" class="block">
										<span v-if="Number(timeData.hours) < 10">0</span>{{ timeData.hours }}
									</div>
									<div class="block">
										<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}
									</div>
									<div class="block">
										<span v-if="Number(timeData.seconds) < 10">0</span>{{ timeData.seconds }}
									</div>
								</div>
							</template>
						</van-count-down>
					</div>
				</template>

				<template #title>
					<div class="flex align-items-center flex-d-column">
						<div class="white-text van-ellipsis pt-1">{{currentTitle}}</div>
						<div v-if="lottery.indexOf('js') === -1" class="white-text subtitle-1 van-ellipsis">
							<span class="caption-bold mr-2">{{isSeal? $t("pk10.seal_t") : $$t('betting')}}</span>
							<span class="caption">{{ datesMaker(currentDates && currentDates.dates) }}</span>
						</div>
					</div>	
				</template>

				<template #right>
					<van-popover v-model="showPopover" trigger="click" placement="bottom-end" :actions="actions"
						get-container="#lottery" :offset="[10, 5]" @select="onSelect">
						<template #reference>
							<van-icon name="setting-o" size="22" color="white" />
						</template>
					</van-popover>
					<span class="ml-2" @click="onShowLotteryLists">
						<van-icon name="wap-nav" size="22" color="white" />
					</span>
				</template>
			</van-nav-bar>

			<div class="dates pt-1 px-4" v-if="isShowDates">
				<div class="result">
					<div @click="showOverlay=!showOverlay">
						<div v-if="oldOpen && oldOpen.isOPen">
							<div class="result flex align-items-center space-between"
								v-if="result && result.groupName === 'Lucky3'">
								<div class="body-2 ml-9">
									{{datesMaker(result && result.dates,isSeal)}}
									<span v-if="isSeal"><br/>{{ $t("pk10.seal_t") }}</span>
								</div>
								<div class="flex align-items-center">
									<div class="number subtitle-4 van-ellipsis">{{result && result.num}}</div>
									<van-image :src="`/images/lottery/${getColors(result && result.color)}.png`"
										width="36" height="30" class="ml-5" />
									<van-image src="/images/lottery/down.png" width="10" height="6" class="ml-3 mr-5" />
								</div>
							</div>

							<div class="result flex align-items-center space-between"
								v-else-if="result && result.groupName === 'Rps'">
								<div class="body-2 ml-9">
									{{datesMaker(result && result.dates,isSeal)}}
									<span v-if="isSeal"><br/>{{ $t("pk10.seal_t") }}</span>
								</div>
								<div class="flex align-items-center">
									<van-image :src="`/images/lottery/rps/${getMora(result && result.mora)}.png`"
										width="46" height="42" />
									<van-image :src="`/images/lottery/rps/Banker_${result && result.num1}.png`"
										width="46" height="42" class="ml-2" />
									<van-image :src="`/images/lottery/rps/Player_${result && result.num2}.png`"
										width="46" height="42" class="ml-2" />
									<van-image src="/images/lottery/down.png" width="10" height="6" class="ml-4 mr-5" />
								</div>
							</div>

							<div class="result flex align-items-center space-between"
								v-else-if="result && result.groupName === 'SeDie'">
								<div class="body-2 ml-9">
									{{datesMaker(result && result.dates,isSeal)}}
									<span v-if="isSeal"><br/>{{ $t("pk10.seal_t") }}</span>
								</div>
								<div class="flex align-items-center">
									<template v-for="(r, index) in result && result.num && result.num.split(',')">
										<van-image :src="`/images/lottery/guess/${r}.png`" width="28" height="28"
											:key="index" class="mr-2" />
									</template>
									<van-image src="/images/lottery/down.png" width="10" height="6" class="ml-4 mr-5" />
								</div>
							</div>

							<div class="result flex align-items-center space-between" v-else>
								<div class="body-2 ml-9">
									{{datesMaker(result && result.dates,isSeal)}}
									<span v-if="isSeal"><br/>{{ $t("pk10.seal_t") }}</span>
								</div>
								<div class="flex align-items-center">
									<van-image :src="`/images/lottery/${result && result.num1}.png`" width="46"
										height="42" class="ml-2" />
									<van-image :src="`/images/lottery/${result && result.num2}.png`" width="46"
										height="42" class="ml-2" />
									<van-image :src="`/images/lottery/${result && result.num3}.png`" width="46"
										height="42" class="ml-2" />
									<van-image src="/images/lottery/down.png" width="10" height="6" class="ml-4 mr-5" />
								</div>
							</div>
						</div>

						<div class="result flex space-between align-items-center oldOpen pl-4" style="justify-content: space-between;" v-else>
							<div class="body-2 mr-2" style="max-width: 75px; word-wrap:break-word; line-height: 17px;">{{datesMaker(oldOpen && oldOpen.dates,isSeal)}}</div>
							<div class="flex align-items-center">
								<div class="subtitle-5 mr-2 van-ellipsis" style="color: rgb(83, 93, 118);">
									{{$$t('waiting')}}
								</div>
								<van-count-down :time="oldOpen.time" @finish="onGetOldOpen"
									v-show="Number(oldOpen.time) > 0">
									<template #default="timeData">
										<div class="flex space-between align-items-center">
											<div class="block">
												<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}</div>
											<div class="block mx-1">:</div>
											<div class="block">
												<span v-if="Number(timeData.seconds) < 10">0</span>{{ timeData.seconds }}</div>
										</div>
									</template>
								</van-count-down>
							</div>
							<van-image src="/images/lottery/down.png" width="10" height="6" class="mr-4" />
						</div>


					</div>
				</div>
			</div>

			<div v-else>
				<van-row type="flex" justify="space-between" class="background-white pa-4 caption" style="position: sticky;z-index: 1;">
					<van-col span="12" class="text-left">
						<div>{{$$t('grandTotal')}}：<span
								class="red-text caption-bold">{{currencySymbol}}{{parseFloat(extremeMoney.toFixed(4))}}{{currencyDenomination}}</span>
						</div>
						<div class="mt-1">{{$$t('win')}}：<span
								class="red-text caption-bold">{{currencySymbol}}{{parseFloat(currentWin.toFixed(4))}}{{currencyDenomination}}</span>
						</div>
					</van-col>
					<van-col span="12" class="divider_col">
						<div class="flex align-items-center justify-content-center">
							<div>
								<div>{{$$t('remaining')}} <span class="red-text caption-bold">{{betTotal}}</span>
									{{$$t('time')}}
								</div>
								<div class="mt-1 text-center" v-if="isOpen">
									<div class="flex align-items-center justify-content-center"
										v-if="extremeResult && extremeResult.groupName === 'jslucky3' || extremeResult && extremeResult.groupName === 'Lucky3'">
										<div class="number subtitle-1 van-ellipsis">
											{{extremeResult && extremeResult.num}}
										</div>
										<van-image
											:src="`/images/lottery/${getColors(extremeResult && extremeResult.color)}.png`"
											width="24" height="20" class="ml-2" />
									</div>

									<div v-else-if="extremeResult && extremeResult.groupName === 'Rps'">
										<van-image
											:src="`/images/lottery/rps/${getMora(extremeResult && extremeResult.mora)}.png`"
											width="24" height="24" />
										<van-image
											:src="`/images/lottery/rps/Banker_${extremeResult && extremeResult.num1}.png`"
											width="24" height="24" class="ml-2" />
										<van-image
											:src="`/images/lottery/rps/Player_${extremeResult && extremeResult.num2}.png`"
											width="24" height="24" class="ml-2" />
									</div>

									<div class="flex align-items-center"
										v-else-if="extremeResult && extremeResult.groupName === 'SeDie'">
										<template
											v-for="(r, index) in extremeResult && extremeResult.num && extremeResult.num.split(',')">
											<van-image :src="`/images/lottery/guess/${r}.png`" width="20" height="20"
												:key="index" class="mr-2" />
										</template>
									</div>

									<div class="flex align-items-center" v-else>
										<van-image :src="`/images/lottery/${extremeResult && extremeResult.num1}.png`"
											width="24" height="20" class="ml-2" />
										<van-image :src="`/images/lottery/${extremeResult && extremeResult.num2}.png`"
											width="24" height="20" class="ml-2" />
										<van-image :src="`/images/lottery/${extremeResult && extremeResult.num3}.png`"
											width="24" height="20" class="ml-2" />
									</div>
								</div>

								<div class="mt-1" v-else>{{$$t('progress')}}</div>
							</div>

							<van-button type="danger" size="mini" class="ml-3 radius-1" v-show="isShowStop"
								@click="isStop = true">{{$$t('stop')}}</van-button>
						</div>
					</van-col>
				</van-row>
			</div>

			<div class="bet_center">
				<scroller>
					<template v-for="(item,index) in playType_items">
						<div :key="index">
							<div class="mt-5 text-left px-4" v-if="item.playType === 'Color'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<div class="mt-3">
									<van-row gutter="10">
										<template v-for="(color, index) in item.lotteryBetContent">
											<van-col span="8" :key="index">
												<div class="playType_color radius-2 text-center pt-2"
													:class="{current_active: getColor(color.betContent)}"
													@click="setBetContents(color, item.playType)">
													<div class="subtitle-1 mb-1">{{color.betContentName}}</div>
													<van-image :src="`/images/lottery/${color.betContent}.png`"
														width="0.96rem" height="0.8rem" />
													<div class="caption mt-1 mb-1">{{color.odds}}</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>

							<div class="mt-9 text-left px-4 playType_single pb-5"
								v-else-if="item.playType === 'Single'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<van-row type="flex" align="center" class="mt-2" gutter="2">
									<template v-for="(b, index) in playType_single_btns">
										<van-col span="4" :key="index">
											<div class="playType_single_btn subtitle-3 justify-content-center px-1 radius-2 elevation-1"
												@click="singleBtnClick(b)">
												{{b.text}}
											</div>
										</van-col>
									</template>
								</van-row>

								<div class="mt-3 playType_single_items">
									<template v-for="(single, index) in item.lotteryBetContent">
										<div :key="index">
											<div class="playType_single_block radius-2 text-center"
												:class="[
													single.betContentName ? hadleBgColor(single.betContentName) : '',
													{'current-active-2': getSingle(single.betContent)},
												]"
												@click="setBetContents(single, item.playType)">
												<div>{{single.betContentName}}</div>
											</div>
											<div class="caption mt-1 mb-1 text-center">{{single.odds}}</div>
										</div>
									</template>
								</div>
							</div>

							<div class="mt-5 text-left px-4" v-else-if="item.playType === 'Three'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<div class="mt-3">
									<van-row gutter="10">
										<template v-for="(three, index) in item.lotteryBetContent">
											<van-col span="8" :key="index">
												<div class="playType_three radius-2 text-center mb-6"
													:class="{current_active: getThree(three.betContent)}"
													@click="setBetContents(three, item.playType)">
													<van-image :src="`/images/lottery/${three.betContent}.png`"
														width="1.6rem" height="1.493rem" class="mt-2" />
													<div class="caption mt-1 mb-1">{{three.odds}}</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>

							<div class="mt-5 text-left px-4"
								v-else-if="item.playType === 'Rps_Mora' || item.playType === 'Rps_Banker' || item.playType === 'Rps_Player' || item.playType === 'Rps_Banker_Player'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<div class="mt-3">
									<van-row gutter="10">
										<template v-for="(rps, index) in item.lotteryBetContent">
											<van-col span="8" :key="index">
												<div class="playType_three radius-2 text-center mb-6"
													:class="{current_active: getThree(rps.betContent)}"
													@click="setBetContents(rps, item.playType)">
													<div class="mt-2" v-if="item.playType === 'Rps_Banker_Player'">
														<template
															v-for="(img, index) in getRpsBankerPlayer(rps.betContent)">
															<van-image :src="`/images/lottery/rps/${img}.png`"
																width="0.8rem" height="0.8rem" class="mr-1"
																:key="index" />
														</template>
													</div>

													<div v-else-if="item.playType === 'Rps_Mora'">
														<van-image :src="`/images/lottery/rps/${rps.betContent}.png`"
															width="1.6rem" height="1.6rem" class="mt-2"
															v-if="culture === 'zh-CN'" />

														<van-image :src="`/images/lottery/rps/${rps.betContent}_en.png`"
															width="1.6rem" height="1.6rem" class="mt-2" v-else />
													</div>

													<van-image :src="`/images/lottery/rps/${rps.betContent}.png`"
														width="1.6rem" height="1.6rem" class="mt-2" v-else />
													<div class="caption mt-1 mb-1">{{rps.odds}}</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>

							<!-- 色碟 -->
							<div class="text-left px-4" v-else-if="item.playType === 'DoubleSide'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<div class="mt-1">
									<van-row gutter="10">
										<template v-for="(doubleSide, index) in item.lotteryBetContent">
											<van-col span="6" :key="index">
												<div class="playType_three radius-2 text-center mb-1"
													:class="{current_active: getThree(doubleSide.betContent)}"
													@click="setBetContents(doubleSide, item.playType)">
													<div class="headline mt-1">{{doubleSide.betContentName}}</div>
													<div class="caption mb-1">{{doubleSide.odds}}</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>

							<!-- 色碟 -->
							<div class="text-left px-4" v-else-if="item.playType === 'Guess'">
								<div class="subtitle-3">{{item.playTypeName}}</div>
								<div class="mt-1">
									<van-row gutter="10">
										<template v-for="(guess, index) in item.lotteryBetContent">
											<van-col span="12" :key="index">
												<div class="playType_three radius-2 text-center mb-1"
													:class="{current_active: getThree(guess.betContent)}"
													@click="setBetContents(guess, item.playType)">
													<van-image :src="`/images/lottery/guess/${guess.betContent}.png`"
														width="4rem" height="0.93rem" class="mt-1" />
													<div class="caption mt-1 mb-1">{{guess.odds}}</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>

							<van-empty v-else :description="$t('common.noMore')" class="text-center">
								<template #image>
									<van-image src="/images/empty/no-more.png" width="280" height="130" />
								</template>
							</van-empty>
						</div>
					</template>

					<!-- 色碟路子图 -->
					<div v-if="curParentType === 'SeDie' && results_road_data.length" class="roadmap mt-2"
					:key="`SeDie-${roadmapContro}`">
						<div class="title-bar">
							<span v-for="(item,i) in results_roadmap_bar" :key="i">
								<span :class="roadmapstyle(item)">
									{{!Number(item) && Number(item) !== 0 ? $$t(item) : item }}</span>{{ results_roadmap[item].toString().replace(/\s*/g,"")}}
							</span>
						</div>
						<div class="flex">
							<div class="contro">
								<!-- 珠盘 -->
								<div @click="roadmapContro = 1" :class="['contro-btn',{'current_active':roadmapContro===1}]">{{$$t('_2')}}</div>
								<!-- 点数 -->
								<div @click="roadmapContro = 2" :class="['contro-btn',{'current_active':roadmapContro===2}]">{{$$t('_3')}}</div>
								<!-- 大小 -->
								<div @click="roadmapContro = 3" :class="['contro-btn',{'current_active':roadmapContro===3}]">{{$$t('_4')}}</div>
								<!-- 单双 -->
								<div @click="roadmapContro = 4" :class="['contro-btn',{'current_active':roadmapContro===4}]">{{$$t('_5')}}</div>
							</div>
							<vue-touch-scroll type="horizontal" hide-scrollbar>
							<div class="balls">
								<div v-for="(big,bi) in results_roadmap.balls" :key="bi" class="flex">
									<div v-if="roadmapContro === 1" class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small" class="ball" :style="{'background-color': colorOfNumParseType[small]}">
												{{small}}
											</div>
										</div>
									</div>
									<div v-else class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small && si === 0" class="length-cell">
												{{big.filter(t => t).length}}
											</div>
											<div v-if="small && roadmapContro === 2" class="ball" :class="[{
												'ball-red': bi % 2 !== 0,
												'ball-blue': bi % 2 === 0
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 3" class="ball" :class="[{
												'ball-red': +(small) < 2,
												'ball-blue': +(small) > 2,
												'ball-green': +(small) === 2
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 4" class="ball" :class="[{
												'ball-red': +(small) % 2 === 0,
												'ball-blue': +(small) % 2 !== 0,
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
										</div>
									</div>
								</div>
							</div>
							</vue-touch-scroll>
						</div>
					</div>
				</scroller>
			</div>


			<div v-if="curParentType === 'Lucky3' && skgCodeKey !== 'SGMGM'" class="nav_bottom lucky3-bottom">
				<div class="msg_info radius-3 white-text mb-2" v-if="Number(money) > 0">
					<div class="body-2">
						{{ handleLangOfNumber(betNumber) }}，{{currencySymbol}}{{betMoney}}{{currencyDenomination}}
					</div>
				</div>

				<div class="flex" style="width: 100%;">
					<vue-touch-scroll type="horizontal" hide-scrollbar>
						<div class="money_number flex align-items-center space-between white-text body-2">
							<div class="money_block_bg" v-for="(e, index) in lucky3Moneys" :key="index">
								<div class="money_block" :style="getLucky3ActiveBicMoney(e, index + 1)"
									@click="selectLucky3Money(e.toString(), index)">
									<div class="money_block_text">{{e}}</div>
								</div>
							</div>
						</div>
					</vue-touch-scroll>
				</div>

				<van-number-keyboard v-model="money" :show="showKeyboard" @blur="showKeyboard = false" theme="custom"
					:close-button-text="$t('common.complete')" />

				<div class="mt-3 flex space-between" style="z-index: 888">
					<div class="text-left">
						<div class="caption">{{$$t('balance')}}：</div>
						<div class="red-text subtitle-3">
							{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
						</div>
					</div>

					<div class="bet">
						<van-button class="radius-2" color="linear-gradient(to right, #4684FF, #81AAFF)"
							:disabled="isDisabled || isSeal" @click="onBet">
							{{$$t('bet')}}
						</van-button>
					</div>

					<div class="money_btn" @click="onClear">
						<van-icon name="delete-o" size="14" />
						<span class="caption money_btn-clear">{{$$t('clear')}}</span>
					</div>

					<div class="money_btn" @click="showLucky3ChipSet = true" style="box-sizing: content-box;"> 
						<van-icon name="setting" color="#999"/>
						<span class="caption" v-html="$$t('_7')"></span>
					</div>

					<div class="money_btn" @click="showPopup=true">
						<span class="caption" v-html="$$t('recent')"></span>
					</div>
				</div>
			</div>

			<div v-else class="nav_bottom">
				<div class="msg_info radius-3 white-text mb-2" v-if="Number(money) > 0">
					<div class="body-2">
						{{ handleLangOfNumber(betNumber) }}，{{currencySymbol}}{{betMoney}}{{currencyDenomination}}
					</div>
				</div>

				<div class="flex space-between align-items-center">
					<div class="flex radius-2">
						<template v-for="(e, index) in moneys">
							<div class="block_number subtitle-3" :key="index" @click="money=e.toString()">{{e}}</div>
						</template>
					</div>

					<div class="inputMoney caption" @click="() => { if(!isSeal) showKeyboard = true}">
						{{money ? currencySymbol + money + currencyDenomination : $$t('money_d')}}
					</div>
				</div>

				<van-number-keyboard v-model="money" :show="showKeyboard" @blur="showKeyboard = false" theme="custom"
					:close-button-text="$t('common.complete')" />

				<div class="mt-3 flex space-between" style="z-index: 888">
					<div class="text-left">
						<div class="caption">{{$$t('balance')}}：</div>
						<div class="red-text subtitle-3">
							{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
						</div>
					</div>

					<div class="bet">
						<van-button class="radius-2" color="linear-gradient(to right, #4684FF, #81AAFF)"
							:disabled="isDisabled || isSeal" @click="onBet">
							{{$$t('bet')}}
						</van-button>
					</div>

					<div class="money_btn" @click="onClear">
						<van-icon name="delete-o" size="14" />
						<span class="caption money_btn-clear">{{$$t('clear')}}</span>
					</div>

					<div class="money_btn" @click="showPopup=true">
						<span class="caption" v-html="$$t('recent')"></span>
					</div>
				</div>
			</div>
		</div>

		<!-- 骰宝 -->
		<div class="sicBo" v-else>
			<van-dialog v-model="showSicboLandspaceTip" :title="$$t('_13')" :confirm-button-text="$t('financialHoldDetails.determine')">
				<div class="flex justify-content-center align-items-center">
					<img src="/images/lottery/sicBo/phone.jpg" style="max-width: 50%; float: none" />
				</div>
			</van-dialog>
			<van-nav-bar v-if="!isSicBoLandscape" :border="false">
				<template #left>
					<van-icon name="arrow-left" class="mr-1" @click="goLotteryLobby" />
					<div v-if="isShowDates" class="py-2">
						<van-count-down :time="time" @finish="onFinish">
							<template #default="timeData">
								<div class="flex space-between align-items-center">
									<div class="block px-2">
										<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}
									</div>
									<div class="block px-2">
										<span v-if="Number(timeData.seconds) < 10">0</span>{{ timeData.seconds }}
									</div>
								</div>
							</template>
						</van-count-down>
					</div>	
				</template>

				<template #title v-if="isShowDates">
					<div class="flex align-items-center flex-d-column">
						<div class="white-text van-ellipsis pt-1">{{currentTitle}}</div>
						<div class="white-text subtitle-1 van-ellipsis">
							<span class="caption-bold mr-2">{{isSeal? $t("pk10.seal_t") : $$t('betting')}}</span>
							<span class="caption">{{datesMaker(currentDates && currentDates.dates,isSeal)}}</span>
						</div>
					</div>	
				</template>

				<template #right>
					<div class="flex align-items-center" style="margin-left: auto;">
						<!-- <div class="mr-3" style="font-size: 0.5rem;" @click="toggleSicBoOrientation(true)">
							<van-icon name="exchange" />
						</div> -->
						<van-popover v-model="showPopover" trigger="click" placement="bottom-end" :actions="actions"
						get-container="#lottery" :offset="[10, 5]" @select="onSelect">
						<template #reference>
							<van-icon name="setting-o" size="22" color="white" />
						</template>
					</van-popover>
					<span class="ml-2" @click="onShowLotteryLists">
						<van-icon name="wap-nav" size="22" color="white" />
					</span>
					</div>
				</template>
			</van-nav-bar>
			<div v-else style="
					height: 50px;
					position: relative;
					display: flex;
					align-items: center;
					padding: 5px 10px;
					background-image: url('/images/lottery/sicBo/nav_bg.png');
					background-size: 100% 100%;
					color: rgb(255, 231, 159) !important;">
				<template>
					<div class="mr-2" style="font-size: .5rem;" >
						<van-icon name="arrow-left" @click="goLotteryLobby" />
					</div>
					
					<div class="mr-5" @click="onShowLotteryLists">
						<div class="subtitle-1 van-ellipsis pt-1">{{currentTitle}}
							<van-icon :name="showLotteryLists ? 'arrow-up' : 'arrow-down'" size="16" />
						</div>
						<div class="caption text-left" v-if="isShowDates">
							{{datesMaker(currentDates && currentDates.dates,isSeal)}}
						</div>
					</div>
				</template>

				<template v-if="isShowDates">
					<div class="white-text subtitle-1 van-ellipsis mr-2">{{isSeal? $t("pk10.seal_t") : $$t('betting')}}</div>
					<van-count-down :time="time" @finish="onFinish">
						<template #default="timeData">
							<div class="flex space-between align-items-center">
								<div class="block px-2">
									<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}
								</div>
								<div class="block px-2">
									<span v-if="Number(timeData.seconds) < 10">0</span>{{ timeData.seconds }}
								</div>
							</div>
						</template>
					</van-count-down>
				</template>

				<template>
					<div class="sicBo_dates px-1" v-if="isShowDates">
						<div class="radius-2" style="border: none">
							<!-- <div class="result_text mt-1">
								{{$$t('result_text')}}
							</div> -->

							<div @click="showOverlay=!showOverlay">
								<div v-if="oldOpen && oldOpen.isOPen">
									<div class="flex align-items-center justify-content-center">
										<div v-if="culture === 'vi-VN'" class="sicBo_bet_text caption-bold mr-2 ml-8">
											<span>{{$$t('dates')}}</span>
											<span>{{result && result.dates}}</span>
										</div>
										<div v-else class="sicBo_bet_text caption-bold mr-2 ml-9">
											<span>{{result && result.dates}}</span>
											<span>{{$$t('dates')}}</span>
										</div>
										<div class="result_block pa-1 radius-2 mr-3" style="border: .02667rem solid rgb(255, 231, 159)">
											<van-image :src="`/images/lottery/sicBo/${result && result.num1}.png`" width="30"
												height="30" style="display: block"></van-image>
										</div>
										<div class="result_block pa-1 radius-2 mr-3" style="border: .02667rem solid rgb(255, 231, 159)">
											<van-image :src="`/images/lottery/sicBo/${result && result.num2}.png`" width="30"
												height="30" style="display: block"></van-image>
										</div>
										<div class="result_block pa-1 radius-2 mr-3" style="border: .02667rem solid rgb(255, 231, 159)">
											<van-image :src="`/images/lottery/sicBo/${result && result.num3}.png`" width="30"
												height="30" style="display: block"></van-image>
										</div>

										<div class="result_center radius-2 px-3 flex align-items-center" style="border: .02667rem solid rgb(255, 231, 159)">
											<div style="font-size: .8rem;
												color: #ffe79f;
												font-weight: bolder;">
												{{getSum(result)}}
											</div>

											<div class="ml-2 mora flex">
												<div class="mora_block mr-2" v-for="(e, index) in getSicBoArray(result)"
													:key="index">
													<div v-if="index===0">
														<van-tag color="#fa9033" v-if="Number(getSum(result)) >= 11">{{e}}
														</van-tag>
														<van-tag color="#409eff" v-else>{{e}}</van-tag>
													</div>

													<div v-else>
														<van-tag color="#409eff" v-if="Number(getSum(result))%2===0">{{e}}
														</van-tag>
														<van-tag color="#fa9033" v-else>{{e}}</van-tag>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="flex space-between align-items-center oldOpen sicBo_bet_text mt-1 mb-1" v-else>
									<div class="body-2 ml-9">{{datesMaker(oldOpen && oldOpen.dates)}}</div>
									<div class="flex align-items-center">
										<div class="flex">
											<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
											<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
											<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										</div>
										<div class="subtitle-5 mr-2 van-ellipsis">
											{{$$t('waiting')}}
										</div>

										<van-count-down :time="oldOpen.time" @finish="onGetOldOpen"
											v-show="Number(oldOpen.time) > 0">
											<template #default="timeData">
												<div class="flex space-between align-items-center sicBo_bet_text">
													<div class="block px-2">
														<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}</div>
													<div class="mx-1">:</div>
													<div class="block px-2"><span
															v-if="Number(timeData.seconds) < 10">0</span>{{timeData.seconds }}
													</div>
												</div>
											</template>
										</van-count-down>
									</div>
									<van-image src="/images/lottery/down.png" width="10" height="6" class="mr-4" />
								</div>
							</div>
						</div>
					</div>

					<div v-else>
						<div class="flex">
							<div class="flex flex-d-column justify-content-center align-items-start">
								<div class="flex mr-2">
									<span>{{$$t('grandTotal')}}：</span><br/>
									<span class="white-text caption-bold">{{currencySymbol}}{{parseFloat(extremeMoney.toFixed(4))}}{{currencyDenomination}}</span>
								</div>
								<div class="flex">
									<span>{{$$t('win')}}：</span><br/>
									<span class="white-text caption-bold">{{currencySymbol}}{{parseFloat(currentWin.toFixed(4))}}{{currencyDenomination}}</span>
								</div>
							</div>

							<div class="flex ml-8">
								<div class="flex align-items-center justify-content-center"
									@click.stop="showOverlay=!showOverlay">
									<div class="flex align-items-center">
										<div>{{$$t('remaining')}} <span class="white-text caption-bold">{{betTotal}}</span>
											{{$$t('time')}}
										</div>

										<div v-show="isShowStop" class="flex align-items-center mr-3 ml-2">
											<van-button type="danger" size="mini" class="radius-1"
												@click.stop="isStop = true">{{$$t('stop')}}
											</van-button>
										</div>

										<div class="ml-3 text-center" v-if="isOpen && !isShowDice">
											<div class="flex align-items-center">
												<van-image
													:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num1}.png`"
													width="30" height="30" class="mr-2" />
												<van-image
													:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num2}.png`"
													width="30" height="30" class="mr-2" />
												<van-image
													:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num3}.png`"
													width="30" height="30" class="mr-1" />

												<div class="subtitle-3 ml-3"
													style="font-size: .8rem !important;
													color: #ffe79f;"
												>
													{{getSum(extremeResult)}}
												</div>

												<div class="ml-1 flex align-items-center">
													<div class="subtitle-3" v-for="(e, index) in getSicBoArray(extremeResult)"
														:key="index">
														<div v-if="index===0">
															<van-tag color="#fa9033" v-if="Number(getSum(extremeResult)) >= 11">
																{{e}}
															</van-tag>
															<van-tag color="#409eff" v-else>{{e}}</van-tag>
														</div>

														<div v-else class="ml-1">
															<van-tag color="#409eff" v-if="Number(getSum(extremeResult))%2==0">
																{{e}}
															</van-tag>
															<van-tag color="#fa9033" v-else>{{e}}</van-tag>
														</div>
													</div>
												</div>
											</div>
										</div>

										<div class="flex mt-1 mb-1" v-if="isShowDice || !isOpen">
											<img width="35" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
											<img width="35" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
											<img width="35" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex align-items-center" style="margin-left: auto;">
						<!-- <div class="mr-3" style="font-size: 0.5rem;" @click="toggleSicBoOrientation(false)">
							<van-icon name="exchange" />
						</div> -->
						<van-popover v-model="showPopover" trigger="click" placement="bottom-end" :actions="actions"
							get-container="#lottery" @select="onSelect">
							<template #reference>
								<van-icon name="wap-nav" size="22" />
							</template>
						</van-popover>
					</div>
				</template>
			</div>

			<template v-if="!isSicBoLandscape">
				<div class="sicBo_dates pt-1 px-1 pb-3" v-if="isShowDates">
					<div class="result radius-2 pb-4">
						<div class="result_text mt-1">
							{{$$t('result_text')}}
						</div>

						<div @click="showOverlay=!showOverlay">
							<div v-if="oldOpen && oldOpen.isOPen">
								<div class="flex align-items-center justify-content-center mt-2">
									<div v-if="culture === 'vi-VN'" class="sicBo_bet_text caption-bold mr-2">
										<span>{{$$t('dates')}}</span><br/>
										<span>{{result && result.dates}}</span>
									</div>
									<div v-else class="sicBo_bet_text caption-bold mr-2">
										<span>{{result && result.dates}}</span><br/>
										<span>{{$$t('dates')}}</span>
									</div>
									<div class="result_block pa-1 radius-2 mr-3">
										<van-image :src="`/images/lottery/sicBo/${result && result.num1}.png`" width="38"
											height="38"></van-image>
									</div>
									<div class="result_block pa-1 radius-2 mr-3">
										<van-image :src="`/images/lottery/sicBo/${result && result.num2}.png`" width="38"
											height="38"></van-image>
									</div>
									<div class="result_block pa-1 radius-2 mr-3">
										<van-image :src="`/images/lottery/sicBo/${result && result.num3}.png`" width="38"
											height="38"></van-image>
									</div>

									<div class="result_center radius-2 px-3 flex align-items-center">
										<div class="text_number">
											{{getSum(result)}}
										</div>

										<div class="ml-2 mora">
											<div class="mora_block" v-for="(e, index) in getSicBoArray(result)"
												:key="index">
												<div v-if="index===0">
													<van-tag color="#fa9033" v-if="Number(getSum(result)) >= 11">{{e}}
													</van-tag>
													<van-tag color="#409eff" v-else>{{e}}</van-tag>
												</div>

												<div v-else>
													<van-tag color="#409eff" v-if="Number(getSum(result))%2===0">{{e}}
													</van-tag>
													<van-tag color="#fa9033" v-else>{{e}}</van-tag>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="flex space-between align-items-center oldOpen sicBo_bet_text mt-4 mb-4" v-else>
								<div class="body-2 ml-9">{{datesMaker(oldOpen && oldOpen.dates)}}</div>
								<div class="flex align-items-center">
									<div class="flex">
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
									</div>
									<div class="subtitle-5 mr-2 van-ellipsis">
										{{$$t('waiting')}}
									</div>

									<van-count-down :time="oldOpen.time" @finish="onGetOldOpen"
										v-show="Number(oldOpen.time) > 0">
										<template #default="timeData">
											<div class="flex space-between align-items-center sicBo_bet_text">
												<div class="block px-2">
													<span v-if="Number(timeData.minutes) < 10">0</span>{{ timeData.minutes }}</div>
												<div class="mx-1">:</div>
												<div class="block px-2"><span
														v-if="Number(timeData.seconds) < 10">0</span>{{timeData.seconds }}
												</div>
											</div>
										</template>
									</van-count-down>
								</div>
								<van-image src="/images/lottery/down.png" width="10" height="6" class="mr-4" />
							</div>
						</div>
					</div>
				</div> 

				<div v-else>
					<van-row type="flex" justify="space-between" class="pa-4 caption sicBo_bet_text"
						style="background-color: #000000;height:100%; position:sticky; z-index: 1;">
						<van-col span="8" class="text-left">
							<div>
								<span>{{$$t('grandTotal')}}：</span><br/>
								<span class="white-text caption-bold">{{currencySymbol}}{{parseFloat(extremeMoney.toFixed(4))}}{{currencyDenomination}}</span>
							</div>
							<div class="mt-1">
								<span>{{$$t('win')}}：</span><br/>
								<span class="white-text caption-bold">{{currencySymbol}}{{parseFloat(currentWin.toFixed(4))}}{{currencyDenomination}}</span>
							</div>
						</van-col>

						<van-col span="16" class="divider_col">
							<div class="flex align-items-center justify-content-center "
								@click.stop="showOverlay=!showOverlay">
								<div>
									<div>{{$$t('remaining')}} <span class="white-text caption-bold">{{betTotal}}</span>
										{{$$t('time')}}
									</div>

									<div class="mt-1 text-center" v-if="isOpen && !isShowDice" style="margin-bottom: 3.5px">
										<div class="flex align-items-center">
											<van-image
												:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num1}.png`"
												width="24" height="24" class="mr-2" />
											<van-image
												:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num2}.png`"
												width="24" height="24" class="mr-2" />
											<van-image
												:src="`/images/lottery/sicBo/${extremeResult && extremeResult.num3}.png`"
												width="24" height="24" class="mr-1" />

											<div class="subtitle-3">
												{{getSum(extremeResult)}}
											</div>

											<div class="ml-1 flex align-items-center">
												<div class="subtitle-3" v-for="(e, index) in getSicBoArray(extremeResult)"
													:key="index">
													<div v-if="index===0">
														<van-tag color="#fa9033" v-if="Number(getSum(extremeResult)) >= 11">
															{{e}}
														</van-tag>
														<van-tag color="#409eff" v-else>{{e}}</van-tag>
													</div>

													<div v-else class="ml-1">
														<van-tag color="#409eff" v-if="Number(getSum(extremeResult))%2==0">
															{{e}}
														</van-tag>
														<van-tag color="#fa9033" v-else>{{e}}</van-tag>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="flex mt-1" v-if="isShowDice || !isOpen">
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
										<img width="30" class="mr-1" src="/images/lottery/sicbo/dice-new.gif" />
									</div>
								</div>
							</div>
							<van-button type="danger" size="mini" class="mt-2 radius-1" v-show="isShowStop"
								@click.stop="isStop = true">{{$$t('stop')}}
							</van-button>
						</van-col>
					</van-row>
				</div>
			</template>

			<!-- 骰宝投注按钮 -->
			<div v-if="!isSicBoLandscape" class="sicBo_bet_center" :style="sicBo_bet_centerStyle">
				<scroller>
					<div class="sicBo_bet_warps px-1 pb-4">
						<template v-for="(item,index) in playType_items">
							<div class="" :key="index">
								<div class="pt-2 text-center px-1" v-if="item.playType === 'DoubleSide'">
									<van-row>
										<template v-for="(doubleSide, i) in item.lotteryBetContent">
											<van-col :span="`${i !== 2 ? 4 : 8}`" :key="i">
												<div class="doubleSide_block text-center"
													:id="`${item.playType}_${doubleSide.betContent}`">
													<div class="bet_money_block white-text caption-bold"
														@click="setSicBoMoney(doubleSide, item.playType)"
														v-if="getSicBo(doubleSide, item.playType)">
														{{getSicBo(doubleSide, item.playType)}}
													</div>

													<div @click="setSicBoBet(doubleSide, item.playType)" v-else>
														<div class="subtitle-5 white-text">
															{{doubleSide.betContentName}}
														</div>
														<div class="caption mt-1 mb-1 sicBo_bet_text">
															1:{{doubleSide.odds}}
														</div>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="px-1" v-else-if="item.playType === 'Sum'">
									<div class="flex align-items-center space-between flex_wrap">
										<template v-for="(sum, i) in item.lotteryBetContent">
											<div class="sum_block" :id="`${item.playType}_${sum.betContent}`" :key="i">
												<div class="bet_money_block" @click="setSicBoMoney(sum, item.playType)"
													v-if="getSicBo(sum, item.playType)">
													{{getSicBo(sum, item.playType)}}
												</div>
												<div class="text-center bet_block"
													@click="setSicBoBet(sum, item.playType)" v-else>
													<div class="white-text subtitle-3">{{sum.betContent}}</div>
													<div class="sicBo_bet_text">1:{{sum.odds}}</div>
												</div>
											</div>
										</template>
									</div>
								</div>

								<div class="px-1 flex" v-else-if="item.playType === 'Paigow'">
									<div class="sum_odds px-2 sicBo_bet_text flex align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>

									<div class="flex align-items-center space-between flex_wrap">
										<template v-for="(paigow, i) in item.lotteryBetContent">
											<div class="paigow_block text-center"
												:id="`${item.playType}_${paigow.betContent.replace(/&/g, '')}`"
												:key="i">
												<div class="bet_money_block"
													@click="setSicBoMoney(paigow, item.playType)"
													v-if="getSicBo(paigow, item.playType)">
													{{getSicBo(paigow, item.playType)}}
												</div>
												<div class="flex justify-content-center align-items-center py-2"
													@click="setSicBoBet(paigow, item.playType)" v-else>
													<van-image :src="`/images/lottery/sicBo/${e}.png`"
														v-for="(e, i) in getPaigowArray(paigow.betContent)" :key="i"
														width="20" height="20" :class="{'mr-1': i === 0}">
													</van-image>
												</div>
											</div>
										</template>
									</div>
								</div>

								<div class="px-1 flex" v-else-if="item.playType === 'Double'">
									<div class="sum_odds px-1 sicBo_bet_text flex align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>
									<van-row style="width: 100%;">
										<template v-for="(double, i) in item.lotteryBetContent">
											<van-col span="4" :key="i">
												<div class="double_block text-center"
													:id="`${item.playType}_${double.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(double, item.playType)"
														v-if="getSicBo(double, item.playType)">
														{{getSicBo(double, item.playType)}}
													</div>
													<div class="flex justify-content-center align-items-center py-3"
														@click="setSicBoBet(double, item.playType)" v-else>
														<van-image
															:src="`/images/lottery/sicBo/${double.betContentName}.png`"
															width="14" height="14" class="mr-1"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${double.betContent}.png`"
															width="14" height="14"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="px-1 flex" v-else-if="item.playType === 'ThreeNum'">
									<div class="sum_odds px-1 sicBo_bet_text flex align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>
									<van-row style="width: 100%;">
										<template v-for="(threeNum, i) in item.lotteryBetContent">
											<van-col span="4" :key="i">
												<div class="threeNum_block text-center"
													:id="`${item.playType}_${threeNum.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(threeNum, item.playType)"
														v-if="getSicBo(threeNum, item.playType)">
														{{getSicBo(threeNum, item.playType)}}
													</div>
													<div class="flex justify-content-center align-items-center py-3"
														@click="setSicBoBet(threeNum, item.playType)" v-else>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="px-1" v-else-if="item.playType === 'SingleNumber'">
									<van-row>
										<template v-for="(singleNumber, i) in item.lotteryBetContent">
											<van-col :span="`${24/item.lotteryBetContent.length}`" :key="i">
												<div class="singleNumber_block text-center"
													:id="`${item.playType}_${singleNumber.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(singleNumber, item.playType)"
														v-if="getSicBo(singleNumber, item.playType)">
														{{getSicBo(singleNumber, item.playType)}}
													</div>
													<div class="flex align-items-center justify-content-center py-2"
														@click="setSicBoBet(singleNumber, item.playType)" v-else>
														<div class="white-text subtitle-3 mr-3">
															{{singleNumber.betContent}}
														</div>
														<van-image
															:src="`/images/lottery/sicBo/${singleNumber.betContent}.png`"
															width="20" height="20"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>
						</template>

						<div class="caption text-center sicBo_bet_text explanation_text mx-1 py-1">
							<div class="px-1 flex align-items-center justify-content-center">
								<div class="mr-8">{{$$t('sicBo_text_1')}}</div>
								<div class="mr-8">{{$$t('sicBo_text_2')}}</div>
								<div>{{$$t('sicBo_text_3')}}</div>
							</div>
						</div>
					</div>
				</scroller>
			</div>
			<div v-else class="sicBo_bet_center" style="top: 1.5rem !important; bottom: 1.9rem !important">
				<scroller>
					<div class="sicBo_bet_warps px-1 pb-3 flex" style="flex-wrap: wrap;">
						<template v-for="(item,index) in playType_items">
							<div class="" :key="index" :style="`flex: 0 0 ${['Double', 'ThreeNum', 'DoubleSide', 'SingleNumber'].includes(item.playType) ? '50%' : '100%'};`">
								<div class="pt-2 text-center pl-1" v-if="item.playType === 'DoubleSide'">
									<van-row>
										<template v-for="(doubleSide, i) in item.lotteryBetContent">
											<van-col :span="`${i !== 2 ? 4 : 8}`" :key="i">
												<div class="doubleSide_block text-center"
													:id="`${item.playType}_${doubleSide.betContent}`">
													<div class="bet_money_block white-text caption-bold"
														@click="setSicBoMoney(doubleSide, item.playType)"
														v-if="getSicBo(doubleSide, item.playType)">
														{{getSicBo(doubleSide, item.playType)}}
													</div>

													<div @click="setSicBoBet(doubleSide, item.playType)" v-else>
														<div class="subtitle-5 white-text">
															{{doubleSide.betContentName}}
														</div>
														<div class="caption mt-1 mb-1 sicBo_bet_text">
															1:{{doubleSide.odds}}
														</div>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="px-1" v-else-if="item.playType === 'Sum'">
									<div class="flex align-items-center space-between flex_wrap">
										<template v-for="(sum, i) in item.lotteryBetContent">
											<div class="sum_block" :id="`${item.playType}_${sum.betContent}`" :key="i" style="width: 7.1428%">
												<div class="bet_money_block" @click="setSicBoMoney(sum, item.playType)"
													v-if="getSicBo(sum, item.playType)">
													{{getSicBo(sum, item.playType)}}
												</div>
												<div class="text-center bet_block"
													@click="setSicBoBet(sum, item.playType)" v-else>
													<div class="white-text subtitle-3">{{sum.betContent}}</div>
													<div class="sicBo_bet_text">1:{{sum.odds}}</div>
												</div>
											</div>
										</template>
									</div>
								</div>

								<div class="px-1 flex" v-else-if="item.playType === 'Paigow'">
									<div class="sum_odds px-2 sicBo_bet_text flex align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>

									<div class="flex align-items-center space-between flex_wrap">
										<template v-for="(paigow, i) in item.lotteryBetContent">
											<div class="paigow_block text-center"
												style="width: 6.6666%; min-height: 1.6rem; display: flex; justify-content: center; align-items: center;" 
												:id="`${item.playType}_${paigow.betContent.replace(/&/g, '')}`"
												:key="i">
												<div class="bet_money_block"
													@click="setSicBoMoney(paigow, item.playType)"
													v-if="getSicBo(paigow, item.playType)">
													{{getSicBo(paigow, item.playType)}}
												</div>
												<div class="flex justify-content-center align-items-center py-2"
													style="flex-direction: column;"
													@click="setSicBoBet(paigow, item.playType)" v-else>
													<van-image :src="`/images/lottery/sicBo/${e}.png`"
														v-for="(e, i) in getPaigowArray(paigow.betContent)" :key="i"
														width="20" height="20" :class="{'mb-1': i === 0}">
													</van-image>
												</div>
											</div>
										</template>
									</div>
								</div>

								<div class="pl-1" v-else-if="item.playType === 'Double'">
									<div class="sum_odds px-1 sicBo_bet_text flex justify-content-center align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>
									<van-row style="width: 100%;">
										<template v-for="(double, i) in item.lotteryBetContent">
											<van-col span="4" :key="i">
												<div class="double_block text-center"
													style="min-height: 1.1rem;"
													:id="`${item.playType}_${double.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(double, item.playType)"
														v-if="getSicBo(double, item.playType)">
														{{getSicBo(double, item.playType)}}
													</div>
													<div class="flex justify-content-center align-items-center py-3"
														@click="setSicBoBet(double, item.playType)" v-else>
														<van-image
															:src="`/images/lottery/sicBo/${double.betContentName}.png`"
															width="14" height="14" class="mr-1"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${double.betContent}.png`"
															width="14" height="14"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="pr-1" v-else-if="item.playType === 'ThreeNum'">
									<div class="sum_odds px-1 sicBo_bet_text flex justify-content-center align-items-center">
										1:{{item.lotteryBetContent[0].odds}}
									</div>
									<van-row style="width: 100%;">
										<template v-for="(threeNum, i) in item.lotteryBetContent">
											<van-col span="4" :key="i">
												<div class="threeNum_block text-center"
													style="min-height: 1.1rem;"
													:id="`${item.playType}_${threeNum.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(threeNum, item.playType)"
														v-if="getSicBo(threeNum, item.playType)">
														{{getSicBo(threeNum, item.playType)}}
													</div>
													<div class="flex justify-content-center align-items-center py-3"
														@click="setSicBoBet(threeNum, item.playType)" v-else>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
														<van-image
															:src="`/images/lottery/sicBo/${threeNum.betContent}.png`"
															width="14" height="14"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>

								<div class="pt-2 pr-1" v-else-if="item.playType === 'SingleNumber'">
									<van-row>
										<template v-for="(singleNumber, i) in item.lotteryBetContent">
											<van-col :span="`${24/item.lotteryBetContent.length}`" :key="i">
												<div class="singleNumber_block text-center flex justify-content-center align-items-center"
													style="height: 1.33333rem;"
													:id="`${item.playType}_${singleNumber.betContent}`">
													<div class="bet_money_block"
														@click="setSicBoMoney(singleNumber, item.playType)"
														v-if="getSicBo(singleNumber, item.playType)">
														{{getSicBo(singleNumber, item.playType)}}
													</div>
													<div class="flex align-items-center justify-content-center py-2"
														@click="setSicBoBet(singleNumber, item.playType)" v-else>
														<div class="white-text subtitle-3 mr-3">
															{{singleNumber.betContent}}
														</div>
														<van-image
															:src="`/images/lottery/sicBo/${singleNumber.betContent}.png`"
															width="20" height="20"></van-image>
													</div>
												</div>
											</van-col>
										</template>
									</van-row>
								</div>
							</div>
						</template>

						<div class="px-1" style="flex: 0 0 100%">
							<div class="caption text-center sicBo_bet_text explanation_text py-1 mb-3">
								<div class="px-1 flex align-items-center justify-content-center">
									<div class="mr-8">{{$$t('sicBo_text_1')}}</div>
									<div class="mr-8">{{$$t('sicBo_text_2')}}</div>
									<div>{{$$t('sicBo_text_3')}}</div>
								</div>
							</div>
						</div>
					</div>
				</scroller>
			</div>

			<div  v-if="isSicBoLandscape" class="sicBo_nav_b radius-2 px-2 py-2">
				<div class="flex justify-content-center align-items-center">
					<div class="sicBo_nav_b_msg_info radius-3 white-text mb-2" v-if="Number(sicBoBetMoney) > 0" style="bottom: 1.6rem">
						<div class="body-2">
							{{handleLangOfNumber(sicBoBetNumber)}}，{{currencySymbol}}{{sicBoBetMoney}}{{currencyDenomination}}
						</div>
					</div>
				</div>

				<div class="flex">
					<div class="flex" style="width: 45%;">
						<vue-touch-scroll type="horizontal" hide-scrollbar>
							<div class="money_number flex align-items-center space-between white-text body-2">
								<div class="money_block_bg" v-for="(e, index) in sicBoMoneys" :key="index">
									<div class="money_block" :style="getActiveBicMoney(e, index + 1)"
										@click="selectSicboMoney(e.toString(), index)">
										<div class="money_block_text">{{e}}</div>
									</div>
								</div>
							</div>
						</vue-touch-scroll>
					</div>	

					<div class="pl-2 flex align-items-center" style="margin: -0.2rem 0; flex: 1; background: #000;position: relative;">
						<div class="flex align-items-center space-between" style="flex: 1;">
							<div class="text-left mr-1">
								<div class="white-text caption-bold">
									{{$$t('balance')}}：
								</div>
								<div class="sicBo_bet_text subtitle-1 mt-1">
									{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
								</div>
							</div>

							<div class="bet_new">
								<van-button class="radius-2" color="linear-gradient(to bottom, #ffe79f, rgb(249, 208, 85))"
									:disabled="isDisabled || isSeal" @click="onBetSicBo">
									<span class="subtitle-3 text-black">{{$$t('bet')}}</span>
								</van-button>
							</div>

							<!-- 路子图-对话框	-->
							<div class="set-chip" @click="showResultsRoadData = true" style="padding: 5px;">
								<van-icon name="setting" color="#fff"/>
								<div class="white-text caption">{{$$t('_9')}}</div>
							</div>

							<!-- 筹码设置	 -->
							<div class="set-chip" @click="showChipSet = true" style="padding: 5px;"> 
								<van-icon name="setting" color="#fff"/>
								<div class="white-text caption">{{$$t('_7')}}</div>
							</div>

							<!-- 清空 -->
							<div class="set-chip mr-2" @click="onClear" style="padding: 5px;">
								<van-icon name="delete" color="#fff" />
								<div class="white-text caption">{{$$t('clear')}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-else class="sicBo_nav_b radius-2 px-1 py-2">
				<div class="flex justify-content-center align-items-center">
					<div class="sicBo_nav_b_msg_info radius-3 white-text mb-2" v-if="Number(sicBoBetMoney) > 0">
						<div class="body-2">
							{{handleLangOfNumber(sicBoBetNumber)}}，{{currencySymbol}}{{sicBoBetMoney}}{{currencyDenomination}}
						</div>
					</div>
				</div>

				<div class="flex" style="width: 100%;">
					<vue-touch-scroll type="horizontal" hide-scrollbar>
						<div class="money_number flex align-items-center space-between white-text body-2">
							<div class="money_block_bg" v-for="(e, index) in sicBoMoneys" :key="index">
								<div class="money_block" :style="getActiveBicMoney(e, index + 1)"
									@click="selectSicboMoney(e.toString(), index)">
									<div class="money_block_text">{{e}}</div>
								</div>
							</div>
						</div>
					</vue-touch-scroll>
				</div>	

				<div class="mt-2 px-1">
					<div class="flex align-items-center space-between">
						<div class="text-left">
							<div class="white-text caption-bold">
								{{$$t('balance')}}：
							</div>
							<div class="sicBo_bet_text subtitle-1 mt-1">
								{{currencySymbol}}{{memberData && memberData.balance}}{{currencyDenomination}}
							</div>
						</div>

						<div class="bet_new">
							<van-button class="radius-2" color="linear-gradient(to bottom, #ffe79f, rgb(249, 208, 85))"
								:disabled="isDisabled || isSeal" @click="onBetSicBo">
								<span class="subtitle-3 text-black">{{$$t('bet')}}</span>
							</van-button>
						</div>

						<div class="set-chip" @click="showResultsRoadData = true">
							<van-icon name="setting" color="#fff"/>
							<div class="white-text caption">{{$$t('_9')}}</div>
						</div>

						<div class="set-chip" @click="showChipSet = true">
							<van-icon name="setting" color="#fff"/>
							<div class="white-text caption">{{$$t('_7')}}</div>
						</div>

						<div class="clear_money" @click="onClear">
							<div class="mt-4 white-text caption">{{$$t('clear')}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <van-overlay :show="showOverlay" class-name="overlay" z-index="3" @click.stop="showOverlay=false"> -->
		<!-- 近10个开奖 -->
		<van-popup
		v-model="showOverlay"
		round
		:close-on-popstate="true"
		position="bottom"
		get-container="#lottery"
		:style="{ height: '70%' }"
		>
			<div class="overlaywrapper">
				<div class="lists">
					<scroller
					:on-infinite="() => $_throttle(onGetRecentResults())"
					:refreshText="null"
					:noDataText="null"
					ref="lottery_results_scroller">
					<van-row class="top">
						<van-col span="4" class="van-ellipsis">{{$$t('datesNumber')}}</van-col>
						<van-col span="11" class="van-ellipsis">{{$$t('openNumber')}}</van-col>
						<van-col span="9" class="van-ellipsis">{{$$t('openTime')}}</van-col>
					</van-row>

					<van-divider class="ma-0" />

					<template v-for="(r, index) in results">
						<div class="list" :class="{striped: (index)%2}" :key="index">
							<van-row>
								<van-col span="4" class="body-2">{{r.dates}}</van-col>
								<van-col span="11">
									<div class="flex align-items-center justify-content-center"
										v-if="r.groupName === 'Lucky3'">
										<div class="mr-3 white-text body-2 number">{{r.num}}</div>
										<van-image :src="`/images/lottery/${getColors(r.color)}.png`" width="24"
											height="20" />
									</div>

									<div class="flex align-items-center justify-content-center"
										v-else-if="r.groupName === 'Rps'">
										<van-image :src="`/images/lottery/rps/${getMora(r.mora)}.png`" width="20"
											height="20" />
										<van-image :src="`/images/lottery/rps/Banker_${r.num1}.png`" width="20"
											height="20" class="ml-1" />
										<van-image :src="`/images/lottery/rps/Player_${r.num2}.png`" width="20"
											height="20" class="ml-1" />
									</div>

									<div class="flex flex-wrap align-items-center justify-content-center"
										v-else-if="r.groupName === 'SeDie'">
										<div>
											<template v-for="(ru, index) in r.num && r.num.split(',')">
												<van-image :src="`/images/lottery/guess/${ru}.png`" width="20" height="20"
													:key="index" class="mr-2" />
											</template>
										</div>
										<div class="flex">
											<div class="mr-1">
												<span class="tag-yellow" :style="{'background-color': colorOfNumParseType[r.numParseType]}">{{ r.numParseType }}</span>
											</div>  
											<div class="mr-1">
												<span class="tag-yellow" v-if="r.num.split(',').map(Number).reduce((prev, curr) => prev + curr)< 6 && r.numParseType !== '2'">{{
												r.numDx
												}}</span>
												<span class="tag-green" v-else-if="r.numParseType === '2'">{{
												r.numDx
												}}</span>
												<span class="tag-blue" v-else>{{ r.numDx }}</span>
											</div>
											<div class="mr-1">
												<span class="tag-blue" v-if="r.num.split(',').map(Number).reduce((prev, curr) => prev + curr) % 2 === 0">{{
												r.numDs
												}}</span>
												<span class="tag-yellow" v-else>{{ r.numDs }}</span>
											</div>
										</div>
									</div>

									<div class="sicBo-results flex align-items-center"
										v-else-if="r.groupName === 'SicBo'">
										<van-image :src="`/images/lottery/sicBo/${r.num1}.png`" width="20"
											height="20" />
										<van-image :src="`/images/lottery/sicBo/${r.num2}.png`" width="20" height="20"
											class="ml-1" />
										<van-image :src="`/images/lottery/sicBo/${r.num3}.png`" width="20" height="20"
											class="ml-1" />

										<div class="num caption-bold ml-1">
											{{getSum(r)}}
										</div>

										<div class="ml-1 flex align-items-center">
											<div class="caption-bold" v-for="(e, index) in getSicBoArray(r)"
												:key="index">
												<div v-if="index===0">
													<van-tag color="#fa9033" v-if="Number(getSum(r)) >= 11 && e !== 'T'">{{e}}
													</van-tag>
													<van-tag color="#07c30d" v-else-if="e === 'T'">{{e}}
													</van-tag>
													<van-tag color="#409eff" v-else>{{e}}</van-tag>
												</div>

												<div v-else class="ml-1">
													<van-tag color="#409eff" v-if="Number(getSum(r))%2==0 && e !== 'T'">{{e}}
													</van-tag>
													<van-tag color="#07c30d" v-else-if="e === 'T'">{{e}}
													</van-tag>
													<van-tag color="#fa9033" v-else>{{e}}</van-tag>
												</div>
											</div>
										</div>
									</div>

									<div v-else>
										<van-image :src="`/images/lottery/${r.num1}.png`" width="24" height="20" />
										<van-image :src="`/images/lottery/${r.num2}.png`" width="24" height="20"
											class="ml-1" />
										<van-image :src="`/images/lottery/${r.num3}.png`" width="24" height="20"
											class="ml-1" />
									</div>
								</van-col>
								<van-col span="9" class="body-2">{{r.createTime}}</van-col>
							</van-row>
						</div>
					</template>
					</scroller>
				</div>
			</div>
		</van-popup>
		
		<!-- 近期投注 -->
		<van-popup v-model="showPopup" round :close-on-popstate="true" position="bottom" get-container="#lottery"
			:style="{ height: '70%' }">
			<div class="py-2 px-4">
				<van-row type="flex" align="center">
					<van-col span="4" class="text-left">
						<van-icon name="cross" size="18" @click="showPopup=false" />
					</van-col>
					<van-col span="16">
						<van-tabs v-model="tab" animated ellipsis swipeable title-active-color="rgb(64, 128, 255)"
							title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
							<van-tab :title="$$t('tab_1')" name="0"></van-tab>
							<van-tab :title="$$t('tab_2')" name="3"></van-tab>
						</van-tabs>
					</van-col>
					<van-col span="4" class="text-right">
						<div class="caption main-text van-ellipsis" @click="goBetLists">
							{{$$t('betNotes')}}
						</div>
					</van-col>
				</van-row>
			</div>

			<div class="betLists">
				<scroller>
					<div class="px-4 pb-4" v-if="betLists.length > 0">
						<div class="betList van-hairline--surround px-3 mb-2" v-for="(item, index) in betLists"
							:key="index" @click="goDetails(item)">
							<div class="top flex space-between align-items-center van-hairline--top-bottom">
								<div class="caption">{{item.createTime}}</div>
								<div class="caption text-grey">{{$$t('first')}}{{datesMaker(item.dates)}}</div>
							</div>

							<div class="py-2 radius-1 flex space-between align-items-center">
								<div class="text-left">
									<div class="flex align-items-center">
										<div class="subtitle-1">{{item.lotteryName}}<strong class="mx-1">—</strong>
										</div>
										<div class="betContent subtitle-1" v-if="item.playType === 'Single'">
											{{item.betContent}}
										</div>

										<div v-else-if="item.groupName === 'Rps'">
											<div v-if="item.playType === 'Rps_Banker_Player'">
												<template v-for="(img, index) in getRpsBankerLists(item)">
													<van-image :src="`/images/lottery/rps/${img}.png`" width="24"
														height="24" class="mr-1" :key="index" />
												</template>
											</div>

											<div v-else-if="item.playType === 'Rps_Mora'">
												<van-image :src="`/images/lottery/rps/${item.betContent}.png`"
													width="24" height="24" v-if="culture === 'zh-CN'" />

												<van-image :src="`/images/lottery/rps/${item.betContent}_en.png`"
													width="24" height="24" v-else />
											</div>

											<van-image :src="`/images/lottery/rps/${item.betContent}.png`" width="24"
												height="24" v-else />
										</div>

										<van-image :src="`/images/lottery/guess/${item.betContent}.png`" height="24"
											v-else-if="item.playType === 'Guess'" />
										<div class="subtitle-1 " v-else-if="item.playType === 'DoubleSide'">
											{{item.betContentName}}
										</div>

										<div v-else-if="item.groupName === 'SicBo'">
											<div class="subtitle-3" v-if="item.playType === 'Sum'">
												{{item.betContent}}({{item.playTypeName}})
											</div>

											<div class="flex align-items-center" v-else>
												<van-image :src="`/images/lottery/sicBo/${e}.png`"
													v-for="(e, i) in getPaigowArray(item.betContent)" :key="i"
													width="20" height="20" :class="{'mr-1': i === 0}">
												</van-image>
											</div>
										</div>

										<van-image :src="`/images/lottery/${getColors(item.betContent)}.png`" width="28"
											height="24" v-else />
									</div>

									<div class="subtitle-1 bet_money mt-1">
										{{$$t('betMoney')}}：{{item.currencySymbol}}{{item.money}}{{item.currencyDenomination}}
									</div>
								</div>

								<div class="flex space-between align-items-center text-right">
									<div>
										<div class="subtitle-1"
											:class="{status_0 : Number(item.status) === 0,status_1 : Number(item.status) === 1}">
											{{item.statusDesc}}
										</div>

										<div class="subtitle-3 mt-2 " :class="{status_1 : Number(item.status) === 1}"
											v-if="Number(item.status) === 1">{{item.currencySymbol + item.winMoney +
                                            item.currencyDenomination}}
										</div>
										<div class="mt-2" v-else>- -</div>
									</div>
									<div class="ml-4">
										<van-icon name="arrow" size="16" />
									</div>
								</div>
							</div>
						</div>
					</div>

					<van-empty v-else :description="$t('common.noMore')" class="text-center background-white">
						<template #image>
							<van-image src="/images/empty/no-more.png" width="280" height="130" />
						</template>
					</van-empty>

				</scroller>
			</div>
		</van-popup>

		<van-dialog v-model="showDialog" :title="$$t('betTitle')" show-cancel-button
			confirmButtonColor="rgb(91, 127, 251)" @confirm="betDialogConfirm" @cancel="betDialogCancel">
			<div class="px-4 py-3">
				<div class="text-left caption text-grey">{{$$t('consecutive')}}：</div>
				<van-field v-model="betTotal" :placeholder="$$t('consecutive_p')" clearable readonly type="digit"
					class="mt-3" />
				<ul>
					<li v-for="(item,i) in betTotals" :key="i" :class="{active:Number(betTotal) === item}"
						@click="betTotal=item">{{item}}</li>
				</ul>
			</div>
		</van-dialog>


		<van-dialog v-model="showConsecutive" :title="$t('common.point')" confirmButtonColor="rgb(91, 127, 251)"
			@confirm="onTotalConfirm">
			<div class="subtitle-1 text-center pa-4">
				<div>{{$$t('betTitle')}}: <span class="main-text caption-bold">{{consecutiveNumber}}</span>
					{{$$t('time')}}
				</div>
				<div class="mt-2">{{$$t('grandTotal')}}: <span
						class="main-text caption-bold">{{currencySymbol}}{{parseFloat(extremeMoney.toFixed(4))}}{{currencyDenomination}}</span>
				</div>
			</div>
		</van-dialog>

		<!-- 骰宝路子图对话框 -->
		<van-dialog v-model="showResultsRoadData" :title="$$t('_9')" confirmButtonColor="rgb(91, 127, 251)"
			className="sicbo-roadData-dialog" :style="isSicBoLandscape ? 'width: 600px; min-height: auto;height: 80vmin !important;' : ''">
			<div class="subtitle-1 text-center">
					<div v-if="results_road_data.length" class="roadmap mt-2"
					:key="`SicBo-${roadmapContro}`">
						<div class="title-bar">
							<span v-for="(item,i) in results_roadmap_sicbo_bar" :key="i">
								<span :class="roadmapstyle(item)">
									{{!Number(item) && Number(item) !== 0 ? $$t(item) : item }}</span>{{ results_roadmap_sicbo[item].toString().replace(/\s*/g,"")}}
							</span>
						</div>
						<div class="flex">
							<div class="contro">
								<!-- 珠仔 -->
								<div @click="roadmapContro = 1" :class="['contro-btn',{'current_active':roadmapContro===1}]">{{$$t('_12')}}</div>
								<!-- 和值 -->
								<div @click="roadmapContro = 2" :class="['contro-btn',{'current_active':roadmapContro===2}]">{{$$t('_10')}}</div>
								<!-- 大小 -->
								<div @click="roadmapContro = 3" :class="['contro-btn',{'current_active':roadmapContro===3}]">{{$$t('_4')}}</div>
								<!-- 单双 -->
								<div @click="roadmapContro = 4" :class="['contro-btn',{'current_active':roadmapContro===4}]">{{$$t('_5')}}</div>
							</div>
							<vue-touch-scroll type="horizontal" hide-scrollbar>
							<div class="balls">
								<div v-for="(big,bi) in results_roadmap_sicbo.balls" :key="bi" class="flex">
									<div v-if="roadmapContro === 1" class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small" class="sicbo-ball">
												{{small}}
											</div>
										</div>
									</div>
									<div v-else class="flex flex-d-column">
										<div v-for="(small,si) in big" :key="si" class="cell">
											<div v-if="small && si === 0 && roadmapContro !== 2" class="length-cell">
												{{big.filter(t => t).length}}
											</div>
											<div v-if="small && roadmapContro === 2" class="ball" :class="[{
												'ball-red': bi % 2 !== 0,
												'ball-blue': bi % 2 === 0
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 3" class="ball" :class="[{
												'ball-red': +(small) < 11,
												'ball-blue': +(small) > 10
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
											<div v-if="small && roadmapContro === 4" class="ball" :class="[{
												'ball-red': +(small) % 2 === 0,
												'ball-blue': +(small) % 2 !== 0,
												}]">
												{{transeName(small,roadmapContro)}}
											</div>
										</div>
									</div>
								</div>
							</div>
							</vue-touch-scroll>
						</div>
					</div>
			</div>
		</van-dialog>
		
		<van-popup
		v-model="showLucky3ChipSet"
		round
		:close-on-popstate="false"
		@close="saveLucky3ToSession"
		position="bottom"
		get-container="#lottery"
		:style="{ height: showChipSet_height, 'background-color':'#333' }"
		>
			<div class="flex my-3 align-items-center pl-3">
				<van-icon name="setting" color="#fff"/>
				<span class="white-text ml-2 showChipSet-title">{{$$t('_7')}}</span>
			</div>
			<div class="flex showChipSet-money-box" :key="lucky3Moneys[7]">
				<div class="showChipSet-money-bg" v-for="(ele, index) in lucky3MoneysMap" :key="index"
				:class="{ select :lucky3Moneys.findIndex(t => t === ele) > -1 }">
					<div class="showChipSet-money" :style="getLucky3MoneyImgforChipSet(ele)"
						@click="setLucky3Moneys(ele, index)">
						{{ ele }}
					</div>
				</div>
			</div>
			<!-- 自定義區 -->
			<div class="flex showChipSet-money-box pt-0">
				<div  v-for="(ele, index2) in lucky3Custom" :key="index2">
					<div class="showChipSet-money-bg" :class="[{ pointer: showNumberKeyboardIndex === index2,select : ele !== '' && lucky3Moneys.findIndex(t => t === +(ele)) > -1 }]">
						<div class="showChipSet-money" :style="getLucky3MoneyImgforChipSet2(ele)"
							@click="setLucky3Moneys(ele, index2, 'lucky3Custom')">
							<div class="showChipSet-money-text">{{ ele === '' ? '?' : ele}}</div>
						</div>
					</div>
					<van-icon class="edit" name="edit" size="30" color="#fff" @click="editLucky3Moneys(ele, index2)"/>
				</div>
			</div>
			<div v-if="showNumberKeyboard" class="pre_show">
				<van-field v-model="lucky3Custom_preShow" type="digit" center placeholder="1~9999999">
					<span slot="left-icon">{{currencySymbol}}</span>
					<span slot="right-icon">{{currencyDenomination}}</span>
				</van-field>
			</div>
			<van-number-keyboard
				v-model="lucky3Custom_preShow"
				:show="showNumberKeyboard"
				:maxlength="7"
				@close="saveLucky3Custom(lucky3Custom_preShow,showNumberKeyboardIndex)"
				:close-button-text="$t('common.complete')"
				:hide-on-click-outside="false"
				theme="custom"
			/>
		</van-popup>

		<van-popup
		v-model="showChipSet"
		round
		:close-on-popstate="false"
		@close="saveToSession"
		position="bottom"
		get-container="#lottery"
		:style="{ height: isSicBoLandscape ? '80%' : showChipSet_height, 'background-color':'#333' }"
		>
			<div class="flex my-3 align-items-center pl-3">
				<van-icon name="setting" color="#fff"/>
				<span class="white-text ml-2 showChipSet-title">{{$$t('_7')}}</span>
			</div>
			<div class="flex showChipSet-money-box" :key="sicBoMoneys[7]">
				<div class="showChipSet-money-bg" v-for="(ele, index) in sicBoMoneysMap" :key="index"
				:class="{ select :sicBoMoneys.findIndex(t => t === ele) > -1 }">
					<div class="showChipSet-money" :style="getMoneyImgforChipSet(ele)"
						@click="setSicBoMoneys(ele, index)">
						{{ ele }}
					</div>
				</div>
			</div>
			<!-- 自定義區 -->
			<div class="flex showChipSet-money-box pt-0">
				<div  v-for="(ele, index2) in sicBoCustom" :key="index2">
					<div class="showChipSet-money-bg" :class="[{ pointer: showNumberKeyboardIndex === index2,select : ele !== '' && sicBoMoneys.findIndex(t => t === +(ele)) > -1 }]">
						<div class="showChipSet-money" :style="getMoneyImgforChipSet2(ele)"
							@click="setSicBoMoneys(ele, index2, 'sicBoCustom')">
							<div class="showChipSet-money-text">{{ ele === '' ? '?' : ele}}</div>
						</div>
					</div>
					<van-icon class="edit" name="edit" size="30" color="#fff" @click="editSicBoMoneys(ele, index2)"/>
				</div>
			</div>
			<div v-if="showNumberKeyboard" class="pre_show">
				<van-field v-model="sicBoCustom_preShow" type="digit" center placeholder="1~9999999">
					<span slot="left-icon">{{currencySymbol}}</span>
					<span slot="right-icon">{{currencyDenomination}}</span>
				</van-field>
			</div>
			<van-number-keyboard
				v-model="sicBoCustom_preShow"
				:show="showNumberKeyboard"
				:maxlength="7"
				@close="saveSicBoCustom(sicBoCustom_preShow,showNumberKeyboardIndex)"
				:close-button-text="$t('common.complete')"
				:hide-on-click-outside="false"
				theme="custom"
			/>
		</van-popup>

		<!-- 极速下注中 -->
		<div v-show="isShowStop">
			<div class="van-toast van-toast--middle van-toast--success" style="z-index: 6;">
				<i class="van-icon van-icon-success van-toast__icon" />
				<div class="van-toast__text">{{$$t('_14')}}</div>
			</div>
		</div>

		<AllLotteryPop 
		:showAllLotteryPop="showLotteryLists" 
		@closeAllLotteryPop="showLotteryLists = false"
		/>
	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'
	import AllLotteryPop from "./comps/AllLotteryPop";

	export default {
		name: 'Lottery',
		mixins: [sessionContext],
		components: { AllLotteryPop },
		data: () => ({
			get reloadStatus() {
				return sessionStorage.getItem("sicboReload") || "";
			},
			isSeal: false, // true: 封盤
			isEnabled: true, // false: 禁用
			showPopover: false,
			showOverlay: false,
			showKeyboard: false,
			showPopup: false,
			tab: '0',
			time: 0,
			lottery: '',
			lotterys: [],
			results: [],
			results_road_data: [], // 路子图
			result: {},
			currentTitle: '',
			currentDates: {},
			moneys: [10, 50, 100, 500],
			money: '10',
			betLists: [],
			oldOpen: {
				isOPen: true,
				dates: '',
				time: 0
			},
			inputMoney: [],
			audioDiv: '',
			timeOutDates: null,
			showLotteryLists: false,
			groupItems: [],
			isOpen: false,
			extremeResult: {},
			betTotal: 0,
			extremeMoney: 0,
			extremeInterval: null,
			showDialog: false,
			isShowStop: false, // 急速停止按钮
			betTotals: [1, 20, 50, 100],
			consecutiveNumber: 0,
			currentWin: 0,
			showConsecutive: false,
			isStop: true,
			isStopLucky3: false,
			playType_current: [],
			playType_items: [],
			playType_betContents: [],
			sicBoMoneysMap: [ 1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000,5000, 10000],
			sicBoMoneys: [ 10, 20, 50, 100, 200, 1000, 2000, 10000 ],
			sicBoCustom: ['','','','','',''],
			sicBo_bets: [],
			flick: false,
			changeFirstTime: 0,
			isDisabled: false,
			colorOfNumParseType: ['#34363d','#005bc8','#027338','#e67613','#e9202c'],
			get curParentType() {
				return sessionStorage.getItem("rules_code") || "";
			},
			results_roadmap_bar: ['_6','0','1','2','3','4', 'btn_2', 'btn_3', '_1', 'btn_4', 'btn_5'],
			results_roadmap_sicbo_bar: ['_6','btn_2', 'btn_3', 'btn_4', 'btn_5', '_11'],
			roadmapContro: 1, // 预设珠盘
			showChipSet: false,
			showNumberKeyboardIndex: null,
			showNumberKeyboard: false,
			showChipSet_height: '50%',
			sicBoCustom_preShow: '',
			showResultsRoadData: false, // 显示路子图
			isShowDice: false,
			isSicBoLandscape: false,
			showSicboLandspaceTip: false,
			sicBoOrientation: false,
			showLucky3ChipSet: false,
			lucky3MoneysMap: [ 1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000,5000, 10000],
			lucky3Moneys: [ 10, 20, 50, 100, 200, 1000, 2000, 10000 ],
			lucky3Custom: ['','','','','',''],
			lucky3Custom_preShow: '',
			lucky3Index: 0,
			sicboIndex: 0,
		}),

		watch: {
			sicBoCustom(v){
				for (let i=0; i < v.length; i++){
					this.sicBoCustom[i] = this.sicBoCustom[i].replace(/\b(0+)/gi, "")
				}
			},

			lucky3Custom(v){
				for (let i=0; i < v.length; i++){
					this.lucky3Custom[i] = this.lucky3Custom[i].replace(/\b(0+)/gi, "")
				}
			},

			tab() {
				this.onGetDropBillRecord()
			},

			showOverlay(v) {
				if (v) {
					this.flick = true
					this.onGetRecentResults()
					this.onGetRecentResultItem(this.lottery)
				}
			},

			showPopup(v) {
				if (v) this.onGetDropBillRecord()
			},

			lottery() {
				this.showOverlay = false
				this.onClear()
			},

			money(v) {
				this.money = Number(v).toString()
			},

			result(data) {
				if (!data || this.flick || this.changeFirstTime === 1) {
					++this.changeFirstTime
					return
				}
				const {
					num1,
					num2,
					num3
				} = data
				const nums = [num1, num2, num3]
				const sum = +(num1) + +(num2) + +(num3)
				if (this.playType_items && this.playType_items.length && sum > 0) {
					this.onClear()

					const typeKey = sum % 2 === 0 ? 'even' : 'odd'
					const bigSmall = sum <= 10 ? 'small' : 'big'

					let repeat = nums.filter(function(element, index, arr) {
						return arr.indexOf(element) !== index;
					});

					let uniq = nums.filter(function(element, index, arr) {
						return arr.indexOf(element) === index;
					});
					let combin = []

					if (uniq.length !== 1) {
						document.getElementById(`DoubleSide_${typeKey}`).classList.add('animate-flicker')
						document.getElementById(`DoubleSide_${bigSmall}`).classList.add('animate-flicker')
					}

					if (uniq.length === 1) {
						document.getElementById(`ThreeNum_${uniq[0]}3`).classList.add('animate-flicker')
						document.getElementById('DoubleSide_1').classList.add('animate-flicker')
					} else {
						if (uniq.length === 2) {
							combin.push(uniq[0] + uniq[1])
						} else {
							combin.push(num1 + num2, num1 + num3, num2 + num3)
						}
						for (const item of combin) {
							document.getElementById(`Paigow_${item}`).classList.add('animate-flicker')
						}
					}

					if (uniq.length === 1 || uniq.length === 2) {
						document.getElementById(`Double_${repeat[0]}`).classList.add('animate-flicker')
					}

					if (sum > 3 && sum < 18) document.getElementById(`Sum_${sum}`).classList.add('animate-flicker')
					for (const item of nums) {
						document.getElementById(`SingleNumber_${item}`).classList.add('animate-flicker')
					}
					this.flick = true
					setTimeout(
						() => {
							this.flick = false
							document.getElementById(`DoubleSide_${typeKey}`).classList.remove('animate-flicker')
							document.getElementById(`DoubleSide_${bigSmall}`).classList.remove('animate-flicker')

							if (uniq.length === 1) {
								document.getElementById(`ThreeNum_${uniq[0]}3`).classList.remove('animate-flicker')
								document.getElementById('DoubleSide_1').classList.remove('animate-flicker')
							} else {
								if (uniq.length === 2) {
									combin.push(uniq[0] + uniq[1])
								} else {
									combin.push(num1 + num2, num1 + num3, num2 + num3)
								}
								for (const item of combin) {
									document.getElementById(`Paigow_${item}`).classList.remove('animate-flicker')
								}
							}

							if (uniq.length === 1 || uniq.length === 2) {
								document.getElementById(`Double_${repeat[0]}`).classList.remove('animate-flicker')
							}
							for (const item of nums) {
								document.getElementById(`SingleNumber_${item}`).classList.remove('animate-flicker')
							}
							if (sum > 3 && sum < 18) document.getElementById(`Sum_${sum}`).classList.remove(
								'animate-flicker')
						}, 3000
					)
				}
			},

			currentTitle() {
				this.changeFirstTime = 0
					++this.changeFirstTime
			}
		},

		activated() {
			this.flick = true
			this.showPopover = false
			this.showPopup = false
			let gameCode = sessionStorage.getItem('gameCode_item')
			this.onGetLottery(gameCode)
			this.initMemberData()

			if (this.curParentType === 'SicBo') {
				if (!this.reloadStatus) {
					this.$dialog.alert({
						message: this.$$t('_18'),
					});
				}
				this.searchFormWidth(); // 组件初始化的时候不会触发onresize事件，这里强制执行一次
				window.onorientationchange = () => {
					if(!this.timer){ // 使用节流机制，降低函数被触发的频率
						this.timer = true;
						let that = this; // 匿名函数的执行环境具有全局性，为防止this丢失这里用that变量保存一下
						setTimeout(function(){
							that.searchFormWidth();
							that.timer = false;
						},10)
					}
				}
			}
		},

		computed: {
			results_roadmap(){
				let pre = this.results_road_data
				let balls = pre.map(t => t.numParseType).reverse()
				let sliceBalls = []
				let curIndex = 0
				// balls 以5分段
				switch (this.roadmapContro) {
					case 3:
						// 大小
						for(let i=curIndex; i<balls.length; i++){
							if (curIndex === balls.length) break
							let pre = []
							// big
							if (Number(balls[i])>2){
								for(let i2=curIndex; i2<51; i2++){
									if (Number(balls[i2])>2) {
										pre.push(balls[i2])
										curIndex = i2
										}
									else {
										curIndex = i2
										break
										}
								}
							} else if (Number(balls[i])<2) {
								// small
								for(let i4=curIndex; i4<51; i4++){
									if (Number(balls[i4])<2) {
										pre.push(balls[i4])
										curIndex = i4
										}
									else {
										curIndex = i4
										break
										}
								}
							} else {
								// 和
								for(let i3=curIndex; i3<51; i3++){
									if (Number(balls[i3]) === 2){ 
										curIndex = i3
										pre.push(balls[i3])
										}
									else {
										curIndex = i3
										break
										}
								}
							}
							if (pre.length && pre.length < 5) {
								for(let i = 0; i < +(8 - pre.length); i++){
									pre.push(null)
								}
								pre = pre.slice(0,5)
							}
							sliceBalls.push(pre)
						}
						break;
					case 2:
					case 4:	
						// 点数
						for(let i=curIndex; i<balls.length; i++){
							if (curIndex === balls.length) break
							let pre = []
							if (Number(balls[i])%2 === 0){
								for(let i2=curIndex; i2<51; i2++){
									if (Number(balls[i2])%2 === 0) {
										pre.push(balls[i2])
										curIndex = i2
										}
									else {
										curIndex = i2
										break
										}
								}
							} else {
								for(let i3=curIndex; i3<51; i3++){
									if (Number(balls[i3])%2 !== 0) {
										pre.push(balls[i3])
										curIndex = i3
										}
									else {
										curIndex = i3
										break
										}
								}
							}
							sliceBalls.push(pre)
						}
						break;
					default:
						for(let i=0; i<balls.length; i=i+5){
							sliceBalls.push(balls.slice(i,i+5))
						}	
						break;
				}
				
				let sliceBallsResault = sliceBalls.filter(t => t.length)
				// add empty cell
				const longestLength = this.findLongest(sliceBallsResault)
				for(let i = 0; i < sliceBallsResault.length; i++){
					if (sliceBallsResault[i].length < longestLength){
						let pre_empty = new Array(longestLength-sliceBallsResault[i].length).fill(null);
						sliceBallsResault[i] = sliceBallsResault[i].concat(pre_empty)
					}
				}

				const last_empty = new Array(this.roadmapContro === 1 ? longestLength:longestLength+1).fill(null)
				let empty = []
				// 开头加三排
				for (let i =0; i < 3; i++) empty.push(last_empty)
				let map = {
					balls: sliceBallsResault.concat(empty),
					_6: balls.length, // total
					'0': balls.filter(t => t === '0').length,
					'1': balls.filter(t => t === '1').length,
					'2': balls.filter(t => t === '2').length,
					'3': balls.filter(t => t === '3').length,
					'4': balls.filter(t => t === '4').length,
					btn_5: balls.filter(t => Number(t) %2 === 0).length, // double
					btn_4: balls.filter(t => Number(t) %2 !== 0).length, // single
					btn_2: balls.filter(t => Number(t) > 2).length, // big
					btn_3: balls.filter(t => Number(t) < 2).length, // small
					_1: balls.filter(t => Number(t) === 2).length, // 和
				}
				// console.log('map=>',map);
				return map
			},

			results_roadmap_sicbo(){
				let pre = this.results_road_data
				let balls = pre.map(t => +(t.num1) + +(t.num2) + +(t.num3)).reverse()
				let sauce = pre.map(t => (t.num1) + ',' + (t.num2) + ',' + (t.num3)).reverse()
				let sliceBalls = []
				let curIndex = 0
				// balls 以5分段
				switch (this.roadmapContro) {
					case 1:
						// 珠盘
						for(let i=0; i<balls.length; i=i+5){
							sliceBalls.push(sauce.slice(i,i+5))
						}	
						break;
					case 3:
						// 大小
						for(let i=curIndex; i<balls.length; i++){
							console.log('curIndex=>',curIndex);
							if (curIndex > 50) return
							let pre = []
							// big
							if (Number(balls[i])>10){
								for(let i2=curIndex; i2<51; i2++){
									if (Number(balls[i2])>10) {
										pre.push(balls[i2])
										curIndex = i2
									}
									else {
										curIndex = i2
										break
										}
								}
							} else {
								// small
								for(let i4=curIndex; i4<51; i4++){
									if (Number(balls[i4])<11) {
										pre.push(balls[i4])
										curIndex = i4
										}
									else {
										curIndex = i4
										break
										}
								}
							}

							if (pre.length && pre.length < 5) {
								for(let i = 0; i < +(8 - pre.length); i++){
									pre.push(null)
								}
								pre = pre.slice(0,5)
							}
							sliceBalls.push(pre)
						}
						break;
					case 4:	
						// 单双
						for(let i=curIndex; i<balls.length; i++){
							if (curIndex > 50) return
							let pre = []
							if (Number(balls[i])%2 === 0){
								for(let i2=curIndex; i2<51; i2++){
									if (Number(balls[i2])%2 === 0) {
										pre.push(balls[i2])
										curIndex = i2
										}
									else {
										curIndex = i2
										break
										}
								}
							} else {
								for(let i3=curIndex; i3<51; i3++){
									if (Number(balls[i3])%2 !== 0) {
										pre.push(balls[i3])
										curIndex = i3
										}
									else {
										curIndex = i3
										break
										}
								}
							}
							sliceBalls.push(pre)
						}
						break;
					default:
						// 合值
						for(let i=0; i<balls.length; i=i+5){
							sliceBalls.push(balls.slice(i,i+5))
						}	
						break;
				}
				let sliceBallsResault = sliceBalls.filter(t => t.length)
				// add empty cell
				const longestLength = this.findLongest(sliceBallsResault)
				for(let i = 0; i < sliceBallsResault.length; i++){
					if (sliceBallsResault[i].length < longestLength){
						let pre_empty = new Array(longestLength-sliceBallsResault[i].length).fill(null);
						sliceBallsResault[i] = sliceBallsResault[i].concat(pre_empty)
					}
				}

				const last_empty = new Array(this.roadmapContro === 1 ? longestLength:longestLength+1).fill(null)
				let empty = []
				// 开头加三排
				if (this.roadmapContro === 3 || this.roadmapContro === 4) {
					for (let i =0; i < 3; i++) empty.push(last_empty)
				}
				let map = {
					balls: sliceBallsResault.concat(empty),
					_6: balls.length, // total
					btn_5: balls.filter(t => Number(t) %2 === 0).length, // double
					btn_4: balls.filter(t => Number(t) %2 !== 0).length, // single
					btn_2: balls.filter(t => Number(t) > 10).length, // big
					btn_3: balls.filter(t => Number(t) < 11).length, // small
					_11: pre.filter(t => +(t.num1) === +(t.num2) === +(t.num3)).length // 围骰
				}
				return map
			},

			betNumber() {
				return this.playType_current.length
			},

			betMoney() {
				return Number(this.betNumber) * Number(this.money)
			},

			sicBoBetNumber() {
				return this.sicBo_bets.length
			},

			sicBoBetMoney() {
				let m = 0
				this.sicBo_bets.forEach(e => {
					m += e.money
				})

				return m
			},

			playType_single_btns() {
				return [{
						text: this.$$t('btn_1'),
						code: '1'
					},
					{
						text: this.$$t('btn_2'),
						code: '2'
					},
					{
						text: this.$$t('btn_3'),
						code: '3'
					},
					{
						text: this.$$t('btn_4'),
						code: '4'
					},
					{
						text: this.$$t('btn_5'),
						code: '5'
					},
					{
						text: this.$$t('btn_6'),
						code: '6'
					},
				]
			},

			actions() {
				return [{
						text: this.$$t('dashboard'),
						icon: 'wap-home-o',
						code: 'dashboard'
					},
					{
						text: this.$$t('deposit'),
						icon: 'cash-back-record',
						code: 'deposit'
					},

					{
						text: this.$$t('lotteryRecord'),
						icon: 'notes-o',
						code: 'record'
					},

					{
						text: this.$$t('a_1'),
						icon: 'description',
						code: '1'
					},
					{
						text: this.$$t('a_2'),
						icon: 'balance-list-o',
						code: '2'
					},
					{
						text: this.$$t('a_3'),
						icon: 'question-o',
						code: '3'
					}
				]
			},

			isShowDates() {
				let d = this.lottery
				if (d === 'jsYxx' || d === 'jsLucky3' || d === 'jsRps' || d === 'jsSeDie' || d === 'jsSicBo') return false
				else return true
			},

			isSicBo() {
				let d = this.lottery
				if (d.indexOf('SicBo') > -1) return true
				else return false
			},

			sicBo_bet_centerStyle() {
				if (this.lottery === 'jsSicBo') {
					return {
						top: '22vh !important'
					}
				} else {
					return {}
				}
			}
		},

		methods: {
			searchFormWidth() {
				var userAgent = navigator.userAgent;
				if (this.curParentType !== 'SicBo') return
				if( window.orientation == 180 || window.orientation == 0){
					// 直向
					this.sicBoOrientation = false; 
					this.isSicBoLandscape = false;
					if (this.reloadStatus !== '1') {
						this.checkDeviceToReload(userAgent).then(() => {
							sessionStorage.setItem("sicboReload", '1')
						})
					}
				} else {
					// 横向
					this.sicBoOrientation = true;
					this.isSicBoLandscape = true;
					if (this.reloadStatus !== '2') {
						this.checkDeviceToReload(userAgent).then(() => {
							sessionStorage.setItem("sicboReload", '2')
						})
					}
				}
			},
			async checkDeviceToReload(userAgent){
				// need reload browsers
				if (userAgent.indexOf("GSA") > -1 ||
					userAgent.indexOf("CriOS") > -1 ||
					userAgent.indexOf("Chrome") > -1 || 
					userAgent.indexOf("EdgA") > -1 ){
					setTimeout(() => {
						location.reload()
					}, 100)
				}
			},
			hadleBgColor(val){
				switch ( +(val) ) {
					case 0:
					return 'r-y-btn';
					case 5:
					return 'b-y-btn';
					default:
					if(+(val)%2 === 0) return 'r-btn';
					else return 'b-btn';
				}
			},
			saveLucky3Custom(customVal, lucky3CustomIndex){
				// 檢查重複
				let preIndex = this.lucky3MoneysMap.findIndex(e => +(e) === +(customVal))
				let preIndex2 = this.lucky3Custom.findIndex(e => +(e) === +(customVal))
				const oldCustom = this.lucky3Custom[lucky3CustomIndex]
				const findOldInLucky3MoneysIndex = this.lucky3Moneys.findIndex(e => +(e) === +(oldCustom))

				if (preIndex < 0 && preIndex2 < 0 ) {
					this.lucky3Custom.splice(lucky3CustomIndex, 1, customVal)
					this.showChipSet_height = '50%'
					this.showNumberKeyboard = false

					// 如果之前有選
					if (findOldInLucky3MoneysIndex> 0){
						this.lucky3Moneys.splice(findOldInLucky3MoneysIndex,1, +(customVal)) // 更新選定８個
					}
				} else {
					this.lucky3Custom.splice(lucky3CustomIndex, 1, '')
					this.$error(customVal === '' ? this.$$t('_17') : this.$$t('_8'))
				}
				this.showNumberKeyboardIndex = null // 顯示用
			},
			saveSicBoCustom(customVal, sicBoCustomIndex){
				
				// 檢查重複
				let preIndex = this.sicBoMoneysMap.findIndex(e => +(e) === +(customVal))
				let preIndex2 = this.sicBoCustom.findIndex(e => +(e) === +(customVal))
				const oldCustom = this.sicBoCustom[sicBoCustomIndex]
				const findOldInSicBoMoneysIndex = this.sicBoMoneys.findIndex(e => +(e) === +(oldCustom))

				if (preIndex < 0 && preIndex2 < 0 ) {
					this.sicBoCustom.splice(sicBoCustomIndex, 1, customVal)
					this.showChipSet_height = '50%'
					this.showNumberKeyboard = false

					// 如果之前有選
					if (findOldInSicBoMoneysIndex> 0){
						this.sicBoMoneys.splice(findOldInSicBoMoneysIndex,1, +(customVal)) // 更新選定８個
					}
				} else {
					this.sicBoCustom.splice(sicBoCustomIndex, 1, '')
					this.$error(customVal === '' ? this.$$t('_17') : this.$$t('_8'))
				}
				this.showNumberKeyboardIndex = null // 顯示用
			},
			editLucky3Moneys(customVal, index){
				this.showNumberKeyboardIndex = index
				this.showNumberKeyboard = true
				this.lucky3Custom_preShow = customVal +''
				this.showChipSet_height = '85%'
			},
			editSicBoMoneys(customVal, index){
				this.showNumberKeyboardIndex = index
				this.showNumberKeyboard = true
				this.sicBoCustom_preShow = customVal +''
				this.showChipSet_height = '85%'
			},
			setLucky3Moneys(v){
				if (!v) return
				let preIndex = this.lucky3Moneys.findIndex(e => e === +(v))
				if (preIndex < 0){
					this.lucky3Moneys.push(+(v))
					this.lucky3Moneys.splice(0,1)
				}
			},
			saveLucky3ToSession(){
				this.showNumberKeyboard = false
				this.showChipSet_height = '50%'
				this.lucky3Moneys.sort(function(a, b) {
					return a - b;
				});
				this.$sessionSet(`lucky3Moneys_${this.skgCodeKey}`, this.lucky3Moneys)
				this.$sessionSet(`lucky3Custom_${this.skgCodeKey}`, this.lucky3Custom)
				this.money = this.lucky3Moneys[0]
			},
			setSicBoMoneys(v){
				if (!v) return
				let preIndex = this.sicBoMoneys.findIndex(e => e === +(v))
				if (preIndex < 0){
					this.sicBoMoneys.push(+(v))
					this.sicBoMoneys.splice(0,1)
				}
			},
			saveToSession(){
				this.showNumberKeyboard = false
				this.showChipSet_height = '50%'
				this.sicBoMoneys.sort(function(a, b) {
					return a - b;
				});
				this.$sessionSet(`sicBoMoneys_${this.skgCodeKey}`, this.sicBoMoneys)
				this.$sessionSet(`sicBoCustom_${this.skgCodeKey}`, this.sicBoCustom)
				this.money = this.sicBoMoneys[0]
			},
			getLucky3MoneyImgforChipSet(v) {
				if (this.lucky3Moneys.findIndex(e => e === +(v)) > -1) {
					return {
						top: '-10px',
						backgroundImage: `url('/images/lottery/sicBo/money_${v}.png')`
					}
				} else {
					return {
						top: '0',
						backgroundImage: `url('/images/lottery/sicBo/money_${v}.png')`
					}
				}
			},
			getLucky3MoneyImgforChipSet2(v) {
				if (this.lucky3Moneys.findIndex(e => e === v)>-1) {
					return {
						top: '-10px',
						backgroundImage: `url('/images/lottery/sicBo/money_0.png')`
					}
				} else {
					return {
						top: '0',
						backgroundImage: `url('/images/lottery/sicBo/money_0.png')`
					}
				}
			},
			getMoneyImgforChipSet(v) {
				if (this.sicBoMoneys.findIndex(e => e === +(v)) > -1) {
					return {
						top: '-10px',
						backgroundImage: `url('/images/lottery/sicBo/money_${v}.png')`
					}
				} else {
					return {
						top: '0',
						backgroundImage: `url('/images/lottery/sicBo/money_${v}.png')`
					}
				}
			},
			getMoneyImgforChipSet2(v) {
				if (this.sicBoMoneys.findIndex(e => e === v)>-1) {
					return {
						top: '-10px',
						backgroundImage: `url('/images/lottery/sicBo/money_0.png')`
					}
				} else {
					return {
						top: '0',
						backgroundImage: `url('/images/lottery/sicBo/money_0.png')`
					}
				}
			},
			getLucky3ActiveBicMoney(v, index) {
				if (Number(this.money) === Number(v)) {
					return {
						top: '-8px',
						left: '-2px',
						backgroundImage: `url('/images/lottery/sicBo/money_${index}.png')`
					}
				} else {
					return {
						top: '-1px',
						left: '-1px',
						backgroundImage: `url('/images/lottery/sicBo/money_${index}.png')`
					}
				}
			},
			selectLucky3Money(curMoney, index) {
				this.money = curMoney;
				this.lucky3Index = index;
			},

			selectSicboMoney(curMoney, index) {
				this.money = curMoney;
				this.sicboIndex = index;
			},

			getActiveBicMoney(v, index) {
				if (Number(this.money) === Number(v)) {
					return {
						top: '-6px',
						backgroundImage: `url('/images/lottery/sicBo/money_${index}.png')`
					}
				} else {
					return {
						top: '0',
						backgroundImage: `url('/images/lottery/sicBo/money_${index}.png')`
					}
				}
			},
			findLongest(arra){
				let max_length = arra[0].length;
				for (let i = 1; i < arra.length; i++) {
					let maxi = arra[i].length;
					if (maxi > max_length) {
						max_length = maxi;
					}
				}
				return max_length;
			},
			transeName(val,type){
				switch (type) {
					case 2:
						return val
					case 4:
						// 单双
						if (val %2 === 0) return this.$$t('btn_5')
						else return this.$$t('btn_4')
				
					default:
						console.log('this.lottery===>',this.lottery);
						if (this.curParentType === 'SeDie'){
							// 大小和
							if (+(val) > 2 ) {
								return this.$$t('btn_2')
							} else if (val === '2'){
								return this.$$t('_1')
							} else return this.$$t('btn_3')
						} else {
							if (+(val) > 10) {
								return this.$$t('btn_2')
							} else return this.$$t('btn_3')
						}
	
				}
			},
			roadmapstyle(item){
				if (!Number(item) && Number(item) !== 0) return item
				else return 'number-'+item
			},
			onGetLottery(type) {
				this.showProgress()
				this.$get('/api/Lottery/GetLottery')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (d.length === 0) return
						this.lotterys = d.map(e => {
							return {
								text: e.name,
								value: e.type
							}
						})
						let v = this.lotterys[0]
						this.currentTitle = v.name
						let t = type || v.value
						this.changeLottery(t)
						this.showProgress(false)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
					})
			},

			onGetCurrentDates(t) {
				if (!t) return
				this.$get('/api/Lottery/GetCurrentDates?type=' + t)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (d.secondsRemaining < 0 || !d.isOpen) {
							throw new Error();
						}
						this.isSeal = !d.isOpen;
						this.isEnabled = !d.isEnabled;
						this.currentDates = d
						this.time = Number(d.secondsRemaining) * 1000
						if (d.secondsRemaining === 0) {
							this.isStopLucky3 = false
							setTimeout(() => {
								this.onGetCurrentDates(this.lottery)
							}, 1000)
						} else {
							this.oldOpen.dates = d.lastNo
						}

					})
					.catch(error => {
						this.isStopLucky3 = true
						this.time = 0
						this.isSeal = true;
						this.currentDates = null;
						this.oldOpen = {
							isOPen: true,
							dates: 0,
							time: 0,
						};
						this.procError(error)
					})
			},

			onGetRecentResults(num) {
				if (!this.lottery || this.results.length === 50) {
					this.$refs.lottery_results_scroller.finishInfinite(true)
					return
				}
				let loadmoreNums = this.results.length
				if (loadmoreNums < 50 && !num) loadmoreNums += 10
				this.$get(`/api/Lottery/GetRecentResults?type=${this.lottery}&num=${num ? num : loadmoreNums}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						if (!num) {
							this.results = data.data
						} else {
							this.results_road_data = data.data
						}
					})
					.catch(error => {
						this.procError(error)
					})
					.finally(() => {
						if(this.$refs.lottery_results_scroller){
							this.$refs.lottery_results_scroller.finishInfinite(false)
						}
					});
			},

			onGetRecentResultItem(t, b) {
				if (!t) return
				this.$get(`/api/Lottery/GetRecentResults?type=${t}&num=1`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data;
						let r = d[0];
						if (b) {
							if (!this.oldOpen.dates || Number(r.dates) === Number(this.oldOpen.dates)) {
								this.result = r;
								this.onGetDropBillRecord();
								this.oldOpen.isOPen = true;
								this.oldOpen.time = 10000;
								if (this.curParentType === 'SeDie' || this.curParentType === 'SicBo') this.onGetRecentResults('50')
								this.onClear();
							} else {
								this.timeOutDates = setTimeout(() => {
									this.oldOpen.isOPen = false;
									this.onGetRecentResultItem(this.lottery, true);
								}, 1000);
							}
						} else {
							this.oldOpen.isOPen = true;
							this.result = r;
							this.onGetDropBillRecord();
						}

					})
					.catch(error => {
						this.procError(error);
					})
			},

			onGetPlayType(t) {
				if (!t) return
				this.$get(`/api/Lottery/GetPlayType?type=${t}`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (t.indexOf('SicBo') > -1) {
							let index = d.findIndex(e => e.playType === 'DoubleSide')
							let tIndex = d.findIndex(e => e.playType === 'ThreeS')
							let tContent = d[tIndex].lotteryBetContent[0]
							tContent.betContentName = d[tIndex].playTypeName
							tContent.playType = d[tIndex].playType
							d[index].lotteryBetContent.splice(2, 0, tContent)
							this.playType_items = d.filter(e => e.playType !== 'ThreeS')
						} else {
							this.playType_items = d
						}

					})
					.catch(error => {
						this.procError(error)
					})
			},

			onGetDropBillRecord() {
				this.$get(
						`/api/Lottery/GetDropBillRecord?lotteryType=${this.lottery}&status=${this.tab}&pageIndex=1&pageSize=10`
					)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.betLists = data.data.items
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onBet() {
				if (Number(this.money) <= 0) {
					this.$error(this.$$t('money_t'))
					return
				}

				if (Number(this.money) > this.memberData.balance) {
					this.$error(this.$$t('balance_t'))
					return
				}

				if (this.playType_current.length === 0) {
					this.$error(this.$$t('type_t'))
					return
				}

				let b = this.playType_betContents.map(e => {
					return {
						money: Number(this.money),
						playType: e.playType,
						betContent: e.betContent
					}
				})

				let p = {
					lotteryType: this.lottery,
					dates: this.currentDates.dates,
					betContent: b
				}

				if (this.lottery.indexOf('js') > -1) {
					if (this.isShowStop && this.isStop && this.this.betTotal > 0) {
						this.$info(this.$$t('betting'))
						return;
					}

					this.isOpen = false
					this.betTotal = 1
					this.extremeMoney = 0
					this.consecutiveNumber = 0
					this.showDialog = true
					this.$sessionSet('js-Date', p)
					return;
				}

				this.showProgress()
				this.isDisabled = true
				this.$post('/api/Lottery/Bet', p)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						this.onClear()
						this.initMemberData()
						this.isDisabled = false
						this.$success(data.data)
					})
					.catch(error => {
						this.showProgress(false)
						this.isDisabled = false
						this.procError(error)
					})
			},

			onBetSicBo() {
				if (this.isDisabled || this.isSeal) return

				if (Number(this.money) <= 0) {
					this.$error(this.$$t('money_t'))
					return
				}

				if (Number(this.money) > this.memberData.balance) {
					this.$error(this.$$t('balance_t'))
					return
				}

				if (this.sicBo_bets.length === 0) {
					this.$error(this.$$t('type_t'))
					return
				}

				let b = this.sicBo_bets

				let p = {
					lotteryType: this.lottery,
					dates: this.currentDates.dates,
					betContent: b
				}

				if (this.lottery === 'jsSicBo') {
					if (this.isShowStop && this.isStop && this.this.betTotal > 0) {
						this.$info(this.$$t('betting'))
						return;
					}

					this.isOpen = false
					this.betTotal = 1
					this.extremeMoney = 0
					this.consecutiveNumber = 0
					this.showDialog = true
					this.$sessionSet('js-Date', p)
					return;
				}


				this.showProgress()
				this.isDisabled = true
				this.$post('/api/Lottery/Bet', p)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.showProgress(false)
						this.onClear()
						this.initMemberData()
						this.isDisabled = false
						this.$success(data.data)
					})
					.catch(error => {
						this.showProgress(false)
						this.procError(error)
						this.isDisabled = false
					})

			},

			// 极速时时彩
			onBetExtreme(p) {
				this.isDisabled = true
				this.isShowDice = true
				this.$post('/api/Lottery/Bet', p)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(async (data) => {
						let d = JSON.parse(data.data)
						this.isOpen = true
						this.betTotal -= 1
						this.consecutiveNumber += 1
						this.currentWin = d.win
						this.extremeMoney = this.formatNum(this.extremeMoney + d.win, 2)
						this.onClear()
						this.initMemberData()
						await this.onGetExtremeDropBillRecord()
						if (this.betTotal > 0 && !this.isStop) {
							let _this = this
							setTimeout(function() {
								_this.onBetExtreme(p)
							}, this.curParentType === 'SicBo' ? 1100 : 100);
						} else {
							this.stopInterval()
						}
					})
					.catch(error => {
						this.betTotal = 0
						this.extremeMoney = 0
						this.currentWin = 0
						this.consecutiveNumber = 0
						this.isShowStop = false
						this.isOpen = true
						this.isDisabled = false
						this.stopInterval({error: true})
						this.procError(error)
					})
			},

			onGetExtremeDropBillRecord() {
				this.$get(`/api/Lottery/GetRecentResults?type=${this.lottery}&num=1`)
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.isShowDice = false
						let d = data.data
						if (d.length > 0) {
							this.isOpen = true
							this.extremeResult = d[0]
						} else {
							this.isOpen = false
						}
					})
					.catch(error => {
						this.isShowDice = false
						this.procError(error)
					})
			},

			betDialogConfirm() {
				if (this.betTotal < 1) {
					this.$info(this.$$t('bet_t'))
					return
				}
				let p = this.$sessionGet('js-Date')
				this.isShowStop = true
				this.isStop = false
				this.onBetExtreme(p)
			},

			betDialogCancel() {
				this.betTotal = 0
				this.isOpen = true
				this.isStop = true
				this.$sessionRemove('js-Date')
				this.onClear()
			},

			isNumber(val) {
				val = Number(val)
				return parseFloat(val).toString() !== "NaN";
			},

			stopInterval(error) {
				this.isStop = true
				this.isShowStop = false
				if (!error)this.showConsecutive = true
				this.isDisabled = false
				if (this.curParentType === 'SeDie' || this.curParentType === 'SicBo' ) this.onGetRecentResults('50')
			},

			changeLottery(v) {
				const mapData = JSON.parse(
                            sessionStorage.getItem("gameCategorysLottery")
                        );
				const curBigType = mapData.find(t => (t.type === v) && (t.bigType !== 'hot')).bigType;
				sessionStorage.setItem('rules_code', curBigType)

				if (curBigType === 'PK10' || v === 'xyft' || curBigType === 'K3') {
					sessionStorage.setItem('gameCode_item', v)
					this.$router.push('PK10')
					return
				}
				if (curBigType === 'SSC') {
					sessionStorage.setItem('gameCode_item', v)
					this.$router.push('ssc')
					return
				}
				if (curBigType === 'VNSouth') {
					sessionStorage.setItem('gameCode_item', v)
					this.$router.push('vnsouth')
					return
				}
				if (curBigType === 'Mark6') {
					sessionStorage.setItem('gameCode_item', v)
					this.$router.push('mark6')
					return
				}
				
				this.lottery = v
				this.results = []
				this.currentTitle = this.lotterys.filter(e => e.value === v)[0].text
				this.isStopLucky3 = false
				this.onGetCurrentDates(v)
				if (!this.isShowDates) {
					this.onGetExtremeDropBillRecord()
				} else {
					this.onGetRecentResultItem(v, false)
				}
				if (this.curParentType === 'SeDie' || this.curParentType === 'SicBo' ) this.onGetRecentResults('50')
				this.onGetPlayType(v)
				this.showLotteryLists = false
				this.extremeMoney = 0
				this.consecutiveNumber = 0
				this.currentWin = 0
				this.betTotal = 0
				this.isDisabled = false
				sessionStorage.setItem('gameCode_item', v)
				if (this.curParentType === 'SicBo') {
					if (sessionStorage.getItem(`sicBoCustom_${this.skgCodeKey}`)){
						this.sicBoMoneys = JSON.parse(sessionStorage.getItem(`sicBoMoneys_${this.skgCodeKey}`))
						this.sicBoCustom = JSON.parse(sessionStorage.getItem(`sicBoCustom_${this.skgCodeKey}`))
						this.money = this.sicBoMoneys[this.sicboIndex]
					}
				}

				if (this.curParentType === 'Lucky3' && this.skgCodeKey !== 'SGMGM') {
					if (sessionStorage.getItem(`lucky3Custom_${this.skgCodeKey}`)){
						this.lucky3Moneys = JSON.parse(sessionStorage.getItem(`lucky3Moneys_${this.skgCodeKey}`))
						this.lucky3Custom = JSON.parse(sessionStorage.getItem(`lucky3Custom_${this.skgCodeKey}`))
						this.money = this.lucky3Moneys[this.lucky3Index]
					}
				}
			},

			changeGroup(v) {
				let codeIndex = this.groupItems.findIndex(e => e.type === v)
				sessionStorage.setItem('group_code_index', codeIndex)
			},

			onFinish() {
				if (!this.isShowDates || this.isStopLucky3) return
				let t = this.lottery
				this.oldOpen.isOPen = false
				setTimeout(() => {
					this.onGetCurrentDates(t)
				}, 100)
			},

			onGetOldOpen() {
				let t = this.lottery
				this.flick = false
				this.onGetRecentResultItem(t, true)
			},

			setBetContents(item, playType) {
				if (this.isDisabled || this.isSeal) return
				let e = this.playType_current.indexOf(item.betContent)
				if (e >= 0) {
					this.playType_current.splice(e, 1)
					let i = this.playType_betContents.findIndex((e) => {
						return e.betContent === item.betContent
					})
					this.playType_betContents.splice(i, 1)
				} else {
					this.playType_current.push(item.betContent)
					this.playType_betContents.push({
						playType: playType,
						betContent: item.betContent
					})
				}
			},

			getSingle(v) {
				let e = this.playType_current.indexOf(v)
				return e >= 0
			},

			getColor(v) {
				let e = this.playType_current.indexOf(v)
				return e >= 0
			},

			getThree(v) {
				let e = this.playType_current.indexOf(v)
				return e >= 0
			},

			getColors(t) {
				if (t === '' || t === null || !t) return
				let c = t.split(",")
				if (c.length > 1) return c[0] + '_' + c[1]
				else return c[0]
			},

			singleBtnClick(bet) {
				if ( this.isSeal ) return
				let n = Number(bet.code)
				let b = []
				let single = this.playType_items.filter(e => e.playType === 'Single')[0]
				if (n === 1) {
					b = single.lotteryBetContent.map(e => {
						return e.betContent
					})
				} else if (n === 2) {
					let s = single.lotteryBetContent.filter(e => Number(e.betContent) > 4)
					b = s.map(e => {
						return e.betContent
					})
				} else if (n === 3) {
					let s = single.lotteryBetContent.filter(e => Number(e.betContent) < 5)
					b = s.map(e => {
						return e.betContent
					})
				} else if (n === 4) {
					let s = single.lotteryBetContent.filter(e => Number(e.betContent) % 2 !== 0)
					b = s.map(e => {
						return e.betContent
					})
				} else if (n === 5) {
					let s = single.lotteryBetContent.filter(e => Number(e.betContent) % 2 === 0)
					b = s.map(e => {
						return e.betContent
					})
				} else {
					b = []
				}

				this.playType_current = this.playType_current.filter(e => !(typeof Number(e) === 'number' && !isNaN(Number(
					e))))
				this.playType_current.push(...b)

				this.playType_betContents = this.playType_current.map(e => {
					if (typeof Number(e) === 'number' && !isNaN(Number(e))) {
						return {
							playType: 'Single',
							betContent: e
						}
					} else {
						return {
							playType: 'Color',
							betContent: e
						}
					}
				})
			},

			getRpsBankerPlayer(e) {
				let c = e.split("_")
				let arr = []
				arr.push('Banker_' + c[0])
				arr.push('Player_' + c[1])
				return arr
			},

			getRpsBankerLists(e) {
				let c = e.betContent.split("_")
				let arr = []
				arr.push('Banker_' + c[0])
				arr.push('Player_' + c[1])
				if (e.playType === 'Rps_Banker_Player') return arr
				else return e.betContent.split(",")
			},

			getMora(e) {
				let c = e.split("_")
				return c[1]
			},

			onClear() {
				this.playType_current = []
				this.playType_betContents = []
				this.sicBo_bets = []
				if (this.curParentType !== 'SicBo' && (this.curParentType !== 'Lucky3' || this.skgCodeKey === 'SGMGM')) {
					this.money = '10'
				}
			},

			goDetails(item) {
				if (!this.isStop) {
					this.$dialog.confirm({
							title: this.$t('common.point'),
							message: this.$$t('stop_t'),
						})
						.then(() => {
							// on confirm
							sessionStorage.setItem('betLists-Data', JSON.stringify(item))
							this.stopInterval()
						})
						.catch(() => {
							// on cancel
						});
				} else {
					sessionStorage.setItem('betLists-Data', JSON.stringify(item))
					this.$router.push('betLists/details')
				}
			},

			goLotteryLobby() {
				if (!this.isStop) {
					if (this.lottery.includes('js') && this.betTotal > 0) {
						this.$dialog.confirm({
								title: this.$t('common.point'),
								message: this.$$t('stop_t'),
							})
							.then(() => {
								// on confirm
								sessionStorage.setItem('goLotteryLobby', 'goLotteryLobby')
								this.stopInterval()
							})
							.catch(() => {
								// on cancel
							});
					}
				} else {
					this.redirectRouter('/app/lotteryLobby')
				}

				sessionStorage.removeItem('gameCode_item')
			},

			goBetLists() {
				if (!this.isStop) {
					this.$dialog.confirm({
							title: this.$t('common.point'),
							message: this.$$t('stop_t'),
						})
						.then(() => {
							// on confirm
							sessionStorage.setItem('goBetLists', 'goBetLists')
							this.stopInterval()
						})
						.catch(() => {
							// on cancel
						});
				} else {
					this.redirectRouter('betLists')
				}
			},

			onSelect(c) {
				this.showPopover = false
				if (Number(c.code) === 1) {
					this.showPopup = true
					return
				}

				if (c.code === 'record') {
					this.showOverlay = true
					return
				}

				if (!this.isStop) {
					this.$dialog.confirm({
							title: this.$t('common.point'),
							message: this.$$t('stop_t'),
						})
						.then(() => {
							// on confirm
							sessionStorage.setItem('select-code', c.code)
							this.stopInterval()
						})
						.catch(() => {
							// on cancel
						});
					return
				}

				if (Number(c.code) === 2) {
					this.redirectRouter('betLists')
				} else if (c.code === 'dashboard') {
					this.redirectRouter('/app/dashboard')
				} else if (c.code === 'deposit') {
					this.redirectRouter('/app/recharge')
				} else if (Number(c.code) === 3) {
					this.redirectRouter('lottery/rule')
				}

			},

			onTotalConfirm() {
				this.showConsecutive = false
				if (this.betTotal < 1) return
				this.showProgress()
				setTimeout(() => {
					this.showProgress(false)
					let code = sessionStorage.getItem('select-code')
					let b = sessionStorage.getItem('goBetLists')
					let l = sessionStorage.getItem('goLotteryLobby')
					if (b === 'goBetLists') {
						this.showPopup = false
						this.redirectRouter('betLists')
					} else if (this.showPopup) {
						this.showPopup = false
						this.$router.push('betLists/details')
					} else if (l === 'goLotteryLobby') {
						this.redirectRouter('/app/lotteryLobby')
					} else if (Number(code) === 2) {
						this.redirectRouter('betLists')
					} else if (code === 'dashboard') {
						this.redirectRouter('/app/dashboard')
					} else if (code === 'deposit') {
						this.redirectRouter('/app/recharge')
					} else if (Number(code) === 3) {
						this.redirectRouter('lottery/rule')
					}

					sessionStorage.removeItem('select-code')
					sessionStorage.removeItem('goBetLists')
					sessionStorage.removeItem('goLotteryLobby')
				}, 500)

			},


			getRps(bet) {
				if (bet) {
					let c = bet.split(",")
					let v = []
					let b = ['Scissors', 'Stone', 'Cloth']
					let bp = ['Banker', 'Player']
					for (let i = 0; i < c.length; i++) {
						v.push(bp[i] + '_' + b[Number(c[i]) - 1])
					}

					let number = Number(c[0]) - Number(c[1])
					let pbText = ''
					if (number === -2 || number === 1) pbText = 'Banker'
					else if (number === -1 || number === 2) pbText = 'Player'
					else pbText = 'Tie'

					v.splice(0, 0, pbText);

					return v
				} else {
					return null
				}

			},

			getSum(v) {
				return Number(v.num1) + Number(v.num2) + Number(v.num3)
			},

			getSicBoArray(v) {
				if (v) return v && v.mora && v.mora.split(",")
				else return []
			},

			getPaigowArray(v) {
				return v.split("&")
			},


			setSicBoBet(item, playType) {
				if (this.isDisabled || this.isSeal) return
				
				let t = null
				if (item.playType) t = item.playType
				else t = playType

				this.sicBo_bets.push({
					playType: t,
					betContent: item.betContent,
					money: Number(this.money),
				})
			},

			getSicBo(item, playType) {
				let t = null
				if (item.playType) t = item.playType
				else t = playType

				let e = this.sicBo_bets.filter(e => e.playType === t && e.betContent === item.betContent)
				if (e.length > 0) return e[0].money
				else return false
			},

			setSicBoMoney(item, playType) {
				let t = null
				if (item.playType) t = item.playType
				else t = playType

				let index = this.sicBo_bets.findIndex(e => e.playType === t && e.betContent === item.betContent)
				let m = this.sicBo_bets[index].money
				this.sicBo_bets[index].money = Number(m) + Number(this.money)
			},

			onShowLotteryLists() {
				if (this.isStop) {
					this.showLotteryLists = true
				} else {
					this.$info(this.$$t('betting'))
				}
			},

			$$t(v) {
				return this.$t('lottery.' + v)
			},

			toggleSicBoOrientation(status) {
				this.sicBoOrientation = true;
				const vm = this;
				window.addEventListener("resize", function() {
					if (vm.curParentType !== 'SicBo' || !vm.sicBoOrientation) {
						return;
					}
					if (status && (window.orientation == 180 || window.orientation == 0)) {
						document.querySelector('body').style = `
							width: 100vmax !important;
							height: 100vmin !important;
							transform-origin: top left !important;
							transform: rotate(90deg) translate(0 , -100vmin) !important;
							font-size: 12px;
						`
						return;
					}
					document.querySelector('body').style = 'font-size: 12px;';
				});
				
				this.isSicBoLandscape = status;
				if (status && (window.orientation == 180 || window.orientation == 0)) {
					this.showSicboLandspaceTip = true;
					document.querySelector('body').style = `
						width: ${window.innerHeight}px !important;
						height: 100vmin !important;
						transform-origin: top left !important;
						transform: rotate(90deg) translate(0 , -100vmin) !important;
						font-size: 12px;
					`
					return;
				}
				document.querySelector('body').style = 'font-size: 12px;';
			}
		},

		beforeRouteLeave(to, form, next) {
			if ((window.orientation == 90 || window.orientation == -90) && this.isSicBoLandscape && ['betRule', 'betLists'].includes(to.name)) {
				// console.log('here')
			} else {
				this.isSicBoLandscape = false;
				this.sicBoOrientation = false;
			}

			document.querySelector('body').style = 'font-size: 12px;';
			if (this.timeOutDates) clearTimeout(this.timeOutDates)
			sessionStorage.removeItem('js-Date')
			if (!this.oldOpen.isOPen) sessionStorage.setItem('isOpen', false)
			window.onorientationchange = null; // 组件销毁后解绑事件
			next()
		}
	}
</script>

<style lang="less" scoped>
		.overlaywrapper {
			height: 100%;
			color: rgb(102, 102, 102);
			width: 100%;
			height: 100%;

			.lists {
				width: 100%;
				background-color: #fff;

				.top {
					background-color: rgb(255, 255, 255);
					height: 44px;
					line-height: 44px;
					font-size: 14px;
					font-weight: 500;
				}

				.striped {
					background-color: rgb(248, 248, 248);
				}

				.list {
					padding-top: 6px;
					padding-bottom: 6px;

					.number {
						width: 22px;
						height: 22px;
						line-height: 22px;
						background-image: url("/images/lottery/list_number.png");
						background-size: 100% 100%;
					}	
						.tag-blue,
						.tag-white,
						.tag-red,
						.tag-green,
						.tag-yellow {
							width: 20px;
							height: 20px;
							line-height: 20px;
							text-align: center;
							display: inline-block;
							color: #fff;
							border-radius: 5px;
							background-color: #ff9726;
						}

						.tag-blue {
							background-color: #5691d7;
						}

						.tag-green {
							background-color: #32b972;
						}

						.tag-white {
							background-color: #fff;
							color: #222;
							border: 1px solid #222;
						}

						.tag-red {
							border-radius: 50%;
							background-color: #ff0000;
						}

						.sicBo-results {
							.num {
								width: 18px;
								border: 1px solid #999;
							}
							.van-tag {
								min-width: 18px;
								padding: 0;
								justify-content: center;
							}
						}
				}
			}
		}

		.list_b {
			width: 100%;
			height: 53px;
			background-image: url("/images/lottery/list_b.png");
			background-size: 100%;
		}
	

	.lotteryLists {
		height: 60%;

		.name_before {
			color: #666;
		}

		.active_lottery {
			background-color: rgb(91, 127, 251) !important;

			span {
				color: white !important;
			}
		}

		.Lottery_items {
			height: 32px;
			border: solid 1px #f2f2f2;
			border-radius: 15px;
			text-align: center;
			line-height: 32px;
		}
	}

	#lottery {
		/deep/ .van-popover {
			color: rgb(83, 93, 118);
			text-align: left;

			.van-popover__arrow {
				right: 10px !important;
			}

			.van-icon {
				color: rgb(80 127 239);
			}
		}

		&.isSicBoLandscape {
			/deep/ .van-popover {
				color: rgb(83, 93, 118);
				text-align: left;
				
				left: initial !important;
				right: 10px !important;
				top: 50px !important;

				.van-popover__arrow {
					right: 5px !important;
				}
			}
		}

		/deep/ .van-nav-bar {
			background-image: url("/images/lottery/nav_bg.png");
			background-size: 100%;
			color: white !important;

			.van-icon {
				color: white !important;
			}

			.van-icon-arrow-left {
				font-size: 22px;
			}

			.van-nav-bar__title {
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 70%;
			}

			.van-nav-bar__left {
				.van-dropdown-menu__bar {
					box-shadow: unset;
					background-color: transparent;

					.van-dropdown-menu__title {
						font-size: 16px;
						color: white;
					}
				}
			}
		}

		.lucky3-bottom {
			.money_number {
				padding: 0 5px;
				width: 100%;

				.money_block {
					width: 48px;
					height: 48px;
					line-height: 48px;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					text-align: center;
					position: relative;
					left: 0;
					right: 0;
					top: 0;
					margin-right: 10px;
					text-shadow: 2px 1px 0px #222;
					font-weight: bolder;
					display: flex;
					align-items: center;
					justify-content: center;
					.money_block_text {
						width: 35px;
						line-height: 10px;
						word-break: break-all;
						color: #fff;
					}
				}

				.money_block_bg {
					margin-right: 10px;
					position: relative;
					width: 48px;
					height: 48px;
					color: #6496fb;
					border-radius: 50%;
					border: dashed;
				}

				.money_block_1 {
					background-image: url('/images/lottery/sicBo/money_1.png');
				}

				.money_block_2 {
					background-image: url('/images/lottery/sicBo/money_2.png');
				}

				.money_block_3 {
					background-image: url('/images/lottery/sicBo/money_3.png');
				}

				.money_block_4 {
					background-image: url('/images/lottery/sicBo/money_4.png');
				}

				.money_block_5 {
					background-image: url('/images/lottery/sicBo/money_5.png');
				}
				
				.money_block_6 {
					background-image: url('/images/lottery/sicBo/money_6.png');
				}

				.money_block_7 {
					background-image: url('/images/lottery/sicBo/money_8.png');
				}

				.money_block_8 {
					background-image: url('/images/lottery/sicBo/money_7.png');
				}
			}

			.bet {
				.van-button {
					height: 42px;
					width: 80px !important;
					padding: 0;
				}
			}
		}

		.sicBo {
			background-color: rgb(0, 0, 0);
			height: 100vh;

			/deep/ .van-nav-bar {
				background-image: url("/images/lottery/sicBo/nav_bg.png");
				background-size: 100% 100%;
				color: rgb(255, 231, 159) !important;

				.van-icon {
					color: rgb(255, 231, 159) !important;
				}

				.van-icon-arrow-left {
					font-size: 22px;
				}

				.van-nav-bar__title {
					display: flex;
					align-items: center;
					justify-content: center;
					min-width: 70%;
				}

				.white-text {
					color: rgb(255, 231, 159) !important;
				}

				.van-nav-bar__left {
					.van-dropdown-menu__bar {
						box-shadow: unset;
						background-color: transparent;

						.van-dropdown-menu__title {
							font-size: 16px;
							color: white;
						}
					}
				}
			}

			.block {
				font-size: 20px;
				font-weight: bolder;
			}

			.sicBo_dates {
				background-color: rgb(22, 29, 36);

				.result {
					border: 1px solid rgb(255, 231, 159);

					.result_text {
						font-size: 14px;
						color: rgb(255, 231, 159);
					}

					.result_block {
						border: 1px solid rgb(255, 231, 159);
					}

					.result_center {
						height: 48px;
						border: 1px solid rgb(255, 231, 159);

						.text_number {
							font-size: 36px;
							color: rgb(255, 231, 159);
							font-weight: bolder;
						}

						.mora_block {
							width: 47px;
							text-align: center;
							font-size: 14px;
							color: rgb(255, 231, 159);
						}

						.mora_block:first-child {
							background: url("/images/lottery/sicBo/mora_block_bg.png") no-repeat;
							background-size: 47px 2px;
							background-position-y: bottom;
						}
					}
				}
			}

			.sicBo_bet_center {
				position: absolute;
				top: 165px;
				left: 0;
				right: 0;
				bottom: 110px;
				background-image: url("/images/lottery/sicBo/bet_bg.png");
				background-size: 100% 100%;

				.sicBo_bet_warps {
					.flex_wrap {
						width: 100%;
						flex-direction: row;
						flex-wrap: wrap;
					}

					.doubleSide_block,
					.singleNumber_block,
					.sum_block,
					.paigow_block,
					.double_block,
					.threeNum_block {
						border: 1px solid rgb(192, 168, 96);
						background-color: rgb(38, 124, 57);

						.bet_money_block {
							width: 100%;
							height: 36px;
							line-height: 36px;
							color: white;
							font-size: 12px;
							font-weight: bolder;
							background-image: url("/images/lottery/sicBo/bet_money_bg.png");
							background-size: 100% 100%;
						}
					}

					.singleNumber_block,
					.sum_block,
					.paigow_block,
					.double_block,
					.threeNum_block {
						min-height: 38px;
						padding: 0 2px;
					}

					.doubleSide_block {
						.bet_money_block {
							width: 100%;
							height: 50px !important;
							line-height: 50px !important;
							background-image: url("/images/lottery/sicBo/bet_money_bg.png");
							background-size: 100% 100%;
						}
					}

					.doubleSide_block {
						height: 50px;
					}

					.sum_block {
						width: 14.2857%;
					}

					.paigow_block {
						width: 20%;
					}

					.sum_odds {
						border: 1px solid rgb(192, 168, 96);
						background-color: rgb(38, 124, 57);
					}

					.explanation_text {
						border: 1px solid rgb(192, 168, 96);
					}
				}
			}

			.sicBo_nav_b {
				position: fixed;
				bottom: 0;
				right: 0;
				left: 0;
				border: 1px solid rgb(255, 231, 159);
				background-color: rgb(0, 0, 0);

				.sicBo_nav_b_msg_info {
					padding: 0 10px;
					position: absolute;
					bottom: 110px;
					margin: auto;
					min-width: 160px;
					height: 26px;
					line-height: 26px;
					background-color: rgb(255, 100, 100);
				}

				.money_number {
					padding: 0 5px;
					width: 100%;

					.money_block {
						width: 48px;
						height: 48px;
						line-height: 48px;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						text-align: center;
						position: relative;
						left: 0;
						right: 0;
						top: 0;
						margin-right: 10px;
						text-shadow: 2px 1px 0px #222;
						font-weight: bolder;
						display: flex;
						align-items: center;
						justify-content: center;
						.money_block_text {
							width: 35px;
							line-height: 10px;
							word-break: break-all;
						}
					}

					.money_block_bg {
						margin-right: 10px;
						position: relative;
						width: 48px;
						height: 48px;
						background-image: url('/images/lottery/sicBo/money_block_bg.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}

					.money_block_1 {
						background-image: url('/images/lottery/sicBo/money_1.png');
					}

					.money_block_2 {
						background-image: url('/images/lottery/sicBo/money_2.png');
					}

					.money_block_3 {
						background-image: url('/images/lottery/sicBo/money_3.png');
					}

					.money_block_4 {
						background-image: url('/images/lottery/sicBo/money_4.png');
					}

					.money_block_5 {
						background-image: url('/images/lottery/sicBo/money_5.png');
					}
					
					.money_block_6 {
						background-image: url('/images/lottery/sicBo/money_6.png');
					}

					.money_block_7 {
						background-image: url('/images/lottery/sicBo/money_8.png');
					}

					.money_block_8 {
						background-image: url('/images/lottery/sicBo/money_7.png');
					}
				}

				.bet_new {
					.van-button {
						min-width: 70px;
						height: 38px;
						padding: 0;
						word-break: break-word;
					}
				}

				.set-chip {
					background: #4c4c4c;
					padding: 5px 10px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-radius: 9px;
					max-width: 70px;
					min-height: 17px;
				}

				.clear_money {
					width: 50px;
					height: 38px;
					background-image: url('/images/lottery/sicBo/clear_money.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}

		}


		.bet_center {
			position: absolute;
			top: 120px;
			left: 0;
			right: 0;
			bottom: 150px;
		}

		.block {
			min-width: 32px;
			height: 28px;
			line-height: 28px;
			font-size: 20px;
			color: rgb(83, 93, 118);
			font-family: 'shizhong' !important;
			background-image: url("/images/lottery/number.png");
			background-size: 100%;
		}

		.title {
			justify-content: flex-end;
		}

		.dates {
			width: 100%;
			height: 71px;
			background-image: url("/images/lottery/date_bg.png");
			background-size: 100%;

			.result {
				height: 56px;
				width: 100%;
				background-image: url("/images/lottery/result_bg.png");
				background-size: 100%;

				.number {
					width: 32px;
					height: 32px;
					line-height: 32px;
					background-image: url("/images/lottery/dates.png");
					background-size: 100%;
					// margin-left: 97px;
				}

				.oldOpen {
					.van-count-down {
						.block {
							width: unset;
							height: unset;
							font-size: 20px;
							font-weight: 500;
							color: rgb(231, 113, 45);
							background-image: unset;
						}
					}
				}
			}
		}

		.playType_color,
		.playType_three {
			background-color: white;
			width: 100%;
			border: 0.5px solid rgb(19, 83, 209);

			.caption {
				color: rgb(153, 153, 153);
			}
		}


		.playType_single {
			.playType_single_btn {
				background-color: #f9fbff;
				color: rgb(83, 93, 118);
				height: 48px;
				display: flex;
				align-items: center;
			}

			.playType_single_block {
				width: 64px;
				height: 35px;
				line-height: 35px;
				border: 0.5px solid rgb(19, 83, 209);
				color: #fff;
				font-weight: bolder;
				font-size: 18px;
				text-shadow: 2px 2px #000;

				.subtitle-4 {
					color: rgb(83, 93, 118);
				}

				.caption {
					color: rgb(153, 153, 153);
				}
			}

			.playType_single_items {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
			}

			.r-btn {
				background: red;
				opacity: .3;
				cursor: pointer;
				.caption {
					color: #fff !important;
				}
			}

			.b-btn {
				background: #4080ff;
				opacity: .3;
				.caption {
					color: #fff !important;
				}
			}

			.r-y-btn {
				background: linear-gradient(to right, #f54c3d 0%,#f54c3d 50%,#fad005 51%,#fad005 100%);
				opacity: .3;
				.caption {
					color: #fff !important;
				}
			}

			.b-y-btn {
				background: linear-gradient(to right, #2d6af4 0%,#2d6af4 50%,#fad005 51%,#fad005 100%);
				opacity: .3;
				.caption {
					color: #fff !important;
				}
			}

			.current-active-2 {
				border: 4px solid #222;
				opacity: 1;
				line-height: 30px;
				border-radius: 10px;
			}
		}

		.nav_bottom {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			background-color: white;
			padding: 12px;
			border-radius: 12px 12px 0 0;

			.msg_info {
				margin: auto;
				width: fit-content;
				height: 26px;
				padding: 0 15px;
				line-height: 26px;
				background-color: rgb(255, 100, 100);
			}

			/deep/ .van-number-keyboard {
				position: unset;
				margin-top: 8px;
				padding-bottom: 0;
				z-index: 1;
			}

			.bet {
				.van-button {
					height: 42px;
					width: 120px;
				}
			}

			.block_number {
				min-width: 56px;
				height: 34px;
				background-image: url("/images/lottery/money.png");
				background-size: 100%;
				line-height: 34px;
				color: rgb(83, 93, 118);
			}

			.inputMoney {
				width: 100px;
				height: 34px;
				background-image: url("/images/lottery/input_bg.png");
				background-size: 100%;
				line-height: 34px;
				color: rgb(153, 153, 153);
			}

			.money_btn {
				min-width: 54px;
				min-height: 42px;
				background-image: url("/images/lottery/money_btn.png");
				background-size: 100% 100%;
				color: rgb(153, 153, 153);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 0 5px;

				.money_btn-clear {
					margin: 0 4px;
				}
			}
		}

		.betLists {
			position: absolute;
			top: 60px;
			right: 0;
			left: 0;
			bottom: 0;
			background-color: white;

			.betList {
				color: rgb(51, 51, 51);

				.top {
					height: 30px;
					line-height: 30px;
				}

				.bet_money {
					color: rgb(70, 132, 255);
				}

				.status_0 {
					color: rgb(68, 187, 0);
				}

				.status_1 {
					color: rgb(224, 32, 32);
				}
			}
		}

		.current_active {
			color: white !important;
			background-image: url("/images/lottery/current_bg.png") !important;
			background-size: 100% 100% !important;
			background-repeat: no-repeat !important;

			.subtitle-4 {
				color: white !important;
			}

			.caption {
				color: white !important;
			}
		}


		.divider_col {
			position: relative;

			.number {
				width: 32px;
				height: 32px;
				line-height: 32px;
				background-image: url("/images/lottery/dates.png");
				background-size: 100%;
			}
		}

		.divider_col:after {
			content: "";
			display: block;
			width: 1px;
			background-color: #d8d8d8;
			height: 40px;
			position: absolute;
			top: 1px;
		}

		/deep/.van-dialog {
			.van-field {
				height: 44px;
				border-radius: 8px;
				background-color: #f5f5f9;
				width: 100%;
				font-size: 16px;
				padding-left: 16px;
			}

			ul {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 16px;

				li {
					width: 65px;
					height: 40px;
					border-radius: 22px;
					border: solid 1px #cccccc;
					font-size: 16px;
					color: #000;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12px;
				}

				.active {
					background-image: linear-gradient(to right, rgb(154, 187, 255), rgb(70, 132, 255));
					color: #fff;
					border: none;
				}
			}
		}

		.animate-flicker {
			-webkit-animation: flickerAnimation .5s infinite;
			-moz-animation: flickerAnimation .5s infinite;
			-o-animation: flickerAnimation .5s infinite;
			animation: flickerAnimation .5s infinite;
			color: #000 !important;
			background: radial-gradient(circle at center, #fbffed, #b3ac6d);
			filter: brightness(100%) !important;

			h1,
			.title {
				color: #000 !important;
			}

			.van-image {
				filter: brightness(100%) !important;
			}
		}

		@keyframes flickerAnimation {
			0% {
				opacity: 1;
			}

			50% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		.roadmap {
			color: #000;
			font-size: 14px;
			font-weight: 600;
			.title-bar {
				width: 100%;
				display: inline-flex;
				justify-content: space-between;
				padding: 5px;
				background: #e9e5e5;
			._6 {
				color: #FFD700;
				text-shadow: 0 1px 3px #222;
			}
			.btn_5,.btn_3 {
				color: #ff0000;
			}
			.btn_4,.btn_2 {
				color: #409eff;
			}
			._1 {
				color: #32b972;
			}
			._11 {
				color: #32b972;
			}
			.number-0 {
				background: #000;
			}
			.number-1 {
				background: #005bc8;
			}
			.number-2 {
				background: #027338;
			}
			.number-3 {
				background: #e67613;
			}
			.number-4 {
				background: #e9202c;
			}
			.number-0,.number-1,.number-2,.number-3,.number-4 {
				width: 15px;
				height: 15px;
				line-height: 15px;
				text-align: center;
				display: inline-block;
				color: #fff;
				border-radius: 5px;
			}
			}
			.contro {
				display: flex;
				flex-direction: column;
				min-width: 20vw;
				position: relative;
				z-index: 3;
				background: #f9fbff;
				.contro-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					min-height: 28px;
					border: 1px solid #e9e5e5;
					background: #f9fbff;
				}
			}
			.balls {
				display: flex;
				margin-right: 20vw;
				border-top: 1px solid #999;
				.cell{
					border-right: 1px solid #999;
					border-left: 1px solid #999;
					border-bottom: 1px solid #999;
					min-width: 22px;
					min-height: 22px;
					// display: flex;
					// align-items: center;
					// justify-content: center;
					letter-spacing: -2px;
					.sicbo-ball {
						padding: 0 3px;
						background-color: #f9b54f;
						border-radius: 10%;
						margin: 2px 5px;
					}
					.ball {
						width: 17px;
						height: 17px;
						line-height: 17px;
						text-align: center;
						display: inline-block;
						color: #fff;
						border-radius: 50%;
						margin: 2px;
						text-indent: -3px
					}
					.ball-red {
						border: 1px red solid;
						color: red;
					}
					.ball-blue {
						color: blue;
						border: 1px blue solid;
					}
					.ball-green {
						color: green;
						border: 1px green solid;
					}
					.length-cell {
						color: #fff;
						background: #7f7f7f;
						min-width: 22px;
						min-height: 22px;
						line-height: 22px;
					}
				}
			}
			.map {
				width: 60%;
				background: hotpink;
			}
		}
	}

	.showChipSet-money-box {
		width: 100%;
		flex-wrap: wrap;
		padding: 0 10px;
		justify-content: center;

		.showChipSet-money {
			width: 48px;
			height: 48px;
			line-height: 48px;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			text-align: center;
			position: relative;
			left: 0;
			right: 0;
			top: 0;
			margin-right: 10px;
			margin-bottom: 10px;
			color: #fff;
			text-shadow: 2px 1px 0px #222;
			font-weight: bolder;
			display: flex;
			align-items: center;
			justify-content: center;
			.showChipSet-money-text {
				width: 35px;
				line-height: 10px;
				word-break: break-all;
			}
		}

		.edit {
			margin-right: 10px;
			margin-bottom: 10px;
		}

		.showChipSet-money-bg {
			margin-right: 10px;
			margin-bottom: 10px;
			position: relative;
			width: 48px;
			height: 48px;
		}
		.select {
			background: #575757;
			border: 3px solid #fff700;
		}
		.pointer {
			background: #bebebe;
		}
	}
	.pre_show {
			background: #575757;
			color: #fff;
			font-size: 22px;
			font-weight: bolder;
			height: 30px;
	}

	.showChipSet-title {
		font-size: 14px;
		font-weight: bolder;
	}

	.sicbo-roadData-dialog {
		min-height: 60vh;
		/deep/ .van-dialog__footer{
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
		}
	}
</style>