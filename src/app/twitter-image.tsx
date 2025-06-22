import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'The Wellness Leaders'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>
            🏥
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            The Wellness Leaders
          </h1>
          <p
            style={{
              fontSize: '28px',
              opacity: 0.9,
              marginBottom: '30px',
            }}
          >
            PT・AT向け学習クイズ
          </p>
          <div
            style={{
              fontSize: '24px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '10px 30px',
              borderRadius: '30px',
            }}
          >
            6分野 × 1800問
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}