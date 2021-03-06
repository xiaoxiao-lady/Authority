export default function throttle(fn, wait) {
  let old = 0;
  return function() {
    let now = new Date().valueOf();
    /**
     * @description:获取执行函数的 this 指向
     */
    let self = this;
    /**
     * @description:获取执行函数的 参数
     */
    let args = arguments;
    if (now - old > wait) {
      fn.apply(self, args);
      old = now;
    }
  };
}
