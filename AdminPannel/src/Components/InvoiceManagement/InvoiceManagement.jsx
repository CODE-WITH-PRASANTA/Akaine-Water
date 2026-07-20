import React, { useState } from 'react';
import { FaPrint, FaFilePdf, FaTint } from 'react-icons/fa'; // Import water drop icon
import './InvoiceManagement.css'; 

// Pre-defined invoice data for the list on the right
const invoiceListData = [
  { id: 'INV-1001', customerName: 'John Doe', amount: 2450.00, date: '15 May 2025' },
  { id: 'INV-1002', customerName: 'Alice Smith', amount: 1850.00, date: '15 May 2025' },
  { id: 'INV-1003', customerName: 'Robert Brown', amount: 3200.00, date: '14 May 2025' },
  { id: 'INV-1004', customerName: 'Michael Lee', amount: 950.00, date: '14 May 2025' },
  { id: 'INV-1005', customerName: 'Emily Davis', amount: 1150.00, date: '13 May 2025' },
];

const InvoiceManagement = () => {
  const [items, setItems] = useState([
    { name: '20L Bottle', qty: 2, rate: 50.00, amount: 100.00 },
    { name: '10L Bottle', qty: 1, rate: 30.00, amount: 30.00 },
    { name: '5L Bottle', qty: 1, rate: 20.00, amount: 20.00 },
  ]);

  const deliveryCharge = 50.00;
  const taxRate = 0.05;

  const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = (subTotal + deliveryCharge) * taxRate;
  const total = subTotal + deliveryCharge + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    console.log('Generating PDF...');
    alert('PDF download functionality is not implemented in this demo, but you would use libraries like jsPDF to achieve this.');
  };

  // कार्यशील डाउनलोड हैंडलर फ़ंक्शन
  const handleDownload = () => {
    const headers = ['Invoice ID', 'Customer Name', 'Amount', 'Date'];
    const rows = invoiceListData.map(invoice => [
      invoice.id,
      invoice.customerName,
      `₹${invoice.amount.toFixed(2)}`,
      invoice.date
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'Invoice_Management_Report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="InvoiceManagement">
      <div className="InvoiceManagement__header">
        <div className="InvoiceManagement__header-title">
          <span className="InvoiceManagement__header-number">10.</span>
          <h1>INVOICE MANAGEMENT</h1>
        </div>
        {/* वर्किंग डाउनलोड बटन */}
        <button className="InvoiceManagement__download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>

      <div className="InvoiceManagement__content">
        <div className="InvoiceManagement__invoice-form">
          <div className="InvoiceManagement__invoice-details">
            <div className="InvoiceManagement__aqua-pure-logo">
              {/* --- UPDATED PART START --- */}
              {/* Replaced the broken image placeholder with the FaTint icon */}
              <FaTint className="InvoiceManagement__logo-icon" size={40} color="#3498db" />
              {/* --- UPDATED PART END --- */}
              <div>
                <h2>AquaPure</h2>
                <p>WATER DELIVERY SERVICE</p>
              </div>
            </div>
            <div className="InvoiceManagement__invoice-meta">
              <h2>TAX INVOICE</h2>
              <p>Invoice #INV-1001</p>
            </div>
          </div>

          <div className="InvoiceManagement__amount-total">
            <div className="InvoiceManagement__invoice-billing">
              <p><span>Invoice Date:</span> 15 May 2025</p>
              <h3>Bill To:</h3>
              <p>John Doe</p>
              <p>Bhubaneswar, Odisha</p>
            </div>
            <div className="InvoiceManagement__total-box">
              <p>Total Amount</p>
              <h1>₹{total.toFixed(2)}</h1>
            </div>
          </div>

          <div className="InvoiceManagement__payment-method">
            <p><span>Payment Method:</span> Online</p>
          </div>

          <div className="InvoiceManagement__items-table">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>₹{item.rate.toFixed(2)}</td>
                    <td>₹{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="InvoiceManagement__table-footer-label">Delivery Charge</td>
                  <td className="InvoiceManagement__table-footer-value">₹{deliveryCharge.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="InvoiceManagement__table-footer-label">Tax (5%)</td>
                  <td className="InvoiceManagement__table-footer-value">₹{taxAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="InvoiceManagement__table-footer-total-label">Total</td>
                  <td className="InvoiceManagement__table-footer-total-value">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="InvoiceManagement__form-buttons">
              <button onClick={handleDownloadPdf}>
                <FaFilePdf/> Download PDF
              </button>
              <button onClick={handlePrint}>
                <FaPrint/> Print
              </button>
          </div>
        </div>

        <div className="InvoiceManagement__invoice-list">
          <h3>Invoice List</h3>
          <ul>
            {invoiceListData.map((invoice) => (
              <li key={invoice.id}>
                <span>{invoice.id}</span>
                <span>{invoice.customerName}</span>
                <span>₹{invoice.amount.toFixed(2)}</span>
                <span>{invoice.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;