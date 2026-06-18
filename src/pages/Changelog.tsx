import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ReleaseChangelog, VersionBadge } from '../components/versioning';
import {
  SITE_VERSION,
  siteChangelog,
  toolVersions,
} from '../data/versioning';
import { visualizerModules } from '../data/registry';

const ChangelogPage = () => {
  const tools = visualizerModules
    .map((m) => ({
      ...m,
      version: toolVersions[m.id]?.version ?? '—',
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Helmet>
        <title>Changelog | EduVisualsPH</title>
        <meta
          name="description"
          content={`Release history for EduVisualsPH (v${SITE_VERSION}) and every interactive visualizer.`}
        />
      </Helmet>

      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-4xl font-bold text-primary m-0">Changelog</h1>
          <VersionBadge version={SITE_VERSION} />
        </div>
        <p className="text-lg text-base-content/80 max-w-2xl m-0">
          Semantic versioning for the site and each visualizer.{' '}
          <strong>Major</strong> breaks compatibility, <strong>minor</strong> adds features or
          content, <strong>patch</strong> fixes bugs.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-base-content mb-6 border-b border-base-300 pb-2">
          Site releases
        </h2>
        <ReleaseChangelog releases={siteChangelog} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-base-content mb-2 border-b border-base-300 pb-2">
          Tool versions
        </h2>
        <p className="text-base-content/70 mb-6 text-sm">
          Current semver for each module. Open a tool and expand its changelog for full release notes.
        </p>
        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table table-sm md:table-md">
            <thead>
              <tr className="bg-base-200">
                <th>Tool</th>
                <th className="w-28">Version</th>
                <th className="hidden sm:table-cell">Latest notes</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => {
                const latest = toolVersions[tool.id]?.changelog[0];
                return (
                  <tr key={tool.id} className="hover:bg-base-200/50">
                    <td>
                      <Link to={tool.path} className="link link-primary font-medium">
                        {tool.title}
                      </Link>
                    </td>
                    <td>
                      <VersionBadge version={tool.version} size="sm" />
                    </td>
                    <td className="hidden sm:table-cell text-sm text-base-content/70 max-w-md truncate">
                      {latest?.changes[0] ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ChangelogPage;
