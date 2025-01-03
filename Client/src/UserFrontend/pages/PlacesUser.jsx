import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";

const PlacesUser = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5050/places/")
      .then((res) => {
        setPlaces(res.data);
        setFilteredPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    const filtered = places.filter((place) =>
      place.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-[350px] mx-auto px-40 bg-[#0b2428] flex flex-col text-center justify-center items-center ">
        <h1 className="text-[50px] font-bold text-[#fdf0d5]">Places</h1>
        <p className="text-slate-300 mt-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quod
          ipsam obcaecati quisquam enim? Excepturi ratione harum aperiam debitis
          eaque recusandae facere tenetur, tempore obcaecati vel dolorum aut,
          incidunt maiores!
        </p>
      </div>
      <div className="my-10 mx-auto max-w-7xl px-6 lg:px-8">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search places..."
          className="w-full p-4 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32a3a9]"
        />
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-[#32a3a9] sm:mt-10 lg:mx-0 lg:flex lg:items-center lg:max-w-none"
          >
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {place.name}
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {place.description}
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  This is suitable for you
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-transparent py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <img
                    className="scale-150 rounded-xl"
                    src={`http://localhost:5050/Images/${place.file}`}
                    alt={place.name}
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

export default PlacesUser;
