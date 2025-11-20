import { X } from "lucide-react";
import React from "react";
import { Project } from "./projects-table";
import Image from "next/image";

interface PropsTypes {
  onClose: (value: boolean) => void;
  project: Project;
}

const DetailsProjectModal = ({ onClose, project }: PropsTypes) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      in_progress: { color: "bg-blue-100 text-blue-800", text: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", text: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", text: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "bg-gray-100 text-gray-800",
      text: status,
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const calculateDaysRemaining = (deliveryDate: string) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffTime = delivery.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => onClose(false)}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Project Details</h1>
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Project Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Project Name
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {project?.title}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Status
              </h2>
              <div className="flex items-center">
                {getStatusBadge(project?.status)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
              {project?.description}
            </p>
          </div>

          {/* Client Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Client Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Image
                  src={project?.client?.profileImage}
                  alt={project?.client?.firstName}
                  width={1000}
                  height={1000}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {project?.client?.firstName} {project?.client?.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {project?.client?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Start Date
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatDate(project?.startDate)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Delivery Date
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatDate(project?.deliveryDate)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Days Remaining
              </h2>
              <p
                className={`font-medium p-3 rounded-lg ${
                  calculateDaysRemaining(project?.deliveryDate) < 0
                    ? "bg-red-100 text-red-800"
                    : calculateDaysRemaining(project?.deliveryDate) < 7
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {calculateDaysRemaining(project?.deliveryDate) < 0
                  ? `Overdue by ${Math.abs(
                      calculateDaysRemaining(project?.deliveryDate)
                    )} days`
                  : `${calculateDaysRemaining(project?.deliveryDate)} days`}
              </p>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Budget
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatCurrency(project?.totalPaid)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Used Amount
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatCurrency(project?.usedAmount)}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Remaining Budget
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatCurrency(project?.totalPaid - project?.usedAmount)}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Progress
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Completion</span>
                <span className="font-medium text-gray-800">
                  {project?.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${getProgressColor(
                    project?.progress
                  )} transition-all duration-300`}
                  style={{ width: `${project?.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Assigned Engineers ({project?.approvedEngineers?.length})
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              {project?.approvedEngineers?.map((engineer) => (
                <div
                  key={engineer._id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={engineer.profileImage}
                      alt={engineer.firstName}
                      width={1000}
                      height={1000}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {engineer.firstName} {engineer.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{engineer.email}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Approved
                  </span>
                </div>
              ))}

              {project?.approvedEngineers?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No engineers assigned yet
                </p>
              )}
            </div>
          </div>

          {/* Project Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Timeline
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {project?.totalTimeline} days
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Last Updated
              </h2>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {formatDate(project?.updatedAt)}
              </p>
            </div>
          </div>

          {/* NDA Agreement */}
          {project?.ndaAgreement && project.ndaAgreement.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                NDA Agreements
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  {project.ndaAgreement.length} NDA agreement(s) signed
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProjectModal;
