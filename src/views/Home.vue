<template>
    <div class="lo-que-sea">
        <section slot="body">  
            <div class="columns" style="flex:1;flex-direction: row;justify-content: space-between; height: 100%">
                <section class="column">
                    <div class="card">
                        <div class="card-content">
                            <b-field>
                                <p class="image is-64x64">
                                <b-image
                                    :src="require('@/assets/account-circle.svg')"
                                    :src-fallback="require('@/assets/account-circle.svg')"
                                    :rounded="true"
                                    :lazy="false"
                                    @error="failed_image = true"
                                />
                            </p>
                                <input type="text" autocomplete="on" placeholder="What's on your mind, Camila?" v-model="input" class="input is-rounded">
                            </b-field>
                            <b-field>
                                <emoji-picker @emoji="insert" :search="search" class="force-right">
                                    <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
                                        <b-button type="is-primary is-light" icon-right="emoticon-outline"/>
                                    </div>
                                    <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                                        <div>
                                            <div>
                                                <div v-for="(emojiGroup, category) in emojis" :key="category">
                                                    <h5>{{ category }}</h5>
                                                    <div>
                                                        <span
                                                        v-for="(emoji, emojiName) in emojiGroup"
                                                        :key="emojiName"
                                                        @click="insert(emoji)"
                                                        :title="emojiName"
                                                        >{{ emoji }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </emoji-picker>
                                <b-button style="margin-left: 10px" type="is-primary is-light" icon-left="send" expanded>Post</b-button>
                            </b-field>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="media-list">
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="media-meta">
                                                <strong>Sigmund Abbott</strong>
                                                <small>@xdaniel</small>
                                                <small class="has-text-grey">2 weeks ago</small>
                                            </p>
                                            <p> Et quam aut aperiam expedita eos sit. Autem accusantium impedit debitis. Ea dolores at rerum. Dolorem et quia iusto modi non atque ea. Sunt ipsam sint aliquam eveniet quaerat et.</p>
                                        </div>
                                    </div>
                                    <div class="media-right">
                                        <button class="delete"></button>
                                    </div>
                                </article>
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="media-meta">
                                                <strong>Hertha Simonis</strong>
                                                <small>@alverta.bernhard</small>
                                                <small class="has-text-grey">3 weeks ago</small>
                                            </p>
                                            <p> Optio laboriosam illo consectetur hic. Perspiciatis veritatis suscipit assumenda porro a vero necessitatibus ipsa. </p>
                                        </div>
                                    </div>
                                    <div class="media-right">
                                        <button class="delete"></button>
                                    </div>
                                </article>
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="media-meta">
                                                <strong>Mrs. Elise Corwin I</strong>
                                                <small>@lisandro35</small>
                                                <small class="has-text-grey">1 month ago</small>
                                            </p>
                                            <p> Est in et aliquid mollitia. Nesciunt autem aspernatur veniam non. Ducimus et et voluptatibus voluptas aut. Aut est aliquid qui amet id. </p>
                                        </div>
                                    </div>
                                    <div class="media-right">
                                        <button class="delete"></button>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="column" style="max-width:20em">
                    <div class="card">
                        <div class="card-content">
                            <p class="field">
                                <strong>Connected users ({{ '0' }})</strong>
                            </p>
                            <div class="container-header">
                                <b-field>
                                    <p class="image is-32x32">
                                        <b-image
                                            :src="require('@/assets/account-circle.svg')"
                                            :src-fallback="require('@/assets/account-circle.svg')"
                                            :rounded="true"
                                            :lazy="false"
                                            @error="failed_image = true"
                                        />
                                    </p>
                                    <p>Camila Cubides</p>
                                </b-field>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>
  
  <script>
  // import card from '@/components/cross/Card.vue';
  // import UserImage from '@/components/cross/UserImage.vue';
  export default {
    name: 'homeComponent',
    components: {
      // card,
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
        file: null,
        input: '',
        search: '',
      };
    },
    computed: {
      nameToShow() {
        if (!this.user.name && !this.user.lastName) return '(Name and last name not registered)';
        return `${this.user.name || ''} ${this.user.lastName || ''}`;
      },
    },
    methods: {
        insert(emoji) {
            console.log(emoji)
            this.input += emoji
        },
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

.input {
    background-color: #f6f6f6;
}
</style>

  