// api/arz.js
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const suffix = req.url.replace(/^\/api\/arz/, '');
    const target = 'https://arzapi.arshia2.ir' + suffix;

    const upstream = await fetch(target, { headers: { accept: 'application/json' } });
    const body = await upstream.text();

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(502).json({ error: 'Bad gateway', detail: err.message });
  }
};
