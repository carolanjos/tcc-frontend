<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12 agenda-card">
              <v-card-title class="agenda-title">
                Lista de Pacientes Agendados
              </v-card-title>
              <v-card-text>
                <v-simple-table class="agenda-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center table-header">Data</th>
                        <th class="text-center table-header">Horário</th>
                        <th class="text-center table-header">Paciente</th>
                        <th class="text-center table-header">Especialidade</th>
                        <th class="text-center table-header">Status</th>
                        <th class="text-center table-header">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(appointment, index) in agendas" :key="index" class="agenda-row" >
                        <td class="text-center">{{ appointment.date }}</td>
                        <td class="text-center">{{ appointment.start_time }}</td>
                        <td class="text-center">{{ appointment.name }}</td>
                        <td class="text-center">{{ appointment.specialty }}</td>
                        <td class="text-center" :class="statusClass(appointment.status)">
                          {{ appointment.status }}
                        </td>
                        <td class="text-center">
                          <div class="presence-options">
                            <v-btn
                              icon
                              color="green"
                              :class="{ 'selected': appointment.status === 'realizada' }"
                              @click="markAsAttended(appointment.id, index)"
                            >
                              <v-icon>mdi-check-circle</v-icon>
                            </v-btn>
                            <v-btn
                              icon
                              color="red"
                              :class="{ 'selected': appointment.status === 'cancelado' }"
                              @click="markAsNotAttended(appointment.id, index)"
                            >
                              <v-icon>mdi-close-circle</v-icon>
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <div class="btn-container">
                  <v-btn color="#2EACB2" class="btnPresence mt-4" @click="saveAttendances">Salvar</v-btn>
                </div>
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
import CheckDoctorService from '@/modules/CheckScheduling/services/check-doctor.service';
import DoctorCheck from '@/modules/CheckScheduling/entities/check-doctor.entity';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class AgendaList extends Vue {
  agendas: DoctorCheck[] = [];
  rescheduleDialog = false;
  selectedAppointmentId = 0;

  private checkSchedulingService = CheckDoctorService;

  async mounted() {
    try {
      this.agendas = await this.checkSchedulingService.fetchAgendas();
    } catch (error) {
      console.error('Erro ao buscar agendas:', error);
    }
  }

  statusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'agendado':
        return 'status-scheduled';
      case 'remarcado':
        return 'status-rescheduled';
      case 'cancelado':
        return 'status-canceled';
      case 'realizada':
        return 'status-done';
      case 'não realizada':
        return 'status-not-done';
      default:
        return '';
    }
  }

  async markAsAttended(appointment_id: number, index: number) {
    console.log(`Marking appointment ID ${appointment_id} as attended`);
    try {
      const response = await this.checkSchedulingService.markAppointmentAsDone(appointment_id);
      console.log('Full API response:', response); // Log da resposta completa
      this.agendas[index].status = 'realizada';
    } catch (error: any) {
      console.error('Erro ao marcar como realizada:', error);
      if (error.response) {
        console.error('Erro detalhado:', error.response.data);
      }
    }
  }

  async markAsNotAttended(appointment_id: number, index: number) {
    console.log(`Marking appointment ID ${appointment_id} as not attended`);
    try {
      const response = await this.checkSchedulingService.markAppointmentAsCanceled(appointment_id);
      console.log('Full API response:', response); // Log da resposta completa
      this.agendas[index].status = 'cancelado';
    } catch (error: any) {
      console.error('Erro ao marcar como cancelada:', error);
      if (error.response) {
        console.error('Erro detalhado:', error.response.data);
      }
    }
  }

  async saveAttendances() {
    try {
      await this.checkSchedulingService.saveAttendances(this.agendas);
      console.log('Presenças salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar presenças:', error);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat';
}

.container {
  padding: 40px;
}

.agenda-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.v-application .text-center {
  text-align: center !important;
  font-size: 1rem !important;
}

.agenda-title {
  font-size: 26px;
  color: #2EACB2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat';
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}

.btn-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btnPresence {
  background-color: #2EACB2;
  color: white;
  width: 20%;
  height: 40%;
  margin-bottom: 50px;
  font-size: 16px;
  border-radius: 25px;
  margin-top: 10px;
}

.agenda-table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
  font-size: 20px;
}

.agenda-table th,
.agenda-table td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 20px;
}

.table-header {
  font-size: 24px; /* Ajuste o valor conforme necessário */
}

.agenda-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.agenda-row:hover {
  background-color: #e3f2fd;
  font-size: 25px;
}

.text-center {
  text-align: center;
  font-size: 20px;
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

.v-sheet.v-card {
  border-radius: 40px;
  padding: 30px;
  font-family: 'Montserrat';
  font-weight: 0;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: #2EACB2;
  font-weight: 0;
  font-family: 'Montserrat';
}
</style>