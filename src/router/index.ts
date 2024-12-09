import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../global/home/Home.vue'
import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/Login/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/modules/Login/ForgotPassword/ForgotPassword.vue')
  },
  {
    path: '/reset-password/:uidb64/:token',
    name: 'ResetPassword',
    component: () => import('@/modules/Login/ResetPassword/ResetPassword.vue')
  },
  {
    path: '/register',
    name: 'RegisterPatient',
    component: () => import('@/modules/Register/Register.vue')
  },
  {
    path: '/register-doctor',
    name: 'RegisterDoctor',
    component: () => import('@/modules/Register/RegisterDoctor/RegisterDoctor.vue')
  },
  {
    path: '/dashboard-patient',
    name: 'patient',
    component: () => import('@/global/dashboard/patient-dashboard.component.vue')
  },
  {
    path: '/dashboard-doctor',
    name: 'DoctorDashboard',
    component: () => import('@/global/dashboard/doctor-dashboard.component.vue')
  },
  {
    path: '/dashboard-admin',
    name: 'admin',
    component: () => import('@/global/dashboard/admin-dashboard.component.vue')
  },
  {
    path: '/schedule',
    name: 'ScheduleAppointment',
    component: () => import('@/modules/Schedule/Schedule.vue')
  },
  {
    path: '/list-patient',
    name: 'ConsultationsList',
    component: () => import('@/modules/CheckScheduling/CheckScheduling.vue')
  },
  {
    path: '/list-doctor',
    name: 'ListDoctor',
    component: () => import('@/modules/CheckScheduling/CheckSchedulingDoctor.vue')
  },
  {
    path: '/list-admin',
    name: 'ListPatient',
    component: () => import('@/modules/Admin/Lists/ListPatient/ListPatient.vue')
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: () => import('@/modules/Admin/Lists/ListUsers/ListUsers.vue')
  },
  {
    path: '/success',
    name: 'SuccessPage',
    component: () => import('@/global/success/success-page.component.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/modules/Contact/Contact.vue')
  },
  {
    path: '/create-agenda',
    name: 'CreateAgenda',
    component: () => import('@/modules/CreateAgenda/CreateAgenda.vue')
  },
  {
    path: '/home-value',
    name: 'HomeValue',
    component: () => import('@/global/home/components/home-value.component.vue')
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import('@/global/features/features.component.vue')
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('@/modules/Register/EditProfile/EditProfile.vue')
  },
  {
    path: '/reschedule',
    name: 'Reschedule',
    component: () => import('@/modules/CheckScheduling/CheckSchedulingDoctor.vue')
  },
  {
    path: '/create-calendar',
    name: 'CreateCalendar',
    component: () => import('@/modules/CreateCalendar/CreateCalendar.vue')
  },
  {
    path: '/test-feature', 
    name: 'TestFeature',
    component: () => import('@/modules/TestFeatures/test-features.component.vue')
  },
  {
    path: '/reschedule/:appointmentId',
    name: 'RescheduleAppointment',
    component: () => import('@/modules/Reschedule/reschedule.component.vue'),
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
