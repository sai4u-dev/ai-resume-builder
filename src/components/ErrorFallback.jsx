import { useNavigate } from "react-router-dom";

const errorStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  .err-root {
    --or50: #FFF4ED;
    --or100: #FFE4CC;
    --or200: #FFC599;
    --or400: #F97316;
    --or600: #C2410C;
    --sk50: #F0F9FF;
    --sk200: #BAE6FD;
    --sk400: #38BDF8;
    --sk600: #0284C7;
    font-family: 'DM Sans', sans-serif;
  }

  .err-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    padding: 40px 20px;
    background: #FAFAFA;
  }

  .err-img-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 420px;
    width: 100%;
  }

  .err-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 8px 24px rgba(249,115,22,0.12));
  }

  .err-headline {
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .err-icon { width: 36px; height: 36px; flex-shrink: 0; }

  .err-title {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .err-sub {
    font-size: 14px;
    color: #6B7280;
    margin: -12px 0 0;
    text-align: center;
    max-width: 320px;
    line-height: 1.6;
  }

  /* Decorative divider */
  .err-divider {
    width: 60px;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(to right, var(--or400), var(--sk400));
    margin: -8px 0;
  }

  .err-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #fff;
    background: var(--or400);
    border: none;
    cursor: pointer;
    transition: all 0.18s ease;
    position: relative;
    overflow: hidden;
  }
  .err-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent);
  }
  .err-btn:hover {
    background: var(--or600);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(249,115,22,0.35);
  }
  .err-btn:active { transform: translateY(0); }
`;

function ErrorFallback({ resetErrorBoundary }) {
  const navigate = useNavigate();

  const goHome = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <div className="err-root">
      <style>{errorStyles}</style>
      <div role="alert" className="err-page">
        <div className="err-img-wrap">
          <img
            src="https://files.catbox.moe/ubzvn1.svg"
            alt="Error Illustration"
            className="err-img"
          />
        </div>

        <div className="err-divider" />

        <div className="err-headline">
          <img
            src="https://files.catbox.moe/6ykago.png"
            alt=""
            className="err-icon"
          />
          <h2 className="err-title">Something went wrong</h2>
        </div>

        <p className="err-sub">
          An unexpected error occurred. Let's get you back on track.
        </p>

        <button onClick={goHome} className="err-btn">
          ← Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;