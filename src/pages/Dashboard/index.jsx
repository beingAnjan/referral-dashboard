import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Overview from "../../components/Overview";
import ServiceSummary from "../../components/ServiceSummary";
import ShareReferral from "../../components/ShareReferral";
import ReferralsTable from "../../components/ReferralsTable";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import "./index.css";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
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

      console.log(response.data);

      setDashboardData(response.data.data);
      setLoading(false);
    } 
    catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        Cookies.remove("jwt_token");
        window.location.href = "/login";
        return;
      }

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="dashboard-page">
          <div className="dashboard-container">

            <h1>Referral Dashboard</h1>

            <p>
              Track your referrals, earnings, and partner activity in one place.
            </p>

            <p className="loading">Loading dashboard...</p>

          </div>

          <Footer />
        </div>
      </>
    );
  } 

  if (!dashboardData) {
    return <h1>No dashboard data found. Please login again.</h1>;
  }
  
  const filteredReferrals =
    dashboardData?.referrals
        ?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.date) - new Date(b.date);
        }

        return new Date(b.date) - new Date(a.date);
        }) || [];

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;

  const currentRows = filteredReferrals.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredReferrals.length / rowsPerPage);

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startEntry =filteredReferrals.length === 0 ? 0 : firstIndex + 1;

  const endEntry = Math.min(lastIndex, filteredReferrals.length);

  console.log(dashboardData);
  console.log(currentRows);

  return (
    <>
    <Navbar />

    <div className="dashboard-page">
        <div className="dashboard-container">

        <h1>Referral Dashboard</h1>

        <p>
            Track your referrals, earnings, and partner activity in one place.
        </p>

        <Overview metrics={dashboardData.metrics} />

        <ServiceSummary
            serviceSummary={dashboardData.serviceSummary}
        />

        <ShareReferral
            referral={dashboardData.referral}
        />

        <ReferralsTable
          referrals={currentRows}
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          startEntry={startEntry}
          endEntry={endEntry}
          totalEntries={filteredReferrals.length}
      />

        </div>

        <Footer />
    </div>
    </>
  );
}

export default Dashboard;