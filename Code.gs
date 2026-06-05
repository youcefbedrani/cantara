/**
 * Google Apps Script — Cantara Orders
 * Paste this entire file into Extensions > Apps Script in your Google Sheet.
 *
 * Sheet columns:
 * A: الوقت  B: الاسم  C: الهاتف  D: الولاية  E: البلدية
 * F: السيارة  G: القطع  H: اللون  I: التوصيل  J: السعر  K: ملاحظات  L: الحالة
 */

const SHEET_ID = '1MMNAlfu5zRjVSUGDOju7J6t54lYgz7O5bHS429UUVxU';
const SHEET_NAME = 'Sheet1';

// Email notification — set your email here to get notified on new orders
const NOTIFY_EMAIL = '';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    const p = e.parameter || {};
    const timestamp = new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' });
    const name = (p.name || '').trim();
    const phone = (p.phone || '').trim();
    const wilaya = (p.wilaya || '').trim();
    const commune = (p.commune || '').trim();
    const car = (p.car || '').trim();
    const parts = (p.parts || '').trim();
    const color = (p.color || '').trim();
    const delivery = (p.delivery || '').trim();
    const total = (p.total || '0').trim();
    const notes = (p.notes || '').trim();
    const status = 'قيد الانتظار';

    if (!name || !phone || !wilaya) {
      return sendJson({ ok: false, error: 'يرجى ملء الحقول المطلوبة' });
    }

    sheet.appendRow([timestamp, name, phone, wilaya, commune, car, parts, color, delivery, total, notes, status]);

    // Send email notification if configured
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail({
          to: NOTIFY_EMAIL,
          subject: 'طلب جديد من ' + name,
          body: 'طلب جديد من كنتارا\n\n'
            + 'الاسم: ' + name + '\n'
            + 'الهاتف: ' + phone + '\n'
            + 'الولاية: ' + wilaya + '\n'
            + 'البلدية: ' + commune + '\n'
            + 'السيارة: ' + car + '\n'
            + 'القطع: ' + parts + '\n'
            + 'اللون: ' + color + '\n'
            + 'التوصيل: ' + delivery + '\n'
            + 'السعر: ' + total + '\n'
            + 'ملاحظات: ' + notes + '\n'
            + 'الحالة: ' + status,
        });
      } catch(mailErr) {}
    }

    return sendJson({ ok: true, message: 'تم إرسال الطلب بنجاح!' });
  } catch (err) {
    return sendJson({ ok: false, error: err.message });
  }
}

function doGet() {
  return sendJson({ ok: true, message: 'Cantara Orders is running' });
}

function setupSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const headers = ['Date', 'Nom', 'Téléphone', 'Wilaya', 'Commune', 'Voiture', 'Pièces', 'Couleur', 'Livraison', 'Prix', 'Notes', 'Statut'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#d4a04a').setFontColor('#1a1208');
  sheet.setFrozenRows(1);
  return '✅ تم إعداد الشيت بنجاح';
}

function sendJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
