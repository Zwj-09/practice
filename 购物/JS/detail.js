// 京东放大镜
// 1.鼠标经过小盒子 黄色的遮挡层盒子和大盒子显示 离开就隐藏
// 2.黄色的遮挡层跟随鼠标移动
// 3.移动黄色遮挡层 大图片盒子随着移动

window.addEventListener('load', function () {
    // 放大镜
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = document.querySelector('.bigImg');

    // 1.鼠标经过小盒子 黄色的遮挡层盒子和大盒子显示 离开就隐藏
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    // 2.黄色的遮挡层跟随鼠标移动
    preview_img.addEventListener('mousemove', function (e) {
        // 不能把鼠标的位置直接给黄色盒子 需要的是鼠标在盒子内的位置
        // 黄色盒子有定位会影响

        // 1.鼠标在盒子内的位置
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        // 对黄色盒子进行判断 只能在大盒子内部移动
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;

        // 遮挡层最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;

        if (maskX <= 0) {
            maskX = 0;
        }
        // (preview_img.offsetWidth - mask.offsetWidth)
        // 外部大盒子宽度 - 遮挡层盒子宽度
        else if (maskX > maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        }
        // (preview_img.offsetWidth - mask.offsetWidth)
        // 外部大盒子宽度 - 遮挡层盒子宽度
        else if (maskY > maskMax) {
            maskY = maskMax;
        }
        // 设置鼠标在遮挡层盒子中间 赋值
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 3.移动黄色遮挡层 大图片盒子随着移动 按照比例移动
        // 遮挡层移动距离 / 遮挡层最大移动距离 = 大图片移动距离 / 大图片最大移动距离
        // 大图片移动距离 = 大图片最大移动距离 * 遮挡层移动距离 / 遮挡层最大移动距离

        // 大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;

        // 大图片的移动距离 X
        var bigX = maskX * bigMax / maskMax;

        // 大图片的移动距离 Y
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})