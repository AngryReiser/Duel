// Services
import * as MeService from '@/services/me';
import * as SessionService from '@/services/session';

// Components
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-button': BaseButton,
    'z-loading': BaseLoading,
  },

  data() {
    return {
      loading: false,
      user: {
        nickname: null,
        email: null,
        avatar: 'null',
        rank: null,
        gold: null,
        level: null,
        experience: null,
        karma: false,
        craftsmanship: null,
        idSkills: [],
      },
    };
  },

  computed: {
    pathAvatar() {
      return require(`@/assets/avatars/${this.user.avatar}.png`);
    },
  },

  created() {
    MeService.getMe()
      .then((response) => {
        console.log(response);

        this.user = response;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
        SessionService.signOut();
        this.$router.push({ path: '/signin' });
      });
  },

  methods: {
    pathSkill(id) {
      return require(`@/assets/skills/${id}.png`);
    },
  },
};