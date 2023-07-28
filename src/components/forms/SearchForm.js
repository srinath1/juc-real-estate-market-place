import React, { useContext } from "react";
import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { GOOGLE_PLACES_KEY } from "../../config";
import { sellPrices, rentPrices } from "../../helpers/pricelist";
import { GrCheckboxSelected } from "react-icons/gr";
import QueryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchForm = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  console.log("Search", search);

  const handleSearch = async () => {
    setSearch({ ...search, loading: true });
    try {
      const { results, page, price, ...rest } = search;
      console.log("rest", rest);
      const query = QueryString.stringify(rest);
      console.log("query", query);
      const data = await axios.get(`/search?${query}`);
      if (window.location.pathname !== "/search") {
        setSearch((prev) => ({
          ...prev,
          results: results.data,
          loading: false,
        }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data,
          loading: false,
          page: window.location.pathname,
        }));
      }
    } catch (error) {
      console.log(error);
      setSearch({ ...search, loading: true });
    }
  };
  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-lg-12 form-control">
            <GooglePlacesAutocomplete
              apiKey={process.env.GOOGLE_PLACES_KEY}
              apiOptions="dk"
              selectProps={{
                defaultInputValue: search?.address,
                placeholder: "Search for address..",
                onChange: ({ value }) => {
                  setSearch({ ...search, address: value.description });
                },
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mb-3 mt-3">
          <button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.action === "Buy" ? (
              <>
                <GrCheckboxSelected size="16px" colors="#666666" />
              </>
            ) : (
              "Buy"
            )}
          </button>
          <button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.action === "Rent" ? (
              <>
                <GrCheckboxSelected size="16px" colors="#666666" />
              </>
            ) : (
              "Rent"
            )}
          </button>
          <button
            onClick={() =>
              setSearch({ ...search, type: "House", price: "", action: "" })
            }
            className="btn btn-primary col-lg-2 square"
          >
            {search.type === "House" ? (
              <>
                <GrCheckboxSelected size="16px" colors="#666666" />
              </>
            ) : (
              "House"
            )}
          </button>
          <button
            onClick={() =>
              setSearch({ ...search, type: "Land", price: "", action: "" })
            }
            className="btn btn-primary col-lg-2 square"
          >
            {search.type === "Land" ? (
              <>
                <GrCheckboxSelected size="13px" colors="#666666" />
              </>
            ) : (
              "Land"
            )}
          </button>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              &nbsp; {search?.price ? search?.price : "Price"}
            </button>
            <ul className="dropdown-menu">
              {search.action === "Buy" ? (
                <>
                  {sellPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        href
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {rentPrices?.map((p) => (
                    <li key={p._id}>
                      <a
                        href
                        className="dropdown-item"
                        onClick={() =>
                          setSearch({
                            ...search,
                            price: p.name,
                            priceRange: p.array,
                          })
                        }
                      >
                        {p.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <button
            onClick={handleSearch}
            className="btn btn-danger col-lg-2 square"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
