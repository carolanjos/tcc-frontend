<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12 agenda-card">
              <v-card-title class="agenda-title">Lista de Agendas e Pacientes</v-card-title>
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
                        <td class="text-center">{{ appointment.time }}</td>
                        <td class="text-center">{{ appointment.patient }}</td>
                        <td class="text-center">{{ appointment.specialty }}</td>
                        <td class="text-center" :class="statusClass(appointment.status)">{{ appointment.status }}</td>
                        <td class="text-center">
                          <div class="presence-options">
                            <v-btn
                              :class="{'selected': appointment.attended}"
                              @click="appointment.attended = true"
                              class="presence-btn"
                            >
                              Sim
                            </v-btn>
                            <v-btn
                              :class="{'selected': appointment.attended}"
                              @click="appointment.attended = !appointment.attended"
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
                <v-btn color="#2EACB2" class="mt-4" @click="saveAttendances">Salvar Presenças</v-btn>
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

  // Use diretamente a instância do serviço
  private checkDoctorService = CheckDoctorService;

  async mounted() {
    try {
      this.agendas = await this.checkDoctorService.fetchAgendas();
    } catch (error) {
      console.error('Erro ao buscar agendas:', error);
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

  async saveAttendances() {
    try {
      const updatedAgendas = this.agendas.map(agenda => ({
        ...agenda,
        attended: agenda.attended.toString() === 'Sim',
      }));
      await this.checkDoctorService.saveAttendances(updatedAgendas);
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
    padding: 60px 20px;
  }
  
  .agenda-card {
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    transition: box-shadow 0.3s ease;
  }
  
  .agenda-title {
    font-size: 24px;
    text-align: center;
    color: #2EACB2;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .agenda-table thead {
    background-color: #f0f0f0;
    text-align: center;
  }
  
  .agenda-table th, .agenda-table td {
    padding: 10px;
    font-size: 14px;
    color: #333;
  }
  
  .text-center {
    text-align: center;
  }
  
  .agenda-table tbody tr {
    border-bottom: 1px solid #e0e0e0;
  }
  
  .v-btn {
    transition: background-color 0.3s ease;
    background-color: #2EACB2;
    color: #fff;
  }
  
  .v-btn:hover {
    background-color: #1c7e83;
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
  .presence-options {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.presence-btn {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  text-transform: uppercase;
}

.presence-btn.selected {
  background-color: #2EACB2;
  color: white;
}

.presence-btn:not(.selected):hover {
  background-color: #dcdcdc;
}

  
  @media (max-width: 768px) {
    .agenda-card {
      width: 100%;
      margin: 0 10px;
    }
  }
  </style>
  