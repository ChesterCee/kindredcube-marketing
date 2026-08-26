(function () {
  const localApi =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3001"
      : "https://api.kindredcube.com";
  const API_URL = (window.KINDREDCUBE_API_URL || localApi).replace(/\/$/, "");

  function currentSlug() {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (path === "terms") return "terms";
    if (path === "community-guidelines") return "community-guidelines";
    return "privacy";
  }

  function appendTextBlock(container, line) {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (/^[-*]\s+/.test(trimmed)) {
      let list = container.lastElementChild;
      if (!list || list.tagName !== "UL") {
        list = document.createElement("ul");
        container.appendChild(list);
      }
      const item = document.createElement("li");
      item.textContent = trimmed.replace(/^[-*]\s+/, "");
      list.appendChild(item);
      return;
    }

    const numberedTopic = /^\d+\.\s+\S/.test(trimmed);
    const element = document.createElement(
      trimmed.startsWith("### ") ? "h3" : trimmed.startsWith("## ") || numberedTopic ? "h2" : "p",
    );
    element.textContent = trimmed.replace(/^###\s+/, "").replace(/^##\s+/, "");
    container.appendChild(element);
  }

  function renderPage(page) {
    if (!page || !page.title || !page.body) return;
    const article = document.querySelector("[data-legal-document]");
    if (!article) return;

    const currentStaticText = article.textContent || "";
    const remoteBody = String(page.body || "").trim();
    const remoteLooksComplete = remoteBody.length >= 1500;
    const remoteIsLongerThanStatic = remoteBody.length >= Math.min(1500, Math.floor(currentStaticText.length * 0.65));
    if (!remoteLooksComplete || !remoteIsLongerThanStatic) return;

    article.textContent = "";

    const title = document.createElement("h1");
    title.textContent = page.title;
    article.appendChild(title);
    document.title = `${page.title} | KindredCube`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && page.summary) {
      metaDescription.setAttribute("content", page.summary.slice(0, 155));
    }

    const dates = document.createElement("p");
    dates.className = "policy-dates";
    const updated = page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : new Date().toLocaleDateString();
    dates.textContent = `Last Updated: ${updated}`;
    article.appendChild(dates);

    if (page.summary) {
      const summary = document.createElement("p");
      summary.className = "policy-summary";
      summary.textContent = page.summary;
      article.appendChild(summary);
    }

    page.body.split(/\r?\n/).forEach((line) => appendTextBlock(article, line));

    const images = Array.isArray(page.imageUrls) ? page.imageUrls : [];
    images.forEach((url) => {
      if (!/^https?:\/\//i.test(url)) return;
      const figure = document.createElement("figure");
      figure.className = "policy-image";
      const image = document.createElement("img");
      image.src = url;
      image.alt = "";
      image.loading = "lazy";
      figure.appendChild(image);
      article.appendChild(figure);
    });

  }

  fetch(`${API_URL}/v1/legal-content/${encodeURIComponent(currentSlug())}`, { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : null))
    .then((result) => renderPage(result && result.page))
    .catch(() => undefined);
})();
