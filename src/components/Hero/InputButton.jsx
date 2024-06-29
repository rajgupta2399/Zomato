import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

function InputButton(props) {


  const { SearchText } = props;


  const [searchRes, setSearchRes] = useState("");
  const [listOfRest, setListOfRest] = useState([]);

  const filteredRestaurants = listOfRest.filter((res) => {
    return res.info.name.toLowerCase().includes(searchRes.toLowerCase());
  });

  const Fetchres = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7111675&lng=77.0722759&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRest(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  useEffect(() => {
    Fetchres();
  }, []);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 searchInput">
      <Input
        type="email"
        placeholder="Search For Restaurant"
        className="outline-none w-full"
        name="input"
        id="input"
        value={searchRes}
        onChange={(e) => {
          setSearchRes(e.target.value);
        }}
      />
      <Button
        type="submit"
        className="bg-red-500 hover:bg-red-600 searchInputButton"
        onClick={() => SearchText(filteredRestaurants)}
      >
        Search
      </Button>
    </div>
  );
}

export default InputButton;
