$(function(){

    // 加载动画
    for (let i = 0; i < $(".main form input").length; i++) {
        $(".main form input").eq(i).focus(function(){
            if($(this).prev().css('display') === "block"){
                return;
            }

            $(this).prev().css('display','block');
            $(this).next().css('display', 'block');
            let hintWidth = $(this).next().children('.hint').height();
            $(this).next().css('marginTop',hintWidth === 18 ? 10 : -1 + 'px').children('.arrow').css({marginTop: hintWidth / 2 + 3 + 'px'});
            $(this).attr('placeholder','');
            let j = -1;
            let flagWidth = $(this).prev().width() + 10;
            let interval = setInterval(function(){
                if(j <= -flagWidth){
                    clearInterval(interval);
                }
                $(".main form .flag").eq(i).css('margin-left', j + 'px');
                j -= 5;
            }, 10);

            let w = -1;
            let width = i == 2 ?-$(this).next().width()-125 : -$(this).next().width()-10;
            let interval1 = setInterval(function(){
                if(w <= width){
                    clearInterval(interval1);
                }
                $(".main form .hintbox").eq(i).css('right', w + 'px');
                w -= 8;
            }, 10);
        });
    }

    var flagArr = new Array(5);

    // 失去焦点
    // 用户名
    $('.main form .user input').blur(function(){
        $(this).next().children('.arrow').css('border-right-color', '#fff4d7');
        $(this).next().children('.hint').css('background-color', '#fff4d7');
        if(/\w{4,20}/.test($(this).val()) && !localStorage.getItem($(this).val())) {
            $(this).next().css('display','none');
            $(this).parent().addClass('group');
            $(this).css('border-color', '#ced4da');
            flagArr[0] = true;
        } else {
            $(this).css('border-color', 'red');
            $(this).next().css('display','block');
            $(this).parent().removeClass('group');
            if($(this).val() === ''){
                $(this).next().children('.hint').text('用户名不能为空');
            } else if(localStorage.getItem($(this).val()) != null) {
                $(this).next().children('.hint').text('用户名已存在');
            } else {
                $(this).next().children('.hint').text('请输入正确的用户名,用户名应为4-20位字符');
            }
        }
        let hintWidth = $(this).next().children('.hint').height();
        $(this).next().css('marginTop',hintWidth === 18 ? 10 : -1 + 'px').children('.arrow').css({marginTop: hintWidth / 2 + 3 + 'px'});
        $(this).next().css('right', -$(this).next().width()-18 + 'px');
    });

    // 手机
    $('.main form .phone input').blur(function(){
        $(this).next().children('.arrow').css('border-right-color', '#fff4d7');
        $(this).next().children('.hint').css('background-color', '#fff4d7');
        $(this).css('border-color', '#ced4da');
        if(/13[6-9]\d{8}/.test($(this).val()) && !localStorage.getItem($(this).val())) {
            $(this).next().css('display','none');
            $(this).parent().addClass('group');
            flagArr[1] = true;
        } else {
            $(this).css('border-color', 'red');
            $(this).next().css('display','block');
            $(this).parent().removeClass('group');
            if($(this).val() === ''){
                $(this).next().children('.hint').text('手机号不能为空');
            } else if(localStorage.getItem($(this).val()) != null){
                $(this).next().children('.hint').text('手机号已被注册');
            } else {
                $(this).next().children('.hint').text('格式错误，请输入正确的手机号码');
            }
        }
        let hintWidth = $(this).next().children('.hint').height();
        $(this).next().css('marginTop',hintWidth == 18 ? 10 : -1 + 'px').children('.arrow').css({marginTop: hintWidth / 2 + 3 + 'px'});
        $(this).next().css('right', -$(this).next().width()-18 + 'px');
    });

    // 验证码
    $('.main form .number input').blur(function(){
        $(this).next().hide();
        if($(this).val().length === 4){
            flagArr[2] = true;
        }
    });

    // 密码
    $('.main form .password input').blur(function(){
        if($(this).next().next().css('display') !== 'none'){
            return;
        }
        $(this).next().children('.arrow').css('border-right-color', '#fff4d7');
        $(this).next().children('.hint').css('background-color', '#fff4d7');
        $(this).css('border-color', '#ced4da');
        if(/\w{6,20}/.test($(this).val())) {
            if($(this).val().replace(/[0-9]+/,'ㄅ') === 'ㄅ'){
                $(this).next().children('.hint').text('密码不能全为数字');
            } else if ($(this).val().replace(/[A-z]+/,'ㄛ') === 'ㄛ'){
                $(this).next().children('.hint').text('密码不能全为字母，请包含至少1个数字或符号');
            } else {
                $(this).next().css('display','none');
            }
        } else {
            $(this).css('border-color', 'red');
            $(this).next().css('display','block');
            if($(this).val() === ''){
                $(this).next().children('.hint').text('密码不能为空');
            } else {
                $(this).next().children('.hint').text('密码应为6-20位字符');
            }
        }
        let hintWidth = $(this).next().children('.hint').height();
        $(this).next().css('marginTop',hintWidth === 18 ? 10 : -1 + 'px').children('.arrow').css({marginTop: hintWidth / 2 + 3 + 'px'});
        $(this).next().css('right', -$(this).next().width()-18 + 'px');
    });

    // 确认密码
    $('.main form .repassword input').blur(function(){
        $(this).next().children('.arrow').css('border-right-color', '#fff4d7');
        $(this).next().children('.hint').css('background-color', '#fff4d7');
        $(this).css('border-color', '#ced4da');
        if(/\w{6,20}/.test($(this).val()) && $(this).val() === $('.main form .password input').val()) {
            $(this).next().css('display', 'none');
            $(this).parent().addClass('group');
            flagArr[4] = true;
        } else {
            if(/\w{6,20}/.test($(this).val())){
                $(this).next().children('.hint').text('两次密码输入不一致');
            } else {
                $(this).next().children('.hint').text('密码应为6-20位字符');
            }

            $(this).css('border-color', 'red');
            $(this).next().css('display', 'block');
            $(this).parent().removeClass('group');
        }
        let hintWidth = $(this).next().children('.hint').height();
        $(this).next().css('marginTop',hintWidth === 18 ? 10 : -1 + 'px').children('.arrow').css({marginTop: hintWidth / 2 + 3 + 'px'});
        $(this).next().css('right', -$(this).next().width()-18 + 'px');
    });

    // 密码强度
    $('.main form .password input').bind("input propertychange", function () {
        let val = $(this).val();
        let $div = $('.main form .password .crystr .hint div');
        $div.css('background-color','#fff');
        if(/\w{6,20}/.test(val)){
            let count = 0;
            if (/\d/.test(val)) count++; //数字
            if (/[a-z]/.test(val)) count++; //小写
            if (/[A-Z]/.test(val)) count++; //大写
            if (/\W/.test(val)) count++; //特殊字符
            switch(count){
                case 4:
                    $div.css('background-color','#65c73e').nextAll('span').text('高');
                    break;
                case 3:
                    $div.eq(1).css('background-color','yellow');
                    $div.eq(0).css('background-color','yellow').nextAll('span').text('中');
                    break;
                case 2:
                    $div.eq(0).css('background-color','#f40').nextAll('span').text('低');
            }
            if(count > 1) {
                flagArr[3] = true;
                $('.main form .password .crystr').css('display','block');
                $('.main form .password .hintbox').css('display','none');
            }
        } else {
            flagArr[3] = undefined;
            $('.main form .password .hintbox').css('display','block');
            $('.main form .password .crystr').css('display','none');
        }
    });

    // 注册
    $('.main form>.btn-group button').click(function(){
        let flag = true;
        for (let i = 0; i < flagArr.length; i++) {
            if(flagArr[i] != true){
                flag = false;
                break;
            }
        }
        if(flag){
            let phone = $('.main form .phone input').val();
            let password = $('.main form .password input').val();
            let name = $('.main form .user input').val();
            let user = new User(name , password , phone);
            let json = JSON.stringify(user);
            localStorage.setItem(name , json);
            alert('用户：' + name + '，注册成功！');
            window.location.reload();
        }
    });

    function User(name , password , phone) {
        this.name = name; // 账号
        this.password = password; // 密码
        this.phone = phone; // 手机号
        this.addressList = []; // 地址列表
        this.addressDefault = undefined; // 默认地址
        this.orderFormList = []; // 订单列表
        this.buyList = []; // 购买列表
    }


    $(window).keydown(function(event){
        if(event.keyCode === 13){
            $('.main form>.btn-group button').click();
        }
    });
});