<template>
    <div>
        <v-app id="inspire">
            <NavBar />
            <v-container fluid class="container">
                <v-layout align-center justify-center>
                    <v-flex xs12 sm10 md8>
                        <v-card class="list-users-card">
                            <v-card-title class="list-users-title">Lista de Usuários</v-card-title>
                            <v-card-text>
                                <v-simple-table class="list-users-table">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-center">ID</th>
                                                <th class="text-center">Nome</th>
                                                <th class="text-center">Email</th>
                                                <th class="text-center">Telefone</th>
                                                <th class="text-center">CPF</th>
                                                <th class="text-center">Data de nascimento</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr v-for="(user, index) in user" :key="index">
                                                <td class="text-center">{{ user.id }}</td>
                                                <td class="text-center">{{ user.name }}</td>
                                                <td class="text-center">{{ user.email }}</td>
                                                <td class="text-center">{{ user.phone }}</td>
                                                <td class="text-center">{{ user.document }}</td>
                                                <td class="text-center">{{ user.date_birth }}</td>
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
import Users from  '@/modules/Admin/Lists/ListUsers/entities/list-users.entity';
import ListUsersService from '@/modules/Admin/Lists/ListUsers/services/list-users.service';

@Component({
    components: {
        NavBar,
        Footer
    }
})
export default class ListUsers extends Vue {
    user: Users[] = [];

    async mounted() {
        try {
            this.user = await ListUsersService.fetchUsers();
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}

.container {
  padding: 20px;
}

.list-users-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.list-users-title {
  font-size: 24px;
  font-weight: bold;
  color: #1c7e83;
  justify-content: center
}

</style>