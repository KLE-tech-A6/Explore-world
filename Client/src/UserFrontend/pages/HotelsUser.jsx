import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HotelsUser = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/hotels/")
      .then((res) => {
        setHotels(res.data);
        setFilteredHotels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-[350px] mx-auto px-40 bg-[#0b2428] flex flex-col text-center justify-center items-center ">
        <h1 className="text-[50px] font-bold text-[#fdf0d5]">Hotels</h1>
        <p className="text-slate-300 mt-2">
          Experience comfort and luxury at our hotel, where every detail is
          designed for your relaxation. Enjoy impeccable service, elegant rooms,
          and a welcoming atmosphere that makes you feel right at home. Whether
          for business or leisure, we provide the perfect setting for an
          unforgettable stay.
        </p>
      </div>
      <div className="my-10 mx-auto max-w-7xl px-6 lg:px-8">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search hotels..."
          className="w-full p-4 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32a3a9]"
        />
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-[#32a3a9] sm:mt-10 lg:mx-0 lg:flex lg:items-center lg:max-w-none"
          >
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {hotel.name}
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {hotel.description}
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  This suitable for you.
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <div className="flex gap-10 mt-10">
                <Link to="/bookhotel">
                  <button className="px-8 py-2 rounded-full border-2 border-slate-200 shadow-lg hover:bg-[#0b2428] hover:text-white ">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-transparent py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <img
                    className=" scale-150 rounded-xl "
                    src={`http://localhost:5050/Images/${hotel.file}`}
                    alt={hotel.name}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HotelsUser;
