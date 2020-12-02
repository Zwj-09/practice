window.addEventListener('load', function () {
    var slide = document.querySelectorAll('.slide');
    var pre = document.querySelector('#pre');
    var next = document.querySelector('#next');

    const nextSlide = function () {
        const current = document.querySelector('.current');
        // 判断点击之后的兄弟元素是否有 current类
        if (current.nextElementSibling) {
            current.nextElementSibling.classList.add('current');
        }
        // 最后一张 没有兄弟了 直接添加给第一个盒子
        else {
            slide[0].classList.add('current');
        }
        // 删除current类
        setTimeout(() => { current.classList.remove('current') });
    }
    const preSlide = function () {
        const current = document.querySelector('.current');
        // 判断点击之后的兄弟元素是否有 current类
        if (current.previousElementSibling) {
            current.previousElementSibling.classList.add('current');
        }
        // 最后一张 没有兄弟了 直接添加给第一个盒子
        else {
            slide[slide.length - 1].classList.add('current');
        }
        // 删除current类
        setTimeout(() => { current.classList.remove('current') });
    }
    next.addEventListener('click', function () {
        nextSlide();
    })
    pre.addEventListener('click', function () {
        preSlide();
    })
})
