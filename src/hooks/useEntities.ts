import {MutateMethods} from "./useEntity";
import {AxiosError} from "axios";
import {BaseService} from "../services/BaseService";
import {IEntity} from "../types/IEntity";
import {Reducer, useEffect, useReducer} from "react";

export interface EntitiesMutateInput<T, InputT = T> {
  data: T[] | InputT[];
  method: MutateMethods;
}

export interface EntitiesState<T> {
  entities: Map<number, T>;
  loading: boolean;
  error: AxiosError<T[]> | null;
}

export interface EntitiesResult<T, InputT = T> extends EntitiesState<T> {
  useMutate: (input: EntitiesMutateInput<T, InputT>) => void;
}

function initEntitiesState<T>(): EntitiesState<T> {
  return {
    entities: new Map<number, T>(),
    loading: true,
    error: null
  }
}

export enum EntitiesStateActionType {
  SET_ENTITIES,
  REMOVE_ENTITIES,
  FETCHING_ENTITIES,
  ERROR,
  NO_ERROR
}

export interface EntitiesStateAction<T> {
  type: EntitiesStateActionType;
  data?: T[] | null;
  error?: AxiosError<T[]> | null;
}

function entitiesStateReducer<T extends IEntity>(state: EntitiesState<T>, action: EntitiesStateAction<T>): EntitiesState<T> {
  let newState = {...state};
  switch (action.type) {
    case EntitiesStateActionType.SET_ENTITIES:
      if (action.data) {
        for (let entity of action.data) {
          newState.entities.set(entity.id, entity);
        }
      }
      newState.loading = false;
      newState.error = null;
      break;
    case EntitiesStateActionType.REMOVE_ENTITIES:
      if (action.data) {
        for (let entity of action.data) {
          newState.entities.delete(entity.id);
        }
      }
      newState.loading = false;
      newState.error = null;
      break;
    case EntitiesStateActionType.FETCHING_ENTITIES:
      newState.loading = true;
      break;
    case EntitiesStateActionType.ERROR:
      if (action.error)
        newState.error = action.error;
      newState.loading = false;
      break;
    case EntitiesStateActionType.NO_ERROR:
      newState.error = null;
      newState.loading = false;
      break;
  }
  return newState;
}

export function useEntities<T extends IEntity, InputT = T>(service: BaseService<T, InputT>): EntitiesResult<T, InputT> {
  // TODO: Add paginator support( Pagination schema is unable to determine now ).
  // TODO: Merge useEntities and useEntitiesSearch. ( Too much duplicate codes ).
  const [state, dispatch] = useReducer<Reducer<EntitiesState<T>, EntitiesStateAction<T>>>(entitiesStateReducer, initEntitiesState());

  useEffect(() => {
    let fetchEntities = async () => {
      dispatch({type: EntitiesStateActionType.FETCHING_ENTITIES});
      let entities = await service.getAll();
      dispatch({type: EntitiesStateActionType.SET_ENTITIES, data: entities});
    };
    try {
      fetchEntities();
    } catch (e) {
      dispatch({type: EntitiesStateActionType.ERROR, error: e});
    }
  }, [service]);

  function useEntitiesMutate({data, method}: EntitiesMutateInput<T, InputT>) {

  }

  return {
    entities: state.entities,
    loading: state.loading,
    error: state.error,
    useMutate: useEntitiesMutate
  }
}

export function useEntitiesSearch<T, InputT = T>() {

}
