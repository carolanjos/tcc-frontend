<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12 consultation-card">
              <v-card-title class="consultation-title">Lista de consultas agendadas</v-card-title>
              <v-card-text>
                <v-simple-table class="consultation-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Especialidade</th>
                        <th class="text-center">Médico</th>
                        <th class="text-center">Data</th>
                        <th class="text-center">Hora</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(appointment, index) in appointments" :key="index">
                        <td class="text-center">{{ appointment.specialty }}</td>
                        <td class="text-center">{{ appointment.doctor }}</td>
                        <td class="text-center">{{ appointment.date }}</td>
                        <td class="text-center">{{ appointment.start_time }}</td>
                        <td class="text-center" :class="statusClass(appointment.status)">{{ appointment.status }}</td>
                        <td class="text-center">
                          <v-btn icon @click="openRescheduleModal(index)">
                            <v-icon color="#2EACB2">mdi-calendar-edit</v-icon>
                          </v-btn>
                          <v-btn icon @click="cancelAppointment(index)">
                            <v-icon color="#ff5252">mdi-cancel</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <RescheduleModal
        :dialog.sync="showRescheduleModal"
        :appointmentId="selectedAppointmentId"
        @close="showRescheduleModal = false"
        @reschedule="handleReschedule"
      />

    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import CheckSchedulingService from '@/modules/CheckScheduling/services/check-scheduling.service';
import CheckSchedulingEntity from '@/modules/CheckScheduling/entities/check-scheduling.entity';
import RescheduleModal from '@/modules/CheckScheduling/RescheduleModal.vue';

@Component({
  components: {
    NavBar,
    Footer,
    RescheduleModal, // Registra o componente modal
  }
})
export default class CheckScheduling extends Vue {
  appointments: CheckSchedulingEntity[] = [];
  showRescheduleModal = false;
  selectedAppointmentId = 0;

  async mounted() {
    try {
      this.appointments = await CheckSchedulingService.fetchSchedules();
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  }

  statusClass(status: string) {
    switch (status) {
      case 'Agendada':
        return 'status-scheduled';
      case 'Remarcada':
        return 'status-rescheduled';
      case 'Cancelada':
        return 'status-canceled';
      case 'Realizada':
        return 'status-done';
      default:
        return '';
    }
  }

  openRescheduleModal(index: number) {
    this.selectedAppointmentId = this.appointments[index].id;
    this.showRescheduleModal = true;
  }

  async handleReschedule({ appointmentId, newDate, newStartTime }: { appointmentId: number, newDate: string, newStartTime: string }) {
    try {
      const message = await CheckSchedulingService.rescheduleSchedule(appointmentId, newDate, newStartTime);
      alert(message);

      // Atualiza a data e hora da consulta na interface
      const appointment = this.appointments.find(app => app.id === appointmentId);
      if (appointment) {
        appointment.date = newDate;
        appointment.start_time = newStartTime;
        appointment.status = 'Remarcada';
      }
    } catch (error) {
      console.error('Erro ao reagendar a consulta:', error);
      alert('Houve um erro ao tentar reagendar a consulta. Por favor, tente novamente.');
    }
  }

  cancelAppointment(index: number) {
    alert(`Cancelar consulta de ${this.appointments[index].doctor}`);
    // Adicione aqui a lógica para cancelar a consulta
  }
}
</script>

<style scoped>
/* Adicione estilos aqui, se necessário */
</style>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.consultation-title {
  color: #1c7e83;
  font-weight: bold;
  font-size: 30px;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}


.container {
  padding: 40px;
}

.agenda-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.agenda-title {
  font-size: 24px;
  font-weight: bold;
  color: #1c7e83;
}

.btnPresence {
  background-color: #2EACB2;
  color: white;
  justify-items: center;
}

.agenda-table {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.presence-options {
  display: flex;
  justify-content: space-around;
}

.presence-btn.selected {
  background-color: #1c7e83;
  color: white;
}

.mt-4 {
  margin-top: 16px;
}

.status-scheduled {
  color: blue;
}

.status-rescheduled {
  color: orange;
}

.status-canceled {
  color: red;
}

.status-done {
  color: green;
}

.status-not-done {
  color: gray;
}
</style>
