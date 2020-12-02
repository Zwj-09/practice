window.addEventListener('load', function () {
    // 手机号码正则表达式
    // var phone = /^(13[0-9] | 14[5|7] | 15[0|1|2|3|4|5|6|7|8|9] | 18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var regTel = /^(1[3|5|7|8])\d{9}$/; //手机号码正则表达式
    var regMsg = /^[0-9]{6}$/;//短信正则表达式
    var regQq = /^[1-9]\d{4,10}$/;    //QQ正则表达式
    var regNc = /^[\u4e00-\u9fa5]{0,}$/;// 昵称正则表达式
    var regPwd = /^[a-zA-Z]\w{5,17}$/;// 密码正则表达式

    // 获取数据
    var ipt = document.querySelector('.inp');
    var tel = document.getElementById('tel');
    var qq = document.getElementById('qq');
    var nc = document.getElementById('nc');
    var msg = document.getElementById('message');
    var pwd = document.getElementById('pwd');
    var surepwd = document.getElementById('surepwd');

    // 函数调用
    regExp(tel, regTel);
    regExp(qq, regQq);
    regExp(msg, regMsg);
    regExp(nc, regNc);
    regExp(pwd, regPwd);
    function regExp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('right');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_ico"></i> 恭喜您输入正确';
            } else {
                // console.log('不正确');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_ico"></i> 格式不正确，请重新输入 ';
            }
        }
    }
    surepwd.onblur = function () {
        if (surepwd.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_ico"></i> 恭喜您输入正确';
        } else {
            // console.log('不正确');
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_ico"></i> 格式不正确，请重新输入 ';
        }
    }

    ipt.onfocus = function () {
        ipt.style.backgroundColor = 'rgba(97,100,159,0.6)';
        this.style.borderColor = '#93d5dc';
    }
})