<template>
    <v-app id="inspire">
      <NavBar />
      <v-main>
        <p class="title">REAGENDAMENTO DE CONSULTA</p>
        <v-container fluid fill-height class="container">
          <v-row>
            <v-col cols="8" sm="4">
              <v-card class="elevation-12 appointment-card">
                <v-title class="appointment-title">Especialidade e Médico</v-title>
                <v-card-text>
                  <v-form @submit.prevent="rescheduleAppointment">
                    <div class="input-title">Especialidade:</div>
                    <v-select
                      v-model="appointment.specialty_id"
                      :items="specialties"
                      item-value="specialty_id"
                      item-text="name"
                      disabled
                      outlined
                    ></v-select>
  
                    <div class="input-title">Médico:</div>
                    <v-select
                      v-model="appointment.doctor_id"
                      :items="doctors"
                      item-value="doctor_id"
                      item-text="name"
                      disabled
                      outlined
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
                    :events="availableDates"
                    event-color="green"
                    color="#149393"
                    header-color="#149393"
                    first-day-of-week="1"
                    @input="onDateChange"
                    style="border: 2px solid #149393;"
                  />
                  <div class="mt-4">
                    <div class="input-title-time">Horários Disponíveis:</div>
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
                        :loading="isLoading"
                        :disabled="isLoading" 
                        @click="rescheduleAppointment"
                      >
                        Reagendar
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
        Consulta reagendada com sucesso!
      </v-snackbar>
    </v-app>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DoctorService from '@/modules/Schedule/services/schedule.service';
  import Speciality from '@/modules/Schedule/entities/speciality.entity';
  import Doctor from '@/modules/Schedule/entities/doctors.entity';
  import Schedule from '@/modules/Schedule/entities/schedule.entity';
  import NavBar from '@/global/navbar/navbar.component.vue';
  import Footer from '@/global/footer/footer.component.vue';
  
  @Component({
    components: {
      NavBar,
      Footer,
    },
  })
  export default class RescheduleAppointment extends Vue {
    appointment: Schedule = new Schedule(0, '', '', 0);
    specialties: Speciality[] = [];
    doctors: Doctor[] = [];
    availableDates: any[] = [];
    availableTimes: string[] = [];
    showSuccessMessage = false;
    isLoading = false; // Novo estado para controle de carregamento

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
      try {
        const dates = await DoctorService.getAvailableDatesByDoctor(this.appointment.doctor_id);
        this.availableDates = dates.map((date: any) => date.start_date);
      } catch (error) {
        console.error('Erro ao buscar datas disponíveis:', error);
      }
    }
  
    async fetchAvailableTimes() {
      try {
        const formattedDate = new Date(this.appointment.date).toISOString().split('T')[0];
        const times = await DoctorService.getAvailableTimesByDoctor({
          doctor_id: this.appointment.doctor_id,
          date: formattedDate,
        });
        this.availableTimes = times
          .filter((time: any) => !time.is_busy)
          .map((time: any) => ({
            display: `${time.start_hour} - ${time.end_hour}`,
            value: time.start_hour,
          }));
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        this.availableTimes = [];
      }
    }
  
    async rescheduleAppointment() {
      this.isLoading = true; // Ativa o estado de carregamento
      try {
        const appointmentId = Number(this.$route.params.appointmentId);
        await DoctorService.rescheduleAppointment(
          appointmentId,
          this.appointment.date,
          this.appointment.start_time
        );
        this.showSuccessMessage = true;
      } catch (error) {
        console.error('Erro ao reagendar consulta:', error);
        alert('Ocorreu um erro ao tentar reagendar a consulta.');
      } finally {
        this.isLoading = false; // Desativa o estado de carregamento
      }
    }
  
    clearSelection() {
      this.appointment.date = '';
      this.appointment.start_time = '';
      this.availableDates = [];
      this.availableTimes = [];
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
  
  .input-title-time {
    text-align: left;
    margin: 5px 0 5px 0;
    color: #149393;
    font-size: 17px;
    padding: 30px 0px 5px;
    font-weight: bold;
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