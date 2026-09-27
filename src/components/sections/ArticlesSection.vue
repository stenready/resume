<template>
  <div data-component-name="ArticlesSessions" class="ArticlesSessions">
    <h2 class="ArticlesSessions-title">
      <FontAwesomeIcon icon="fa-solid fa-newspaper" />

      {{ t('articles') }}
    </h2>

    <ul class="articles-list">
      <li
        v-for="article of ARTICLES"
        :key="article.id"
        class="article-item"
        :class="{ featured: article.featured }"
      >
        <a :href="article.link" target="_blank" rel="noopener noreferrer" class="article-link">
          <img
            v-if="article.img"
            :alt="t(article.titleKey)"
            :src="article.img"
            class="img"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="cover" aria-hidden="true">
            <FontAwesomeIcon :icon="article.coverIcon" />
          </div>

          <div class="article-body">
            <div class="article-meta">
              <time :datetime="article.date">{{ formatDate(article.date) }}</time>
              · LinkedIn ↗
            </div>

            <div class="title">{{ t(article.titleKey) }}</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Article1 from '/public/images/article1.webp'
import Article2 from '/public/images/article2.webp'
import Article3 from '/public/images/article3.webp'
import Article4 from '/public/images/article4.webp'

const { t, locale } = useI18n()

const ARTICLES = [
  {
    id: 'djinni-validation',
    titleKey: 'article5',
    date: '2026-09-12',
    featured: true,
    coverIcon: 'fa-solid fa-shield-halved',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7504454763992977408/',
  },
  {
    id: 'vue-mixins',
    titleKey: 'article2',
    date: '2025-06-14',
    img: Article2,
    link: 'https://www.linkedin.com/pulse/vue-mixins-%25D0%25BC%25D0%25B0%25D0%25B3%25D0%25B8%25D1%258F-%25D0%25B8%25D0%25BB%25D0%25B8-%25D0%25B1%25D0%25B0%25D0%25BD%25D0%25B0%25D0%25BB%25D1%258C%25D1%2589%25D0%25B8%25D0%25BD%25D0%25B0-stanislav-radchenko-zpjqe',
  },
  {
    id: 'oop-solid',
    titleKey: 'article4',
    date: '2023-12-04',
    img: Article4,
    link: 'https://www.linkedin.com/pulse/%25D0%25BF%25D0%25BE%25D1%2587%25D0%25B5%25D0%25BC%25D1%2583-%25D0%25BE%25D0%25BE%25D0%25BF-%25D0%25B8-solid-%25D0%25B2%25D0%25B0%25D0%25B6%25D0%25BD%25D1%258B-%25D0%25B2-%25D0%25BC%25D0%25B8%25D1%2580%25D0%25B5-javascript-stanislav-radchenko-qxobc',
  },
  {
    id: 'proxy-define-property',
    titleKey: 'article3',
    date: '2023-12-02',
    img: Article3,
    link: 'https://www.linkedin.com/pulse/%25D0%25B2%25D0%25B2%25D0%25B5%25D0%25B4%25D0%25B5%25D0%25BD%25D0%25B8%25D0%25B5-%25D0%25B2-%25D1%2580%25D0%25B5%25D0%25B0%25D0%25BA%25D1%2582%25D0%25B8%25D0%25B2%25D0%25BD%25D0%25BE%25D1%2581%25D1%2582%25D1%258C-javascript-proxy-vs-stanislav-radchenko-txbie',
  },
  {
    id: 'jwt-axios',
    titleKey: 'article1',
    date: '2023-11-11',
    img: Article1,
    link: 'https://www.linkedin.com/pulse/%25D1%2580%25D0%25B5%25D0%25B0%25D0%25BB%25D0%25B8%25D0%25B7%25D0%25B0%25D1%2586%25D0%25B8%25D1%258F-%25D1%2581%25D0%25B5%25D1%2580%25D0%25B2%25D0%25B8%25D1%2581%25D0%25B0-%25D0%25B4%25D0%25BB%25D1%258F-%25D1%2583%25D0%25BF%25D1%2580%25D0%25B0%25D0%25B2%25D0%25BB%25D0%25B5%25D0%25BD%25D0%25B8%25D1%258F-jwt-%25D1%2582%25D0%25BE%25D0%25BA%25D0%25B5%25D0%25BD%25D0%25B0%25D0%25BC%25D0%25B8-%25D1%2581-axios-radchenko-jange',
  },
]

const formatDate = (isoDate: string) =>
  new Intl.DateTimeFormat(locale.value, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate))
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$imageHeight: 200px;

.ArticlesSessions {
  margin: 4rem auto 0 auto;
  max-width: $contentMaxWidth;

  .ArticlesSessions-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .articles-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin: 0;
  }

  .article-item {
    display: flex;
    background: var(--card-color);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 6px 12px var(--shadow-light);
    overflow: hidden;
    transition:
      box-shadow 0.35s,
      transform 0.3s;

    &:hover {
      box-shadow: 0 20px 40px var(--shadow-light);
      transform: translateY(-6px);
    }
  }

  .article-link {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-decoration: none;
  }

  .img {
    width: 100%;
    height: $imageHeight;
    object-fit: cover;
  }

  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $imageHeight;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: var(--white);
    font-size: 4rem;
  }

  .featured {
    grid-column: 1 / -1;
  }

  .article-body {
    padding: 1rem 1.25rem 1.25rem;
  }

  .article-meta {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text);
    opacity: 0.75;
  }

  .title {
    margin-top: 0.4rem;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--accent);
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;

    .ArticlesSessions-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;

      .fa-newspaper {
        display: none;
      }
    }

    .articles-list {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .article-item {
    }
  }
}
</style>
