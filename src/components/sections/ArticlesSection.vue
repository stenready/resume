<template>
  <div data-component-name="ArticlesSessions" class="ArticlesSessions">
    <div class="ArticlesSessions-title">
      <FontAwesomeIcon icon="fa-solid fa-newspaper" />

      {{ t('articles') }}
    </div>

    <ul class="articles-list">
      <li class="article-item" v-for="articleItem of listOfArticles" :key="articleItem?.id">
        <a :href="articleItem?.link" target="_blank" class="base-link">
          <img :alt="articleItem?.alt" :src="articleItem?.img" class="img" />

          <div class="title">
            {{ articleItem?.title }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import Article1 from '/public/images/article1.jfif'
import Article2 from '/public/images/article2.jfif'
import Article3 from '/public/images/article3.jfif'
import Article4 from '/public/images/article4.jfif'

const { t } = useI18n()
import { computed } from 'vue'

const listOfArticles = computed(() => {
  return [
    {
      id: crypto.randomUUID(),
      title: t('article1'),
      img: Article1,
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7129115314503462913/',
      alt: 'article 1',
    },
    {
      id: crypto.randomUUID(),
      title: t('article2'),
      img: Article2,
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7339749942971826177/',
      alt: 'article 2',
    },
    {
      id: crypto.randomUUID(),
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7136797824494497792/',
      title: t('article3'),
      img: Article3,
      alt: 'article 3',
    },
    {
      id: crypto.randomUUID(),
      title: t('article4'),
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7137537502512353281/',
      img: Article4,
      alt: 'article 4',
    },
  ]
})
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

.ArticlesSessions {
  margin: 4rem auto 0 auto;
  max-width: 60rem;
  min-height: 22rem;

  .ArticlesSessions-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .articles-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2rem;
    margin: 0 auto;

    .article-item {
      box-shadow: 0 6px 12px var(--shadow-light);
      display: flex;
      flex-direction: column;
      cursor: default;
      background: var(--card-bg);
      border-radius: 16px;
      border: 1px solid var(--border);
      overflow: hidden;
      transition:
        box-shadow 0.35s,
        transform 0.3s;

      .img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .title {
        padding: 0.7rem 1.5rem;
      }

      a {
        text-decoration: none;
        font-weight: 700;
        color: var(--accent);
        line-height: 1.5;
      }

      &:hover {
        box-shadow: 0 20px 40px var(--shadow-light);
        transform: translateY(-10px);
        cursor: pointer;
      }
    }
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    .ArticlesSessions-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;

      .fa-newspaper {
        display: none;
      }
    }

    .articles-list {
      gap: 1rem;
    }

    .article-item {
      opacity: 0.9;

      img {
        max-height: 250px;
        height: auto !important;
      }

      a {
        flex-direction: column;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .title {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
