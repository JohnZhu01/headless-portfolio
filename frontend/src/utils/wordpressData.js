const requests = new Map();
const cacheTime = 30000;

export function readWordPressCache(path) {
  const entry = requests.get(path);
  return entry && Date.now() - entry.created < cacheTime
    ? entry.data
    : undefined;
}

export function loadWordPress(path) {
  const existing = requests.get(path);
  if (existing && Date.now() - existing.created < cacheTime)
    return existing.promise;
  const entry = { created: Date.now(), data: undefined };
  entry.promise = (async () => {
    try {
      const apiBase = import.meta.env.VITE_WP_API_URL?.replace(/\/$/, "");
      if (!apiBase) throw new Error("The WordPress API URL is missing.");
      let data = [];
      let page = 1;
      let totalPages = 1;
      const signal = AbortSignal.timeout(15000);
      do {
        const url = new URL(apiBase + "/" + path);
        url.searchParams.set("per_page", "100");
        url.searchParams.set("page", String(page));
        const response = await fetch(url, { signal });
        if (!response.ok)
          throw new Error("WordPress returned " + response.status + ".");
        const batch = await response.json();
        if (!Array.isArray(batch))
          throw new Error("WordPress returned an unexpected response.");
        data = data.concat(batch);
        totalPages = Number(response.headers.get("X-WP-TotalPages")) || 1;
        page += 1;
      } while (page <= totalPages);
      entry.data = data;
      return data;
    } catch (error) {
      if (requests.get(path) === entry) requests.delete(path);
      throw error;
    }
  })();
  requests.set(path, entry);
  return entry.promise;
}
