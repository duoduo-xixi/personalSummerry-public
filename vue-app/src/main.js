import { createApp } from "vue";
import { watchEffect } from "vue";
import App from "./App.vue";
import "./style.css";
import { editing } from "./composables/useEditor";

const reveal = {
  mounted(el) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    el._revealIo = io;
  },
  unmounted(el) {
    if (el._revealIo) el._revealIo.disconnect();
  },
};

const app = createApp(App);
app.directive("reveal", reveal);

// 编辑模式指令：让文本节点可点击/就地编辑，并把新值写回站点
const editable = {
  mounted(el, binding) {
    el.__setter = binding.value;
    const apply = () => {
      const on = editing.value;
      el.contentEditable = on ? "true" : "false";
      el.classList.toggle("is-editing", on);
      el.setAttribute("data-editable", on ? "true" : "false");
    };
    apply();
    el.__edStop = watchEffect(apply);
    el.__edCommit = () => {
      if (!editing.value) return;
      const t = (el.innerText || "").replace(/\u00A0/g, " ").trim();
      if (el.__setter) el.__setter(t);
    };
    el.__edEnter = (e) => {
      if (e.key === "Enter" && !binding.modifiers.multiline) {
        e.preventDefault();
        el.blur();
      }
    };
    el.__edPaste = (e) => {
      e.preventDefault();
      const t = (e.clipboardData || window.clipboardData).getData("text/plain");
      document.execCommand("insertText", false, t);
    };
    el.addEventListener("blur", el.__edCommit);
    el.addEventListener("keydown", el.__edEnter);
    el.addEventListener("paste", el.__edPaste);
  },
  updated(el, binding) {
    el.__setter = binding.value;
  },
  unmounted(el) {
    if (el.__edStop) el.__edStop();
    el.removeEventListener("blur", el.__edCommit);
    el.removeEventListener("keydown", el.__edEnter);
    el.removeEventListener("paste", el.__edPaste);
  },
};
app.directive("editable", editable);

app.mount("#app");
