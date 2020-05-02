$(function(){


    let $user = sessionStorage.getItem('user');
    // 判断是否登录
    if($user != null){
        $('.header-top .nav-masthead li.nav-link span').text('你好').next().text($user).attr('href','data_index.html');
        $('.header-top .nav-masthead li:eq(1) a').text('退出').attr('href','#');
    } else {
        $('.header-top .nav-masthead li.nav-link span').text('Hi，请').next().text('登录').attr('href','enter.html');
        $('.header-top .nav-masthead li:eq(1) a').text('注册').attr('href','register.html');
    }
    // 点击退出
    $('.header-top .nav-masthead li:eq(1) a').click(function(){
        if($(this).text() == '退出') {
            sessionStorage.removeItem('user');
            window.location.reload();
            console.log(sessionStorage.getItem('user'));
        }
    });

    var $imgs = $('.main-img .imgs li').fadeOut(0);
    $($imgs[0]).fadeIn(200)
    function changeImg(i){
        $(".main-img .btn li").removeClass();
        $(".main-img .btn li").eq(i).addClass('hover');
        $($imgs).fadeOut(250);
        $($imgs[i]).fadeIn(250);

    };
    // 轮播图
    $(".main-img .btn li").mouseenter(function(){
        if(!$(this).is('.hover')){
            changeImg($(this).index());
        }
        clearInterval(interval);
        interval = undefined;
        imgCount = $(this).index() + 1 == 3 ? 0 : $(this).index() + 1;
    }).mouseleave(function () {
        startInterval();
    });

    $imgs.hover(function () {
        clearInterval(interval);
        interval = undefined;
        imgCount = $(this).index() + 1 == 3 ? 0 : $(this).index() + 1;
    },function () {
        startInterval();
    });

    var imgCount = 1;
    var interval;
    function startInterval() {
        if(interval == undefined) {
            interval = setInterval(function () {
                changeImg(imgCount);
                imgCount = imgCount >= 2 ? 0 : imgCount + 1;
            }, 4000);
        }
    }
    startInterval();


    // 二级菜单
    $(".main-img .title .main").hover(function(){
        $(".main-img .menu").css("display", "block");
    },function(){
        $(".main-img .menu").css("display", "none");
    });
    $(".main-img .menu").hover(function(){
        $(this).css("display", "block");
    },function(){
        $(this).css("display", "none");
    });

    // 超级单品倒计时
    var startTime = new Date("2020/5/20");
    setInterval(function(){
        let nowTime = new Date();
        let time = startTime - nowTime;
        let hour = parseInt(time / 1000 / 60 / 60 % 24);
        let minute = parseInt(time / 1000 / 60 % 60);
        let seconds = parseInt(time / 1000 % 60);
        $(".super-sgPrd .time-hour").text(hour < 10 ? '0' + hour : hour);
        $(".super-sgPrd .time-minute").text(minute < 10 ? '0' + minute : minute);
        $(".super-sgPrd .time-second").text(seconds < 10 ? '0' + seconds : seconds);
    }, 1000);

    // 侧栏下载APP
    // $('.search-top').slideDown(0);
    let $top = $(".super-sgPrd .download-app .top").fadeOut();
    $(window).scroll(function(even){
        let px = $(window).scrollTop();
        if(px >= 550){
            $('.super-sgPrd .download-app').css("top", px - 550 + "px");
        }

        if(px >= 750) {
            $('.search-top').slideDown(200);
            $('.search-top').addClass('fixed')
        } else {
            $('.search-top').slideUp(200);
        }
        if(px >= 2500){
            $top.fadeIn(200);
        } else {
            $top.fadeOut(200);
        }
    });
    $top.click(function(){
        let interval = setInterval(function (){
            let top = $(window).scrollTop();
            $(window).scrollTop(top - 80);
            if(top <= 0){
                clearInterval(interval);
            }
        },10);
    });

    // 侧边排行榜
    for (let i = 0; i < 3; i++) {
        let $sideBtn = $('.layer-total .layer-item').eq(i).children('.item-side').children('.btn').children('.left').css({'background-color': '#f9f9f9', 'color':'#999'});
        let  btnNum = 0;
        $sideBtn.click(function(){
            if(btnNum != 0){
                $('.layer-total .layer-item').eq(i).children('.item-side').children('.total').css('margin-left', -(--btnNum) +'00%');
                $(this).next().css({'background-color' : '#f9f9f9' , 'color':'#333'});

            }
            if(btnNum == 0){
                $(this).css({'background-color' : '#f9f9f9' , 'color':'#999'});
            }
        }).next().click(function(){
            if(btnNum != 2){
                $('.layer-total .layer-item').eq(i).children('.item-side').children('.total').css('margin-left', -(++btnNum) +'00%');
                $(this).prev().css({'background-color' : '#f9f9f9' , 'color':'#333'});

            }
            if (btnNum == 2){
                $(this).css({'background-color': '#f9f9f9', 'color':'#999'});
            }
        });
    }


















});