/**
 *
 * @param time created_at 时间
 * @param need 需要分隔符
 * @returns
 */
export const handleTime = (time, need = false) => {
  if (typeof time != "string") {
    return null;
  }
  if (!time) {
    return null;
  }
  let date = new Date(time);
  const isDate = date instanceof Date;
  if (isDate) {
    let useTime = time.split(" ")[0],
      useTime1 = time.split(" ")[1],
      dateArr = useTime.split("-"),
      date1Arr = useTime1.split(":"),
      str = "";
    // str = dateArr[0] + "年" + dateArr[1] + "月" + dateArr[2] + "日";
    str = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2];
    if (need) {
      str +=
        (typeof need == "string" ? need : " ") +
        date1Arr[0] +
        "时" +
        date1Arr[1] +
        "分";
      // + date1Arr[2] + '秒'
    }
    return str;
  }

  return null;
};

export const getTime = () => {
  //获取时间 年月日
  const now = new Date(); // 创建一个 Date 对象，表示当前时间
  const year = now.getFullYear(); // 获取当前年份
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 获取当前月份（注意：月份从 0 开始计数，所以需要加 1）
  const day = now.getDate().toString().padStart(2, "0"); // 获取当前日份
  return `${year}-${month}-${day}`;
};

/**
 *  函数防抖
 * @param {number} delay 默认1000毫秒
 * @param {Function} fn 执行函数
 */

export const debounce = (fn, delay = 1000) => {
  let timer = undefined;
  return function (...argu) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(null, ...argu);
    }, delay);
  };
};

/**
 *  函数节流
 * @param {number} delay 默认100毫秒
 * @param {Function} func 执行函数
 */

export const throttle = (func, delay) => {
  var timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};

/**
 *  @description 对象克隆
 *  @param {Object | Array} obj 需要克隆的对象或者数组
 */

export function deepClone(obj) {
  let result = null;
  const toString = Object.prototype.toString;
  if (typeof obj == "object") {
    if (toString.call(obj) == "[object Object]") {
      result = {};
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];
          result[key] = deepClone(element);
        }
      }
      return result;
    } else if (toString.call(obj) == "[object Array]") {
      result = [];
      for (const value of obj) {
        result.push(deepClone(value));
      }
      return result;
    }
  } else {
    return obj;
  }
}

/**
 *  @description 深度遍历 处理 字段为children 处理每一项的格式
 * @param {*} origin
 * @param {*} func 处理函数
 */
export function deepEach(origin, func) {
  return origin.map((item) => {
    const clone = {
      ...item,
    };
    const handlerValue = func(clone);
    if (clone.children && clone.children.length) {
      handlerValue.children = deepEach(clone.children, func);
    }
    return handlerValue;
  });
}

/**
 * @Description 全屏
 * @author xx
 * @date 2024-06-15 13:47:32
 */

export const fullScreen = (function () {
  function getPropertyName(names, target) {
    return names.find((name) => name in target);
  }

  const enterFullScreenName = getPropertyName(
    [
      "requestFullscreen",
      "mozRequestFullScreen",
      "webkitRequestFullscreen",
      "msRequestFullscreen",
    ],
    document.documentElement
  );

  const exitFullScreenName = getPropertyName(
    [
      "exitFullScreen",
      "mozCancelFullScreen",
      "webkitExitFullscreen",
      "msExitFullscreen",
    ],
    document
  );

  const fullElename = getPropertyName(
    [
      "fullscreenElement",
      "mozFullScreenElement",
      "msFullScreenElement",
      "wenkitFullscreenElement",
    ],
    document
  );

  // 进入全屏
  function enter(ele) {
    enterFullScreenName && ele[enterFullScreenName]();
  }

  // 退出全屏
  function exit() {
    exitFullScreenName && document[exitFullScreenName]();
  }

  // 判断当前那个元素全屏
  function fullEle() {
    return document[fullElename] || null;
  }

  // 判断当前是否处于全屏状态
  function isFull() {
    return !!fullEle();
  }

  // 全屏切换
  function toggle(ele) {
    isFull() ? exit() : enter(ele);
  }

  // document.addEventListener("fullscreenchange", function (e) {
  //   if (document.fullscreenElement) {
  //   } else {
  //   }
  // });

  return {
    enter,
    exit,
    toggle,
    isFull,
  };
})();

() => {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};
