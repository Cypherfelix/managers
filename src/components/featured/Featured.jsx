import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from 'react';

const Featured = () => {
  const [state, setState] = useState({
    totalSalesPercent: {
      expected: 60,
      current: 0,
    },
    totalSales: {
      expected: 420,
      current: 0,
    },
    target: {
      expected: 25,
      current: 0,
    },
    lastWeekSales: {
      expected: 12.4,
      current: 0,
    },
    lastMonthSales: {
      expected: 20,
      current: 0,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prevState => ({
        ...prevState,
        ...Object.keys(prevState).reduce((acc, key) => {
          if (prevState[key].current < prevState[key].expected) {
            return {
              ...acc,
              [key]: {
                ...prevState[key],
                current: prevState[key].current + Math.abs(prevState[key].expected / 10),
              },
            };
          }
          return acc;
        }, {}),
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={state.totalSalesPercent.current} text={`${state.totalSalesPercent.current}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${state.totalSales.current}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${state.target.current}k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${state.lastWeekSales.current}k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${state.lastMonthSales.current}k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
