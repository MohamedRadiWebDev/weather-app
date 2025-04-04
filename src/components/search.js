import { AsyncPaginate } from "react-select-async-paginate";
import {useState} from "react";
import {url,options} from "../Api"



const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
          `${url}/cities?minPopulation=100000&namePrefix=${inputValue}`,options
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
            };
          });
      };



    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
      };
    
      return (
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      );

}
 
export default Search;