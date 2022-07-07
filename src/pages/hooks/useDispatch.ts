import { AppDispatch, RootState } from '@/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/** @description 解决 useDispatch 和 useSelector没有ts类型提示 */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
