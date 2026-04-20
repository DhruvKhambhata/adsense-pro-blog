export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the FutureEdge Insights editorial team.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: '4rem auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '3rem' }}>
        Have questions, feedback, or a story tip? We'd love to hear from you.
      </p>

      <form style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="Your name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="your@email.com" />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Subject</label>
          <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="What is this about?" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
          <textarea rows="6" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} placeholder="Your message..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Send Message</button>
      </form>
    </div>
  );
}
