"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Card } from "flowbite-react";
import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { Users, Info, CheckCircle, XCircle, Plus } from "lucide-react";

interface UserGroup {
  id_user_group: number;
  name_user_group: string;
  desc_user_group: string;
  user_group_isactive: string; // "Y" or "N"
}

export default function UserGroupManagement() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<UserGroup | null>(null);
  const [newGroup, setNewGroup] = useState({
    name_user_group: "",
    desc_user_group: "",
    user_group_isactive: "Y", // Default value is Active
  });

  // Fetch data using Axios
  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/datagroup");
        if (response.data.data && response.data.data.user) {
          setUserGroups(response.data.data.user);
        }
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };
    fetchUserGroups();
  }, []);

  const handleRowClick = (group: UserGroup) => {
    setCurrentGroup(group);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentGroup(null);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setNewGroup({
      name_user_group: "",
      desc_user_group: "",
      user_group_isactive: "Y",
    });
  };

  const handleAddGroup = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/creategroup", newGroup);
      setIsAddModalOpen(false);
      const response = await axios.get("http://127.0.0.1:8000/api/datagroup");
      if (response.data.data && response.data.data.user) {
        setUserGroups(response.data.data.user);
      }
    } catch (error) {
      console.error("Error adding user group:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            User Group Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage user groups and their permissions
          </p>
          <div className="mt-4">
            <Button color="blue" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Add Group
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userGroups.map((group) => (
                  <tr
                    key={group.id_user_group}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(group)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          {group.name_user_group}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Info className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-500">
                          {group.desc_user_group}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          group.user_group_isactive === "Y"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {group.user_group_isactive === "Y" ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        {group.user_group_isactive === "Y" ? "Active" : "Inactive"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add Modal */}
      <Modal show={isAddModalOpen} onClose={handleAddModalClose}>
        <Modal.Header>Add New User Group</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Group Name</Label>
              <TextInput
                id="name"
                placeholder="Enter group name"
                value={newGroup.name_user_group}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name_user_group: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <TextInput
                id="description"
                placeholder="Enter description"
                value={newGroup.desc_user_group}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, desc_user_group: e.target.value })
                }
              />
            </div>
            <div className="hidden">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={newGroup.user_group_isactive}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, user_group_isactive: e.target.value })
                }
              >
                <option value="Y">Active</option>
                <option value="N">Inactive</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="green" onClick={handleAddGroup}>
            Save
          </Button>
          <Button color="gray" onClick={handleAddModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      {currentGroup && (
        <Modal show={isEditModalOpen} onClose={handleEditModalClose}>
          <Modal.Header>Edit User Group</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Group Name</Label>
                <TextInput
                  id="edit-name"
                  value={currentGroup.name_user_group}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <TextInput
                  id="edit-description"
                  value={currentGroup.desc_user_group}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  id="edit-status"
                  defaultValue={
                    currentGroup.user_group_isactive === "Y" ? "active" : "inactive"
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" onClick={handleEditModalClose}>
              Update
            </Button>
            <Button color="gray" onClick={handleEditModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
