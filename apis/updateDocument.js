import { BASE_URL, USERNAME } from "./getDocuments.js";

export async function updateDocument(id, title = null, content = null) {
  const obj = {};
  if (title) obj.title = title;
  if (content) obj.content = content;

  const response = await fetch(`${BASE_URL}/documents/${id}`, {
    method: "PUT",
    headers: {
      "x-username": USERNAME,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}
