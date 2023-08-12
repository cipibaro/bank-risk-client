// Utilities
import {defineStore} from 'pinia'
import axiosInstance from '@/plugins/axios';
import {useRatingsStore} from '@/store/ratings/ratings';

const clientsRatingsStore = useRatingsStore();
export const useClientsStore = defineStore('client', {
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
          await clientsRatingsStore.getRatings();
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    async addClient(client) {
      try {
        const response = await axiosInstance.post("/clients", {
          firstName: client.firstName,
          lastName: client.lastName,
          cnp: client.cnp,
          sex: client.sex,
          placeOfBirth: client.placeOfBirth,
          countyOfBirth: client.countyOfBirth,
          dateOfBirth: client.dateOfBirth,
          series: client.series,
          seriesNumber: client.seriesNumber,
          studies: client.studies,
          age: client.age,
          nationality: client.nationality,
          politicalExposure: client.politicalExposure,
          ownsCar: client.ownsCar,
          dependents: client.dependents,
          relationshipStatus: client.relationshipStatus,
          relationshipAge: client.relationshipAge,
          income: client.income,
          lengthOfEmployment: client.lengthOfEmployment,
          outstandingDebt: client.outstandingDebt,
          occupation: client.occupation,
          typeOfIncome: client.typeOfIncome,
          employmentIndustry: client.employmentIndustry,
          profession: client.profession,
          creditHistory: client.creditHistory,
          paymentHistory: client.paymentHistory,
          existingCreditAccounts: client.existingCreditAccounts
        });
        if (response && response.data && response.data.success) {
          console.log("Client added successfully");
          await this.getClients();

        }
      } catch
        (error) {
        console.log("Error adding client", error);
      }
    }
  }
});

