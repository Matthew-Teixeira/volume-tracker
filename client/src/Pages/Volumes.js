import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VolumeTable from "../components/VolumeTable";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

import loader from "../assets/images/loader.gif";

const Volumes = () => {
  const [tankId, setTankId] = useState("");
  const [tankData, setTankData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();
  const userToken = Auth.getToken();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  const getTankId = () => {
    let path = window.location.pathname.split("/");
    let id = path[path.length - 1];
    setTankId(id);
  };

  useEffect(() => {
    getTankId();
    const getTankData = async (id) => {
      fetch(`/api/tanks/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTankData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (tankId) {
      getTankData(tankId);
    }
  }, [tankId, userToken]);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch items from another resources.
    if (tankData.volumes) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(tankData.volumes.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(tankData.volumes.length / itemsPerPage));
      setLoading2(false);
    }
  }, [itemOffset, itemsPerPage, tankData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tankData.volumes.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-10 justify-center">
      <Link to={`/addVolume/${tankData._id}`}>
        <button className="w-full block mx-auto max-w-[300px] rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg my-4 px-4">
          Add Volume
        </button>
      </Link>
      <Link to={`/charts/${tankData._id}`}>
        <button className="w-full block mx-auto max-w-[300px] rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg my-4 px-4">
          View Charts
        </button>
      </Link>
      </div>
      {loading || loading2 ? (
        <div className="mt-24 flex justify-center items-center">
          <img alt="loading" src={loader} />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto container flex md:justify-center mx-auto">
            <div className="flex flex-col">
              <div className="border-b border-gray-200 shadow">
                <h3 className="text-center text-xl font-bold">
                  {tankData.tankName.slice(0, 1) +
                    tankData.tankName[1].toUpperCase()}
                </h3>
                <table className="divide-y divide-gray-300 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                      <th className="px-6 py-2 text-xs text-gray-500">Time</th>
                      <th className="px-6 py-2 text-xs text-gray-500">Total</th>
                      <th className="px-6 py-2 text-xs text-gray-500">PCW</th>
                      <th className="px-6 py-2 text-xs text-gray-500">LNAPL</th>
                      <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                    </tr>
                  </thead>
                  {currentItems.map((volume) => (
                    <VolumeTable key={volume._id} volumeData={volume} />
                  ))}
                </table>
              </div>
            </div>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num link"
            nextLinkClassName="page-num link"
            activeLinkClassName="active"
          />
        </>
      )}
    </div>
  );
};

export default Volumes;
