<template>
  <v-container>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" lg="9">
        <v-card>
          <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="1">Applicants</v-tab>
            <v-tab value="2">Ratings</v-tab>
            <v-tab value="3"><v-icon color="info" icon="mdi-plus" size="x-large"></v-icon></v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="1">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6">
                    <h2>Tab 1</h2>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>

            <v-window-item value="2">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="6">
                    <h2>Tab 2</h2>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>


            <v-window-item value="3">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="4">
                    <h2>Tab 3</h2>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {ratingsStore} from "@/store/ratings/ratings";
import {clientsStore} from "@/store/clients/clients";
import {industriesStore} from "@/store/industries/industries";
import {professionsStore} from "@/store/professions/professions";

const ratingsData = ratingsStore();
const clientsData = clientsStore();
const industriesData = industriesStore();
const professionsData = professionsStore();

ratingsData.getRatings();
clientsData.getClients();
industriesData.getIndustries();
professionsData.getProfessions();


export default {

  data: () => ({
    tab: null,
  }),

}
</script>
