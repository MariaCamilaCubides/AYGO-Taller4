<template>
    <div
      class="is-align-items-center is-flex userImage"
    >
      <b-icon
        v-if="isInNavbar && failed_image"
        icon="account-circle"
        size="is-small"
        style="font-size: 24px;"
      />
      <div
        v-else
        id="avatar-circle"
        :class="{whiteCircle: isInNavbar && !inNavbarActive,
                 activeCircle: isInNavbar && inNavbarActive}"
      >
        <b-image
          :style="`width: ${size}px`"
          :src="require('@/assets/account-circle.svg')"
          :src-fallback="require('@/assets/account-circle.svg')"
          :alt="`${email} profile picture`"
          :rounded="true"
          :lazy="lazy"
          @error="failed_image = true"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      email: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        default: 22,
      },
      isInNavbar: {
        type: Boolean,
        default: false,
      },
      inNavbarActive: {
        type: Boolean,
        default: false,
      },
      lazy: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        failed_image: false,
      };
    },
  };
  </script>
  <style scoped>
  div.userImage{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #avatar-circle{
    border-radius:100%;
  }
  #avatar-circle.whiteCircle{
   border: 3px solid white;
  }
  #avatar-circle.activeCircle{
   border: 3px solid #632d8e;
  }
  </style>