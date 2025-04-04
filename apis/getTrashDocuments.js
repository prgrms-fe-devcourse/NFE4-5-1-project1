const BASE_URL = "https://kdt-api.fe.dev-cos.com";
const USERNAME = "trashcan";

export async function getTrashDocuments() {
  const response = await fetch(`${BASE_URL}/documents`, {
    method: "GET",
    headers: {
      "x-username": USERNAME,
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok");
  }
  return await response.json();
}
