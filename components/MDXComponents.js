import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import ListLayout from '@/layouts/ListLayout'
import AuthorLayout from '@/layouts/AuthorLayout'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    switch (layout) {
      case 'PostLayout':
        return <PostLayout {...rest} />
      case 'PostSimple':
        return <PostSimple {...rest} />
      case 'ListLayout':
        return <ListLayout {...rest} />
      case 'AuthorLayout':
        return <AuthorLayout {...rest} />
    }
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
