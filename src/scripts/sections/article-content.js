/**
 * Article Content Section - Interactive Features
 * Handles smooth scrolling, active section tracking, and user interactions
 */

class ArticleContent {
  constructor() {
    this.init();
  }

  init() {
    this.setupHeadingLinks();
    this.setupScrollTracking();
    this.setupSmoothScroll();
    this.setupCodeBlockCopy();
    this.handleTableResponsiveness();
  }

  /**
   * Make headings linkable with anchor navigation
   */
  setupHeadingLinks() {
    const article = document.querySelector('.article-content');
    if (!article) return;

    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = 'heading-anchor';
      link.innerHTML = '#';
      link.title = 'Permalink to heading';
      
      heading.appendChild(link);
    });
  }

  /**
   * Track scroll position and update active section
   */
  setupScrollTracking() {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    
    if (headings.length === 0) return;

    window.addEventListener('scroll', () => {
      let current = '';

      headings.forEach((heading) => {
        const sectionTop = heading.offsetTop;
        const sectionHeight = heading.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
          current = heading.getAttribute('id');
        }
      });

      // Update active state if needed
      headings.forEach((heading) => {
        heading.classList.remove('active');
      });

      if (current) {
        const activeHeading = document.getElementById(current);
        if (activeHeading) {
          activeHeading.classList.add('active');
        }
      }
    });
  }

  /**
   * Enable smooth scroll for anchor links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without page jump
          window.history.pushState(null, null, href);
        }
      });
    });
  }

  /**
   * Add copy button to code blocks
   */
  setupCodeBlockCopy() {
    const codeBlocks = document.querySelectorAll('.article-content pre');

    codeBlocks.forEach((block) => {
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.textContent = 'Copy Code';
      button.type = 'button';

      button.addEventListener('click', () => {
        const code = block.querySelector('code') || block;
        const text = code.textContent;

        navigator.clipboard.writeText(text).then(() => {
          button.textContent = 'Copied!';
          button.classList.add('copied');

          setTimeout(() => {
            button.textContent = 'Copy Code';
            button.classList.remove('copied');
          }, 2000);
        }).catch((err) => {
          console.error('Failed to copy code:', err);
          button.textContent = 'Copy Failed';
        });
      });

      block.style.position = 'relative';
      block.appendChild(button);
    });
  }

  /**
   * Handle table responsiveness on mobile
   */
  handleTableResponsiveness() {
    const tables = document.querySelectorAll('.article-content table');

    tables.forEach((table) => {
      if (table.offsetWidth > window.innerWidth - 40) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive-wrapper';
        wrapper.style.overflowX = 'auto';
        wrapper.style.marginBottom = '20px';

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });

    window.addEventListener('resize', () => {
      tables.forEach((table) => {
        if (table.parentNode.classList.contains('table-responsive-wrapper')) {
          if (table.offsetWidth <= window.innerWidth - 40) {
            const wrapper = table.parentNode;
            wrapper.parentNode.insertBefore(table, wrapper);
            wrapper.remove();
          }
        }
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArticleContent();
  });
} else {
  new ArticleContent();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArticleContent;
}
