import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useDataStore = create(
  persist(
    (set, get) => ({
      data: [],
      loading: false,
      error: null,
      datasets :{
        income: 0,
        expense: 0,

      },
      
      fetchaccount: async () => {
        console.log("fetching accounts");
        set({ loading: true, error: false });

        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_PROD_URL
              : process.env.REACT_APP_BACKEND_URL;

          const response = await axios.get(`${baseUrl}/api/getaccounts`, {
            withCredentials: true,
          });
          set({ data: response.data, loading: false });
        } catch (err) {
          set({ loading: false, error: err.message });
          console.error("getting accounts failed", err.message);
        }
      },

      addAccounts: async (e, new_account) => {
        e.preventDefault();
        const previousData = get().data;
        // Optimistic UI update before database update
        set((state) => ({
          data: [...state.data, new_account],
        }));

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_BACKEND_URL;

        try {
          await axios.post(`${baseUrl}/api/accounts`, new_account, {
            withCredentials: true,
          });
          console.log("added accounts");
          alert("added accounts");
          get().fetchaccount();
        } catch (err) {
          console.error("Error adding accounts", err.message);
          // Rollback on failure
          set({ data: previousData });
        }
      },
      calculate: async () => {
        try {
          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.REACT_APP_PROD_URL
              : process.env.REACT_APP_BACKEND_URL;
          const response = await axios.get(`${baseUrl}/api/getData`,{withCredentials:true});
          set((state)=>({
            ...state.datasets,
            income:response.data.income,
            expense:response.data.expense
          }))

        } catch (err) {
          console.error(err.message)
        }
      },
    }),
    { name: "data-storage" } // ✅ Persist config
  )
);

export default useDataStore;
