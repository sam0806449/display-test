<template>
	<div id="dashboard" v-if="skgCode" :style="{background: `${handleBgColor()}`}">

		<!-- <div class="com_text">{{com_text}}</div> -->
		
		<template v-if="skinCode === 'SG888'">
			<scroller>
				<div class="dashboard-top">
					<van-swipe :autoplay="3000" height="3.947rem" width="100%" class="pt-2">
						<van-swipe-item v-for="(item, index) in swipes" :key="index" @click="redirectLinkUrl(item.linkUrl)">
							<van-image :src="$portrait(item.imageUrl)" width="100%" height="100%" lazy-load fit="cover">
								<template v-slot:loading>
									<van-loading type="spinner" size="20" />
								</template>
							</van-image>
						</van-swipe-item>
					</van-swipe>

					<van-notice-bar left-icon="volume-o" color="rgb(152, 167, 181)" background="rgb(247, 248, 249)">
						<div class="body-2" @click="redirectScrollMsgs">{{ com_text }}</div>

						<van-icon slot="left-icon" name="/images/dashboard/notice.png" size="20" class="mr-1" />

						<div 
							v-if="skgCode === skgUcsCode"
							class="flex align-items-center onlineUsers radius-1 px-1"
							slot="right-icon"
						>
							<van-icon name="friends-o" size="18" />
							<div class="caption">{{onlineUsers}}</div>
						</div>

					</van-notice-bar>
				</div>
				<div v-if="lotteryGroup.length" style="padding: 0.256rem 0.384rem 1.2rem;">
					<div style="display: flex; margin: 0.641rem 0 0.256rem;justify-content: space-between;">
						<div @click="changeLottery('hot')" style="width: 33vw; height: 2.7rem; display: flex; align-items: flex-end; padding: 10px 12px; border-radius: 0.256rem; position: relative;">
							<img src="/images/dashboard/SG888/hotLottery.png" style="position: absolute; pointer-events: none; top: -0.6rem; left: -0.156rem; width: 36vw" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem">
								{{ $$t('_2') }}
							</div>
						</div>
						<div @click="changeLottery('all')" style="width: 25vw; height: 2.7rem; display: flex; align-items: flex-end; padding: 10px 12px; border-radius: 0.256rem; position: relative;">
							<img src="/images/dashboard/SG888/all.png" style="position: absolute; pointer-events: none; top: -0.6rem; left: -0.156rem; width: 28.5vw" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem">
								{{ $t('common.all') }}
							</div>
						</div>
						<div @click="redirectRouter('lotteryLobby')" style="width: 26.5vw; height: 2.7rem; display: flex; align-items: flex-end; padding: 10px 12px; border-radius: 0.256rem; position: relative;">
							<img src="/images/dashboard/SG888/lobby.png" style="position: absolute; pointer-events: none; top: -0.6rem; left: -0.156rem; width: 30vw" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem">
								{{ $$t('_3') }}
							</div>
						</div>
					</div>
					<div style="
						display: flex; margin-bottom: 0.256rem;
						background-image: url(/images/dashboard/SG888/m-orange.svg),linear-gradient(180deg,rgba(255,229,135,.2),rgba(255,229,135,0) 108.52%),linear-gradient(182.51deg,#ffba94 -16.37%,#f69e70 31.58%,#ee5659 80.54%)
						background-size: 100%;
						box-shadow: 0 2pxrem 6px rgb(0 0 0 / 20%), inset 0 1px 2px rgb(255 250 241 / 80%), inset 0 -1px 3px #fdbfbc;
						border-radius: 0.256rem;
						height: 23.5vw;
						align-items: center;
					">
						<div @click="changeLottery('SicBo')" style="width: 25%; height: 1.7rem; display: flex; align-items: flex-end; position: relative;">
							<img src="/images/dashboard/SG888/SICBO.png" style="position: absolute; pointer-events: none; top: -0.39rem; left: 0px; max-width: 100%" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: -0.102rem;">
								{{ getLotteryName('SicBo') }}
							</div>
						</div>
						<div @click="changeLottery('K3')" style="width: 25%; height: 1.7rem; display: flex; align-items: flex-end; position: relative;">
							<img src="/images/dashboard/SG888/fast3.png" style="position: absolute; pointer-events: none; top: -0.39rem; left: 0px; max-width: 100%" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: -0.102rem;">
								{{ getLotteryName('K3') }}
							</div>
						</div>
						<div @click="changeLottery('SSC')" style="width: 25%; height: 1.7rem; display: flex; align-items: flex-end; position: relative;">
							<img src="/images/dashboard/SG888/4D.png" style="position: absolute; pointer-events: none; top: -0.39rem; left: 0px; max-width: 100%" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: -0.102rem;">
								{{ getLotteryName('SSC') }}
							</div>
						</div>
						<div @click="changeLottery('PK10')" style="width: 25%; height: 1.7rem; display: flex; align-items: flex-end; position: relative;">
							<img src="/images/dashboard/SG888/YNCP.png" style="position: absolute; pointer-events: none; top: -0.39rem; left: 0px; max-width: 100%" />
							<div style="pointer-events: none; position: relative; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: -0.102rem;">
								{{ getLotteryName('PK10') }}
							</div>
						</div>
					</div>
					<div style="display: flex; margin-bottom: 0.256rem;justify-content: space-between;">
						<div
							v-if="getCurLottery('VNSouth')"
							@click="changeLottery('VNSouth')"
							style="
								width: 45vw;
								display: flex;
								position: relative;
								background-image: url(/images/dashboard/SG888/m-yellow.svg),linear-gradient(180deg,rgba(255,229,135,.2),rgba(255,229,135,0) 108.52%),linear-gradient(359.8deg,#f86b2e -10.74%,#ffb749 85.72%);
								box-shadow: 0 2px 6px rgb(0 0 0 / 20%), inset 0 1px 2px rgb(255 250 241 / 80%), inset 0 -1px 3px rgb(252 225 186 / 80%);
								border-radius: 0.256rem;
								height: 17.5vw
						">
							<img src="/images/dashboard/SG888/TGCP.png" style="position: absolute; pointer-events: none; top: 0px; left: 0px; width: 23vw" />
							<div style="pointer-events: none; position: absolute; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: 10px;right: 15px">
								{{ getLotteryName('VNSouth') }}
							</div>
						</div>
						<div
							v-else
							@click="changeLottery('SeDie')"
							style="
								width: 45vw;
								display: flex;
								position: relative;
								background-image: url(/images/dashboard/SG888/m-yellow.svg),linear-gradient(180deg,rgba(255,229,135,.2),rgba(255,229,135,0) 108.52%),linear-gradient(359.8deg,#f86b2e -10.74%,#ffb749 85.72%);
								box-shadow: 0 2px 6px rgb(0 0 0 / 20%), inset 0 1px 2px rgb(255 250 241 / 80%), inset 0 -1px 3px rgb(252 225 186 / 80%);
								border-radius: 0.256rem;
								height: 17.5vw
						">
							<img src="/images/dashboard/SG888/TGCP.png" style="position: absolute; pointer-events: none; top: 0px; left: 0px; width: 23vw" />
							<div style="pointer-events: none; position: absolute; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: 10px;right: 15px">
								{{ getLotteryName('SeDie') }}
							</div>
						</div>
						<div
							@click="changeLottery('Rps')"
							style="
								width: 45vw;
								display: flex;
								position: relative;
								background-image: url(/images/dashboard/SG888/m-pink.svg),linear-gradient(180deg,#f7a3c6,#f174b0 57.28%);
								box-shadow: 0 2px 6px rgb(0 0 0 / 20%), inset 0 1px 2px rgb(255 250 241 / 80%), inset 0 -1px 3px rgb(252 225 186 / 80%);
								border-radius: 0.256rem;
								height: 17.5vw
						">
							<img src="/images/dashboard/SG888/LOTTO.png" style="position: absolute; pointer-events: none; top: 0px; left: 0px; width: 23vw" />
							<div style="pointer-events: none; position: absolute; white-space: nowrap; z-index: 1;color: #fff; font-size: 0.41rem;margin: 0 auto; bottom: 10px;right: 15px">
								{{ getLotteryName('Rps') }}
							</div>
						</div>
					</div>

					<div style="display: flex; flex-wrap: wrap">
						<div 
							v-for="(item,i) in curLotteryList"
							:key="i"
							class="background-white elevation-1 pt-3"
							style="width: 33.33%"
						>
							<div class="pl-3 pr-3" style="min-height: 80px; display: flex; align-items: center; justify-content: center">
								<van-image
									:src="
										getGameImg(
											'SGLottery',
											item.icon,
											'cp'
										)
									"
									lazy-load
									@click.native.stop="goRouter({ ...item, platformCode: 'SGLottery', gameCode: item.type })"
								>
									<template v-slot:loading>
										<van-loading type="spinner" size="20" />
									</template>
								</van-image>
							</div>

                            <div
                                class="text-center pt-2 pb-3"
                                style="color: #535867; font-weight: bold; font-size: 0.36rem;"
                            >
                                <p class="van-ellipsis">{{ item.name }}</p>
                            </div>
                        </div>
					</div>
				</div>
			</scroller>
		</template>

		<Skin6677866 
			v-else-if="skinCode === '6677866'"
			:swipes="swipes"
			:notice="notice"
			:redirectScrollMsgs="redirectScrollMsgs"
			:redirectLinkUrl="redirectLinkUrl"
			:redirectWithdraw="redirectWithdraw"
			:navItems="navItems"
			:refreshBalance="refreshBalance"
			:refreshIcon="refreshIcon"
			:gameCategorys="gameCategorys"
			:totalGameData="totalGameData"
			:allGameGotStatus="isAllGameGotFinished"
		/>
		
		<S666 v-else-if="skinCode === 'S666'"
			:swipes="swipes"
			:notice="notice"
			:isShowK="isShowK"
			:gameCategorys="gameCategorys"
			:totalGameData="totalGameData"
			:scrollBasicHeight="scrollBasicHeight"
			:allGameGotStatus="isAllGameGotFinished"
		/>
		
		<template v-else>
			<EasyRefresh ref="dashboardScroller" 
			:on-scroll="handleScrollHeight"
			:bouncing="false"
			:loadMore="null">
			<!-- SGYF skin -->
			<div class="SGYF-tabs-box" v-if="skinCode === 'SGYF'">
				<van-tabs v-model="SGYF_tabActiveName" @click="getGamePlatforms" class="SGYF-tabs" background="transparent" swipeable title-active-color="rgb(64, 128, 255)"
					title-inactive-color="rgb(153, 153, 153)" color="rgb(64, 128, 255)">
					<van-tab v-for="(item, index) in gameCategorys" :title="item.name" :name="item.code" :key="index"
					title-class="SGYF-tab"/>
				</van-tabs>
			</div>

			<div class="dashboard-top">
				<van-notice-bar v-if="skinCode === 'SGGJ'" left-icon="volume-o" color="rgb(152, 167, 181)" background="rgb(247, 248, 249)">
					<div class="body-2" @click="redirectScrollMsgs">{{com_text}}</div>

					<van-icon slot="left-icon" name="/images/dashboard/notice.png" size="20" class="mr-1" />

					<div class="flex align-items-center onlineUsers radius-1 px-1" slot="right-icon"
						v-if="skgCode === skgUcsCode">
						<van-icon name="friends-o" size="18" />
						<div class="caption">{{onlineUsers}}</div>
					</div>

				</van-notice-bar>
			
				<van-swipe :autoplay="3000" height="3.947rem" width="100%" class="pt-2">
					<van-swipe-item v-for="(item, index) in swipes" :key="index" @click="redirectLinkUrl(item.linkUrl)">
						<van-image :src="$portrait(item.imageUrl)" width="100%" height="100%" lazy-load fit="cover">
							<template v-slot:loading>
								<van-loading type="spinner" size="20" />
							</template>
						</van-image>
					</van-swipe-item>
				</van-swipe>

				<van-notice-bar v-if="!['SGGJ', 'SGYF'].includes(skinCode)" left-icon="volume-o" color="rgb(152, 167, 181)" background="rgb(247, 248, 249)">
					<div class="body-2" @click="redirectScrollMsgs">{{com_text}}</div>

					<van-icon slot="left-icon" name="/images/dashboard/notice.png" size="20" class="mr-1" />

					<div class="flex align-items-center onlineUsers radius-1 px-1" slot="right-icon"
						v-if="skgCode === skgUcsCode">
						<van-icon name="friends-o" size="18" />
						<div class="caption">{{onlineUsers}}</div>
					</div>

				</van-notice-bar>
				<van-notice-bar :key="winBroadcast" v-if="skinCode === 'SGGJ'" left-icon="volume-o" color="rgb(152, 167, 181)" background="rgb(247, 248, 249)">
					<div class="body-2" @click="showWinBroadcast = true" v-html="winBroadcast" />

					<van-icon slot="left-icon" name="/images/dashboard/broadcast.png" size="30" class="mr-1" />
				</van-notice-bar>
			</div>

			<div class="flex py-1 px-2" v-if="skinCode === 'SGYF' && SGYF_tabActiveName !== 'hot'"
			style="justify-content: flex-end;"> 
				<div class="SGYF-hotgame-lang" @click="$router.push('/app/changeLanguage')"> 
					<van-image :src="`/images/common/${culture}.png`" width="18" height="18"/>
					<span class="ml-1">{{cultures.find(t => t.code === culture) ? 
						cultures.find(t => t.code === culture).name:''}}</span>
				</div>
			</div>	

			<!-- SGYF hot game -->
			<div class="SGYF-hotgame" v-if="skinCode === 'SGYF' && SGYF_tabActiveName === 'hot'">
				<div class="px-3">
					<van-notice-bar left-icon="volume-o" color="rgb(152, 167, 181)" background="rgb(247, 248, 249)">
						<div @click="redirectScrollMsgs">{{com_text}}</div>
						<van-icon slot="left-icon" name="/images/dashboard/notice.png" size="15" class="mr-1" />
					</van-notice-bar>
				</div>
				<div class="SGYF-hotgame-title">
					<span>{{$$t('hot')}}{{$t('profits.game')}}</span>
					<!-- SGYF 语言 -->
					<div class="SGYF-hotgame-lang" @click="$router.push('/app/changeLanguage')"> 
						<van-image :src="`/images/common/${culture}.png`" width="18" height="18"/>
						<span class="ml-1">{{cultures.find(t => t.code === culture) ? 
						cultures.find(t => t.code === culture).name:''}}</span>
					</div>
				</div>
				<div class="SGYF-hotgame-games">
					<vue-touch-scroll type="horizontal" hide-scrollbar>
						<div class="flex">
						<div v-for="(item, index) in platforms" :key="index">
								<div class="SGYF-hotgame-games-items background-white radius-1"
								v-if="item.categoryCode !== 'sx' && item.categoryCode !== 'ty' && item.categoryCode !== 'dj'">
									<div class="SGYF-hotgame-games-items-img-hot">
										<van-image
											:src="getGameImg(item.platformCode, item.imageName, item.categoryCode)"
											height="100%" width="100%" lazy-load fit="contain"
											@click.native.stop="goRouter(item)">
											<template v-slot:loading>
												<van-loading type="spinner" size="20" />
											</template>
										</van-image>
									</div>

									<div class="caption" style="max-width: 18vw;">
										<p class="van-ellipsis">{{item.gameName}}</p>
									</div>
								</div>
							</div>
						</div>
					</vue-touch-scroll>	
				</div>
			</div>

			<div class="nav-items background-white px-2" :class="{'SGYF-memberData-box':skinCode === 'SGYF'}">
				<div class="item-left text-left" v-if="memberData && Object.keys(memberData).length">
					<div>
						<div class="memberName mr-1 ellipsis-1">{{memberData && memberData.memberAccount}}</div>
						<div class="vip mr-1" v-if="skgCodeKey !== 'SGMGM'">
							<van-image width="40" height="14" src='/images/dashboard/vip.png'>
								<div class="vip-lv_position text-white caption">{{memberData && memberData.vipLevel}}</div>
							</van-image>
						</div>
						<div @click="refreshBalance">
							<van-icon name="/images/dashboard/refresh.png" :class="{refresh: refreshIcon}" size="20" />
						</div>
					</div>
					<div class="money">{{memberData && memberData.currencySymbol}}{{memberData &&
						memberData.balance}}{{memberData && memberData.currencyDenomination}}
					</div>
				</div>

				<div v-if="skinCode === 'SGYF' && !memberData" class="item-left text-left mr-2">
					<div style="color: rgb(102, 102,102)">{{$$t('login_1')}}</div>
					<div class="flex mt-2">
						<van-button type="info" color="#1989fa" class="radius-2 mr-1" size="mini" block @click="redirectRouter('/login')">
						{{$t('register.login')}}
						</van-button>
						<van-button type="info" color="#b819fa" class="radius-2" size="mini" block @click="redirectRouter('/register')">
						{{$t('agentRegister.btn')}}
						</van-button>
					</div>
				</div>

				<div v-if="skinCode !== 'SGYF' && !memberData" class="item-left text-left">
					<div @click="redirectRouter('/login')" class="loginBtnHasBorder">{{$t('login.title')}}</div>
					<div @click="redirectRouter('/register')" class="loginBtnHasBorder loginBtnHasBorder-2">{{$t('register.title')}}</div>
				</div>

				<div class="item-right ml-1">
					<van-row type="flex" justify="space-around">
						<van-col span="6" v-for="(n, index) in navItems" :key="index" @click="redirectWithdraw(n.link)"
						class="flex flex-d-column justify-content-start align-items-center">
							<van-image width="0.96rem" height="0.96rem" :src='n.img' />
							<div class="title">{{$$t(n.title)}}</div>
						</van-col>
					</van-row>
				</div>
			</div>

			<div v-if="skinCode === '9393'" class="tree-sidebar-9393">
					<div v-if="totalDataOf9393 && totalDataOf9393.length">
						<van-collapse v-model="activeOf9393">
							<van-collapse-item
							v-for="(bigItem,index) in totalDataOf9393" :key="index"
							:name="index" class="text-left"
							:class="{'active-bg': activeOf9393.indexOf(index) > -1 }">
								<template #title>
									<span class="title-left-border title-left-border-bolder">{{ bigItem.name }}</span>
									<div :class="{'mt-5 pl-4': activeOf9393.indexOf(index) === -1}">
										<GameList
										v-if="activeOf9393.indexOf(index) === -1"
										:gameData="shortOf9393.indexOf(bigItem.platformCode) === -1 ?
										bigItem.games.slice(0,4) : bigItem.games.slice(0,2)"
										:platformCodeActive="bigItem.platformCode"/>
									</div>
								</template>
									<div class="px-2">
									<GameList :gameData="bigItem.games"
									:platformCodeActive="bigItem.platformCode" />
									</div>
							</van-collapse-item>
						</van-collapse>
					</div>
			</div>
			</EasyRefresh> 

			<van-count-down :time="60000" @finish="onLoadHotMatch()" ref="countDownHotMatch" v-show="false">
			</van-count-down>

			<ucs-hot :hotMatch="gameCategorys" v-if="skgCode === skgUcsCode"></ucs-hot>

			<div v-if="skinCode !== '9393'">
				<div class="tree-sidebar" :class="{'tree-sidebar-SGYF': skinCode === 'SGYF', 'tree-sidebar-SGYF-hot': SGYF_tabActiveName === 'hot', 'tree-sidebar-SGGJ' : skinCode === 'SGGJ'}">
					<div class="tree-sidebar-left" v-if="skgCode !== skyLotteryCode && skinCode !== 'SGYF'">
						<div class="sidebar-icon" ref="sidebar_icon">
							<scroller ref="scroller_icon" :userSelect="false">
								<div class="sidebar-items">
									<div class="sidebar-item elevation-1 radius-1" ref="scrollItem"
										:class="{'sidebar-item-active' : platformCode === item.code}"
										v-for="(item, index) in comp_gameCategorys" :key="index"
										v-show="!(isShowHot !== 'hot' && item.code ==='hot')"
										@click="getGamePlatforms(item.code), changePlatformIndex(index)">
										<van-image
											:src="platformCode === item.code ? `./images/dashboard/sidebar/categorys/active/${item.code}.png` : `./images/dashboard/sidebar/categorys/${item.code}.png`">
											<div class="gameCategoryName">{{item.name}}</div>
											<template v-slot:loading>
												<van-loading type="spinner" size="20" />
											</template>
										</van-image>
									</div>
								</div>
							</scroller>
						</div>
					</div>

					<div class="tree-sidebar-right" :class="{'tree-sidebar-right-SGYF': skinCode === 'SGYF'}">
						<van-cell center is-link class="text-left"
							v-if="platformCodeActive === 'skyLottery'"
							@click="redirectRouter('lotteryLobby')">
							<template #title>
								<span v-if="skgCodeKey === 'SGMGM' && culture === 'vi-VN'" class="title-left-border">NHIỆM VỤ VIP</span>
								<span v-else-if="skgCodeKey === 'SGMP' && culture === 'vi-VN'" class="title-left-border">NHIỆM VỤ VIP</span>
								<span v-else class="title-left-border">{{$$t('hot')}} {{$t('lottery.title')}}</span>
							</template>
							<template #default>
								<span>{{ $t('tournaments.more') }}</span>
							</template>
						</van-cell>
						<div class="sidebar-content">
							<div class="sidebar-content-warp">
								<scroller ref="homeGames"
								:on-refresh="last"
								:on-infinite="$_throttle(loadMore)"
								refresh-layer-color="#fff"
								loading-layer-color="#fff">
									<!-- SGYF game hot类别下半部广告  -->
									<div v-if="skinCode === 'SGYF' && SGYF_tabActiveName === 'hot'" class="SGYF-hotgame-box">
										<div class="SGYF-hotgame"
											v-for="(itemData,index) in SGYFAdv_data" :key="index">
											<div class="SGYF-hotgame-title mt-4">
												<div v-if="gameCategorys.find(t => t.code === SGYF_hotgame_codes[index])">
													<span>{{gameCategorys.find(t => t.code === SGYF_hotgame_codes[index]).name}}</span>
												</div>
												<div @click="() => {SGYF_tabActiveName = SGYF_hotgame_codes[index], getGamePlatforms(SGYF_hotgame_codes[index])}"> 
													<span>{{ $t('tournaments.more') }}>></span>
												</div>
											</div>
											<div class="SGYF-hotgame-games SGYF-hotgame-slide">
												<template v-for="(item, index2) in itemData">
													<div :key="index2" v-if="index2 < 3"
													class="SGYF-hotgame-slide-item background-white radius-1 py-2 px-0">
														<div class="SGYF-hotgame-slide-item-img" :class="{'qp-img': index === 2}">
															<van-image
																:src="getGameImg(item.platformCode, item.imageName, null,item)"
																height="100%" width="100%" lazy-load
																@click.native.stop="goRouter(item, SGYF_hotgame_codes[index])">
																<template v-slot:loading>
																	<van-loading type="spinner" size="20" />
																</template>
															</van-image>
														</div>

														<div class="caption" style="max-width: 88px;">
															<p v-if="item.gameName" class="van-ellipsis">{{item.gameName}}</p>
														</div>
													</div>
												</template>
											</div>
										</div>
									</div>	
									
									<!-- 主皮肤 -->
									<GameList
									v-else
									:gameData="comp_platforms" 
									:unLoginOfKData="isShowK"
									:platformCodeActive="platformCodeActive" />
									<!-- 佔位子让scroll正常运作 -->
									<div v-if="skgCode !== 'skyLottery'"
									:style="`width:100%; height: ${scrollBasicHeight}px;`" />
								</scroller>
								<lottie-vue-player
									v-if="!isAllGameGotFinished"
									autoplay loop
									:backgroundColor="'#F7FAFD'"
									:speed="2"
									:src="`https://assets8.lottiefiles.com/private_files/lf30_9hubvnjh.json`"
									style="width: 100%; height:300px">
								</lottie-vue-player>
								<van-empty v-if="isAllGameGotFinished && !comp_platforms.length" :description="$t('scrollView.noMore')" class="text-center">
									<template #image>
										<van-image src="/images/empty/no-more.png" width="280" height="130" />
									</template>
								</van-empty>
							</div>
						</div>

					</div>
					<div class="platforms-overlay" v-if="platformsOverlay"></div>
					<div v-if="skinCode === 'SGYF'" style="width:12px; height: 100px;" /> 
				</div>

			</div>

			<!-- 向上捲動按鈕 -->		
			<van-button 
				v-if="skinCode === '9393' && scrollHeightOf9393 > 391"
				icon="arrow-up" round
				class="scroll-top-btn" 
				@click="$refs.dashboardScroller.scrollTo(0)">
			</van-button>
		</template>

		<div
			v-if="isShowAppDownload"
			class="app_download flex space-between align-items-center px-3"
		>
			<div class="flex align-items-center" style="width: 65%;">
				<van-icon name="cross" class="mr-2" @click.stop="closeAppDownload" />
				<div v-if="skgCodeKey === 'SGMGM' && culture === 'vi-VN'" class="body-2">TẢI APP NGAY HOÀN THÀNH NHIỆM VỤ TIỀN VỀ TAY NGAY TRONG NGÀY</div>
				<div v-else-if="skgCodeKey === 'SGMP' && culture === 'vi-VN'" class="body-2">TẢI APP NGAY HOÀN THÀNH NHIỆM VỤ TIỀN VỀ TAY NGAY TRONG NGÀY</div>
				<div v-else class="body-2">{{$$t('app_download_text')}}</div>
			</div>
			<van-button
				type="info"
				size="mini"
				class="mb-1"
				@click.stop="linkOpen(siteConfig && siteConfig.appDownloadUrl)"
			>
				{{$t('member.download')}}
			</van-button>
		</div>

		<!-- 左侧悬浮按钮 -->
		<div>
			<div v-if="(siteConfig && siteConfig.kfqqUrl) || showDraggable || (siteConfig && siteConfig.line)" class="event-qmenu" :class="{'event-qmenu-open': qmenuStatus}">
				<div class="handle" @click="qmenuStatus = !qmenuStatus">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 70">
						<g fill="#597EF7">
							<path d="M0,1.3l0,67.4c0.5-1.3,1.2-2.6,1.9-3.8c2-3.3,4.2-5.7,8.4-9.6l1.5-1.4C19.3,47,22,42.8,22,35s-2.7-12-10.2-18.9c-0.2-0.2-1.2-1.1-1.5-1.4c-4.2-3.9-6.5-6.3-8.4-9.6C1.2,3.9,0.5,2.6,0,1.3L0,1.3z"></path>
						</g>
					</svg>
				</div>
				<div class="btns">
					<div
						v-if="siteConfig && siteConfig.kfqqUrl"
						class="btn"
						@click="linkOpen(siteConfig && siteConfig.kfqqUrl)"
					>
						<div>
							<svg v-if="siteConfig && siteConfig.codeKey === 'XOSOVN'" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 48 48"><radialGradient id="8O3wK6b5ASW2Wn6hRCB5xa" cx="11.087" cy="7.022" r="47.612" gradientTransform="matrix(1 0 0 -1 0 50)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1292ff"/><stop offset=".079" stop-color="#2982ff"/><stop offset=".23" stop-color="#4e69ff"/><stop offset=".351" stop-color="#6559ff"/><stop offset=".428" stop-color="#6d53ff"/><stop offset=".754" stop-color="#df47aa"/><stop offset=".946" stop-color="#ff6257"/></radialGradient><path fill="url(#8O3wK6b5ASW2Wn6hRCB5xa)" d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564	c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499	C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"/><path d="M34.992,17.292c-0.428,0-0.843,0.142-1.2,0.411l-5.694,4.215	c-0.133,0.1-0.28,0.15-0.435,0.15c-0.15,0-0.291-0.047-0.41-0.136l-3.972-2.99c-0.808-0.601-1.76-0.918-2.757-0.918	c-1.576,0-3.025,0.791-3.876,2.116l-1.211,1.891l-4.12,6.695c-0.392,0.614-0.422,1.372-0.071,2.014	c0.358,0.654,1.034,1.06,1.764,1.06c0.428,0,0.843-0.142,1.2-0.411l5.694-4.215c0.133-0.1,0.28-0.15,0.435-0.15	c0.15,0,0.291,0.047,0.41,0.136l3.972,2.99c0.809,0.602,1.76,0.918,2.757,0.918c1.576,0,3.025-0.791,3.876-2.116l1.211-1.891	l4.12-6.695c0.392-0.614,0.422-1.372,0.071-2.014C36.398,17.698,35.722,17.292,34.992,17.292L34.992,17.292z" opacity=".05"/><path d="M34.992,17.792c-0.319,0-0.63,0.107-0.899,0.31l-5.697,4.218	c-0.216,0.163-0.468,0.248-0.732,0.248c-0.259,0-0.504-0.082-0.71-0.236l-3.973-2.991c-0.719-0.535-1.568-0.817-2.457-0.817	c-1.405,0-2.696,0.705-3.455,1.887l-1.21,1.891l-4.115,6.688c-0.297,0.465-0.32,1.033-0.058,1.511c0.266,0.486,0.787,0.8,1.325,0.8	c0.319,0,0.63-0.107,0.899-0.31l5.697-4.218c0.216-0.163,0.468-0.248,0.732-0.248c0.259,0,0.504,0.082,0.71,0.236l3.973,2.991	c0.719,0.535,1.568,0.817,2.457,0.817c1.405,0,2.696-0.705,3.455-1.887l1.21-1.891l4.115-6.688c0.297-0.465,0.32-1.033,0.058-1.511	C36.051,18.106,35.531,17.792,34.992,17.792L34.992,17.792z" opacity=".07"/><path fill="#fff" d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74	c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01	l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"/></svg>
							<svg v-else xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><defs><linearGradient id="svgIDa" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#2AABEE"/><stop offset="100%" stop-color="#229ED9"/></linearGradient></defs><path fill="url(#svgIDa)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51c0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"/><path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072Z"/></svg>
						</div>
					</div>
					<div
						v-if="siteConfig && siteConfig.line"
						class="btn"
						@click="linkOpen(siteConfig && siteConfig.line)"
					>
						<div>
							<van-image v-if="siteConfig.codeKey === 'SGDP'" src="/images/dashboard/dp568.png" width="1.2rem" height="1.2rem" />									
							<van-image v-else src="/images/dashboard/line.png" width="1.2rem" height="1.2rem" />									
						</div>
					</div>
					<div class="btn" v-if="showDraggable">
						<div class="draggable_c">
							<van-image src="/images/dashboard/turntable.png" width="1.2rem" height="1.2rem"
								@click.stop="redirectRouter('turntable')" />
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<van-popup :close-on-click-overlay="false" closeable v-model="showPopup" @click-close-icon="onHideShow">
			<div class="center">
				<div class="title text-left pl-4 py-3">{{$$t('notice')}}</div>
				<div class="text background-white">
					<van-swipe>
						<van-swipe-item v-for="(p, index) in popMsgs" :key="index">
							<EasyRefresh :userSelect="false" :bouncing="false">
								<div class="subtitle-3 mb-2">{{p.title}}</div>
								<div class="mb-2">{{p.createTime}}</div>
								<div v-html="p && p.content"></div>
							</EasyRefresh>
						</van-swipe-item>
					</van-swipe>
				</div>
			</div>
		</van-popup>

		<van-popup :close-on-click-overlay="false" closeable v-model="showWinBroadcast" style="overflow: hidden;">
			<div class="center-win">
				<div class="title text-left pl-4">{{ $$t('_1') }}</div>
				<div class="text background-white">
					<scroller  style="height: 400px !important; margin-top: 1.4rem; padding: 0 30px;">
						<div style="height: 0.3rem;"></div>
						<div v-for="(item, index) in SGGJWinBroadcast" :key="item.name">
							<div class="flex mb-4" :class="{ 'win-animation': index === 0 }" style="align-items: center;">
								<van-image :src="getLotteryImage(item.icon)" width="0.8rem" height="0.8rem">
									<template v-slot:loading>
										<van-loading type="spinner" size="22" />
									</template>
								</van-image>
								<div>
									<div class="ml-3" style="display: flex;">
										<div class="subtitle-3" style="height: 0.55rem; line-height: 0.55rem;">{{ item.name }}</div>
										<div class="subtitle-3 ml-3" style="height: 0.55rem; line-height: 0.55rem;">{{item.game}}</div>
									</div>
									<div class="subtitle-3 ml-3" style="color: red; height: 0.55rem; line-height: 0.55rem;">
										{{
											memberData && memberData.currencySymbol ||
											isShowK.symbol
										}}
										{{ item.price }}
										{{
											memberData && memberData.currencyDenomination ||
											isShowK.denomination
										}}
									</div>
								</div>
							</div>
						</div>
						<div style="height: 1.3rem;"></div>
					</scroller>
				</div>
			</div>
		</van-popup>

		<!-- 轮盘备份 -->
		<div class="draggable_d" v-if="null === true">
			<!--        <draggable-->
			<!--            :w="85"-->
			<!--            :h="110"-->
			<!--            :resizable="false"-->
			<!--            :is-conflict-check="true"-->
			<!--            :x="310"-->
			<!--            :y="320"-->
			<!--            :parent="true" style="z-index: 10;">-->
			<!--          <div class="draggable_c">-->
			<!--            <van-image src="/images/dashboard/turntable.png" width="2.133rem" height="2.533rem" @click="redirectRouter('turntable')"/>-->
			<!--            <van-image src="/images/dashboard/turntable_close.png" width="14px" height="14px" class="close" @click="hideDraggable"/>-->
			<!--          </div>-->
			<!--        </draggable>-->

			<div class="draggable_c">
				<van-image src="/images/dashboard/turntable.png" width="2.133rem" height="2.133rem"
					@click.stop="redirectRouter('turntable')" />
				<van-image src="/images/dashboard/turntable_close.png" width="16px" height="16px" class="close"
					@click.stop="hideDraggable" />
			</div>
		</div>

	</div>
</template>

<script>
	import sessionContext from '@/mixins/sessionContext'
	import {getTokenFromCookie} from "@/utils/auth";
	import GameList from "./comps/GameList"
	import UcsHot from "@/modules/dashboard/views/UcsHot"
	import S666 from "@/modules/dashboard/views/comps/S666"
	import Skin6677866 from "@/modules/dashboard/views/comps/skin6677866"
	// import Draggable from 'vue-draggable-resizable-gorkys'
	import { save_totalData } from'@/utils/fake'

	export default {
		name: 'Dashboard',
		mixins: [sessionContext],
		
		components: {
			UcsHot,
			GameList,
			S666,
			Skin6677866,
		},

		data: () => ({
			notice: '123',
			totalGameData: {},
			gameCategorys: [],
			platformsOverlay: false,
			isShowK: {},
			shortOf9393:['cp' ,'sx','dj','ty'],
			scrollHeightOf9393: 0,
			totalDataOf9393: [],
			activeOf9393: [],
			pureIndex: 0,
			qmenuStatus: false,
			platformCode: 'hot',
			platforms: [],
			platformIndex: 0,
			swipes: [],
			popMsgs: null,
			showPopup: false,
			refreshIcon: false,
			isShowHot: null,
			platformCodeActive: '',
			showAppDownload: false,
			hotMatch: [],
			onlineUsers: 0,
			hotLotterys: [],
			lotteriesMap: null,
			lotteryGroup: [],
			curLotteryList: [],
			SGYF_tabActiveName: '',
			SGYFAdv_data: [],
			SGYF_hotgame_codes: ['sx','ty','qp'],
			SGGJWinBroadcast: [],
			SGGJWinBroadcastFormarquee: [],
			showWinBroadcast: false,
			timer: null,
		}),

		computed: {
			com_text(){
				return window.navigator.userAgent.toLowerCase();
			},
			isAllGameGotFinished() {
				return Object.keys(this.totalGameData).length !== 0;
			},
			comp_gameCategorys(){
				let pre = this.gameCategorys.length ? this.gameCategorys : JSON.parse(sessionStorage.getItem("gameCategorys"))
				return pre
			},
			comp_platforms(){
				let pre = this.platforms.length 
					? this.platforms
					: this.platformCode === 'hot'
						? this.totalGameData[this.platformCode] ? this.totalGameData[this.platformCode].games : []
						: this.totalGameData[this.platformCode] ? this.totalGameData[this.platformCode].games.data.data: []
				return pre
			},
			scrollBasicHeight() {
				if (window.innerHeight < 700) {
					if (this.gameCategorys.length === (this.pureIndex + 1)) {
						return this.platforms.length > 1 ? 0 : 30;
					}
					return Math.floor(window.innerHeight * 0.15);
				}
				return Math.floor(window.innerHeight * 0.23);
			},
			cultures() {
				let pre = this.siteConfig && this.siteConfig.cultures;
				// 给个预设以免初次载入抓空
				if (!pre) pre = [
					{name: "简体中文", code: "zh-CN", currency: "CNY", isDefault: true, isOpen: true},
					{name: "English", code: "en-US", currency: "USD", isDefault: false, isOpen: true},
					{name: "Tiếng Việt", code: "vi-VN", currency: "VND", isDefault: false, isOpen: true},
					{name: "ไทย", code: "th-TH", currency: "THB", isDefault: false, isOpen: true},
					{name: "bahasa Indonesia", code: "id-ID", currency: "IDR", isDefault: false, isOpen: true},
					{name: "हिंदी", code: "hi-IN", currency: "INR", isDefault: false, isOpen: true}
				]
				return pre;
			},

			showDraggable() {
				return this.$store.getters.showDraggable;
			},

			navItems() {
				if (['SGMGM', 'SGMP', 'SGYD'].includes(this.skgCodeKey)) {
					return [{
							img: '/images/dashboard/deposit.png',
							title: 'deposit',
							link: 'recharge'
						},
						{
							img: '/images/dashboard/withdrawal.png',
							title: 'withdraw',
							link: 'withdraw'
						},
						{
							img: '/images/dashboard/transfer.png',
							title: 'transfer',
							link: 'purses/transfer'
						},
					];
				} else if (this.skgCode === this.skgGameCode) {
					console.log('img');
					return [{
							img: './images/dashboard/deposit.png',
							title: 'deposit',
							link: 'recharge'
						},
						{
							img: './images/dashboard/withdrawal.png',
							title: 'withdraw',
							link: 'withdraw'
						},
						{
							img: './images/dashboard/transfer.png',
							title: 'transfer',
							link: 'purses/transfer'
						},
						{
							img: './images/dashboard/vip_info.png',
							title: 'vip',
							link: 'privileges'
						}
					];
				} else {
					return [{
							img: './images/dashboard/deposit.png',
							title: 'deposit',
							link: 'recharge'
						},
						{
							img: './images/dashboard/withdrawal.png',
							title: 'withdraw',
							link: 'withdraw'
						},
						{
							img: './images/dashboard/vip_info.png',
							title: 'vip',
							link: 'privileges'
						}
					];
				}
			},

			isShowAppDownload() {
				return false;
			},

			winBroadcast() {
				const pre = this.memberData && this.memberData.currencySymbol || this.isShowK.symbol || ''
				const end =this. memberData && this.memberData.currencyDenomination || this.isShowK.denomination || ''
				if (!this.SGGJWinBroadcastFormarquee.length) {
					return '';
				}
				
				return this.SGGJWinBroadcastFormarquee.map((item) => {
					return `
					<span style="color: #444">${item.name}</span> <span style="color: #666">${item.game}</span> <span style="color: red; margin-right: 12px">${pre} ${item.price} ${end}</span>
					`
				}).join('');
			}
		},

		watch: {
			platformIndex(v) {
				if (this.skinCode !== 'SGGJ') return
				this.$refs.scroller_icon.scrollTo(0, v * 70, 0.3);
			},

			'$route' () {
				if (this.skinCode === 'SGYF'){
					// 刷新 SGYF 的頂部tab
					this.getGamePlatforms('hot');
					this.SGYF_tabActiveName = 'hot';
				}
			}
		},

		created() {
			this.showAppDownload = !this.$sessionGet('showAppDownload');
		},

		mounted() {
			if ( this.skgCode !== this.skgGameCode || !this.$sessionGet('gameCategorys')){
				console.log(1);
				return new Promise((resolve) => {
					this.showProgress()
					// 等待语言设定完成
					setTimeout(async () => {
						if (this.skgCode === this.skgUcsCode) this.onLoadHotMatch()
						else if (this.skgCode === this.skyLotteryCode) this.onGetLottery()
						else this.getGameCategorys();
						this.onLoadSlide();
						// this.onLoadAllNotice();
						// 彩种map
						this.getCurrency();
						// this.$refs.countDownHotMatch.pause();
						this.showProgress(false);
						this.init();
						resolve();
					}, 2000);
				})
			} else {
				console.log(2);
				this.gameCategorys = this.$sessionGet('gameCategorys');
				if(this.skinCode === '9393') this.totalDataOf9393 = this.$sessionGet('save_totalDataOf9393') || this.getGameCategorys();
				this.getHotLists(); // 一般热门游戏
				this.onLoadSlide();
				// this.onLoadAllNotice();
				this.init();
			}
		},

		methods: {
			init() {
				this.getGroup(); // 彩种map
				this.getCurrency();
				// SGYF
				if(this.skinCode === 'SGYF') {
					this.fetchSGYFAdv();
					this.SGYF_tabActiveName = 'hot';
				}
				// 避免初始化没抓到 user data
				if (getTokenFromCookie()) {
					this.initMemberData();
					this.initMemberInfo();
				}
			},
			handleBgColor() {
				switch (this.skinCode) {
					case 'S666':
						return '#293356';
					default:
						return '#fff;';
				}
			},

			getLotteryName(type) {
				const curLottery = this.lotteryGroup.find((item) => item.type === type);
				return curLottery && curLottery.name || '';
			},

			getCurLottery(type) {
				const curLottery = this.lotteryGroup.find((item) => item.type === type);
				return curLottery;
			},

			changeLottery(type) {
				if (['all', 'hot'].includes(type)) {
					this.curLotteryList = [];
					this.lotteryGroup.forEach((item) => {
						this.curLotteryList.push(...item.lotteries);
					});
					if (type === 'hot') {
						const hotData = this.curLotteryList.filter((item) => item.tagClass === 'hot');
						const hotTypeData = hotData.map(t => t.type);
						// 去重
						this.curLotteryList = hotData.filter((item, index) => hotTypeData.indexOf(item.type) === index);
					}
					return;
				}
				const curLottery = this.lotteryGroup.find((item) => item.type === type);
				this.curLotteryList = curLottery.lotteries;
			},
		
			handleScrollHeight(e){
				this.scrollHeightOf9393 = e;
			},
			async make9393Data(prvData){
				this.showProgress();
				let totalData = prvData ? [{name: this.gameCategorys[0].name, games: prvData, platformCode: this.gameCategorys[0].code}] : []
				for (let i=1; i < this.gameCategorys.length ; i ++ ){
					await this.$get(`/api/Game/GamePlatforms?categoryCode=${this.gameCategorys[i].code}&source=1`)
					.then(data => {
						totalData.push({name: this.gameCategorys[i].name, games:data.data.data, platformCode:this.gameCategorys[i].code})
					})
					.catch(error => {
						this.procError(error);
					})
				}
				this.showProgress(false);
				this.totalDataOf9393 = totalData;
				this.$sessionSet('save_totalDataOf9393', totalData);
			},
			async fetchAllGameData(prvData){
				if (sessionStorage.getItem("totalGameData")) {
					this.totalGameData = JSON.parse(sessionStorage.getItem("totalGameData"));
					if(this.skinCode === 'SGYF') {
						this.getGamePlatforms('hot');
					}
					return
				}
				if (this.skinCode !== 'S666') this.showProgress();
				// 有无热门游戏
				let totalData = prvData ? {
					hot: {name: this.gameCategorys[0].name, games: prvData, platformCode: this.gameCategorys[0].code}
				} : {}

				// let promises = []
				// for (let i=1; i < this.gameCategorys.length ; i ++ ){
				// 	promises.push(this.$get(`/api/Game/GamePlatforms?categoryCode=${this.gameCategorys[i].code}&source=1`))
				// }

				// Promise.all(promises).then(values => {
				// 	for (let i=1; i < this.gameCategorys.length ; i ++ ){
				// 			totalData[this.gameCategorys[i].code] = 
				// 			{
				// 				name: this.gameCategorys[i].name,
				// 				games: values.find(t => t.data.message.includes(this.gameCategorys[i].code)),
				// 				platformCode:this.gameCategorys[i].code
				// 			}
				// 	}
				// 	if (this.skinCode !== 'S666') this.showProgress(false);
				// 	if(this.skinCode === 'SGYF') {
				// 		this.getGamePlatforms('hot');
				// 	}
				// 	console.log('totalData=>', JSON.stringify(totalData));
				// 	this.totalGameData = totalData;
				// 	this.platforms = totalData[this.gameCategorys[0].code].games
				// 	this.$sessionSet('totalGameData', totalData);
				// });
				
				this.totalGameData = save_totalData;
				this.platforms = save_totalData[this.gameCategorys[0].code].games
				this.$sessionSet('totalGameData', save_totalData);
			},
			getCurrency() {
				this.isShowK = {};
				this.$post('/api/Account/GetCurrency')
					.then(resp => {
						console.log('home:getCurrency=>', resp);
						return this.checkResp(resp, (r) => r.data.success === true);
					})
					.then(data => {
						console.log('home:getCurrency:2=>', data);
						if (data.data.length){
							const preData = data.data.find(t => t.isDefault);
							this.isShowK = preData;
						}
					})
					.catch(error => {
						this.procError(error);
					});
			},
			last(){
				if(this.pureIndex === 0) {
					this.$refs.homeGames && this.$refs.homeGames.finishPullToRefresh();
					return;
				}
				this.pureIndex -= 1;
				this.platformCode = this.gameCategorys[this.pureIndex].code;
				
				this.getGamePlatforms(this.gameCategorys[this.pureIndex].code);
				this.changePlatformIndex(this.pureIndex);
			},
			loadMore(){
				if(!this.comp_platforms.length || this.pureIndex === this.gameCategorys.length -1) {
					return;
				}
				if(this.pureIndex < this.gameCategorys.length -1 ) this.pureIndex += 1
				this.platformCode = this.gameCategorys[this.pureIndex].code;
				window.addEventListener('touchmove', (e)=> e.preventDefault(),{passive:false})
				
				
				this.getGamePlatforms(this.gameCategorys[this.pureIndex].code);
				this.changePlatformIndex(this.pureIndex);				
			},

			onGetLottery() {
				this.platformCodeActive = 'skyLottery';
				Promise.all([
					this.getLottery(),
					this.getGroup()
				]).then( () => {
					this.gameCategorys = ['skyLotteryHasReady'];
				});
			},

			getLottery() {
				this.$get('/api/Lottery/GetLottery')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true);
					})
					.then(data => {
						let d = data.data;
						const hotData = d.filter(e => e.tagClass === 'hot');
						this.platforms = hotData.slice(0,6);
						this.$sessionSet('gamePlatformsLottery', hotData);
					})
					.catch(error => {
						this.procError(error);
					})
			},

			getGroup() {
				this.$get('/api/Lottery/GetGroup')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true);
					})
					.then(data => {
						let d = data.data;
						let pre = [];
						for(let item of d){
							for(let lotterie of item.lotteries){
								lotterie.bigType = item.type
								pre.push(lotterie)
							}
						}
						this.lotteriesMap = pre;
						this.lotteryGroup = d;
						this.changeLottery('hot');
						this.$sessionSet('gameCategorysLottery', pre);
						this.$sessionSet('gameCategoryLotteryGroup', d);
						if (this.skinCode === "SGGJ") {
							this.makeFakeOwnData(data)
						}
					})
					.catch(error => {
						this.procError(error);
					});
			},

			goLotteryRouter(item) {
				const _bigType = this.lotteriesMap.find(t => t.type === item.type).bigType
				sessionStorage.setItem('rules_code', _bigType)
        
				const specialTyps = ['PK10','K3']
					if (specialTyps.indexOf(_bigType) > -1) {
						sessionStorage.setItem('gameCode_item', item.type)
						this.$router.push('PK10')
						return
					}
				sessionStorage.setItem('gameCode_item', item.type)
				this.$router.push('lottery')
			},

			onLoadAllNotice() {
				this.$post('/api/Home/GetAllNotice')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.notice = ''
						let scrollMsgs = d.scrollMsgs.filter(e => e.noticeType === 3)
						let popMsgs = d.popMsgs
						if (scrollMsgs.length > 0) {
							let that = this
							scrollMsgs.forEach(function(e) {
								that.notice += e.content
							})
						} else this.notice = null
						if (popMsgs.length > 0) {
							let e = this.$sessionGet('Home-Popup')
							if (getTokenFromCookie()) {
								this.popMsgs = popMsgs.filter(e => e.noticeType === 2)
								this.showPopup = this.popMsgs.length > 0 && !e;
							} else {
								this.popMsgs = popMsgs.filter(e => e.noticeType === 1)
								this.showPopup = this.popMsgs.length > 0 && !e;
							}
						} else {
							this.showPopup = false
							this.popMsgs = null
						}
					})
					.catch(error => {
						this.procError(error)
					})
			},

			onLoadSlide() {
				this.$post('/api/Home/GetSlide')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.swipes = data.data
					})
					.catch(error => {
						this.procError(error)
					});
			},

			getGameCategorys() {
				this.$get('/api/Game/GameCategorys')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						console.log('首页=>' ,data);
						let d = data.data
						let hotGame = {
							code: 'hot',
							name: this.$$t('hot'),
							tag: 'hot'
						}
						d.splice(0, 0, hotGame);
						this.gameCategorys = d
						this.$sessionSet('gameCategorys', d)
						this.getHotLists()
					})
					.catch(error => {
						this.procError(error)
					});
			},

			getGamePlatforms(categoryCode) {
				if (this.skinCode === 'SGYF' && this.$sessionGet('gameCategorys')) {
					const keyIndex = this.gameCategorys.findIndex(t => t.code === categoryCode)
					this.pureIndex = keyIndex
					this.SGYF_tabActiveName = this.gameCategorys[keyIndex].code
				}
				if (sessionStorage.getItem("totalGameData")) {
					this.totalGameData = JSON.parse(sessionStorage.getItem("totalGameData"));
				}
				this.platforms = []
				this.platformsOverlay = true
				setTimeout(() => {
					this.platforms = categoryCode === 'hot' ?
						this.totalGameData[categoryCode].games :
						this.totalGameData[categoryCode].games.data.data

					this.platformCodeActive = categoryCode
					this.platformCode = categoryCode
					if (this.$refs.homeGames){
						this.$refs.homeGames.scrollTo(0,0,false)
						this.$refs.homeGames.finishInfinite(false)
					}
					// 開放滑動
					window.removeEventListener('touchmove', (e)=> e.preventDefault(),{passive:true})
					this.platformsOverlay = false
					}, 1)
			},

			fetchSGYFAdv(){
				Promise.all([
					this.$get(`/api/Game/GamePlatforms?categoryCode=sx&source=1`),
					this.$get(`/api/Game/GamePlatforms?categoryCode=ty&source=1`),
					this.$get(`/api/Game/GamePlatforms?categoryCode=qp&source=1`)
				]).then( resp => {
					this.SGYFAdv_data = resp.map(item => item.data.data)
				})
			},

			getHotLists() {
				if ( this.skinCode !== 'SG888' || !this.$sessionGet('gamePlatforms') || !this.$sessionGet('gamePlatforms').length){
				this.$post(`/api/Game/Games`, {
						pageIndex: 1,
						pageSize: 1000,
						source: 1,
						tag: 'hot'
					})
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						if (d.items.length === 0) {
							this.isShowHot = null
							this.platformCode = this.gameCategorys[1].code
							if(this.skinCode === '9393') this.make9393Data(null)
							else this.fetchAllGameData(null)
							this.getGamePlatforms(this.platformCode)
						} else {
							this.isShowHot = 'hot'
							this.platformCode = 'hot'
							this.platformCodeActive = 'hot'
							this.$sessionSet('gamePlatforms', d.items)
							if(this.skinCode === '9393') this.make9393Data(d.items)
							else this.fetchAllGameData(d.items)
						}
					})
					.catch(error => {
						this.procError(error)
					})
				} else {
						this.isShowHot = 'hot'
						this.platformCode = 'hot'
						this.platformCodeActive = 'hot'
						this.platforms = this.$sessionGet('gamePlatforms')
				}
			},

			onLoadHotMatch() {
				if (this.skgCode !== this.skgUcsCode) return
				this.$post('/api/Match/HotMatch?count=10')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						let d = data.data
						this.gameCategorys = d
						this.getOnlineUsers()
						this.$refs.countDownHotMatch.reset();
					})
					.catch(error => {
						this.procError(error)
					})
			},

			getOnlineUsers() {
				this.$get('/api/Home/GetOnlineUsers')
					.then(resp => {
						return this.checkResp(resp, (r) => r.data.success === true)
					})
					.then(data => {
						this.onlineUsers = data.data
					})
					.catch(error => {
						this.procError(error)
					})
			},

			changePlatformIndex(index) {
				if(this.pureIndex !== index ) this.pureIndex = index
				let len = this.gameCategorys.length
				if (index > 1 && len > index + 2) this.platformIndex = index - 1
				else if (index === this.platformIndex) this.platformIndex = 0
			},

			redirectWithdraw(n) {
				let e = this.memberData && this.memberData.memberType
				if (this.isDottedMember()) {
					return;
				}
				if (e === 2 && n !== 'withdraw') {
					return this.$error(this.$t('common.isDotted'));
				}
				if (!this.isLogin()) return
				if (n !== 'privileges' && this.isDottedGames()) return
				if (n === 'withdraw') {
					this.$post('/api/Withdraw/GetWithdrawMoneyShowInfo')
						.then(resp => {
							return this.checkResp(resp, (r) => r.data.success === true)
						})
						.then(() => {
							this.$router.push('withdraw')
						})
						.catch(error => {
							if (Number(error.message) === 1) {
								this.$router.push('/app/addPay')
							} else if (Number(error.message) === 2) {
								this.$dialog.confirm({
										title: this.$t('common.point'),
										message: this.$$t('pwdDesc'),
									})
									.then(() => {
										this.$router.push('setWithdrawalPwd')
									});
							}
						})
				} else {
					this.$router.push(n)
				}
			},

			redirectLinkUrl(v) {
				if (v !== 'null' && v) this.linkOpen(v)
			},

			refreshBalance() {
				this.refreshIcon = !this.refreshIcon;
				setTimeout(() => {
					this.refreshIcon = !this.refreshIcon;
				}, 1000)

				this.refreshMemberData()
			},

			goRouter(item, SGYF_categoryCode) {
				if (item.platformCode === 'SGLottery') {
					if (this.isLogin()) {
						if (item.gameCode !== 'SGLottery') {
							const mapData = JSON.parse(sessionStorage.getItem('gameCategorysLottery'))
							const curBigType = mapData.find(t => (t.type === item.gameCode) && (t.bigType !== 'hot')).bigType;
							const specialTyps = ['PK10','K3']
							let lotteryPath
							sessionStorage.setItem('rules_code', curBigType)
							sessionStorage.setItem('gameCode_item', item.gameCode)
							if (specialTyps.indexOf(curBigType) > -1) lotteryPath = 'PK10'
							else if (curBigType === "SSC") lotteryPath = "ssc"
							else if (curBigType === "VNSouth") lotteryPath = "vnsouth"
							else if (curBigType === "Mark6") lotteryPath = "mark6"
							else lotteryPath = 'lottery'
							this.$router.push(lotteryPath)
						} else {
							this.redirectRouter('/app/lotteryLobby')
						}
					}
					return
				}

				if (item.platformCode === 'SGUcs') {
					if (this.isLogin()) {
						this.redirectRouter('/app/ucs')
					}
					return
				}

				if (!item.hasGameItems) {
					this.getGameLoginUrl(item.platformCode, item.gameCode)
				} else {
					const categoryCode = SGYF_categoryCode || this.platformCode;
					this.$router.push({
						path: 'gameLists',
						query: {
							platformCode: item.platformCode,
							title: item.platformName,
							categoryCode
						}
					})
				}
			},

			redirectScrollMsgs() {
				this.$router.push('scrollMsgs');
			},

			onHideShow() {
				this.showPopup = false
				this.$sessionSet('Home-Popup', true);
			},

			hideDraggable() {
				this.$store.commit("setShowDraggable", false);
			},

			closeAppDownload() {
				this.showAppDownload = false;
				this.$sessionSet('showAppDownload', true);
			},

			$$t(v) {
				return this.$t('dashboard.' + v);
			},

			makeFakeOwnData({ data }) {
				const allLottery = [];
				data.forEach((item) => {
					allLottery.push(...item.lotteries)
				})
				const mapGames = allLottery
					.filter((t) => t.name !== null)
					.map((t) => t.name + '-' + t.icon);
				const maxNum = mapGames.length - 1;
				const randomKey = (min, max) =>
					Math.floor(Math.random() * (max - min + 1)) + min;

				const list = [];
				for (let i = 0; i < 100; i++) {
					const data = mapGames[randomKey(0, maxNum)];
					list.push({
						name: this.hidenText(this.handleRandomAccount()),
						game: data.split('-')[0],
						price: Math.floor(Math.random() * (50 - 100000)) + 100000,
						icon: data.split('-')[1],
					})
					
				}
				this.SGGJWinBroadcast = list;
				this.SGGJWinBroadcastFormarquee = list;
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.SGGJWinBroadcast.splice(this.SGGJWinBroadcast.length - 1, 1)
					const data = mapGames[randomKey(0, maxNum)];
					this.SGGJWinBroadcast.unshift({
						name: this.hidenText(this.handleRandomAccount()),
						game: data.split('-')[0],
						price: Math.floor(Math.random() * (50 - 100000)) + 100000,
						icon: data.split('-')[1],
					})
				}, 5000)
			},

			handleRandomAccount() {
				const upperChars = [];
				const lowerChars = [];
				// A ~ Z 的編碼是 65 ~ 90
				for (let i = 65; i < 91; i++) {
					let char = String.fromCharCode(i);
					upperChars.push(char);
					lowerChars.push(char.toLowerCase());
				}
				const nums = [];
				for (let i = 0; i <= 9; i++) {
					nums.push(i);
				}
				// 合併大小寫字母與數字
				const arr = upperChars.concat(lowerChars, nums);
				const sixCodes = [];

				for (let i = 1; i <= 6; i++) {
					let randomCode = arr[Math.floor(Math.random() * 62)];
					sixCodes.push(randomCode);
				}
				return sixCodes.join("");
			},

			hidenText(str) {
				//str：要进行隐藏的变量  frontLen: 前面需要保留几位   endLen: 后面需要保留几位
				var len = str.length - 2 - 2;
				var xing = "";
				for (var i = 0; i < len; i++) {
					xing += "*";
				}
				return (
					str.substring(0, 2) +
					xing +
					str.substring(str.length - 2)
				);
			},
		},

		beforeDestroy() {
			clearInterval(this.timer);
			this.timer = null;
		},

		beforeRouteLeave(to, form, next) {
			// if (this.skinCode !== 'SG888' && this.skinCode !== 'S666') {
			// 	this.$refs.countDownHotMatch.pause();
			// }
			next();
		}
	}
</script>

<style lang="less" scoped>
	#dashboard {
		width: 100%;
		height: 100%;		

		.dashboard-top {
			padding: 0 14px;
		}

		.van-swipe {
			height: 148px;
			border-radius: 10px;

			img {
				height: 148px;
				width: 100%;
				border-radius: 10px;
			}
		}

		.app_download {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			text-align: left;
			background: rgba(66, 68, 78, 0.9);
			color: #fff;
			padding: 4px 12px !important;
		}

		.van-notice-bar {
			margin-top: 4px;
			height: 30px;
			padding: 0;
			font-size: 12px;

			/deep/ .hot_text {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 14px;
				right: 0;
				color: white;
				line-height: 20px;
				height: 20px;
				font-size: 12px;
			}

			.onlineUsers {
				background-color: #a2baff;
				color: white;
			}
		}

		.nav-items {
			margin-top: 4px;
			padding: 0 6px;
			height: 68px;
			display: flex;
			align-items: center;

			.item-left {
				width: 40%;
				padding: 0 1px;
				display: flex;
				flex-direction: column;
				
				.loginBtnHasBorder {
					background: #399fda;
					border-radius: 5px;
					padding: 0 10px;
					margin: 2px 10px;
					color: #fff;
					min-width: 82px;
					white-space: nowrap;
					display: flex;
					justify-content: center;
				}
				.loginBtnHasBorder-2 {
					background: #ffa84d;
				}

				>div {
					display: flex;
					justify-content: space-between;
					height: 20px;
					align-items: center;
					line-height: 12px;
				}

				.refresh {
					transform: rotate(360deg);
					transition: all 1s;
				}

				.memberName {
					width: 80px;
					font-size: 14px;
				}

				.money {
					margin-top: 9px;
					font-size: 20px;
					font-weight: 600;
				}
			}

			.item-right {
				width: 60%;
				color: #535867;
				font-weight: bold;
			}
		}

		.title-left-border {
			border-left: 5px solid #597ef7;
			padding-left: 8px;
		}

		.title-left-border-bolder {
			color: #597ef7;
			font-weight: bolder;
			font-size: 16px;
		}
		
		.tree-sidebar {
			margin-top: 10px;
			position: absolute;
			top: 260px;
			right: 0;
			left: 10px;
			bottom: 0;
			display: flex;
			justify-content: flex-start;
			padding-right: 10px;

			.tree-sidebar-left {
				width: 72px;
				height: 100%;
				margin-right: 12px;

				.sidebar-icon {
					height: 100%;
					width: 72px;
					background-color: #F7FAFD;

					.sidebar-items {
						transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
						transition-duration: 350ms;

						.sidebar-item {
							height: 68px;
							width: 60px;
							transition: .3s ease;
							text-align: center;

							/deep/ .gameCategoryName {
								color: rgb(144, 154, 199);
							}
						}

						/deep/ .gameCategoryName {
							position: absolute;
							top: 44px;
							text-align: center;
							width: 100%;
							font-weight: bolder;
							font-size: 13px;
						}
					}


					.sidebar-item-active {
						width: 72px !important;
						height: 74px !important;

						/deep/ .gameCategoryName {
							color: white !important;
							font-size: 14px;
						}
					}
				}
			}
			.platforms-overlay {
				width: 100%;
				height: 100%;
				z-index: 9999;
				background: transparent;
				position: absolute;
			}
			.tree-sidebar-right {
				width: 100%;
				padding-left: 0;
				padding-right: 0;
				height: 100%;
				background-color: #F7FAFD;

				.sidebar-content {
					height: 100%;
					width: 100%;
					position: relative;

					.sidebar-content-warp {
						height: 100%;
						width: 100%;

						/deep/ .van-image {
							border-radius: 4px;

							.van-image__img {
								border-radius: 4px;
							}
						}
					}
				}
			}
			.tree-sidebar-right-SGYF {
				background: #fff;
			}
			.notice-box {
				background: #fff;
				width: 100%;
				margin-bottom: 2rem;
				height: 100px;
			}
		}

		.tree-sidebar-SGYF {
			top: 280px;
		}
		.tree-sidebar-SGYF-hot {
			top: 350px;
		}

		.tree-sidebar-SGGJ {
			top: 295px;
		}

		.tree-sidebar-9393 {
			left: 0;
			padding: 0;
			.active-bg {
				/deep/.van-collapse-item__content, /deep/.van-cell{
					background-color: #DCD9D4;
					background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%);
					background-blend-mode: soft-light,screen;
				}
			}
		}

		.event-qmenu {
			-webkit-animation: aqm 1.8s ease infinite;
			animation: aqm 1.8s ease infinite;
			bottom: 100px;
			-webkit-filter: drop-shadow(0 2px 6px rgba(0,0,0,.8));
			filter: drop-shadow(0 2px 6px rgba(0,0,0,.8));
			height: auto;
			right: -61px;
			min-height: 50px;
			position: fixed;
			transition: .3s ease;
			width: 90px;
			z-index: 21;
			transform:scaleX(-1);
			.handle {
				bottom: 5px;
				position: absolute;
				right: 0px;
				width: 30px;
				&::after{
					content: "";
					border-style: solid;
					border-width: 10px 0 10px 12px;
					border-color: transparent transparent transparent #fff;
					position: absolute;
					left: 27%;
					top: 37%;
				}
			}
			.btns {
				transform:scaleX(-1);
				position: relative;
				right: 32%;
				background-color: #fff;
				border: 3px solid #00aae6;
				border-bottom-left-radius: 15px;
				border-right: 0;
				border-top-left-radius: 15px;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				min-height: 103px;
				padding: 10px;
				.btn {
					margin: 3px 0;
					width: 50px;
					height: 50px;
					margin: 5px 0;
					position: relative;
					transition: .3s ease;
				}
			}
		}
		.event-qmenu-open {
			right: 23px;
			.handle::after{
				left: 17%;
				top: 48%;
				text-shadow: 0 1px 3px #0084b3;
				transform: translateY(-50%) rotate(180deg);
			}
		}

		.van-popup {
			border-radius: 8px;
			height: 420px;
			background-color: unset;

			.van-swipe {
				height: 300px;
			}

			.center {
				width: 320px;
				height: 369px;
				background-image: url("/images/dashboard/popup_bg.png");
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: top;

				.title {
					font-size: 20px;
					font-weight: bold;
					color: white;
				}

				.text {
					height: 320px;
					text-align: left;
					padding: 10px 20px 0 20px;
				}
			}

			.center-win {
				width: 320px;
				height: 367px;
				background-image: url("/images/dashboard/popup_bg.png");
				background-size: 100%;
				background-repeat: no-repeat;
				background-position: top;

				.title {
					font-size: 20px;
					font-weight: bold;
					color: white;
					height: 52px;
					line-height: 52px;
				}

				.text {
					height: 10rem;
					overflow: hidden;
					text-align: left;
				}
			}

			.popup-close {
				position: absolute;
				bottom: 0;
			}
		}

		.draggable_d {
			position: relative;

			.draggable_c {
				position: relative;

				.close {
					position: absolute;
					top: 0;
					right: -8px;
				}
			}
		}
		.win-animation {
			animation: slideIn .3s linear
		}

		@keyframes slideIn {
			0% {
				transform: translateX(100%)
			}

			to {
				transform: translateX(0)
			}
		}
	}
	.SGYF-hotgame {
		color: #999;
		font-size: 12px;
		min-height: 95px;
		overflow: hidden;
		background: #fff;
		.van-notice-bar {
			background-color: transparent !important;
			margin-top: 0 !important;
			height: 15px !important;
		}
		.SGYF-hotgame-title {
			width: 100%;
			display: inline-flex;
			line-height: 12px;
			justify-content: space-between;
			align-items: center;
			padding: 5px 10px 5px 10px;
		}
		.SGYF-hotgame-games {
			display: inline-flex;
			width: 97%;
			min-height: 50px;
			margin: 5px 0 5px 0;
			background: #fff;
			.SGYF-hotgame-games-items {
				width: 50px;
				height: 50px;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 15px 0 0;
				.SGYF-hotgame-games-items-img {
					display: flex;
					align-items: center;
					height: 70px;
					max-height: 50px;
					/deep/ img {
						object-position: 5px 10%;
					}
				}
				.SGYF-hotgame-games-items-img-hot {
					display: flex;
					align-items: center;
					height: 30px;
				}
			}
		}
	}
	.SGYF-hotgame-box {
		position: relative;
		height: 400px;
		width: 90vw;
		margin: 0 auto;
		.SGYF-hotgame-slide {
			.SGYF-hotgame-slide-item {
				margin: 0 auto;
				min-height: 65px;
				.SGYF-hotgame-slide-item-img {
					width: 100px;
					height: 40px;
				}
				.qp-img {
					width: 100px;
					height: 80px;
				}
			}
			
		}
	}
	.SGYF-memberData-box {
		box-shadow: 0 0px 3px 0px rgb(0 0 0 / 12%);
	}
	.scroll-top-btn {
		position: absolute;
		right: 10px;
		bottom: 80px;
		background: #597ef7;
		color: #fff;
		height: 40px;
		width: 40px;
	}
	/deep/ .van-empty__image {
		margin-top: 0;
	}
</style>
<style lang="less">
.SGYF-tabs-box {
	border-top: 1px solid #bdbdbd;
	border-bottom: 1px solid #bdbdbd;
	.SGYF-tabs{
		.van-tabs__wrap {
			height: 29px;
		}
		.SGYF-tab {
			font-size: 11px;
			line-height: 10px;
			font-weight: bolder;
		}
	}	
}
.SGYF-hotgame-lang {
	border-radius: 5px;
	display: inline-flex;
	align-items: center;
	color: #999;
	padding: 1px 5px;
}
.com_text {
	position: absolute;
	z-index: 999;
	background: #fff;
	width: 300px;
	height: 100px;
	top: 150px;
	color: #fff;
	background-color: #000;
}
</style>
