'use client';
import { useFormStatus } from 'react-dom';

export default function SyncButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      style={{ 
        background: pending ? '#94a3b8' : 'var(--accent)', 
        color: 'white', 
        border: 'none', 
        padding: '1rem 2rem', 
        borderRadius: '6px', 
        fontWeight: 900, 
        cursor: pending ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}
    >
      {pending ? 'SYNCHRONIZING INTELLIGENCE...' : 'INITIALIZE PULSE INTELLIGENCE'}
    </button>
  );
}
