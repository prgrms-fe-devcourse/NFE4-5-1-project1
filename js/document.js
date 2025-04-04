import { getDocument } from "../apis/getDocuments.js";
import { updateDocument } from "../apis/updateDocument.js";
import { getSubdocumentLinks } from "./getSubDocumentLinks.js";
import { viewPageList } from "./pageManager.js";

export async function viewDocument(id) {
  const main = document.querySelector(".document");
  const data = await getDocument(id);
  main.innerHTML = "";
  const title = createEditable("title", data);
  const content = createEditable("content", data);

  main.append(title);
  main.append(content);

  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") title.blur();
    if (e.target.textContent === 0 && e.key === "Backspace") {
      e.preventDefault();
    }
  });

  title.addEventListener("blur", async () => {
    await updateDocument(id, title.textContent);
    viewPageList();
  });

  content.addEventListener(
    "input",
    debounce(() => {
      updateDocument(id, null, content.textContent);
    }, 1000)
  );
  if (data.documents.length > 0) {
    getSubdocumentLinks(data.documents);
  }
}

function createEditable(cls, data) {
  const div = document.createElement("div");
  div.contentEditable = true;
  if (data.title !== "새 페이지") {
    div.textContent = data[cls];
  }
  div.classList.add(`document-${cls}`);
  return div;
}

function debounce(callback, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}
