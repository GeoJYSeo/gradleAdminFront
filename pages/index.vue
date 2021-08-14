<template>
  <v-container class="container">
    <v-row justify="center">
      <v-col class="mt-16" cols="12" sm="10">
        <v-card>
          <v-toolbar flat color="#424242">
            <v-toolbar-title>Notice</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="contents">
            <p>Notice</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="mt-16" cols="12" sm="10">
        <v-card>
          <v-toolbar flat color="#424242">
            <v-toolbar-title>Special</v-toolbar-title>
          </v-toolbar>
          <template>
            <v-carousel :show-arrows="false">
              <v-carousel-item
                v-for="(item, i) in specialOffers"
                :key="i"
                :src="item"
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="mt-16" cols="12" sm="10">
        <v-card>
          <v-toolbar flat color="#424242">
            <v-toolbar-title>Categories</v-toolbar-title>
          </v-toolbar>
          <v-row>
            <v-col v-for="(category, i) in categories" :key="i" cols="3">
              <router-link
                :to="{
                  name: 'goods-list',
                  params: { categoryName: category.title },
                }"
              >
                <v-hover v-slot="{ hover }">
                  <v-img :src="category.src">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal text-h3 bold white--text"
                        style="height: 100%"
                      >
                        {{ category.title }}
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-hover>
              </router-link>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import special from '@/assets/special_offers/special.jpg'
import summer from '@/assets/special_offers/summer.jpg'
import winter from '@/assets/special_offers/winter.jpg'
import black from '@/assets/special_offers/black.jpg'
import holloween from '@/assets/special_offers/holloween.jpg'
import action from '@/assets/categories/action.jpg'
import arcade from '@/assets/categories/arcade.jpg'
import board from '@/assets/categories/board.jpg'
import fps from '@/assets/categories/fps.jpg'
import puzzle from '@/assets/categories/puzzle.jpg'
import racing from '@/assets/categories/racing.jpg'
import rpg from '@/assets/categories/rpg.jpg'
import sports from '@/assets/categories/sports.jpg'

export default {
  computed: {
    specialOffers() {
      return [special, summer, winter, black, holloween]
    },
    categories() {
      return [
        { title: 'ACTION', src: action },
        { title: 'ARCADE', src: arcade },
        { title: 'BOARD', src: board },
        { title: 'FPS', src: fps },
        { title: 'PUZZLE', src: puzzle },
        { title: 'RACING', src: racing },
        { title: 'RPG', src: rpg },
        { title: 'SPORTS', src: sports },
      ]
    },
  },
}
</script>

<style scoped>
.container {
  height: 80%;
}

.contents {
  height: 200px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
