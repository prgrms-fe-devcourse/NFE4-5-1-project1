import { BASE_URL, USERNAME } from "./getDocuments.js";

export async function addDocument(parent = null) {
  const response = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: {
      "x-username": USERNAME,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "새 페이지",
      parent,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}
