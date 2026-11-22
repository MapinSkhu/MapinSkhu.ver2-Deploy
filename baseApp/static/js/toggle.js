function setVersionExpanded(button, expanded) {
  const line = button.nextElementSibling;
  const versionItems = line?.querySelector(".version-items");
  if (!line || !versionItems) return;

  button.classList.toggle("active_version", expanded);
  versionItems.inert = !expanded;
}

function resetExpandedContents() {
  document.querySelectorAll(".item-button").forEach((button) => {
    button.classList.remove("active_content");
    const content = button.nextElementSibling;
    if (content) content.style.maxHeight = "0px";
  });
}

function closeVersionContent(button) {
  const content = button?.nextElementSibling;
  if (!button || !content) return;

  button.classList.remove("active_content");
  // The body's permanent bottom border travels upward with its height.
  content.style.maxHeight = "0px";
}

function openVersionContent(button) {
  const content = button.nextElementSibling;
  if (!content) return;

  button.classList.add("active_content");
  content.style.maxHeight = `${content.scrollHeight}px`;
}

// 대단위 version toggle
function outside(element) {
  const shouldExpand = !element.classList.contains("active_version");

  resetExpandedContents();

  document.querySelectorAll(".version-button.active_version").forEach((button) => {
    setVersionExpanded(button, false);
  });

  if (shouldExpand) {
    setVersionExpanded(element, true);
  }
}

// 소단위 version toggle
function collapse(element) {
  const previous = document.querySelector(".item-button.active_content");

  if (previous === element) {
    closeVersionContent(element);
  } else {
    if (previous) closeVersionContent(previous);
    openVersionContent(element);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetExpandedContents();
  document.querySelectorAll('.version-button[onclick]').forEach((button) => {
    setVersionExpanded(button, false);
  });
});
window.addEventListener("resize", () => {
  const content = document.querySelector(".item-button.active_content + .content");
  if (content) {
    content.style.maxHeight = "none";
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
});
