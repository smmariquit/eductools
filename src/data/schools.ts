export interface School {
  id: string;
  name: string;
  type: 'Public' | 'Private';
  level: 'Elementary' | 'High School' | 'University';
  studentsCount: number;
  programs: string[];
}

export interface City {
  id: string;
  name: string;
  schools: School[];
}

export interface Region {
  id: string;
  name: string;
  cities: City[];
}

export const regionsData: Region[] = [
  {
    id: "ncr",
    name: "National Capital Region",
    cities: [
      {
        id: "quezon-city",
        name: "Quezon City",
        schools: [
          {
            id: "qc-science-high",
            name: "Quezon City Science High School",
            type: "Public",
            level: "High School",
            studentsCount: 3200,
            programs: ["STEM", "Advanced Science", "Mathematics"]
          },
          {
            id: "ateneo-de-manila",
            name: "Ateneo de Manila University",
            type: "Private",
            level: "University",
            studentsCount: 14000,
            programs: ["Humanities", "Management", "Science and Engineering"]
          }
        ]
      },
      {
        id: "manila",
        name: "City of Manila",
        schools: [
          {
            id: "manila-science",
            name: "Manila Science High School",
            type: "Public",
            level: "High School",
            studentsCount: 2500,
            programs: ["STEM", "Research", "Robotics"]
          }
        ]
      }
    ]
  },
  {
    id: "region-4a",
    name: "CALABARZON",
    cities: [
      {
        id: "santa-rosa",
        name: "Santa Rosa",
        schools: [
          {
            id: "santa-rosa-science",
            name: "Santa Rosa Science and Technology High School",
            type: "Public",
            level: "High School",
            studentsCount: 1500,
            programs: ["STEM", "ICT"]
          }
        ]
      }
    ]
  }
];

export function getRegion(regionId: string) {
  return regionsData.find(r => r.id === regionId);
}

export function getCity(regionId: string, cityId: string) {
  const region = getRegion(regionId);
  return region?.cities.find(c => c.id === cityId);
}

export function getSchool(regionId: string, cityId: string, schoolId: string) {
  const city = getCity(regionId, cityId);
  return city?.schools.find(s => s.id === schoolId);
}

// Helper for generateStaticParams
export function getAllSchoolRoutes() {
  const routes: { region: string; city: string; school: string }[] = [];
  regionsData.forEach(region => {
    region.cities.forEach(city => {
      city.schools.forEach(school => {
        routes.push({
          region: region.id,
          city: city.id,
          school: school.id,
        });
      });
    });
  });
  return routes;
}
