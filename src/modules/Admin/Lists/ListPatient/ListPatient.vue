<template>
    <div> 
        <v-app id="inspire">
        <NavBar />
            <v-container>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm10 md8>
                        <v-card class="list-card">
                            <v-card-title class="list-title">Lista de consultas agendadas - Médico e Paciente</v-card-title>
                            <v-card-text>
                                <v-simple-table class="list-table">
                                    <template v-slot:default>
                                        <thead class="column">
                                            <tr>
                                                <th class="text-center">ID</th>
                                                <th class="text-center">Nome do Paciente</th>
                                                <th class="text-center">Data de nascimento do paciente</th>
                                                <th class="text-center">Data da Consulta</th>
                                                <th class="text-center">Horário da Consulta</th>
                                                <th class="text-center">Nome do Médico</th>
                                                <th class="text-center">Especialidade</th>
                                                <th class="text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(user, index) in user" :key="index">
                                                <td class="text-center">{{ user.id }}</td>
                                                <td class="text-center">{{ user.patient_name }}</td>
                                                <td class="text-center">{{ user.date_birth }}</td>
                                                <td class="text-center">{{ user.date }}</td>
                                                <td class="text-center">{{ user.start_time }}</td>
                                                <td class="text-center">{{ user.doctor_name }}</td>
                                                <td class="text-center">{{ user.specialty_name }}</td>
                                                <td :class="getStatusClass(user.status)" class="text-center">{{ user.status }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <Footer />
        </v-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';
import UserPatient from '@/modules/Admin/Lists/ListUsers/services/list-users.service';
import ListPatientService from '@/modules/Admin/Lists/ListPatient/services/list-patient.service';

@Component({
    components: {
        NavBar,
        Footer
    }
})
export default class ListPatient extends Vue {
    user: UserPatient[] = [];

    async mounted() {
        try {
            this.user = await ListPatientService.fetchListPatients();
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error);
        }
    }

    getStatusClass(status: string) {
        if (status.toLowerCase() === 'agendado' || status.toLowerCase() === 'reagendado') {
            return 'status-green';
        } else if (status.toLowerCase() === 'cancelado') {
            return 'status-red';
        }
        return '';
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.container {
  max-width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.list-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 4px rgba(0, 0, 0, 0.1);
}

.list-title {
  font-size: 24px;
  font-weight: bold;
  color: #1c7e83;
  justify-content: center;
}

.status-green {
  color: #28a745; /* Cor verde para status 'agendado' ou 'reagendado' */
  font-weight: bold;
}

.status-red {
  color: #dc3545; /* Cor vermelha para status 'cancelado' */
  font-weight: bold;
}

</style>