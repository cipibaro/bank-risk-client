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
    async getRatings() {
      try {
        const response = await axiosInstance.get('/clients/ratings');
        if (response && response.data && response.data.success) {
          this.clientsRatings = response.data.clients;
        }
      } catch (error) {
        console.error('Error fetching clients ratings:', error);
      }
    },
  }
});

