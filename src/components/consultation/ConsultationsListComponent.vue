<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="container">
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8>
            <v-card class="elevation-12 consultation-card">
              <v-title class="consultation-title">Consultas</v-title>
              <v-card-text>
                <v-simple-table class="consultation-table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>Especialidade</th>
                        <th>Médico</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(appointment, index) in appointments" :key="index">
                        <td>{{ appointment.specialty }}</td>
                        <td>{{ appointment.doctor }}</td>
                        <td>{{ appointment.date }}</td>
                        <td>{{ appointment.time }}</td>
                        <td>{{ appointment.status }}</td>
                        <td>
                          <v-btn text color="#2EACB2" @click="rescheduleAppointment(index)">Remarcar</v-btn>
                          <v-btn text color="#2EACB2" @click="cancelAppointment(index)">Cancelar</v-btn>
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
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class ConsultationsList extends Vue {
  appointments = [
    { specialty: 'Ortopedia', doctor: 'José', date: '23/10/2024', time: '14:40', status: 'Agendada' },
    { specialty: 'Clinico Geral', doctor: 'Alice', date: '15/06/2024', time: '13:20', status: 'Remarcada' },
    { specialty: 'Cardiologista', doctor: 'Fernando', date: '07/04/2024', time: '16:00', status: 'Cancelada' },
    { specialty: 'Otorrinolaringologista', doctor: 'Paloma', date: '30/02/2024', time: '09:00', status: 'Realizada' },
  ];

  rescheduleAppointment(index: number) {
    alert(`Remarcar consulta de ${this.appointments[index].doctor}`);
    // Adicione aqui a lógica para remarcar a consulta
  }

  cancelAppointment(index: number) {
    alert(`Cancelar consulta de ${this.appointments[index].doctor}`);
    // Adicione aqui a lógica para cancelar a consulta
  }
}
</script>

<style scoped>
.container {
  padding: 60px 20px;
}

.consultation-card {
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.consultation-title {
  font-size: 30px;
  text-align: center;
  padding: 10px 10px;
  justify-content: center;
}

.consultation-table thead {
  background-color: #f0f0f0;
}

.consultation-table th, .consultation-table td {
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
  text-align: center; /* Alinhamento centralizado */
}

.consultation-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.v-text-field input {
  background: #f9f9f9;
}

.v-text-field input::placeholder {
  color: #a0a0a0;
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

@media (max-width: 768px) {
  .consultation-card {
    width: 100%;
    margin: 0 10px;
  }
}
</style>
