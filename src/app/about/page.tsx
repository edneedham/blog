import React from 'react'
import Header from '../components/Header'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function About() {
  const aboutPath = path.join(process.cwd(), 'src/app/about/about.mdx')
  const fileContents = fs.readFileSync(aboutPath, 'utf8')
  const { content } = matter(fileContents)
  return (
    <div>
      <Header />
      <article className="prose-custom">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
