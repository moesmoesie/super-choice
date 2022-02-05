import ArticleCard from './ArticleCard'
import { useState, createContext } from 'react';
import FilterRow from '../../../components/FilterRow';
import CollectionGrid from '../../../components/CollectionGrid';
import { AnimatePresence } from 'framer-motion';
import { useFilterCollection } from '../../hooks/useFilterCollection';

const PageContext = createContext();

export default function ArticleCollection({ pageData }) {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { data } = useFilterCollection({ filter: selectedFilter, collection: pageData.articles })

    function onFilterClick(value) {
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow
                onClick={onFilterClick}
                currentFilter={selectedFilter}

                filters={pageData.articleFilters} />
            <CollectionGrid>
                <AnimatePresence initial={false}>
                    {data?.map((article, index) =>
                        <ArticleCard
                            index={index}
                            key={article.key}
                            article={article}
                            cta="Lees meer" />
                    )}
                </AnimatePresence>
            </CollectionGrid>
        </PageContext.Provider>
    )
}