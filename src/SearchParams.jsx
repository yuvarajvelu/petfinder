import { useState, useContext } from "react";
import Result from "./Result";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestPetsData, setRequestPets] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  // const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [Breed] = useBreedList(animal);

  const result = useQuery(["Pet_Details", requestPetsData], fetchSearch);
  const pets = result?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          setRequestPets({
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={Breed.length === 0} name="breed">
            <option />
            {Breed.map((el) => (
              <option key={el}>{el}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Result pets={pets}></Result>
    </div>
  );
};

export default SearchParams;
