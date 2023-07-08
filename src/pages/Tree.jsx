import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { changePageName } from "../store/actions/page.actions";
import { selectUser } from "../store/reducers/auth.reducers";
import "./Tree.css";
import Tree from "react-d3-tree";
import instance from "../api/axios";

const BTree = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUser(state));

  const navigate = useNavigate();

  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(changePageName("Tree Chart"));
    instance.get(`userCharts/${user.id}`).then((res) => {
      if (res.status === 200) {
        setChartData(res.data.output);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    "Loading please wait"
  ) : (
    <div className="trees-wrapper" style={{ background: "white" }}>
      <h3 className="chart-title">Tree Chart</h3>
      <button className="back-btn" type="button" onClick={() => navigate(-1)}>
        <BsChevronCompactLeft />
        Go Back
      </button>

      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
        <Tree
          data={chartData}
          style={{ background: "#191e31" }}
          orientation="vertical"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
        />
      </div>
    </div>
  );
};

export default BTree;
