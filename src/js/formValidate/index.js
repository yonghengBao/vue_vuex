//所有的正则和表单验证都写在这里：

//正则：
export const regEmail = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/); //邮箱的正则
//export const regPhone = new RegExp(/^1[34578]\d{9}$/); 手机号码的正则
export const regPhone = new RegExp(/^1[3456789]\d{9}$/); //手机号码的正则
export const regBankCard = new RegExp( /^([1-9]{1})(\d{15}|\d{18})$/); //手机号码的正则
export const regQQ = new RegExp(/[1-9][0-9]{4,}/); //QQ号码的正则
export const regPassward = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/); //密码验证规则（6~12位字母数字组和）
export const regID = new RegExp(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/); //身份证正则
export const regIP = new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)

let trim = (str) => { //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//表单验证
export const validateTel = (value) => {
  if (trim(value) === '') {
    return'请输入手机号码!';
  } else if (!regPhone.test(trim(value))) {
    return'手机号码格式不正确!';
  } else {
    return;
  }
};
export const validateLoginPassWord = (rule, value, callback) => {
  if (trim(value) === '') {
    callback(new Error('请输入密码!'));
  } else if (!regPassward.test(trim(value))) {
    callback(new Error('密码格式为6~12位字母数字组和!'));
  } else {
    callback();
  }
};

//身份证
export const validateID = (value) => {
  if (trim(value) === '') {
   return'请输入证件号码!';
  } else if (!regID.test(trim(value))) {
    return'号码格式不正确!';
  } else {
    return;
  }
};

//手机
export const phone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号码!'));
  } else if (value !== "" && !regPhone.test(value)) {
    callback(new Error('号码格式不正确!'));
  } else {
    callback();
  }
};

//qq号
export const qq = (rule, value, callback) => {
  if (value !== "" && !regQQ.test(value)) {
    callback(new Error('QQ号码格式不正确!'));
  } else {
    callback();
  }
};

//邮箱
export const email = (rule, value, callback) => {
  if (value !== "" && !regEmail.test(value)) {
    callback(new Error('邮箱号码格式不正确!'));
  } else {
    callback();
  }
};

//IP
export const ip = (rule, value, callback) => {
  if (value !== "" && !regIP.test(value)) {
    callback(new Error('IP格式不正确!'));
  } else if (value === '') {
    callback(new Error('请填写 IP'));
  } else {
    callback();
  }
};

//验证端口号
export const port = (rule, value, callback) => {
  if (!Number.isInteger(+ value)) {
    callback(new Error('请输入正确的端口号'));
  } else if (value.length > 5) {
    callback(new Error('请输入正确的端口号'));
  } else if (value === '') {
    callback(new Error('请输入端口号'));
  } else {
    callback();
  }
};
//验证机器号
export const mashin = (rule, value, callback) => {
  if (!Number.isInteger(+ value)) {
    callback(new Error('机器号为数字'));
  } else if (value === '') {
    callback(new Error('请填写机器号'));
  } else {
    callback();
  }
};

//验证input框输入数字
export const validateNumber = (rule, value, callback) => {
  if (!Number.isInteger(+ value)) {
    callback(new Error('请输入整数'));
  } else {
    callback();
  }
};
//验证input框输入数字（必须是正整数！！）
export const validateNumberz = (rule, value, callback) => {
  if (!Number(value) || Number(value) < 0) {
    callback(new Error('请输入正整数'));
  } else {
    callback();
  }
};


//验证银行卡号（16到19位，首位不为0！！）
export const validateBankCard = (rule, value, callback) => {
 if (value === '') {
    callback(new Error('请输入正确的银行卡号!'));
  } else if (value !== "" && !regBankCard.test(value)) {
    callback(new Error('银行卡号格式错误!'));
  } else {
    callback();
  }
};
