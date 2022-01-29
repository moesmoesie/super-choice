export default function FilterRow({ filters, currentFilter, onClick }) {
    return (
        <div className='w-full drop-shadow-md bg-white pb-6'>
            <div className='w-full gap-6 wrapper flex flex-wrap items-center justify-center'>
                {filters.map((filter, index) => (
                    <FilterButton
                        isSelected={currentFilter == filter.value}
                        onClick={onClick}
                        key={index}
                        filter={filter}
                    />)
                )}
            </div>
        </div>
    )
}

const FilterButton = ({ filter, onClick, isSelected }) => {
    return (
        <button className={`button2 duration-300
            ${isSelected ? "!bg-primary3 !text-white" : ''}`}
            onClick={(e) => onClick(filter.value)}
        >
            {filter.title}
        </button>
    )
}