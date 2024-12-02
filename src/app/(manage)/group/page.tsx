"use client";
import React, { useState } from "react";
import { Card } from "flowbite-react";
import { Modal, Button, TextInput, Label, Select } from "flowbite-react";
import { Users, Info, CheckCircle, XCircle, Plus } from "lucide-react";

interface UserGroup {
  name: string;
  description: string;
  isActive: boolean;
}

export default function UserGroupManagement() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([
    {
      name: "Regular User",
      description: "Regular User untuk Pengguna Baru",
      isActive: true,
    },
    {
      name: "Lecturer",
      description:
        "Teaching staff with access to manage courses and student grades",
      isActive: true,
    },
    {
      name: "Student",
      description:
        "Regular student account with access to course materials and assignments",
      isActive: false,
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<UserGroup | null>(null);

  const handleRowClick = (group: UserGroup) => {
    setCurrentGroup(group);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentGroup(null);
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
            <Button color="blue">
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
                {userGroups.map((group, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(group)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm font-medium text-gray-900">
                          {group.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Info className="h-5 w-5 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-500">
                          {group.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          group.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {group.isActive ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        {group.isActive ? "Active" : "Inactive"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Edit Modal */}
      {currentGroup && (
        <Modal show={isEditModalOpen} onClose={handleModalClose}>
          <Modal.Header>Edit User Group</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Group Name</Label>
                <TextInput
                  id="edit-name"
                  name="name"
                  placeholder="Enter group name"
                  value={currentGroup.name}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <TextInput
                  id="edit-description"
                  name="description"
                  placeholder="Enter description"
                  value={currentGroup.description}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  id="edit-status"
                  name="isActive"
                  defaultValue={currentGroup.isActive ? "active" : "inactive"}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="green">Save</Button>
            <Button onClick={handleModalClose} color="gray">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
