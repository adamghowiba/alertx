import fs from 'fs';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
// import readingTime from 'reading-time';
// import compareVersions from 'compare-versions';
// import remarkSlug from 'remark-slug';
// import rehypeHeroCodeBlock from '@lib/rehype-hero-code-block';
// import rehypeMetaAttribute from '@lib/rehype-meta-attribute';
// import rehypeHighlightCode from '@lib/rehype-highlight-code';
import remarkFrontmatter from 'remark-frontmatter';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import { Frontmatter } from '../types/route';
import {} from '@mdx-js/react'

// import type { Frontmatter } from 'types/frontmatter';

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, 'data');

// the front matter and content of all mdx files based on `docsPaths`
export const getAllFrontmatter = (
  fromPath: string
): (Frontmatter & { href: string; filePath: string })[] => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = glob.sync(`${PATH}/**/*.mdx`);

  return paths.map((filePath) => {
    const source = fs.readFileSync(path.join(filePath), 'utf8');
    const { data, content } = matter(source);

    const href = filePath.replace('.mdx', '').split("data")[1];

    return {
      ...(data as Frontmatter),
      href: `/docs${href}`,
      filePath: filePath.replace(`${DATA_PATH}/`, '').replace('.mdx', ''),
    };
  });
};

export const getMdxBySlug = async (
  basePath: string,
  slug?: string | string[]
) => {
  const source = fs.readFileSync(
    path.join(DATA_PATH, basePath, `${slug}.mdx`),
    'utf8'
  );

  const { frontmatter, code } = await bundleMDX({
    source,
    mdxOptions: (options, formatter) => {
      return {
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        format: 'mdx',
      };
    },
  });

  return { frontmatter, code };
};

// export function getAllVersionsFromPath(fromPath) {
//   const PATH = path.join(DATA_PATH, fromPath);
//   if (!fs.existsSync(PATH)) return [];
//   return fs
//     .readdirSync(PATH)
//     .map((fileName) => fileName.replace('.mdx', ''))
//     .sort(compareVersions)
//     .reverse();
// }
