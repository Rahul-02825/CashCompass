import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTransactionStore = create(
  persist({
    transacData: [],
    loading: false,
    error: null,

    // functions

    fetchTransactions: async () => {
      set({ loading: true, error: null });
      try {
        const baseUrl =
          process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_BACKEND_URL;

        const response = await axios.get(`${baseUrl}/api/getTransactions`);
        console.log(response.data);
        set({ data: response.data, loading: true, error: null });
      } catch (err) {
        console.log(err.message);
        set({ loading: false, error: err.message });
      }
    },
    
  })
);
