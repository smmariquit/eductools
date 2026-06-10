import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Eductools';
  const desc = searchParams.get('desc') || 'Interactive STEM Visualizers for Philippine Education';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          {/* Logo */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: 'white',
            }}
          >
            E
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#3b82f6', fontSize: '24px', fontWeight: 800, letterSpacing: '2px' }}>
              EDUCTOOLS
            </span>
            <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, letterSpacing: '1px' }}>
              Philippine Educational Portal
            </span>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? '42px' : '52px',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '20px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {desc}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {['MATATAG', 'K-12', 'Interactive'].map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: '#60a5fa',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ color: '#475569', fontSize: '16px' }}>eductools.ph</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
