import Users from "../pages/Users";
import FreeCoinReport from "../pages/FreeCoinReport";
import MessageCenter from "../pages/MessageCenter";
import StackingReport from "../pages/StackingReport";
import PayoutReport from "../pages/PayoutReport";
import TotalInvestment from "../pages/TotalInvestment";
import StackingRequest from "../pages/StackingRequest";
import ChangeAmount from "../pages/ChangeAmount";
import Profile from "../pages/Profile";
import BankDetails from "../pages/BankDetails";
import Registration from "../pages/Registration";
import WithdrawRequest from "../pages/WithdrawRequest";
import BonusWallet from "../pages/BonusWallets";
import ChangeBonusWallet from "../pages/ChangeBonusWallet";
import ViewImage from "../pages/ViewImage";
import WithdrawReport from "../pages/WithdrawReport";
import Support from "../pages/Support";
import CreateStackingRequest from "../pages/CreateStackingRequest";
import TopupRequest from '../pages/TopupRequest'

const routes = [
  { path: "users", Component: Users },
  { path: "message-center", Component: MessageCenter },
  { path: "total-investment", Component: TotalInvestment },
  { path: "stacking-request", Component: StackingRequest },
  { path: "withdraw-request", Component: WithdrawRequest },
  { path: "stacking-report", Component: StackingReport },
  { path: "withdraw-report", Component: WithdrawReport },
  { path: "payout-report", Component: PayoutReport },
  { path: "free-coin-report", Component: FreeCoinReport },
  { path: "create-stacking-request", Component: CreateStackingRequest },
  { path: "bonus-wallet", Component: BonusWallet },
  { path: "bonus-wallet/:id", Component: ChangeBonusWallet },
  { path: "change-amount", Component: ChangeAmount },
  { path: "user-profile/:id", Component: Profile },
  { path: "bank-details/:id", Component: BankDetails },
  { path: "registration", Component: Registration },
  { path: "view-image/:id", Component: ViewImage },
  { path: "support", Component: Support },
  { path: "topup-request", Component: TopupRequest },
];

export default routes;
