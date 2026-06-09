import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  EN: {
    translation: {
      "Home": "Home",
      "Blog": "Blog",
      "Biology": "Biology",
      "Physics": "Physics",
      "Chemistry": "Chemistry",
      "Earth Science": "Earth Science",
      "Welcome": "Learning Modules & Visualizers",
      "WelcomeDesc": "Welcome to the Eductools Portal. Select an interactive module below. These resources are designed to align with the MATATAG curriculum and provide supplemental visual instruction for Philippine classrooms.",
      "Filter by": "Filter by Grade / Subject",
      "Clear Filters": "Clear Filters",
      "No modules": "No modules found for the selected filter.",
      "Open Module": "Open Module"
    }
  },
  PH: {
    translation: {
      "Home": "Home",
      "Blog": "Blog",
      "Biology": "Biology",
      "Physics": "Physics",
      "Chemistry": "Chemistry",
      "Earth Science": "Earth Science",
      "Welcome": "Interactive Modules & Visualizers",
      "WelcomeDesc": "Welcome sa Eductools Portal! Mamili ng isa sa mga interactive modules sa ibaba. Ginawa ang mga visualizers na ito para suportahan ang MATATAG curriculum at tulungan kang mas maintindihan ang mga konsepto sa Science at Math.",
      "Filter by": "Hanapin ayon sa Baitang / Asignatura",
      "Clear Filters": "Alisin ang mga Filter",
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
