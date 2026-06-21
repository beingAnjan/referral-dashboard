import {
  FaDollarSign,
  FaCreditCard,
  FaLink,
  FaHourglassHalf,
  FaPercentage,
  FaMoneyBillWave,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";
import "./index.css";

const METRIC_ICONS = [
  FaDollarSign,
  FaCreditCard,
  FaLink,
  FaHourglassHalf,
  FaPercentage,
  FaMoneyBillWave,
  FaUsers,
  FaExchangeAlt,
];

function Overview({ metrics }) {
  return (
    <section className="overview-section">
      <h2 className="section-title sub-headings">Overview</h2>

      <div className="overview-grid">
        {metrics.map((item, index) => {
          const Icon = METRIC_ICONS[index % METRIC_ICONS.length];

          return (
            <div className="overview-card" key={item.id}>
              <div className="metric-icon">
                <Icon />
              </div>

              <h3 className="metric-value">{item.value}</h3>

              <p className="metric-label ">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Overview;