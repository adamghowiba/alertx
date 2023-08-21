import React, { FC, PropsWithChildren } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Frontmatter, Route } from '../types/route';

export interface DocsLayoutProps extends PropsWithChildren {
  frontmatter: Frontmatter[];
}
const frontmatterToRoutes = (
  frontmatter: Frontmatter[],
  options?: { order?: string[] }
): Route[] => {
  const order = options?.order || ['overview', 'components'];

  const routes = frontmatter.reduce((acc: Map<string, Route>, link) => {
    const [_, group, ...parts] = link.href.split('/').filter(Boolean);
    const isFlatFIle = !parts.length;

    if (isFlatFIle || !link.title) return acc;

    const currentGroup =
      acc.get(group) || acc.set(group, { label: group, pages: [] }).get(group);
    if (!currentGroup) return acc;

    acc.set(group, {
      ...currentGroup,
      pages: [...currentGroup.pages, { title: link.title, slug: link.href }],
    });

    return acc;
  }, new Map());

  return Array.from(routes.values()).sort((a, z) => {
    const aOrder = order.findIndex(
      (order) => order.toLowerCase() == a.label.toLowerCase()
    );
    const zOrder = order.findIndex(
      (order) => order.toLowerCase() == z.label.toLowerCase()
    );

    if (aOrder === -1 && zOrder === -1) return 0;
    if (aOrder === -1) return 1;
    if (zOrder === -1) return -1;

    return aOrder - zOrder;
  });
};

const DocsLayout: FC<DocsLayoutProps> = ({
  children,
  frontmatter,
  ...props
}) => {
  const routes = frontmatterToRoutes(frontmatter);

  console.log(routes);

  return (
    <>
      <div className="page">
        <Sidebar routes={routes} />
        <main>{children}</main>
      </div>

      <style jsx>{`
        .page {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: 1fr;
          width: 100%;
          height: 100%;
        }

        main {
          background-color: var(--color-background);
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};

export default DocsLayout;
