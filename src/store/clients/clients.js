// Utilities
import {defineStore} from 'pinia'
import axiosInstance from '@/plugins/axios';

export const clientsStore = defineStore('client', {
  state: () => ({
    clients: [],
  }),
  actions: {
    /**
     * Gets clients
     * @returns {Promise<void>}
     */
    async getClients() {
      try {
        const response = await axiosInstance.get('/clients');
        if (response && response.data && response.data.success) {
          this.clients = response.data.clients;
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
  }
});

