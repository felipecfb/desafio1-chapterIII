import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Head from 'next/head';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { FiCalendar, FiUser } from 'react-icons/fi';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const formattedPost = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });

  return (
    <>
      <Head>Home | spacetraveling</Head>

      <main className={commonStyles.container}>
        <Header />
        <div className={styles.container}>
          {formattedPost.map(post => (
            <Link href={`post/${post.uid}`} key={post.uid}>
              <a href={`post/${post.uid}`}>
                <div className={styles.post}>
                  <h2 className={styles.postTitle}>{post.data.title}</h2>
                  <p className={styles.postSubtitle}>{post.data.subtitle}</p>
                  <div className={styles.postInfo}>
                    <div className={styles.postDate}>
                      <FiCalendar />
                      <p>{post.first_publication_date}</p>
                    </div>
                    <div className={styles.postAuthor}>
                      <FiUser />
                      <p>{post.data.author}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
          {postsPagination.next_page && (
            <button className={styles.morePosts}>Carregar mais posts</button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.getByType('posts', {
    pageSize: 6,
  });

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
