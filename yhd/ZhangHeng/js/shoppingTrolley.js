//页面加载时
$(function(){
	let userName = sessionStorage.getItem('user');
	let user = JSON.parse(localStorage.getItem(userName));
	
	//判断是否登录
	
		if(user!=null){
            $(".empty").hide();//当没有登录时显示的div
            gouwucheLenght();
    //		$(".wrap").show();//商品展示
    //		$(".settling_column_bar").show();//结算工具栏
            $(".zhuce").hide();
            $(".tou_login_name").text('你好').next().text(user.name).attr('href','data_index.html');
		} else {
			$(".empty").show();
			$(".wrap").hide();
			$(".empty_SignIn").hide();
			$(".settling_column_bar").hide();
			$('.tou_login_name').text('请登录').next().text('登录').attr('href','enter.html');
	        $(".zhuce").show();
	        $(".hd_vip_gradeStyle").hide();
		}
	
	
	
	
	//判断所登录账号的购物车有没有数据
	function gouwucheLenght(){
		let shoppingshu=user.orderFormList.length;
		if(shoppingshu>=1){
			$(".empty_SignIn").hide();
			$(".wrap").show();//商品展示
			$(".settling_column_bar").show();//结算工具栏
		}else{
			$(".empty_SignIn").show();
			$(".wrap").hide();//商品展示
			$(".settling_column_bar").hide();//结算工具栏
			
		}
	};
	
	
	//点击推荐商品左右按钮
	$(".right_arrow").bind("click",function(){
		var x=$(".tuijian").offset().left;
		
		if(x>200){
			$(".tuijian").animate({left:'-=1110'},"slow");
			$(".you_hei").addClass("gouwuche_li").siblings().removeClass("gouwuche_li");
		return false;
		}
		return false;
	});
	$(".left_arrow").bind("click",function(){
		var x=$(".tuijian").offset().left;
		if(x<200){
			$(".tuijian").animate({left:'+=1110'},"slow");
			$(".zuo_hei").addClass("gouwuche_li").siblings().removeClass("gouwuche_li");
		return false;
		}
		return false;
	});
	//点击小黑点
	$(".zuo_hei").bind("click",function(){
		$(".tuijian").animate({left:'0'},"slow");
		$(this).addClass("gouwuche_li").siblings().removeClass("gouwuche_li");
	});
	$(".you_hei").bind("click",function(){
		$(".tuijian").animate({left:'-1110'},"slow");
		$(this).addClass("gouwuche_li").siblings().removeClass("gouwuche_li");
	});

	//购物车数量加减
	//实现数量加减
//	var shu=$(".input");
//	var money1=$(".item_a_money1");
	
	$(document).on("click",".add",function(){
//		$(this).prev("input").attr("value",parseInt($(this).prev("input").attr().value())+1);
//		let text=$(this).nextAll().nextAll().nextAll().eq(4).children(".item_a_money").children(".item_a_money1").text();
//		shu.val(parseInt(shu.val())+1)
//		$(this).siblings().removeClass("unable");
//		console.log(text);
//		quantity();
		let shu=$(this).prev("input");
		shu.val(parseInt(shu.val())+1);
		let danjia=parseInt($(this).parent().parent().prev(".item_price").first().text()) ;
		let shu1=shu.val();
		let zong=danjia*shu1;
		console.log(zong);
		$(this).parent().parent().next().children(".item_a_money").children(".item_a_money1").text(zong);
		zongjiege();
		let id =parseInt($(this).parent().parent().parent().prev(".orderFormId").text() );
//		$(user.orderFormList).each(function(){
		for(let i=0;i<orderForm.length;i++){
			if(orderForm[i].id === id){
				orderForm[i].quantity = shu1;
				orderForm[i].zongjia=zong;
			}
		};
		localStorage.setItem(userName , JSON.stringify(user));
		return false;
	});
	$(document).on("click",".minus",function(){
		let shu=$(this).next("input");
		var x=parseInt(shu.val());
		if(x>1){
			shu.val(x-1);
			let danjia=parseInt($(this).parent().parent().prev(".item_price").first().text()) ;
		let shu1=shu.val();
		let zong=danjia*shu1;
		$(this).parent().parent().next().children(".item_a_money").children(".item_a_money1").text(zong);
		zongjiege();
		let id =parseInt($(this).parent().parent().parent().prev(".orderFormId").text() );
		for(let i=0;i<orderForm.length;i++){
			if(orderForm[i].id === id){
				orderForm[i].quantity = shu1;
				orderForm[i].zongjia=zong;
			}
		};
		localStorage.setItem(userName , JSON.stringify(user));
		}
		else{
			$(this).addClass("unable");
			shu.val(1);
		}
		
		return false;
	});
	//限制数量不能小于1
	$(document).on('blur',".input",function(){
			let liang=$(this).val();
			
			if(liang<=1){
				$(this).val(1);
				let danjia=parseInt($(this).parent().parent().prev(".item_price").first().text()) ;
				let zong=danjia*1;
				$(this).parent().parent().next().children(".item_a_money").children(".item_a_money1").text(zong);
				//获取该商品的id
				let id =parseInt($(this).parent().parent().parent().prev(".orderFormId").text() );
			for(let i=0;i<orderForm.length;i++){
			if(orderForm[i].id === id){
				orderForm[i].quantity = 1;
				orderForm[i].zongjia=zong;
			}
		};
		localStorage.setItem(userName , JSON.stringify(user));
			}else{
				let danjia=parseInt($(this).parent().parent().prev(".item_price").first().text()) ;
				let zong=danjia*liang;
				$(this).parent().parent().next().children(".item_a_money").children(".item_a_money1").text(zong);
				let id =parseInt($(this).parent().parent().parent().prev(".orderFormId").text() );
			for(let i=0;i<orderForm.length;i++){
			if(orderForm[i].id === id){
				orderForm[i].quantity = liang;
				orderForm[i].zongjia=zong;
			}
		};
		localStorage.setItem(userName , JSON.stringify(user));
			}
			zongjiege();
			
	})
	
	//当鼠标滑动到指定位置时
	$(window).bind("scroll",function(){
				var windowStop=$(document).scrollTop();

				if(windowStop>=417){
					$(".settling_column_bar").css({"position":"fixed","margin-top":"0"});
				}else{
					$(".settling_column_bar").css({"position":"relative","margin-top":"20px"});
				}
			});
	
	//当鼠标悬浮在客户服务上时
	$(".tou_right li:eq(2)").bind("mouseover",function(){
		$(".tou_menu_yincang").show();
		$(this).css("background-color","white");
	});
	$(".tou_right li:eq(2)").bind("mouseout",function(){
		$(".tou_menu_yincang").hide();
		$(this).css("background-color","#f4f4f4");
	});
	
	//当鼠标悬浮在APP下载上时
	$(".tou_right li:eq(3)").bind("mouseover",function(){
		$(".tou_title_yincang").show();
		$(this).css("background-color","white");
	});
	$(".tou_right li:eq(3)").bind("mouseout",function(){
		$(".tou_title_yincang").hide();
		$(this).css("background-color","#f4f4f4");
	});
	
	var index=-1;
	//当鼠标悬浮在右下角固定栏上时
	$("#guding li").bind("mouseover",function(){
		var index=$(this).index();
		
//		$("#guding li:eq("+index+") em").css("left","-30px");
		$(this).css({"background-color":"red","width":"84px"});
		$("#guding li:eq("+index+") em").show();
		
	});
	$("#guding li").bind("mouseout",function(){
		var index=$(this).index();
//		$("#guding li:eq("+index+") em").css("left","30px");
		$(this).css({"background-color":"rgba(255,255,255,0)","width":"34px"});
		$("#guding li:eq("+index+") em").hide();
	});
	
	//返回顶部
	$("#guding li:eq(3) a").bind("click",function(){
		
		$("body,html").animate({"scrollTop":"0px"},500);
		return false;
			
	});
	zongjiege();
	//总价
	function zongjiege(){
		let zong=0;			//总价
		let shuliang=0;		//商品数量
		//遍历商品复选框
		$(".check_item").each(function(){
			let ischeck=$(this).prop("checked");	//获得该复选框是否选中
			if(ischeck==true){
				//获取该商品的数量
				let shu=$(this).nextAll().eq(3).children(".num_act").children(".input").val();
				//获取该商品的小计
				let text=parseInt($(this).nextAll().eq(4).children(".item_a_money").children(".item_a_money1").text());
				zong+=parseInt(text);
				shuliang+=parseInt(shu);
			}
		});
		//将获得的值传入到指定区域
		$(".zong_money span").text(zong.toFixed(2));
		$(".rpt_count b").text(zong.toFixed(2));
		$(".yuanjia").text(zong.toFixed(2));
		$(".all_checked_label b").text(shuliang);
		$(".rpv_count b").text(shuliang);
	};
	

	var orderForm=user.orderFormList;
	PurchaseList();


	function PurchaseList(){
        $('#ulId').empty();
		$(user.orderFormList).each(function(){

		    $('#ulId').append($(`<li class="item item_line main_item clearfix">
					<div class="orderFormId" style="display:none;">${this.id}</div> 
					<div class="cart_prod clearfix">
						<!--选择商品的图标-->
										
						<input type="checkbox" class="check check_item" />
						<!--商品头像-->
						<a href="#" class="item_pic">
							<img class="mainCart scrollLoading" src="${this.pricture}" width="75px" height="75px"/>
						</a>
						<a href="#" class="item_tit ">${this.designation}</a>
						<div class="item_price">
							<p>${this.monovalent}</p>
						</div>
						<!--数量-->
						<div class="item_num">
							<div class="num_act clearfix">
								<a href="#" class="minus unable">-</a>
								<input type="text" class="input" value="${this.quantity}"/>
								<a href="#" class="add">+</a>
							</div>
							<span class="stock partial limit"></span>
							<span class="stock"></span>
						</div>
						<!--小计-->
						<div class="item_amount">
							<div class="item_a_money"><span class="item_a_money1">${this.zongjia}</span></div>
						</div>
						<!--操作-->
						<div class="item_act">
							<!--收藏-->
							<a href="#" class="collect_btn collect_btn_64223316866 collected">
								<i class="iconfont">&#xe83f;</i>
							</a>
							<!--删除-->
							<a href="#" class="del_btn">
								<i class="iconfont">&#xe66b;</i>
							</a>
						</div>
						<div class="prop_edit">
							<div class="prop_server prop_server_orange">
								<i class="seven_icon"></i>
									<div class="server_tips">
										<div class="t_arrow t_arrow_top">
											<span></span>
											<i></i>
										</div>
										<span class="t_txt">支持7天无理由退货</span>
									</div>
							</div>
							<div class="prop_txt tip_trigger serial_product  marginLf21">
								<span class="attributeName attributeName1">${this.model}</span>
								<span class="attributeName attributeName2">${this.size}</span>
							</div>
											
						</div>
					</div>
					</li>`))
        });

	};
	
	
	
	
	
	//点击删除
	$(document).on("click",".del_btn",function(){
		//获取该商品的id1235 A1
		let id =parseInt($(this).parent().parent().prev(".orderFormId").text() );
		for(let i=0;i<orderForm.length;i++){
			if(orderForm[i].id === id){

				removeOrderFrom(orderForm , i);
			}
		};
		localStorage.setItem(userName , JSON.stringify(user));	
		$(this).parent().parent().parent().remove();
		return false;
	});
	//删除方法
	 function removeOrderFrom(orderForm , index){
        orderForm.splice(index , 1);
    }
	
	
	
	//当鼠标悬浮在推荐商品图片上时
	$(".prod_img").bind("mouseover",function(){
		$(this).children(".add_gouwuche").show();
	});
	$(".prod_img").bind("mouseout",function(){
		$(this).children(".add_gouwuche").hide();
	});
	
	//获取当前时间
	var nowTime=getFormatDate();
	function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
	}
	
	//订单列表对象
	function Product(id,shopNames,designation, pricture, monovalent, model, size, quantity,date,zongjia){
		this.id=id;				//商品编号
		this.shopNames=shopNames;//店铺名称
		this.designation = designation;//商品名称
		this.pricture = pricture;//图片路径
		this.monovalent = monovalent;//单价
		this.model = model;//款式
		this.size = size;//尺码
		this.quantity = quantity;//数量
		this.date = date;   // 时间
		this.zongjia=zongjia;//总价
	}
	

	//点击加入购物车图标
	$(".add_gouwuche").eq(0).click(function(){
		let shopNames="百草味品牌旗舰店";//商家名称
		let designation=$(this).parent().next().children(".p_tit").text();//商品名称
		let picture=$(this).prev().children("img").attr("src");//图片路径
		let monovalent=$(this).parent().next().children(".p_pri").children("b").text();//单价
		let model="红豆薏米粉";//款式
		let size="原味";//尺码
		let quantity=1;//数量
		let date=nowTime;//时间
		
		let zongjia=parseInt(monovalent)*quantity;//总价
		
		let product = new Product(600,shopNames,designation , picture, monovalent, model , size ,quantity,date,zongjia);
		user.orderFormList.push(product);
		// 更新本地存储
		localStorage.setItem(userName, JSON.stringify(user));
        PurchaseList();
		return false;
	});

	
	//点击去结算   将选中的id 通过 sesstionStorage 给发送出去
	$(".checkout_btn").click(function(){

		let arr = [];
		$(".check_item").each(function(){
			let ischeck=$(this).prop("checked");	//获得该复选框是否选中
            if(ischeck==true){
				let id=$(this).parent().prev(".orderFormId").text();
				arr.push(id);
			}
		});

		if(arr.length === 0){
		    alert("请选中商品再结算");
            return false;
        }

		sessionStorage.setItem('arr' , JSON.stringify(arr));
		// 自己看看值是否添加成功。如果添加成功就没问题。  记得放到这个事件的最后。
        // 如果没有值。则证明没有添加进去。 就是 判断的问题。 应该没有问题
			

	})
	
	//当鼠标悬浮在合计-总价上时
	$(".r_price_total").bind("mouseover",function(){
		$(".pay_tips").show();
	});
	$(".r_price_total").bind("mouseout",function(){
		$(".pay_tips").hide();
	});


	
	

	
	//复选框
	$(".check_all").on("click",function(){
		if($(this).is(':checked')){
			$(".check").each(function(){
				$(this).prop("checked",true);
			});
		}else{
			$(".check").each(function(){
				$(this).prop("checked",false);
			});
		}
		zongjiege();
	})
    //商品复选框
	$("body").on("click",".check_item",function(){
        var td2 = $(this).parent().parent().parent();
		var count1 = td2.find(":checked").length; //当前选中的数量

		var count2 = td2.find(":checkbox").length;//当前这个ul里面有多少个复选框

        if (count1 == count2) {
			$(".check_all").prop("checked", true);
			$(".check_list").prop("checked", true);
		}
		else {
			$(".check_all").prop("checked", false);
			$(".check_list").prop("checked", false);
		}
		zongjiege();
	});
	//店铺复选框
	$(".check_list").on("click",function(){
		if($(this).is(':checked')){
			$(".check").each(function(){
				$(this).prop("checked",true);
			});
		}else{
			$(".check").each(function(){
				$(this).prop("checked",false);
			});
		}
		zongjiege();
	})

	
});
	
	
	
	
	
	
	

