import { AxiosRequestConfig } from 'axios';
import { race, delay, takeEvery,put,debounce } from 'redux-saga/effects';
import axios from './axios';

export const ACTION_TYPE = {
	MOVIE:{
		getOne: "MOVIE_GET_ONE",
		getOneRes: "MOVIE_GET_ONE_RES",
		getOneLoading : "MOVIE_GET_ONE_LOADING",
		getOneError : "MOVIE_GET_ONE_ERROR",
		getMany: "MOVIE_GET_MANY",
		getManyWithoutRes: "MOVIE_GET_MANY_WITHOUT_RES",
		getManyRes: "MOVIE_GET_MANY_RES",
		getManyLoading : "MOVIE_GET_MANY_LOADING",
		getManyError : "MOVIE_GET_MANY_ERROR"
	}
}
export const defaultStoreMovie = {
	movie:{},
	isMovieLoading: null,
	movieError: null,
	movies:[],
	page:1,
	totalMovies:0,
	isMoviesLoading: null,
	moviesError: null
};

export function storeMovie(state = defaultStoreMovie, action:IAction) {
	switch (action.type) {


		case ACTION_TYPE.MOVIE.getOneRes:
			return {
				...state,
				isMovieLoading: false,
				movie:action.payload.data
			};
		case ACTION_TYPE.MOVIE.getOneLoading:
			return {
				...state,
				isMovieLoading: true
			};
			
		case ACTION_TYPE.MOVIE.getOneError:
			return {
				...state,
				isMovieLoading: false,
				movieError: false,
			};	
	

		case ACTION_TYPE.MOVIE.getManyRes:
			return {
				...state,
				isMoviesLoading: false,
				movies: action.payload.page > 1 ? [...state.movies,...action.payload.data] : action.payload.data,
				page: action.payload.page,
				totalMovies: action.payload.total
			};

		case ACTION_TYPE.MOVIE.getManyLoading:
			return {
				...state,
				isMoviesLoading: true
			};
		
		case ACTION_TYPE.MOVIE.getManyError:
			return {
				...state,
				isMoviesLoading: false,
				moviesError: false,
			};	

		default:
			return state;
	}
}

function* getMovies({payload}:any) {
	const { search,page=1,callback} = payload
	if(!search) {
		callback(null,{res:[]})
	} else{
		const options:AxiosRequestConfig = {
			method: 'GET',
			params:{
				s: search,
				page
			}
		};
		

		const { timeout, response } = yield race({
			timeout: delay(30000),
			response: axios(options),
		});

		if (timeout) {
			callback({err:"Timeout"},null)
		} else{
			if(response){
			callback(null,{data:response.data.Search})
		}
		}	
	}
}

function* getMoviesWithRes({payload}:any) {
	try {
		yield put({
			type: ACTION_TYPE.MOVIE.getManyLoading,
		});
		const { search,page=1 } = payload
		if(!search) {
			yield put({
				type: ACTION_TYPE.MOVIE.getManyRes,
				payload: {
					data: [],
					total:0,
					page: 1
				}
			});
		} else{
			const options:AxiosRequestConfig = {
				method: 'GET',
				params:{
					s: search,
					page
				}
			};
			

			const { timeout, response } = yield race({
				timeout: delay(30000),
				response: axios(options),
			});

			if (timeout) {
				yield put({
					type:  ACTION_TYPE.MOVIE.getManyError,
					payload: {err:"Timeout"}
				});
			} else{

				
				if(response){
					yield put({
						type: ACTION_TYPE.MOVIE.getManyRes,
						payload: {
							data: response.data.Search as [IMovie],
							total:response.data.totalResults,
							page
						}
					});
				}
			}
			}
	} catch (err) {
    yield put({
			type: ACTION_TYPE.MOVIE.getManyError,
			payload: {err}
		});
	}
}

function* getMovie({payload}:any) {
	try {
		const { movieId } = payload
		const options:AxiosRequestConfig = {
			method: 'GET',
			params:{
				i: movieId,
			}
		};
		yield put({
			type: ACTION_TYPE.MOVIE.getOneRes,
			payload: {
				data: {
					imdbID:movieId
				}
			}
		});
		yield put({
			type: ACTION_TYPE.MOVIE.getOneLoading,
		});

		const { timeout, response } = yield race({
			timeout: delay(30000),
			response: axios(options),
		});
		if(timeout){
			yield put({
				type: ACTION_TYPE.MOVIE.getOneError,
				payload: {err:"Timeout"}
			});
		}else{

			if(response){
				yield put({
					type: ACTION_TYPE.MOVIE.getOneRes,
					payload: {
						data: response.data as IMovie
					}
				});
			}
			
		}
	} catch (err) {
    yield put({
			type: ACTION_TYPE.MOVIE.getOneError,
			payload: {err}
		});
	}
}


export  function* sagaMovie() {
	yield takeEvery(ACTION_TYPE.MOVIE.getMany, getMoviesWithRes);
	yield debounce(300,ACTION_TYPE.MOVIE.getManyWithoutRes, getMovies)
	yield takeEvery(ACTION_TYPE.MOVIE.getOne, getMovie);
}


