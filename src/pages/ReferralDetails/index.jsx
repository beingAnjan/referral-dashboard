import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";

import "./index.css";

function ReferralDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferral();
  }, []);

  const getReferral = async () => {
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await axios.get(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const referrals = response.data.data.referrals;

      const selectedReferral = referrals.find(
        (item) => item.id === Number(id)
      );

      setReferral(selectedReferral);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (!referral) {
    return <h1 className="not-found">Referral Not Found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="referral-details-page">
        <div className="referral-details-container">
          <button
            className="back-link"
            onClick={() => navigate(-1)}
          >
            ← Back to dashboard
          </button>

          <h1 className="referral-title">Referral Details</h1>

          <p className="referral-subtitle">
            Full information for this referral partner.
          </p>

          <div className="referral-card">
            <div className="referral-card-header">
              <h2 className="referral-name">{referral.name}</h2>

              <span className="service-badge">
                {referral.serviceName}
              </span>
            </div>

            <div className="detail-row">
              <p className="detail-label">Referral ID</p>
              <p className="detail-value">{referral.id}</p>
            </div>

            <div className="detail-row">
              <p className="detail-label">Name</p>
              <p className="detail-value">{referral.name}</p>
            </div>

            <div className="detail-row">
              <p className="detail-label">Service Name</p>
              <p className="detail-value">{referral.serviceName}</p>
            </div>

            <div className="detail-row">
              <p className="detail-label">Date</p>
              <p className="detail-value">
                {referral.date.replaceAll("-", "/")}
              </p>
            </div>

            <div className="detail-row no-border">
              <p className="detail-label">Profit</p>
              <p className="detail-value">
                ${referral.profit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferralDetails;