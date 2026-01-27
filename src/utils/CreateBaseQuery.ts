import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {BASE_URL} from "@/src/constants/Urls";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/${endpoint}/`,
    });