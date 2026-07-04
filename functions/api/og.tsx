import { ImageResponse, cache } from '@cf-wasm/og/workerd';
import { htmlToReact } from '@cf-wasm/og/html-to-react';

const escapeHtml = (value: string) => {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(/[&<>"']/g, (char) => replacements[char]);
};

export const onRequestGet = async (context) => {
  cache.setExecutionContext(context);

  const { searchParams } = new URL(context.request.url);
  const title = escapeHtml(searchParams.get('title') || 'EduVisualsPH');
  const desc = escapeHtml(searchParams.get('desc') || 'Interactive STEM Visualizers for Philippine Education');
  const titleSize = title.length > 40 ? '42px' : '52px';

  const html = `
    <div style="display:flex;flex-direction:column;width:100%;height:100%;background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%);padding:60px;font-family:system-ui,sans-serif">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:40px">
        <div style="width:56px;height:56px;border-radius:14px;background:#3b82f6;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:white">E</div>
        <div style="display:flex;flex-direction:column">
          <span style="color:#3b82f6;font-size:24px;font-weight:800;letter-spacing:2px">EduVisualsPH</span>
          <span style="color:#94a3b8;font-size:14px;font-weight:600;letter-spacing:1px">Philippine Educational Portal</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;flex:1;justify-content:center">
        <div style="font-size:${titleSize};font-weight:900;color:white;line-height:1.2;margin-bottom:20px;max-width:900px">${title}</div>
        <div style="font-size:22px;color:#94a3b8;line-height:1.5;max-width:800px">${desc}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;gap:8px">
          <span style="background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#60a5fa;padding:6px 16px;border-radius:999px;font-size:14px;font-weight:700">MATATAG</span>
          <span style="background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#60a5fa;padding:6px 16px;border-radius:999px;font-size:14px;font-weight:700">K-12</span>
          <span style="background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#60a5fa;padding:6px 16px;border-radius:999px;font-size:14px;font-weight:700">Interactive</span>
        </div>
        <span style="color:#475569;font-size:16px">eductools.ph</span>
      </div>
    </div>
  `;

  return ImageResponse.async(htmlToReact(html), {
    width: 1200,
    height: 630,
  });
};
