import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router'

import ButtonGroup from "../components/ButtonGroup";
import NoFound from "../components/NoFound";
import Title from "../components/Title";
import { removeFailure, setFailure } from "../store/actions/notify.actions";
import { FETCHED_USERS, selectUsers } from "../store/reducers/user.reducer";
import axios from "../api/axios";


const headers = [
    "s.No",
    "Ref ID",
    "Name",
    "Amount",
    "Status",
    // "Placement Id",
    "Approved Date",
  ];

  
const TopupRequest = () =>{

    const [search, setSearch] = useState("");

  const users = useSelector((state) => selectUsers(state));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [userList,setUserList] = useState([]);

  useEffect(() => {

    axios.get('/user/topupRequest').then(res=>{
        if(res.status === 200){
            setUserList(res.data)
        }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

    return (
        <div className="overflow-auto">
      <Title title="Stacking Report" />
      <button
        className="py-1 px-3 block sm:hidden mb-3 mx-5 text-md rounded text-white bg-blue-900"
        onClick={() => navigate(-1)}
      >
        back
      </button>
      {userList.length === 0 ? (
        <NoFound />
      ) : (
        <div className="sm:m-5 overflow-auto">
          <table className="table-auto sm:p-5 w-full text-center">
            <thead className="bg-gray-800 text-white p-2">
              <tr>
                {headers.map((header) => (
                  <th
                    className={`py-2 sm:p-4 capitalize text-xs sm:text-sm md:text-lg ${
                      header === "s.No" || header === "PlacementId"
                        ? "hidden sm:block"
                        : ""
                    } ${header === "RefName" ? "hidden sm:block" : ""}`}
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user.id}>
                  <td className="hidden sm:h-20 sm:flex sm:items-center sm:justify-center h-full w-full py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    <span>{index + 1}</span>
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user.refId}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user.name ? user.name : '-'}
                  </td>
                  <td className="hidden sm:flex sm:item-center sm:justify-center py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user.amount}
                  </td>
                  <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user.status}
                  </td>
                   <td className="py-1 sm:p-2 text-xxs sm:text-sm md:text-lg">
                    {user.respondedAt ? user.respondedAt : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    )
}

export default TopupRequest