<template>
  <v-container>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" lg="12">
        <v-card>
          <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="1">Applicants</v-tab>
            <v-tab value="2">Ratings</v-tab>
            <v-tab value="3">
              <v-icon color="info" icon="mdi-plus" size="x-large"></v-icon>
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">

            <v-window-item value="1">
              <v-container fluid>
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="12" md="12">
                    <v-sheet class="mx-auto">
                      <h2>Clients Ratings</h2>
                      <v-table density="compact" hover>
                        <thead>
                        <tr>
                          <th class="text-left">Prenume</th>
                          <th class="text-left">Nume</th>
                          <th class="text-left">Studii</th>
                          <th class="text-left">Varsta</th>
                          <th class="text-left">Tip venit</th>
                          <th class="text-left">Istoric</th>
                          <th class="text-left">Credite deschise</th>
                          <th class="text-left">Venit lunar</th>
                          <th class="text-left">Datorie lunara</th>
                          <th class="text-left">DTI</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="client in clientsStore.clients" :key="client._id">
                          <td>{{ client.firstName }}</td>
                          <td>{{ client.lastName }}</td>
                          <td>{{ client.studies }}</td>
                          <td>{{ client.age }}</td>
                          <td>{{ client.typeOfIncome }}</td>
                          <td>{{ client.creditHistory }}</td>
                          <td>{{ client.existingCreditAccounts }}</td>
                          <td>{{ client.income }}</td>
                          <td>{{ client.outstandingDebt }}</td>
                          <td>{{ client.dtiRatio }}</td>



                        </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>


            <v-window-item value="2">
              <v-container fluid>
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="12" md="12">
                    <v-sheet width="700" class="mx-auto">
                      <h2>Clients Ratings</h2>
                      <v-table density="compact" hover>
                        <thead>
                        <tr>
                          <th class="text-left">Prenume</th>
                          <th class="text-left">Nume</th>
                          <th class="text-left">Scor total</th>
                          <th class="text-left">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="clientRating in clientsRatingsStore.clientsRatings" :key="clientRating._id">
                          <td>{{ clientRating.firstName }}</td>
                          <td>{{ clientRating.lastName }}</td>
                          <td>{{ clientRating.totalCreditScore }}</td>
                          <td>{{ clientRating.creditRating }}</td>
                        </tr>
                        </tbody>
                      </v-table>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>


            <v-window-item value="3">
              <v-container fluid>
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="12" md="12">
                    <v-sheet width="700" class="mx-auto">
                      <h1>Aplicant</h1>
                      <v-form @submit.prevent>
                        <v-card class="mx-auto">
                          <v-card-title class="text-h6 font-weight-regular justify-space-between">
                            <span>{{ currentTitle }}</span>
                            <v-avatar color="primary" size="24">{{ step }}</v-avatar>
                          </v-card-title>

                          <v-window v-model="step">
                            <v-window-item :value="1">
                              <v-card-text>
                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="lastName" label="Nume"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="firstName" :rules="rules" label="Prenume"></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-text-field v-model="cnp" label="CNP"></v-text-field>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="series" label="Serie"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="seriesNumber" label="Numar"></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="sex" label="Sex"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="age" label="Varsta"></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="countyOfBirth" label="Judetul natal"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="placeOfBirth" label="Locul nasterii"></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-select :items="studiesEnum" v-model="studies" label="Studii"></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="nationality" label="Nationalitate"></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2">
                              <v-card-text>
                                <v-row>
                                  <v-col>
                                    <v-checkbox v-model="politicalExposure"
                                                label="Persoana expusa polic?(Da)"></v-checkbox>
                                  </v-col>
                                  <v-col>
                                    <v-checkbox v-model="ownsCar" label="Proprietar autoturism?(Da)"></v-checkbox>
                                  </v-col>
                                </v-row>
                                <v-text-field v-model="dependents" label="Numar persoane in intretinere"></v-text-field>
                                <v-select :items="relationshipEnum" v-model="relationshipStatus"
                                          label="Situatie familiala"></v-select>
                                <v-text-field v-if="!isSingle" v-model="relationshipAge"
                                              label="Vechimea situatiei familiala (ani)"></v-text-field>

                                <v-row>
                                  <v-col>
                                    <v-select v-model="occupation" :items="occupationEnum" label="Ocupatie"></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-select v-model="typeOfIncome" :items="typeOfIncomeEnum"
                                              label="Tip venit"></v-select>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-select v-model="employmentIndustry" :items="industriesStore.industries"
                                              label="Sector activitate"></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-select v-model="profession" :items="professionsStore.professions"
                                              label="Profesie"></v-select>
                                  </v-col>
                                </v-row>
                                <v-text-field v-model="lengthOfEmployment"
                                              label="Numar de ani in campul muncii"></v-text-field>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="income" label="Venit net lunar"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="outstandingDebt" label="Datorii lunare"></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="existingCreditAccounts"
                                                  label="Credite existente"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-select v-model="creditHistory" :items="creditHistoryEnum"
                                              label="Istoric credite"></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-select v-model="paymentHistory" :items="paymentHistoryEnum"
                                              label="Istoric platnic"></v-select>
                                  </v-col>

                                </v-row>
                              </v-card-text>
                            </v-window-item>


                            <v-window-item :value="3">
                              <v-card-text>
                                <v-row>
                                  <v-col>
                                    <v-text-field label="Email" placeholder="john@google.com"></v-text-field>
                                    <span class="text-caption text-grey-darken-1">This is the email you will use to login to your Vuetify account</span>
                                  </v-col>
                                  <v-col>
                                    <v-text-field label="Numar de telefon"></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                            </v-window-item>

                          </v-window>

                          <v-divider></v-divider>


                          <v-card-actions>
                            <v-btn v-if="step > 1" variant="text" @click="step--">Back</v-btn>
                            <!--                                <v-spacer></v-spacer>-->
                            <v-btn v-if="step < 3" color="primary" variant="flat" @click="step++">Next</v-btn>
                            <v-btn v-if="step === 3" @click="printData" type="submit" block>Submit</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-sheet>
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


import {onMounted} from 'vue';
import {useProfessionsStore} from '@/store/professions/professions';
import {useIndustriesStore} from "@/store/industries/industries";

import {useRatingsStore} from "@/store/ratings/ratings";
import {useClientsStore} from "@/store/clients/clients";


export default {

  setup() {
    const professionsStore = useProfessionsStore();
    const industriesStore = useIndustriesStore();
    const clientsRatingsStore = useRatingsStore();
    const clientsStore = useClientsStore();


    onMounted(async () => {
      await professionsStore.getProfessions();
      await industriesStore.getIndustries();

      await clientsRatingsStore.getRatings();
      await clientsStore.getClients();
    });


    return {
      professionsStore,
      industriesStore,

      clientsRatingsStore,
      clientsStore
    };
  },
  data: () => ({
    tab: null,
    step: 1,

    studiesEnum: ['Liceu', 'Universitate', 'Postlicela', 'Studii Primare'],
    relationshipEnum: ['Necasatorit', 'Casatorit', 'Concubinaj', 'Divortat', 'Vaduv'],
    typeOfIncomeEnum: ['Pensie', 'Salariu'],
    occupationEnum: ['Angajat', 'Pensionar'],
    creditHistoryEnum: ["Foarte bun", "Bun", "Fara istoric"],
    paymentHistoryEnum: ["Foarte bun platnic", "Bun platnic", "Rau platnic"],


    dateOfBirth: "",
    firstName: '',
    lastName: '',
    cnp: '',
    sex: '',
    placeOfBirth: '',
    countyOfBirth: '',
    series: '',
    seriesNumber: '',
    studies: '',
    age: null,
    nationality: '',
    politicalExposure: null,
    ownsCar: null,
    dependents: null,
    relationshipStatus: '',
    relationshipAge: '',
    income: null,
    lengthOfEmployment: null,
    outstandingDebt: null,
    occupation: '',
    typeOfIncome: '',
    employmentIndustry: '',
    profession: '',
    creditHistory: '',
    paymentHistory: '',
    existingCreditAccounts: null,
    rules: [
      value => {
        if (value) return true
        return ''
      },
    ],
  }),
  methods: {
    printData() {
      this.createCNP(this.cnp);
      const client = {
        dateOfBirth: this.dateOfBirth,
        firstName: this.firstName,
        lastName: this.lastName,
        cnp: Number(this.cnp),
        sex: this.sex,
        placeOfBirth: this.placeOfBirth,
        countyOfBirth: this.countyOfBirth,
        series: this.series,
        seriesNumber: this.seriesNumber,
        studies: this.studies,
        age: Number(this.age),
        nationality: this.nationality,
        politicalExposure: this.politicalExposure,
        ownsCar: this.ownsCar,
        dependents: Number(this.dependents),
        relationshipStatus: this.relationshipStatus,
        relationshipAge: Number(this.relationshipAge),
        income: Number(this.income),
        lengthOfEmployment: Number(this.lengthOfEmployment),
        outstandingDebt: Number(this.outstandingDebt),
        occupation: this.occupation,
        typeOfIncome: this.typeOfIncome,
        employmentIndustry: this.employmentIndustry,
        profession: this.profession,
        creditHistory: this.creditHistory,
        paymentHistory: this.paymentHistory,
        existingCreditAccounts: Number(this.existingCreditAccounts),
      }
      this.clientsStore.addClient(client);
    },
    createCNP(cnp) {
      let an = "";
      const luna = cnp[3] + cnp[4];
      const zi = cnp[5] + cnp[6];


      if (cnp[0] === "1" || cnp[0] === '2') {
        an = "19";
      }
      if (cnp[0] === '5' || cnp[0] === '6') {
        an = "20"
      }
      an += cnp[1] + cnp[2];

      this.dateOfBirth = luna + "/" + zi + "/" + an;
    }
  },
  computed: {
    isSingle() {
      return (this.relationshipStatus === '' || this.relationshipStatus === 'Necasatorit');
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Date personale'
        case 2:
          return 'Date financiare'
        default:
          return 'Date de contact'
      }
    },
  },
}
</script>
