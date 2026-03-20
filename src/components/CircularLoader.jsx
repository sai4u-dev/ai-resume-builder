const loaderStyles = `
  .loader-wrap {
    width: 380px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: -10px;
  }

  .loader-ring {
    position: relative;
    width: 52px;
    height: 52px;
  }

  /* Outer orange ring */
  .loader-ring::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3.5px solid #FFE4CC;
    border-top-color: #F97316;
    animation: spin 0.9s linear infinite;
  }

  /* Inner sky ring, counter-spin */
  .loader-ring::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    border: 2.5px solid #E0F2FE;
    border-bottom-color: #38BDF8;
    animation: spin-reverse 1.2s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes spin-reverse {
    to { transform: rotate(-360deg); }
  }

  .loader-label {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    animation: pulse-fade 1.5s ease-in-out infinite;
  }

  @keyframes pulse-fade {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

export default function CircularLoader() {
  return (
    <div className="loader-wrap">
      <style>{loaderStyles}</style>
      <div className="loader-ring" />
      <span className="loader-label">Loading…</span>
    </div>
  );
}