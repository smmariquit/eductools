import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  EN: {
    translation: {
      "Home": "Home",
      "Blog": "Blog",
      "Solar System": "Solar System",
      "Wave Physics": "Wave Physics",
      "Welcome": "Learning Modules & Visualizers",
      "WelcomeDesc": "Welcome to the Eductools Portal. Select an interactive module below. These resources are designed to align with the MATATAG curriculum and provide supplemental visual instruction for Philippine classrooms.",
      "Filter by": "Filter by Grade / Subject:",
      "Clear Filters": "Clear Filters",
      "No modules": "No modules found for the selected filter.",
      "Open Module": "Open Module"
    }
  },
  PH: {
    translation: {
      "Home": "Home",
      "Blog": "Mga Blog",
      "Solar System": "Sistemang Solar",
      "Wave Physics": "Pisika ng Alon",
      "Welcome": "Mga Modyul ng Pag-aaral at Visualizer",
      "WelcomeDesc": "Maligayang pagdating sa Eductools Portal. Pumili ng isang interactive na modyul sa ibaba. Ang mga mapagkukunang ito ay idinisenyo upang umayon sa kurikulum ng MATATAG at magbigay ng pandagdag na visual na pagtuturo para sa mga silid-aralan sa Pilipinas.",
      "Filter by": "I-filter ayon sa Baitang / Asignatura:",
      "Clear Filters": "I-clear ang mga Filter",
      "No modules": "Walang natagpuang modyul para sa napiling filter.",
      "Open Module": "Buksan ang Modyul"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "EN", 
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
