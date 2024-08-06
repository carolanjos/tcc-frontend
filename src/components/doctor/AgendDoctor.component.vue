<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <v-container fluid fill-height class="d-flex justify-center align-center">
          <v-row align="center" justify="center" class="w-100">
            <v-col cols="12" sm="10" md="8" class="d-flex justify-center">
              <v-card class="elevation-12 schedule-card">
                <v-card-title class="schedule-title">Criar agenda e definir horário</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          prepend-inner-icon="mdi-clock-outline"
                          label="Hora de Início"
                          placeholder="HH:MM"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          prepend-inner-icon="mdi-clock-outline"
                          label="Hora de Término"
                          placeholder="HH:MM"
                          required
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          prepend-inner-icon="mdi-stethoscope"
                          label="Especialidade"
                          :items="especialidades"
                          required
                          outlined
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-menu
                          ref="startDateMenu"
                          v-model="startDateMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="startDate"
                              label="Data de Início"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="startDate" @input="startDateMenu = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-menu
                          ref="endDateMenu"
                          v-model="endDateMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="endDate"
                              label="Data de Término"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              outlined
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="endDate" @input="endDateMenu = false"></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox-group
                          v-model="diasSelecionados"
                          label="Dias da Semana"
                          required
                        >
                          <v-checkbox
                            v-for="dia in dias"
                            :key="dia"
                            :label="dia"
                            :value="dia"
                            class="my-1"
                          ></v-checkbox>
                        </v-checkbox-group>
                      </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          color="#2EACB2"
                          block
                          class="white--text button-width"
                        >
                          Adicionar Disponibilidade
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          color="error"
                          block
                          class="white--text button-width"
                        >
                          Cancelar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </template>
  
  <script lang="ts">
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  @Component({
    components: {
      NavBar,
      Footer
    }
  })
  export default class AgendDoctor extends Vue {
    especialidades = ['Cardiologia', 'Dermatologia', 'Neurologia'];
    dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    diasSelecionados: string[] = [];
    startDate = '';
    endDate = '';
    startDateMenu = false;
    endDateMenu = false;
  }
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  padding: 30px 10px;
}

.schedule-card {
  padding: 20px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
}

.schedule-title {
  margin-bottom: 10px;
  font-weight: bold;
  color: #1c7e83;
  font-size: 22px;
}

.v-text-field input,
.v-select input {
  background: #f9f9f9;
}

.v-text-field input::placeholder,
.v-select input::placeholder {
  color: #a0a0a0;
}

.v-btn {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 25px;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

.my-2 {
  margin: 8px 0;
}

.my-1 {
  margin: 4px 0;
}

.mb-2,
.mt-2 {
  margin: 0;
}

.white--text {
  color: #fff !important;
}

.button-width {
  max-width: 300px;
  margin: 0 auto;
}
</style>
