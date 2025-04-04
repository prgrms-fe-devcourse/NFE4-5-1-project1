import { getDocuments } from "../apis/getDocuments.js";
import { renderFilteredDocumentList } from "./renderFilteredDocuments.js";
import { viewPageList } from "./pageManager.js";

window.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-page-form");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.querySelector(".search-page-input");
    const inputValue = searchInput.value.replace(/\s+/g, "");

    searchDocuments(inputValue);
    searchInput.value = "";
  });
});

function searchAllDocuments(data, inputValue) {
  let filteredList = [];

  for (const document of data) {
    if (document.title.replace(/\s+/g, "").includes(inputValue)) {
      filteredList.push(document);
    }
    if (document.documents && document.documents.length > 0) {
      const childDocuments = searchAllDocuments(document.documents, inputValue);

      filteredList = filteredList.concat(childDocuments);
    }
  }
  return filteredList;
}

export async function searchDocuments(inputValue) {
  const data = await getDocuments();

  if (!inputValue) {
    viewPageList(data);
  }
  const filteredData = searchAllDocuments(data, inputValue);

  renderFilteredDocumentList(filteredData);
}
