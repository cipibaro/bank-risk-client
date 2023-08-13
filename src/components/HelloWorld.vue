<template>
  <v-container>
    <v-dialog v-model="isEditing" max-width="600">
      <v-card>
        <v-card-title>
          Edit Client
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveEdit">
            <v-text-field v-model="editingClient.firstName" label="Prenume"></v-text-field>
            <v-text-field v-model="editingClient.lastName" label="Nume"></v-text-field>
            <v-text-field type="number" v-model="editingClient.cnp" label="CNP" @keydown.enter="createFromCNP"
                          @blur="createFromCNP" v-limit-length="13"></v-text-field>
            <v-text-field v-model="editingClient.series" v-limit-length="2" label="Serie"></v-text-field>
            <v-text-field type="number" v-model="editingClient.seriesNumber" v-limit-length="6"
                          label="Numar"></v-text-field>
            <v-select v-model="editingClient.sex" v-limit-length="1" :items="sexEnum" label="Sex"></v-select>
            <v-text-field type="number" v-model="editingClient.age" v-limit-length="2" label="Varsta"></v-text-field>
            <v-text-field v-model="editingClient.countyOfb" label="Judetul natal"></v-text-field>
            <v-text-field v-model="editingClient.placeOfBirth" label="Locul nasterii"></v-text-field>
            <v-select :items="studiesEnum" v-model="editingClient.studies" label="Studii"></v-select>
            <v-text-field v-model="editingClient.nationality" label="Nationalitate"></v-text-field>
            <v-checkbox v-model="editingClient.politicalExposure" label="Persoana expusa polic?(Da)"></v-checkbox>
            <v-checkbox v-model="editingClient.ownsCar" label="Proprietar autoturism?(Da)"></v-checkbox>
            <v-text-field type="number" v-model="editingClient.dependents"
                          v-limit-length="2" label="Numar persoane in intretinere"></v-text-field>
            <v-select :items="relationshipEnum" v-model="editingClient.relationshipStatus"
                      label="Situatie familiala"></v-select>
            <v-text-field v-if="!isSingle" type="number" v-model="editingClient.relationshipAge"
                          v-limit-length="2" label="Vechimea situatiei familiala (ani)"></v-text-field>

            <v-select v-model="editingClient.occupation" :items="occupationEnum" label="Ocupatie"></v-select>
            <v-select v-model="editingClient.typeOfIncome" :items="typeOfIncomeEnum" label="Tip venit"></v-select>


            <v-select v-model="editingClient.employmentIndustry" :items="industriesStore.industries"
                      label="Sector activitate"></v-select>

            <v-select v-model="editingClient.profession" :items="professionsStore.professions"
                      label="Profesie"></v-select>

            <v-text-field type="number" v-model="editingClient.lengthOfEmployment"
                          v-limit-length="2" label="Numar de ani in campul muncii"></v-text-field>
            <v-text-field type="number" v-model="editingClient.income" label="Venit net lunar"></v-text-field>
            <v-text-field type="number" v-model="editingClient.outstandingDebt" label="Datorii lunare"></v-text-field>
            <v-text-field type="number" v-limit-length="2" v-model="editingClient.existingCreditAccounts"
                          label="Credite existente"></v-text-field>
            <v-select v-model="editingClient.creditHistory" :items="creditHistoryEnum"
                      label="Istoric credite"></v-select>
            <v-select v-model="editingClient.paymentHistory" :items="paymentHistoryEnum"
                      label="Istoric platnic"></v-select>

            <!-- ... other form fields ... -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEdit">Save</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="12" lg="12">
        <v-card>
          <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="1">Clienti</v-tab>
            <v-tab value="2">Status</v-tab>
            <v-tab value="3">
              <v-icon color="info" icon="mdi-plus" size="x-large"></v-icon>
            </v-tab>
          </v-tabs>


          <!--      TAB WINDOW    -->
          <v-window v-model="tab">

            <!--    CLIENTS TAB   -->
            <v-window-item value="1">
              <v-container fluid>
                <v-row>
                  <v-col>
                    <v-card width="auto">
                      <v-card-title>Filters:</v-card-title>
                      <v-card-item>
                        <v-row>
                          <v-col lg="4">
                            <v-text-field :type="isNumber ? 'number' : 'text'" @keydown.enter="setFilterValue"
                                          v-if="!isVSelect" @blur="setFilterValue" v-model="tempFilterValue"
                                          :label="tempFilterValueLabel"></v-text-field>

                            <v-select v-else-if="isVSelect" :items="availableItemsForVSelectFilterValue"
                                      v-model="tempFilterValue" @blur="setFilterValue"
                                      :label="tempFilterValueLabel"></v-select>
                          </v-col>

                          <v-col lg="5">
                            <v-autocomplete @click:clear="clearFilterName" v-model="tempFilterName"
                                            @update:modelValue="selectFilter" clearable
                                            label="Search By" :items="possibleFilters">Search By
                            </v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-card-item>
                      <v-card-item>
                        <v-chip @click:close="removeFromFilters(index)" v-for="(f, index) in filter" :key="f.name"
                                closable color="secondary">
                          {{ f.name + ": " + f.value }}
                        </v-chip>
                      </v-card-item>
                    </v-card>
                  </v-col>
                  <v-col lg="3">

                  </v-col>
                </v-row>
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="12" md="12">
                    <v-sheet class="mx-auto">
                      <v-table density="compact" hover show-select>
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
                          <th class="text-left">Actiuni</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr v-for="client in clientsStore.clients" :key="client._id">
                          <td>{{ client.firstName }}</td>
                          <td>{{ client.lastName }}</td>
                          <td>{{ client.studies }}</td>
                          <td> {{ client.age }}</td>
                          <td>{{ client.typeOfIncome }}</td>
                          <td>{{ client.creditHistory }}</td>
                          <td>{{ client.existingCreditAccounts }}</td>
                          <td>{{ client.income }}</td>
                          <td>{{ client.outstandingDebt }}</td>
                          <td>{{ client.dtiRatio.toFixed(4) }}</td>
                          <td>
                            <v-btn color="primary" icon="mdi-pencil" variant="plain"
                                   @click="editClient(client)"></v-btn>
                            <v-btn color="green" icon="mdi-minus-circle" variant="plain"
                                   @click="deleteClient(client)"></v-btn>
                          </td>
                        </tr>
                        </tbody>
                      </v-table>

                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>

            <!--RATINGS TAB-->
            <v-window-item value="2">
              <v-container fluid>
                <v-row class="d-flex align-center justify-center">
                  <v-col cols="12" md="12">
                    <v-sheet width="850" class="mx-auto">
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

            <!--     ADD FORM       -->
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

                            <!-- PERSONAL DATA        -->
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

                                <v-text-field v-model="cnp" type="number" v-limit-length="13" label="CNP"
                                              @keydown.enter="createFromCNP" @blur="createFromCNP"></v-text-field>
                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="series" v-limit-length="2" label="Serie"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="seriesNumber" type="number" v-limit-length="6"
                                                  label="Numar"></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-col>
                                    <v-select v-model="sex" v-limit-length="1" :items="sexEnum" label="Sex"></v-select>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="age" type="number" v-limit-length="2"
                                                  label="Varsta"></v-text-field>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="countyOfb" label="Judetul natal"></v-text-field>
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

                            <!--FINANCIAL DATA-->
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
                                <v-text-field v-model="dependents" type="number" v-limit-length="2"
                                              label="Numar persoane in intretinere"></v-text-field>
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
                                <v-text-field v-model="lengthOfEmployment" type="number" v-limit-length="2"
                                              label="Numar de ani in campul muncii"></v-text-field>

                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="income" type="number" v-limit-length="10"
                                                  label="Venit net lunar"></v-text-field>
                                  </v-col>
                                  <v-col>
                                    <v-text-field v-model="outstandingDebt" type="number" v-limit-length="10"
                                                  label="Datorii lunare"></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="existingCreditAccounts" type="number" v-limit-length="2"
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

                            <!--CONTACT DATA-->
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
                            <v-btn v-if="step === 3" @click="addClient" type="submit" block>Submit</v-btn>
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
      await clientsStore.getClients([]);
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
    selectedClients: [],

    isEditing: false,
    editingClient: null,
    originalClient: null,

    possibleFilters: ['Nume', 'Prenume', 'Studii', 'Varsta', 'Tip Venit', 'Istoric', 'Credite deschise', 'Venit', 'Datorie'],

    possibleFiltersKeyPair: [
      {
        name: 'Nume',
        value: 'lastName'
      },
      {
        name: 'Prenume',
        value: 'firstName'
      },
      {
        name: 'Studii',
        value: 'studies'
      },
      {
        name: 'Varsta',
        value: 'age'
      },
      {
        name: 'Tip Venit',
        value: 'typeOfIncome'
      },
      {
        name: 'Istoric',
        value: 'creditHistory'
      },
      {
        name: 'Credite deschise',
        value: 'existingCreditAccounts'
      },
      {
        name: 'Venit',
        value: 'income'
      },
      {
        name: 'Datorie',
        value: 'outstandingDebt'
      },
    ],

    tempFilterName: '',
    tempFilterValue: '',
    tempFilterValueLabel: 'Value',

    availableItemsForVSelectFilterValue: [],

    filter: [],
    apiFilterByName: '',

    sexEnum: ['M', 'F'],
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
    countyOfb: '',
    series: '',
    seriesNumber: '',
    studies: '',
    age: null,
    nationality: '',
    politicalExposure: null,
    ownsCar: null,
    dependents: null,
    relationshipStatus: '',
    relationshipAge: 0,
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
    rules:
      [
        value => {
          if (value) return true
          return ''
        },
      ],
  }),
  methods: {
    addClient() {
      this.createFromCNP(this.cnp);
      if (this.isSingle) {
        this.relationshipAge = 0;
      }
      const client = {
        dateOfBirth: this.dateOfBirth,
        firstName: this.firstName,
        lastName: this.lastName,
        cnp: Number(this.cnp),
        sex: this.sex,
        placeOfBirth: this.placeOfBirth,
        countyOfb: this.countyOfb,
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
    selectFilter(filter) {
      if (filter !== null) {
        this.tempFilterName = filter;
        this.tempFilterValueLabel = filter;

        const filterValue = this.possibleFiltersKeyPair.find(f => f.name === filter);

        this.apiFilterByName = filterValue.value;

        switch (filter) {
          case 'Studii':
            this.availableItemsForVSelectFilterValue = this.studiesEnum;
            break;
          case 'Tip Venit':
            this.availableItemsForVSelectFilterValue = this.typeOfIncomeEnum;
            break;
          case 'Istoric':
            this.availableItemsForVSelectFilterValue = this.creditHistoryEnum;
            break;
          default :
            this.availableItemsForVSelectFilterValue = [];
            break;
        }
      }
    },
    setFilterValue() {
      if (this.tempFilterName !== '' && this.tempFilterValue !== '') {

        const existingFilter = this.filter.find(filter => filter.name === this.tempFilterName);
        if (existingFilter) {
          // Update the value of the existing filter
          existingFilter.value = this.tempFilterValue;
        } else {
          // Add a new filter
          this.filter.push({
            name: this.tempFilterName,
            value: this.tempFilterValue,
            apiValue: this.apiFilterByName
          });
        }

        this.tempFilterValue = '';
        this.tempFilterName = '';
        this.tempFilterValueLabel = 'Value';
      }

      this.clientsStore.getClients(this.filter);
    },
    removeFromFilters(index) {
      this.filter.splice(index, 1);
      this.clientsStore.getClients(this.filter);
    },
    clearFilterName() {
      this.tempFilterValueLabel = 'Value';
    },
    createFromCNP() {
      if (!this.isEditing && this.cnp === '') {
        // Reset age and sex
        this.age = '';
        this.sex = '';
        return;
      }

      let cnp = "";

      if (this.isEditing) {
        cnp = this.editingClient.cnp;
      } else {
        cnp = this.cnp;
      }

      const birthYearPrefix = cnp[0]; // The first digit of CNP
      const birthYearSuffix = cnp.slice(1, 3);
      const birthMonth = cnp.slice(3, 5);
      const birthDay = cnp.slice(5, 7);

      // Extract sex from CNP
      const sex = birthYearPrefix === "1" || birthYearPrefix === "5" ? "M" : "F";

      // Calculate birth year
      const currentYear = new Date().getFullYear();
      const birthYear = birthYearPrefix === "1" || birthYearPrefix === "2" ? "19" : "20";
      const fullBirthYear = birthYear + birthYearSuffix;

      // Calculate age
      const age = currentYear - Number(fullBirthYear);

      if (age < 18 || age > 99) {

          return;
      }

      if (this.isEditing) {
        this.editingClient.dateOfBirth = new Date(`${fullBirthYear}-${birthMonth}-${birthDay}`);
        this.editingClient.age = age;
        this.editingClient.sex = sex;
      } else {
        this.dateOfBirth = new Date(`${fullBirthYear}-${birthMonth}-${birthDay}`);
        this.age = age;
        this.sex = sex;
      }
      console.log("Sex:", sex); // Output: Sex: M
      console.log("Age:", age); // Output: Age: 76
    },
    editClient(client) {
      // You can set the client data to the data properties used for editing
      this.editingClient = {...client};
      this.originalClient = {...client};

      const industry = this.industriesStore.ids.find(i => i._id === this.editingClient.employmentIndustry);
      const profession = this.professionsStore.prof.find(p => p._id === this.editingClient.profession);

      this.editingClient.employmentIndustry = industry.name;
      this.originalClient.employmentIndustry = industry.name;
      this.editingClient.profession = profession.name;
      this.originalClient.profession = profession.name;

      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      // this.editingClient = null;
    },
    saveEdit() {
      // Send updated client data to the server and update the client list
      // After successful update, set this.isEditing = false;
      // ...
      const updatedFields = {};
      for (const key in this.editingClient) {
        if (this.editingClient[key] !== this.originalClient[key]) {
          updatedFields[key] = this.editingClient[key];
        }
      }
      this.isEditing = false;

      this.clientsStore.updateClient(this.editingClient._id, updatedFields);
    },
    deleteClient(client) {
      if (confirm('Esti sigur ?')) {
        this.clientsStore.deleteClient(client._id);
      }
    },
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
    isVSelect() {
      return (this.tempFilterName === 'Studii' || this.tempFilterName === 'Tip Venit' || this.tempFilterName === 'Istoric');
    },
    isNumber() {
      return (this.tempFilterName === 'Varsta' || this.tempFilterName === 'Credite deschise' || this.tempFilterName === 'Venit');
    },
  },
  directives: {
    "limit-length": {
      mounted(el, binding) {
        el.addEventListener("input", (event) => {
          const maxLength = binding.value;
          if (event.target.value.length > maxLength) {
            event.target.value = event.target.value.slice(0, maxLength);
            event.preventDefault();
          }
        });
      },
    },
  },
}
</script>
