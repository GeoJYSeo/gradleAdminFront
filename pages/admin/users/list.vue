<template>
  <v-container fill-height style="max-width: 1200px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark>
            <v-row>
              <v-col>
                <v-toolbar-title>User List</v-toolbar-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-select
                  v-model="search"
                  :items="selSearchKind"
                  hide-details
                  @change="setIndex"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="keyword"
                  prepend-icon="mdi-magnify"
                  clearable
                  hide-details
                  single-line
                  @click:prepend="getUserList([searchKind, keyword])"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-refresh" @sendEvent="init" />
              </v-col>
              <v-col cols="12" sm="1">
                <IconButton text="mdi-transfer-left" @sendEvent="back" />
              </v-col>
            </v-row>
          </v-toolbar>
          <v-progress-linear
            v-if="!userInfoList"
            indeterminate
            absolute
            color="deep-purple accent-4"
          ></v-progress-linear>
          <div v-else class="pa-4">
            <template>
              <v-data-table
                :headers="headers"
                :items="userInfoList"
                :footer-props="footerProps"
                show-group-by
                @dblclick:row="getRowItem"
              ></v-data-table>
            </template>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import authMiddleware from '@/middleware/auth'
import IconButton from '@/components/molecules/icon_button'

export default {
  middleware: [
    authMiddleware.loginAuthentication(),
    authMiddleware.authentication(),
  ],
  components: { IconButton },
  data() {
    return {
      selUser: null,
      search: 'None',
      searchKind: 0,
      selSearchKind: ['None', 'Email', 'Name', 'Surname'],
      keyword: '',
    }
  },
  computed: {
    ...mapState('admin/users/list', ['userInfoList', 'headers', 'footerProps']),
  },
  created() {
    this.getUserList([this.searchKind, this.keyword])
  },
  methods: {
    ...mapActions('admin/users/list', ['getUserList', 'moveToDetail', 'back']),
    setIndex() {
      this.searchKind = this.selSearchKind.indexOf(this.search)
    },
    init() {
      this.search = 'None'
      this.keyword = ''
      this.getUserList([this.searchKind, this.keyword])
    },
    getRowItem(event, row) {
      this.moveToDetail(row.item.id)
    },
  },
}
</script>
