import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";
import { setActiveCategory } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import TourBlock from "../components/TourBlock";
import Skeleton from "../components/TourBlock/Skeleton";
import { allTours } from "../mocFiles/tours";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const dispatch = useDispatch();
  const сategoryId = useSelector((state) => state.filter.categoryId);
  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tours] = React.useState(allTours);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [elementsOnPage] = React.useState(6);
  const lastTourOnPage = currentPage * elementsOnPage;
  const firstTourOnPage = lastTourOnPage - elementsOnPage;
  const [sortType, setSortType] = React.useState({
    name: "popularity",
    sortProperty: "rating",
  });

  const onChangeCategory = (id, category) => {
    dispatch(setCategoryId(id));
    dispatch(setActiveCategory(category));
    setCurrentPage(1);
  };

  const setCurrentPageHandler = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };

  const filterByCategory = (category) => {
    if (activeCategory === "All") return true;
    if (activeCategory === category) return true;
    return false;
  };

  const sortTourHandler = (tours) => {
    switch (sortType.name) {
      case "price":
        return tours.sort(
          (a, b) =>
            a.valueByAllTypes[0]["price"] - b.valueByAllTypes[0]["price"]
        );
      case "popularity":
        return tours.sort((a, b) => a.rating - b.rating);
      case "alphabet":
        return tours.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      default:
        return [];
    }
  };

  const allSortedAndFilteredTours = sortTourHandler(tours).filter((objTour) => {
    if (
      filterByCategory(objTour.category) &&
      objTour.title.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const currentTours = allSortedAndFilteredTours.slice(
    firstTourOnPage,
    lastTourOnPage
  );

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 300);
    window.scrollTo(0, 0);
  }, []);

  const toursFiltred = currentTours.map((objTour) => (
    <TourBlock
      key={objTour.id}
      id={objTour.id}
      title={objTour.title}
      price={objTour.price}
      image={objTour.imageUrl}
      days={objTour.days}
      transport={objTour.transport}
      valueByAllTypes={objTour.valueByAllTypes}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={сategoryId} onClickCategory={onChangeCategory} />
        <Sort
          value={sortType}
          onChangeSort={(obj) => {
            setSortType(obj);
          }}
        />
      </div>
      <h2 className="content__title">All tours from Moscow</h2>
      <div className="content__items">
        {isLoading ? (
          skeletons
        ) : !!toursFiltred.length ? (
          toursFiltred
        ) : (
          <div>No tours in the selected category</div>
        )}
      </div>
      <Pagination
        allToursNumber={allSortedAndFilteredTours.length}
        elementsOnPage={elementsOnPage}
        setCurrentPageHandler={setCurrentPageHandler}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
