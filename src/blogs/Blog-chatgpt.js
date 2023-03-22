import '../App.css';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

function BlogChatgpt() {

    const homeOnClickRef = useRef(null);
    const scrollEffect = (targetRef) => {
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    return (
        <div ref={homeOnClickRef}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Link to="/blogs" >
            <button class="back-btn">
            <i class="fa fa-arrow-left"></i>
            </button></Link>

            
            <div style={{ backgroundColor: '#f6f6f6', width: "50%", margin: "10% auto", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.18)" }} >


                <div style={{ padding: "30px" }}>
                    <h2 style={{ color: '#333333', fontSize: "2.5rem", lineHeight: "1.2", textAlign: "left", marginBottom: "0", marginTop: "10" }}>The Rise of ChatGPT: Benefits and Privacy Risks</h2>
                    <p style={{ color: '#333333', fontSize: "1rem", lineHeight: "1", textAlign: "left", marginTop: "5px", marginLeft: "10px" }}>By Jonathan White  25/02/2023</p>
                    <hr style={{ border: "1px solid #6b6b6b", opacity: "0.5" }} />
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>In just two months of its release, ChatGPT, a conversational AI tool developed by OpenAI, has become a phenomenon. With 100 million active users, it's the fastest-growing consumer application in history. However, with this growth comes privacy concerns that are not being discussed enough.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>ChatGPT is powered by a large language model that has been trained on massive amounts of data, including 300 billion words scraped from the internet, including books, articles, websites, and posts. This data includes personal information that was obtained without consent, which means if you've ever written a blog post, product review, or commented on an article online, it's likely that your information was consumed by ChatGPT.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>This data collection process poses several privacy risks. Firstly, none of us were asked for permission for OpenAI to use our data, which is a clear violation of privacy, especially when data is sensitive and can be used to identify us, our family members, or our location. Secondly, the use of publicly available data can also breach what's known as contextual integrity, which requires that individuals' information is not revealed outside of the context in which it was originally produced.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>Moreover, OpenAI offers no procedures for individuals to check whether the company stores their personal information, or to request it be deleted. This right to be forgotten is particularly important in cases where the information is inaccurate or misleading, which seems to be a regular occurrence with ChatGPT. The scraped data ChatGPT was trained on can also be proprietary or copyrighted, which means the tool may not necessarily consider copyright protection when generating outputs. Finally, OpenAI did not pay for the data it scraped from the internet, and the individuals, website owners, and companies that produced it were not compensated.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>Another privacy risk involves the data provided to ChatGPT in the form of user prompts. When users ask the tool to answer questions or perform tasks, they may inadvertently hand over sensitive information, and put it in the public domain. For example, a lawyer may prompt the tool to review a draft divorce agreement, or a programmer may ask it to check a piece of code. This means that these agreements and codes, in addition to the outputs produced, are now part of ChatGPT's database, and can be used to further train the tool, and be included in responses to other people's prompts.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>OpenAI also gathers a broad scope of other user information, including IP addresses, browser types, and settings, as well as data on users' interactions with the site. The company may also share users' personal information with third parties to meet its business objectives, without informing users.</p>
                    <p style={{ color: '#6b6b6b', fontSize: "1.3rem", lineHeight: "1.6", textAlign: "left" }}>In conclusion, while ChatGPT's potential benefits are undeniable, its privacy risks cannot be ignored. As consumers of a growing number of AI technologies, we should be extremely careful about what information we share with such tools. It's time to rein in the privacy concerns that come with the rise of ChatGPT, and ensure that these tools align with greater societal needs.</p>
                    <button onClick={() => scrollEffect(homeOnClickRef)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#6b6b6b"
                            width="50px" height="50px"
                        >
                            <path d="M12 3.293l-6.646 6.647 1.414 1.414L12 6.12l5.232 5.232 1.414-1.414L12 3.293z" />
                        </svg></button>

                </div>
            </div>
        </div>

    );
}

export default BlogChatgpt;
