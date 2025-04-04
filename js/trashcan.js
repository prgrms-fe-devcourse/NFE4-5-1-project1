import { getTrashDocuments } from "../apis/getTrashDocuments.js";
import { completeDeleteDocuments } from "../apis/completeDeleteDocuments.js";
import { addDocument } from "../apis/addDocument.js";
import { viewPageList } from "./pageManager.js";
import { updateDocument } from "../apis/updateDocument.js";
import { getTrashItem } from "../apis/trashCan.js";

document.addEventListener("DOMContentLoaded", () => {
  const trashcanButton = document.querySelector(".menubar-trashbin");
  const trashTitle = document.querySelector(".menubar-trashbin span");
  const trashList = document.querySelector(".trash-list");
  const dialog = document.querySelector(".trash-modal");

  trashcanButton.addEventListener("mouseenter", (e) => {
    trashTitle.style.borderBottom = "solid";
  });
  trashcanButton.addEventListener("mouseleave", (e) => {
    trashTitle.style.borderBottom = "none";
  });

  async function viewTrashList() {
    trashList.innerHTML = "";
    const trashData = await getTrashDocuments();
    trashData.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item.title;
      const restore = document.createElement("button");
      const completeDelete = document.createElement("button");
      restore.innerText = "복원";
      completeDelete.innerText = "삭제";
      const div = document.createElement("div");
      div.append(restore, completeDelete);
      li.append(div);
      trashList.appendChild(li);

      restore.addEventListener("click", async () => {
        const data = await addDocument();
        const contentData = await getTrashItem(item.id);
        
        await updateDocument(data.id, item.title, contentData.content);
        await viewPageList();
        await completeDeleteDocuments(item.id);
        viewTrashList();
        dialog.close();
      });

      completeDelete.addEventListener("click", async () => {
        await completeDeleteDocuments(item.id);
        viewTrashList();
      });
    });
  }

  trashcanButton.addEventListener("click", () => {
    dialog.showModal();
    viewTrashList();
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});
