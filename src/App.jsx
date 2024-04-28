import React, { useState } from 'react';
import './App.css';
import './Style.css';

function App() {
  const [Trans, setTrans] = useState([
    { date: "2024-04-27", description: "Supermarket", category: "Groceries", amount: "50" },
    { date: "2024-04-26", description: "Gas Station", category: "Transportation", amount: "30" },
    { date: "2024-04-28", description: "Mama Mboga", category: "Hustler", amount: "60" }
  ]);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [searched, setSearched] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();

    const newTransaction = { date, description, category, amount };

    setTrans([...Trans, newTransaction]);
    setDate('');
    setDescription('');
    setCategory('');
    setAmount('');
  }

  function searchTransaction(e, description) {
    e.preventDefault();

    const result = Trans.filter(transaction =>
      transaction.description.toLowerCase().includes(description.toLowerCase())
    );

    if (result.length > 0) {
      setTrans(result);
    } else {
      setTrans([]);
      // Optionally set a state variable to display a message
    }

    setSearched('');
  }

  return (
    <div className="container">
      <h1>The Royal Bank of Flatiron</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search transactions..." value={searched} onChange={(e) => setSearched(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchTransaction(e, searched)} />
      </div>
      <div className="add-transaction-form">
        <form onSubmit={handleSubmit}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD" required />  
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} step="0.01" placeholder="Amount" required />
          <input type="submit" value="Add Transaction" />
        </form>
      </div>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Trans.length > 0 ? (
            Trans.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
