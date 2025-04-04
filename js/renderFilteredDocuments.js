import { viewDocument } from "./document.js";
import { router } from "./router.js";

export const renderFilteredDocumentList = (data) => {
  const documentList = document.querySelector(".document-list");
  documentList.innerHTML = "";
  data.forEach((item) => {
    const documentItem = document.createElement("li");
    const anchorElement = document.createElement("a");

    documentItem.classList.add("document-item");
    anchorElement.innerText = item.title;
    anchorElement.href = item.id;

    anchorElement.addEventListener("click", (event) => {
      event.preventDefault();
      viewDocument(item.id);
      router(event);
    });

    documentItem.appendChild(anchorElement);
    documentList.appendChild(documentItem);
  });
};