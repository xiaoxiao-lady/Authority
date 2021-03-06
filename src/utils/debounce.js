export default function(fn, wait) {
  let timer;
  return function() {
    /**
     * @description: 获取执行函数 this 指向
     */

    let self = this;
    /**
     * @description: 获取执行函数 参数
     */
    let args = arguments;
    clearTimeout(timer);
    /**
     * @description: timer 用完置为 null ,防止内存泄漏
     */
    timer = null;
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, wait);
  };
}
