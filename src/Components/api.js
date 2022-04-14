import axios from "axios";

export async function loadImages() {

	const clientId = process.env.REACT_APP_CLIENT_ID;
	const url = `https://api.unsplash.com/photos/random/?count=30&client_id=${clientId}`;
	const response = await axios.get(url);
	return response;
}

export async function searchImages(query, orientation = '', order_by = '') {

	const searchParams = new URLSearchParams({
		per_page : 30,
		...((orientation !== '' && orientation !== 'Choose Orientation') && {orientation: orientation}),
		...((order_by !== '' && order_by !== 'Sort By') && {order_by: order_by}),
		query: query
	})

	const clientId = process.env.REACT_APP_CLIENT_ID;
	const url = `https://api.unsplash.com/search/photos/?${searchParams.toString()}&client_id=${clientId}`;
	const response = await axios.get(url);
	return response;
}