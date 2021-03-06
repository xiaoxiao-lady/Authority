const Clipboard = require("clipboard");
if (!Clipboard) {
  throw new Error("你应该安装 clipboard 依赖");
}
export default {
  bind(el, binding) {
    if (binding.arg === "success") {
      el.handleSuccess = binding.value;
    } else if (binding.arg === "error") {
      el.handleError = binding.value;
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value;
        },
        action() {
          return binding.arg === "cut" ? "cut" : "copy";
        },
      });
      clipboard.on("success", (e) => {
        const callback = el.handleSuccess;
        callback && callback(e);
      });
      clipboard.on("error", (e) => {
        const callback = el.handleError;
        callback && callback(e);
      });
    }
  },
  update(el, binding) {
    if (binding.arg === "success") {
      el.clipboard.success = binding.value;
    } else if (binding.arg === "error") {
      el.clipboard.error = binding.value;
    } else {
      (el.clipboard.text = function() {
        return binding.value;
      }),
        (el.clipboard.action = function() {
          return binding.arg === "cut" ? "cut" : "copy";
        });
    }
  },
  unbind(el, binding) {
    if (binding.arg === "success") {
      delete el.handleError;
    } else if (binding.arg === "error") {
      delete el.handleError;
    } else {
      el.clipboard.destroy();
      delete el.clipboard;
    }
  },
};
