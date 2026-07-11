import React, { useState, useMemo } from 'react';
import { 
  FiSearch, 
  FiArrowLeft, 
  FiArrowRight, 
  FiCalendar, 
  FiUser, 
  FiMessageSquare 
} from 'react-icons/fi';
import './Blog.css';

// Unsplash premium structural banner & card layout images
const BlogBannerBg = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80";
const PostImg1 = "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80";
const PostImg2 = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80";
const PostImg3 = "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=80";
const PostImg4 = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80";
const PostImg5 = "https://images.unsplash.com/photo-1472214222555-d404758b1c42?w=800&auto=format&fit=crop&q=80";
const PostImg6 = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80";

const BLOG_POSTS_DATA = [
  { id: 1, title: "An Overview of Water Softeners", date: "April 2, 2023", author: "admin", comments: 0, category: "Filters", snippet: "Water softeners are essential systems designed to remove minerals like calcium and magnesium from hard water...", image: PostImg1, tags: ["#experts", "#technologies"] },
  { id: 2, title: "Methods of Water Purification", date: "April 2, 2023", author: "admin", comments: 0, category: "Technologies", snippet: "Purifying water requires advanced multi-stage processing systems to filter out microscopic environmental contaminants...", image: PostImg2, tags: ["#delivery", "#water"] },
  { id: 3, title: "Bottled Water Quality Standards", date: "April 2, 2023", author: "admin", comments: 0, category: "Water", snippet: "Every single bottle of premium water undergoes rigorous state and municipal health compliance tracking evaluations...", image: PostImg3, tags: ["#strategy", "#company"] },
  { id: 4, title: "The Main Benefits of Clean Water", date: "April 2, 2023", author: "admin", comments: 0, category: "Our services", snippet: "Maintaining hydration using clean filtered structured spring mineral bases boosts system cellular metabolic metrics...", image: PostImg4, tags: ["#services", "#water"] },
  { id: 5, title: "Choosing a Household Filter System", date: "April 1, 2023", author: "admin", comments: 0, category: "Filters", snippet: "Selecting the correct household reverse osmosis filter array guarantees long term protection against microplastic fragments...", image: PostImg5, tags: ["#experts", "#technologies"] },
  { id: 6, title: "How Safe Is Your Municipal Water?", date: "March 28, 2023", author: "admin", comments: 0, category: "Company", snippet: "Municipal delivery pipelines can often leech toxic heavy metals back into otherwise treated water systems unknowingly...", image: PostImg6, tags: ["#company", "#strategy"] }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(2); // Matches page 2 look on your sample reference layout

  const itemsPerPage = 4;

  const handleFilterReset = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.snippet.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory ? post.category.toLowerCase() === selectedCategory.toLowerCase() : true;
      const matchTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchSearch && matchCategory && matchTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Pagination bounds logic computation 
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  return (
    <div className="Blog">
      
      {/* COMPONENT 1: HERO SUB BANNER (60vh Window) */}
      <section className="BlogHeaderBanner">
        <div className="BlogHeaderBannerBg" style={{ backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.25), rgba(44, 62, 80, 0.25)), url(${BlogBannerBg})` }}>
          <div className="BlogHeaderBreadcrumbStack">
            <h1 className="BlogHeaderPageTitle">Blog</h1>
            <div className="BlogBreadcrumbLinksRow">
              <span className="BlogBreadcrumbLink">Home</span>
              <span className="BlogBreadcrumbDivider">//</span>
              <span className="BlogBreadcrumbActive">Blog</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT 2: CORE SIDEBAR & MAIN POSTS GRID SECTION */}
      <section className="BlogMainLayoutSection">
        <div className="BlogMainLayoutContainer">
          
          {/* LEFT CONTENT AREA: Post Cards Grid & List */}
          <main className="BlogPostsContentGrid">
            {paginatedPosts.length === 0 ? (
              <div className="BlogNoResultsFoundCard">
                <h3>No articles match your selection.</h3>
                <button onClick={handleFilterReset} className="BlogResetFilterBtn">Reset Filters</button>
              </div>
            ) : (
              <div className="BlogResponsiveCardsStack">
                {paginatedPosts.map((post) => (
                  <article key={post.id} className="BlogPostCardItem">
                    <div className="BlogPostCardImageFrame">
                      <img src={post.image} alt={post.title} className="BlogPostCoreAssetImage" />
                      <div className="BlogPostCategoryFloatingTag">{post.category}</div>
                    </div>
                    
                    <div className="BlogPostCardDetailsContent">
                      <div className="BlogPostMetaDetailsStrip">
                        <span className="BlogPostMetaElement"><FiCalendar className="BlogPostMetaIcon" /> {post.date}</span>
                        <span className="BlogPostMetaElement"><FiUser className="BlogPostMetaIcon" /> By {post.author}</span>
                        <span className="BlogPostMetaElement"><FiMessageSquare className="BlogPostMetaIcon" /> {post.comments} Comments</span>
                      </div>
                      
                      <h2 className="BlogPostCardHeadlineTitle">{post.title}</h2>
                      <p className="BlogPostCardSnippetText">{post.snippet}</p>
                      
                      <button className="BlogPostCardReadMoreActionBtn">
                        Read more <span className="BlogPostBtnArrow">&gt;&gt;</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Segment Layout Widget */}
            {totalPages > 1 && (
              <div className="BlogPaginationContainer">
                <button 
                  className="BlogPaginationNavArrow" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <FiArrowLeft />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    className={`BlogPaginationNumberBtn ${currentPage === idx + 1 ? 'activePageNumber' : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button 
                  className="BlogPaginationNavArrow" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <FiArrowRight />
                </button>
              </div>
            )}
          </main>

          {/* RIGHT CONTENT AREA: Dynamic Sidebar Control Filters Widget Stack */}
          <aside className="BlogSidebarWidgetsStack">
            
            {/* Widget 1: Search Inputs Group */}
            <div className="BlogSidebarWidgetCard SearchWidget">
              <div className="BlogSearchFieldInputWrapper">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="BlogWidgetSearchInputElement"
                />
                <button className="BlogWidgetSearchIconButton"><FiSearch /></button>
              </div>
            </div>

            {/* Widget 2: Recent Posts Mini Sidebar Cards */}
            <div className="BlogSidebarWidgetCard RecentPostsWidget">
              <h3 className="BlogWidgetSectionHeading">Recent Posts</h3>
              <div className="BlogSidebarRecentPostsRowsList">
                {BLOG_POSTS_DATA.slice(0, 3).map(post => (
                  <div key={post.id} className="BlogSidebarMiniPostRowItem">
                    <img src={post.image} alt={post.title} className="BlogSidebarMiniPostThumbnail" />
                    <div className="BlogSidebarMiniPostMetaBlock">
                      <h4 className="BlogSidebarMiniPostTitle">{post.title}</h4>
                      <span className="BlogSidebarMiniPostDate">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 3: Categories Link Rows Selector */}
            <div className="BlogSidebarWidgetCard CategoriesWidget">
              <h3 className="BlogWidgetSectionHeading">Categories</h3>
              <ul className="BlogSidebarCategoriesListContainer">
                {[
                  { name: "Company", count: 11 },
                  { name: "Experts", count: 2 },
                  { name: "Filters", count: 8 },
                  { name: "Our services", count: 4 },
                  { name: "Products", count: 6 },
                  { name: "Technologies", count: 3 },
                  { name: "Water", count: 7 }
                ].map(cat => (
                  <li 
                    key={cat.name}
                    className={`BlogSidebarCategoryListItemRow ${selectedCategory === cat.name ? 'selectedCategoryItem' : ''}`}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                      setCurrentPage(1);
                    }}
                  >
                    <span className="BlogCategoryArrowSymbol">&gt;</span>
                    <span className="BlogCategoryLabelText">{cat.name}</span>
                    <span className="BlogCategoryCounterBadge">({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 4: Tags Cloud Badge System */}
            <div className="BlogSidebarWidgetCard TagCloudWidget">
              <h3 className="BlogWidgetSectionHeading">Tags</h3>
              <div className="BlogSidebarTagsCloudFlexGroup">
                {["#company", "#delivery", "#experts", "#services", "#strategy", "#technologies", "#water"].map(tag => (
                  <span
                    key={tag}
                    className={`BlogSidebarIndividualTagBadge ${selectedTag === tag ? 'activeTagBadge' : ''}`}
                    onClick={() => {
                      setSelectedTag(selectedTag === tag ? null : tag);
                      setCurrentPage(1);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

    </div>
  );
};

export default Blog;