import React from 'react';
import { MdLocalGasStation, MdPayments, MdBuild, MdFlashOn, MdBusinessCenter } from 'react-icons/md';
import './Expense.css';

const Expense = () => {
  // Mock data matching the reference image exactly
  const summaryCards = [
    { id: 1, title: "Today's Expense", amount: "₹8,650" },
    { id: 2, title: "This Month", amount: "₹1,48,650" },
    { id: 3, title: "This Year", amount: "₹12,48,650" },
  ];

  const expensesData = [
    { id: 1, category: "Fuel", icon: <MdLocalGasStation className="expense-category-icon" />, amount: "₹1,200", method: "Cash", date: "15 May 2025" },
    { id: 2, category: "Salary", icon: <MdPayments className="expense-category-icon" />, amount: "₹2,500", method: "Bank Transfer", date: "15 May 2025" },
    { id: 3, category: "Maintenance", icon: <MdBuild className="expense-category-icon" />, amount: "₹1,800", method: "Cash", date: "15 May 2025" },
    { id: 4, category: "Electricity", icon: <MdFlashOn className="expense-category-icon" />, amount: "₹950", method: "Cash", date: "15 May 2025" },
    { id: 5, category: "Office Expense", icon: <MdBusinessCenter className="expense-category-icon" />, amount: "₹700", method: "Cash", date: "15 May 2025" },
  ];

  // CSV डाउनलोड करने का वर्किंग फंक्शन
  const handleDownloadCSV = () => {
    const headers = ['Category', 'Amount', 'Payment Method', 'Date'];
    
    const csvRows = expensesData.map(item => {
      // अमाउंट से ₹ और कोमा हटाकर केवल क्लीन नंबर या फॉर्मेटेड टेक्स्ट पास करना
      const cleanAmount = item.amount.replace(/[₹,]/g, '');
      return [`"${item.category}"`, `₹${cleanAmount}`, `"${item.method}"`, `"${item.date}"`].join(',');
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'expense_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="expense-container">
      {/* Header and Action Wrapper */}
      <div className="expense-header-wrapper">
        <h2 className="expense-title">EXPENSE MANAGEMENT</h2>
        <div className="expense-header-actions">
          <button 
            type="button" 
            className="expense-download-csv-btn"
            onClick={handleDownloadCSV}
          >
            <svg className="expense-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CSV
          </button>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="expense-summary-row">
        {summaryCards.map((card) => (
          <div key={card.id} className="expense-card">
            <span className="expense-card-title">{card.title}</span>
            <span className="expense-card-amount">{card.amount}</span>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="expense-table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="expense-category-cell">
                    {item.icon}
                    <span>{item.category}</span>
                  </div>
                </td>
                <td className="expense-amount-cell">{item.amount}</td>
                <td>{item.method}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Button */}
      <div className="expense-footer">
        <button className="expense-view-btn">View All Expenses</button>
      </div>
    </div>
  );
};

export default Expense;