import { viewDocument } from "./document.js";
import { router } from "./router.js";

export function getSubdocumentLinks(documents) {
  const main = document.querySelector(".document");
  const ulElement = document.createElement("ul");
  ulElement.classList.add("sub-document-link-list");

  documents.forEach((doc) => {
    const liElement = document.createElement("li");
    liElement.classList.add("sub-document-link-item");

    const anchorElement = document.createElement("a");
    anchorElement.href = doc.id;
    anchorElement.textContent = doc.title;

    anchorElement.addEventListener("click", (e) => {
      e.preventDefault();
      viewDocument(doc.id);
      router(e);
    });

    liElement.append(anchorElement);
    ulElement.append(liElement);
  });

  main.append(ulElement);
}
