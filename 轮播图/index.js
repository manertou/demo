var oImg = $('img');
var len = oImg.length;
var curDisplay = 0; //默认中间展示的图片索引
var timer;

init();

function init() {
    initialCarousel();
    bindEvent();
}

function initialCarousel() {
    var mLen = Math.floor(len / 2); 
    var rNum, lNum; //中间图片左右两边的索引

    for (var i = 0; i < mLen; i ++) {
        lNum = curDisplay - i - 1;
        oImg.eq(lNum).css({
            transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'
        });

        rNum = curDisplay + i + 1;
        if (rNum > oImg.length - 1) { //如果运动到最后一张 循环运动
            rNum -= oImg.length;
        }
        oImg.eq(rNum).css({
            transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)'
        });
        oImg.removeClass('active');
    }

    oImg.eq(curDisplay).css({
        transform: 'translateZ(350px)'
    }).addClass('active'); //标记当前显示的图片
}

function bindEvent() {
    oImg.on('click', function () {
        if (!$(this).hasClass('active')) { //判断点击的是否为第一张显示的图片
            curDisplay = $(this).index(); //改变当前图片索引
            initialCarousel();
        }
    }).hover(function () { //鼠标覆盖，取消自动播放
        clearInterval(timer);
    }, function () { //鼠标移走，继续自动播放
        play();
    })
}

//自动播放
function play() {
    timer = setInterval(function () {
        if (curDisplay == len -1) {
            curDisplay = 0;
        } else {
            curDisplay ++;
        }
        initialCarousel();
    }, 2000);
}