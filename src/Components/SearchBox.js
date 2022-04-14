import React, { useState } from 'react'

const SearchBox = () => {
	const [input, setInput] = useState("");
	return (
		<input
			type = 'text'
			name = 'Photo Search'
			placeholder = 'Search for Photos'
			className = 'searchBox'
			value = {input}
			onChange = {(e)=> setInput(e.target.value)}
		/>
	)
}

export default SearchBox;