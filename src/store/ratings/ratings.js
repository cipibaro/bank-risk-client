// Utilities
import {defineStore} from 'pinia'
import axiosInstance from '@/plugins/axios';

export const useRatingsStore = defineStore('app', {
  state: () => ({
    clientsRatings: [],
  }),
  actions: {
    /**
     * Gets clients
     * @returns {Promise<void>}
     */
    async getRatings(filters) {
      try {
        const queryParams = filters.map(filter => `${encodeURIComponent(filter.apiValue)}=${encodeURIComponent(filter.value)}`).join('&');
        const url = 'clients/ratings?' + queryParams;

        const response = await axiosInstance.get(url);
        if (response && response.data && response.data.success) {
          this.clientsRatings = response.data.clients;
        }

        console.log(url);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
  }
});

