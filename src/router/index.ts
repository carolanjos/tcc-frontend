import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Login from '../components/login/LoginComponent.vue'
import Register from '@/entities/Register'
import PacienteDashboard from '../components/patient/PatientDashboard.vue'
import DoctorDashboard from '../components/doctor/DoctorDashboard.vue'
import AdminDashboard from '../components/doctor/AdminDashboard.vue'
import ForgotPassword from '../components/login/ForgotPasswordComponent.vue'
import ResetPassword from '../components/login/ResetPasswordComponent.vue'
import ScheduleAppointment from '../components/scheduler/ScheduleAppointmentComponent.vue'
import ConsultationsList from '../components/consultation/ConsultationsListComponent.vue'
import SuccessPage from '../components/success/SuccessPageComponent.vue'
import Contact from '../components/contact/ContactComponent.vue'
import LandingPage from '../components/TesteComponent.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/login/LoginComponent.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/register/RegisterPatientComponent.vue')
  },
  {
    path: '/dashboard-patient',
    name: 'patient',
    component: () => import('../components/patient/PatientDashboard.component.vue')
  },
  {
    path: '/dashboard-doctor',
    name: 'doctor',
    component: () => import('../components/doctor/DoctorDashboard.component.vue')
  },
  {
    path: '/dashboard-admin',
    name: 'admin',
    component: () => import('../components/admin/AdminDashboard.component.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../components/login/ForgotPasswordComponent.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../components/login/ResetPasswordComponent.vue')
  },
  {
    path: '/schedule',
    name: 'ScheduleAppointment', 
    component: () => import('../components/scheduler/ScheduleAppointmentComponent.vue')
  },
  {
    path: '/list-consult',
    name: 'ConsultationsList', 
    component: () => import('../components/consultation/ConsultationsListComponent.vue')
  },
  {
    path: '/success',
    name: 'SuccessPage',
    component: () => import('../components/success/SuccessPageComponent.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../components/contact/ContactComponent.vue')
  },
  {
    path: '/register-doctor',
    name: 'RegisterDoctor',
    component: () => import('../components/register/RegisterDoctorComponent.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
