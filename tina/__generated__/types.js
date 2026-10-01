export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  __typename
  title
  slug
  excerpt
  publishDate
  readTime
  views
  featured
  featuredImage {
    __typename
    src
    alt
    caption
  }
  gallery {
    __typename
    src
    alt
    caption
  }
  category {
    ... on Category {
      __typename
      name
      slug
      description
      color
      icon
      order
      seo {
        __typename
        metaTitle
        metaDescription
        keywords
        canonicalUrl
        ogTitle
        ogDescription
        ogImage
        ogType
        twitterCard
        noindex
        nofollow
        structuredData
        lastmod
      }
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  tags
  author {
    __typename
    name
    role
    bio
    avatar
    email
    website
    linkedin
    twitter
  }
  relatedPosts {
    __typename
    post {
      ... on Post {
        __typename
        title
        slug
        excerpt
        publishDate
        readTime
        views
        featured
        featuredImage {
          __typename
          src
          alt
          caption
        }
        gallery {
          __typename
          src
          alt
          caption
        }
        category {
          ... on Category {
            __typename
            name
            slug
            description
            color
            icon
            order
            seo {
              __typename
              metaTitle
              metaDescription
              keywords
              canonicalUrl
              ogTitle
              ogDescription
              ogImage
              ogType
              twitterCard
              noindex
              nofollow
              structuredData
              lastmod
            }
          }
          ... on Document {
            _sys {
              filename
              basename
              hasReferences
              breadcrumbs
              path
              relativePath
              extension
            }
            id
          }
        }
        tags
        author {
          __typename
          name
          role
          bio
          avatar
          email
          website
          linkedin
          twitter
        }
        relatedPosts {
          __typename
          post {
            ... on Post {
              __typename
              title
              slug
              excerpt
              publishDate
              readTime
              views
              featured
              featuredImage {
                __typename
                src
                alt
                caption
              }
              gallery {
                __typename
                src
                alt
                caption
              }
              tags
              author {
                __typename
                name
                role
                bio
                avatar
                email
                website
                linkedin
                twitter
              }
              relatedPosts {
                __typename
              }
              faq {
                __typename
                question
                answer
              }
              seo {
                __typename
                metaTitle
                metaDescription
                keywords
                canonicalUrl
                ogTitle
                ogDescription
                ogImage
                ogType
                twitterCard
                noindex
                nofollow
                structuredData
                lastmod
              }
              body
            }
            ... on Document {
              _sys {
                filename
                basename
                hasReferences
                breadcrumbs
                path
                relativePath
                extension
              }
              id
            }
          }
        }
        faq {
          __typename
          question
          answer
        }
        seo {
          __typename
          metaTitle
          metaDescription
          keywords
          canonicalUrl
          ogTitle
          ogDescription
          ogImage
          ogType
          twitterCard
          noindex
          nofollow
          structuredData
          lastmod
        }
        body
      }
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  faq {
    __typename
    question
    answer
  }
  seo {
    __typename
    metaTitle
    metaDescription
    keywords
    canonicalUrl
    ogTitle
    ogDescription
    ogImage
    ogType
    twitterCard
    noindex
    nofollow
    structuredData
    lastmod
  }
  body
}
    `;
export const CategoryPartsFragmentDoc = gql`
    fragment CategoryParts on Category {
  __typename
  name
  slug
  description
  color
  icon
  order
  seo {
    __typename
    metaTitle
    metaDescription
    keywords
    canonicalUrl
    ogTitle
    ogDescription
    ogImage
    ogType
    twitterCard
    noindex
    nofollow
    structuredData
    lastmod
  }
}
    `;
export const TagPartsFragmentDoc = gql`
    fragment TagParts on Tag {
  __typename
  name
  slug
  color
}
    `;
export const GalleryPartsFragmentDoc = gql`
    fragment GalleryParts on Gallery {
  __typename
  images {
    __typename
    src
    alt
    caption
  }
  featuredImages {
    __typename
    src
    alt
    caption
  }
}
    `;
export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  title
  route
  sections {
    __typename
    ... on PageSectionsPageHeader {
      badge
      title
      subtitle
      badges
      bare
    }
    ... on PageSectionsHero {
      badge
      image
      heading
      headingAccent
      headingSuffix
      subtext
      badges
      cards {
        __typename
        title
        text
      }
      primaryCta {
        __typename
        label
        href
      }
      secondaryCta {
        __typename
        label
        href
      }
      areaText
      areaLinkLabel
      areaLinkHref
    }
    ... on PageSectionsServices {
      heading
      subtext
      items {
        __typename
        icon
        title
        description
        details
      }
    }
    ... on PageSectionsFeatures {
      heading
      subtext
      items {
        __typename
        icon
        title
        description
        details
      }
      footerNotes
    }
    ... on PageSectionsProcess {
      heading
      subtext
      steps {
        __typename
        icon
        title
        description
        details
      }
      ctaText
      ctaPrimary {
        __typename
        label
        href
      }
      ctaSecondary {
        __typename
        label
        href
      }
    }
    ... on PageSectionsTestimonials {
      heading
      subtext
      items {
        __typename
        name
        content
        rating
        location
        service
        date
        verified
      }
      footnotes
      note
    }
    ... on PageSectionsFaq {
      heading
      subtext
      categories {
        __typename
        key
        label
      }
      items {
        __typename
        question
        answer
        category
        featured
      }
      ctaText
      ctaPrimary {
        __typename
        label
        href
      }
      ctaSecondary {
        __typename
        label
        href
      }
    }
    ... on PageSectionsQa {
      heading
      items {
        __typename
        question
        answer
      }
    }
    ... on PageSectionsCta {
      heading
      text
      primaryCta {
        __typename
        label
        href
      }
      secondaryCta {
        __typename
        label
        href
      }
      infoItems
      trustItems
    }
    ... on PageSectionsStats {
      heading
      items {
        __typename
        value
        label
      }
    }
    ... on PageSectionsListGrid {
      heading
      subtext
      entries
      note
    }
    ... on PageSectionsRichText {
      heading
      content
    }
    ... on PageSectionsContactPanel {
      infoHeading
      contacts {
        __typename
        icon
        title
        text
        note
        href
      }
      prepTitle
      prepItems
      formHeading
    }
  }
  seo {
    __typename
    metaTitle
    metaDescription
    keywords
    canonicalUrl
    ogTitle
    ogDescription
    ogImage
    ogType
    twitterCard
    noindex
    nofollow
    structuredData
    lastmod
  }
  body
}
    `;
export const PostDocument = gql`
    query post($relativePath: String!) {
  post(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PostParts
  }
}
    ${PostPartsFragmentDoc}`;
export const PostConnectionDocument = gql`
    query postConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PostFilter) {
  postConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PostParts
      }
    }
  }
}
    ${PostPartsFragmentDoc}`;
export const CategoryDocument = gql`
    query category($relativePath: String!) {
  category(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CategoryParts
  }
}
    ${CategoryPartsFragmentDoc}`;
export const CategoryConnectionDocument = gql`
    query categoryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CategoryFilter) {
  categoryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CategoryParts
      }
    }
  }
}
    ${CategoryPartsFragmentDoc}`;
export const TagDocument = gql`
    query tag($relativePath: String!) {
  tag(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TagParts
  }
}
    ${TagPartsFragmentDoc}`;
export const TagConnectionDocument = gql`
    query tagConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TagFilter) {
  tagConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TagParts
      }
    }
  }
}
    ${TagPartsFragmentDoc}`;
export const GalleryDocument = gql`
    query gallery($relativePath: String!) {
  gallery(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GalleryParts
  }
}
    ${GalleryPartsFragmentDoc}`;
export const GalleryConnectionDocument = gql`
    query galleryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GalleryFilter) {
  galleryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GalleryParts
      }
    }
  }
}
    ${GalleryPartsFragmentDoc}`;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    post(variables, options) {
      return requester(PostDocument, variables, options);
    },
    postConnection(variables, options) {
      return requester(PostConnectionDocument, variables, options);
    },
    category(variables, options) {
      return requester(CategoryDocument, variables, options);
    },
    categoryConnection(variables, options) {
      return requester(CategoryConnectionDocument, variables, options);
    },
    tag(variables, options) {
      return requester(TagDocument, variables, options);
    },
    tagConnection(variables, options) {
      return requester(TagConnectionDocument, variables, options);
    },
    gallery(variables, options) {
      return requester(GalleryDocument, variables, options);
    },
    galleryConnection(variables, options) {
      return requester(GalleryConnectionDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
