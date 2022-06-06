import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppThunk } from '../index';
import { storeType } from './types';
export const useAppDispatch = () => useDispatch<AppThunk<AppDispatch>>()
export const useAppSelector: TypedUseSelectorHook<storeType> = useSelector