 import {atomWithStorage, createJSONStorage} from 'jotai/utils';
 import AsyncStorage  from "@react-native-async-storage/async-storage";
import { AuthResponse, LoginRequest } from './auth.interfaces';
import { atom } from 'jotai';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';
 
const storage = createJSONStorage<AuthState>(() => AsyncStorage)

const INITIAL_STATE = {
     accessToken: null,
    isLoading: false,
    error: null,
}

export const authAtom = atomWithStorage<AuthState>('auth' , INITIAL_STATE, storage,)

export const logoutAtom = atom(null, (_get, set) => {
   set(authAtom, INITIAL_STATE)
})

export const loginAtom = atom(
   (get) => get(authAtom),
   async (_get, set, {email, password}: LoginRequest) => {
      set(authAtom, {
      isLoading: true,
      accessToken: null,
      error: null,
      })
     try {

         const { data } = await axios.post<AuthResponse>(API.login, {
             email,
             password,
           });
           set(authAtom, {
            isLoading: false,
            accessToken: data.accessToken,
            error: null,
           })
           
     } catch (error) {
        if( error instanceof AxiosError) {
          set(authAtom, {
            isLoading: false,
            accessToken: null,
            error: error.response?.data.message,
           })
        }
     }
})

 export interface AuthState {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
}