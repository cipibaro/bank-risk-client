// Utilities
import {defineStore} from 'pinia'
import axiosInstance from '@/plugins/axios';

export const industriesStore = defineStore('industry', {
  state: () => ({
    industries: [],
  }),
  actions: {
    /**
     * Gets clients
     * @returns {Promise<void>}
     */
    async getIndustries() {
      try {
        const response = await axiosInstance.get('/industries');
        if (response && response.data && response.data.success) {
          this.industries = response.data.industries;
        }
        let i = 0;
        this.industries.forEach(industry => {
          console.log(i + ". Industry name: " + industry.name);
          console.log("   Points: " + industry.score);
          i++;
        });
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    },
  }
});

