import { viewDocument } from "./document.js";

export function router(event) {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
}

async function handleLocation() {
  const pathName = window.location.pathname.slice(1);
  viewDocument(pathName);

  window.addEventListener("popstate", handleLocation);
}
