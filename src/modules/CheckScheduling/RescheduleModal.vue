<template>
      <v-dialog v-model="dialog" max-width="400px"> <!-- Reduzi a largura do card -->
        <v-card class="reschedule-card"> <!-- Apliquei a classe personalizada -->
          <v-card-title class="headline reschedule-title">Reagendar Consulta</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Nova Data"
                v-model="newDate"
                :rules="dateRules"
                required
                placeholder="DD/MM/AAAA"
                class="input-field"
                outlined
                v-mask="'##/##/####'"
              ></v-text-field>
              <v-text-field
                label="Novo Horário"
                v-model="newStartTime"
                :rules="timeRules"
                required
                placeholder="HH:MM:SS"
                class="input-field"
                outlined
                v-mask="'##:##:##'"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            <v-btn class="save-button" text @click="submit">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>
  
  <script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  
  export default class RescheduleModal extends Vue {
    @Prop({ default: false }) dialog!: boolean;
    @Prop({ required: true }) appointmentId!: number;
  
    newDate = '';
    newStartTime = '';
  
    dateRules = [(v: string) => !!v || 'Data é obrigatória'];
    timeRules = [(v: string) => !!v || 'Horário é obrigatório'];
  
    close() {
      this.$emit('close');
    }
  
    submit() {
      if ((this.$refs.form as any).validate()) {
        this.$emit('reschedule', {
          appointmentId: this.appointmentId,
          newDate: this.newDate,
          newStartTime: this.newStartTime,
        });
        this.close();
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
  
  .reschedule-card {
    padding: 20px; /* Ajuste de padding */
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%; /* Deixa o card mais estreito */
    max-width: 520px; /* Limita a largura máxima */
    margin: 0 auto; /* Centraliza o card */
    text-align: center;
  }
  
  .reschedule-title {
    margin-top: 5px;
    font-weight: bold;
    color: #1c7e83;
    font-size: 20px;
  }
  
  .input-field {
    background: #f9f9f9;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .input-field input::placeholder {
    color: #a0a0a0;
  }
  
  .save-button {
    background-color: #1c7e83;
    color: #fff !important;
  }
  
  .v-btn:hover {
    background-color: #1c7e83;
    color: #fff !important;
  }
  
  @media (max-width: 768px) {
    .reschedule-card {
      width: 90%;
    }
  }
  </style>
  