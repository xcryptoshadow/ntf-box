/**
 * hooks
 * 根据pagination和filter获取列表
 */
import { useRouter } from 'next/router'
import React from 'react'

import { IPage } from '@/types'
import { serialize } from '@/utils/string'

const toSearch = (pagination: IPage, filter: any) => {
  const prefix = '?'
  const search = serialize({
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filter
  })

  return prefix + search
}

type StateType<T1, T2> = {
  list: T1[]
  pagination: IPage
  filter: T2
  fetching: boolean
  hasMore: boolean
}

function reducer<T1, T2>(state: StateType<T1, T2>, action: any): StateType<T1, T2> {
  switch (action.type) {
    case 'SET_LIST':
      return { ...state, list: [...action.payload] }
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...action.payload } }
    case 'SET_FILTER':
      return {
        ...state,
        filter: { ...action.payload },
        pagination: { ...state.pagination, page: 1 }
      }
    case 'SET_FETCHING':
      return { ...state, fetching: action.payload }
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload }
    default:
      return state
  }
}

export const useList = <T1, T2 = { [key: string]: any }>(
  getList: (params: IPage & T2) => Promise<{ list: T1[]; total: number; hasMore: boolean }>,
  _filter: T2,
  _pagination?: IPage,
  deps: any[] = [],
  syncUrl = true
) => {
  const initialState: StateType<T1, T2> = {
    list: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      ..._pagination
    },
    filter: _filter,
    fetching: false,
    hasMore: true
  }
  const [state, dispatch] = React.useReducer<
    React.Reducer<StateType<T1, T2>, any>,
    StateType<T1, T2>
  >(reducer, initialState, (state: StateType<T1, T2>) => state)

  const { pathname, replace } = useRouter()
  const search = toSearch(state.pagination, state.filter)

  const newState = React.useRef(state)
  React.useEffect(() => {
    newState.current = state
  }, [state])

  React.useEffect(() => {
    if (syncUrl) {
      replace({
        pathname,
        search: serialize({
          ...state.filter
        })
      })
    }
  }, [state.filter])

  React.useEffect(() => {
    dispatch({ type: 'SET_FETCHING', payload: true })
    getList({ ...newState.current.pagination, ...newState.current.filter })
      .then(({ list, total, hasMore }) => {
        dispatch({ type: 'SET_PAGINATION', payload: { ...newState.current.pagination, total } })
        dispatch({ type: 'SET_HAS_MORE', payload: hasMore })
        if (newState.current.pagination.page === 1) {
          dispatch({ type: 'SET_LIST', payload: list })
        } else {
          dispatch({ type: 'SET_LIST', payload: newState.current.list.concat(list) })
        }
      })
      .finally(() => {
        dispatch({ type: 'SET_FETCHING', payload: false })
      })
  }, [search, ...deps])

  return {
    state,
    action: {
      setList: (list: T1[]) => dispatch({ type: 'SET_LIST', payload: list }),
      setFilter: (filter: T2) => dispatch({ type: 'SET_FILTER', payload: filter }),
      setPagination: (pagination: Partial<IPage>) =>
        dispatch({ type: 'SET_PAGINATION', payload: pagination }),
      setFetching: (fetching: boolean) => dispatch({ type: 'SET_FETCHING', payload: fetching })
    }
  }
}