$(function(){
    var $imgs = $('.main-img .imgs li').fadeOut(0);
    $($imgs[0]).fadeIn(200)
    function changeImg(i){
        $(".main-img .btn li").removeClass();
        $(".main-img .btn li").eq(i).addClass('hover');
        $($imgs).fadeOut(250);
        $($imgs[i]).fadeIn(250);
	
    };
    


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

    
    //倒计时
	var starttime =new Date("2020/05/7");
		setInterval(function(){
			var nowtime=new Date();
			var time =starttime-nowtime;
			var day=parseInt(time/1000/60/60);
//			var hour=parseInt(time/1000/60/60%24);
			var minute=parseInt(time/1000/60%60);
			var seconds=parseInt(time/1000%60);
			$(".span-hour").html(day+" ");
			$(".span-minute").html(minute);
			$(".span-second").html(seconds);
		},1000);




//	商品图片切换
	function mychange(){
			$(".datu-img img").fadeOut(500).eq(index).fadeIn(500);	//所有图片淡出，当前图片淡入
			$(".xiaotu img").removeClass("change").eq(index).addClass("change");
		}
	$(".datu-img img:gt(0)").fadeOut(1);
	$(".xiaotu img").bind("mouseenter",function(){
		$(".datu-img img").stop(true,true);
		index =$(".xiaotu img").index(this);
		mychange();
	})
	
	//给小图片添加边框
	$(".xiaotu img").bind("mouseenter",function(){
		
	})
	
	//页面加载时默认选择的颜色
	$(".yanse .dd div:eq(0) b").show();

	
	//选择颜色
	$(".yanse .dd div").bind("click",function(){
		$(".yanse .dd div").removeClass('kuang').children('b').hide();
		$(this).addClass('kuang').children('b').show();
		$(".ys").text($(this).text());
		return false;
	});
	
	//页面加载时默认选择的尺码
	$(".chima .dd div:eq(4) b").show();

	
	//选择尺码
	$(".chima .dd div").bind("click",function(){
		$(".chima .dd div").removeClass('kuang').children('b').hide();
		$(this).addClass('kuang').children('b').show();
		$(".xinghao").text($(this).text());
		return false;
	});
	
	//实现数量加减
	var shu=$("#shuzi");
	$(".shangxia .add").bind("click",function(){
		shu.val(parseInt(shu.val())+1)
	});
	$(".shangxia .subtract").bind("click",function(){
		var x=parseInt(shu.val());
		if(x>1){
			shu.val(x-1);
		}
		else{
			
			shu.val(1);
		}
	});
	//限制数量不能小于1
	$("#shuzi").on('blur',function(){
			var liang=$(this).val();
			if(liang<=1){
				$(this).val(1);
			}
	})
	
	//小图片左右移动
	$(".img_right").bind("click",function(){
		var x=$(".xiaotu").offset().left;
		
		if(x>162){
			$(".xiaotu").animate({left:'-=56'},"slow");
		return false;
		}
		return false;
	});
	$(".img_left").bind("click",function(){
		var x=$(".xiaotu").offset().left;
		if(x<162){
			$(".xiaotu").animate({left:'+=56'},"slow");
		return false;
		}
		return false;
	});
	//到指定位置显示隐藏的div
	$(window).bind("scroll",function(){
				var windowStop=$(document).scrollTop();

				if(windowStop>=1140){
					$(".des_fixed").fadeIn(1);
				}else{
					$(".des_fixed").fadeOut(1);
				}
			});
	
	//点击商品介绍/评价/售后服务后
	$(".introduce ul li a").bind("click",function(){
		$(this).addClass("jieshao-div").siblings().removeClass("jieshao-div");
		$(document).scrollTop(1140);
		return false;
	})
	
	//点击商品介绍时
	$(".introduce .jie").bind("click",function(){
		$(".details1").show();
		$(".statement").show();
	});
	//点击评论时
	$(".introduce .pinglun").bind("click",function(){
		$(".details1").hide();
		$(".statement").hide();
	});
	//点击售后服务时
	$(".introduce .shouhou").bind("click",function(){
		$(".details1").hide();
		$(".statement").show();
	});
	
	//点击隐藏div商品介绍/评价/售后服务后
	$(".des_tabbox a").bind("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$(document).scrollTop(1140);
		return false;
	})
	
	//点击商品介绍时
	$(".des_tabbox .jie").bind("click",function(){
		$(".details1").show();
		$(".statement").show();
	});
	//点击评论时
	$(".des_tabbox .pinglun").bind("click",function(){
		$(".details1").hide();
		$(".statement").hide();
	});
	//点击售后服务时
	$(".des_tabbox .shouhou").bind("click",function(){
		$(".details1").hide();
		$(".statement").show();
	});
	
	//选地址
	$('.roughly .row .col.county>select').change(function(){
            $('.roughly .row .col.city>select').css('display','block');
        });
        $('.roughly .row .col.city>select').change(function(){
            $('.roughly .row .col.district>select').css('display','block');
        });
        $('.roughly .row .col.district>select').change(function(){
            $('.roughly .row .col.village>select').css('display','block');
        });
	
	//点击选地址的关闭按钮时
	$(".hint a").click(function(){
		var sheng=$(".county select option:selected").text();
		var shi=$(".city select option:selected").text();
		
		var xian=$(".district select option:selected").text();
		var jiedao=$(".village select option:selected").text();
		if($.trim(sheng) == $.trim("请选择省")){
			$(".roughly").hide();
			return false;
		}else{
			var zong=sheng+shi+xian;
			$(".xiala").text(zong);
			$(".roughly").hide();
			return false;
		}

	})
	
	//点击地址下拉框
	$(".xiala").click(function(){
		$(".roughly").show();
	})
	
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

	
	//向订单列表中添加数据start
	var userName = sessionStorage.getItem('user');
	var user = JSON.parse(localStorage.getItem(userName));
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

	//点击加入购物车
	$(".jia .jiaru").click(function(){
		if(user === null) {
			// 自行百度。怎么通过 js 跳转页面。  
			window.location.href="../enter.html";
		}

		let shopNames=$(".shop-name a").text();//商家名称
		let designation=$(".biaoti h2").text();//商品名称
		let picture=$(".datu-img img:first").attr("src");//图片路径
		let monovalent=$(".price em").text();//单价
		let model=$(".ys").text();//款式
		let size=$(".xinghao").text();//尺码
		let quantity=$("#shuzi").val();//数量
		let date=nowTime;//时间
		let zongjia=parseInt(monovalent)*quantity;//总价
        let product = new Product(42,shopNames,designation , picture, monovalent, model , size ,quantity,date,zongjia);
		user.orderFormList.push(product);
		// 更新本地存储
		localStorage.setItem(userName, JSON.stringify(user));
		shoppingNumber();

	});
	//向订单数组中添加数据end
	
	shoppingNumber();
	//判断数组中有几条数据
	function shoppingNumber(){
		let shoppingshu=user.orderFormList.length;
		if(shoppingshu>=1){
			$(".shopping_geshu").show();
			$(".shopping_geshu").text(shoppingshu);
		}
		else{
			$(".shopping_geshu").hide();
		}
	};
	
	//判断是否登录
	
	if(user!=null){
		
		
		$(".nav-link:eq(2)").text('你好,'+user.name).attr('href','data_index.html');
//		$(".nav-link:eq(2)").children("a").text(user.name).attr('href','data_index.html');
        $(".nav-zhuce").text("新晋");
        $(".nav-zhuce").addClass('nav-vip');
		$(".nav-masthead").children().eq(2).css("padding","2px");
	}else{
		
		$('.nav-link:eq(2)').text('您好,请登录').next().text('登录').attr('href','enter.html');
        $(".nav-zhuce").text('注册');
        $(".nav-zhuce").removeClass('nav-vip');
        $(".nav-masthead").children().eq(2).css("padding","8px");
	}
	
	
	
	
});