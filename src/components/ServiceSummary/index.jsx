import "./index.css";

function ServiceSummary({ serviceSummary }) {
  return (
    <section className="service-summary">
      <h2 className="section-title">Service summary</h2>

      <div className="summary-grid">

        <div className="summary-card">
          <p className="summary-label">Service</p>
          <strong className="summary-value link-value">
            {serviceSummary.service}
          </strong>
        </div>

        <div className="summary-card">
          <p className="summary-label">Your Referrals</p>
          <strong className="summary-value">
            {serviceSummary.yourReferrals}
          </strong>
        </div>

        <div className="summary-card">
          <p className="summary-label">Active Referrals</p>
          <strong className="summary-value">
            {serviceSummary.activeReferrals}
          </strong>
        </div>

        <div className="summary-card">
          <p className="summary-label">Total Ref. Earnings</p>
          <strong className="summary-value">
            {serviceSummary.totalRefEarnings}
          </strong>
        </div>

      </div>
    </section>
  );
}

export default ServiceSummary;