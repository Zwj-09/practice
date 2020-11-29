// 轮播图
// 1.左右两个按钮在鼠标悬浮时显示 移开隐藏
// 2.点击按钮可以显示不同的图片
// 3.底下的小圆圈跟着图片一起变化
// 4.点击小圆圈的时候 图片发生改变
// 5.鼠标离开的时候 自动播放下一章
window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');

    // 1.按钮显示与隐藏
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过 停止定时器
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 鼠标离开 开启定时器
        timer = setInterval(function () {
            arrow_r.click();
        }, 5000000000);

    })


    // 图片张数和小圆圈个数保持一致  动态生成小圆圈
    // 1.获得li的个数
    // 2.利用循环动态生成小圆圈放入到ol里面

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement('li');
        // 设置自定义属性 给小圆圈 
        li.setAttribute('index', i);
        // li插入ol里面
        ol.appendChild(li);

        // 点击小圆圈 底色改变 排他思想
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 2.点击小圆圈图片滑动 ul做动画
            // 滚动图核心算法 小圆圈的索引号 * 图片的宽度 = ul的移动距离
            var index = this.getAttribute('index');
            // 点击li 把索引号给小圆圈 num
            num = index;
            // 点击li 把索引号给小圆圈 circle
            circle = index;
            var imgWidth = focus.offsetWidth;
            var targets = index * imgWidth;
            animate(ul, -targets, function () { })
        })
    }
    // 第一个默认显示颜色
    ol.children[0].className = 'current';

    // 克隆第一张图片 cloneNode 到最后 深克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 点击两侧按钮切换图片
    // num * 图片宽度 = ul移动距离
    // 控制小圆圈
    var circle = 0;
    // num判断图片到哪一张了
    var num = 0;
    var flag = true;
    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 走到了最后一张了 ul快速复原 left = 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            var tar = num * focus.offsetWidth;
            // 打开节流阀
            animate(ul, -tar, function () {
                flag = true;
            });
            // 右侧按钮点击一次 circle++
            circle++;
            // 图片比圆圈多一个
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            circleChange();
        }
    })
    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.right = 'ul.children.length - 1';
                num = ul.children.length - 1;
            }
            num--;
            var tar = num * focus.offsetWidth;
            animate(ul, -tar, function () {
                flag = true;
            });
            // 左侧按钮点击一次 circle--
            circle--;
            // 图片比圆圈多一个
            if (circle == 0) {
                circle = ul.children.length - 1;
            }
            // 三元表达式
            // circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })
    function circleChange() {
        // 排他思想 清除其余类名 设置当前
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 设置轮播图自动播放
    // 手动调用事件  arrow_r.click()
    var timer = setInterval(function () {
        arrow_r.click();
    }, 5000);

    // 节流阀  回调函数 callback

    // if (flag) {
    //     flag = false;
    //     代码块;
    //     flag = ture;
    // }

    // 防止轮播图按钮连续点击造成播放过快
    // 目的 当上一个函数动画执行完毕 在执行下一个函数动画

    var shops = document.querySelector('.shops');
    var second = document.querySelector('.second');
    shops.addEventListener('mouseenter', function () {
        second.style.display = 'block';
    })
    shops.addEventListener('mouseleave', function () {
        second.style.display = 'none';
    })



    toggleTool();
    // 节流阀
    var flag = true;
    // 电梯导航
    $(window).scroll(function () {
        toggleTool();
        // 4.当页面滚动到相应的电梯导航部分时 对应的电梯导航添加current类
        // 4.1  each遍历大盒子模块 获得索引号
        // 4.2  被卷去的头部大于等于内容内面每个模块的offset().top
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                // ele = $(this)
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    })
    function toggleTool() {
        // 1.今日推荐模块 电梯导航显示 
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn();
        }
        else {
            $(".fixedtool").fadeOut();
        }
    }
    // 2.点击电梯导航模块可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        flag = false;
        $(this).index();
        // 选出对应电梯导航的内容模块的offset().top;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });

        //3. 排他思想 设置current类
        $(this).addClass("current").siblings().removeClass("current");

    })
})