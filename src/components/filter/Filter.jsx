import React, { useState } from 'react'
import "./Filter.scss";
import { useSearchParams } from 'react-router-dom';

function Filter() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
	console.log(query)
  };

	return (
		<div className="filter">
			{searchParams.get("city") ? <h2>Search results for <b>{searchParams.get("city")}</b></h2> : <h2>Search for properties</h2>}
			<div className="top">
				<label htmlFor="city">Location</label>
				<input type="text" name='city' placeholder='Search for city' onChange={handleChange} defaultValue={query.city} />
			</div>
			<div className="bottom">
				<div className="item">
					<label htmlFor="type">Type</label>
					<select name="type"  onChange={handleChange} defaultValue={query.type}>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>

				<div className="item">
					<label htmlFor="property">property</label>
					<select name="property" onChange={handleChange} defaultValue={query.property}>
						<option value="apartment">apartment</option>
						<option value="house">house</option>
						<option value="condo">condo</option>
						<option value="land">land</option>
					</select>
				</div>

				<div className="item">
					<label htmlFor="maxPrice">Max Price</label>
					<input type="number" name="maxPrice"  placeholder='any' onChange={handleChange} defaultValue={query.maxPrice} />
				</div>

				<div className="item">
					<label htmlFor="minPrice">Min Price</label>
					<input type="number" name="minPrice" placeholder='any' onChange={handleChange} defaultValue={query.minPrice} />
				</div>

				<div className="item">
					<label htmlFor="bedroom">Bedroom</label>
					<input type="number" name="bedroom"  placeholder='any' onChange={handleChange} defaultValue={query.bedroom} />
				</div>

				<button type="submit" onClick={handleFilter}>
					<img src="search.png" alt="" />
				</button>
			</div>


		</div>
	)
}

export default Filter