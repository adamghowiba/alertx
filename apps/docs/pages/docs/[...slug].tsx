import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useMemo } from 'react';
// import { getMdxBySlug } from '../../libs/utils/mdx';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllFrontmatter, getMdxBySlug } from 'apps/docs/libs/utils/mdx';
import DocsLayout from 'apps/docs/libs/layouts/DocsLayout';
import { Frontmatter } from 'apps/docs/libs/types/route';
import Example from 'apps/docs/libs/components/Example/Example';
import { MDXProvider } from '@mdx-js/react';

export const getStaticProps: GetStaticProps<{
  frontmatter: any;
  code: any;
  frontmatterList: Frontmatter[];
}> = async (context) => {
  const path = (context.params?.slug as string[]).join('/');
  const { frontmatter, code } = await getMdxBySlug('/', path);
  const frontmatterList = getAllFrontmatter('/');

  return {
    props: { frontmatter, code, frontmatterList },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const frontMatter = getAllFrontmatter('/');

  const paths = frontMatter.map((data) =>
    data.href.replace('/docs', '').split('/').filter(Boolean)
  );

  return {
    fallback: false,
    paths: paths.map((path) => ({ params: { slug: path } })),
  };
};

const Doc: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  code,
  frontmatter,
  frontmatterList,
}) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <DocsLayout frontmatter={frontmatterList}>
        <MDXProvider components={{Example: () => {
          return <Example />
        }}}>
          <Component
            components={{
              h1: (props) => {
                return <h1 style={{ color: 'red' }}>{props.children}</h1>;
              },
            }}
          />
        </MDXProvider>
      </DocsLayout>
    </>
  );
};

export default Doc;
