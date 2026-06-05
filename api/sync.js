const GAS_URL = "https://script.google.com/macros/s/AKfycbzxzE0Xz4D5D-jOwLOofNowWeop8UxDh0fEH-ka2AB_JrXbhJCqPWPh1jvmQCOd2FNi/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method === "GET") {
      const r = await fetch(GAS_URL + "?action=get", {
        method: "GET",
        redirect: "follow",
      });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      const r = await fetch(GAS_URL, {
        method: "POST",
        body: body,
        headers: { "Content-Type": "text/plain" },
        redirect: "follow",
      });
      const data = await r.json();
      return res.status(200).json(data);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
