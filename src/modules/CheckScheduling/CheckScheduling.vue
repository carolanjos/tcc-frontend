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
    
      <!-- Componente Modal -->
      <RescheduleModal
        :dialog="showRescheduleModal"
        :appointmentId="selectedAppointmentId"
        @close="closeRescheduleModal"
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
import RescheduleModal from '@/modules/CheckScheduling/RescheduleModal.vue';
import CheckSchedulingService from '@/modules/CheckScheduling/services/check-scheduling.service';
import CheckSchedulingEntity from '@/modules/CheckScheduling/entities/check-scheduling.entity';

@Component({
  components: {
    NavBar,
    Footer,
    RescheduleModal,
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

  openRescheduleModal(index: number) {
    this.selectedAppointmentId = this.appointments[index].id;
    this.showRescheduleModal = true;
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
  }

  statusClass(status: string): string {
    // Define the class based on the status
    if (status === 'Remarcada') {
      return 'status-rescheduled';
    } else if (status === 'Cancelada') {
      return 'status-canceled';
    } else if (status === 'Concluída') {
      return 'status-done';
    } else {
      return 'status-scheduled';
    }
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

      this.closeRescheduleModal();
    } catch (error) {
      console.error('Erro ao reagendar a consulta:', error);
      alert('Houve um erro ao tentar reagendar a consulta. Por favor, tente novamente.');
    }
  }

  async cancelAppointment(index: number) {
    const appointmentId = this.appointments[index].id;
    try {
      const confirmation = confirm(`Tem certeza que deseja cancelar a consulta com ${this.appointments[index].doctor}?`);
      if (confirmation) {
        const message = await CheckSchedulingService.cancelSchedule(appointmentId);
        alert(message);
        // Atualiza o status da consulta para "Cancelada" na interface
        this.appointments[index].status = 'Cancelada';
      }
    } catch (error) {
      console.error('Erro ao cancelar a consulta:', error);
      alert('Houve um erro ao tentar cancelar a consulta. Por favor, tente novamente.');
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

.consultation-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.consultation-title {
  font-size: 30px;
  text-align: center;
  color: #2EACB2;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
}

.consultation-table thead {
  background-color: #f0f0f0;
  text-align: center;
  font-size: 30px;
  text-align: center;
  padding: 30px;
  color: #2EACB2;
}

.consultation-table th, .consultation-table td {
  padding: 10px;
  font-size: 16px;
  color: #333;
}

.text-center {
  text-align: center;
  font-size: 30px;
  padding: 30px;
  color: #2EACB2;
}

.consultation-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

.status-scheduled {
  color: #2EACB2;
}

.status-rescheduled {
  color: #FFA000;
}

.status-canceled {
  color: #ff5252;
}

.status-done {
  color: #4CAF50;
}

@media (max-width: 768px) {
  .consultation-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
