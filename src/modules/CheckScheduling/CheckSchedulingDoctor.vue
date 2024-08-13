<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12 agenda-card">
              <v-card-title class="agenda-title">Lista de Pacientes Agendados</v-card-title>
              <v-card-text>
                <v-simple-table class="agenda-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-center">Data</th>
                        <th class="text-center">Horário</th>
                        <th class="text-center">Paciente</th>
                        <th class="text-center">Especialidade</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Presença</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(appointment, index) in agendas" :key="index">
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
                              :class="{ 'selected': appointment.status === 'realizada' }"
                              @click="markAsAttended(appointment.id, index)"
                              class="presence-btn"
                            >
                              Sim
                            </v-btn>
                            <v-btn
                              :class="{ 'selected': appointment.status === 'cancelado' }"
                              @click="markAsNotAttended(appointment.id, index)"
                              class="presence-btn"
                            >
                              Não
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-btn color="#2EACB2" center class="btnPresence" @click="saveAttendances">Salvar Presenças</v-btn>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  padding: 20px;
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
