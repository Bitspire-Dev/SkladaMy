import type { Schema, Struct } from '@strapi/strapi';

export interface BlogAuthor extends Struct.ComponentSchema {
  collectionName: 'components_blog_authors';
  info: {
    description: 'Informacje o autorze artyku\u0142u';
    displayName: 'Author';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    email: Schema.Attribute.Email;
    linkedin: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'Sk\u0142adaMy Team'>;
    role: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    twitter: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface BlogFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_blog_faq_items';
  info: {
    description: 'Element FAQ dla Schema.org FAQPage';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    question: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Rozszerzone ustawienia SEO';
    displayName: 'SEO';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    lastmod: Schema.Attribute.DateTime;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    nofollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.Enumeration<['website', 'article', 'product']> &
      Schema.Attribute.DefaultTo<'article'>;
    structuredData: Schema.Attribute.JSON;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.author': BlogAuthor;
      'blog.faq-item': BlogFaqItem;
      'shared.seo': SharedSeo;
    }
  }
}
