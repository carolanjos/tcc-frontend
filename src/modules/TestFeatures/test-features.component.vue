<template>
    <div class="funcionalidades">
        <h1>Funcionalidades do Sistema</h1>
        <ul>
            <li v-for="funcionalidade in funcionalidades" :key="funcionalidade.id">
                {{ funcionalidade.nome }}: {{ funcionalidade.descricao }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TestFeature extends Vue {
    funcionalidades = [
        { id: 1, nome: 'Agendamento de Consultas', descricao: 'Permite que o paciente agende consultas com os médicos.' },
        { id: 2, nome: 'Consulta de Exames', descricao: 'Permite que o paciente consulte os resultados de exames.' },
        { id: 3, nome: 'Consulta de Receitas', descricao: 'Permite que o paciente consulte as receitas médicas.' },
        { id: 4, nome: 'Consulta de Prontuários', descricao: 'Permite que o paciente consulte os prontuários médicos.' },
        { id: 5, nome: 'Consulta de Agendas', descricao: 'Permite que o paciente consulte as agendas dos médicos.' },
    ]
}
</script>

<style scoped>
.funcionalidades {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.funcionalidades h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.funcionalidades ul {
  list-style-type: none;
  padding: 0;
}

.funcionalidades li {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>



