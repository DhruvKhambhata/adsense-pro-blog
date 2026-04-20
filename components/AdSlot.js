'use client';

export default function AdSlot({ type, id }) {
  const styles = {
    banner: { minHeight: '90px', width: '100%', margin: '2rem 0' },
    sidebar: { minHeight: '600px', width: '300px', margin: '1rem 0' },
    'in-article': { minHeight: '250px', width: '100%', margin: '2rem 0' },
    footer: { minHeight: '250px', width: '100%', margin: '3rem 0 1rem' }
  };

  return (
    <div 
      className={`ad-container ad-${type}`} 
      id={id}
      style={{
        ...styles[type],
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>
        Advertisement
      </span>
      <div style={{ color: '#cbd5e1', fontWeight: 600 }}>
        {type.toUpperCase()} SLOT
      </div>
      {/* 
        DEVELOPER NOTE: Replace the div above with your actual AdSense code:
        <ins className="adsbygoogle" ... />
      */}
    </div>
  );
}
