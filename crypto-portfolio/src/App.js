import { useState, useEffect, useRef } from "react";
import { datacrypto } from "./utils"
import './App.css'
export default function App() {
  const [cryptodata, setcryptodata] = useState([]);
  const [editid, seteditid] = useState("");
  const [userdata, setuserdata] = useState([]);
  const ref = useRef("");
  const [portfoliovalue, setportfoliovalue] = useState(0);
  const [cryptonumber, setcryptonumber] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setcryptodata(datacrypto);
    }, 2000);
  }, []);

  useEffect(() => {
    let sum = 0;
    let number = 0;
    for (let i = 0; i < userdata.length; i++) {
      sum += userdata[i].currvalue;
      number += userdata[i].currnumber;
    }
    setcryptonumber(number);
    setportfoliovalue(sum);
  }, [userdata]);

  function editcurr(id) {
    seteditid(id);
  }

  function savedata(curr) {
    let val = Number(ref.current.value);
    let value = curr.num_market_pairs * val;
    let obj = {
      id: curr.id,
      currnumber: val,
      currvalue: value,
    };

    setuserdata((userdata) => {
      const exists = userdata.some((data) => data.id === curr.id);
      if (exists) {
        return userdata.map((data) =>
          data.id === curr.id ? { ...data, ...obj } : data
        );
      } else {
        return [...userdata, obj];
      }
    });

    ref.current.value = "";
    seteditid("");
  }

  return (
    <main>
      {cryptodata.length === 0 && <Shimmer />}
      {cryptodata.length !== 0 && (
        <div className="container">
          <h3>Crypto Manager App</h3>
          <div className="user-info">
            <div className="portfolio-value">
              <h4>Portfolio Value</h4>
              {portfoliovalue}
            </div>
            <div className="crypto-invested">
              <h4>Crypto Invested</h4>
              {cryptonumber}
            </div>
          </div>
          <div className="table-container">
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price (USD)</th>
                  <th>Your Holdings</th>
                </tr>
              </thead>
              <tbody>
                {cryptodata.map((curr) => (
                  <tr key={curr.id}>
                    <td>{curr.name}</td>
                    <td>{curr.symbol}</td>
                    <td>{curr.num_market_pairs} (USD)</td>
                    <td>
                      {editid !== curr.id && (
                        <div>
                          {userdata.some((data) => data.id === curr.id)
                            ? userdata.find((user) => user.id === curr.id)
                              .currnumber
                            : 0}
                          <button
                            className="edit-btn"
                            onClick={() => editcurr(curr.id)}
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                      {editid === curr.id && (
                        <div>
                          <input ref={ref} type="number" min="0" />
                          <button onClick={() => savedata(curr)}>Save</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

function Shimmer() {
  return (
    <div className="shimmer">
      <div className="first-cont">
        <div className="shimmer-img"></div>
        <div className="second-cont">
          <div className="shimmer-bar"></div>
          <div className="shimmer-bar"></div>
        </div>
      </div>
      <div className="second-container">
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar"></div>
      </div>
    </div>
  );
}
