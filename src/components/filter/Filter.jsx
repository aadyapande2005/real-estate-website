import React from 'react'
import "./Filter.scss";

function Filter() {
	return (
		<div className="filter">
			<h2>Search results for</h2>
			<div className="top">
				<label htmlFor="city">Location</label>
				<input type="text" id='city' placeholder='Search for city' />
			</div>
			<div className="bottom">
				<div className="item">
					<label htmlFor="type">Type</label>
					<select name="type" id="type">
						<option value="any">any</option>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
					</select>
				</div>

				<div className="item">
					<label htmlFor="property">property</label>
					<select name="property" id="property">
						<option value="any">any</option>
						<option value="office">office</option>
						<option value="flat">flat</option>
						<option value="condo">condo</option>
						<option value="land">land</option>
					</select>
				</div>

				<div className="item">
					<label htmlFor="maxPrice">Max Price</label>
					<input type="number" name="maxPrice" id="maxPrice" placeholder='any' />
				</div>

				<div className="item">
					<label htmlFor="minPrice">Min Price</label>
					<input type="number" name="minPrice" id="minPrice" placeholder='any' />
				</div>

				<div className="item">
					<label htmlFor="bedroom">Bedroom</label>
					<input type="number" name="bedroom" id="bedroom" placeholder='any' />
				</div>

				<button type="submit">
					<img src="search.png" alt="" />
				</button>
			</div>


		</div>
	)
}

export default Filter