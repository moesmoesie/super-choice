import { useState,createContext } from "react";
import { useFilterCollection } from "../../hooks/useFilterCollection";
import FilterRow from "../../../components/FilterRow";
import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import CollectionGrid from "../../../components/CollectionGrid";
import React from "react";
const PageContext = createContext();

export default function ({ pageData }) {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { data } = useFilterCollection({ collection: pageData.products, filter: selectedFilter })

    function onFilterClick(value) {
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow onClick={onFilterClick} currentFilter={selectedFilter} filters={pageData.productFilters} />
            <CollectionGrid>
                <AnimatePresence initial={false}>
                    {data?.map((product, index) =>
                        <ProductCard
                            index={index}
                            key={product.key}
                            cta={pageData.productCtaText}
                            product={product} />
                    )}
                </AnimatePresence>
            </CollectionGrid>
        </PageContext.Provider>
    )
}