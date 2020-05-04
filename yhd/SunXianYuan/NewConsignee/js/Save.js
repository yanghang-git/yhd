$(function() {

	let userName = sessionStorage.getItem('user');
	let user = JSON.parse(localStorage.getItem(userName));
	let arr = JSON.parse(sessionStorage.getItem('arr'));


    function replacePhone(phone){
	    return phone.toString().replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
    }

    // 地址对象
    function Address(name, county, city, district, village, indetail, phone){
        this.name = name;
        this.county = county;
        this.city = city;
        this.district = district;
        this.village = village;
        this.indetail = indetail;
        this.phone = phone;
    }


	$('.mod_rel_head .mr_ctrlbtn:eq(0)').click(function(){
        $(".add_box").css("display","block");
        return false;
    });
    $('.add_box .close').click(function(){
        $(".add_box").css("display","none");
    });

    $('.add_box_2 .btn-1').click(function(){

        let name = $(".add_box_2 #name").val(); //姓名
        let phone = $(".add_box_2 #phone").val(); //手机号码
        let addresss = $(".add_box_2 #city").val().split('-'); //所在地区
        let county = addresss[0];
        let city = addresss[1];
        let district = addresss[2];
        let indetail = $(".add_box_2 #xiangxidizhi").val(); //详细地址

        if(name === ''){
            $('.add_box_2 .item').eq(0).children('span:eq(1)').addClass('span').text('请您填写收货人姓名');
            return;
        } else {
            $('.add_box_2 .item').eq(0).children('span:eq(1)').text('');
        }
        if(phone === '' || !/13[6-8]\d{8}/.test(phone)) {
            $('.add_box_2 .item').eq(1).children('div').children('span:eq(2)').addClass('span').text('请您填写正确手机号码');
            return;
        } else {
            $('.add_box_2 .item').eq(1).children('div').children('span:eq(2)').text('');
        }
        if(county === undefined || city === undefined || district === undefined) {
            $('.add_box_2 .item').eq(4).children('#address').addClass('span').text('请您填写完整的地址');
            return;
        } else {
            $('.add_box_2 .item').eq(4).children('#address').text('');
        }
        if(indetail === '') {
            $('.add_box_2 .item').eq(5).children('span:eq(1)').addClass('span').text('请您填写详细的地址信息');
            return;
        } else {
            $('.add_box_2 .item').eq(5).children('span:eq(1)').text('');
        }
        let address =  new Address(name, county, city, district, " ", indetail, phone);
        if($('.set_default').attr('style') !== undefined) {
            if(user.addressDefault != undefined){
                user.addressList.push(user.addressDefault);
            }
            user.addressDefault = address;
        } else {
            user.addressList.push(address);
        }
        localStorage.setItem(userName , JSON.stringify(user));
        init();
        $(".add_box").css("display","none");
    });


    //默认地址
    $(".set_default").on("click", function() {
        $(this).css("background-color", "red");
        $(".dot").css("margin-left", "20px");
    })

    $(".add_box").css("display","none");

	function addressInstance(address, falg){
        let temp = falg ? "默认" : "";
        let tempDisplay = falg ? "block" : "none";
        return $(`<li class="cur">
                    <div class="total_info">
                    <i class="fl sprite_odr  adr_icon"></i>
                    <span class="fl tot_name"></span>
                    <em class="init_adrs" style='display: ` + tempDisplay + `;'>` + temp + `</em>
                    <span class="fr tot_edit">
                        <a href="#none" class="ftx-05 edit-consignee" style="display:none ;">编辑</a>
                    </span>
                    </div>
                        <div class="detail_info">
                        <p>` + address.name + "&nbsp;&nbsp;&nbsp;" +  `<span>` + replacePhone(address.phone) +`</span></p>
                        <p>` + address.city + "&nbsp;&nbsp;" + address.district + "&nbsp;&nbsp;" + address.village + `</p>
                        <p>`+ address.indetail + `</p>
                    </div>
                    <div class="sprite_odr"></div>
                </li>`);
	}
    let top, bottom , sumMoney = 0.0;
    function init(){
        $('.consign_rel_cont ul').empty();
	    if(user.addressDefault !== undefined){
            let address = addressInstance(user.addressDefault, true);
            address.css("border-color", 'red').children().eq(2).addClass("is_choose");
            top = user.addressDefault.name + "   " + replacePhone(user.addressDefault.phone);
            bottom = user.addressDefault.city + "  " + user.addressDefault.district + "  " + user.addressDefault.village + "  " +user.addressDefault.indetail;
            $('.pay_tli_adr p:eq(0)').text(top);
            $('.pay_tli_adr p:eq(1)').children('span').text(bottom);
            $('.consign_rel_cont ul').append(address);
        }
        if(user.addressList.length > 0){
            $(user.addressList).each(function(){
                $('.consign_rel_cont ul').append(addressInstance(this , false));
            })
        }
        if(arr != undefined &&arr.length > 0){
            $('.delivery_rel_cont').empty();
            for (let i = 0 ; i < arr.length ; i++) {
                $(user.orderFormList).each(function(){
                    if(arr[i] == this.id){
                        sumMoney = sumMoney + (parseFloat(this.quantity) * parseFloat(this.monovalent));
                        $('.delivery_rel_cont').append(orderFromDom(this));
                    }
                });

            }
        }
    }
    init();

    $(".cur").click(function() {
        $(this).css("border-color", "red");
        $(this).siblings().css("border-color", "gray");
        $(this).children().next().next().addClass("is_choose");
        $(this).siblings().children().next().next().removeClass("is_choose");
        let top = $(this).children(".detail_info").children('p:eq(0)').text();
        let bottom  = $(this).children(".detail_info").children('p:eq(1)').text();
        bottom = bottom + "   " + $(this).children(".detail_info").children('p:eq(2)').text();
        $('.pay_tli_adr p:eq(0)').text(top);
        $('.pay_tli_adr p:eq(1)').children('span').text(bottom);
    });


    // 订单
    function orderFromDom(orderFrom){
        return $(`<div class="deliv_items clearfix">
							<div class="de_item_sub">
								<div class="del_warp_box">
									<div class="del_li_box">
										<div class="did_tit clearfix">
											<b class="fl">配送方式</b>
											<div class="fr">
												<em class="fr">自营中小件</em>
											</div>
										</div>
										<div class="paymethd_rel_cont">
											<span style="cursor: pointer;">
												<a class="cur"><b></b>
												第三方配送<i class="sprite_odr"></i>
												</a>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="goods-list">
								<div class="de_ib_box">
									<div class="dib_tit">
										<b>` + orderFrom.shopNames + `</b>
									</div>
									<div class="dib_con">
										<ul class="clearfix">
											<li>
												<div class="clearfix" style="width: 580px;">
													<div class="goods_one">
														<a><img src="` + orderFrom.pricture + `" height="58" width="58"></a>
													</div>
													<div class="goods_two">
														<p class="inf_name">
															<a>` + orderFrom.designation + `</a>
														</p>
														<p class="inf_tip clearfix" style="width: 230px;">
															<i class="sprite_odr"></i>
															<span>支持7天无理由退货</span>
														</p>
													</div>
													<div class="goods-there">
														<span>
														<b>￥`+ orderFrom.monovalent +`</b>
													</span>
														<span>
														<em></em>
													</span>
													</div>
													<div class="goods-four">
                                                        <em>x</em>` + orderFrom.quantity + `
													</div>
													<div class="dc_tips">
														有货
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>`);

    }

    $('.pay_tli_count p.ptc_count b').text(sumMoney);
    $('.pay_tli_price ul li.prod_jr .ptp_con').text("￥" + sumMoney);

    function removeOrderFrom(arr , targetIndex){
        arr.splice(targetIndex , 1);
    }





    $('.pay_btn_smbit').click(function () {
        console.log(user);

        for (let i = 0 ; i < arr.length ; i++) {

            $(user.orderFormList).each(function(index , value){
                if(arr[i] == this.id){
                    removeOrderFrom(user.orderFormList , index);
                    user.buyList.push(value);
                }
            });
        }
        localStorage.setItem(userName , JSON.stringify(user));
        console.log(user);
        // alert("订单已提交~ 可以到个人信息查看。三秒后自动返回主页");
        // setTimeout(()=>{
        //     window.location.href = "../../index.html";
        // }, 3000);
    });
    
})