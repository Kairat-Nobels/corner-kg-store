import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import Spinner from "../../../../components/Spinner/Spinner";
import "./shopProducts.scss";

const ShopProducts = () => {
    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    const selectedCategory = useSelector((state) => state.filterReducer.selectedCategory);
    const { categories } = useSelector((state) => state.categoriesReducer);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sortValue, setSortValue] = useState("");

    const filterRef = useRef(null);

    const minPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.min(...items.map((item) => Number(item.price) || 0));
    }, [items]);

    const maxPrice = useMemo(() => {
        if (!items.length) return 0;
        return Math.max(...items.map((item) => Number(item.price) || 0));
    }, [items]);

    useEffect(() => {
        if (items.length) {
            setPriceRange([minPrice, maxPrice]);
        }
    }, [items.length, minPrice, maxPrice]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        if (showFilters) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilters]);

    const handleCategoryChange = (categoryName) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryName)
                ? prev.filter((item) => item !== categoryName)
                : [...prev, categoryName]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([minPrice, maxPrice]);
        setSearch("");
        setSortValue("");
    };

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const itemTitle = item.title?.toLowerCase() || "";
            const itemCategory = item.category || "";
            const itemPrice = Number(item.price) || 0;

            if (search && !itemTitle.includes(search.toLowerCase())) return false;
            if (selectedCategories.length && !selectedCategories.includes(itemCategory)) return false;
            if (itemPrice < priceRange[0] || itemPrice > priceRange[1]) return false;
            if (
                selectedCategory &&
                selectedCategory !== "All" &&
                itemCategory !== selectedCategory
            ) {
                return false;
            }

            return true;
        });
    }, [items, search, selectedCategories, priceRange, selectedCategory]);

    const sortedItems = useMemo(() => {
        const arr = [...filteredItems];

        if (sortValue === "low") {
            arr.sort((a, b) => Number(a.price) - Number(b.price));
        }

        if (sortValue === "high") {
            arr.sort((a, b) => Number(b.price) - Number(a.price));
        }

        if (sortValue === "name") {
            arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        }

        return arr;
    }, [filteredItems, sortValue]);

    return (
        <section className="shop-products">
            <div className="shop-products__hero">
                <span className="shop-products__label">Каталог</span>
                <h1>Все товары</h1>
                <p>
                    Выбирайте одежду, обувь и аксессуары. Используйте поиск, фильтры и
                    сортировку, чтобы быстрее найти нужный товар.
                </p>
            </div>

            <div className="shop-toolbar">
                <div className="shop-toolbar__left">
                    <button
                        className="filter-toggle"
                        onClick={() => setShowFilters((prev) => !prev)}
                    >
                        <FaFilter />
                        <span>Фильтры</span>
                    </button>

                    <div className="shop-search">
                        <input
                            type="text"
                            placeholder="Поиск по названию товара..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button
                                type="button"
                                className="clear-search"
                                onClick={() => setSearch("")}
                                aria-label="Очистить поиск"
                            >
                                <IoClose />
                            </button>
                        )}
                    </div>
                </div>

                <div className="shop-toolbar__right">
                    <select
                        value={sortValue}
                        onChange={(e) => setSortValue(e.target.value)}
                    >
                        <option value="">Сортировка</option>
                        <option value="low">Сначала дешевле</option>
                        <option value="high">Сначала дороже</option>
                        <option value="name">По названию</option>
                    </select>
                </div>
            </div>

            <div className="shop-meta">
                <p>
                    Найдено товаров: <strong>{sortedItems.length}</strong>
                </p>

                {(selectedCategories.length > 0 || search || sortValue) && (
                    <button className="reset-filters" onClick={resetFilters}>
                        Сбросить фильтры
                    </button>
                )}
            </div>

            {showFilters && (
                <div className="shop-filters-overlay">
                    <div className="shop-filters" ref={filterRef}>
                        <div className="shop-filters__top">
                            <h3>Фильтры</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <IoClose />
                            </button>
                        </div>

                        <div className="shop-filters__group">
                            <h4>Категории</h4>

                            <div className="category-list">
                                {categories.map((category) => (
                                    <label key={category.id} className="category-option">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category.name)}
                                            onChange={() => handleCategoryChange(category.name)}
                                        />
                                        <span>{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="shop-filters__group">
                            <h4>Цена</h4>

                            <div className="price-values">
                                <span>от {priceRange[0]} сом</span>
                                <span>до {priceRange[1]} сом</span>
                            </div>

                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[0]}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
                                }}
                            />

                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
                                }}
                            />
                        </div>

                        <div className="shop-filters__actions">
                            <button className="secondary-btn" onClick={resetFilters}>
                                Сбросить
                            </button>
                            <button className="primary-btn" onClick={() => setShowFilters(false)}>
                                Показать товары
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="shop-products__content">
                {loading ? (
                    <div className="shop-products__center">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="fetchError">
                        <p>Ошибка: {error}</p>
                        <p>Проверь подключение к интернету и обнови страницу.</p>
                    </div>
                ) : sortedItems.length === 0 ? (
                    <div className="empty-results">
                        <h3>Товары не найдены</h3>
                        <p>Попробуй изменить фильтры, поиск или диапазон цен.</p>
                    </div>
                ) : (
                    <div className="shop-products__grid">
                        {sortedItems.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                image={item.image}
                                title={item.title}
                                category={item.category}
                                price={item.price}
                                oldPrice={item.oldPrice}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShopProducts;
