const Card = ({ imgSrc, title, artist, year, description, price }) => {
    return (
        <div className="max-w-sm text-left w-full dark:bg-slate-800 dark:text-white bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img src={imgSrc} alt={title} className="w-full h-64 object-cover hover:cursor-pointer transition-transform hover:scale-105 duration-300" onClick={()=>{alert(`go to ${title}'s page.`)}} />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:underline hover:cursor-pointer" onClick={()=>{alert(artist)}}>{artist}</h3>
                <h4 className="italic text-l font-semibold text-gray-600 dark:text-gray-300 hover:underline hover:cursor-pointer" onClick={()=>{alert(`Go to ${title}'s page`)}}>{`${title}, ${year}`}</h4>
                <p className="dark:text-gray-100 text-black">${price}</p>
            </div>
        </div>
    )
}

export default Card