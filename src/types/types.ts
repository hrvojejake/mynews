import { ReactNode } from "react";

export interface MyNewsProviderProps {
    children: ReactNode;
};

export interface MyNewsContextProp {
    showCTA: boolean;
    setShowCTA: React.Dispatch<React.SetStateAction<boolean>>;
    showCTABuble: boolean;
    setShowCTABuble: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    windowWidth: number;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchPage: number;
    setSearchPage: React.Dispatch<React.SetStateAction<number>>;
    maxSearchPage: number;
    setMaxSearchPage: React.Dispatch<React.SetStateAction<number>>;
    searchData: articleItemProps[];
    setSearchData: React.Dispatch<React.SetStateAction<articleItemProps[]>>;
    searchDataTrue: boolean;
    setSearchDataTrue: React.Dispatch<React.SetStateAction<boolean>>;
    searchLoading: boolean;
    setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
    favoriteArticles: articleItemProps[];
    setFavoriteArticles: React.Dispatch<
        React.SetStateAction<articleItemProps[]>
    >;
    searchError: boolean;
    setSearchError: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface articleItemProps {
    uri: string;
    title: string;
    section: string;
    author: string;
    image: string;
    url: string;
};

export interface articleItemLatestProps {
    uri: string
    title: string
    hours: string
    minutes: string
};
export interface articleLatestProps {
    article: articleItemLatestProps
  }


export interface articleProps {
    article: articleItemProps
  }

export interface NYTItemMultimedia {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
}

export interface NYTItem {
    section: string;
    subsection: string;
    title: string;
    abstract: string;
    url: string;
    uri: string;
    byline: string;
    item_type: string;
    updated_date: Date;
    created_date: Date;
    published_date: Date;
    material_type_facet: string;
    kicker: string;
    des_facet: string[];
    org_facet: string[];
    per_facet: string[];
    geo_facet: string[];
    multimedia: NYTItemMultimedia[];
    short_url: string;
}

export interface LatestNewRawDataSource {
    id: string;
    name: string;
}

export interface LatestNewRawDataArticle {
    source: LatestNewRawDataSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export interface LatestNewRawDataRootObject {
    status: string;
    totalResults: number;
    articles: LatestNewRawDataArticle[];
}

export interface SearchRawDataHeadline {
    main: string;
    kicker: string;
    content_kicker?: any;
    print_headline?: any;
    name?: any;
    seo?: any;
    sub?: any;
}

export interface SearchRawDataPerson {
    firstname: string;
    middlename?: any;
    lastname: string;
    qualifier?: any;
    title?: any;
    role: string;
    organization: string;
    rank: number;
}

export interface SearchRawDataByline {
    original: string;
    person: SearchRawDataPerson[];
    organization?: any;
}

export interface SearchRawDataRootObject {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    source: string;
    multimedia: any[];
    headline: SearchRawDataHeadline;
    keywords: any[];
    pub_date: Date;
    document_type: string;
    news_desk: string;
    section_name: string;
    byline: SearchRawDataByline;
    _id: string;
    word_count: number;
    uri: string;
}


