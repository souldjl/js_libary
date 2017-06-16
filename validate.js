/**
 *
 * 常用JS验证类库
 */
var Common={
  /**
   * 检查输入字符串是否为空或者全部都是空格
   * @param  str 需要验证的字符串
   * @return bool
   */
  'type':function(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
  },
  'isNumber':function(value){
    return this.type(value)==='number';
  },
  'isString':function(value){
    return this.type(value)==='string';
  },
  'isNull':function(value){
    return value===null;
  },
  'isUndefined':function(value){
    return value===undefined;
  },
  'isObject':function(value){
    return this.type(value)==='object';
  },
  'isBoolean':function(value){
    return this.type(value)==='boolean';
  },
  'isFunction':function(value){
    return this.type(value)==='function';
  },
  'isArray':function(value){
    return this.type(value)==='array';
  },
  'isDate':function(value){
    return this.type(value)==='date';
  },
  /**
   * 检查输入字符串是否为空或者全部都是空格
   * @param  str 需要验证的字符串
   * @return bool
   */
  'isNull' : function(str) {
    if ( str == "" ) return true;
    var reg_str = new RegExp("^[ ]+$");
    return reg_str.test(str);
  },
  /**
   * 去除字符串的空格
   * @param str  待去除的字符串
   * @param trimMode 待去除的方向
   * @return str
   */
  'trim': function(str, trimMode) {
    switch (trimMode) {
      case 'left':
        return str.replace(/(^\s+)/g, '');
      case 'right':
        return str.replace(/(\s+$)/g, '');
      case 'all':
        return str.replace(/(^\s+)|\s|(\s+$)/g, '');
      default:
        return str.replace(/(^\s+)|(\s+$)/g, '');
    }
  },
  /**
   * 验证是否为合法的手机号
   * @param mobile  手机号
   * @param reg_exp [非必传]验证规则【因为电话号码的规则有可能改，所以这个是一个参数】
   * @return bool
   */
  'isMobile' : function(mobile) {
    var reg_exp = arguments[1] ? arguments[1] : /^(((1[34578]{1}))+\d{9})$/;
    if (mobile.length == 0) {
      return false;
    }
    if (mobile.length != 11) {
      return false;
    }
    return reg_exp.test(mobile);
  },
  /**
   * 验证是否是合法的邮箱
   * @param email   邮箱地址
   * @param reg_exp [非必传]验证规则【如果有特殊需求，可以自定义规则】
   * @return bool
   */
  'isEmail' : function(email) {
    var reg_exp = arguments[1] ? arguments[1] : /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (email.length == 0) {
      return false;
    }
    return reg_exp.test(email);
  },
  /**
   * 验证是否是合法的固定电话
   * @param phone 固定电话
   * @return bool
   */
  'isPhone' : function(phone) {
    var reg_exp = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
    if (phone == "") {
      return false;
    }
    return reg_exp.test(phone);
  },
  /**
   * 验证是否是邮编
   * @param postcode 邮编
   * @return bool
   */
  'isPostcode' : function(postcode) {
    var reg_exp = /^\d{6}$/;
    if (postcode == "") {
      return false;
    }
    return reg_exp.test(postcode);
  },
  /**
   * 验证是由0-9组成的数字不能有小数点
   * @param number 数字
   * @return bool
   */
  'isNumber' : function(number) {
    var reg_exp = /^[0-9]+$/;
    if (number == "") {
      return false;
    }
    return reg_exp.test(number);
  },
  /**
   * 验证是由0-9组成的数字可以能有小数点并且保留2位
   * @param double_number 数字
   * @return bool
   */
  'isDoubleNumber' : function(double_number) {
    var reg_exp = /^[0-9]+(\.\d{2})?$/;
    if (double_number == "") {
      return false;
    }
    return reg_exp.test(double_number);
  },
  /**
   * 验证是否是中文
   * @param str 字符串
   * @return bool
   */
  'isChinese' : function(str) {
    var reg_exp = /^[\u0391-\uFFE5]+$/;
    if (str == "") {
      return false;
    }
    return reg_exp.test(str);
  },
  /**
   * 校验密码强度
   * @params string 密码
   * @return 1:强,-1:适中,0:弱
   */
  'authPasswd' : function(string) {
    if(string.length >=6) {
      if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)) {
        return 1;
      }else if(/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string) || /\W+\D+/.test(string)) {
        if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
          return -1;
        }else if(/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
          return -1;
        }else if(/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
          return -1;
        }else{
          return 0;
        }
      }
    }
    return 0;
  },
  /**
   * 验证身份证
   * @param num 身份证号
   * @return bool
   */
  'isIdCardNo' : function (num) {
    num = num.toUpperCase();           //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
      AlertMessage({
        text: '输入的身份证号长度不对，或者号码不符合规定！'
      });
      return false;
    } //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re, arrSplit, dtmBirth, bGoodDay, arrInt, arrCh, nTemp;
    len = num.length;
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      arrSplit = num.match(re);  //检查生日日期是否正确
      dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        AlertMessage({
          text: '输入的身份证号里出生日期不对！'
        });
        return false;
      } else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        nTemp = 0;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        num += arrCh[nTemp % 11];
        return true;
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      arrSplit = num.match(re);  //检查生日日期是否正确
      dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
        AlertMessage({
          text: '输入的身份证号里出生日期不对！'
        });
        return false;
      } else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum;
        arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        nTemp = 0;
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[nTemp % 11];
        if (valnum != num.substr(17, 1)) {
          AlertMessage({
            text: '18位身份证的校验码不正确！应该为：' + valnum
          });
          return false;
        }
        return true;
      }
    }
    return false;
  }

};
