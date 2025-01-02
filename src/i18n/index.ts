import { createI18n } from 'vue-i18n';
import en from './en';
import vi from './vi';

const messages = {
  en,
  vi,
};

// Tạo instance i18n
const i18n = createI18n({
  legacy: false, // Sử dụng Composition API
  locale: 'vi', // Ngôn ngữ mặc định
  fallbackLocale: 'vi',
  messages,
});

export default i18n;
