<template>
    <div class="container">
        <h2>Вход</h2>
        <form @submit.prevent="loginUser" id="myFormLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Электронный адрес:</label>
                <input type="email" v-model.trim="user.email" id="email" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль:</label>
                <input type="password" v-model.trim="user.password" id="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Вход</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import request from "@/requests";

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        async loginUser() {
            const response = await request(
                "post",
                "/auth/login/",
                { email: this.user.email, password: this.user.password },
                {},
                {},
            )
            if (
                response.status === 200 &&
                response.data.access_token !== null &&
                response.data.refresh_token !== null
            ) {
                console.log(response.data.access_token)
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                this.$router.push('/interview');
            } else {
                this.error = response.data.message;
            }

            // try {
            //     const response = await axios.post(
            //         'http://localhost:8000/api/v1/auth/login/',
            //         { email: this.user.email, password: this.user.password },
            //         {
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             }
            //         }
            //     );
            //     if (
            //         response.status === 200 && 
            //         response.data.access_token !== null &&
            //         response.data.refresh_token !== null
            //     ) {
            //         console.log(response)
            //         this.access_token = response.data.access_token;
            //         this.refresh_token = response.data.refresh_token;
            //         localStorage.setItem('access_token', this.access_token );
            //         localStorage.setItem('refresh_token', this.refresh_token );
            //         this.$router.push('/');
            //     } else {
            //         this.error = response.data.message;
            //     }
            // } catch (error) {
            //     console.error(error.response.data.msg);
            //     console.error(error.response.data.extra.detail);
            // }
        }
    }
}
</script>

<style scoped>
.container {
    width: 500px;
    margin: 50px auto;
}

label {
    display: block;
    margin-bottom: 10px;
}

form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>