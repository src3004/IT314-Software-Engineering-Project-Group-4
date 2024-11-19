import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    setIsEditable(false);
  };

  return (
    <div className="container p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Username:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  E-mail:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Mobile:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="mobile"
                    placeholder="Mobile"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-medium text-green-700">
                  Password:
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`w-full rounded-md p-2 focus:outline-none focus:ring-2 ${
                      isEditable
                        ? "bg-white border border-green-600 focus:ring-green-500"
                        : "bg-white border border-gray-200 cursor-not-allowed"
                    }`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex space-x-4">
          {isEditable && (
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
            >
              Save Changes
            </button>
          )}
          <button
            type="button"
            onClick={handleEditToggle}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
          >
            {isEditable ? "Cancel" : "Change Details"}
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
