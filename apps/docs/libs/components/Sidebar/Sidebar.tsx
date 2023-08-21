import Link from 'next/link';
import React, { FC } from 'react';
import { Route } from '../../types/route';
import { getAllFrontmatter } from '../../utils/mdx';

export interface SidebarProps {
  routes?: Route[];
}

const DOC_ROUTES: Route[] = [
  {
    label: 'Overview',
    pages: [
      { title: 'Quick Start', slug: '/docs/quickstart' },
      { title: 'Overview', slug: '/docs/overview' },
    ],
  },
];

const Sidebar: FC<SidebarProps> = ({ routes = DOC_ROUTES, ...props }) => {

  return (
    <>
      <nav className="sidebar">
        {routes.map((route) => (
          <div className="routes" key={route.label}>
            <h3 className="routes__title">{route.label}</h3>

            <div className="pages">
              {route.pages.map((page) => (
                <div key={page.title}>
                  <Link href={page.slug}>{page.title}</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 200px;
          height: 100%;
          background-color: var(--color-background);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem 1.5rem;
        }

        .routes {
          display: flex;
          flex-direction: column;
          gap: 10px;

          &__title {
            text-transform: capitalize;
          }
        }

        .pages {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
