$(function () {

    let $user = sessionStorage.getItem('user');
    if($user != null){
        $('.header-top .nav-masthead .enter>a').text($user).attr('href','#');
        $('.header-top .nav-masthead .enter .data .data-top .name').text($user);
    }


    // 退出登录
    $('.header-top .nav-masthead .enter .data .data-top .exit').click(function(){
        sessionStorage.removeItem('user');
    });


});