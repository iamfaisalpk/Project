import React from 'react'

const Pictures = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-15 max-auto flex flex-wrap">
                <div className="flex flex-wrap md:-m-2 -m-1 ">
                    <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-x-4 hover:skew-y-3 transition duration-600">
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKXliTDaSj7Fsbiiq_jMWWbR_GC68WVYy77Q&s" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block " 
                                src="https://img.joomcdn.net/cf58b57ac7a3828dea24a08efbce1d4753a44b3a_original.jpeg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://m.media-amazon.com/images/I/71zp+p4QxmL._AC_UY900_.jpg" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap w-1/2 hover:scale-75 hover:translate-y-4 hover:skew-y-3 transition duration-600">
                        <div className="md:p-2 p-1 w-full">
                            <img 
                                alt="products" 
                                className="w-full h-full object-cover object-center block" 
                                src="https://ae01.alicdn.com/kf/S0884ef1f83c6485aa7c7dab9ceb00de7N.jpg_640x640q90.jpg?width=790&height=950&hash=1740" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://ae01.alicdn.com/kf/S5ce00436fb51437e9ff203e0508cdd29A.jpg_640x640q90.jpg" 
                            />
                        </div>
                        <div className="md:p-2 p-1 w-1/2">
                            <img 
                                alt="products" 
                                className="w-full object-cover h-full object-center block" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BJq_aVV30w8g3PakXHtYfLpsuMsiAEL9IA&s" 
                            />
                        </div>
                    </div>
                </div>
                </div>
                
            </section>
        </>
    )
}

export default Pictures;
