window.document.addEventListener("DOMContentLoaded", () => {
  const memoTitle = document.querySelector(".memo-title");
  const memoField = document.getElementById("memo-text-box");

  const savedMemo = localStorage.getItem("memoText");
  if (savedMemo) {
    memoField.value = savedMemo;
  }

  memoTitle.addEventListener("click", () => {
    memoField.focus();
  });

  memoField.addEventListener("input", (event) => {
    const text = event.target.value;
    localStorage.setItem("memoText", text);
  });
});
