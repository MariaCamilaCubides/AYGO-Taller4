<template>
    <div class="lo-que-sea">
        <card
            external-card="material-card-content"
            url-help=""
        >
            <section slot="body">
                   <div class="profileImage div-wrapper">
                    <p class="image is-128x128">
                        <b-image
                            :src="require('@/assets/account-circle.svg')"
                            :src-fallback="require('@/assets/account-circle.svg')"
                            :rounded="true"
                            :lazy="false"
                            @error="failed_image = true"
                        />
                    </p>
                </div>
                <div class="columns" style="flex:1;flex-direction: row;justify-content: space-between; height: 100%">
                    <section class="column">
                        <div class="card">
                            <div
                                class="card-header"
                                role="button"
                                aria-controls="contentIdForA11y3">
                                <p class="card-header-title">
                                    <template><b-icon icon="account-edit"/>Edit profile</template>
                                </p>
                            </div>
                            <div class="card-content">
                                <b-field label="Profile picture" horizontal>
                                    <b-upload v-model="profilePicture" class="file-label">
                                        <span class="file-cta">
                                            <b-icon class="file-icon" icon="upload"></b-icon>
                                            <span class="file-label">{{ profilePicture ? profilePicture.name : 'Click to upload' }}</span>
                                        </span>
                                    </b-upload>
                                </b-field>
                                <b-field label="Cover photo" horizontal>
                                    <b-upload v-model="coverPhoto" class="file-label">
                                        <span class="file-cta">
                                            <b-icon class="file-icon" icon="upload"></b-icon>
                                            <span class="file-label">{{ coverPhoto ? coverPhoto.name : 'Click to upload' }}</span>
                                        </span>
                                    </b-upload>
                                </b-field>
                                <hr/>
                                <b-field label="Name" horizontal>
                                    <b-input v-model="user.name" icon-right="pencil"></b-input>
                                </b-field>
                                <b-field label="Last name" horizontal>
                                    <b-input v-model="user.lastName" icon-right="pencil"></b-input>
                                </b-field>
                                <b-field label="City" horizontal>
                                    <b-input v-model="user.city" icon-right="pencil"></b-input>
                                </b-field>
                                <b-field label="Birthday" horizontal>
                                    <b-datepicker
                                        placeholder="Click to select..."
                                        v-model="user.birthday"
                                        icon="calendar-today"
                                        position="is-top-right"/>
                                </b-field>
                                <b-field label="Phone" horizontal>
                                    <b-input v-model="user.phone" icon-right="pencil"></b-input>
                                </b-field>
                                <b-field label="email" horizontal>
                                    <b-input v-model="user.email" disabled></b-input>
                                </b-field>
                            </div>
                            <b-button
                            class="is-primary force-right"
                            @click="saveProfile"
                            >Save</b-button>
                        </div>
                    </section>
                    <section class="column">
                        <div class="card" aria-id="contentIdForA11y3">
                            <div
                                class="card-header"
                                role="button"
                                aria-controls="contentIdForA11y3">
                                <p class="card-header-title">
                                    <template><b-icon icon="account-circle"/>Profile</template>
                                </p>
                            </div>
                            <div class="card-content">
                                <p class="image is-128x128">
                                    <b-image
                                        :src="require('@/assets/account-circle.svg')"
                                        :src-fallback="require('@/assets/account-circle.svg')"
                                        :rounded="true"
                                        :lazy="false"
                                        @error="failed_image = true"
                                    />
                                </p>
                                <hr/>
                                <b-image
                                    :src="require('@/assets/loginBackground.jpg')"
                                    :src-fallback="require('@/assets/account-circle.svg')"
                                    :lazy="false"
                                />
                                <hr/>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="account"/>{{ user.name }} {{ user.lastName }}</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="map-marker"/>{{ user.city }}</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="cake-variant"/>{{ user.birthday }}</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="phone"/>{{ user.phone }}</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="email"/>{{ user.email }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </card>
    </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  import card from '@/components/cross/Card.vue';
  import users from '@/services/users';

  export default {
    name: 'EditProfileComponent',
    components: {
      card,
    },
    data() {
      return {
        isLoading: false,
        currentUser: {},
        loading: false,
        profilePicture: null,
        coverPhoto: null,
        user: {},
        users,
      };
    },
    computed: {
        ...mapState(['authData']),
      nameToShow() {
        console.log(this.user)
        if (!this.user.name && !this.user.lastName) return '(Name and last name not registered)';
        return `${this.user.name || ''} ${this.user.lastName || ''}`;
      },
    },
    created() {
        this.user = this.users.getUser(this.authData);
    },
    methods: {
      saveProfile() {
        this.users.updateUser({...this.user, ...this.authData})
      },
    },
  };
  </script>
  
  <style scoped>

  .lo-que-sea {
    padding: 0px 0px 0px 17em;
    display: block;
    align-items: center;
    justify-content: center;
  }

.div-wrapper {
    display: flex;
    align-items: flex-end;
}

.div-wrapper img {
    position: absolute;
    left: 0;
    bottom: 0;
}

.custom-card {
    margin: 10em;
}

.container-header{
    line-height: 1.22;
}
#social_icons {
    padding: .5em;
    display: inline-block;
}

.card {
    margin-top: 10px !important;
}
  .profile-picture-content {
    text-align: center;
  }
  .profile-picture-content h1 {
    font-size: 22px;
    font-weight: 500;
    margin-top: 6px;
  }
  .profile-picture-content p {
    font-weight: 100;
  }
  .profile-picture-list {
    width: 50px;
  }
  .divider {
    background-color: #632d8e;
  }
  .profile-data {
    display: flex;
  }
  .user-card {
    margin: 1.3%;
  }
  .user-card-content {
    display: flex;
    padding: 10px 10px 5px 10px;
  }
  .material-card {
    margin: 0 auto;
  }
  .profile-subtitle {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  </style>
  
  <style>
  .field-names .field{
    align-items: end !important
  }
  </style>
  