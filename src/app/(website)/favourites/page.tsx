import React from "react";
import FavouritesContainer from "./_components/favourites-container";
import ActiveProjects from "./_components/active-project";

const FavouritesPage = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <FavouritesContainer />
        </div>
        <div>
          <ActiveProjects />
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
