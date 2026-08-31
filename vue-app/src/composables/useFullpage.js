import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export function useFullpage(pageCount) {
  const current = ref(0);
  const lock = ref(false);
  let wheelAt = 0;
  let touchY = 0;
  let reduced = false;

  const trackStyle = computed(() => ({
    transform: `translate3d(0, ${-current.value * 100}vh, 0)`,
    transition: reduced
      ? "none"
      : "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
  }));

  function pageEl(i) {
    return document.querySelectorAll(".page")[i];
  }

  function goTo(index) {
    index = Math.max(0, Math.min(index, pageCount - 1));
    current.value = index;
  }

  const next = () => goTo(current.value + 1);
  const prev = () => goTo(current.value - 1);

  function onWheel(e) {
    if (lock.value) return;
    const dy = e.deltaY;
    if (Math.abs(dy) < 24) return;
    // 首页始终整页切换；其它页仅在内容确实超高（>60px）时才先页内滚动
    const page = pageEl(current.value);
    const canInnerScroll =
      current.value !== 0 &&
      page &&
      (getComputedStyle(page).overflowY === "auto" ||
        getComputedStyle(page).overflowY === "scroll") &&
      page.scrollHeight > page.clientHeight + 60;
    if (canInnerScroll) {
      const atStart = page.scrollTop <= 0;
      const atEnd = page.scrollTop + page.clientHeight >= page.scrollHeight - 1;
      if ((dy > 0 && !atEnd) || (dy < 0 && !atStart)) return;
    }
    e.preventDefault();
    const now = performance.now();
    if (now - wheelAt < 560) return;
    wheelAt = now;
    if (dy > 0) next();
    else prev();
  }

  function onTouchStart(e) {
    touchY = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (lock.value) return;
    const dy = touchY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 60) {
      if (dy > 0) next();
      else prev();
    }
  }
  function onKey(e) {
    if (lock.value) return;
    const k = e.key;
    if (k === "ArrowDown" || k === "PageDown") next();
    else if (k === "ArrowUp" || k === "PageUp") prev();
    else if (k === " ") {
      e.preventDefault();
      next();
    } else if (k === "Home") goTo(0);
    else if (k === "End") goTo(pageCount - 1);
  }

  onMounted(() => {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("keydown", onKey);
  });

  return { current, lock, trackStyle, goTo, next, prev };
}
