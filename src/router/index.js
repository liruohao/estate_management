import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import index from '@/components/index'

import Customer from '@/components/views/Quality/Customer/customer'
import Equipment from '@/components/views/Quality/Equipment/equipment'
import Inspection from '@/components/views/Quality/Inspection/inspection'
import Center from '@/components/views/Quality/Center/center'

import People from '@/components/views/Cost/People/people'
import Verify from '@/components/views/Cost/Verify/verify'
import Materiel from '@/components/views/Cost/Materiel/materiel'
import Subcontract from '@/components/views/Cost/Subcontract/subcontract'

import Charge from '@/components/views/Income/Charge/charge'
import Stop from '@/components/views/Income/Stop/stop'
import Lease from '@/components/views/Income/Lease/lease'
import Contract from '@/components/views/Income/Contract/contract'

import Owner from '@/components/views/Notice/Owner/owner'
import Staff from '@/components/views/Notice/Staff/staff'
import People2 from '@/components/views/People'
import Password from '@/components/views/Password'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      redirect: 'customer'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      rediect: '/people2',
      children: [{
        path: '/people2',
        name: 'People2',
        component: People2
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      rediect: '/password',
      children: [{
        path: '/password',
        name: 'Password',
        component: Password
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      rediect: '/customer',
      children: [{
        path: '/customer',
        name: 'Customer',
        component: Customer
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/equipment',
        name: 'Equipment',
        component: Equipment
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/inspection',
        name: 'Inspection',
        component: Inspection
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/center',
        name: 'Center',
        component: Center
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/people',
        name: 'People',
        component: People
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/verify',
        name: 'Verify',
        component: Verify
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/materiel',
        name: 'Materiel',
        component: Materiel
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/subcontract',
        name: 'Subcontract',
        component: Subcontract
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/charge',
        name: 'Charge',
        component: Charge
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/stop',
        name: 'Stop',
        component: Stop
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/lease',
        name: 'Lease',
        component: Lease
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/contract',
        name: 'Contract',
        component: Contract
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/staff',
        name: 'Staff',
        component: Staff
      }]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/owner',
        name: 'Owner',
        component: Owner
      }]
    }
  ]
})
