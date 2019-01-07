import Vue from 'vue'

//自动聚焦
Vue.directive('focus', {
    inserted: (el) => {
        if (el.tagName != 'INPUT') {
            let target = el.getElementsByTagName('input')
            target[0].focus()
        } else {
            el.focus()
        }
    }
})

//拖拽排序
Vue.directive('drag', {
    inserted: handleMove,
    componentUpdated: handleMove
})

function handleMove(el, binding) {
    let aLi = el.children;
    let len = aLi.length;

    for (var i = 0; i < len; i++) {
        drag(aLi[i]);
    }

    function drag(obj) {
        let targetMoveBtn = obj.getElementsByClassName('move-icon')[0];
        let target_cls = aLi[0].className;
        let base_cls = ' move-item ';
        let current_cls = ' move-item current ';
        targetMoveBtn.onmousedown = function (ev) {

            var oEvent = ev || event;
            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;
            var hasMove = false;

            let cloneDom = obj.cloneNode(true);
            let oBox = document.getElementById('box');

            $(cloneDom).addClass('clone');

            oBox.appendChild(cloneDom);
            cloneDom.style.top = obj.offsetTop + 'px'

            clearInterval(obj.timer);

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                cloneDom.style.left = oEvent.clientX - disX + 'px';
                cloneDom.style.top = oEvent.clientY - disY + 'px';
                hasMove = true

                for (let i = 0; i < len; i++) {
                    aLi[i].className = target_cls + base_cls;
                }


                var oNear = findMin(cloneDom);
                oNear && (oNear.className = target_cls+current_cls);
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;

                var oNear = findMin(cloneDom);

                if (oNear && hasMove) {
                    var tmp = cloneDom.getAttribute('index');
                    binding.value([tmp, oNear.getAttribute('index')])
                }
                obj.releaseCapture && obj.releaseCapture();

                for (let i = 0; i < len; i++) {
                    aLi[i].className = target_cls + base_cls;
                }

                let tmpNode = oBox.removeChild(cloneDom);
                tmpNode = null;
            };
            obj.setCapture && obj.setCapture();
            return false;
        };
    }

    function findMin(obj) {
        var iMin = 99999999;
        var iMinIndex = -1;

        for (var i = 0; i < len; i++) {
            if (obj.getAttribute('index') == aLi[i].getAttribute('index')) continue;

            if (collText(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);
                if (iMin > dis) {
                    iMin = dis;
                    iMinIndex = i;
                }
            }
        }
        if (iMinIndex == -1) {
            return null;
        }
        return aLi[iMinIndex];
    }

    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;
        return Math.sqrt(a * a + b * b);
    }

    function collText(obj1, obj2) {
        var l1 = obj1.offsetLeft;
        var t1 = obj1.offsetTop;
        var r1 = l1 + obj1.offsetWidth;
        var b1 = t1 + obj1.offsetHeight;

        var l2 = obj2.offsetLeft;
        var t2 = obj2.offsetTop;
        var r2 = obj2.offsetLeft + obj2.offsetWidth;
        var b2 = obj2.offseTop + obj2.offsetHeight;

        if (l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2) {
            return false;
        } else {
            return true;
        }
    }
}