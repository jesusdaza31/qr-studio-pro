/**
 * Generador de Códigos QR Personalizados
 * Soporta textos, imágenes/logos, marcos, descarga directa y compartir en móvil.
 */

(function () {
  'use strict';

  // State
  const state = {
    type: 'webpage',
    webTemplate: '1',
    qrText: 'https://google.com',
    name: '¡Escanea este código!',
    phrase: 'Apunta la cámara de tu celular aquí',
    frameStyle: 'card', // 'none', 'card', 'polaroid', 'badge', 'dark', 'pastel'
    dotStyle: 'rounded', // 'square', 'rounded', 'dots'
    eyeStyle: 'rounded', // 'square', 'rounded', 'circle'
    colorDark: '#1e293b',
    colorLight: '#ffffff',
    useGradient: false,
    colorGradient: '#4f46e5',
    colorCard: '#ffffff',
    colorText: '#0f172a',
    logoImage: null,
    logoSize: 20, // % of QR
    logoShape: 'circle', // 'circle', 'rounded', 'square'
    surprisePhotoData: '',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  // Preset SVGs for quick brand and utility icons (Crisp 200x200 vector graphics)
  const PRESET_ICONS = {
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#25D366"/><path fill="#ffffff" d="M35.2 29.8c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.8-.2-1.1.2s-1.3 1.5-1.5 1.8-.6.3-1.1.1c-.5-.2-2.2-.8-4.2-2.6-1.5-1.4-2.6-3.1-2.9-3.6s0-.8.2-1.1c.2-.2.5-.6.8-.9s.4-.5.5-.9c.2-.3.1-.7 0-.9-.2-.3-1.1-2.7-1.5-3.7-.4-1-.8-.8-1.1-.9h-1c-.3 0-1 .1-1.5.7-.5.5-2 1.9-2 4.7s2.1 5.5 2.4 5.9c.3.4 4 6.2 9.8 8.7 1.4.6 2.5.9 3.3 1.2 1.4.4 2.7.4 3.7.2 1.1-.2 3.4-1.4 3.9-2.7.5-1.3.5-2.5.3-2.7-.2-.2-.6-.3-1.1-.5z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><defs><radialGradient id="igG" cx="0.2" cy="1" r="1"><stop offset="0%" stop-color="#fdf497"/><stop offset="30%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="100%" stop-color="#285AEB"/></radialGradient></defs><rect width="48" height="48" rx="13" fill="url(#igG)"/><path fill="#ffffff" d="M24 14c3.3 0 3.6 0 4.9.1 1.2.1 1.8.2 2.3.4.6.2 1 .5 1.4.9.5.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.3-.2.6-.5 1-.9 1.4-.4.5-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.5-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.3.2-.6.5-1 .9-1.4.4-.5.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4 1.3-.1 1.6-.1 4.9-.1m0-2.5c-3.3 0-3.7 0-5 .1-1.3.1-2.2.3-2.9.6-.8.3-1.5.7-2.2 1.4-.7.7-1.1 1.4-1.4 2.2-.3.8-.5 1.7-.6 2.9-.1 1.3-.1 1.7-.1 5s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.3-1.7-.5-2.9-.6-1.3-.1-1.7-.1-5-.1zm0 8.3a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.3a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2zm8-10.9a1.4 1.4 0 1 0 0-2.9 1.4 1.4 0 0 0 0 2.9z"/></svg>`,
    tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#000000"/><path fill="#25F4EE" d="M30 18.2a7.8 7.8 0 0 0 4.8 1.7v-3.7a4.6 4.6 0 0 1-3.6-1.5A4.6 4.6 0 0 1 30 11h-3.4v17a4.4 4.4 0 0 1-4.4 4.4 4.4 4.4 0 0 1-4.4-4.4 4.4 4.4 0 0 1 4.4-4.4c.5 0 1 .1 1.5.3v-3.6a7.9 7.9 0 0 0-1.5-.2 7.8 7.8 0 0 0-7.8 7.8 7.8 7.8 0 0 0 7.8 7.8 7.8 7.8 0 0 0 7.8-7.8V18.2z"/><path fill="#FE2C55" d="M31.2 17a7.8 7.8 0 0 0 4.8 1.7v-2.3a7.8 7.8 0 0 1-4.8-1.7v2.3zm-3.4 11.2V11.2h-1.2v17a4.4 4.4 0 0 1-4.4 4.4 4.4 4.4 0 0 1-2.9-1.1 7.8 7.8 0 0 0 5.1 1.9 7.8 7.8 0 0 0 7.8-7.8v-4.4z"/><path fill="#ffffff" d="M30 17.2a7.8 7.8 0 0 0 4.8 1.7v-2.5a5.5 5.5 0 0 1-4.8-1.5V11h-3.4v17a4.4 4.4 0 0 1-4.4 4.4 4.4 4.4 0 0 1-4.4-4.4 4.4 4.4 0 0 1 4.4-4.4c.5 0 1 .1 1.5.3v-3.6a7.9 7.9 0 0 0-1.5-.2 7.8 7.8 0 0 0-7.8 7.8 7.8 7.8 0 0 0 7.8 7.8 7.8 7.8 0 0 0 7.8-7.8V17.2z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><rect width="48" height="48" rx="13" fill="#FF0000"/><path fill="#ffffff" d="M35.6 18.2a2.8 2.8 0 0 0-2-2C31.8 15.7 24 15.7 24 15.7s-7.8 0-9.6.5a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 12 24a29.4 29.4 0 0 0 .4 5.8 2.8 2.8 0 0 0 2 2c1.8.5 9.6.5 9.6.5s7.8 0 9.6-.5a2.8 2.8 0 0 0 2-2 29.4 29.4 0 0 0 .4-5.8 29.4 29.4 0 0 0-.4-5.8zm-14.1 9.4V20.4l6.5 3.6-6.5 3.6z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#1877F2"/><path fill="#ffffff" d="M26.7 37V24.5h4.2l.6-4.9h-4.8v-3.1c0-1.4.4-2.4 2.4-2.4h2.6V9.7c-.5-.1-2-.2-3.8-.2-3.8 0-6.4 2.3-6.4 6.5v3.6h-4.2v4.9h4.2V37h5.3z"/></svg>`,
    spotify: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#1DB954"/><path fill="#ffffff" d="M32.8 30.6a1.4 1.4 0 0 1-1.9.5c-5.2-3.2-11.8-3.9-19.5-2.2a1.4 1.4 0 1 1-.6-2.7c8.5-1.9 15.7-1.1 21.5 2.5.7.4.9 1.3.5 1.9zm2.4-5.3c-.6.9-1.8 1.2-2.7.6-6-3.7-15.1-4.8-22.2-2.6a1.7 1.7 0 1 1-1-3.2c8.1-2.5 18.2-1.2 25.2 3.1.9.5 1.2 1.6.7 2.1zm.2-5.6c-7.2-4.3-19-4.7-259-2.6a2 2 0 0 1-1.2-3.9c7.9-2.4 20.9-1.9 29.2 3a2 2 0 0 1-2.1 3.5z"/></svg>`,
    maps: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#EA4335"/><path fill="#ffffff" d="M24 11c-5.5 0-10 4.5-10 10 0 7.5 10 17 10 17s10-9.5 10-17c0-5.5-4.5-10-10-10zm0 13.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>`,
    paypal: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#003087"/><path fill="#0079C1" d="M30 18.5c-.3 2.8-2.3 5.5-5.5 5.5h-3.3l-1.8 11.5h-4.8l4.4-27.5h8.8c4 0 6.6 2.1 6.2 5.5l-4 5z"/><path fill="#00457C" d="M24.5 24h-3.3l-1.8 11.5h-4.8l2.2-13.8h4.8c3.2 0 5.2-2.7 5.5-5.5 1.5 1 2.2 2.7 1.9 4.6-.4 3.2-3.2 5.2-4.5 5.2z"/><path fill="#0079C1" d="M29.5 23.5c-.4 3.2-3.2 5.2-4.5 5.2h-3.3l-1.3 8.3h-4.5l1.8-11.5h4.8c3.2 0 5.2-2.7 5.5-5.5.9.8 1.6 2.1 1.5 3.5z"/></svg>`,
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#3B82F6"/><path fill="#ffffff" d="M24 13c-6.1 0-11.8 2.4-16 6.3l3 3.5c3.4-3.2 8-5.1 13-5.1s9.6 1.9 13 5.1l3-3.5C35.8 15.4 30.1 13 24 13zm0 7.5c-4.1 0-7.8 1.6-10.6 4.3l3 3.5c2-1.9 4.6-3 7.6-3s5.6 1.1 7.6 3l3-3.5c-2.8-2.7-6.5-4.3-10.6-4.3zm0 7.5c-2 0-3.9.8-5.3 2.1l5.3 6.2 5.3-6.2c-1.4-1.3-3.3-2.1-5.3-2.1z"/></svg>`,
    restaurant: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#D97706"/><path fill="#ffffff" d="M19 12v10h-2v14h-3V22h-2V12h2v7h1v-7h2v7h1v-7h1zm12 0v10c0 2.2-1.8 4-4 4v10h-3V12c4 0 7 2 7 0zm-2 2c-.6 1.1-2 2-3 2v6c1.1 0 2-.9 2-2v-6z"/></svg>`,
    cafe: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#854D0E"/><path fill="#ffffff" d="M14 18h18v7c0 4.4-3.6 8-8 8h-2c-4.4 0-8-3.6-8-8v-7zm18 3h2a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-2v-6zm-20 14h24v2H12v-2zm7-21c.5-1 1-1.5 1-2.5 0-1-.5-1.5-1-2.5h2c.5 1 1 1.5 1 2.5 0 1-.5 1.5-1 2.5h-2zm5 0c.5-1 1-1.5 1-2.5 0-1-.5-1.5-1-2.5h2c.5 1 1 1.5 1 2.5 0 1-.5 1.5-1 2.5h-2z"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#EF4444"/><path fill="#ffffff" d="M24 35.3l-2.2-2C14.1 26.2 9 21.6 9 15.8 9 11.2 12.6 7.6 17.2 7.6c2.6 0 5.1 1.2 6.8 3.1 1.7-1.9 4.2-3.1 6.8-3.1 4.6 0 8.2 3.6 8.2 8.2 0 5.8-5.1 10.4-12.8 17.5l-2.2 2z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#F59E0B"/><path fill="#ffffff" d="M24 10l4.3 8.7 9.7 1.4-7 6.8 1.6 9.6-8.6-4.5-8.6 4.5 1.6-9.6-7-6.8 9.7-1.4L24 10z"/></svg>`,
    gift: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#8B5CF6"/><path fill="#ffffff" d="M34 18h-2.5c.3-.5.5-1 .5-1.6 0-2.4-2-4.4-4.4-4.4-2.2 0-3.6 1.8-3.6 1.8s-1.4-1.8-3.6-1.8C18 12 16 14 16 16.4c0 .6.2 1.1.5 1.6H14c-1.1 0-2 .9-2 2v4h24v-4c0-1.1-.9-2-2-2zm-8-3.8c1.1 0 2 .9 2 2 0 .5-.4.8-.8.8h-3c0-.8.8-2.8 1.8-2.8zm-4 0c1 0 1.8 2 1.8 2.8h-3c-.4 0-.8-.3-.8-.8 0-1.1.9-2 2-2zM13 26v10c0 1.1.9 2 2 2h8V26h-10zm12 12h8c1.1 0 2-.9 2-2V26H25v12z"/></svg>`,
    cart: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><circle cx="24" cy="24" r="23" fill="#10B981"/><path fill="#ffffff" d="M15 15h3.6l3.4 12.3c.2.8.9 1.4 1.8 1.4h11.4c.8 0 1.6-.6 1.8-1.4l2.8-9.3H19.2M22 35a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm13 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/></svg>`
  };

  // DOM Elements
  const canvas = document.getElementById('qrCanvas');
  const ctx = canvas.getContext('2d');
  const toast = document.getElementById('toast');

  // Helper: Toast message
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Build payload string based on current active type inputs
  function calculatePayload() {
    switch (state.type) {
      case 'webpage': {
        const tpl = state.webTemplate || '1';
        const to = document.getElementById('webTo')?.value.trim() || '';
        const from = document.getElementById('webFrom')?.value.trim() || '';
        const title = document.getElementById('webTitle')?.value.trim() || '';
        const msg = document.getElementById('webMsg')?.value.trim() || '';
        const theme = document.getElementById('webTheme')?.value || 'gold';
        const img = document.getElementById('webImage')?.value.trim() || '';
        const wa = document.getElementById('webWa')?.value.trim() || '';
        const ig = document.getElementById('webIg')?.value.trim() || '';
        const customUrl = document.getElementById('webVercelUrl')?.value.trim() || '';

        const targetFile = `plantilla${tpl}.html`;
        let base = customUrl;
        if (!base) {
          const currentUrl = window.location.href.split('#')[0].split('?')[0];
          base = currentUrl.replace(/index\.html$/, '') + targetFile;
        } else {
          base = base.replace(/\/+$/, '');
          if (!base.endsWith('.html')) {
            base += `/${targetFile}`;
          }
        }

        const params = new URLSearchParams();
        if (to) params.set('to', to);
        if (from) params.set('from', from);
        if (title) params.set('t', title);
        if (msg) params.set('m', msg);
        if (theme && theme !== 'gold') params.set('theme', theme);
        if (img) params.set('img', img);
        if (tpl === '3') {
          if (wa) params.set('wa', wa);
          if (ig) params.set('ig', ig);
        }

        return `${base}?${params.toString()}`;
      }
      case 'url': {
        const val = document.getElementById('inputUrl')?.value.trim() || '';
        return val.startsWith('http://') || val.startsWith('https://') ? val : 'https://' + val;
      }
      case 'whatsapp': {
        const phone = (document.getElementById('inputWaPhone')?.value || '').replace(/[^0-9]/g, '');
        const msg = document.getElementById('inputWaMsg')?.value.trim() || '';
        return `https://wa.me/${phone}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
      }
      case 'text': {
        return document.getElementById('inputText')?.value || '';
      }
      case 'wifi': {
        const ssid = document.getElementById('inputWifiSsid')?.value || '';
        const pass = document.getElementById('inputWifiPass')?.value || '';
        const type = document.getElementById('inputWifiType')?.value || 'WPA';
        const hidden = document.getElementById('inputWifiHidden')?.checked ? 'true' : 'false';
        return `WIFI:T:${type};S:${ssid};P:${pass};H:${hidden};;`;
      }
      case 'phone': {
        const phone = (document.getElementById('inputPhone')?.value || '').replace(/\s+/g, '');
        return `tel:${phone}`;
      }
      case 'email': {
        const email = document.getElementById('inputEmail')?.value.trim() || '';
        const subject = document.getElementById('inputEmailSubject')?.value.trim() || '';
        const body = document.getElementById('inputEmailBody')?.value.trim() || '';
        let mailto = `mailto:${email}`;
        const params = [];
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        if (params.length) mailto += '?' + params.join('&');
        return mailto;
      }
      case 'surprise': {
        const to = document.getElementById('inputSurpriseTo')?.value.trim() || 'Para ti';
        const title = document.getElementById('inputSurpriseTitle')?.value.trim() || '¡Un Mensaje Especial!';
        const msg = document.getElementById('inputSurpriseMsg')?.value.trim() || 'Gracias por ser tan especial.';
        const from = document.getElementById('inputSurpriseFrom')?.value.trim() || 'Alguien que te quiere';
        const theme = document.getElementById('inputSurpriseTheme')?.value || 'love';
        const format = document.getElementById('inputSurpriseFormat')?.value || 'text';
        const customUrl = document.getElementById('inputSurpriseWebUrl')?.value.trim() || '';

        if (format === 'web') {
          // Web page mode: short URL pointing to ver.html
          let base = customUrl;
          if (!base) {
            const currentUrl = window.location.href.split('#')[0].split('?')[0];
            base = currentUrl.replace(/index\.html$/, '') + 'ver.html';
          }
          const params = new URLSearchParams({ to, t: title, m: msg, from, theme });
          return `${base}?${params.toString()}`;
        } else {
          // Direct text mode: ultra lightweight (~100 chars), huge scannable dots, elegant format without emojis
          return `MENSAJE ESPECIAL\nPara: ${to}\nDe: ${from}\n────────────────────────\n${msg}\n────────────────────────\nCon aprecio y consideración`;
        }
      }
      default:
        return 'https://google.com';
    }
  }

  // Draw Rounded Rectangle Helper
  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Wrap text cleanly in canvas
  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    // Render up to maxLines
    const renderLines = lines.slice(0, maxLines);
    if (lines.length > maxLines) {
      renderLines[maxLines - 1] += '...';
    }

    const startY = y - ((renderLines.length - 1) * lineHeight) / 2;
    for (let i = 0; i < renderLines.length; i++) {
      ctx.fillText(renderLines[i], x, startY + (i * lineHeight));
    }
    return renderLines.length * lineHeight;
  }

  // Check if (r, c) is part of finder pattern (top-left, top-right, bottom-left 7x7 markers)
  function isFinderPattern(r, c, moduleCount) {
    if (r < 7 && c < 7) return true; // Top-left
    if (r < 7 && c >= moduleCount - 7) return true; // Top-right
    if (r >= moduleCount - 7 && c < 7) return true; // Bottom-left
    return false;
  }

  // Draw custom finder patterns (the three large eye corners)
  function drawFinderPattern(ctx, x, y, size, style, darkColor, lightColor) {
    const mod = size / 7;
    ctx.save();

    if (style === 'square') {
      // Outer 7x7
      ctx.fillStyle = darkColor;
      ctx.fillRect(x, y, size, size);
      // Inner 5x5 light
      ctx.fillStyle = lightColor;
      ctx.fillRect(x + mod, y + mod, size - 2 * mod, size - 2 * mod);
      // Center 3x3 dark
      ctx.fillStyle = darkColor;
      ctx.fillRect(x + 2 * mod, y + 2 * mod, size - 4 * mod, size - 4 * mod);
    } else if (style === 'rounded') {
      const rOuter = mod * 2.2;
      const rInner = mod * 1.5;
      const rCenter = mod * 1.0;

      // Outer 7x7 rounded
      ctx.fillStyle = darkColor;
      drawRoundedRect(ctx, x, y, size, size, rOuter);
      ctx.fill();

      // Inner 5x5 light rounded
      ctx.fillStyle = lightColor;
      drawRoundedRect(ctx, x + mod, y + mod, size - 2 * mod, size - 2 * mod, rInner);
      ctx.fill();

      // Center 3x3 dark rounded
      ctx.fillStyle = darkColor;
      drawRoundedRect(ctx, x + 2 * mod, y + 2 * mod, size - 4 * mod, size - 4 * mod, rCenter);
      ctx.fill();
    } else if (style === 'circle') {
      const center = size / 2;
      // Outer circle
      ctx.fillStyle = darkColor;
      ctx.beginPath();
      ctx.arc(x + center, y + center, size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle light
      ctx.fillStyle = lightColor;
      ctx.beginPath();
      ctx.arc(x + center, y + center, size / 2 - mod, 0, Math.PI * 2);
      ctx.fill();

      // Center circle dark
      ctx.fillStyle = darkColor;
      ctx.beginPath();
      ctx.arc(x + center, y + center, size / 2 - 2 * mod, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Main Render Function
  function renderQR() {
    const payload = calculatePayload() || 'https://google.com';
    state.qrText = payload;

    // Smart error correction density optimization for ultra-easy camera scanning
    let targetLevel = 'M';
    const densityChoice = document.getElementById('qrDensitySelect')?.value || 'auto';

    if (densityChoice === 'auto') {
      if (state.logoImage) {
        targetLevel = state.logoSize > 24 ? 'Q' : 'M';
      } else {
        targetLevel = 'M'; // Level M (15%): Puntos grandes, escaneo instantáneo
      }
    } else {
      targetLevel = densityChoice;
    }

    let qr;
    const levelsToTry = [targetLevel, 'M', 'L'];
    for (let i = 0; i < levelsToTry.length; i++) {
      try {
        qr = new window.QRCodeGenerator(0, levelsToTry[i]);
        qr.addData(payload);
        qr.make();
        break;
      } catch (e) {
        if (i === levelsToTry.length - 1) {
          console.error('QR creation error:', e);
          return;
        }
      }
    }

    const moduleCount = qr.getModuleCount();

    // Canvas size configuration
    const QR_PIXELS = 840; // Internal resolution of the QR alone
    const modSize = QR_PIXELS / moduleCount;

    // Determine card dimensions depending on frameStyle
    let canvasW = 1000;
    let canvasH = 1000;
    let qrOffsetX = 80;
    let qrOffsetY = 80;
    const hasName = Boolean(state.name && state.name.trim());
    const hasPhrase = Boolean(state.phrase && state.phrase.trim());

    if (state.frameStyle === 'none') {
      canvasW = QR_PIXELS + 80;
      canvasH = QR_PIXELS + 80;
      qrOffsetX = 40;
      qrOffsetY = 40;
    } else if (state.frameStyle === 'polaroid') {
      canvasW = 1020;
      canvasH = 1340; // Taller at the bottom
      qrOffsetX = 90;
      qrOffsetY = 90;
    } else if (state.frameStyle === 'badge') {
      canvasW = 1020;
      canvasH = 1240;
      qrOffsetX = 90;
      qrOffsetY = 210; // Extra room for header banner
    } else {
      // 'card', 'dark', 'pastel'
      const topSpace = hasName ? 150 : 80;
      const bottomSpace = hasPhrase ? 150 : 80;
      canvasW = 1020;
      canvasH = QR_PIXELS + topSpace + bottomSpace;
      qrOffsetX = (canvasW - QR_PIXELS) / 2;
      qrOffsetY = topSpace;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;

    // Background fill & Card Styles
    ctx.clearRect(0, 0, canvasW, canvasH);

    if (state.frameStyle === 'none') {
      // Transparent or simple background
      ctx.fillStyle = state.colorLight;
      ctx.fillRect(0, 0, canvasW, canvasH);
    } else {
      // Outer background / Canvas container
      let cardBg = state.colorCard;
      let textColor = state.colorText;

      if (state.frameStyle === 'dark') {
        cardBg = '#0f172a';
        textColor = '#f8fafc';
      } else if (state.frameStyle === 'pastel') {
        const grad = ctx.createLinearGradient(0, 0, canvasW, canvasH);
        grad.addColorStop(0, '#fdf4ff');
        grad.addColorStop(0.5, '#f5f3ff');
        grad.addColorStop(1, '#e0e7ff');
        cardBg = grad;
      } else if (state.frameStyle === 'restaurant') {
        cardBg = '#fffdf7';
        textColor = '#78350f';
      } else if (state.frameStyle === 'polaroid') {
        cardBg = '#ffffff';
      }

      // Draw Card Base
      ctx.save();
      ctx.fillStyle = cardBg;
      drawRoundedRect(ctx, 16, 16, canvasW - 32, canvasH - 32, 28);
      ctx.fill();

      // Card subtle border
      ctx.strokeStyle = state.frameStyle === 'dark' ? '#334155' : (state.frameStyle === 'restaurant' ? '#d97706' : 'rgba(0, 0, 0, 0.08)');
      ctx.lineWidth = state.frameStyle === 'restaurant' ? 5 : 4;
      ctx.stroke();

      // Double inner border for restaurant / menu card
      if (state.frameStyle === 'restaurant') {
        ctx.strokeStyle = '#fde68a';
        ctx.lineWidth = 2;
        drawRoundedRect(ctx, 26, 26, canvasW - 52, canvasH - 52, 20);
        ctx.stroke();
      }

      // Badge style header bar
      if (state.frameStyle === 'badge') {
        ctx.fillStyle = state.colorGradient || '#4f46e5';
        ctx.beginPath();
        ctx.moveTo(16, 44);
        ctx.quadraticCurveTo(16, 16, 44, 16);
        ctx.lineTo(canvasW - 44, 16);
        ctx.quadraticCurveTo(canvasW - 16, 16, canvasW - 16, 44);
        ctx.lineTo(canvasW - 16, 170);
        ctx.lineTo(16, 170);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      // QR Code container backdrop (gives contrast if card is dark or pastel)
      ctx.save();
      ctx.fillStyle = state.colorLight;
      drawRoundedRect(ctx, qrOffsetX - 24, qrOffsetY - 24, QR_PIXELS + 48, QR_PIXELS + 48, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Draw Texts (Name and Phrase)
      ctx.save();
      ctx.textAlign = 'center';

      // 1. Title / Name
      if (hasName) {
        let nameY = (qrOffsetY / 2) + 12;
        let titleColor = textColor;

        if (state.frameStyle === 'badge') {
          nameY = 100;
          titleColor = '#ffffff'; // White inside top banner
        }

        ctx.font = `bold 44px ${state.fontFamily}`;
        ctx.fillStyle = titleColor;
        wrapText(ctx, state.name, canvasW / 2, nameY, canvasW - 100, 52, 2);
      }

      // 2. Subtitle / Phrase / Message
      if (hasPhrase) {
        let phraseY;
        if (state.frameStyle === 'polaroid') {
          phraseY = qrOffsetY + QR_PIXELS + 130;
        } else {
          phraseY = qrOffsetY + QR_PIXELS + ((canvasH - (qrOffsetY + QR_PIXELS)) / 2);
        }

        ctx.font = `600 32px ${state.fontFamily}`;
        ctx.fillStyle = state.frameStyle === 'polaroid' ? '#334155' : textColor;
        wrapText(ctx, state.phrase, canvasW / 2, phraseY, canvasW - 120, 42, 2);
      }
      ctx.restore();
    }

    // QR Code Dots Fill Setup (Solid or Gradient)
    let fillStyle = state.colorDark;
    if (state.useGradient) {
      const grad = ctx.createLinearGradient(qrOffsetX, qrOffsetY, qrOffsetX + QR_PIXELS, qrOffsetY + QR_PIXELS);
      grad.addColorStop(0, state.colorDark);
      grad.addColorStop(1, state.colorGradient);
      fillStyle = grad;
    }

    // Draw QR Modules (Dots)
    ctx.save();
    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        // Skip finder patterns, we draw them cleanly separately
        if (isFinderPattern(r, c, moduleCount)) continue;

        if (qr.isDark(r, c)) {
          const mx = qrOffsetX + c * modSize;
          const my = qrOffsetY + r * modSize;

          ctx.fillStyle = fillStyle;

          if (state.dotStyle === 'square') {
            ctx.fillRect(mx, my, modSize + 0.3, modSize + 0.3);
          } else if (state.dotStyle === 'dots') {
            ctx.beginPath();
            ctx.arc(mx + modSize / 2, my + modSize / 2, (modSize / 2) * 0.88, 0, Math.PI * 2);
            ctx.fill();
          } else if (state.dotStyle === 'rounded') {
            drawRoundedRect(ctx, mx, my, modSize, modSize, modSize * 0.35);
            ctx.fill();
          }
        }
      }
    }

    // Draw the 3 Finder Pattern Eyes (Top-Left, Top-Right, Bottom-Left)
    const eyePxSize = 7 * modSize;
    drawFinderPattern(ctx, qrOffsetX, qrOffsetY, eyePxSize, state.eyeStyle, state.colorDark, state.colorLight);
    drawFinderPattern(ctx, qrOffsetX + (moduleCount - 7) * modSize, qrOffsetY, eyePxSize, state.eyeStyle, state.colorDark, state.colorLight);
    drawFinderPattern(ctx, qrOffsetX, qrOffsetY + (moduleCount - 7) * modSize, eyePxSize, state.eyeStyle, state.colorDark, state.colorLight);

    ctx.restore();

    // Draw Central Logo / Image if provided
    if (state.logoImage) {
      drawCenterLogo(ctx, qrOffsetX, qrOffsetY, QR_PIXELS);
    }
  }

  // Draw Logo in center with safety badge margin
  function drawCenterLogo(ctx, qrX, qrY, qrSize) {
    const img = state.logoImage;
    if (!img) return;

    const imgWidth = img.naturalWidth || img.width || 0;
    const imgHeight = img.naturalHeight || img.height || 0;
    if (imgWidth === 0 || imgHeight === 0) return;

    const logoPercent = Math.min(Math.max(state.logoSize, 12), 30) / 100;
    const logoBoxSize = qrSize * logoPercent;
    const padding = 12; // White margin separating logo from QR modules
    const totalBox = logoBoxSize + padding * 2;
    const cx = qrX + qrSize / 2;
    const cy = qrY + qrSize / 2;
    const boxX = cx - totalBox / 2;
    const boxY = cy - totalBox / 2;

    ctx.save();

    // 1. Draw badge background (white so it cleanly covers QR dots)
    if (state.logoShape !== 'none') {
      ctx.fillStyle = state.colorLight;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 4;

      if (state.logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(cx, cy, totalBox / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (state.logoShape === 'rounded') {
        // iOS squircle smooth radius
        drawRoundedRect(ctx, boxX, boxY, totalBox, totalBox, totalBox * 0.28);
        ctx.fill();
      } else {
        drawRoundedRect(ctx, boxX, boxY, totalBox, totalBox, 12);
        ctx.fill();
      }

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Badge border line
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 3;
      if (state.logoShape === 'circle') {
        ctx.beginPath();
        ctx.arc(cx, cy, totalBox / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (state.logoShape === 'rounded') {
        drawRoundedRect(ctx, boxX, boxY, totalBox, totalBox, totalBox * 0.28);
        ctx.stroke();
      } else {
        drawRoundedRect(ctx, boxX, boxY, totalBox, totalBox, 12);
        ctx.stroke();
      }
    } else {
      // Shape === 'none': Clear backing cleanly without borders
      ctx.fillStyle = state.colorLight;
      ctx.beginPath();
      ctx.arc(cx, cy, totalBox / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Clip for logo image
    ctx.beginPath();
    const imgX = cx - logoBoxSize / 2;
    const imgY = cy - logoBoxSize / 2;

    if (state.logoShape === 'circle') {
      ctx.arc(cx, cy, logoBoxSize / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (state.logoShape === 'rounded') {
      drawRoundedRect(ctx, imgX, imgY, logoBoxSize, logoBoxSize, logoBoxSize * 0.24);
      ctx.clip();
    } else if (state.logoShape === 'square') {
      drawRoundedRect(ctx, imgX, imgY, logoBoxSize, logoBoxSize, 8);
      ctx.clip();
    }

    // 3. Draw image with aspect ratio preservation
    const aspect = imgWidth / imgHeight;
    let drawW = logoBoxSize;
    let drawH = logoBoxSize;
    let offX = imgX;
    let offY = imgY;

    if (aspect > 1) {
      drawH = logoBoxSize / aspect;
      offY += (logoBoxSize - drawH) / 2;
    } else if (aspect < 1) {
      drawW = logoBoxSize * aspect;
      offX += (logoBoxSize - drawW) / 2;
    }

    try {
      ctx.drawImage(img, offX, offY, drawW, drawH);
    } catch (err) {
      console.warn('No se pudo dibujar el logo central:', err);
    }

    ctx.restore();
  }

  // Load an image element from SVG string using permanent Data URI (no revocation bugs)
  function loadSvgAsImage(svgString, callback) {
    const encoded = encodeURIComponent(svgString);
    const dataUri = `data:image/svg+xml;charset=utf-8,${encoded}`;
    const img = new Image();
    img.onload = () => {
      callback(img, dataUri);
    };
    img.src = dataUri;
  }

  // -------------------------------------------------------------
  // STANDALONE 100% OFFLINE PDF GENERATOR
  // Conforme a la especificación estándar PDF 1.4 (ISO 32000-1)
  // Sin librerías externas ni descargas pesadas
  // -------------------------------------------------------------
  async function generatePDFFromCanvas(sourceCanvas, filename = 'codigo_qr.pdf') {
    return new Promise((resolve, reject) => {
      // 1. Crear canvas temporal con fondo blanco para evitar problemas de transparencia con JPEG
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sourceCanvas.width;
      tempCanvas.height = sourceCanvas.height;
      const tCtx = tempCanvas.getContext('2d');
      tCtx.fillStyle = '#ffffff';
      tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tCtx.drawImage(sourceCanvas, 0, 0);

      tempCanvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('No se pudo convertir el canvas a imagen'));
          return;
        }

        try {
          const arrayBuffer = await blob.arrayBuffer();
          const jpegBytes = new Uint8Array(arrayBuffer);
          const imgWidth = tempCanvas.width;
          const imgHeight = tempCanvas.height;

          // Dimensiones de hoja estándar A4 en puntos tipográficos (72 puntos = 1 pulgada)
          const pageWidth = 595.28;
          const pageHeight = 841.89;
          const margin = 45;
          const maxW = pageWidth - margin * 2;
          const maxH = pageHeight - margin * 2;

          // Escalar proporcionalmente para centrar el QR con márgenes amplios
          const scale = Math.min(maxW / imgWidth, maxH / imgHeight);
          const drawW = imgWidth * scale;
          const drawH = imgHeight * scale;
          const x = (pageWidth - drawW) / 2;
          const y = (pageHeight - drawH) / 2;

          const encoder = new TextEncoder();

          // Cabecera PDF
          const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";

          // Objeto 1: Catálogo principal
          const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";

          // Objeto 2: Árbol de páginas
          const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";

          // Objeto 3: Definición de la página A4 con recurso de imagen
          const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`;

          // Objeto 4: Flujo de instrucciones gráficas (dibujar la imagen centrada)
          const streamContent = `q\n${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im1 Do\nQ\n`;
          const obj4 = `4 0 obj\n<< /Length ${encoder.encode(streamContent).length} >>\nstream\n${streamContent}endstream\nendobj\n`;

          // Objeto 5: Imagen incrustada mediante filtro DCTDecode (JPEG nativo de alta resolución)
          const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
          const obj5Footer = "\nendstream\nendobj\n";

          // Cálculo exacto de desplazamientos de bytes (XREF offsets)
          const partHeader = encoder.encode(header);
          const part1 = encoder.encode(obj1);
          const part2 = encoder.encode(obj2);
          const part3 = encoder.encode(obj3);
          const part4 = encoder.encode(obj4);
          const part5Header = encoder.encode(obj5Header);
          const part5Footer = encoder.encode(obj5Footer);

          let offset = partHeader.length;
          const offset1 = offset;
          offset += part1.length;
          const offset2 = offset;
          offset += part2.length;
          const offset3 = offset;
          offset += part3.length;
          const offset4 = offset;
          offset += part4.length;
          const offset5 = offset;
          offset += part5Header.length + jpegBytes.length + part5Footer.length;

          const xrefOffset = offset;

          function pad10(n) {
            return n.toString().padStart(10, '0');
          }

          // Tabla de referencias cruzadas (XREF)
          const xref = `xref\n0 6\n0000000000 65535 f \n${pad10(offset1)} 00000 n \n${pad10(offset2)} 00000 n \n${pad10(offset3)} 00000 n \n${pad10(offset4)} 00000 n \n${pad10(offset5)} 00000 n \n`;
          const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

          const partXref = encoder.encode(xref);
          const partTrailer = encoder.encode(trailer);

          // Ensamblaje del documento binario completo
          const pdfBlob = new Blob([
            partHeader,
            part1,
            part2,
            part3,
            part4,
            part5Header,
            jpegBytes,
            part5Footer,
            partXref,
            partTrailer
          ], { type: 'application/pdf' });

          // Disparar descarga en el navegador
          const downloadUrl = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.download = filename;
          a.href = downloadUrl;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

          resolve(true);
        } catch (err) {
          reject(err);
        }
      }, 'image/jpeg', 0.98);
    });
  }

  // Bind Events & UI
  function initEvents() {
    // Current date in footer
    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
      try {
        const today = new Date();
        const formatted = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        if (formatted) footerDate.textContent = formatted;
      } catch (e) {}
    }

    // Mobile navigation tab switcher
    const appMain = document.getElementById('appMain');
    const btnTabEdit = document.getElementById('btnTabEdit');
    const btnTabPreview = document.getElementById('btnTabPreview');
    const btnGoToPreview = document.getElementById('btnGoToPreview');
    const btnBackToEdit = document.getElementById('btnBackToEdit');

    function switchMobileTab(tab) {
      if (appMain) {
        appMain.setAttribute('data-tab', tab);
      }
      if (btnTabEdit && btnTabPreview) {
        if (tab === 'preview') {
          btnTabEdit.classList.remove('active');
          btnTabPreview.classList.add('active');
          renderQR(); // Ensure fresh render when entering preview
        } else {
          btnTabPreview.classList.remove('active');
          btnTabEdit.classList.add('active');
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btnTabEdit) btnTabEdit.addEventListener('click', () => switchMobileTab('edit'));
    if (btnTabPreview) btnTabPreview.addEventListener('click', () => switchMobileTab('preview'));
    if (btnGoToPreview) btnGoToPreview.addEventListener('click', () => switchMobileTab('preview'));
    if (btnBackToEdit) btnBackToEdit.addEventListener('click', () => switchMobileTab('edit'));

    // Type selector buttons
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        typeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.type = btn.dataset.type;

        // Toggle corresponding form sections
        document.querySelectorAll('.type-content').forEach(el => el.style.display = 'none');
        const activeForm = document.getElementById(`form-${state.type}`);
        if (activeForm) activeForm.style.display = 'block';

        renderQR();
      });
    });

    // Webpage Templates Selector (3 interactive templates)
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
      card.addEventListener('click', () => {
        templateCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        state.webTemplate = card.dataset.template || '1';
        const t3Fields = document.getElementById('template3Fields');
        if (t3Fields) {
          t3Fields.style.display = state.webTemplate === '3' ? 'block' : 'none';
        }
        renderQR();
      });
    });

    // Live Simulator Modal & Preview Handlers
    const previewModal = document.getElementById('previewModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const btnPreviewModal = document.getElementById('btnPreviewModal');
    const btnModalClose = document.getElementById('btnModalClose');
    const btnModalOpenTab = document.getElementById('btnModalOpenTab');
    const previewIframe = document.getElementById('previewIframe');
    const btnPreviewWebpage = document.getElementById('btnPreviewWebpage');

    function openSimulator() {
      if (!previewModal || !previewIframe) return;
      const url = calculatePayload();
      previewIframe.src = url;
      previewModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeSimulator() {
      if (!previewModal || !previewIframe) return;
      previewModal.style.display = 'none';
      previewIframe.src = 'about:blank';
      document.body.style.overflow = '';
    }

    if (btnPreviewModal) btnPreviewModal.addEventListener('click', openSimulator);
    if (btnModalClose) btnModalClose.addEventListener('click', closeSimulator);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeSimulator);
    if (btnModalOpenTab) {
      btnModalOpenTab.addEventListener('click', () => {
        window.open(calculatePayload(), '_blank');
      });
    }
    if (btnPreviewWebpage) {
      btnPreviewWebpage.addEventListener('click', () => {
        window.open(calculatePayload(), '_blank');
      });
    }

    // Live update on input fields
    const liveInputs = [
      'inputUrl', 'inputWaPhone', 'inputWaMsg', 'inputText',
      'inputWifiSsid', 'inputWifiPass', 'inputWifiType', 'inputWifiHidden',
      'inputPhone', 'inputEmail', 'inputEmailSubject', 'inputEmailBody',
      'inputName', 'inputPhrase', 'fontSelect',
      'webTo', 'webFrom', 'webTitle', 'webMsg', 'webTheme', 'webImage', 'webWa', 'webIg', 'webVercelUrl',
      'inputSurpriseTo', 'inputSurpriseTitle', 'inputSurpriseMsg', 'inputSurpriseFrom', 'inputSurpriseTheme'
    ];

    liveInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          if (id === 'inputName') state.name = el.value;
          if (id === 'inputPhrase') state.phrase = el.value;
          if (id === 'fontSelect') state.fontFamily = el.value;
          renderQR();
        });
      }
    });

    // Surprise card photo & interactive test
    const surprisePhoto = document.getElementById('inputSurprisePhoto');
    if (surprisePhoto) {
      surprisePhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            state.surprisePhotoData = ev.target.result;
            showToast('Foto agregada a la carta virtual');
            renderQR();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const btnPreviewSurprise = document.getElementById('btnPreviewSurprise');
    if (btnPreviewSurprise) {
      btnPreviewSurprise.addEventListener('click', () => {
        const to = document.getElementById('inputSurpriseTo')?.value.trim() || 'Para ti';
        const title = document.getElementById('inputSurpriseTitle')?.value.trim() || 'Un Mensaje Especial';
        const msg = document.getElementById('inputSurpriseMsg')?.value.trim() || 'Gracias por ser tan especial.';
        const from = document.getElementById('inputSurpriseFrom')?.value.trim() || 'Jesús Orozco';
        const theme = document.getElementById('inputSurpriseTheme')?.value || 'love';

        const params = new URLSearchParams({ to, t: title, m: msg, from, theme });
        window.open(`ver.html#${params.toString()}`, '_blank');
      });
    }

    // Surprise format switcher (Direct text vs Web page)
    const surpriseFormat = document.getElementById('inputSurpriseFormat');
    const surpriseWebUrlGroup = document.getElementById('surpriseWebUrlGroup');
    const inputSurpriseWebUrl = document.getElementById('inputSurpriseWebUrl');

    if (surpriseFormat && surpriseWebUrlGroup) {
      surpriseFormat.addEventListener('change', () => {
        surpriseWebUrlGroup.style.display = surpriseFormat.value === 'web' ? 'block' : 'none';
        renderQR();
      });
    }

    if (inputSurpriseWebUrl) {
      inputSurpriseWebUrl.addEventListener('input', () => {
        renderQR();
      });
    }

    // QR Scannability / Density Selector
    const qrDensitySelect = document.getElementById('qrDensitySelect');
    if (qrDensitySelect) {
      qrDensitySelect.addEventListener('change', () => {
        renderQR();
      });
    }

    // Accordions
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const accordion = header.closest('.accordion');
        accordion.classList.toggle('open');
      });
    });

    // Colors
    const colorDark = document.getElementById('colorDark');
    const colorLight = document.getElementById('colorLight');
    const colorGradient = document.getElementById('colorGradient');
    const useGradient = document.getElementById('useGradient');
    const colorCard = document.getElementById('colorCard');

    if (colorDark) {
      colorDark.addEventListener('input', (e) => {
        state.colorDark = e.target.value;
        const hex = document.getElementById('colorDarkHex');
        if (hex) hex.textContent = e.target.value;
        renderQR();
      });
    }
    if (colorLight) {
      colorLight.addEventListener('input', (e) => {
        state.colorLight = e.target.value;
        const hex = document.getElementById('colorLightHex');
        if (hex) hex.textContent = e.target.value;
        renderQR();
      });
    }
    if (colorGradient) {
      colorGradient.addEventListener('input', (e) => {
        state.colorGradient = e.target.value;
        const hex = document.getElementById('colorGradientHex');
        if (hex) hex.textContent = e.target.value;
        renderQR();
      });
    }
    if (useGradient) {
      useGradient.addEventListener('change', (e) => {
        state.useGradient = e.target.checked;
        const group = document.getElementById('gradientColorGroup');
        if (group) group.style.display = state.useGradient ? 'block' : 'none';
        renderQR();
      });
    }
    if (colorCard) {
      colorCard.addEventListener('input', (e) => {
        state.colorCard = e.target.value;
        const hex = document.getElementById('colorCardHex');
        if (hex) hex.textContent = e.target.value;
        renderQR();
      });
    }

    // Frame presets
    document.querySelectorAll('.frame-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.frameStyle = btn.dataset.frame;
        renderQR();
      });
    });

    // Dot styles
    const dotSelect = document.getElementById('dotStyleSelect');
    if (dotSelect) {
      dotSelect.addEventListener('change', (e) => {
        state.dotStyle = e.target.value;
        renderQR();
      });
    }

    // Eye styles
    const eyeSelect = document.getElementById('eyeStyleSelect');
    if (eyeSelect) {
      eyeSelect.addEventListener('change', (e) => {
        state.eyeStyle = e.target.value;
        renderQR();
      });
    }

    // Logo Upload
    const logoFile = document.getElementById('logoFileInput');
    const logoPreviewContainer = document.getElementById('logoPreviewContainer');
    const logoPreviewThumb = document.getElementById('logoPreviewThumb');
    const removeLogoBtn = document.getElementById('btnRemoveLogo');
    const dropZone = document.getElementById('imageUploadZone');

    function applyLogoFromDataUrl(dataUrl) {
      const img = new Image();
      img.onload = () => {
        state.logoImage = img;
        if (logoPreviewThumb) logoPreviewThumb.src = dataUrl;
        if (logoPreviewContainer) logoPreviewContainer.style.display = 'flex';
        renderQR();
        showToast('¡Imagen agregada al centro del QR!');
      };
      img.src = dataUrl;
    }

    if (logoFile) {
      logoFile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          applyLogoFromDataUrl(event.target.result);
          logoFile.value = ''; // Reset so selecting the same file triggers change again
        };
        reader.readAsDataURL(file);
      });
    }

    // Drag and drop support on the upload zone
    if (dropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.style.borderColor = 'var(--primary)';
          dropZone.style.background = '#faf5ff';
        }, false);
      });
      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.style.borderColor = '#cbd5e1';
          dropZone.style.background = 'white';
        }, false);
      });
      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const file = dt && dt.files && dt.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            applyLogoFromDataUrl(ev.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (removeLogoBtn) {
      removeLogoBtn.addEventListener('click', () => {
        state.logoImage = null;
        if (logoFile) logoFile.value = '';
        if (logoPreviewThumb) logoPreviewThumb.src = '';
        if (logoPreviewContainer) logoPreviewContainer.style.display = 'none';
        renderQR();
        showToast('Imagen del logo eliminada');
      });
    }

    // Logo Size & Shape
    const logoSizeRange = document.getElementById('logoSizeRange');
    const logoSizeVal = document.getElementById('logoSizeVal');
    if (logoSizeRange) {
      logoSizeRange.addEventListener('input', (e) => {
        state.logoSize = parseInt(e.target.value, 10);
        if (logoSizeVal) logoSizeVal.textContent = state.logoSize + '%';
        renderQR();
      });
    }

    const logoShapeSelect = document.getElementById('logoShapeSelect');
    if (logoShapeSelect) {
      logoShapeSelect.addEventListener('change', (e) => {
        state.logoShape = e.target.value;
        renderQR();
      });
    }

    // Preset Quick Logos
    document.querySelectorAll('.preset-logo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const iconKey = btn.dataset.icon;
        const svg = PRESET_ICONS[iconKey];
        if (svg) {
          loadSvgAsImage(svg, (img, dataUri) => {
            state.logoImage = img;
            if (logoPreviewThumb) {
              logoPreviewThumb.src = dataUri;
            }
            if (logoPreviewContainer) logoPreviewContainer.style.display = 'flex';
            renderQR();
            showToast(`Icono de ${btn.textContent.trim()} aplicado`);
          });
        }
      });
    });

    // -------------------------------------------------------------
    // EXPORT & DOWNLOAD ACTIONS (MOBILE & DESKTOP OPTIMIZED)
    // -------------------------------------------------------------
    const btnDownload = document.getElementById('btnDownload');
    const btnDownloadPdf = document.getElementById('btnDownloadPdf');
    const btnShare = document.getElementById('btnShare');
    const btnCopy = document.getElementById('btnCopy');

    // Download PNG HD
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        try {
          const filename = `QR_${(state.name || 'codigo').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
          const dataUrl = canvas.toDataURL('image/png', 1.0);
          
          const a = document.createElement('a');
          a.download = filename;
          a.href = dataUrl;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          showToast('¡Descargando imagen HD (PNG)!');
        } catch (err) {
          console.error('Error downloading:', err);
          showToast('Error al descargar la imagen');
        }
      });
    }

    // Download PDF (Ready to print)
    if (btnDownloadPdf) {
      btnDownloadPdf.addEventListener('click', async () => {
        try {
          showToast('Generando documento PDF...');
          const filename = `QR_${(state.name || 'codigo').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
          await generatePDFFromCanvas(canvas, filename);
          showToast('¡PDF descargado con éxito!');
        } catch (err) {
          console.error('Error generating PDF:', err);
          showToast('Error al generar el archivo PDF');
        }
      });
    }

    // Share API (Direct to WhatsApp, Gallery, etc. on mobile)
    if (btnShare) {
      btnShare.addEventListener('click', async () => {
        if (!navigator.share) {
          // Fallback if not supported
          showToast('Compartir no soportado en este navegador. Usa Descargar.');
          return;
        }

        try {
          canvas.toBlob(async (blob) => {
            if (!blob) {
              showToast('Error al procesar la imagen');
              return;
            }

            const filename = `QR_${(state.name || 'codigo').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
            const file = new File([blob], filename, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: state.name || 'Mi Código QR',
                text: state.phrase || 'Escanea este código QR',
                files: [file]
              });
              showToast('¡Compartido con éxito!');
            } else {
              // Share without files if file sharing isn't permitted
              await navigator.share({
                title: state.name || 'Mi Código QR',
                text: state.phrase || 'Escanea este código QR',
                url: state.qrText
              });
            }
          }, 'image/png');
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.warn('Error sharing:', err);
            showToast('No se pudo compartir.');
          }
        }
      });
    }

    // Copy to clipboard
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        try {
          canvas.toBlob(async (blob) => {
            if (!blob) return;
            if (navigator.clipboard && window.ClipboardItem) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]);
              showToast('¡Imagen copiada al portapapeles!');
            } else {
              showToast('Copia al portapapeles no soportada en este navegador');
            }
          }, 'image/png');
        } catch (err) {
          console.warn('Clipboard write failed:', err);
          showToast('No se pudo copiar al portapapeles');
        }
      });
    }
  }

  // Run on start
  window.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderQR();
  });

})();
