import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // We are using useCallback here to ensure, that this function would not recreate at every re-render of
    // an component, because it is always getting constant return values
    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch('https://swapi.dev/api/films');
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json();
            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                }
            })
            setMovies(transformedMovies);
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [])

    // We use function with useCallback to ensure that we will not get an infinite loop at every rerender,
    // because snapshot of fetchMoviesHandler is saved via useCallback()
    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler])

    let content = <p>Found no movies :(</p>
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (isLoading) {
        content = <p>Loading...</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
