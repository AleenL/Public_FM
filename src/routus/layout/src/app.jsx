import React from "react";

window.addEvent = (obj, type, fn) => {
    if (obj.attachEvent) {
        obj['e' + type + fn] = fn;
        obj[type + fn] = () => {
            obj['e' + type + fn](window.event);
        };

        obj.attachEvent('on' + type, obj[type + fn]);
    } else
        obj.addEventListener(type, fn, false);
};
window.removeEvent = (obj, type, fn) => {
    if (obj.detachEvent) {
        obj.detachEvent('on' + type, obj[type + fn]);
        obj[type + fn] = null;
    } else
        obj.removeEventListener(type, fn, false);
};

export class App extends React.Component {
    componentDidMount() {
        addEvent(document.body, "touchstart", this.touchStart);
        addEvent(document.body, "touchmove", this.touchMove);
        addEvent(window, "dblclick", e => e.preventDefault());
        document.body.parentNode.style.height = window.innerHeight
    }

    touchStart(e) {
        let targetEvent = e.changedTouches[0];
        this.startX = targetEvent.clientX;
        this.startY = targetEvent.clientY;
    }

    touchMove(e) {
        let targetEvent = event.changedTouches[0],
            curY = targetEvent.clientY,
            diffY = curY - this.startY;
        let target = e.target;
        do {
            if (target.className.indexOf("tloader") >= 0) {
                return;
            } else if (target.className.indexOf("en_scroll") >= 0) {
                let height = target.clientHeight || target.offsetHeight;
                if (diffY > 0 && target.scrollTop <= 0) {
                    e.preventDefault();
                } else if (diffY < 0 && target.scrollTop + height + 1 >= target.scrollHeight) {
                    e.preventDefault();
                }
                return;
            }
            target = target.parentNode;
        } while (target.tagName !== "BODY");
        e.preventDefault();
    }

    render() {
        return (
            <div data-approot>
                {DEBUG && <div data-appdebug>测试环境</div>}
                {this.props.children}
            </div>
        )
    }
}