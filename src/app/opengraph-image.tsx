import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'The Wellness Leaders - 医療従事者向けクイズアプリ'
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
          background: 'linear-gradient(to bottom right, #3b82f6, #1e40af)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.05) 10px,
                rgba(255, 255, 255, 0.05) 20px
              )
            `,
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              fontSize: '100px',
              marginBottom: '20px',
            }}
          >
            🏥
          </div>
          
          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            The Wellness Leaders
          </h1>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: '32px',
              marginBottom: '40px',
              opacity: 0.9,
            }}
          >
            医療従事者向けクイズアプリ
          </p>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '24px',
              opacity: 0.8,
            }}
          >
            <span>🦴 解剖学</span>
            <span>❤️ 生理学</span>
            <span>🥗 栄養学</span>
            <span>💪 リハビリ</span>
          </div>
          
          {/* Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>1800問以上収録</span>
            <span style={{ fontSize: '16px' }}>✨</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}