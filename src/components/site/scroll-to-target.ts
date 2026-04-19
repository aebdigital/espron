export function scrollToTargetId(targetId: string, offset = 112) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: "smooth",
  });
}
