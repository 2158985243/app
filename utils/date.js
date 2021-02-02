// 今天
const today = function() {
	let seperator1 = "-";
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	let currentdate = year + seperator1 + month + seperator1 + strDate;
	return {
		start_time: currentdate,
		end_time: currentdate
	}
}
// 昨天
const yesterday = function() {
	let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
	let yesterday = new Date(time);
	let month = yesterday.getMonth();
	let day = yesterday.getDate();
	yesterday = yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (
		yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
	return {
		start_time: yesterday,
		end_time: yesterday
	}
}

// 本周
const thisWeek = function() {
	let seperator1 = "-";
	let Nowdate = new Date();
	let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000); // 本周第一天
	let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000); // 本周第最后一天
	// 本周第一天
	let yearState = WeekFirstDay.getFullYear()
	let monthState = (WeekFirstDay.getMonth() + 1) < 10 ? "0" + (WeekFirstDay.getMonth() + 1) : (WeekFirstDay.getMonth() +
		1)
	let todayState = (WeekFirstDay.getDate() < 10 ? "0" + WeekFirstDay.getDate() : WeekFirstDay.getDate())
	let statrTime = yearState + seperator1 + monthState + seperator1 + todayState
	// 本周第一天
	let yearEnd = WeekLastDay.getFullYear()
	let monthEnd = (WeekLastDay.getMonth() + 1) < 10 ? "0" + (WeekLastDay.getMonth() + 1) : (WeekLastDay.getMonth() +
		1)
	let todayEnd = (WeekLastDay.getDate() < 10 ? "0" + WeekLastDay.getDate() : WeekLastDay.getDate())
	let endTime = yearEnd + seperator1 + monthEnd + seperator1 + todayEnd
	return {
		start_time: statrTime,
		end_time: endTime
	}
}

// 本月
const thisMonth = function() {
	let seperator1 = "-";
	let Nowdate = new Date();
	let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
	let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
	let MonthLastDay = new Date(MonthNextFirstDay - 86400000);
	// 本月第一天
	let yearState = MonthFirstDay.getFullYear()
	let monthState = (MonthFirstDay.getMonth() + 1) < 10 ? "0" + (MonthFirstDay.getMonth() + 1) : (MonthFirstDay.getMonth() +
		1)
	let todayState = (MonthFirstDay.getDate() < 10 ? "0" + MonthFirstDay.getDate() : MonthFirstDay.getDate())
	let statrTime = yearState + seperator1 + monthState + seperator1 + todayState
	// 本月最后一天
	let yearEnd = MonthLastDay.getFullYear()
	let monthEnd = (MonthLastDay.getMonth() + 1) < 10 ? "0" + (MonthLastDay.getMonth() + 1) : (MonthLastDay.getMonth() +
		1)
	let todayEnd = (MonthLastDay.getDate() < 10 ? "0" + MonthLastDay.getDate() : MonthLastDay.getDate())
	let endTime = yearEnd + seperator1 + monthEnd + seperator1 + todayEnd
	return {
		start_time: statrTime,
		end_time: endTime
	}
}

// 近7天
const sevenDays = function() {
	let time1 = new Date()
	time1.setTime(time1.getTime())
	let Y1 = time1.getFullYear()
	let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
	let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
	let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
	let time2 = new Date()
	time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * 7))
	let Y2 = time2.getFullYear()
	let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
	let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
	let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
	return {
		start_time: timer2,
		end_time: timer1
	}
}
// 近30天
const thirtyDays = function() {
	let time1 = new Date()
	time1.setTime(time1.getTime() )
	let Y1 = time1.getFullYear()
	let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
	let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
	let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
	let time2 = new Date()
	time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * 30))
	let Y2 = time2.getFullYear()
	let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
	let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
	let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
	return {
		start_time: timer2,
		end_time: timer1
	}
}
export default {today,yesterday,thisWeek,thisMonth,sevenDays,thirtyDays}
// default