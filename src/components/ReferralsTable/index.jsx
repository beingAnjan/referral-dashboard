import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Pagination from "../Pagination";

function ReferralsTable({ referrals,
  search,
  setSearch,
  sortOrder,
  setSortOrder,
  currentPage,
  setCurrentPage,
  totalPages,
  pageNumbers,
  startEntry,
  endEntry,
  totalEntries, }) {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="table-section">
      <h2 className="section-title">All referrals</h2>
      <div className="table-toolbar">
        <div className="search-group">
          <label className="summary-label">Search</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Name or service..."
              value={search}
              onChange={(e)=>{
                  setSearch(e.target.value);
                  setCurrentPage(1);
              }}
              className="search-input"
            />

            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="search-group">
          <label className="summary-label">Sort by date</label>    
          <select
              value={sortOrder}
              onChange={(e)=>{
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
              }}
              className="sort-select"
          >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      <table className="referral-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {referrals.map((item) => (
            <tr
              key={item.id}
              className={item.id === selectedId ? "selected" : ""}
              onClick={() => {
                setSelectedId(item.id);
                navigate(`/referral/${item.id}`);
              }}
            >
              <td>
                <span className="referral-link">{item.name}</span>
              </td>

              <td>{item.serviceName}</td>

              <td>{item.date.replaceAll("-", "/")}</td>

              <td className="profit">
                ${item.profit.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        startEntry={startEntry}
        endEntry={endEntry}
        totalEntries={totalEntries}
        setCurrentPage={setCurrentPage}
      />
    </section>
    
  );
}

export default ReferralsTable;