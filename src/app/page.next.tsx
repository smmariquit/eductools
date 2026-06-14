import Link from 'next/link';
import { regionsData } from '../data/schools';
import { getTranslations } from 'next-intl/server';

export default async function NextHome() {
  const t = await getTranslations('Home');

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">{t('title')}</h1>
        <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regionsData.map(region => (
          <div key={region.id} className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">{region.name}</h2>
              <ul className="space-y-4">
                {region.cities.map(city => (
                  <li key={city.id}>
                    <div className="font-semibold text-base-content/80 mb-2">{city.name}</div>
                    <ul className="pl-4 border-l-2 border-primary/20 space-y-2">
                      {city.schools.map(school => (
                        <li key={school.id}>
                          <Link 
                            href={`/schools/${region.id}/${city.id}/${school.id}`}
                            className="text-primary hover:underline"
                          >
                            {school.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
