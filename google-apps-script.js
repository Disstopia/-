// =============================================
// 구글 스프레드시트 > 확장 프로그램 > Apps Script
// 아래 코드를 전체 붙여넣고 저장 후 배포하세요
// =============================================

const SHEET_NAME = '신청자목록';
const MAX_CAPACITY = 20;

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'count') {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    // 헤더 제외한 데이터 행 수
    const count = Math.max(0, sheet.getLastRow() - 1);
    return ContentService
      .createTextOutput(JSON.stringify({ count: count }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // 헤더 없으면 만들기
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['신청시각', '닉네임', '나이', '성별정체성', '전화번호', '관심상대', '입금자명']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#7B35C1').setFontColor('#ffffff');
    }

    // 정원 초과 확인
    const currentCount = Math.max(0, sheet.getLastRow() - 1);
    if (currentCount >= MAX_CAPACITY) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, full: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 데이터 저장
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('ko-KR'),
      data.nickname,
      data.age,
      data.gender,
      data.phone,
      data.interest,
      data.depositor
    ]);

    const newCount = sheet.getLastRow() - 1;

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, count: newCount }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
