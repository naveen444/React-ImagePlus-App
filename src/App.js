import './App.css';
import { loadImages, searchImages } from './Components/api';
import { useEffect, useState } from 'react';
import Images from './Components/Images';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { RiImageAddFill,RiImageAddLine } from 'react-icons/ri';

function App() {

	const [images, setImage] = useState([]);
	const [search, setSearch] = useState([]);
	let [background, setBackground] = useState(true);
	const [oDropdwn, setOdropdwn] = useState(false);
	const [sDropdwn, setSdropdwn] = useState(false);
	const [oDropdwnValue, setOdropdwnValue] = useState('Choose Orientation');
	const [sDropdwnValue, setSdropdwnValue] = useState('Sort By');
	const [showFilters, setShowFilters] = useState(false);
	const [currentTarget, setCurrentTarget] = useState('Get Random');

	// Utility functions
	const searchText = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	}
	const changeBg = (e) => {
		e.preventDefault();
		setBackground(!background);
	}
	const handleOdropdown = (e) => {
		setOdropdwn(!oDropdwn);
	}
	const handleSdropdown = (e) => {
		setSdropdwn(!sDropdwn);
	}
	useEffect(() => {
		getImage();
	}, []);

	// API Calls
	const getImage = async (e) => {
		setCurrentTarget('Get Random');
		const response = await loadImages();
		setImage(response.data);
	}
	const searchThis = async (e) => {
		e.preventDefault();
		setCurrentTarget('Search');
		if (search.toString() !== '') {
			setShowFilters(true)
			const response = await searchImages(search, oDropdwnValue, sDropdwnValue);
			setImage(response.data.results);
		} else {
			setShowFilters(false)
			getImage();
		}
	}
	const oDropdownSelect = async (e) => {
		e.preventDefault();
		setOdropdwnValue(e.target.innerHTML);
		handleOdropdown();
		const response = await searchImages(search, e.target.innerHTML,sDropdwnValue);
		setImage(response.data.results);
	}
	const sDropdownSelect = async (e) => {
		e.preventDefault();
		setSdropdwnValue(e.target.innerHTML);
		handleSdropdown();
		const response = await searchImages(search, oDropdwnValue,e.target.innerHTML);
		setImage(response.data.results);
	}

	const fetch = async () => {
		if (currentTarget === 'Search') {
			if (search.toString() !== '') {
				setShowFilters(true)
				const response = await searchImages(search, oDropdwnValue, sDropdwnValue);
				setImage([...images, ...response.data.results]);
			} else {
				setShowFilters(false)
				getImage();
			}
		} else if (currentTarget === 'Get Random') {
			const response = await loadImages();
			setImage([...images, ...response.data]);
		}
	}

	return (
		<div className={`container-fluid p-2 ${background? 'bg-dark' : 'bg-light'}`}>
			<div className='p-2'>
				<div className="row m-0 my-4 px-5">
					<div className='col col-auto m-0 me-3 p-0'>
						<button className='btn bg-transparent w-100 p-1'>
							{ background ?
								<RiImageAddFill size={28} color="white" />
								:
								<RiImageAddLine size={28} />
							}
						</button>
					</div>
					<div className="col input-group ps-0">
						<input type="text" className="form-control m-0 shadow" placeholder='Try "Dog" or "Boat"' onChange={searchText} value={search} />
					</div>
					<div className='col col-1 mx-2 p-0'>
						<button className="btn btn-primary shadow w-100" onClick={searchThis}>Search</button>
					</div>
					<div className="col col-2 mx-2 p-0" style={{width: '12%'}}>
						<button className='btn btn-primary shadow w-100' onClick={getImage}>Get Random</button>
					</div>
					<div className="col col-auto ms-1 p-0">
						<button className='btn btn-primary shadow w-100 p-1' onClick={changeBg}>
							{ background ?
								<MdOutlineLightMode size={28} />
								:
								<MdOutlineDarkMode size={28} />
							}
						</button>
					</div>
				</div>
				<div className={`filters row m-0 my-4 mb-0 px-5 justify-content-end ${showFilters? 'show' : ''}`}>
					<div className='col-2 orientation p-0'>
						<div className={`dropdown ${background? 'bg-dark text-light' : 'bg-light text-dark'}`}>
							<button className={`btn btn-secondary dropdown-toggle ${background? 'bg-dark text-light' : 'bg-light text-dark'} ${oDropdwn ? 'show' : ''}`} onClick={handleOdropdown} style={{border: 'none'}}>
								{oDropdwnValue}
							</button>
							<ul className={`dropdown-menu ${background? 'bg-dark text-light' : 'bg-light text-dark'} ${oDropdwn ? 'show' : ''}`}>
								<li><button className="dropdown-item" onClick={oDropdownSelect}>landscape</button></li>
								<li><button className="dropdown-item" onClick={oDropdownSelect}>portrait</button></li>
								<li><button className="dropdown-item" onClick={oDropdownSelect}>squarish</button></li>
							</ul>
						</div>
					</div>
					<div className='col-2 sort-by p-0'>
						<div className={`dropdown ${background? 'bg-dark text-light' : 'bg-light text-dark'}`}>
							<button className={`btn btn-secondary dropdown-toggle ${background? 'bg-dark text-light' : 'bg-light text-dark'} ${sDropdwn ? 'show' : ''}`} onClick={handleSdropdown} style={{border: 'none'}}>
								{sDropdwnValue}
							</button>
							<ul className={`dropdown-menu ${background? 'bg-dark text-light' : 'bg-light text-dark'} ${sDropdwn ? 'show' : ''}`}>
								<li><button className="dropdown-item" onClick={sDropdownSelect}>relevant</button></li>
								<li><button className="dropdown-item" onClick={sDropdownSelect}>latest</button></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			
			<Images images = {images} fetch = {fetch} />
			
		</div>
	);
}

export default App;
