import React from 'react'
import './Insights.css'

const articles = [
  {
    title: "Why India's Logistics Costs Still Run High — and What Infrastructure Can Fix",
    meta: 'LOGISETU INSIGHTS • 2026 • 5 min read',
    content: [
      "Logistics costs in India remain high relative to more mature markets, and the reasons are structural rather than incidental. Fragmented warehousing, limited cold chain capacity, and multimodal connectivity that hasn't kept pace with freight volumes all add friction — and cost — at almost every handoff in the supply chain.",
      "None of this is a demand problem. India's consumption and manufacturing base is growing quickly. The gap is on the supply side: there simply isn't enough modern, Grade A logistics infrastructure to match where the economy is headed.",
      "Closing that gap requires purpose-built infrastructure — multimodal terminals that cut transshipment time, cold chain networks that reduce spoilage, and warehousing designed for how goods actually move today, not decades ago. That is the core thesis behind LogiSetu's approach: build the physical backbone first, and efficiency follows."
    ]
  },
  {
    title: "The Case for Multimodal Logistics Parks in India",
    meta: 'LOGISETU INSIGHTS • 2026 • 4 min read',
    content: [
      "Most logistics infrastructure in India has historically been developed piecemeal — a warehouse here, a container yard there — without the integration that lets rail, road and storage work together as a single system.",
      "Multimodal logistics parks change that equation. By co-locating warehousing, freight terminals, and customs facilitation in one location, they cut the number of handoffs a shipment goes through, which is where most delay and cost actually accumulates.",
      "As India's National Logistics Policy and infrastructure programmes push toward integrated freight movement, well-located multimodal parks are likely to become the default model for new logistics capacity — not a niche alternative to it."
    ]
  },
  {
    title: "Cross-Border Trade Corridors: An Underused Growth Lever",
    meta: 'LOGISETU INSIGHTS • 2026 • 4 min read',
    content: [
      "India's trade relationships with its neighbours and the wider region are growing, but the infrastructure supporting that trade — customs facilitation, border logistics, and multimodal connectivity to ports and land borders — often lags behind the underlying demand.",
      "For businesses trying to move goods across borders, this shows up as cost and delay that has little to do with the goods themselves and everything to do with process and infrastructure gaps.",
      "We think this is one of the most underused levers for growth in Indian logistics: infrastructure specifically targets cross-border friction, rather than treating border trade as an afterthought to domestic logistics planning."
    ]
  }
]

export default function Insights() {
  return (
    <div className="page-insights">
      {/* 1. HERO SECTION (Dark theme) */}
      <section className="ins-hero section-dark">
        <div className="container ins-hero__content">
          <span className="section-label">Insights</span>
          <h1 className="ins-hero__title">
            Perspectives on India's logistics infrastructure build-out
          </h1>
          <p className="ins-hero__subtitle">
            Views from the LogiSetu team on what it takes to modernise Indian logistics.
          </p>
        </div>
      </section>

      {/* 2. ARTICLES LIST (Light theme, white cards) */}
      <section className="articles-sec section-light">
        <div className="container articles-sec__inner">
          {articles.map((art, idx) => (
            <article key={idx} className="ins-article card-light">
              <span className="ins-article__meta">{art.meta}</span>
              <h2 className="ins-article__title">{art.title}</h2>
              <div className="ins-article__body">
                {art.content.map((p, pIdx) => (
                  <p key={pIdx} className="ins-article__paragraph">{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
