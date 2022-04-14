import React from 'react';
import './Images.css';
import { MdDownload } from 'react-icons/md';
import { FaRegThumbsUp } from 'react-icons/fa';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';


const Images = (props) => {

	const images = props.images.map((value, index)=> {
		
		return (
			<div className="individiualImage col flex-auto" key={index}>
				<div className="card w-100" style={{border: 'none'}}>
					<img src={value.urls.small} className="card-img-top" alt="" />
					<div className='info-bar d-flex p-0'>
						<div className='user-likes col p-2'>
							<h6 className='likes mb-1 p-0'><FaRegThumbsUp size={15} /> {value.likes}</h6>
							<h6 className='user-link mb-1 p-0'><a href={value.user.links.html} rel="noreferrer" target='_blank'>Photo by {value.user.name} on Unsplash</a></h6>
						</div>
						<div className='download col-2 d-flex align-items-center justify-content-center'>
							<a target='_blank' rel="noreferrer" href={value.urls.full} download><MdDownload size={30} /></a>
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className="p-2 min-vh-100">
			<div className="row d-flex m-0 my-4 px-5">
				<InfiniteScroll
					dataLength={props.images.length}
					next={props.fetch}
					hasMore={true}
					scrollThreshold	={0.8}
					loader = {<Loader />}
				>
					<Masonry breakpointCols={4} className='masonry row' style={{padding: 0,}}>
						{images}
					</Masonry>
				</InfiniteScroll>
			</div>
		</div>
	)
}

export default Images;