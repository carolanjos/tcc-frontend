<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 appointment-card">
              <v-title class="appointment-title">Agendamento de Consulta</v-title>
              <v-card-text>
                <v-form @submit.prevent="scheduleAppointment">
                  <div class="input-title">Especialidade:</div>
                  <v-select
                    v-model="appointment.specialty"
                    item-value="id"
                    item-text="name"
                    :items="specialties"
                    @change="onFieldChange"
                    placeholder="Escolha a especialidade"
                    prepend-inner-icon="mdi-hospital"
                    required
                    outlined
                  ></v-select>
                  <div class="input-title">Data:</div>
                  <v-text-field
                      v-model="appointment.date"
                      label="Data"
                      type="date"
                      required
                      outlined
                    ></v-text-field>
                  <div class="input-title">Hora:</div>
                  <v-select
                    v-model="appointment.time"
                    @change="onFieldChange"
                    :items="generateFullDayIntervals(30)"
                    placeholder="Escolha a hora"
                    prepend-inner-icon="mdi-clock"
                    required
                    outlined
                  ></v-select>
                  <div class="input-title">Médico:</div>
                  <v-select
                    v-model="appointment.doctor"
                    item-value="id"
                    item-text="name"
                    :items="doctors"
                    placeholder="Escolha o médico"
                    prepend-inner-icon="mdi-account"
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
import Component from 'vue-class-component';
import Vue from 'vue';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import ScheduleAppointmentService from '@/modules/Schedule/services/schedule.service';
import Schedule from '@/modules/Schedule/entities/schedule.entity';
import Speciality from './entities/speciality.entity';
import Doctors from './entities/doctors.entity';

@Component({
  components: {
    NavBar,
    Footer,
  },
})

export default class ScheduleAppointment extends Vue {
  appointment: Schedule = {
    specialty: '',
    date: '',
    time: '',
    doctor: '',
  }
  specialties: Speciality[] | null = null
  doctors: Doctors[] | null = null

  async created() {
    this.specialties = await ScheduleAppointmentService.listSpecialities();
  }

  async onFieldChange() { 
    this.doctors = await ScheduleAppointmentService.availableDoctors(this.appointment);
  }

  generateFullDayIntervals(intervalMinutes: number) {
    const times = [];
    let currentTime = new Date();
    
    currentTime.setHours(0);
    currentTime.setMinutes(0);
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);

    const endTimeDate = new Date();
    endTimeDate.setHours(23);
    endTimeDate.setMinutes(30);
    endTimeDate.setSeconds(0);
    endTimeDate.setMilliseconds(0);

    while (currentTime <= endTimeDate) {
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      times.push(`${hours}:${minutes}`);
      
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
    }

    return times;
  }
  
  async scheduleAppointment() {
      if (this.appointment.doctor) {
        await ScheduleAppointmentService.scheduleAppointment(this.appointment);
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