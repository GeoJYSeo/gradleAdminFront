<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list flat>
        <v-subheader>Gradle Mall</v-subheader>
        <v-list-item router :to="{ name: 'index' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLogin === false" router :to="{ name: 'login' }">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          v-model="mypage.active"
          prepend-icon="mdi-account-details-outline"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Member</v-list-item-title>
          </template>
          <v-list-item router :to="{ name: 'member-detail' }">
            <v-list-item-action>
              <v-icon>mdi-face</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Information</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-model="admin.goods_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>My Page</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'member-mypage-comment_list' }">
              <v-list-item-content>
                <v-list-item-title>Comment List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-comment-text-multiple-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item router :to="{ name: 'member-mypage-order-list' }">
              <v-list-item-content>
                <v-list-item-title>Order List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-truck-fast-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-list-group
          v-if="hasPermission"
          v-model="admin.active"
          prepend-icon="mdi-account-cog-outline"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Administor</v-list-item-title>
          </template>
          <v-list-item router :to="{ name: 'admin' }">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-model="admin.goods_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Goods</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'admin-goods-cate_list' }">
              <v-list-item-content>
                <v-list-item-title>Category</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item router :to="{ name: 'admin-goods-register' }">
              <v-list-item-content>
                <v-list-item-title>Goods Register</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-toy-brick-plus</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item router :to="{ name: 'admin-goods-list' }">
              <v-list-item-content>
                <v-list-item-title>Goods List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-clipboard-text-multiple</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-list-group v-model="admin.users_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'admin-users-register' }">
              <v-list-item-content>
                <v-list-item-title>User Register</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item router :to="{ name: 'admin-users-list' }">
              <v-list-item-content>
                <v-list-item-title>User List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-list-group v-model="admin.order_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Orders</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'admin-orders-list' }">
              <v-list-item-content>
                <v-list-item-title>Order List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-truck-fast-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-list-group v-model="admin.comment_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Comments</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'admin-comments-list' }">
              <v-list-item-content>
                <v-list-item-title>Comment List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-comment-text-multiple-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-list-group
          v-model="customer.active"
          prepend-icon="mdi-shopping-outline"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Customer</v-list-item-title>
          </template>
          <v-list-group v-model="customer.goods_active" sub-group value="true">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Goods</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item router :to="{ name: 'goods-list' }">
              <v-list-item-content>
                <v-list-item-title>Goods List</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-clipboard-text-multiple</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon router :to="{ name: 'order-cart_list' }">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-menu v-if="isLogin" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item router :to="{ name: 'member-detail' }">
            <v-list-item-title>Mypage</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>LogOut</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else text router :to="{ name: 'login' }">Log In</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'

export default {
  middleware: [authMiddleware.keepLogin()],
  data() {
    return {
      drawer: null,
      mypage: {
        active: false,
      },
      admin: {
        active: false,
        goods_active: false,
        users_active: false,
        order_active: false,
        comment_active: false,
      },
      customer: {
        active: false,
        goods_active: false,
        order_active: false,
      },
    }
  },
  computed: {
    ...mapState('login', ['isLogin', 'hasPermission']),
  },
  methods: {
    ...mapActions('login', ['getMemberInfo', 'logout']),
  },
}
</script>
