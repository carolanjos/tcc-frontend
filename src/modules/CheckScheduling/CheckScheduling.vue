<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="container">
        <v-row>
          <v-col cols="12" sm="10" md="8" lg="10">
            <v-card class="elevation-12 consultation-card">
              <v-card-title class="consultation-title">Lista de Consultas Agendadas</v-card-title>
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
                        <th class="text-center">Reagendar</th>
                        <th class="text-center">Cancelar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(appointment, index) in appointments" :key="index">
                        <td class="text-center">{{ appointment.specialty }}</td>
                        <td class="text-center">{{ appointment.doctor }}</td>
                        <td class="text-center">{{ appointment.date }}</td>
                        <td class="text-center">{{ appointment.start_time }}</td>
                        <td class="text-center" :class="statusClass(appointment.status)">
                          {{ appointment.status }}
                        </td>
                        <td class="text-center">
                          <v-btn icon @click="openRescheduleModal(index)">
                            <v-icon color="#2EACB2">mdi-calendar-edit</v-icon>
                          </v-btn>
                        </td>
                        <td class="text-center">
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
          </v-col>
        </v-row>
      </v-container>

      <RescheduleModal
        :dialog.sync="showRescheduleModal"
        :appointmentId="selectedAppointmentId"
        @close="showRescheduleModal = false"
        @reschedule="openRescheduleModal"
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
    RescheduleModal,
  }
})
export default class CheckScheduling extends Vue {
  appointments: CheckSchedulingEntity[] = [];
  showRescheduleModal = false;
  selectedAppointmentId = 0;

  openRescheduleModal(index: number) {
    const appointmentId = this.appointments[index].id;
    this.$router.push({ name: 'RescheduleAppointment', params: { appointmentId: appointmentId.toString() } });
  }

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
      case 'Remarcada':
        return 'status-green'; // Verde para agendada e remarcada
      case 'Cancelada':
        return 'status-red'; // Vermelho para cancelada
      case 'Realizada':
        return 'status-done'; // Verde para realizada
      default:
        return '';
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
    } catch (error) {
      console.error('Erro ao reagendar a consulta:', error);
      alert('Houve um erro ao tentar reagendar a consulta. Por favor, tente novamente.');
    }
  }

  async cancelAppointment(index: number) {
    const appointmentId = this.appointments[index].id;
    try {
      const message = await CheckSchedulingService.cancelSchedule(appointmentId);
      alert(message);

      // Atualiza o status da consulta para 'Cancelada' na interface
      this.appointments[index].status = 'Cancelada';
    } catch (error) {
      console.error('Erro ao cancelar a consulta:', error);
      alert('Houve um erro ao tentar cancelar a consulta. Por favor, tente novamente.');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat';
}

.consultation-title {
  font-size: 26px;
  color: #149393;
  justify-content: center;
  padding: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Montserrat';
  margin-bottom: 12px;
}

.container {
  padding: 40px;
}

.consultation-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ajuste a largura do cartão */
}

.v-application .text-center {
  text-align: center !important;
  font-size: 1rem !important;
}

.agenda-title {
  font-size: 24px;
  color: #2EACB2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
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
  background-color: #2EACB2;
  color: white;
}

.mt-4 {
  margin-top: 16px;
}

.status-green {
  color: #28a745; /* Verde */
}

.status-red {
  color: #ff5252; /* Vermelho */
}

.status-done {
  color: green; /* Verde para realizada */
}

.status-not-done {
  color: gray; /* Cinza para status indefinido ou não realizado */
}

.v-sheet.v-card {
  border-radius: 20px;
  padding: 30px;
  font-family: 'Montserrat';
  font-weight: 0;
  width: 110%;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #149393;
  font-weight: 0;
  font-family: 'Montserrat';
  text-transform: uppercase;
}

.container--fluid {
  max-width: 500%; /* Ajuste a largura máxima do contêiner */
}

.v-card {
  border-width: thin;
  display: block;
  max-width: 200%; /* Ajuste a largura máxima do cartão */
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
}
</style>