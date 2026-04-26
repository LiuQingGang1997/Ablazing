import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'contact-api-dev',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res, next) => {
          if (req.method !== 'POST') {
            if (req.method === 'OPTIONS') {
              res.statusCode = 204
              res.end()
              return
            }
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Method Not Allowed' }))
            return
          }

          let raw = ''
          req.on('data', (chunk) => {
            raw += chunk
          })
          req.on('end', async () => {
            try {
              const body = raw ? JSON.parse(raw) : {}
              const website = String(body?.website ?? '').trim()
              if (website) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: true }))
                return
              }

              const firstName = String(body?.firstName ?? '').trim()
              const lastName = String(body?.lastName ?? '').trim()
              const email = String(body?.email ?? '').trim()
              const address = String(body?.address ?? '').trim()
              const phone = String(body?.phone ?? '').trim()
              const type = String(body?.type ?? '').trim()
              const message = String(body?.message ?? '').trim()

              if (!firstName || !lastName || !email || !address || !phone || !type) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: '请完整填写必填信息' }))
                return
              }

              const toEmail = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL_TO
              const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.CONTACT_EMAIL_FROM || process.env.SMTP_FROM
              const host = process.env.SMTP_HOST
              const port = Number.parseInt(process.env.SMTP_PORT || '587', 10)
              const user = process.env.SMTP_USER
              const pass = process.env.SMTP_PASS

              if (!toEmail || !fromEmail || !host || !user || !pass) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: '邮件服务未配置（缺少环境变量）' }))
                return
              }

              const escapeHtml = (value: unknown) => {
                const s = String(value ?? '')
                return s
                  .replaceAll('&', '&amp;')
                  .replaceAll('<', '&lt;')
                  .replaceAll('>', '&gt;')
                  .replaceAll('"', '&quot;')
                  .replaceAll("'", '&#39;')
              }

              const transporter = nodemailer.createTransport({
                host,
                port,
                secure: port === 465,
                auth: { user, pass },
              })

              const subject = `【联系醒动】${type} - ${firstName} ${lastName}`
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
              `

              await transporter.sendMail({
                from: fromEmail,
                to: toEmail,
                replyTo: email,
                subject,
                html,
              })

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            } catch {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: '邮件发送失败，请稍后再试' }))
            }
          })
          req.on('error', () => next())
        })
      },
    },
  ],
  server: {
    port: 3000,
    host: true
  }
})
