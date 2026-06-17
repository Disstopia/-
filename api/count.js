// api/count.js
// 현재 신청자 수를 Google Sheets에서 가져옴

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  try {
    const countRes = await fetch(SCRIPT_URL + '?action=count');
    const data = await countRes.json();
    return res.status(200).json({ count: data.count });
  } catch (e) {
    return res.status(500).json({ count: 0, error: e.message });
  }
}
