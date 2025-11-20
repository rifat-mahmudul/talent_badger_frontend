import React from "react";
import States from "../_components/states";
import ActiveProjects from "../_components/active-projects";
import RecentRequests from "../_components/recent-requests";

const page = () => {
  return (
    <div>
      <States />

      <div className="mt-8 flex flex-col lg:flex-row gap-8 w-full">
        <div className="lg:w-1/2">
          <ActiveProjects />
        </div>

        <div className="lg:w-1/2">
          <RecentRequests />
        </div>
      </div>
    </div>
  );
};

export default page;
