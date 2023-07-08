import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router";

import Alerter from "../components/Alerter";
import NavDrawer from "../components/NavDrawer";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import routes from "../data/routes";

const Dashboard = () => {
  const [isShrink, setIsShrink] = useState(false);
  const [isModalVisible, SetIsModalVisible] = useState(false);

  const handleShrink = () => setIsShrink(!isShrink);
  const handleModal = () => SetIsModalVisible(!isModalVisible);

  const { success, failure } = useSelector((state) => state.notify);

  return (
    <div
      className={`h-screen w-screen grid overflow-hidden ${
        isShrink ? "grid-cols-12" : "grid-cols-6"
      }`}
    >
      <NavDrawer visible={isModalVisible} onClose={handleModal} />
      <SideBar isShrink={isShrink} handleShrink={handleShrink} />
      <div
        className={`bg-gray-100 overflow-auto ${
          isShrink ? "col-span-12 lg:col-span-11" : "col-span-6 lg:col-span-5"
        }`}
      >
        <TopBar handleModal={handleModal} />
        <Routes>
          {routes.map(({ Component, path }, index) => (
            <Route path={path} element={<Component />} key={index} />
          ))}
          <Route path="/" element={<Navigate replace to="/users" />} />
        </Routes>
        <Alerter visible={failure} message={failure} type="error" />
        <Alerter visible={success} message={success} type="success" />
      </div>
    </div>
  );
};

export default Dashboard;
