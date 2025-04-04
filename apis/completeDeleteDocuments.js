const BASE_URL = "https://kdt-api.fe.dev-cos.com";
const USERNAME = "trashcan";

export async function completeDeleteDocuments(documentId) {
  const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
    method: "DELETE",
    headers: {
      "x-username": USERNAME,
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
}
