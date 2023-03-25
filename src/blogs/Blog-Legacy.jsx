import './Blog.css';
import '../App.css';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function BlogsCI() {
  const homeOnClickRef = useRef(null);
  const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div ref={homeOnClickRef}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Link to="/blogs">
        <button type="button" className="back-btn">
          <i className="fa fa-arrow-left" />
          {' '}
          Back
        </button>
      </Link>

      <div className="blog-container">
        <div className="blog-content">
          <h2 className="blog-title">
            The Importance of Legacy and why you shouldn&apos;t just replace them
          </h2>
          <p className="blog-author">By Jonathan White</p>
          <hr className="blog-divider" />
          <p className="blog-body">
            TODO
          </p>

          <button onClick={() => scrollEffect(homeOnClickRef)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6b6b6b"
              width="50px"
              height="50px"
            >
              <path d="M12 3.293l-6.646 6.647 1.414 1.414L12 6.12l5.232 5.232 1.414-1.414L12 3.293z" />
            </svg>
          </button>

        </div>
      </div>
    </div>

  );
}

export default BlogsCI;
