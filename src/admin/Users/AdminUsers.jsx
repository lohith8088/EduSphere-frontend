import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const UpdateRole = async (id) => {
   if (window.confirm(`Are you sure you want to update the role `))
 {
      try {
        await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(" role updated");
        fetchUsers();
      } catch (error) {
        toast.error("Error updating user role");
      }
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Update Role</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button className="common-btn" onClick={() => UpdateRole(user._id)} >Admin</button>
                    ) : (
                      <button
                        className="common-btn"
                        onClick={() => UpdateRole(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default AdminUsers;
