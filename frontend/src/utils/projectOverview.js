import plainText from "./plainText";

export default function projectOverview(html = "") {
  const document = new DOMParser().parseFromString(html, "text/html");
  const labels = [...document.querySelectorAll("h1, h2, h3, h4, p")];
  const overview = labels.find(
    (element) => element.textContent.trim().toLowerCase() === "overview",
  );

  if (!overview) {
    return plainText(document.querySelector("p")?.outerHTML || "");
  }

  const content = [];
  for (
    let element = overview.nextElementSibling;
    element;
    element = element.nextElementSibling
  ) {
    const boldLabel =
      element.matches("p") &&
      element.querySelector("strong")?.textContent.trim() ===
        element.textContent.trim();
    if (element.matches("h1, h2, h3, h4, h5, h6") || boldLabel) break;
    content.push(element.outerHTML);
  }

  return plainText(content.join(""));
}
