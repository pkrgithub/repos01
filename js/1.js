/**
 * Created by Administrator on 2017/3/23 0023.
 */
$(function () {
    //左边菜单栏
    $('#banner-nav>li').mouseover(function () {
        $(this).children('.menu-nav')
            .addClass('menu-nav-hover');
        $(this).children('.menu-detail')
            .css('display', 'block');


    }).mouseleave(function () {
        $(this).children('.menu-nav')
            .removeClass('menu-nav-hover');
        $(this).children('.menu-detail')
            .css('display', 'none');
    });
    $('.bulletin-head a[data-dowm*=hover]').mousemove(function () {
        $('ul[data-infom]').attr('class','bulletin-hid');
        $('ul[data-infom='+$(this).attr('data-infom')+']').removeAttr('class');
        if($(this).attr('data-infom')=='annm'){
            $('#bulletin-underline').css({
                'transform':'translateX(47px)',
            })
        }else{
            $('#bulletin-underline').css({
                'transform':'translateX(0px)'
            })
        }
    });

    //生活区
    var over=true;
    $('li[data-icon-item=header]').mouseover(function(){
        if(over){//话费机票酒店游戏鼠标进入事件
            $('li[data-icon-item=header]').addClass('icon-item-header');
            $('li[data-icon-item=header]').removeClass('icon-item-header-hover icon-item-header-leave');
            $(this).addClass('icon-item-header-hover');
            $('#service-detail').addClass('show-service-detail').children('div').attr('style','display:none');
            $('#service-detail>div').attr('style','display:none');
            $('div[data-item='+$(this).attr('data-item')+']').attr('style','display:block')
        }
    }).mouseleave(function(){over=true});
    $('span[class=close-btn]').click(function(){//关闭按钮
        over=false;
        $('#service-detail').removeClass('show-service-detail')
        $('li[data-icon-item=header]').removeClass('icon-item-header icon-item-header-hover');
        $('li[data-icon-item=header]').addClass('icon-item-header-leave');
    })
    $('.service-item ul li').mouseover(function(){
        var iLeft=$(this).find('a').width()/2-2;//话费充值下面三角的left居中
        $(this).find('i').css('left',iLeft)
        $(this).parent().find('a').removeClass();
        $(this).children('a').addClass('service-item-hover');
        if($(this).attr('data-s-item')){//显示话费流量套餐详情
            $('div[data-s-item]').css('display','none')
            $('div[data-s-item='+$(this).attr('data-s-item')+']')
                .attr('style','display: block');//显示下面的div
        }else if($(this).attr('data-jp-item')){
            var left=$(this).attr('data-jp-item')*190
            var div=$(this).parents('.service-item').next().children()
            $(div).css({
                'transform': 'translateX(-'+left+'px)',
                'transition': 'transform .3s ease',
                '-webkit-transform': 'translateX(-'+left+'px)',
                '-webkit-transition': '-webkit-transform .3s ease'
            });
            //console.log(div)

        }

    });

    $('select[data-select=price]').change(function(){//手机充值选择框
        var selVal=$(this).children('option:selected').val();
        $(this).next().text(selVal);
    })
    $('[data-top]').mouseover(function(){//页头导航
        if($(this).attr('data-top')=='down'){
            $(this).addClass('top-leave-bor')//手机京东
        }
        $(this).find('div').css('display','block')
        //console.log($(this))
    }).mouseleave(function(){
        $(this).find('div').css('display','none');
        $(this).removeClass('top-leave-bor')
    });
    $('.addr-detail a').click(function(){//地址显示选择
        $('#top-addr').text($(this).text());
        $('.addr-detail a').removeClass('aClick')
        $(this).addClass('aClick')
    })

    //头部固定头部搜索
//存储搜索记录
    $('[data-search=hit]').click(function(){
        var val=$(this).parent().find('input').val()//获取输入框内容
        //var reg=//
        if(val&&val!==''){
            localStorage.setItem(val,val);//保存输入搜索数据
        }
    });
    var focus=true;
    $('[data-focus=fix]').focus(function(){//搜索框获取焦点弹出记录框 显示内容
        if(localStorage.length){
            var ulParent=$(this).parent().parent().find('div.search-recode');
            var ul=ulParent.children();
            ulParent.css('display','block');
            if(focus){
                focus=false;
                for(i=0;i<=localStorage.length;i++){
                    if(i<localStorage.length){
                        var key=localStorage.key(i)
                        var recode=localStorage.getItem(key)
                        ul.append($("<li class='clearfloat'>"
                            +"<div class='recode-item'>"+recode+"</div>"
                            +"<div class='recode-mark'>搜索历史</div></li>"))
                    }else{
                        ul.append($("<li class='clearfloat close'><div class='recode-close'>关闭</div></li>"))
                    }
                }
            }
            $('[data-recode=box] li').mouseover(function(){
                $(this).find('.recode-mark').text('删除')
                $(this).find('.recode-mark').click(function(){
                    var key=$(this).parent().find('div.recode-item').text();
                    localStorage.removeItem(key)
                    $(this).parent().empty();
                    //console.log(a)
                })
            }).mouseleave(function(){
                $(this).find('.recode-mark').text('搜索历史')
            })
        }
    })
    $('div.search-recode').mouseleave(function(){//鼠标移出记录框删除显示记录 关闭记录框
        $(this).css('display','none');
        $(this).children('[data-recode=box]').empty();
        focus=true;
    })

    //滚轮滑动显示头部固定栏
    $(window).scroll(function(){
        //console.log(document.body.scrollTop+'第1个');
        //console.log(document.documentElement.scrollTop+'第二个');
        if(document.body.scrollTop>500||document.documentElement.scrollTop>500){
            $('#top-fix').css({
                '-webkit-transform': 'translateY(50px)',
                '-webkit-transition': '-webkit-transform .5s ease-in-out',
                '-moz-transform': 'translateY(50px)',
                '-moz-transition': '-moz-transform .5s ease-in-out',
                '-o-transform': 'translateY(50px)',
                '-o-transition': '-o-transform .5s ease-in-out',
                'transform': 'translateY(50px)',
                'transition': 'transform .5s ease-in-out'
            })
        }else{
            $('#top-fix').css({
                '-webkit-transform': 'translateY(-50px)',
                '-webkit-transition': '-webkit-transform .5s ease-in-out',
                '-moz-transform': 'translateY(-50px)',
                '-moz-transition': '-moz-transform .5s ease-in-out',
                '-o-transform': 'translateY(-50px)',
                '-o-transition': '-o-transform .5s ease-in-out',
                'transform': 'translateY(-50px)',
                'transition': 'transform .5s ease-in-out'
            })
        }
        //console.log(document.body.scrollTop)
    })

    //发现好货
    $('#fg-bd-box li:even:not(:last)').addClass('bor-b');//偶数除最后一个li加底部边框
    $('#fg-bd-box li:odd:not(:last)').addClass('bor-b bor-l');//奇数除最后一个li加底部 左边框
    //鼠标进入 图片向左移动效果
    $('[data-canm=true]').mousemove(function(){
        $(this).find('img').removeClass('img-rec').addClass('img-m')
    }).mouseleave(function(){
        $(this).find('img').removeClass('img-m').addClass('img-rec')
    })
    //排行榜
    $('li[data-charts]').mouseover(function(){
        var i=$(this).attr('data-charts');
        var w=($(this).width()+2)*i+5*i;
        //下划线left
        var left=$('#pxh-underline').css('left',6+w);
        //鼠标进入头部 显示的主体
        $('ul[data-charts]').addClass('charts-hide');
        $('ul[data-charts='+i+']').removeClass('charts-hide');
    }).mouseleave(function(){
        //console.log('111')
    })
    //券列表鼠标进入 图片向右移动
    $('[data-tik]').mouseover(function(){
        $(this).find('img').addClass('tick-item-img-m').removeClass('tick-item-img-rec');
        //console.log($(this).find('img').attr('src'))
        //console.log('000')
    }).mouseleave(function(){
        $(this).find('img').addClass('tick-item-img-rec').removeClass('tick-item-img-m');
    })


    //轮播通用
    //头部广告轮播
    var imgs = ['bashaier.jpg', 'chongni.jpg', 'gl.jpg', 'ipd.jpg', 'jiadian.jpg', 'mianfei.jpg', 'qiye.jpg', 'quanming.jpg']
   //京东直播轮播
    var zbArr=['id-zb_03.png','id-zb_06.png','id-zb_08.png','id-zb_11.png','id-zb_14.png'];
    function lb(imgarr,imgBox,idtor){
            this.duration= 800;//动画时长
            this.steps= 100;//动画步长
            this.timer= null;//计时器序号
            this.wait= 3000;//动画等待时间
            this.canAuto=true;//是否能自动轮播
            this.init=function () {//初始化
                var self=this;
                $(imgarr).each(function (idx, img) {
                    $('[data-adv='+imgBox+']').append($("<div data-i=" + idx + " class=adv-imgs><a href=><img src=img/"
                        + img + " alt=/></a></div>"));//生成图片
                    $('[data-adv='+idtor+']').append($("<li class=indicator data-i=" + idx + "></li>"))//生成指示器
                });
                $('[data-adv='+imgBox+']>div:eq(0)').addClass('adv-imgs-active')
                $('[data-adv='+idtor+']').parent().css({//指示器自动居中
                    position: 'absolute',
                    bottom: '20px',
                    left: function () {
                        return $('[data-adv='+imgBox+']').parent().width() / 2 - $('[data-adv='+idtor+']').parent().width() / 2
                    }
                });
                $('[data-adv=tog]').css('display', 'none');//隐藏切换按钮
                $('[data-adv='+imgBox+']').parent().mouseover(function () {
                    self.canAuto = false;//鼠标进入轮播页面自动暂停轮播
                    $(this).find('[data-adv=tog]').css('display', 'block');
                }).mouseleave(function () {
                    self.canAuto = true;//鼠标移走轮播继续
                    $(this).find('[data-adv=tog]').css('display', 'none');
                });
                $('[data-adv=tog]').click(function () {//点击左右按钮切换图片
                    if ($('[data-adv='+imgBox+']>div[class*=adv-imgs-active]').css('opacity') == 1) {
                        clearTimeout(self.timer)
                        self.timer = null;
                        if ($(this).attr('data-tog') == 'l') {
                            self.moveStep(-1);
                        } else {
                            self.moveStep(101);
                        }
                    }
                });
                $('[data-adv='+idtor+'] [class=indicator]').hover(function () {//鼠标在指示器上面显示指定的图片
                    if ($('[data-adv='+imgBox+'] [class*=adv-imgs-active]').css('opacity') == 1) {
                        var n = $(this).attr('data-i');
                        clearTimeout(self.timer)
                        self.timer = null;
                        self.moveStep(n);
                    }
                });
                self.updateView();//图片对应的指示器显示红色
                self.autoMove();//自动轮播开始
            };
            this.updateView= function () {//更新指示器显示
                $('[data-adv=' +idtor+'] [class*=indicator-active]').removeClass('indicator-active');
                var i = $('[data-adv='+imgBox+'] [class*=adv-imgs-active]').attr('data-i');
                $('[data-adv='+idtor+'] li:eq(' + i + ')').addClass('indicator-active');
            };
            this.moveStep= function (n) {//自动轮播走一步
                var self = this;
                var maxi = parseFloat($('[data-adv='+imgBox+']>div:last').attr('data-i'));//最大的序号数
                var Acti = parseFloat($('[data-adv='+imgBox+'] .adv-imgs-active').attr('data-i'));//显示图片的data-i序号
                var Actopa = parseFloat($('[data-adv='+imgBox+'] .adv-imgs-active').css('opacity'));//显示图片的透明度
                var nexti = n > 100 ? (Acti + 1) % (maxi + 1) : n >= 0 ? n : n < 0 && Acti > 0 ? Acti - 1 : maxi;//下一个将要显示的图片序号
                var nextopa = parseFloat($('[data-adv='+imgBox+'] div[data-i=' + nexti + ']').css('opacity'));
                Actopa -= 0.05;
                nextopa += 0.05;
                if (Actopa > 0) {
                    self.timer = setTimeout(function () {
                        $('[data-adv='+imgBox+'] .adv-imgs-active').css('opacity', Actopa);
                        $('[data-adv='+imgBox+'] div[data-i=' + nexti + ']').css('opacity', nextopa);
                        self.moveStep(n)//循环自动轮播
                    }, self.duration / self.steps);
                } else if (Actopa <= 0) {//切换图片
                    $('[data-adv='+imgBox+'] .adv-imgs-active')
                        .removeAttr('style').removeClass('adv-imgs-active')
                    && $('[data-adv='+imgBox+']>div[data-i=' + nexti + ']')
                        .removeAttr('style').addClass('adv-imgs-active');
                    self.updateView();
                    self.autoMove()
                }
            };
            this.autoMove= function () {//自动轮播
                var self = this;
                self.timer = setTimeout(function () {
                    if (self.canAuto) {
                        self.moveStep(101);
                    } else {
                        self.autoMove();
                    }
                }, self.wait)
            };
    };
    var zb=new lb(zbArr,'zbImg','zbidtor');//输入轮播图片数组 轮播图的content data-adv="zbImg" 指示器 data-adv="idtor" data-adv="zbidtor"
    zb.init();//开启京东直播轮播
    var hlb=new lb(imgs,'img','idtor');
    hlb.init();//开启京东头部广告轮播


    $('[data-zb=item]').mouseover(function(){
        $(this).find('img').removeClass('share-it-rec').addClass('share-it-m')
    }).mouseleave(function(){
        $(this).find('img').removeClass('share-it-m').addClass('share-it-rec')
    });
    $('[data-code]').mouseover(function(){
        $(this).children().removeClass('dimention-code-hide')
    }).mouseleave(function(){
        $(this).children().addClass('dimention-code-hide')
    })
    //爱生活
    $('[data-sp=hover]').mouseover(function(){
        $(this).children('a').removeClass('hide')
    }).mouseleave(function(){
        $(this).children('a').addClass('hide')
    })


    //品牌logo图片加载通用样式点击左右切换
    function loveLiving(boxId,imgArr){
        this.init=function(){//刷新页面
            var self=this;
            self.udate();
            self.move();
        };
        this.udate=function(){//将图片刷到父元素上
            var self=this;
            $(imgArr).each(function(idx,img){
                    $(boxId).append($("<li>"
                        +"<a href='#'>"
                        +"<img src='img/love-shopping/"+img+"' alt=''/>"
                        +"</a>"
                        +"</li>"))
                })
        };
        this.move=function(){
            var self=this;
            $(boxId).parent().children('[data-toggle]')
                .mousedown(function(){//鼠标按下事件 将图片数组改能够为按下左/右切换按钮时 没显示在框里面的图片相应的左/右变动一个570px像素位置 方便能够顺利左右切换
                    var liL=$(boxId).children('li').outerWidth();
                    var x=$(this).parent().find('ul').css('transform').replace(/[^0-9\-,]/g,'').split(',')[4];
                    if($(this).attr('data-toggle')=='l'){
                        if(x==0){
                            imgArr=imgArr.splice(6,12).concat(imgArr);
                            $(this).parent().find('ul').empty();
                            $(boxId).removeClass('love-sp-brand-box-item-m').addClass('love-sp-brand-box-item');
                            $(boxId).css({
                                'transform': 'translateX(-570px)',
                            });
                            self.udate();
                        }

                    }else if(x=='-570'){
                        imgArr=imgArr.splice(6,12).concat(imgArr);
                        $(this).parent().find('ul').empty();
                        $(boxId).removeClass('love-sp-brand-box-item-m').addClass('love-sp-brand-box-item');
                        $(boxId).css({
                            'transform': 'translateX(0px)',
                        });
                        self.udate();
                    };
                }).mouseup(function(){//鼠标按上时 进行图片的切换 也是数组在页面的刷新
                    $(boxId).removeClass('love-sp-brand-box-item').addClass('love-sp-brand-box-item-m');
                    if($(this).attr('data-toggle')=='l'){
                        $(boxId).css({
                            'transform': 'translateX(0px)',
                        });
                    }else{
                        $(boxId).css({
                            'transform': 'translateX(-570px)',
                        });
                    }
                });
        };
    };

    //爱逛
    var aiGuang=[
        'love-shopping-brand-1.jpg','love-shopping-brand-2.jpg','love-shopping-brand-3.jpg','love-shopping-brand-4.jpg','love-shopping-brand-5.jpg','love-shopping-brand-6.jpg',
        'love-shopping-brand-7.png','love-shopping-brand-8.jpg','love-shopping-brand-9.jpg','love-shopping-brand-10.jpg','love-shopping-brand-11.jpg','love-shopping-brand-12.jpg'
    ];
    var img=new loveLiving('#loveShopping',aiGuang);//传入展示图片的父元素id和图数组
    img.init();

    //爱美丽
    var aimeili=['love-beautiful-brand-11.jpg','love-beautiful-brand-12.jpg','love-beautiful-brand-13.jpg','love-beautiful-brand-14.jpg','love-beautiful-brand-15.jpg','love-beautiful-brand-16.jpg',
        'love-beautiful-brand-17.jpg','love-beautiful-brand-18.jpg','love-beautiful-brand-19.jpg','love-beautiful-brand-20.jpg','love-beautiful-brand-21.jpg','love-beautiful-brand-22.jpg'
    ]
    var img2=new loveLiving('#lovebeautiful',aimeili);//传入展示图片的父元素id和图数组
    img2.init();

});















































