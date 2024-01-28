import {Toast} from "vant";
import i18n from "@/globe/i18n";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
	const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
	const reg = /^[a-z]+$/;
	return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
	const reg = /^[A-Z]+$/;
	return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
	const reg = /^[A-Za-z]+$/;
	return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
	// eslint-disable-next-line no-useless-escape
	const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (reg.test(email)) Toast("邮箱有误");
	return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUserName(str) {
	const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
	if (isNullOrUndefined(str) || !reg.test(str)) Toast($$t('userName2'));
	return reg.test(str); 
}

export function validLoginUserName(str) {
	const reg = /^[a-zA-Z0-9]{4,16}$/;
	if (isNullOrUndefined(str) || !reg.test(str)) Toast($$t('userName'));
	return reg.test(str);
}

/**
 * @param {string} pwd
 * @returns {Boolean}
 */
export function validPwd(pwd) {
	const reg = /^[a-zA-Z0-9]{6,16}$/;
	if (!reg.test(pwd) || isNullOrUndefined(pwd)) Toast($$t('pwd'));
	return reg.test(pwd);
}

export function validPayPwd(pwd) {
	if (pwd.length < 4 || isNullOrUndefined(pwd)) Toast($$t('payPwd'));
	return pwd.length === 4 && !isNullOrUndefined(pwd)
}

export function validConfirmPwd(pwd, confirmPwd) {
	if (pwd !== confirmPwd) {
		Toast($$t('confirmPwd'));
		return false;
	} else {
		return true;
	}
}

export function validVerifyCode(verifyCode) {
	if (isNullOrUndefined(verifyCode)) Toast($$t('verifyCode'));
	return !isNullOrUndefined(verifyCode);
}

export function validCardNo(cardNo, currency) {
	let checker = true
	let reg = /[0-9][0-9]{9,18}$/;

	if (currency === 'VND') {
		reg = /[0-9][0-9]{5,24}$/
		if (cardNo.length > 26) {
			checker = false
			Toast($$t('incorrectLength'))
		}
	}
	if (!reg.test(cardNo) || isNullOrUndefined(cardNo)) {
		checker = false
		Toast($$t('cardNo'));
	}

	return checker;
}


export function isNullOrUndefinedDesc(value, d) {
	if (isNullOrUndefined(value)) Toast(d + $t('common.noNull'));
	return !isNullOrUndefined(value);
}

/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function validPhone(phone) {
	const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
	if (reg.test(phone)) Toast($$t('phone'));
	return reg.test(phone);
}

/**
 * @param {string} qq
 * @returns {Boolean}
 */
export function validQQ(qq) {
	const reg = /^[1-9][0-9]{4,10}$/gim;
	return reg.test(qq);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
	return typeof str === "string" || str instanceof String;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
	if (typeof Array.isArray === "undefined") {
		return Object.prototype.toString.call(arg) === "[object Array]";
	}
	return Array.isArray(arg);
}

export function isJson(str) {
	if (isString(str)) {
		let obj = JSON.parse(str);
		return isArray(obj) || isObject(obj);
	} else {
		return false
	}
}

/**
 * @param {Object} arg
 * @returns {Boolean}
 */
export function isObject(arg) {
	return Object.prototype.toString.call(arg) === "[object Object]";
}

export function isNullOrUndefined(value) {
	return value === null || value === undefined || value === "";
}

export function confirmed(value, target) {
	return String(value) === String(target);
}

/**
 * @param {Number} value
 * @param {Number} max
 * @returns {Boolean}
 */
export function maxValue(value, max) {
	if (isNullOrUndefined(value)) {
		return false;
	}
	return Number(value) <= max;
}

function $$t(v) {
	return i18n.t('validate.' + v)
}

function $t(v) {
	return i18n.t(v)
}


