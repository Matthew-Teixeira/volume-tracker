import React from 'react'
import { Link } from "react-router-dom";

const UpdateTanksCard = ({tankData}) => {
  return (
    <div className="w-full md:w-[300px] overflow-hidden rounded-xl bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl p-4 my-4 md:mx-4">
        <h2 className="inline text-xl font-bold">Tank: {tankData.tankName.slice(0, 1) + tankData.tankName[1].toUpperCase()}</h2>
        <p className='inline float-right'>Zone: {tankData.zone}</p>
        <p>Height: {tankData.height}</p>
        <p>Measurment Entries: {tankData.volumeCount}</p>
        <div className="p-5">
          <Link to={`/admin/updateTank/${tankData.tankName}/${tankData._id}`}>
            <button className="w-full rounded-md bg-[#339970]  py-2 text-indigo-100 hover:bg-[#4fb69b] hover:shadow-lg duration-75 text-lg">
              Update Tank
            </button>
          </Link>
        </div>
      </div>
  )
}

export default UpdateTanksCard