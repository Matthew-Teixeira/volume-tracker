import React from 'react'
import { Link } from "react-router-dom";
import {date, time} from "../utils/time-date"

const VolumeTable = ({volumeData, tankData}) => {
  return (
    <>
    <h3 className='text-center text-xl font-bold'>{tankData.tankName.slice(0, 1) + tankData.tankName[1].toUpperCase()}</h3>
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
                <tbody className="bg-white divide-y divide-gray-300">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{date(volumeData.created_at)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{time(volumeData.created_at)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{volumeData.totalVol}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{volumeData.waterVol}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{volumeData.productVol}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/editVolume/${volumeData._id}`}
                        className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              </>
  )
}

export default VolumeTable