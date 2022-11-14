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
                                    <b-upload v-model="file" class="file-label">
                                        <span class="file-cta">
                                            <b-icon class="file-icon" icon="upload"></b-icon>
                                            <span class="file-label">{{ file ? file.name : 'Click to upload' }}</span>
                                        </span>
                                    </b-upload>
                                </b-field>
                                <b-field label="Cover photo" horizontal>
                                    <b-upload v-model="file" class="file-label">
                                        <span class="file-cta">
                                            <b-icon class="file-icon" icon="upload"></b-icon>
                                            <span class="file-label">{{ file ? file.name : 'Click to upload' }}</span>
                                        </span>
                                    </b-upload>
                                </b-field>
                                <hr/>
                                <b-field label="Name" horizontal>
                                    <b-input v-model="name"></b-input>
                                </b-field>
                                <b-field label="City" horizontal>
                                    <b-input v-model="city"></b-input>
                                </b-field>
                                <b-field label="Birthday" horizontal>
                                    <b-datepicker
                                        placeholder="Click to select..."
                                        v-model="dates"
                                        icon="calendar-today"
                                        position="is-top-right"/>
                                </b-field>
                                <b-field label="Phone" horizontal>
                                    <b-input v-model="phone"></b-input>
                                </b-field>
                                <b-field label="email" horizontal>
                                    <b-input v-model="email"></b-input>
                                </b-field>
                            </div>
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
                                        <p><b-icon icon="account-edit"/>Maria Camila Cubides</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="map-marker"/>Bogota</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="cake-variant"/>02/09</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="phone"/>3112027733</p>
                                    </div>
                                </div>
                                <div class="container-header">
                                    <div class="grid_5" id="social_icons">
                                        <p><b-icon icon="email"/>macacumar97@gmail.com</p>
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
  import card from '@/components/cross/Card.vue';
  // import UserImage from '@/components/cross/UserImage.vue';
  export default {
    name: 'EditProfileComponent',
    components: {
      card,
      // UserImage,
    },
    data() {
      return {
        isLoading: false,
        name: '',
        lastName: '',
        phoneNumber: '',
        user: {},
        loading: false,
        file: null
      };
    },
    computed: {
      nameToShow() {
        if (!this.user.name && !this.user.lastName) return '(Name and last name not registered)';
        return `${this.user.name || ''} ${this.user.lastName || ''}`;
      },
    },
    methods: {
      editName() {
        this.name = this.user.name;
        this.lastName = this.user.lastName;
        this.editNameActive = true;
      },
      editPhoneNumber() {
        this.phoneNumber = this.user.phoneNumber;
        this.editPhoneActive = true;
      },
      saveNewName() {
      },
      saveNewPhone() {
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
  