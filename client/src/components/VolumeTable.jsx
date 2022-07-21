import React from "react";
import { Link } from "react-router-dom";
import { date, time } from "../utils/time-date";

const VolumeTable = ({ volumeData }) => {

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-300">
        <tr className="whitespace-nowrap">
          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">
              {date(volumeData.created_at)}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="text-sm text-gray-500">
              {time(volumeData.created_at)}
            </div>
          </td>
          <td className="px-6 py-4 text-sm text-gray-500">
            {volumeData.totalVol}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500">
            {volumeData.waterVol}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500">
            {volumeData.productVol}
          </td>
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
    </>
  );
};

export default VolumeTable;
