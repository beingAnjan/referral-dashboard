import "./index.css";

function ShareReferral({ referral }) {
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <section className="share-section">
      <h2 className="section-title">Refer friends and earn more</h2>

      <div className="share-card">

        <div className="share-group">
          <label className="summary-label">Your Referral Link</label>

          <div className="copy-box">
            <input
              type="text"
              readOnly
              value={referral.link}
            />

            <button
              onClick={() => copyText(referral.link)}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="share-group">
          <label className="summary-label">Your Referral Code</label>

          <div className="copy-box">
            <input
              type="text"
              readOnly
              value={referral.code}
            />

            <button
              onClick={() => copyText(referral.code)}
            >
              Copy
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ShareReferral;