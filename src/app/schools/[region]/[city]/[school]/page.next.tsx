import { notFound } from 'next/navigation';
import { getSchool, getCity, getRegion, getAllSchoolRoutes } from '../../../../../data/schools';
import Link from 'next/link';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export function generateStaticParams() {
  return getAllSchoolRoutes();
}

export function generateMetadata({ params }: { params: { region: string; city: string; school: string } }) {
  const schoolData = getSchool(params.region, params.city, params.school);
  if (!schoolData) return { title: 'School Not Found' };
  
  const cityData = getCity(params.region, params.city);
  return {
    title: `${schoolData.name} - ${cityData?.name} | Eductools Directory`,
    description: `Comprehensive data and interactive tools for ${schoolData.name} located in ${cityData?.name}. Part of the Eductools programmatic SEO directory.`,
  };
}

import { getTranslations } from 'next-intl/server';

export default async function SchoolPage({ params }: { params: { region: string; city: string; school: string } }) {
  const t = await getTranslations('Schools');
  const school = getSchool(params.region, params.city, params.school);
  const city = getCity(params.region, params.city);
  const region = getRegion(params.region);

  if (!school || !city || !region) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-sm breadcrumbs mb-8 text-base-content/60">
        <ul>
          <li><Link href="/">{t('home')}</Link></li>
          <li><Link href="/schools">{t('schools')}</Link></li>
          <li><Link href={`/schools/${region.id}`}>{region.name}</Link></li>
          <li><Link href={`/schools/${region.id}/${city.id}`}>{city.name}</Link></li>
          <li className="font-semibold text-primary">{school.name}</li>
        </ul>
      </div>

      <div className="bg-base-200 rounded-2xl p-8 border border-base-300 shadow-xl mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <GraduationCap size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">{school.name}</h1>
            <p className="text-lg text-base-content/70 mt-1">{city.name}, {region.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-base-100 p-6 rounded-xl border border-base-200 flex flex-col items-center text-center">
            <div className="text-base-content/50 uppercase tracking-widest text-xs font-bold mb-2">{t('institutionType')}</div>
            <div className="text-xl font-semibold">{school.type}</div>
          </div>
          <div className="bg-base-100 p-6 rounded-xl border border-base-200 flex flex-col items-center text-center">
            <div className="text-base-content/50 uppercase tracking-widest text-xs font-bold mb-2">{t('educationLevel')}</div>
            <div className="text-xl font-semibold">{school.level}</div>
          </div>
          <div className="bg-base-100 p-6 rounded-xl border border-base-200 flex flex-col items-center text-center">
            <div className="text-base-content/50 uppercase tracking-widest text-xs font-bold mb-2">{t('studentPopulation')}</div>
            <div className="text-xl font-semibold text-primary flex items-center gap-2">
              <Users size={20} />
              {school.studentsCount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="text-primary" />
          {t('academicPrograms')}
        </h2>
        <div className="flex flex-wrap gap-3">
          {school.programs.map(program => (
            <div key={program} className="badge badge-lg badge-outline badge-primary p-4 font-semibold">
              {program}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-base-200 rounded-xl p-8 text-center border border-base-300">
        <h3 className="text-xl font-bold mb-4">{t('studentEducator')}</h3>
        <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
          {t('enhanceLearning')}
        </p>
        <Link href="/" className="btn btn-primary btn-lg">{t('exploreTools')}</Link>
      </div>
    </div>
  );
}
