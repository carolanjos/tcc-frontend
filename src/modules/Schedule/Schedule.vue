<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <p class="title">AGENDAMENTO DE CONSULTA</p>
      <v-container fluid fill-height class="container">
        <v-row>
          <v-col cols="8" sm="4">
            <v-card class="elevation-12 appointment-card">
              <v-title class="appointment-title">Especialidade e Médico</v-title>
              <v-card-text>
                <v-form @submit.prevent="scheduleAppointment">
                  <div class="input-title">Especialidade:</div>
                  <v-select
                    v-model="appointment.specialty_id"
                    item-value="specialty_id"
                    item-text="name"
                    :items="specialties"
                    placeholder="Escolha a especialidade"
                    required
                    outlined
                    @change="onSpecialtyChange"
                  ></v-select>

                  <div class="input-title">Médico:</div>
                  <v-select
                    v-model="appointment.doctor_id"
                    item-value="doctor_id"
                    item-text="name"
                    :items="doctors"
                    placeholder="Escolha o médico"
                    required
                    outlined
                    @change="onDoctorChange"
                    mode="date"
                  ></v-select>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="8">
            <v-card class="elevation-12 appointment-card-calendar">
              <v-title class="appointment-title">Data e Horários Disponíveis</v-title>
              <v-card-text>
                <v-date-picker
                  v-model="appointment.date"
                  :allowed-dates="isDateAllowed"
                  :events="availableDates"
                  event-color="green"
                  color="#149393"
                  header-color="#149393"
                  first-day-of-week="1"
                  type="date"
                  @input="onDateChange"
                  style="border: 2px solid #149393;"
                />
                <div class="mt-4">
                <div class="input-title">Horários Disponíveis:</div>
                <v-select
                  v-model="appointment.start_time"
                  :items="availableTimes"
                  item-text="display"
                  item-value="value"
                  placeholder="Selecione um horário"
                  required
                  outlined
                ></v-select>
                <v-btn
                  class="btn_time"
                  color="#2EACB2"
                  style="width: 250px; height: 48px;"
                  @click="clearSelection"
                >
                  Limpar
                </v-btn>
              </div>
              <v-row class="d-flex justify-center mt-4">
                <v-col cols="auto">
                  <v-btn
                    type="submit"
                    color="#2EACB2"
                    class="appointment-button"
                    style="width: 250px; height: 48px;"
                    @click="scheduleAppointment"
                  >
                    Agendar
                  </v-btn>
                </v-col>
              </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>

    <Footer />

    <v-snackbar v-model="showSuccessMessage" top timeout="3000">
      Consulta agendada com sucesso!
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DoctorService from '@/modules/Schedule/services/schedule.service';
import Speciality from './entities/speciality.entity';
import Doctor from './entities/doctors.entity';
import Schedule from './entities/schedule.entity';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class ScheduleAppointment extends Vue {
  appointment: Schedule = new Schedule(0, '', '', 0);
  specialties: Speciality[] = [];
  doctors: Doctor[] = [];
  availableDates: any[] = [];
  availableTimes: string[] = [];
  showSuccessMessage = false;

  isDateAllowed(date: string): boolean {
    return !this.appointment.busyDates.includes(date);
  }

  async created() {
    try {
      this.specialties = await DoctorService.getSpecialties();
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
    }
  }

  async onSpecialtyChange() {
    if (this.appointment.specialty_id) {
      try {
        this.doctors = await DoctorService.getDoctorsBySpecialty(this.appointment.specialty_id);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
      }
    }
  }

  async onDoctorChange() {
    if (this.appointment.doctor_id) {
      await this.fetchAvailableDates();
    }
  }

  async onDateChange() {
    if (this.appointment.doctor_id && this.appointment.date) {
      await this.fetchAvailableTimes();
    }
  }

  async fetchAvailableDates() {
    if (this.appointment.doctor_id) {
      try {
        const dates = await DoctorService.getAvailableDatesByDoctor(this.appointment.doctor_id);

        // Captura as datas disponíveis
        this.availableDates = dates.map((date: any) => date.start_date); // Certifique-se que estão no formato 'YYYY-MM-DD'

        // Captura as datas ocupadas
        this.appointment.busyDates = dates.filter((date: any) => date.is_busy).map((date: any) => date.start_date);

        console.log('Datas disponíveis:', this.availableDates);
        console.log('Datas ocupadas:', this.appointment.busyDates);
      } catch (error) {
        console.error('Erro ao buscar datas disponíveis:', error);
      }
    }
  }

  async fetchAvailableTimes() {
    if (this.appointment.doctor_id && this.appointment.date) {
      try {
        const formattedDate = new Date(this.appointment.date).toISOString().split('T')[0];
        const times = await DoctorService.getAvailableTimesByDoctor({
          doctor_id: this.appointment.doctor_id,
          date: formattedDate,
        });

        if (times && times.length > 0) {
          // Filter out busy times and add console logging for debugging
          this.availableTimes = times
            .filter((time: any) => !time.is_busy) // Only show available times
            .map((time: any) => {
              const startHour = time.start_hour.length === 5 ? `${time.start_hour}:00` : time.start_hour;
              const endHour = time.end_hour.length === 5 ? `${time.end_hour}:00` : time.end_hour;

              return {
                display: `${startHour} - ${endHour}`, // Display format
                value: startHour, // Send start_hour with seconds
              };
            });
          
          // Add a console log to check filtered available times
          console.log('Filtered available times:', this.availableTimes);
        } else {
          this.availableTimes = [];
        }
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        this.availableTimes = [];
      }
    }
  }


  async scheduleAppointment() {
    // Validar campos como antes...

    try {
      await DoctorService.createAppointment(
        this.appointment.specialty_id,
        this.appointment.doctor_id,
        this.appointment.date,
        this.appointment.start_time
      );

      // Exibir mensagem de sucesso
      this.showSuccessMessage = true;
      this.clearSelection();
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      alert('Ocorreu um erro ao tentar agendar a consulta.');
    }
  }

  clearSelection() {
    this.appointment.specialty_id = 0;
    this.appointment.doctor_id = 0;
    this.appointment.date = '';
    this.appointment.start_time = '';
    this.doctors = [];
    this.availableDates = [];
    this.availableTimes = [];
    this.appointment.busyDates = []; // Limpar as datas ocupadas também
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat';
}

.container {
  margin-top: -40px;
}

.title {
  text-align: center;
  padding: 10px 10px 10px 10px;
  color: #149393;
  font-family: Montserrat  !important;
  margin-top: 25px;
  font-weight: bold;
}

.appointment-card {
  padding: 25px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin: 20px;
}

.v-application .title {
  font-size: 2rem !important;
}

.appointment-card-calendar {
  padding: 20px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin: 20px;
  color: #2EACB2;
  margin-bottom: 50px;
}

.appointment-button {
  font-weight: bold;
  background-color: #2EACB2;
  color: #fff;
  font-size: 17px;
  margin-top: -10px;
  border-radius: 200px;
  font-family: 'Montserrat';
}

.btn_time {
  font-size: 17px;
  font-weight: bold;
  background-attachment: #2EACB2;
  font-family: 'Montserrat';
  border-radius: 200px;
  color: #fff;
  margin-top: 30px;

}

.v-card__text {
  margin-bottom: 25px;
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
  background-color: #4ccfd6;
  color: #fff !important;
}

.appointment-title {
  margin-top: 5px;
  color: #149393;
  justify-content: center;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: bold;
}

.input-title {
  text-align: left;
  color: #149393;
  font-size: 17px;
  margin-bottom: 10px;
  font-weight: bold;
  font-family: 'Montserrat';
  margin-top: 10px;
  text-transform: uppercase;
}

.v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 242px;
  color: black;
  border: 2px solid black;
}

.v-date-picker-table table {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  top: 0;
  table-layout: fixed;
  width: 100%;
  color: white;
  border: 2px solid black;
}

.v-date-picker-table {
  position: relative;
  padding: 0 12px;
  height: 242px;
  border: 2px solid #149393;
}

.v-picker__body > div {
  width: 100%;
  border: 2px solid #149393;
}

.v-picker {
  margin-top: 20px;
}


.theme--light.v-date-picker-table th, .theme--light.v-date-picker-table .v-date-picker-table--date__week {
    color: black;
}

@media (max-width: 768px) {
  .appointment-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>