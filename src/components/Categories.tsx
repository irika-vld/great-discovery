import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number, category: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    "All",
    "Sea",
    "Active",
    "Excursion",
    "Family",
    "Mountains",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i, category)}
            className={value === i ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
