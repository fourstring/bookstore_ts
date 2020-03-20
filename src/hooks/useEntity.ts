import {BaseService} from "../services/BaseService";
import {Reducer, useEffect, useReducer} from "react";
import {AxiosError} from "axios";

export enum MutateMethods {
  POST,
  PUT,
  PATCH,
  DELETE
}

export interface MutateInput<T, InputT> {
  id: number;
  data: T | InputT;
  method: MutateMethods;
}

export interface EntityResponse<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError<T> | null;
}

export interface useEntityResult<T, InputT> extends EntityResponse<T> {
  useMutate: (input: MutateInput<T, InputT>) => void; // useMutate just set states in useEntity.
}

export interface useEntityState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError<T> | null;
}

function initEntityState<T>(): useEntityState<T> {
  return {
    data: null,
    loading: true,
    error: null
  }
}

export enum EntityStateActionType {
  SET_DATA,
  CLEAR_DATA,
  LOADING,
  FINISHED,
  ERROR,
  NO_ERROR
}

export interface EntityStateAction<T> {
  type: EntityStateActionType;
  data?: T | null;
  error?: AxiosError<T> | null;
}

function entityStateReducer<T>(state: useEntityState<T>, action: EntityStateAction<T>): useEntityState<T> {
  let newState = {...state};
  switch (action.type) {
    case EntityStateActionType.SET_DATA: // SET_DATA after fetching data successfully, so set loading and error implicitly.
      if (action.data) {
        newState.data = action.data;
      }
      newState.loading = false;
      newState.error = null;
      break;
    case EntityStateActionType.CLEAR_DATA: // CLEAR_DATA after deleting data successfully.
      newState = initEntityState<T>();
      break;
    case EntityStateActionType.LOADING: // set loading when issuing requests.
      newState.loading = true;
      break;
    case EntityStateActionType.FINISHED: // Unused, to avoid duplicate re-rendering.
      newState.loading = false;
      break;
    case EntityStateActionType.ERROR: // Error thrown during requesting. But request has finished now, so set loading implicitly.
      if (action.error) {
        newState.error = action.error;
      }
      newState.loading = false;
      break;
    case EntityStateActionType.NO_ERROR: // Unused, to avoid duplicate re-rendering.
      newState.error = null;
      break;
  }
  return newState;
}

export function useEntity<T, InputT = T>(id: number, service: BaseService<T, InputT>): useEntityResult<T, InputT> {
  const [state, dispatch] = useReducer<Reducer<useEntityState<T>, EntityStateAction<T>>>(entityStateReducer, initEntityState<T>());

  useEffect(() => {
    let fetchData: () => Promise<void> = async () => {
      dispatch({type: EntityStateActionType.LOADING});
      let result = await service.get(id);
      dispatch({type: EntityStateActionType.SET_DATA, data: result});
    };
    try {
      fetchData();
    } catch (e) {
      dispatch({type: EntityStateActionType.ERROR, error: e});
    }
  }, [id, service]);

  function useMutate({id, data, method}: MutateInput<T, InputT>): void {
    let mutateData: () => Promise<boolean | T>;
    switch (method) {
      case MutateMethods.DELETE:
        mutateData = async () => {
          let result = await service.delete(id);
          return result;
        };
        break;
      case MutateMethods.PATCH:
        mutateData = async () => {
          let result = await service.patch(id, data);
          return result;
        };
        break;
      case MutateMethods.POST:
        mutateData = async () => {
          let result = await service.post(data as InputT);
          return result;
        };
        break;
      case MutateMethods.PUT:
        mutateData = async () => {
          let result = await service.put(id, data as InputT);
          return result;
        };
        break;
    }
    let issueMutate = async () => {
      try {
        dispatch({type: EntityStateActionType.LOADING});
        let result = await mutateData();
        if (typeof result === "boolean") { // Delete operation executed.
          if (result) // Delete successfully.
            dispatch({type: EntityStateActionType.CLEAR_DATA});
        } else {
          dispatch({type: EntityStateActionType.SET_DATA, data: result});
        }
      } catch (e) {
        dispatch({type: EntityStateActionType.ERROR, error: e});
      }
    };
    issueMutate();
  }

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    useMutate
  };
}
