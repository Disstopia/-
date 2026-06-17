// api/submit.js
// Vercel Serverless Function — 신청 데이터를 Google Sheets에 저장

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; // Vercel 환경변수로 설정
  const MAX_CAPACITY = 20;

  try {
    // 1. 현재 신청자 수 확인
    const countRes = await fetch(SCRIPT_URL + '?action=count');
    const countData = await countRes.json();

    if (countData.count >= MAX_CAPACITY) {
      return res.status(200).json({ success: false, full: true });
    }

    // 2. 데이터 저장
    const body = req.body;
    const saveRes = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submit',
        ...body
      })
    });

    const saveData = await saveRes.json();

    if (saveData.success) {
      return res.status(200).json({ success: true, count: saveData.count });
    } else {
      throw new Error(saveData.error || '저장 실패');
    }

  } catch (e) {
    console.error('Submit error:', e);
    return res.status(500).json({ success: false, error: e.message });
  }
}
