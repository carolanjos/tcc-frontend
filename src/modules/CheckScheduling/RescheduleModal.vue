<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Reagendar Consulta</v-card-title>
      <v-card-text>
        <v-form ref="form" class="form">
          <!-- Campo somente leitura para o nome do médico -->
          <v-text-field
            label="Nome do Médico"
            v-model="doctorName"
            readonly
            outlined
          ></v-text-field>

          <!-- Campo somente leitura para a especialidade -->
          <v-text-field
            label="Especialidade"
            v-model="specialty"
            readonly
            outlined
          ></v-text-field>

          <!-- Selecionar nova data disponível -->
          <v-select
            label="Nova Data Disponível"
            v-model="selectedDate"
            :items="availableDates"
            item-text="label"
            item-value="value"
            required
            outlined
            @change="fetchAvailableTimes"
          ></v-select>

          <!-- Selecionar novo horário disponível -->
          <v-select
            label="Novo Horário Disponível"
            v-model="selectedTime"
            :items="availableTimes"
            item-text="label"
            item-value="value"
            required
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
      
      <!-- Botões de ação -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="#2EACB2" text @click="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import DoctorService from '@/modules/Schedule/services/schedule.service';
import Doctor from '@/modules/Schedule/entities/doctors.entity';
import Schedule from '@/modules/Schedule/entities/schedule.entity';

@Component
export default class RescheduleModal extends Vue {
  $toast: any;
  @Prop({ default: false }) dialog!: boolean;
  @Prop({ default: '' }) doctorId!: number; // ID do médico
  @Prop({ default: '' }) specialtyId!: number; // ID da especialidade

  doctorName = ''; // Nome do médico
  appointment: Schedule = new Schedule(0, '', '', 0);
  specialty = ''; // Especialidade do médico
  availableDates: { label: string; value: string }[] = []; // Datas disponíveis
  availableTimes: { label: string; value: string }[] = []; // Horários disponíveis
  selectedDate = ''; // Nova data escolhida
  selectedTime = ''; // Novo horário escolhido

  async fetchAvailableDates() {
    if (this.appointment.doctor_id) {
      try {
        const dates = await DoctorService.getAvailableDatesByDoctor(this.appointment.doctor_id);

        // Captura as datas disponíveis
        this.availableDates = dates.map((date: any) => date.start_date); // Certifique-se que estão no formato 'YYYY-MM-DD'

        // Captura as datas ocupadas
        this.appointment.busyDates = dates.filter((date: any) => date.is_busy).map((date: any) => date.start_date);

        console.log('Datas disponíveis:', this.availableDates);
        console.log('Datas ocupadas:', this.appointment.busyDates);
      } catch (error) {
        console.error('Erro ao buscar datas disponíveis:', error);
      }
    }
  }

  async fetchAvailableTimes() {
    if (this.appointment.doctor_id && this.appointment.date) {
      try {
        const formattedDate = new Date(this.appointment.date).toISOString().split('T')[0];
        const times = await DoctorService.getAvailableTimesByDoctor({
          doctor_id: this.appointment.doctor_id,
          date: formattedDate,
        });

        if (times && times.length > 0) {
          // Filter out busy times and add console logging for debugging
          this.availableTimes = times
            .filter((time: any) => !time.is_busy) // Only show available times
            .map((time: any) => {
              const startHour = time.start_hour.length === 5 ? `${time.start_hour}:00` : time.start_hour;
              const endHour = time.end_hour.length === 5 ? `${time.end_hour}:00` : time.end_hour;

              return {
                display: `${startHour} - ${endHour}`, // Display format
                value: startHour, // Send start_hour with seconds
              };
            });
          
          // Add a console log to check filtered available times
          console.log('Filtered available times:', this.availableTimes);
        } else {
          this.availableTimes = [];
        }
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        this.availableTimes = [];
      }
    }
  }

  close() {
    this.$emit('close');
  }

  submit() {
    if ((this.$refs.form as any).validate()) {
      this.$emit('reschedule', {
        doctorId: this.doctorId,
        specialtyId: this.specialtyId,
        newDate: this.selectedDate,
        newStartTime: this.selectedTime,
      });
      this.close();
    }
  }
}
</script>

<style scoped>
.headline {
  color: #2EACB2;
  margin-bottom: 15px;
}

.form {
  margin-top: 20px;
}
</style>
