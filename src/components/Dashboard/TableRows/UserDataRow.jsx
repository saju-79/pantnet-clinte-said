import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";

const UserDataRow = ({ user }) => {
  const { email, role, status } = user || {};
  const [isOpen, setIsOpen] = useState(false);
  const [updatedRole, setUpdatedRole] = useState(role)
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg w-fit font-medium break-all">
          {email}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p
          className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full w-fit capitalize
              ${role === "admin" && "bg-purple-100 text-purple-600"}
              ${role === "seller" && "bg-blue-100 text-blue-600"}
              ${role === "customer" && "bg-gray-100 text-gray-900"}
              ${!role && "bg-red-100 text-red-500"}
            `}
        >
          {role === "admin" && "👑"}
          {role === "seller" && "🛍"}
          {role === "customer" && "👤"}
          {role || "No Role"}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p
          className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full w-fit
              ${status === "verified"
              ? "bg-emerald-100 text-emerald-600"
              : status === "requested"
                ? "bg-yellow-100 text-yellow-700 font-bold"
                : "bg-red-100 text-red-500"
            }`}
        >
          {status === "verified"
            ? "✔ Verified"
            : status === "requested"
              ? "⏳ Requested"
              : "✖ Unavailable"}
        </p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1  font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updatedRole={updatedRole}
          setUpdatedRole={setUpdatedRole}
          userEmail={email}
        ></UpdateUserRoleModal>
      </td>
    </tr>
  )
}

export default UserDataRow
