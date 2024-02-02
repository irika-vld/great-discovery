import { allTours } from "../mocFiles/tours";
import { useParams } from "react-router-dom";

const AdditionalInfo = () => {
  const params = useParams();
  const value = Number(params.id);

  const filtredTour = allTours.filter((tour) => value === tour.id);
  const images = filtredTour.map((img) => img.imgInfo)[0];

  return (
    <div className="container">
      <h2 className="container__description">Additional Info</h2>
      <div>
        <div className="container__info">
          <div className="container-img">
            <img className="container__info-img" alt="Tour" src={images[0]} />
            <img className="container__info-img" alt="Tour" src={images[1]} />
          </div>
          <img className="container__info-img2" alt="Tour" src={images[2]} />
        </div>
        <div>{filtredTour.map((tour) => tour.info)}</div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
