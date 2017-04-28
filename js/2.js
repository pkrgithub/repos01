/**
 * Created by Administrator on 2017/3/31 0031.
 */
    $(function(){
        var imgs = ['bashaier.jpg', 'chongni.jpg', 'gl.jpg', 'ipd.jpg', 'jiadian.jpg', 'mianfei.jpg', 'qiye.jpg', 'quanming.jpg']
        var adv = {
            duration: 800,//动画时长
            steps: 100,//动画步长
            timer: null,//计时器序号
            wait: 3000,//动画等待时间
            canAuto: true,//是否能自动轮播
            imgarr:null,//需要传入轮播图片数组名字
            imgBox:null,//轮播图片框
            idtor:null,//指示器框
            init: function (imgarr,imgBox,idtor) {//初始化
                var self = this;
                self.imgarr=imgarr;
                self.imgBox=imgBox;
                self.idtor=idtor;
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
            },
            updateView: function () {//更新指示器显示
                var self=this;
                $('[data-adv=' +self.idtor+'] [class*=indicator-active]').removeClass('indicator-active');
                var i = $('[data-adv='+self.imgBox+'] [class*=adv-imgs-active]').attr('data-i');
                $('[data-adv='+self.idtor+'] li:eq(' + i + ')').addClass('indicator-active');
            },
            moveStep: function (n) {//自动轮播走一步
                var self = this;
                var maxi = parseFloat($('[data-adv='+self.imgBox+']>div:last').attr('data-i'));//最大的序号数
                var Acti = parseFloat($('[data-adv='+self.imgBox+'] .adv-imgs-active').attr('data-i'));//显示图片的data-i序号
                var Actopa = parseFloat($('[data-adv='+self.imgBox+'] .adv-imgs-active').css('opacity'));//显示图片的透明度
                var nexti = n > 100 ? (Acti + 1) % (maxi + 1) : n >= 0 ? n : n < 0 && Acti > 0 ? Acti - 1 : maxi;//下一个将要显示的图片序号
                var nextopa = parseFloat($('[data-adv='+self.imgBox+'] div[data-i=' + nexti + ']').css('opacity'));
                Actopa -= 0.05;
                nextopa += 0.05;
                if (Actopa > 0) {
                    self.timer = setTimeout(function () {
                        $('[data-adv='+self.imgBox+'] .adv-imgs-active').css('opacity', Actopa);
                        $('[data-adv='+self.imgBox+'] div[data-i=' + nexti + ']').css('opacity', nextopa);
                        self.moveStep(n)//循环自动轮播
                    }, self.duration / self.steps);
                } else if (Actopa <= 0) {//切换图片
                    $('[data-adv='+self.imgBox+'] .adv-imgs-active')
                        .removeAttr('style').removeClass('adv-imgs-active')
                    && $('[data-adv='+self.imgBox+']>div[data-i=' + nexti + ']')
                        .removeAttr('style').addClass('adv-imgs-active');
                    self.updateView();
                    self.autoMove()
                }
            },
            autoMove: function () {//自动轮播
                var self = this;
                self.timer = setTimeout(function () {
                    if (self.canAuto) {
                        self.moveStep(101);
                    } else {
                        self.autoMove();
                    }
                }, self.wait)
            },
        };
        adv.init(imgs,'img','idtor');
    })


//var imgs = ['bashaier.jpg', 'chongni.jpg', 'gl.jpg', 'ipd.jpg', 'jiadian.jpg', 'mianfei.jpg', 'qiye.jpg', 'quanming.jpg']
//var adv = {
//    duration: 800,//动画时长
//    steps: 100,//动画步长
//    timer: null,//计时器序号
//    wait: 3000,//动画等待时间
//    canAuto: true,//是否能自动轮播
//    init: function (imgarr) {//初始化
//        var self = this;
//        $(imgarr).each(function (idx, img) {
//            $('#adv-imgs').append($("<div data-i=" + idx + " class=adv-imgs><a href=><img src=img/"
//                + img + " alt=/></a></div>"));//生成图片
//            $('#adv-indicator>ul').append($("<li class=indicator data-i=" + idx + "></li>"))//生成指示器
//        });
//        var n = (function () {
//            return 0
//        })()
//        $('#adv-imgs>div:eq(' + n + ')').addClass('adv-imgs-active')
//        $('#adv-indicator').css({//指示器自动居中
//            position: 'absolute',
//            bottom: '20px',
//            left: function () {
//                return $('#adv-box').width() / 2 - $('#adv-indicator').width() / 2
//            }
//        });
//        $('.adv-tog').css('display', 'none');//隐藏切换按钮
//        $('#bn-bd').mouseover(function () {
//            self.canAuto = false;//鼠标进入轮播页面自动暂停轮播
//            $('.adv-tog').css('display', 'block');
//        }).mouseleave(function () {
//            self.canAuto = true;//鼠标移走轮播继续
//            $('.adv-tog').css('display', 'none');
//        });
//        $('.adv-tog').click(function () {//点击左右按钮切换图片
//            if ($('#adv-imgs>div[class*=adv-imgs-active]').css('opacity') == 1) {
//                clearTimeout(self.timer)
//                self.timer = null;
//                if ($(this).attr('id') == 'adv-tog-l') {
//                    self.moveStep(-1);
//                } else {
//                    self.moveStep(101);
//                }
//            }
//        });
//        $('#adv-indicator>ul>li[class=indicator]').hover(function () {//鼠标在指示器上面显示指定的图片
//            if ($('#adv-imgs>div[class*=adv-imgs-active]').css('opacity') == 1) {
//                var n = $(this).attr('data-i');
//                clearTimeout(self.timer)
//                self.timer = null;
//                self.moveStep(n);
//            }
//        });
//        self.updateView();//图片对应的指示器显示红色
//        self.autoMove();//自动轮播开始
//    },
//    updateView: function () {//更新指示器显示
//        $('#adv-indicator>ul>li[class*=indicator-active]').removeClass('indicator-active');
//        var i = $("#adv-imgs div[class*=adv-imgs-active]").attr('data-i');
//        $('#adv-indicator>ul>li:eq(' + i + ')').addClass('indicator-active');
//    },
//    moveStep: function (n) {//自动轮播走一步
//        var self = this;
//        var maxi = parseFloat($('#adv-imgs>div:last').attr('data-i'));//最大的序号数
//        var Acti = parseFloat($('.adv-imgs-active').attr('data-i'));//显示图片的data-i序号
//        var Actopa = parseFloat($('.adv-imgs-active').css('opacity'));//显示图片的透明度
//        var nexti = n > 100 ? (Acti + 1) % (maxi + 1) : n >= 0 ? n : n < 0 && Acti > 0 ? Acti - 1 : maxi;//下一个将要显示的图片序号
//        var nextopa = parseFloat($('#adv-imgs>div[data-i=' + nexti + ']').css('opacity'));
//        Actopa -= 0.05;
//        nextopa += 0.05;
//        if (Actopa > 0) {
//            self.timer = setTimeout(function () {
//                $('.adv-imgs-active').css('opacity', Actopa);
//                $('#adv-imgs>div[data-i=' + nexti + ']').css('opacity', nextopa);
//                self.moveStep(n)//循环自动轮播
//            }, self.duration / self.steps);
//        } else if (Actopa <= 0) {//切换图片
//            $('.adv-imgs-active').removeAttr('style').removeClass('adv-imgs-active') && $('#adv-imgs>div[data-i=' + nexti + ']').removeAttr('style').addClass('adv-imgs-active');
//            self.updateView();
//            self.autoMove()
//        }
//    },
//    autoMove: function () {//自动轮播
//        var self = this;
//        self.timer = setTimeout(function () {
//            if (self.canAuto) {
//                self.moveStep(101);
//            } else {
//                self.autoMove();
//            }
//        }, self.wait)
//    },
//};
//adv.init(imgs);