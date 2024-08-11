<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid fill-height class="d-flex align-center justify-center">
        <v-card class="elevation-12 schedule-card">
          <v-card-title class="schedule-title">Criar agenda e definir horário</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="startHour"
                    label="Hora de Início"
                    prepend-inner-icon="mdi-clock-outline"
                    placeholder="HH:MM"
                    outlined
                    v-mask="'##:##'"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="endHour"
                    label="Hora de Término"
                    prepend-inner-icon="mdi-clock-outline"
                    placeholder="HH:MM"
                    outlined
                    v-mask="'##:##'"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="selectedSpecialty"
                    :items="specialties"
                    label="Especialidade"
                    outlined
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="startDateMenu"
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startDate"
                        label="Data de Início"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        v-mask="'##/##/####'"
                      />
                    </template>
                    <v-date-picker v-model="startDate" @input="startDateMenu = false" />
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="endDateMenu"
                    v-model="endDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDate"
                        label="Data de Término"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                      />
                    </template>
                    <v-date-picker v-model="endDate" @input="endDateMenu = false" />
                  </v-menu>
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <v-checkbox-group v-model="weekDays" label="Dias da Semana" required>
                <v-row>
                  <v-col v-for="day in days" :key="day" cols="12" md="4">
                    <v-checkbox :label="day" :value="day" />
                  </v-col>
                </v-row>
              </v-checkbox-group>

              <v-divider class="my-4" />

              <v-row>
                <v-col cols="12">
                  <v-btn color="#2EACB2" block class="white--text mb-4" @click="createAgenda">
                    Adicionar Disponibilidade
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn color="error" block class="white--text" @click="cancel">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Doctor from '@/modules/Register/RegisterDoctor/entities/doctor.entity';
import CreateCalendarService from '@/modules/CreateAgenda/services/create-agenda.service';
import DoctorCalendar from '@/modules/CreateAgenda/entities/create-agenda.entity';
import NavBar from '@/global/navbar/navbar.component.vue';
import Footer from '@/global/footer/footer.component.vue';

@Component({
  components: {
      NavBar,
      Footer,
    },
})
export default class CreateCalendar extends Vue {
  private startHour = '';
  private endHour = '';
  private startDate = '';
  private endDate = '';
  private startDateMenu = false;
  private endDateMenu = false;
  private weekDays: string[] = [];
  private days: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  private selectedSpecialty = '';
  private specialties: number[] = [];
  
  private doctorId = Number(localStorage.getItem('doctorId'));

  private createCalendarService = new CreateCalendarService();

  async created() {
    try {
      this.specialties = await this.createCalendarService.getSpecialtiesFromDoctor(this.doctorId);
    } catch (error) {
      console.error('Erro ao obter especialidades:', error);
    }
  }

    private async createAgenda() {
    try {
      const calendar = new DoctorCalendar();
      calendar.startHour = this.startHour;
      calendar.endHour = this.endHour;
      calendar.startDate = this.startDate;
      calendar.endDate = this.endDate;
      calendar.weekDays = this.weekDays;
      calendar.specialtyId = this.selectedSpecialty;

      const result = await this.createCalendarService.createCalendar(calendar);
      console.log('Agenda criada com sucesso:', result);
    } catch (error) {
      console.error('Erro ao criar a agenda:', error);
    }
  }


  private cancel() {
    this.$router.go(-1);
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.container {
  padding: 30px 10px;
}

.schedule-card {
  padding: 20px 10px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
}

.schedule-title {
  margin-bottom: 10px;
  font-weight: bold;
  color: #1c7e83;
  font-size: 22px;
}

.v-text-field input,
.v-select input {
  background: #f9f9f9;
}

.v-text-field input::placeholder,
.v-select input::placeholder {
  color: #a0a0a0;
}

.v-btn {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 25px;
  font-weight: bold;
}

.v-btn:hover {
  background-color: #1c7e83;
  color: #fff !important;
}

.my-2 {
  margin: 8px 0;
}

.my-1 {
  margin: 4px 0;
}

.mb-2,
.mt-2 {
  margin: 0;
}

.white--text {
  color: #fff !important;
}

.button-width {
  max-width: 300px;
  margin: 0 auto;
}
</style>
