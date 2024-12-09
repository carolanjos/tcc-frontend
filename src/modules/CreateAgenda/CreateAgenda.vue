<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height>
        <v-row class="create-agenda-card">
          <v-col cols="12">
            <v-card class="elevation-12" outlined>
              <v-card-title class="create-agenda-title">
                Criar Agenda Médica
              </v-card-title>

              <v-card-text>
                <v-form ref="form">
                  <!-- Especialidade e Datas -->
                  <v-row>
                    <v-col cols="4">
                      <div class="input-title">Especialidade:</div>
                      <v-select
                        :items="specialtyOptions"
                        v-model="selectedSpecialty"
                        placeholder="Selecione a Especialidade"
                        required
                        outlined
                      ></v-select>
                      <div class="input-title">Data de Início:</div>
                      <v-text-field
                        prepend-inner-icon="mdi-calendar"
                        placeholder="Data de Início"
                        type="date"
                        v-model="calendar.start_date"
                        required
                        outlined
                      ></v-text-field>
                      <div class="input-title">Data de Término:</div>
                      <v-text-field
                        prepend-inner-icon="mdi-calendar"
                        placeholder="Data de Término"
                        type="date"
                        v-model="calendar.end_date"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <!-- Horas -->
                    <v-col cols="4">
                      <div class="input-title">Hora de Início:</div>
                      <v-text-field
                        prepend-inner-icon="mdi-clock"
                        placeholder="Hora de Início"
                        type="time"
                        v-model="calendar.start_hour"
                        required
                        outlined
                      ></v-text-field>
                      <div class="input-title">Hora de Término:</div>
                      <v-text-field
                        prepend-inner-icon="mdi-clock"
                        placeholder="Hora de Término"
                        type="time"
                        v-model="calendar.end_hour"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <!-- Dias da Semana -->
                    <v-col cols="4">
                      <div class="input-title">Dias da Semana:</div>
                      <v-row>
                        <v-col cols="12" v-for="day in weekDayOptions" :key="day">
                          <v-checkbox
                            :label="day"
                            :value="day"
                            v-model="calendar.week_day"
                            hide-details
                            class="checkbox-day"
                          >
                            <template v-slot:label>
                              {{ day }}
                            </template>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- Submit Button -->
                  <v-row class="d-flex justify-center">
                    <v-col cols="6">
                      <v-btn
                        color="#2EACB2"
                        block
                        class="create-agenda-button"
                        @click="createAgenda"
                      >
                        Criar Agenda
                      </v-btn>
                    </v-col>
                  </v-row>

                  <!-- Alert Messages -->
                  <v-alert v-if="errorMessage" type="error" dismissible>
                    {{ errorMessage }}
                  </v-alert>
                  <v-alert v-if="successMessage" type="success" dismissible>
                    {{ successMessage }}
                  </v-alert>
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
import Vue from 'vue';
import Component from 'vue-class-component';
import Calendar from '@/modules/CreateAgenda/entities/create-agenda.entity';
import CreateAgendaService from '@/modules/CreateAgenda/services/create-agenda.service';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import LocalStorageService from '@/services/localStorage.service';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class CreateAgenda extends Vue {
  calendar: Calendar = new Calendar();
  specialtyOptions: { text: string; value: number }[] = [];
  selectedSpecialty: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  weekDayOptions = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  async mounted() {
    try {
      const specialties = await CreateAgendaService.getSpecialties();
      this.specialtyOptions = specialties.map((specialty: any) => ({
        text: specialty.name,
        value: specialty.id,
      }));
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao carregar especialidades.';
    }
  }

  async createAgenda() {
    this.errorMessage = null;
    this.successMessage = null;

    const role = LocalStorageService.getItem('role');

    if (role !== 'admin' && role !== 'medico') {
      this.errorMessage = 'Você não tem permissão para criar uma agenda.';
      return;
    }

    if (!this.selectedSpecialty) {
      this.errorMessage = 'Por favor, selecione uma especialidade.';
      return;
    }

    this.calendar.doctor = this.selectedSpecialty;

    try {
      await CreateAgendaService.createAgenda(this.calendar);
      this.successMessage = 'Agenda criada com sucesso!';
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro ao criar a agenda.';
    }
  }
}
</script>


<style scoped>

* {
  font-family: 'Montserrat';
}

.create-agenda-card {
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: auto;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
  width: 100px;
  padding: 0 16px;
}

.create-agenda-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #2eacb2;
  margin-bottom: 20px;
  font-family: 'Montserrat';
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.col .col-12[data-v-e166fbc4] {
  padding: -10px;
  margin-top: 10px;
}

.col .col-4 {
  padding: 30px !important;
}

.checkbox-day {
  margin-top: -10px;
}

.v-btn--block {
  display: flex;
  flex: 1 0 auto;
  min-width: 40% !important;
  max-width: none;
  justify-self: center;
}

.input-title {
  font-weight: bold;
  color: #2eacb2;
  margin-bottom: 10px;
  font-size: 18px;
  font-family: 'Montserrat';
}

.create-agenda-button {
  background-color: #2eacb2;
  font-weight: bold;
  padding: 12px;
  color: white;
  margin-bottom: 30px;
  font-size: 17px;
  margin-top: 10px;
  border-radius: 100px;
  margin-left: 200px;
}

.v-alert {
  margin-top: 20px;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.v-sheet.v-card {
    border-radius: 20px;
}

.v-card__title {
    justify-content: center;
    margin-top: 15px;
}

.col .col-12 {
    padding: 20px;
}
</style>
