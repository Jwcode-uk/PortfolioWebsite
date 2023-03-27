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
            In the realm of software development, the pursuit of new, innovative technology
            is constant. Developers frequently embrace the latest trends and tools, often
            disregarding older legacy software. However, this tactic can be both expensive
            and unproductive, as I discovered while working on a mainframe emulator called
            Enterprise Server at Micro Focus.
          </p>
          <p className="blog-body">
            Legacy software refers to software that has been utilized for an extended period
            and may have been developed using programming languages or technologies that are
            often viewed as outdated. Many businesses depend on legacy software to operate
            critical applications and systems, such as a bank's system for managing customer
            accounts and transactions. Replacing such systems can be a high-cost and high-risk
            endeavor. Moreover, new software may struggle to replicate the essential functions
            that legacy software performs for example banks primarily use cobol due to it's
            fixed point number system where all modern programming language utilize floating point.
          </p>
          <p className="blog-body">
            While working at Micro Focus, I contributed to the development of Enterprise Server,
            a mainframe emulator that facilitates business migration to the cloud without
            converting millions of lines of COBOL code. This solution allows companies to
            maintain their legacy software while interacting with modern code languages as
            it allowed for cobol to be compiled to JVM or CLR. Enterprise Server exemplifies
            the significance of legacy software by bridging the gap between old and new
            technologies, enabling businesses to modernize their IT infrastructure without
            discarding their legacy systems.
          </p>
          <p className="blog-body">
            I personally experienced this when I was assigned to transform an optician
            management system that was initially designed to operate on a green screen
            terminal into a modern application. By developing a wrapper layer in COBOL,
            I facilitated data transfer between the legacy system and a C# program. This
            C# middleware I created allowed integration with a React-based website, enabling
            customers to book appointments directly without the need for a receptionist using
            the green screen. Resulting in, customers enjoyed a modern, responsive experience,
            while the substantial COBOL application was preserved and continued to serve its
            purpose. This shows how legacy systems can be adapted to meet contemporary demands
            without requiring complete replacement. This was a cheaper, quicker and lower risk
            approprach to solving the modernisation of this system then I complete rebuild and
            I hope demonstrates the importance of not just throwing away legacy code!
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
