export enum DataStatesEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface AppDataState<T> {
    dataState?: DataStatesEnum
    data?: T
    errorMessage?: string
}