import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useDataStore = create(
  persist((set, get) => ({
    data: null,
    loading: false,
    error: null,
    fetchaccount: async () => {
        console.log("fetching accounts")
      set({
        loading: true,
        error: false,
      });
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_BACKEND_URL;

        const response = await axios.get(`${baseUrl}/api/getaccounts`, {
          withCredentials: true,
        });
        set({data:response.data,loading:false})
      } 
      catch (err) {
        set({ loading: false, error: err.message });
        console.error("getting accounts failed");
      }
    },

  }))
);
export default useDataStore;