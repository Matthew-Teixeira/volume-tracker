import React from 'react'
import { Link } from "react-router-dom";

const DashTankCard = ({tankData}) => {
  return (
    <div className="w-full md:w-[300px] overflow-hidden rounded-xl bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl p-4 my-4 md:mx-4">
        <h2 className="inline text-xl font-bold">Tank: {tankData.tankName.slice(0, 1) + tankData.tankName[1].toUpperCase()}</h2>
        <p className='inline float-right'>Zone: {tankData.zone}</p>
        <p>Height: {tankData.height}</p>
        <p>Measurment Entries: {tankData.volumeCount}</p>
        <div className="p-5">
          <Link to={`/volumes/${tankData._id}`}>
            <button className="w-full rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg">
              Volumes
            </button>
          </Link>
        </div>
      </div>
  )
}

export default DashTankCard