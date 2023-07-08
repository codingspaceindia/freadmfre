export const constant = {
  auth: {
    login: "/login",
  },
  user: {
    getUsers: "/user/getListOrderByRefId",
    userUpdate: "/user/update",
  },
  team: {
    directReferrals: "/user/directReferralsReport",
  },
  notice: "/user/notices",
  bank: {
    fetch: "/user/bankDetails",
    update: "/user/bankDetails/update",
  },
  password: "/auth/changePassword",
  wallet: {
    stacking: "/user/stacking",
    stackingInvestment: "/user/stackingInvestment",
    walletReport: "/user/walletReport",
  },
  dashboard: {
    dailyPrice: "/user/coinTodayPrice",
    stackingInvestment: "/user/stackingInvestment",
    ROS: "/user/roiReport",
    leftMember: "/user/getChildDetails/left",
    rightMember: "/user/getChildDetails/right",
    activeWallet: "/user/getUserPreviousBalance",
  },
  refUser: "/user/getByRefId",
  withdraw: "/user/getPendingWithdrawRequests",
  withdrawaccept: "/user",
  withdrawreject: "/user/rejectWithdrawRequest",
  conversion: {
    coinToInr: "coinToInr",
  },
  supports: "/user/getUnprocessedSupportRecords",
};
