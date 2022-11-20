<template>
    <div class="home">
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
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
                                <input type="text" autocomplete="on" :placeholder="`What's on your mind, ${user.name ? user.name: user.userName}?`" v-model="input" class="input is-rounded">
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
                                <b-button
                                    style="margin-left: 10px"
                                    type="is-primary is-light"
                                    icon-left="send"
                                    expanded
                                    @click="addNewPost()"
                                >
                                Post
                                </b-button>
                            </b-field>
                        </div>
                    </div>
                    <div class="card"
                        v-for="post in historyPosts"
                        :key="post.id"
                    >
                        <div class="card-content">
                            <div class="media-list">
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="media-meta">
                                                <small><strong>@{{ post.userName }}</strong></small>
                                                <small class="has-text-grey" style="margin-left: 1em;">{{ post.createdAt }}</small>
                                            </p>
                                            <p> {{ post.message }}</p>
                                        </div>
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
                                <strong>Connected users ({{ connectedUsersAmount }})</strong>
                            </p>
                            <div class="container-header">
                                <b-field
                                    v-for="user in connectedUsers"
                                    :key="user.userName"
                                >
                                    <p class="image is-32x32">
                                        <b-image
                                            :src="require('@/assets/account-circle.svg')"
                                            :src-fallback="require('@/assets/account-circle.svg')"
                                            :rounded="true"
                                            :lazy="false"
                                            @error="failed_image = true"
                                        />
                                    </p>
                                    <p>{{ user.name && user.lastName ? `${user.name} ${user.lastName}`: user.userName}}</p>
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
import { mapState } from 'vuex';
import posts from '@/services/posts';
import users from '@/services/users';

export default {
    name: 'homeComponent',
data() {
    return {
        name: '',
        lastName: '',
        phoneNumber: '',
        user: {},
        file: null,
        input: '',
        search: '',
        connectedUsersAmount: 0,
        connectedUsers: [],
        historyPosts: [],
        users,
        posts,
        isLoading: false,
    };
},
computed: {
    ...mapState(['authData']),
},
async created() {
    this.user = this.authData;
    this.$crontab.addJob({
      name: 'counter',
      interval: {
        seconds: '/1',
      },
      job: this.getPostsAndConnectedUsers
    })
    this.isLoading = true;
    await this.getPostsAndConnectedUsers();
    this.isLoading = false;
},
methods: {
    insert(emoji) {
        this.input += emoji
        this.users.createUser(this.authData)
    },
    async addNewPost() {
        await this.posts.createPost({message:this.input, ...this.authData});
        this.input = '';
    },
    async getPostsAndConnectedUsers() {
        this.historyPosts = await this.posts.getAllPosts(this.authData)
        this.connectedUsers = await this.users.getAllConnectedUsers(this.authData);
        this.connectedUsersAmount = this.connectedUsers.length;
    }
},
};
</script>

<style scoped>
.home {
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

  