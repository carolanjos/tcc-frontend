<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Reagendar Consulta</v-card-title>
        <v-card-text>
          <v-form ref="form" class="form">
            <v-text-field
              label="Nova Data"
              v-model="newDate"
              :rules="dateRules"
              required
              outlined
            ></v-text-field>
            <v-text-field
              label="Novo Horário"
              v-model="newStartTime"
              :rules="timeRules"
              required
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
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

@Component
export default class RescheduleModal extends Vue {
    @Prop({ default: false }) dialog!: boolean;
    @Prop({ default: '' }) appointmentId!: number;

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
.headline {
    color: #2EACB2;
    margin-bottom: 15px;
}

.form {
    margin-top: 20px;
}


</style>