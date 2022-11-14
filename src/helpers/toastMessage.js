import { main } from '@/main';

export default {
  showError(message, duration) {
    main.$buefy.toast.open({
      duration: duration || 1000 * 5,
      message,
      type: 'is-warning',
      queue: false,
      pauseOnHover: true,
      position: 'is-top',
    });
  },
  showSuccess(message, duration) {
    main.$buefy.toast.open({
      duration: duration || 1000 * 5,
      message,
      type: 'is-primary',
      queue: false,
      pauseOnHover: true,
      position: 'is-top',
    });
  },
  showInfo(message, duration) {
    main.$buefy.toast.open({
      duration: duration || 1000 * 5,
      message,
      type: 'is-white is-light',
      queue: false,
      pauseOnHover: true,
      position: 'is-top',
    });
  },
};