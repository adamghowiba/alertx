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

export const getStaticProps: GetStaticProps<{
  frontmatter: any;
  code: any;
}> = async (context) => {
  const { frontmatter, code } = await getMdxBySlug(
    'overview/',
    context.params?.slug
  );

  const frontMatter = getAllFrontmatter('/overview');

  console.log(frontMatter)

  return {
    props: { frontmatter, code },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: [{ params: { slug: 'quickstart' } }],
  };
};

const Doc: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  code,
  frontmatter,
}) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <DocsLayout routes={}>
        <Component
          components={{
            h1: (props) => {
              return <h1 style={{ color: 'red' }}>{props.children}</h1>;
            },
          }}
        />
      </DocsLayout>
    </>
  );
};

export default Doc;
