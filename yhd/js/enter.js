$(function(){
    // 切换密码和登录
    $('.main .change').click(function(){
        if($('.main .QRcode').css('display') == 'none'){
            $('.main .QRcode').css('display','block').prev().css('display','none');
            timing();
        } else {
            $('.main .QRcode').css('display','none').prev().css('display','block');
        }
    });

    function timing(){
        setTimeout(function(){
            $('.main .QRcode .refresh').css('display', 'block');
        }, 10000);
    }
    function refresh() {
        $('.main .QRcode .refresh').css('display', 'none');
        timing();
    }

    $('.main .QRcode .refresh .btn').click(refresh);
    $('.main .QRcode>p').click(refresh);


    $('.main .info .main-top form .middle>p').slideUp(0);

    $('.main .info .main-top form input[type="text"]').blur(function(){
        if($(this).val().length != 0){
            $('.main .info .main-top form .middle>p').slideDown(300);
        } else {
            $('.main .info .main-top form .middle>p').slideUp(300);
        }
    });

    $('.main .info .main-top form input[type="button"]').click(function(){
        let $hint = $('.main .info .main-top .hint').css('display', 'block');
        let $nameVal = $('.main .info .main-top form input[type="text"]').val();
        let $pwdVal = $('.main .info .main-top form input[type="password"]').val();
        if($nameVal == ''){
            $hint.children('.value').text("请输入账号");
            return;
        }
        if($pwdVal == ''){
            $hint.children('.value').text("请输入密码");
            return;
        }
        if($nameVal == '' && $pwdVal == ''){
            $hint.children('.value').text("请输入账号和密码");
            return;
        }
        let user = JSON.parse(localStorage.getItem($nameVal));
        if(user != null && $pwdVal == user.password){
            let $hint = $('.main .info .main-top .hint').css('display', 'none');
            sessionStorage.setItem('user' , $nameVal);
            window.location.href = 'index.html';
        } else {
            $hint.children('.value').text("账号或密码不正确");
        }

    });

    $(window).keydown(function(event){
        if(event.keyCode == 13){
            $('.main .info .main-top form input[type="button"]').click();
        }
    });

});