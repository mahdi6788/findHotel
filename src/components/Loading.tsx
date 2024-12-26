function Loading({isLoading}) {
    return(
        <div>
            {isLoading && <p>Loading...</p>}
        </div>
    )
}

export default Loading