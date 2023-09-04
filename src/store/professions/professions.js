// Utilities
import {defineStore} from 'pinia'
import axiosInstance from '@/plugins/axios';

export const useProfessionsStore = defineStore('profession', {
  state: () => ({
    professions: [],
    prof: [],
  }),
  actions: {
    /**
     * Gets clients
     * @returns {Promise<void>}
     */
    async getProfessions() {
      try {
        const response = await axiosInstance.get('/professions');
        if (response && response.data && response.data.success) {
          response.data.professions.forEach(profession => {
            this.professions.push(profession.name);
            this.prof.push(profession);
          });
        }

        /*  let i = 0;
          this.professions.forEach(profession => {
            console.log(i + ". Profesie: " + profession.name);
            console.log("   Points: " + profession.score);
            i++;
          });*/
      } catch (error) {
        console.error('Error fetching professions:', error);
      }
    },
  }
});

