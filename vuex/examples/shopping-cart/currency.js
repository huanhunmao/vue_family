// 匹配/(\d)(?=(\d{3})+\.)/g数字后面是三个数字或者3的倍数个数字，后面跟小数点
const digitsRE = /(\d{3})(?=\d)/g;

// 这个函数是 货币显示函数 比如  $500.01
// value 数值   currency 货币     decimals 小数
export function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return "";
  currency = currency != null ? currency : "$";
  decimals = decimals != null ? decimals : 2; // 设置 decimals == 2

  var stringified = Math.abs(value).toFixed(decimals); // 取2位小数点
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "";
  var _float = decimals ? stringified.slice(-1 - decimals) : "";
  var sign = value < 0 ? "-" : "";
  return (
    sign + currency + head + _int.slice(i).replace(digitsRE, "$1,") + _float
  );
}
