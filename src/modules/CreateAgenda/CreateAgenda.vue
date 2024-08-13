<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height rounded class="container">
        <v-layout align-center justify-center rounded>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 create-agenda-card">
              <v-card-title class="create-agenda-title">Criar Agenda</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <div class="input-title">Hora de Início:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-clock-start"
                    placeholder="Hora de Início"
                    type="time"
                    v-model="calendar.start_hour"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Hora de Término:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-clock-end"
                    placeholder="Hora de Término"
                    type="time"
                    v-model="calendar.end_hour"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Data de Início:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-calendar-start"
                    placeholder="Data de Início"
                    type="date"
                    v-model="calendar.start_date"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Data de Término:</div>
                  <v-text-field
                    prepend-inner-icon="mdi-calendar-end"
                    placeholder="Data de Término"
                    type="date"
                    v-model="calendar.end_date"
                    required
                    outlined
                  ></v-text-field>
                  <div class="input-title">Dias da Semana:</div>
                  <v-select
                    :items="weekDayOptions"
                    v-model="calendar.week_day"
                    placeholder="Dias da Semana"
                    multiple
                    required
                    outlined
                  ></v-select>
                  <div class="input-title">Especialidade:</div>
                  <v-select
                    :items="specialtyOptions"
                    v-model="selectedSpecialty"
                    placeholder="Selecione a Especialidade"
                    required
                    outlined
                  ></v-select>
                  <v-btn
                    color="#2EACB2"
                    block
                    class="create-agenda-button"
                    @click="createAgenda"
                  >
                    Criar Agenda
                  </v-btn>
                  <v-alert v-if="errorMessage" type="error" dismissible>
                    {{ errorMessage }}
                  </v-alert>
                  <v-alert v-if="successMessage" type="success" dismissible>
                    {{ successMessage }}
                  </v-alert>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  padding: 60px 20px;
}

.create-calendar-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  border-radius: 20px;
}

.create-calendar-button {
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
}

.calendar-title {
  margin-top: 5px;
  font-weight: bold;
  color: #1c7e83;
  justify-content: center;
  font-size: 25px;
}

.input-title {
  text-align: left;
  margin: 5px 0 5px 0;
  font-weight: bold;
  color: #1c7e83;
  font-size: 18px;
}
.create-agenda-title {
  color: #1c7e83;
  font-family: 'Montserrat';
  text-align: center;
  justify-items: center;
  font-size: 35px;
  margin-bottom: 20px;
}
.create-agenda-buttom {
  color: #fff;
}
@media (max-width: 768px) {
  .create-calendar-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
