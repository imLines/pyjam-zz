function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-p-purple via-p-demon-light to-p-angel-light ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-p-light rounded-full border-2 border-white"></div>
            </div>
        </div>
    )
}

export default Loading;