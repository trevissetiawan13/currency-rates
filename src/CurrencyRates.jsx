import React, { useEffect, useState } from 'react';
import './CurrencyRates.css'; // Import CSS untuk styling

const CurrencyRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const apiKey = '34360aed5343448ebfe3ba62a1ad76c5'; // Ganti dengan API key Anda

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

  return (
    <div>
      <h1>Currency Rates</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => {
            const exchangeRate = rates[currency];
            const weBuy = exchangeRate ? (exchangeRate * 1.05).toFixed(4) : '-';
            const weSell = exchangeRate ? (exchangeRate * 0.95).toFixed(4) : '-';

            return (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{weBuy}</td>
                <td>{exchangeRate}</td>
                <td>{weSell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Aplikasi ini dibuat dari API <a href="https://currencyfreaks.com" target="_blank" rel="noopener noreferrer">Currency Freaks</a>
      </p>
    </div>
  );
};

export default CurrencyRates;