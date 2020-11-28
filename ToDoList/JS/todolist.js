// 1.localStorage 存储 关闭和刷新不会导致数据丢失
// 2.数组存储信息 
// var arr = [
//     {
//         title: p,   存储p内信息
//         done:false  判断是否完成
//     },
//     {
//         title: p,   存储p内信息
//         done:false  判断是否完成
//     }
// ]

// 3.本地存储只能存储字符串  需要 JSON.stringify(arr);
// 4.获取本地数据 字符串转换为原始类型 JSON.parse(arr);
$(function () {
    // 1.按下回车 数据存储到localStorage
    // 1.1 keyCode判断按下回车(13)
    // 先读取本地存储数据 放到定义的数组里面 再把新数据追加到数组
    // 最后存储数据
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            var local = getDate();
            console.log(local);
            // 数据追加给数组
            local.push(
                {
                    title: $(this).val(),
                    done: false
                }
            );
            saveDate(local);
        }
    });
    // 读取本地数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    };
    // 保存为本地存储
    function saveDate(date) {
        localStorage.setItem("todolist", date);
    };
})