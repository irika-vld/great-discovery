import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="tour-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="198" y="296" rx="0" ry="0" width="1" height="0" />
    <rect x="143" y="292" rx="0" ry="0" width="6" height="1" />
    <circle cx="128" cy="111" r="110" />
    <rect x="0" y="232" rx="8" ry="8" width="260" height="39" />
    <rect x="0" y="292" rx="8" ry="8" width="260" height="88" />
    <rect x="4" y="399" rx="8" ry="8" width="95" height="42" />
    <rect x="122" y="399" rx="23" ry="23" width="130" height="42" />
  </ContentLoader>
);

export default Skeleton;
