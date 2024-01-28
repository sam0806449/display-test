export default {
	privileges: {
		title: 'Đặc quyền VIP',
		depositTotal: 'Số tiền nạp',
		dmlMoneyTotal: 'Số tiền cược sảnh',
		depositRequire: 'Số tiền nạp',
		dmlRequire: 'Yêu cầu dây chuyền',
		exclusive: 'VIP',
		rebateInfo: 'Tỷ lệ chiết khấu đại lý thành viên',
		details: 'Xem chi tiết',
		withdrawalTimesLimit: 'Lượt rút tiền hàng ngày',
		dayWithdrawalMax: 'Hạn mức rút tiền hàng ngày',
		upLevelBonus: 'Nâng cấp tiền thưởng(Tăng cấp phát tự động）',
		monthlyBonus: 'Lì xì tháng(Được phát hành tự động vào ngày 1 hàng tháng)',
		birthdayBonus: 'Tiền thưởng sinh nhật(Đăng ký quá 90 ngày）',
		weeklyBonus: 'Lì xì tuần(Thứ 2 nhận）',
		firstReferrerRebateRatio: 'Đại lý cấp 1',
		secondReferrerRebateRatio: 'Đại lý cấp 2',
		thirdReferrerRebateRatio: 'Đại lý cấp 3',
	},


	privilegesDetails: {
		title: 'Chi tiết đặc quyền VIP',
		tab_1: 'Tỷ lệ hoàn lại VIP',
		tab_2: 'Hạn mức rút tiền VIP',
		level: 'Cấp VIP',
		dayWithdrawalNumMax: 'Lượt rút tiền hàng ngày',
		dayWithdrawalMax: 'Hạn mức rút tiền hàng ngày',
		details: 'Xem mô tả quy tắc giảm giá',
		birthdayBonus: 'Tiền thưởng sinh nhật',
		birthday_info: 'Đăng ký trên 90 ngày được nhận quà sinh nhật',
		set_info: 'Đặt ngày sinh để nhận quà sinh nhật',
		set: 'Thiết lập ngay',
		rules: 'Quy tắc sự kiện',
		support_1_title: 'Tiêu chí thăng hạng',
		support_1_1: 'Số tiền gửi tích lũy và doanh số tích lũy của thành viên đáp ứng yêu cầu của cấp độ tương ứng, sẽ được thăng cấp VIP',
		support_2_title: 'Yêu cầu giữ hạng',
		support_2_1: 'Sau khi đạt cấp độ VIP nhất định, thành viên cần hoàn thành các yêu cầu giữ hạng trong vòng {day} ngày. Nếu hoàn thành thăng hạng trong thời gian này, các yêu cầu giữ hạng sẽ được tính lại theo cấp độ hiện tại.',
		support_3_title: 'Tiêu chuẩn hạ cấp',
		support_3_1: 'Nếu thành viên không hoàn thành các yêu cầu giữ hạng tương ứng {dayDesc} (tính toán trong {day} ngày), hệ thống sẽ tự động hạ một cấp, khoản hoàn trả tương ứng và các ưu đãi khác sẽ được điều chỉnh theo cấp độ bị hạ cấp tương ứng.',
		support_4_title: 'Tiền thưởng tăng cấp',
		support_4_1: 'Tiền thưởng tăng cấp được tự động phân phát sau khi thành viên đạt đến cấp độ thành viên, mỗi thành viên chỉ được nhận tiền thưởng tăng cấp một lần cho mỗi cấp độ. (Tiền thưởng tăng cấp có thể được rút sau khi hoàn thành doanh thu theo cài đặt)',
		support_5_title: 'Tiền thưởng sinh nhật',
		support_5_1: 'Thành viên có sinh nhật trong vòng ba tháng kể từ ngày đăng ký sẽ không thể nhận quà sinh nhật trong năm nay. Ngoài ra, thành viên đăng ký trên ba tháng có thể nhận tiền thưởng sinh nhật cấp tương ứng vào ngày 1 tháng sinh nhật, mỗi năm có thể nhận một lần (Tiền thưởng sinh nhật bằng 1 lần doanh thu có thể rút)',
		support_6_title: 'Lì xì mỗi tháng',
		support_6_1: 'Thành viên đã thực hiện ít nhất một lần gửi tiền thành công trong tháng trước có thể nhận lì xì đỏ hàng tháng của cấp tương ứng vào ngày 1 hàng tháng. (Thưởng lì xì đỏ bằng 1 lần doanh thu có thể rút) {siteTitle} bảo lưu quyền sửa đổi, dừng và giải thích cuối cùng về sự kiện',
	},

	rebatesRules: {
		title: 'Mô tả quy tắc phần thưởng',
		center: '1.Ưu đãi hoàn tiền được tính toán dựa trên các cược hợp lệ của bạn trong khoảng thời gian từ 00:00:00—23:59:59 ET trong ngày, dữ liệu sẽ khớp với dữ liệu của ngày trong log game;  \n' +
			'                <br/>2. Theo tình hình cá cược của bạn trong Giờ ET, tất cả các khoản hoàn trả cá cược của người chơi sẽ được phát vào 12 giờ trưa ngày hôm sau; \n' +
			'                <br/>3. Các game không hoàn trả bao gồm: các game bên ngoài không tính số lượng mã hóa, như cược thể thao (hủy, hòa, hòa và kết toán trước), cược video vô hiệu'
	},

}
