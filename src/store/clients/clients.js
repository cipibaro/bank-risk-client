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
    async getClients(filters) {
      try {
        const queryParams = filters.map(filter => `${encodeURIComponent(filter.apiValue)}=${encodeURIComponent(filter.value)}`).join('&');
        const url = '/clients?' + queryParams;

        const response = await axiosInstance.get(url);
        if (response && response.data && response.data.success) {
          this.clients = response.data.clients;
          await clientsRatingsStore.getRatings([]);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },

    /**
     * Add new client
     * @param client
     * @returns {Promise<void>}
     */
    async addClient(client) {
      try {
        const response = await axiosInstance.post("/clients", {
          firstName: client.firstName,
          lastName: client.lastName,
          cnp: client.cnp,
          sex: client.sex,
          placeOfBirth: client.placeOfBirth,
          countyOfb: client.countyOfb,
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
          await this.getClients([]);
        }
      } catch
        (error) {
        console.log("Error adding client", error);
      }
    },

    /**
     * Update client
     * @param id
     * @param client
     * @returns {Promise<void>}
     */
    async updateClient(id, client) {
      try {
        const url = "http://localhost:3000/clients/" + id;
        const response = await axiosInstance.patch(url, client);
        if (response && response.data && response.data.success) {
          console.log("Client updated successfully");
          await this.getClients([]);
        }
      } catch (error) {
        console.log(error);
      }
    },


    async deleteClient(id) {
      try {
        const response = await axiosInstance.delete('/clients/' + id);
        if (response && response.data && response.data.success) {
          console.log("Client deleted successfully");
          await this.getClients([]);
        }
      } catch (error) {
        console.log(error);
      }

    }
  }
});

