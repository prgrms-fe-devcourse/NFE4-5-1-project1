import { BASE_URL, USERNAME } from "./getDocuments.js";

export async function deleteDocument(documentId) {
  const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
    method: "DELETE",
    headers: {
      "x-username": USERNAME,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}
