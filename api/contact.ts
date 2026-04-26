import nodemailer from 'nodemailer';

const toInt = (val: unknown) => {
  const n = typeof val === 'string' ? Number.parseInt(val, 10) : Number.NaN;
  return Number.isFinite(n) ? n : null;
};

const escapeHtml = (value: unknown) => {
  const s = String(value ?? '');
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const body = typeof req.body === 'string' ? (() => {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  })() : req.body;

  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }

  const website = String((body as any).website ?? '').trim();
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  const firstName = String((body as any).firstName ?? '').trim();
  const lastName = String((body as any).lastName ?? '').trim();
  const email = String((body as any).email ?? '').trim();
  const address = String((body as any).address ?? '').trim();
  const phone = String((body as any).phone ?? '').trim();
  const type = String((body as any).type ?? '').trim();
  const message = String((body as any).message ?? '').trim();

  if (!firstName || !lastName || !email || !address || !phone || !type) {
    res.status(400).json({ error: '请完整填写必填信息' });
    return;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL_TO;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.CONTACT_EMAIL_FROM || process.env.SMTP_FROM;
  const host = process.env.SMTP_HOST;
  const port = toInt(process.env.SMTP_PORT) ?? 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!toEmail || !fromEmail || !host || !user || !pass) {
    res.status(500).json({ error: '邮件服务未配置（缺少环境变量）' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `【联系醒动】${type} - ${firstName} ${lastName}`;
  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">联系表单提交</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">名</td><td style="padding: 6px 0;">${escapeHtml(firstName)}</td></tr>
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">姓</td><td style="padding: 6px 0;">${escapeHtml(lastName)}</td></tr>
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">邮箱</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">地址</td><td style="padding: 6px 0;">${escapeHtml(address)}</td></tr>
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">电话</td><td style="padding: 6px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 6px 0; width: 140px; color: #666;">需求类型</td><td style="padding: 6px 0;">${escapeHtml(type)}</td></tr>
      </table>
      ${message ? `<div style="margin-top: 16px;"><div style="color: #666; margin-bottom: 6px;">需求信息</div><div style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 10px;">${escapeHtml(message)}</div></div>` : ''}
    </div>
  `;

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html,
    });
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ error: '邮件发送失败，请稍后再试' });
  }
}

