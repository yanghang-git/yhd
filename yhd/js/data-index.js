$(function () {
    let nowDate = new Date();
    $('.main .panel-top div.col-3 .date .time').text(nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate());
    $('.main .panel-top div.col-3 .date .week').text('星期' + (nowDate.getDay() + 1));

    let $userName = sessionStorage.getItem('user');
    let $user = JSON.parse(localStorage.getItem($userName));
    if($user != null){
        $('.header-top .nav-masthead .enter>a').text($userName).attr('href','#');
        $('.header-top .nav-masthead .enter .data .data-top .name').text($userName);
        $('.main .panel-top .name').text('Hi！ ' + $userName);
    }

    // 退出登录
    $('.header-top .nav-masthead .enter .data .data-top .exit').click(function(){
        sessionStorage.removeItem('user');
    });


    // 如果没用购买记录 也没有订单记录则默认显示为暂无订单。
    if($user.orderFormList.length !== 0 || $user.buyList.length !== 0){
        console.log(1);
        $('.main .panel-value .value-main .value').css('display', 'block');
        $('.main .panel-value .value-main .empty').css('display', 'none');
    }



    function orderFromDom(orderFrom, flag){
        return $(`<div class="item row">
                        <div class="col-4">
                            <p>配送方式</p>
                            <p class="box">第三方配送</p>
                            <p class="font-color">` + (flag ? '购买' : '发货') + `时间：` + orderFrom.date + `</p>
                            <p>工作日、双休日与节假日均可` + (flag ? '送' : '发') + `货</p>
                        </div>
                        <div class="col">
                            <p class="title">商家：` + orderFrom.shopNames + `</p>
                            <div class="row">
                                <div class="col-2 img"><img src="`+orderFrom.pricture+`" alt=""></div>
                                <div class="col main">
                                    <div class="main-value">` + orderFrom.designation + `</div>
                                    <p>支持7天无理由退货</p>
                                </div>
                                <div class="col-2 money">￥`+ orderFrom.monovalent +`</div>
                                <div class="col-2 num">x ` + orderFrom.quantity + `</div>
                                <div class="col-2 state">` + (flag ? '有货' : '已发货') + `</div>
                            </div>
                        </div>
                    </div>`);
    }

    // 填充待付款
    function fullOrderForm(){
        $($user.orderFormList).each(function () {
            $('.main .panel-value .value-main .value').append(orderFromDom(this, true));
        })
    }

    // 填充购买
    function fullBuy(){
        $($user.buyList).each(function () {
            $('.main .panel-value .value-main .value').append(orderFromDom(this, false));
        })
    }
    // 填充全部
    function fullAll(){
        if($user.orderFormList.length !== 0){
            $('.main .panel-value .value-main .value').append($('<h6>待付款</h6>'));
            fullOrderForm();
        }
        if($user.buyList.length !== 0){
            $('.main .panel-value .value-main .value').append($('<h6>待收货</h6>'));
            fullBuy();
        }
    }
    fullAll();

});