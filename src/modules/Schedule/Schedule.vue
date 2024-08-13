<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 appointment-card">
              <v-card-title class="appointment-title">Agendamento de Consulta</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="scheduleAppointment">
                  <div class="input-title">Especialidade:</div>
                  <v-select
                    v-model="appointment.specialty"
                    :items="specialties"
                    item-value="value"
                    item-text="text"
                    placeholder="Escolha a especialidade"
                    prepend-inner-icon="mdi-hospital"
                    @change="loadSpecialties"
                    required
                    outlined
                  ></v-select>
                  
                  <div class="input-title">Data:</div>
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="appointment.date"
                        label="Escolha a data"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        required
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="appointment.date"
                      @input="dateMenu = false"
                      :min="today"
                    ></v-date-picker>
                  </v-menu>

                  <div class="input-title">Hora:</div>
                  <v-select
                    v-model="appointment.time"
                    :items="times"
                    placeholder="Escolha a hora"
                    prepend-inner-icon="mdi-clock"
                    required
                    outlined
                  ></v-select>

                  <div class="input-title">Médico:</div>
                  <v-select
                    v-model="appointment.doctor"
                    :items="doctors"
                    item-value="value"
                    item-text="text"
                    placeholder="Escolha o médico"
                    prepend-inner-icon="mdi-account"
                    :disabled="!doctors.length"
                    required
                    outlined
                  ></v-select>
                  
                  <v-btn type="submit" color="#2EACB2" block class="appointment-button">Agendar</v-btn>
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
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import { ScheduleService } from '@/modules/Schedule/services/schedule.service';
import Schedule from '@/modules/Schedule/entities/schedule.entity';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class ScheduleAppointment extends Vue {
  dateMenu = false;
  today = new Date().toISOString().substr(0, 10); // Data atual para limitar no calendário

  appointment: Schedule = {
    specialty: '',
    date: '',
    time: '',
    doctor: '',
  };
  
  specialties: Array<{ text: string, value: number }> = [];
  times: string[] = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00',
  ]; // Horários mockados
  doctors: Array<{ text: string, value: number }> = [];

  private scheduleService = new ScheduleService();

  async mounted() {
    await this.loadSpecialties();
  }

  async loadSpecialties() {
    try {
      const response = await this.scheduleService.listSpecialties();
      this.specialties = response.map((specialty: any) => ({
        text: specialty.name,
        value: specialty.id,
      }));
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error);
    }
  }

  checkAndLoadDoctors() {
    const { specialty, date, time } = this.appointment;

    if (specialty && date && time) {
      this.loadAvailableDoctors(Number(specialty), date, time);
    }
  }

  async loadAvailableDoctors(specialtyId: number, date: string, startTime: string) {
    try {
      const response = await this.scheduleService.getAvailableDoctors(specialtyId, date, startTime);
      this.doctors = response.map((doctor: any) => ({
        text: doctor.name,
        value: doctor.id,
      }));
    } catch (error) {
      console.error('Erro ao carregar médicos disponíveis:', error);
      this.doctors = [];
    }
  }

  async scheduleAppointment() {
    const { specialty, date, time, doctor } = this.appointment;

    if (!specialty || !date || !time || !doctor) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await this.scheduleService.createAppointment(Number(doctor), Number(specialty), date, time);
      console.log('Agendamento realizado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
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

.appointment-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 150%;
  text-align: center;
}

.appointment-button {
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
}

.v-select input {
  background: #f9f9f9;
}

.v-select input::placeholder {
  color: #a0a0a0;
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

.appointment-title {
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

@media (max-width: 768px) {
  .appointment-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
