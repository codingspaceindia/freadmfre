import { FiMessageCircle, FiUsers } from "react-icons/fi";
import { BiGitBranch, BiMoney, BiSupport } from "react-icons/bi";
import { BsFilterSquare } from "react-icons/bs";
import { FaHandPaper, FaRegistered } from "react-icons/fa";
import { AiOutlineVerticalLeft } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

const links = [
  { title: "Users", link: "/users", Icon: FiUsers },
  {
    title: "Message Center",
    link: "/message-center",
    Icon: FiMessageCircle,
  },
  { title: "Total Investment", link: "/total-investment", Icon: BiMoney },
  { title: "Stacking Request", link: "/stacking-request", Icon: FaHandPaper },
  {
    title: "Withdraw Request",
    link: "/withdraw-request",
    Icon: AiOutlineVerticalLeft,
  },
  {
    title: "Stacking Report",
    link: "/topup-request",
    Icon: AiOutlineVerticalLeft,
  },
  {
    title: "Create Stacking Request",
    link: "/create-stacking-request",
    Icon: IoCreateOutline,
  },
  // { title: "Stacking Report", link: "/stacking-report", Icon: BsFilterSquare },
  { title: "Withdraw Report", link: "/withdraw-report", Icon: BsFilterSquare },
  // { title: "Payout Report", link: "/payout-report", Icon: SiDogecoin },
  // { title: "Free Coin Report", link: "/free-coin-report", Icon: RiCoinLine },
  { title: "Bonus Wallet", link: "/bonus-wallet", Icon: MdOutlineLocalOffer },
  { title: "Change Amount", link: "/change-amount ", Icon: BiMoney },
  { title: "Tree", link: "/tree", Icon: BiGitBranch },
  { title: "Registration", link: "/registration", Icon: FaRegistered },
  { title: "Support", link: "/support", Icon: BiSupport },
];

export default links;
