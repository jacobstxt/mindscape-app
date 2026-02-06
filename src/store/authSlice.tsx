import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    token: string;
    roles: string[];
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

export const getUserFromToken = (token: string): User | null => {
    if (!token || typeof token !== 'string') {
        console.warn("getUserFromToken: Token is empty or not a string");
        return null;
    }

    // 2. JWT повинен мати 2 крапки (три частини)
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.warn("getUserFromToken: Invalid token format (missing parts)");
        return null;
    }

    try {
        const decoded: any = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // optional, for debugging

        // roles can be string or array
        let roles: string[] = [];
        const rawRoles =
            decoded["roles"] ??
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (typeof rawRoles === "string") roles = [rawRoles];
        else if (Array.isArray(rawRoles)) roles = rawRoles;

        // id comes as a string in your JWT
        const idStr = decoded["id"] ?? decoded["sub"] ?? decoded["nameid"] ?? "0";
        const id = Number(idStr); // safely convert string to number

        return {
            id,
            firstName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] ?? "",
            lastName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"] ?? "",
            email: decoded["email"] ?? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? "",
            image: decoded["image"] ?? "",
            token,
            roles
        };
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
};


const initialState: AuthState = {
    user: null,
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initializeAuth: (state, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.user = getUserFromToken(action.payload);
            }
            state.isLoading = false;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            const user = getUserFromToken(action.payload);
            if (user) {
                state.user = user;
                SecureStore.setItemAsync('userToken', action.payload);
            }
        },
        logout: (state) => {
            state.user = null;
            SecureStore.deleteItemAsync('userToken');
        },
    },
});

export const { initializeAuth,loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
