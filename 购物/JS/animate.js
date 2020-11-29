function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长写在定时器里面
        var step = (target - obj.offsetLeft) / 2;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写在定时器结束里面
            // if (callback) {
            //     callback();
            // }
            // 当有参数callback传入时 才使用callback()函数
            callback && callback();
        }
        // 修改步长值
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 30)
}