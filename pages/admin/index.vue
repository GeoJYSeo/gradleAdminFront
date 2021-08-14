<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col class="mt-16" cols="12" sm="10">
        <v-card>
          <v-toolbar flat color="#0D47A1">
            <v-toolbar-title>Administratior</v-toolbar-title>
          </v-toolbar>
          <v-row justify="center">
            <v-col class="mt-16" cols="12" sm="11">
              <v-card>
                <v-toolbar flat color="#424242">
                  <v-toolbar-title>Notice</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <p>notice</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="mt-16" cols="12" sm="11">
              <v-card>
                <v-toolbar flat color="#424242">
                  <v-toolbar-title>Lists</v-toolbar-title>
                </v-toolbar>
                <v-row class="mt-5" align="center">
                  <router-link :to="{ name: 'admin-users-list' }">
                    <v-col sm="2">
                      <v-card-text>
                        <img class="account" :src="account" />
                      </v-card-text>
                    </v-col>
                  </router-link>
                  <v-col>
                    <v-card-title>Account List</v-card-title>
                    <v-card-text>
                      <p>Manage ALL users imformation</p>
                    </v-card-text>
                  </v-col>
                  <v-col>
                    <v-row>
                      <router-link :to="{ name: 'admin-orders-list' }">
                        <v-card-text>
                          <img class="order" :src="order" />
                        </v-card-text>
                      </router-link>
                      <v-col>
                        <v-card-title>Order List</v-card-title>
                        <v-card-text>
                          <p>Check ALL orders</p>
                        </v-card-text>
                      </v-col>
                    </v-row>
                    <v-row>
                      <router-link :to="{ name: 'admin-comments-list' }">
                        <v-card-text>
                          <img class="comment" :src="comment" />
                        </v-card-text>
                      </router-link>
                      <v-col>
                        <v-card-title>Comment List</v-card-title>
                        <v-card-text>
                          <p>Check ALL Comments</p>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="mt-16" cols="12" sm="11">
              <v-card>
                <v-toolbar flat color="#424242">
                  <v-toolbar-title>Goods</v-toolbar-title>
                </v-toolbar>
                <v-row class="mt-5" align="center">
                  <router-link :to="{ name: 'admin-goods-list' }">
                    <v-col>
                      <v-card-text>
                        <img class="goods" :src="goods" />
                      </v-card-text>
                    </v-col>
                  </router-link>
                  <v-col>
                    <v-card-text>Goods List</v-card-text>
                  </v-col>
                  <router-link :to="{ name: 'admin-orders-list' }">
                    <v-col>
                      <v-card-text>
                        <img class="registration" :src="registration" />
                      </v-card-text>
                    </v-col>
                  </router-link>
                  <v-col>
                    <v-card-text>Registration</v-card-text>
                  </v-col>
                  <router-link :to="{ name: 'admin-comments-list' }">
                    <v-col>
                      <v-card-text>
                        <img class="category" :src="category" />
                      </v-card-text>
                    </v-col>
                  </router-link>
                  <v-col>
                    <v-card-text>Comment List</v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authMiddleware from '@/middleware/auth'
import account from '@/assets/png/account.png'
import order from '@/assets/png/order.png'
import comment from '@/assets/png/comment.png'
import goods from '@/assets/png/goods.png'
import registration from '@/assets/png/regi.png'
import category from '@/assets/png/category.png'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  computed: {
    account() {
      return account
    },
    order() {
      return order
    },
    comment() {
      return comment
    },
    goods() {
      return goods
    },
    registration() {
      return registration
    },
    category() {
      return category
    },
  },
}
</script>

<style scoped>
.account {
  height: 160px;
}

.order,
.comment,
.goods,
.registration,
.category {
  height: 80px;
}
</style>
